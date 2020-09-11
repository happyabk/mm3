
package com.posco.mes3.m2db03.domain.logic.composite.bapResult;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.http.ResponseEntity;

import com.posco.mes3.common.app.mail.PosMailSender;
import com.posco.mes3.m2db03.domain.entity.bapResult.BAPResult;
import com.posco.mes3.m2db03.domain.entity.bapResult.BAPResultHistory;
import com.posco.mes3.m2db03.domain.lifecycle.ProxyLifecycle;
import com.posco.mes3.m2db03.domain.proxy.AgentProxy;
import com.posco.mes3.m2db03.domain.proxy.M2dc01Proxy;
import com.posco.mes3.m2db03.domain.proxy.M2drq0Proxy;
import com.posco.mes3.m2db03.domain.spec.composite.bapResult.BAPResultCompositeService;
import com.posco.mes3.m2db03.domain.spec.entity.bapResult.BAPResultHistoryService;
import com.posco.mes3.m2db03.domain.spec.entity.bapResult.BAPResultService;
import com.posco.mes3.m2db03.domain.spec.reuse.MasterDataService;
import com.posco.mes3.m2db03.helper.M2db03DateUtil;
import com.posco.mes3.m2db03.helper.M2db03EntityUtil;
import com.posco.mes3.m2db03.helper.constants.M2db03Constants;
import com.posco.mes3.m2db03.helper.constants.M2db03ConstantsInterface;
import com.posco.mes3.m2dc01.domain.entity.result.OperationProgress;
import com.posco.mes3.m2drq0.domain.dto.secondRefining.BAPLeadTimeInfoDto;
import com.posco.mes3.m2drq0.domain.dto.secondRefining.PosScrapMixResultPrimeUnitCostDto;
import com.posco.mes3.reuse.common.errorobjects.PosBaseException;
import com.posco.mes3.reuse.common.logging.PosLogWriterIF;
import com.posco.mes3.reuse.common.logging.PosLogger;
import com.posco.mes3.reuse.compensation.util.domain.util.ReuseCompensationUtil;

/**
 * BAPResultCompositeLogic
 * @desc BAP실적처리 ( 2.0 : PEA1A014/KEA1A014 )
 * @author jykim
 * @version 1.0
 */
public class BAPResultCompositeLogic implements BAPResultCompositeService, M2db03Constants, M2db03ConstantsInterface {

	private M2dc01Proxy m2dc01Proxy;
	private AgentProxy agentProxy;
	private M2drq0Proxy m2drq0Proxy;
	// 서비스명
	private final String serviceName;
	private BAPResultService bapResultService;
	private MasterDataService masterDataService;
	private BAPResultHistoryService bapResultHistoryService;

	/**
	 * BAP실적처리 생성자
	 * @param proxyLifecycle
	 * @param serviceName
	 */
	public BAPResultCompositeLogic(ProxyLifecycle proxyLifecycle, String serviceName) {
		this.m2dc01Proxy = proxyLifecycle.requestM2dc01Proxy();
		this.agentProxy = proxyLifecycle.requestAgentProxy();
		this.m2drq0Proxy = proxyLifecycle.requestM2drq0Proxy();
		this.serviceName = serviceName;
	}

	/**
	 * BAP실적을 처리한다. 
	 * @param receiveMsg
	 * @return String
	 * @throws PosBaseException - 예외사항이 발생한 경우
	 */
	@Override
	public String receiveMessage(Map<String, Object> receiveMsg) throws PosBaseException {
		String result = "완료";
			Map<String, Object> data = null;
			if (receiveMsg == null) {
				result = MSG_ERROR_RECEIVE_CONTENTS_NULL;
				PosLogger.developerLog(PosLogWriterIF.ERROR, result, this);
				return result;
			} else {
				data = new HashMap<String, Object>();
				data.putAll(receiveMsg);
				data = this.parseMessage(data);
			}
			if (data == null ) {
				result = "Parsing오류";
				PosLogger.developerLog(PosLogWriterIF.ERROR, result, this);
				return result;
			}
			PosLogger.developerLog(PosLogWriterIF.INFO, "data : " + data, this);

			String mtlNo = null;
			mtlNo = data.get(CAMEL_CHARGE_NO).toString();
			if (mtlNo == null) {
				result = "강번이 없습니다.";
				PosLogger.developerLog(PosLogWriterIF.ERROR, result, this);				
				return result;
			}
			data.put(CAMEL_MTL_NO, mtlNo);

			String worksCode = data.containsKey(CAMEL_WORKS_CODE) && data.get(CAMEL_WORKS_CODE) != null
					? data.get(CAMEL_WORKS_CODE).toString()
					: null;
			String inventoryOrg = null;

			if (worksCode != null)
				inventoryOrg = worksCode.equals(CONST_WORKS_CODE_P) ? "6" : "9";
			PosLogger.developerLog(PosLogWriterIF.INFO, "inventoryOrg : " + inventoryOrg, this);

			BigDecimal sm2stRefOpSteRetm = this.getMinutesBetweenTwoDates(data.get("bapArrDt"), data.get("bapDeptDt"),
					"999.9");
			PosLogger.developerLog(PosLogWriterIF.INFO, "sm2stRefOpSteRetm : " + sm2stRefOpSteRetm, this);
			if (sm2stRefOpSteRetm != null)
				data.put("sm2stRefOpSteRetm", sm2stRefOpSteRetm);
			
			//* BAP실적 수신 시에 BAP도착출발 때에 수신한 제강2차정련BAP공Ladle보열시간 값을 조회해서 전로실적 테이블에 저장한다 ?
			BigDecimal sm2ndRefBapVacLadShtTm = null;
			if (worksCode != null && worksCode.equals(CONST_WORKS_CODE_K)) {
				sm2ndRefBapVacLadShtTm = this.getSm2ndRefBapVacLadShtTm(mtlNo);
				data.put("sm2ndRefBapVacLadShtTm", sm2ndRefBapVacLadShtTm);
				PosLogger.developerLog(PosLogWriterIF.INFO, "########### sm2ndRefBapVacLadShtTm :" + sm2ndRefBapVacLadShtTm, this);
			}
			
			// 제강BAP작업계상일자 및 제강BAP작업근조코드 조회 및 Setting
			String operFlag = data.containsKey(CAMEL_OPER_FLAG) && data.get(CAMEL_OPER_FLAG) != null
					? data.get(CAMEL_OPER_FLAG).toString()
					: null;
			String facOpCdN = data.containsKey(CAMEL_FAC_OP_CD_N) && data.get(CAMEL_FAC_OP_CD_N) != null
					? data.get(CAMEL_FAC_OP_CD_N).toString()
					: null;
			Timestamp bapSatDt = data.containsKey("bapSatDt") && data.get("bapSatDt") != null
					? M2db03DateUtil.convertToTimestamp(data.get("bapSatDt"))
					: null;
			PosLogger.developerLog(PosLogWriterIF.INFO, "bapSatDt : " + bapSatDt, this);

			String bapOpSumupDt = null;
			String bapOpSft = null;

			if (bapSatDt != null) {
				List<String> opShiftData = this.makeOpSumupStf(
						M2db03DateUtil.convertUtilTimestamp2String(bapSatDt, "yyyyMMddHHmmss"), worksCode, operFlag,
						facOpCdN);
				PosLogger.developerLog(PosLogWriterIF.INFO, "opShiftData : " + opShiftData, this);
				bapOpSumupDt = opShiftData != null && opShiftData.size() >= 2 ? opShiftData.get(0) : null;
				bapOpSft = opShiftData != null && opShiftData.size() >= 2 ? opShiftData.get(1) : null;
				data.put("bapOpSumupDt", bapOpSumupDt);
				data.put("bapOpSft", bapOpSft);
			}

			// GetChargeCurrent
			Map<String, Object> chargeMaterial = this.findChargeMaterial(mtlNo);
			PosLogger.developerLog(PosLogWriterIF.INFO, "########### chargeMaterial :" + chargeMaterial, this);

			if (chargeMaterial == null) {
				result = MSG_ERROR_CHARGE_MATERIAL_IS_NULL;
				PosLogger.developerLog(PosLogWriterIF.ERROR, result, this);								
				return result;
			}
			// 사전송된 데이터
			else if (chargeMaterial.containsKey(CAMEL_TRS_F) && chargeMaterial.get(CAMEL_TRS_F) != null
					&& chargeMaterial.get(CAMEL_TRS_F).equals("Y")) {
				result = MSG_ERROR_RECEIVE_TRS_F_Y;
				PosLogger.developerLog(PosLogWriterIF.ERROR, result, this);
				return result;
			}

			// SetLatestLdNum
			BigDecimal dstlLadNum = data.containsKey("dstlLadNum") && data.get("dstlLadNum") != null
					? new BigDecimal(data.get("dstlLadNum").toString())
					: null;
			if (dstlLadNum == null)
				dstlLadNum = this.getLatestLdNum(mtlNo);
			data.put("dstlLadNum", dstlLadNum);
			PosLogger.developerLog(PosLogWriterIF.INFO, "dstlLadNum : " + dstlLadNum, this);

			//SaveBapWorkResult			
			PosLogger.developerLog(PosLogWriterIF.INFO, "data : " + data, this);
			result = this.saveBapWorkResult(data);
			if(!"완료".equals(result))
			{
				PosLogger.developerLog(PosLogWriterIF.ERROR, result, this);
				return result;
			}

			// SetRawMaterialDataOfBapResult
			List<Map<String, Object>> rawMaterials = this.setRawMaterialDataOfBapResult(data);
			PosLogger.developerLog(PosLogWriterIF.INFO, "rawMaterials : " + rawMaterials, this);
			// SaveRawMaterialWorkResults
			if (rawMaterials != null && !rawMaterials.isEmpty())
				this.saveRawMaterialWorkResults(rawMaterials);
			// SetSummaryDataOfBapResult
			this.setSummaryDataOfBapResult(chargeMaterial, data);
			// 제강공정별성분판정요구 Event발행
			Map<String, Object> constJudeDemandMessage = new HashMap<String, Object>();
			constJudeDemandMessage.put(CAMEL_MTL_NO, mtlNo);
			String transactionCode = worksCode + "EC1D303";

			//Event 공통항목 Setting
			constJudeDemandMessage.put("transactionCode", transactionCode);
			constJudeDemandMessage.put(CAMEL_WORKS_CODE, worksCode);
			constJudeDemandMessage.put(CAMEL_OPER_FLAG, operFlag);
			constJudeDemandMessage.put(CAMEL_FAC_OP_CD_N, facOpCdN);

			PosLogger.developerLog(PosLogWriterIF.INFO, "########### constJudeDemandMessage DATA :" + constJudeDemandMessage, this);
			ReuseCompensationUtil.commitInSync();
			
			boolean resultEvent = this.agentProxy.sendEvent("M2DA01RN001", constJudeDemandMessage); // KAFKA로 Event발행 결과 확인
			PosLogger.developerLog(PosLogWriterIF.INFO, "########### resultEvent데이터 :" + resultEvent, this);

			try {
				// 품질실적 api호출
				ReuseCompensationUtil.commitInSync();
				Map<String, Object> steelQualityResultMap = new HashMap<String, Object>();
				steelQualityResultMap.put(CAMEL_MTL_NO, mtlNo);
				String sendSteelQualityResult = this.m2dc01Proxy.sendSteelQualityResult(steelQualityResultMap);
				PosLogger.developerLog(PosLogWriterIF.INFO,
						"########### sendSteelQualityResult데이터 :" + sendSteelQualityResult, this);
			} catch (Exception e) {
				PosLogger.developerLog(PosLogWriterIF.INFO, "######## 품질실적 api 호출에러발생!! " + mtlNo, this);
			}
		
			//제품제조이력 송신		
			this.sendProductManufacturingHistory(data);
			
			// 광양 3제강공장인 경우에만 적용
			if (worksCode.equals(CONST_WORKS_CODE_K) && facOpCdN.equals("3Q1")) {
				this.PosScrapMixResultPrimeUnitCostSend(data);
			}
					
		return result;
	}
	
	/**
	 * @MethodName(한글) : 제조이력송신
	 * @desc 제조이력Event를 송신한다.
	 * @param data
	 */
	private void sendProductManufacturingHistory(Map<String, Object> data) {

		//제품제조이력 송신
		String mtlNo = data.get(CAMEL_MTL_NO).toString();
		String worksCode = data.get(CAMEL_WORKS_CODE).toString();
		String facOpCdN = data.get(CAMEL_FAC_OP_CD_N).toString();
		String operFlag = data.get(CAMEL_OPER_FLAG).toString();
		//포항 : PEZZZ001, 광양 : KEZZZ001
		Map<String,Object> material = this.m2dc01Proxy.findChargeMaterial(mtlNo);
		PosLogger.developerLog(PosLogWriterIF.INFO,
				"########### 제조이력 : 재료데이터 :" + material, this);
		//포항 1제강 BAP과 bapChargeTPrcTm(BAP차수별총처리시간)이 null인 경우는 송신하지 않는다.
		if(!(worksCode.equals(CONST_WORKS_CODE_P) && facOpCdN.equals("1Q1")) && material.get("bapChargeTPrcTm") != null)
		{
			String factoryCd = facOpCdN.startsWith("1")? "A" : facOpCdN.startsWith("2")? "B" : "C";
			String routingNo = "01_"+worksCode + "E" + factoryCd + "16";
			String operationCode = "01_"+ worksCode + "E" + factoryCd + "14_1";
			String facCode = "P".equals(worksCode) && facOpCdN.startsWith("1") ? "6" : facOpCdN.substring(0, 1);
			
			String spcmnNo = worksCode + "DA" + facCode + "417101";
			
			Map<String,Object> manufacturingHistory = new HashMap<String, Object>();
			manufacturingHistory.put("transactionCode", worksCode + "EZZZ001");
			manufacturingHistory.put("worksCode", worksCode);
			manufacturingHistory.put("operFlag", operFlag);
			manufacturingHistory.put("facOpCdN", facOpCdN);
			manufacturingHistory.put("sndrInformEditDate", data.get("sndrInformEditDate") != null ? data.get("sndrInformEditDate") : M2db03DateUtil.getCurrentTimeToString());
			manufacturingHistory.put("sndrInformEditPgmId", "m2da01-agent");
			manufacturingHistory.put("prdEucPrcDim",  material.get("bapTPrcPasNum"));
			manufacturingHistory.put("prdAcReprcTim", 0);
			manufacturingHistory.put("actionCount", 0);
			manufacturingHistory.put("mtlNo", mtlNo);
			manufacturingHistory.put("parentMtlNo", mtlNo);
			manufacturingHistory.put("opDnDt", data.get("bapDnDt"));
			manufacturingHistory.put("orderHeadLineNo", material.get("orderHeadLineNo"));
			manufacturingHistory.put("orderAssembly", material.get("steelActualItemCd4"));
			manufacturingHistory.put("component", material.get("steelActualItemCd3"));
			manufacturingHistory.put("assembly", material.get("steelActualItemCd4"));
			manufacturingHistory.put("routingNo", routingNo);
			manufacturingHistory.put("operationCode", operationCode);
			manufacturingHistory.put("esdOtTp", "D");
			manufacturingHistory.put("transType", "02");
			manufacturingHistory.put("transactionType", "02");
			manufacturingHistory.put("spcmnNo", spcmnNo);
			manufacturingHistory.put("usage", material.get("bapChargeTPrcTm"));
			manufacturingHistory.put("realPrcF", "R");
			
			PosLogger.developerLog(PosLogWriterIF.INFO,
					"########### 제조이력 : event데이터 :" + manufacturingHistory, this);
			boolean result = this.agentProxy.sendEvent(manufacturingHistory);			
			PosLogger.developerLog(PosLogWriterIF.INFO,
					"########### 제조이력 : event송신결과 :" + result, this);
		}
	}

	
	/**
	 * @MethodName(한글) : BAP실적테이블 저장
	 * @desc BAP실적데이터를 BAP실적과  History테이블에 저장
	 * @param data
	 * @return String
	 */
	private String saveBapWorkResult(Map<String, Object> data) {
		
		String sndrInformEditPgmId = data.get("sndrInformEditPgmId") != null? data.get("sndrInformEditPgmId").toString() : null;
		PosLogger.developerLog(PosLogWriterIF.INFO, "######## saveBapWorkResult : sndrInformEditPgmId " + sndrInformEditPgmId, this);

		BigDecimal bapFieldNum = new BigDecimal(data.get("bapFieldNum").toString());
		BigDecimal bapPrcPasNum = new BigDecimal(data.get("bapPrcPasNum").toString());
		String mtlNo = data.get(CAMEL_MTL_NO).toString();
		BigDecimal bapTPrcPasNum = BigDecimal.ZERO;
		String worksCode = data.get(CAMEL_WORKS_CODE).toString();
		//처리차수
		List<BAPResult> bapResults = this.bapResultService.findByMtlNo(mtlNo);
		bapTPrcPasNum = new BigDecimal(bapResults.size());
		
		//기존 BAP실적 데이터가 있는지 조회
		BAPResult bapResult = this.bapResultService.findByUniqueKey(bapFieldNum, bapPrcPasNum, mtlNo);
		PosLogger.developerLog(PosLogWriterIF.INFO, "########### saveBapWorkResult : bapResult :" + bapResult, this);

		//화면에서 데이터 수정
		if(bapResult != null && sndrInformEditPgmId != null && "m2db030110".equals(sndrInformEditPgmId))
		{
			BigDecimal prdEucPrcDim = bapResult.getPrdEucPrcDim() != null ? bapResult.getPrdEucPrcDim() : BigDecimal.ONE;
			BigDecimal prdAcReprcTim = bapResult.getPrdAcReprcTim() != null ? bapResult.getPrdAcReprcTim() : BigDecimal.ZERO;
			BigDecimal dtUpdDim = bapResult.getDtUpdDim() != null ? bapResult.getDtUpdDim() : BigDecimal.ZERO;
			
			bapResult.setPrdEucPrcDim(prdEucPrcDim);
			bapResult.setPrdAcReprcTim(prdAcReprcTim);
			bapResult.setDtUpdDim(dtUpdDim);

			dtUpdDim =dtUpdDim.add(BigDecimal.ONE); //Data수정차수 + 1
			data.put("prdEucPrcDim", prdEucPrcDim);
			data.put("prdAcReprcTim", prdAcReprcTim);
			data.put("dtUpdDim", dtUpdDim);

			BAPResultHistory bapHistorySaveResult = this.bapResultHistoryService.register(M2db03EntityUtil.convertObjectToMap(bapResult));
			PosLogger.developerLog(PosLogWriterIF.INFO, "########### bapHistorySaveResult :" + bapHistorySaveResult, this);
		}
		//TC재발생
		else if(bapResult != null)
		{
			data.put("prdEucPrcDim", bapResult.getPrdEucPrcDim() != null ? bapResult.getPrdEucPrcDim() : BigDecimal.ONE);	//생산공정처리차수
			data.put("prdAcReprcTim", 0);	//생산실적재처리횟수
			data.put("dtUpdDim", 0);	//Data수정차수
		}
		//재처리 및 첫처리
		else
		{
			data.put("prdEucPrcDim", bapTPrcPasNum.add(BigDecimal.ONE));	//생산공정처리차수
			data.put("prdAcReprcTim", 0);	//생산실적재처리횟수
			data.put("dtUpdDim", 0);	//Data수정차수
		}
		//광양일 때, leadTime실적 Setting
		if(CONST_WORKS_CODE_K.equals(worksCode)) {
			BAPLeadTimeInfoDto bapLeadTimeInfoDto = m2drq0Proxy.getBAPLeadTimeInfo(mtlNo);
			if(bapLeadTimeInfoDto != null )
			{
				PosLogger.developerLog(PosLogWriterIF.INFO, "########### bapLeadTimeInfoDto :" + bapLeadTimeInfoDto, this);
	
				data.put("smSrefBapTgJobTm", bapLeadTimeInfoDto.getSmSrefBapTgJobTm());
				data.put("smSrefBapTgTrsTm", bapLeadTimeInfoDto.getSmSrefBapTgTrsTm());
				data.put("smSrefBapATrsTm", bapLeadTimeInfoDto.getSmSrefBapATrsTm());
			}
		}
		BAPResult bapSaveResult = this.bapResultService.register(data);
		String result = "완료";
		if (bapSaveResult == null) {
			result = "BAP실적을 저장하는데 실패했습니다.";
		}
		return result;
	}

	/**
	 * @MethodName(한글) : Scrap배합원단가Setting
	 * @desc 제강전로Scrap배합원단가를 계산하고 저장한다.
	 * @param data
	 */
	private void PosScrapMixResultPrimeUnitCostSend(Map<String, Object> data) {

		String worksCode = data.containsKey(CAMEL_WORKS_CODE) && data.get(CAMEL_WORKS_CODE) != null
				? data.get(CAMEL_WORKS_CODE).toString()
				: null;
		String facOpCdN = data.containsKey(CAMEL_FAC_OP_CD_N) && data.get(CAMEL_FAC_OP_CD_N) != null
				? data.get(CAMEL_FAC_OP_CD_N).toString().substring(0, 1) + "L1"
				: null;
		String operFlag = data.containsKey(CAMEL_OPER_FLAG) && data.get(CAMEL_OPER_FLAG) != null
				? data.get(CAMEL_OPER_FLAG).toString()
				: null;

		String mrmatSubRmatTp = "A";
		String mtlNo = data.get(CAMEL_MTL_NO).toString();
		BigDecimal smLdScrpCmbCpri = BigDecimal.ZERO;
		PosScrapMixResultPrimeUnitCostDto posScrapMixResultPrimeUnitCostDto = this.m2drq0Proxy
				.findPosScrapMixResultPrimeUnitCost(worksCode, facOpCdN, mtlNo, mrmatSubRmatTp);
		PosLogger.developerLog(PosLogWriterIF.INFO,
				"posScrapMixResultPrimeUnitCostDto : " + posScrapMixResultPrimeUnitCostDto, this);

		if (posScrapMixResultPrimeUnitCostDto == null) {
			PosLogger.developerLog(PosLogWriterIF.INFO, "제강전로Scrap배합 실적원단가 정보가 존재하지 않습니다.", this);
		}
		else
			smLdScrpCmbCpri = posScrapMixResultPrimeUnitCostDto.getSmLdScrpCmbCpri()!=null?posScrapMixResultPrimeUnitCostDto.getSmLdScrpCmbCpri():BigDecimal.ZERO;
		PosLogger.developerLog(PosLogWriterIF.INFO, "smLdScrpCmbCpri : " + smLdScrpCmbCpri, this);
		if (smLdScrpCmbCpri.compareTo(BigDecimal.ZERO) > 0) {
			// 조업지원Layer는 동일level로 mediator로 접근해 저장한다.
			Map<String, String> reqParam = new HashMap<String, String>();
			//reqParam.put(CAMEL_MTL_NO, mtlNo);
//			String serviceId = "m2db08-support-test";
			String serviceId = "m2db08-support";
			String path = "scrapMixResult" + "/" + mtlNo;

			PosLogger.developerLog(PosLogWriterIF.INFO, "########### reqParam데이터 : " + reqParam, this);

			Map<String, Object> updateScrapMixData = new HashMap<String, Object>();
			updateScrapMixData.put("smLdScrpCmbCpri", smLdScrpCmbCpri);
			PosLogger.developerLog(PosLogWriterIF.INFO, "########### scrap배합실적데이터 : " + updateScrapMixData, this);

			ResponseEntity<String> updateSrapMix = this.agentProxy.mediatorPut(serviceId, path, reqParam,
					updateScrapMixData);
			PosLogger.developerLog(PosLogWriterIF.INFO, "########### scrap배합실적데이터Update 결과 : " + updateSrapMix, this);

			// 원단가 송신 기동
			path = "scrapMixMaterialUnitPrice/scrapMixPrimeUnitCostSend";
			Map<String,String> unitCostMap = new HashMap<String, String>();
			unitCostMap.put(CAMEL_WORKS_CODE, data.get(CAMEL_WORKS_CODE).toString());
			unitCostMap.put(CAMEL_OPER_FLAG, data.get(CAMEL_OPER_FLAG).toString());
			unitCostMap.put(CAMEL_FAC_OP_CD_N, data.get(CAMEL_FAC_OP_CD_N).toString());
			unitCostMap.put(CAMEL_MTL_NO, data.get(CAMEL_MTL_NO).toString());
			unitCostMap.put("abmPlanActualType", "A"); // 계획실적구분(A:실적, B:계획)
			unitCostMap.put(CAMEL_PLAN_CHARGE_NO, posScrapMixResultPrimeUnitCostDto!=null?posScrapMixResultPrimeUnitCostDto.getPlanChargeNo():null);
			unitCostMap.put("mrmatSubRmatTp", "A");
			unitCostMap.put("smLdChCueNo",posScrapMixResultPrimeUnitCostDto!=null && posScrapMixResultPrimeUnitCostDto.getSmLdChCueNo()!=null?posScrapMixResultPrimeUnitCostDto.getSmLdChCueNo().toString():null);
			unitCostMap.put(CAMEL_INDI_MTL_NO, posScrapMixResultPrimeUnitCostDto!=null?posScrapMixResultPrimeUnitCostDto.getIndiMtlNo():null);

			PosLogger.developerLog(PosLogWriterIF.INFO, "########### 원단가 송신데이터 : " + unitCostMap, this);
			
			ResponseEntity<String> unitCostSend = this.agentProxy.mediatorGet(serviceId, path, unitCostMap);
			PosLogger.developerLog(PosLogWriterIF.INFO, "########### 원단가 송신 결과 : " + unitCostSend, this);

		}
	}

	/**
	 * @MethodName(한글) : Charge재료 BAP실적항목 저장
	 * @desc Charge통과공정코드,BAP총처리차수,BAP차수별총처리시간,2차정련BAP대표실적Pattern구분을 Setting하고
	 *       Charge재료테이블에 저장한다.
	 * @param chargeMaterial
	 * @param data
	 */
	private void setSummaryDataOfBapResult(Map<String, Object> chargeMaterial, Map<String, Object> data) {
		String mtlNo = data.get(CAMEL_MTL_NO).toString();
		// BAP장번호
		BigDecimal bapFieldNum = new BigDecimal(data.get(CAMEL_BAP_FIELD_NUM).toString());
		// Charge통과공정코드
		String chargePsOpCd = null;
		// 2차정련BAP처리Pattern
		String secondRefBapPrcPtrn1 = null;
		String secondRefBapPrcPtrn2 = null;
		// BAP총처리차수
		BigDecimal bapTPrcPasNum = null;
		// BAP차수별총처리시간
		BigDecimal bapChargeTPrcTm = null;
		// 2차정련BAP대표실적Pattern구분
		String secondRefBapManPrcPtrnTp = null;
		// 제강2차정련코드
		String sm2ndRfnCd = null;
		// BAP공정 + BAP장번호
		String bapOpCd = "B" + bapFieldNum.intValue();

		List<BAPResult> bapResults = this.bapResultService.findByMtlNo(mtlNo);

		if (bapResults != null && !bapResults.isEmpty()) {
			List<BAPResult> steelSecondRefBapPrcPtrn = new ArrayList<BAPResult>();
			for (BAPResult bapResult : bapResults) {
				if (bapResult.getSecondRefBapPrcPtrn() == null)
					bapResult.setSecondRefBapPrcPtrn("");
			}
			steelSecondRefBapPrcPtrn = bapResults.stream()
					.sorted(Comparator.comparing(BAPResult::getSecondRefBapPrcPtrn).reversed())
					.collect(Collectors.toList());
			secondRefBapPrcPtrn1 = steelSecondRefBapPrcPtrn.size() >= 1
					? steelSecondRefBapPrcPtrn.get(0).getSecondRefBapPrcPtrn()
					: null;
			secondRefBapPrcPtrn2 = steelSecondRefBapPrcPtrn.size() >= 2
					? steelSecondRefBapPrcPtrn.get(1).getSecondRefBapPrcPtrn()
					: null;

			bapTPrcPasNum = new BigDecimal(bapResults.size());

			bapChargeTPrcTm = BigDecimal.ZERO;
			for (BAPResult result : bapResults) {
				bapChargeTPrcTm = bapChargeTPrcTm.add(result.getBapPasNumTPrcTm());
				PosLogger.developerLog(PosLogWriterIF.INFO, "BapPasNumTPrcTm : " + result.getBapPasNumTPrcTm(), this);
			}

			PosLogger.developerLog(PosLogWriterIF.INFO, "secondRefBapPrcPtrn1 : " + secondRefBapPrcPtrn1, this);
			PosLogger.developerLog(PosLogWriterIF.INFO, "secondRefBapPrcPtrn2 : " + secondRefBapPrcPtrn2, this);

			/*
			 * 이 값이 wip생산실적 송신 데이타의 uage값으로 사용되는 데 0인 경우 wip에 에러발생하게 됨 1로 설정해서 생산실적 wip에러
			 * 발생방지하고자 처리 함. 20140610. 김정중
			 */
			if (bapChargeTPrcTm.compareTo(BigDecimal.ZERO) == 0)
				bapChargeTPrcTm = BigDecimal.ONE;
		}

		Map<String, Object> ruleParam = new HashMap<String, Object>();

		Map<String, Object> M22B0001 = null;

		String tmpChargePsOpCd = chargeMaterial.get("chargePsOpCd") == null ? ""
				: chargeMaterial.get("chargePsOpCd").toString();
		if (tmpChargePsOpCd.length() < 15 && tmpChargePsOpCd.indexOf(bapOpCd) == -1)
			chargePsOpCd = tmpChargePsOpCd + bapOpCd;
		else
			chargePsOpCd = tmpChargePsOpCd;
		// 제강2차정련코드
		sm2ndRfnCd = chargeMaterial.get("sm2ndRfnCd") == null ? null : chargeMaterial.get("sm2ndRfnCd").toString();

		ruleParam.put("SECOND_REF_BAP_PRC_PTRN1", secondRefBapPrcPtrn1);
		ruleParam.put("SECOND_REF_BAP_PRC_PTRN2", secondRefBapPrcPtrn2);
		ruleParam.put("SM_2ND_RFN_CD", sm2ndRfnCd);
		PosLogger.developerLog(PosLogWriterIF.INFO, "ruleParam : " + ruleParam, this);

		M22B0001 = this.getBizRule("M2DB03_00001", ruleParam);

		PosLogger.developerLog(PosLogWriterIF.INFO, "M22B0001 : " + M22B0001, this);

		if (M22B0001 == null || M22B0001.isEmpty())
			secondRefBapManPrcPtrnTp = null;
		else if(M22B0001.containsKey("SECOND_REF_BAP_MAN_PRC_PTRN_TP"))
			secondRefBapManPrcPtrnTp = M22B0001.get("SECOND_REF_BAP_MAN_PRC_PTRN_TP")!=null?M22B0001.get("SECOND_REF_BAP_MAN_PRC_PTRN_TP").toString():null;
		// UpdateChargeCurrent
		Map<String, Object> updateCharge = new HashMap<String, Object>();

		updateCharge.put("chargePsOpCd", chargePsOpCd);// chargePsOpCd
		updateCharge.put("bapTPrcPasNum", bapTPrcPasNum);// bapTPrcPasNum
		updateCharge.put("bapChargeTPrcTm", bapChargeTPrcTm);// bapChargeTPrcTm
		updateCharge.put("secondRefBapManPrcPtrnTp", secondRefBapManPrcPtrnTp);// secondRefBapManPrcPtrnTp
		updateCharge.put("smMltMnKwrmfUsgTp", data.get("smMltMnKwrmfUsgTp"));// secondRefBapManPrcPtrnTp

		PosLogger.developerLog(PosLogWriterIF.INFO, "updateCharge : " + updateCharge, this);

		this.m2dc01Proxy.modifyChargeMaterial(mtlNo,updateCharge);

	}

	/**
	 * @MethodName(한글) : 원료사용실적데이터 저장
	 * @desc Bap실적에서 사용한 원료데이터를 원료사용실적테이블에 기존 데이터를 삭제하고 저장한다.
	 * @param rawMaterials
	 */
	private void saveRawMaterialWorkResults(List<Map<String, Object>> rawMaterials) {
		// 기존 원료사용실적에 deleteFlag(dataEndStatus에 *을 Insert)
		PosLogger.developerLog(PosLogWriterIF.INFO, "#######rawMaterials : " + rawMaterials, this);
		if (rawMaterials != null && rawMaterials.size() > 0) {
			Map<String, Object> rawMaterial = rawMaterials.get(0);

			String mtlNo = rawMaterial.get(CAMEL_MTL_NO).toString();
			String facOpCdN = rawMaterial.get(CAMEL_FAC_OP_CD_N).toString();
			String mSteWkYrdNo = rawMaterial.get("mSteWkYrdNo").toString();
			String acOcrPasNum = rawMaterial.get("acOcrPasNum").toString();

			// 기존 원료사용실적에 deleteFlag(dataEndStatus에 *을 Insert)
			this.m2dc01Proxy.expireRawMaterialUseResult(mtlNo, facOpCdN, mSteWkYrdNo, acOcrPasNum);

			// 새로운 원료사용실적을 저장한다.
			for (Map<String, Object> map : rawMaterials) {
				PosLogger.developerLog(PosLogWriterIF.INFO, "#######map : " + map, this);
				// 20191017 문의드리기 : RH에서는 String으로 변환안해도 저장 잘 됨.. ?? 
				map.put("acOcrPasNum", acOcrPasNum);
				this.m2dc01Proxy.registerRawMaterialUseResult(map);
			}
		}

	}

	/**
	 * Biz Rule 조회
	 * @param ruleId
	 * @param ruleParam
	 * @return Map<String, Object>
	 */
	private Map<String, Object> getBizRule(String ruleId, Map<String, Object> ruleParam) {

		Map<String, Object> listRule = masterDataService.getBizRule(ruleId, ruleParam);

		return listRule;
	}

	/**
	 * @MethodName(한글) : 원료데이터 편집
	 * @desc Bap실적에서 사용한 원료데이타를 주부원료실적Table에 저장하기 위해 데이터를 Setting한다.
	 * @param data
	 * @return List<Map<String, Object>>
	 */
	private List<Map<String, Object>> setRawMaterialDataOfBapResult(Map<String, Object> data) {

		List<Map<String, Object>> rawMaterial1 = (List<Map<String, Object>>) data.get("bapTopBbGr1");
		List<Map<String, Object>> rawMaterial2 = (List<Map<String, Object>>) data.get("smRmatThwGr");

		// 저장할 공통데이터
		String operFlag = data.get(CAMEL_OPER_FLAG).toString();
		String facOpCdN = data.get(CAMEL_FAC_OP_CD_N).toString();
		String worksCode = data.get(CAMEL_WORKS_CODE).toString();
		BigDecimal bapPrcPasNum = new BigDecimal(data.get(CAMEL_BAP_PRC_PAS_NUM).toString());
		BigDecimal bapFieldNum = new BigDecimal(data.get(CAMEL_BAP_FIELD_NUM).toString());

		Map<String, Object> commonAttr = new HashMap<String, Object>();
		commonAttr.put(CAMEL_MTL_NO, data.get(CAMEL_CHARGE_NO));
		commonAttr.put(CAMEL_OPER_FLAG, operFlag);
		commonAttr.put(CAMEL_FAC_OP_CD_N, facOpCdN);
		commonAttr.put(CAMEL_WORKS_CODE, worksCode);
		commonAttr.put(CAMEL_AC_OCR_PAS_NUM, bapPrcPasNum.intValue());
		commonAttr.put(CAMEL_M_STE_WK_YRD_NO, bapFieldNum.intValue());

		// ccCode 조회
		String[] params = new String[] { operFlag, facOpCdN, "", "%", "", "" };
		Map<String, Object> masterDataMap = masterDataService.getPosRuleMasterData("M00A0001", params); // 공장공정코드와CostCenterMapping기준
		String ccCode = (String) masterDataMap.get("OPERATION_CODE1");
		commonAttr.put("ccCode", ccCode);
		PosLogger.developerLog(PosLogWriterIF.INFO, "commonAttr : "+commonAttr, this);


		// 데이터 추출
		if (rawMaterial1 == null || rawMaterial2 == null)
			return null;
		List<Map<String, Object>> rawMaterialList = new ArrayList<Map<String, Object>>();

		int i = 1;
		for(Map<String, Object> rawMaterial:rawMaterial1) 
		{
			Map<String, Object> map = new HashMap<String, Object>();
			Object rmatManItemDescCdN = rawMaterial.get("rmatManItemDescCdN1");
			if(rmatManItemDescCdN != null && !"".equals(rmatManItemDescCdN)) {
				map.put("rmatManItemDescCdN", rmatManItemDescCdN);
				map.put("smRmatThwTmTpCd","I"+i);
				map.put("smRmatThwQt", rawMaterial.get("bapSubRmatChargeTThwQt"));
				map.putAll(commonAttr);
				rawMaterialList.add(map);
				i++;
			}
		}
		rawMaterial2.forEach(rawMaterial -> {
			Map<String, Object> map = new HashMap<String, Object>();
			Object rmatManItemDescCdN = rawMaterial.get("rmatManItemDescCdN2");
			if(rmatManItemDescCdN != null && !"".equals(rmatManItemDescCdN)) {
			map.put("rmatManItemDescCdN", rmatManItemDescCdN);
			map.put("smRmatThwTmTpCd","T1");
			map.put("smRmatThwSatDt", rawMaterial.get("smRmatThwSatDt"));
			map.put("smRmatThwDnDt", rawMaterial.get("smRmatThwDnDt"));
			map.put("smRmatThwQt", rawMaterial.get("bapSubRmatThwQt"));
			map.putAll(commonAttr);
			rawMaterialList.add(map);
			}
		});
		PosLogger.developerLog(PosLogWriterIF.INFO, "rawMaterialList : " + rawMaterialList, this);

		List<Map<String, Object>> result = this.setRawMaterialList(rawMaterialList);
		if (result == null || result.isEmpty())
			return null;
		return result;
	}

	/**
	 * @MethodName(한글) : 원료데이터List Setting
	 * @desc Bap실적에서 사용한 원료데이타를 주부원료실적Table에 저장하기 위해 데이터를 Setting한다.
	 * @param rawMaterialList
	 * @return List<Map<String, Object>>
	 */
	private List<Map<String, Object>> setRawMaterialList(List<Map<String, Object>> rawMaterialList) {
		List<Map<String, Object>> result = new ArrayList<Map<String, Object>>();

		for (Map<String, Object> rawMaterial : rawMaterialList) {
			String rmatManItemDescCdN = rawMaterial.get("rmatManItemDescCdN") != null
					? rawMaterial.get("rmatManItemDescCdN").toString()
					: null;
			// 원료대표품명코드가 없으면 MAP에 담지 않는다.
			if (rmatManItemDescCdN == null || rmatManItemDescCdN.trim().equals(""))
				continue;
			Map<String,Object> pumSteel = this.m2drq0Proxy.findPumSteel(rawMaterial.get(CAMEL_WORKS_CODE).toString(),
					rawMaterial.get("ccCode").toString(),
					rmatManItemDescCdN);
			if (pumSteel == null || pumSteel.isEmpty()) {
				if ("C".equals(rawMaterial.get(CAMEL_OPER_FLAG).toString())) {
					// 포항 탄소강의 경우 P/C에서 수신한 원료품명이 pumSteel에 등록되어 있지 않은 경우 현업(김동백 총괄님)에 메일링 함.
					sendMailPumSteelNotRegisteredInfo(rawMaterial.get(CAMEL_OPER_FLAG).toString(),rawMaterial.get(CAMEL_WORKS_CODE).toString(),rawMaterial.get("ccCode").toString(),rmatManItemDescCdN);
				}
				continue;
			}
			PosLogger.developerLog(PosLogWriterIF.INFO, "pumSteel : " + pumSteel, this);
			rawMaterial.put("rmatManItemDescCdNam", pumSteel.get("rmatManItemDescCdNam"));
			rawMaterial.put("mrmatSubRmatTp", pumSteel.get("mrmatSubRmatTp"));
			rawMaterial.put("assemblyItemNumber", pumSteel.get("assemblyItemNumber"));
			rawMaterial.put("subInventoryCode", pumSteel.get("subInventoryCode"));

			PosLogger.developerLog(PosLogWriterIF.INFO, "rawMaterial : " + rawMaterial, this);
			result.add(rawMaterial);
		}
		return result == null && result.isEmpty() ? null : result;
	}


    /**
     * 포항 탄소강의 경우 P/C에서 수신한 원료품명이 pum steel 에 등록되어 있지 않은 경우 현업에 메일링 함.
     *  @param   operFlag : 조업구분
     *  @param   worksCode : 사소구분
     *  @param   ccCode : cost center
     *  @param   rmatManItemDescCdN : 원료품명코드
     */
	private void sendMailPumSteelNotRegisteredInfo(String operFlag, String worksCode, String ccCode,
			String rmatManItemDescCdN) {
		Map<String,Object> emailAddress = null;
		try {
	    PosMailSender pms = new PosMailSender();
	    String subject = "[확인요청]제강대표품명관리 누락정보 확인바랍니다.";
	    String content = "<br>사소구분 : "+worksCode+"<br>CostCenter : "+ccCode+"<br>원료대표품명코드 : "+rmatManItemDescCdN+"<br><br>위 정보에 해당하는 원료대표품명정보가 원료 마스터에 등록되어 있지 않아 원료사용실적에 등록되지 못했습니다.";
	    
		Map<String, Object> ruleParam = new HashMap<String, Object>();
		ruleParam.put("OPER_FLAG", "C");
		
		emailAddress = this.getBizRule("M2DB02_00002", ruleParam);
		PosLogger.developerLog(PosLogWriterIF.INFO, "[EmailAddress]" + emailAddress, this);

	    
	    pms.setHtmlType(true);
		String from = "System@posco.com";
		if(emailAddress != null && !emailAddress.isEmpty())
			pms.send(from, emailAddress, subject, content);

		PosLogger.developerLog(PosLogWriterIF.INFO, "[EmailAddress : " + emailAddress + "] 송신성공", this);

		}
		catch(Exception e) {
			PosLogger.developerLog(PosLogWriterIF.ERROR,
					"[EmailAddress : " + emailAddress + "] 송신실패 : " + e.getMessage(), e, this);
		}
	}

	/**
	 * @MethodName(한글) : 메세지Parsing
	 * 
	 * @desc 해당 메세지를 Parsing해 그룹항목을 단일항목들로 Setting한다.
	 * @param data
	 * @return Map<String, Object>
	 */
	private Map<String, Object> parseMessage(Map<String, Object> data) {

		List<Object> groupList = new ArrayList<Object>();
		groupList.add(data.get("bapTopBbGr1"));
		groupList.add(data.get("bapBotBbGr"));
		groupList.add(data.get("bapMSteTmGr"));
		// groupList.add(data.get("제강부원료투입Gr"));
		groupList.add(data.get("opSortPrspgGr"));
		groupList.add(data.get("oxygenBlowingGr"));
		groupList.add(data.get("slagTMseGr"));
		groupList.add(data.get("bapTopBbGr2"));
		groupList.add(data.get("smSrefBapIsSmpGr2"));

		if (groupList == null || groupList.isEmpty())
			return data;
		int i = 0;

		for (Object group : groupList) {
			if (group == null)
				continue;
			PosLogger.developerLog(PosLogWriterIF.INFO, "group" + i + " : " + group, this);

			Map<String, Object> map = this.parseGroup((List<Map<String, Object>>) group);
			data.putAll(map);
			i++;
		}

		PosLogger.developerLog(PosLogWriterIF.INFO, "data : " + data, this);

		return data;
	}

	/**
	 * @MethodName(한글) : 그룹항목Parsing
	 * 
	 * @desc 그룹항목을 단일항목들로 Setting한다.
	 * @param group
	 * @return Map<String, Object>
	 */
	private Map<String, Object> parseGroup(List<Map<String, Object>> group) {
		Map<String, Object> result = new HashMap<String, Object>();
		String fieldName = null;
		Object fieldValue = null;
		int i = 1;
		PosLogger.developerLog(PosLogWriterIF.INFO, "group.size : " + group.size(), this);

		for (Map<String, Object> map : group) {
			for (Map.Entry<String, Object> elem : map.entrySet()) {
				if (elem == null)
					continue;
				fieldName = elem.getKey();

				if (fieldName.contains("1")) {
					fieldName = fieldName.replace("1", "");
					PosLogger.developerLog(PosLogWriterIF.INFO, "fieldName : " + fieldName, this);
				}
				if (fieldName.contains("rmatManItemDescCd") || fieldName.contains("bapSubRmatChargeTThwQt"))
					continue;
				fieldValue = elem.getValue();

				result.put(fieldName + i, fieldValue);
			}
			i++;
		}
		PosLogger.developerLog(PosLogWriterIF.INFO, "result : " + result, this);
		return result;
	}

	/**
	 * @MethodName(한글) : 수강Ladle번호Setting
	 * 
	 * @desc 해당강번의 수강Ladle번호를 조회해서 가져온다.(Table : PN_M224D040)
	 * @param mtlNo
	 * @return BigDecimal
	 */
	private BigDecimal getLatestLdNum(String mtlNo) {
		//수강래들준비실적 조회
		//Mediator사용 							
		String serviceId = "m2db07-facility";
		String path = "steel-ladle-preparation-result/find/"+mtlNo;
		Map<String,String> reqParam = new HashMap<String, String>();
		
		List<Map<String,Object>> steelLadlePreparationResult = this.agentProxy.mediatorGetList(serviceId, path, reqParam);
		PosLogger.developerLog(PosLogWriterIF.INFO, "########### STEEL LADLE PRE : "+steelLadlePreparationResult, this);

		if(steelLadlePreparationResult == null || steelLadlePreparationResult.isEmpty())
			return null;
		if(steelLadlePreparationResult.size()==1)
			return new BigDecimal(String.valueOf(steelLadlePreparationResult.get(0).get("dstlLadNum")));
		
		Collections.sort(steelLadlePreparationResult, new Comparator<Map<String, Object>>() {
			@Override
			public int compare(Map<String, Object> o1, Map<String, Object> o2) {
				return ((BigDecimal) (o2.get("dstlLadIncommingCnt"))).compareTo((BigDecimal) o1.get("dstlLadIncommingCnt"));
			}
		});
		PosLogger.developerLog(PosLogWriterIF.INFO, "steelLadlePreparationResult sorted by dstlLadIncommingCnt: "+steelLadlePreparationResult, this);

		Map<String,Object> latestResult = steelLadlePreparationResult.stream().findFirst().get();							
		return latestResult.get("dstlLadNum")!=null?new BigDecimal(String.valueOf(latestResult.get("dstlLadNum"))):null;
	
	}

	/**
	 * @MethodName(한글) : Charge재료 조회
	 * 
	 * @desc Charge재료 데이터를 조회한다.
	 * @param mtlNo
	 * @return Map<String, Object>
	 */
	private Map<String, Object> findChargeMaterial(String mtlNo) {
		Map<String, Object> chargeMaterial = m2dc01Proxy.findChargeMaterial(mtlNo);
		return chargeMaterial;
	}

	/**
	 * @MethodName(한글) : 작업일자와 작업근조 조회
	 * 
	 * @desc EasyAccess를 이용하여 작업일자와 작업근조를 가져오는 기능.
	 * @param bapSatDt
	 * @param worksCode
	 * @param operFlag
	 * @param facOpCdN
	 * @return List<String>
	 */
	private List<String> makeOpSumupStf(String bapSatDt, String worksCode, String operFlag, String facOpCdN) {
		Map<String,Object> opGroup =null;
		List<String> result = null;
	
			result = new ArrayList<String>();
			opGroup =masterDataService.getPosOpShiftData(bapSatDt,worksCode,operFlag,facOpCdN);
			PosLogger.developerLog(PosLogWriterIF.INFO, "opGroup : "+opGroup, this);
			if(opGroup != null)
			{
				result.add(opGroup.get("posDate")!=null?opGroup.get("posDate").toString():null);
				result.add(opGroup.get("workShift")!=null?opGroup.get("workShift").toString():null);
			}
		return result;
	}

	/**
	 * @MethodName(한글) : 제강2차정련BAP공Ladle보열시간 값 조회
	 * 
	 * @desc BAP실적 수신 시에 BAP도착출발 때에 수신한 제강2차정련BAP공Ladle보열시간 값을 조회한다.
	 *       (공정진행테이블/PN_M225D010 조회)
	 * @param mtlNo
	 * @return BigDecimal
	 */
	private BigDecimal getSm2ndRefBapVacLadShtTm(String mtlNo) {
		// 공정진행 조회
		List<String> mtlNos = new ArrayList<String>();
		mtlNos.add(mtlNo);
		BigDecimal sm2ndRefBapVacLadShtTm = null;
		List<OperationProgress> chargingProcessCurrent = m2dc01Proxy.findOperationProgressAll("Q1", mtlNos);
		PosLogger.developerLog(PosLogWriterIF.INFO,
				"########### charingProcessCurrent :" + chargingProcessCurrent.toString(), this);
		if (chargingProcessCurrent != null && !chargingProcessCurrent.isEmpty()) {
			sm2ndRefBapVacLadShtTm = chargingProcessCurrent.get(0).getSm2ndRefBapVacLadShtTm();
		}
		return sm2ndRefBapVacLadShtTm;
	}

	/**
	 * @MethodName(한글) : 두 날짜 간의 시간 차를 구한다.
	 * 
	 * @desc 두 날짜 간의 시간 차를 구한다.
	 * @param startDate
	 * @param endDate
	 * @param criteria
	 * @return BigDecimal
	 */
	private BigDecimal getMinutesBetweenTwoDates(Object startDate, Object endDate, String criteria) {
		Timestamp start = M2db03DateUtil.convertToTimestamp(startDate);
		Timestamp end = M2db03DateUtil.convertToTimestamp(endDate);

		BigDecimal diff = new BigDecimal(M2db03DateUtil.getGapTimes(start, end, "S")).divide(BigDecimal.valueOf(60.00),
				1, RoundingMode.HALF_UP);
		if (criteria == null)
			return diff;
		if (diff.abs().compareTo(new BigDecimal(criteria)) > 0)
			diff = new BigDecimal(criteria);
		return diff;
	}

	/**
	 * @MethodName(한글) : BAP실적저장서비스
	 * @desc BAP실적 저장 서비스를 Set한다.
	 * @param bapResultService
	 */
	@Override
	public void setBAPResultService(BAPResultService bapResultService) {
		this.bapResultService = bapResultService;
	}

	/**
	 * @MethodName(한글) : Master서비스
	 * @desc Master조회 서비스를 Set한다.
	 * @param masterDataService
	 */
	@Override
	public void setMasterDataService(MasterDataService masterDataService) {
		this.masterDataService = masterDataService;
	}

	/**
	 * @MethodName(한글) : BAP실적History저장서비스
	 * @desc BAP실적History 서비스를 Set한다.
	 * @param bapResultHistoryService
	 */
	@Override
	public void setBapResultHistoryService(BAPResultHistoryService bapResultHistoryService) {
		this.bapResultHistoryService = bapResultHistoryService;
	}
}
