
package com.posco.mes3.m2dc01.domain.logic.entity.charge;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import com.posco.mes.reuse.common.logging.PosLogWriterIF;
import com.posco.mes.reuse.common.logging.PosLogger;
import com.posco.mes3.m2dc01.domain.entity.charge.ChargeMaterial;
import com.posco.mes3.m2dc01.domain.entity.dto.n1b.N1bSpecChargeDto;
import com.posco.mes3.m2dc01.domain.lifecycle.BatchStoreLifecycle;
import com.posco.mes3.m2dc01.domain.lifecycle.ProxyLifecycle;
import com.posco.mes3.m2dc01.domain.lifecycle.StoreLifecycle;
import com.posco.mes3.m2dc01.domain.proxy.MaterialEventProducer;
import com.posco.mes3.m2dc01.domain.spec.entity.charge.ChargeMaterialService;
import com.posco.mes3.m2dc01.domain.store.charge.ChargeMaterialStore;
import com.posco.mes3.m2dc01.domain.store.readonly.BatchMaterialStore;
import com.posco.mes3.m2dc01.domain.store.readonly.ControlStore;
import com.posco.mes3.m2dc01.helper.M2dc01DateUtil;
import com.posco.mes3.m2dc01.helper.M2dc01EntityUtil;
import com.posco.mes3.m2dc01.helper.M2dc01Util;
import com.posco.mes3.m2dc01.helper.constants.M2dc01Constants;
import com.posco.mes3.material.domain.entity.SteelMaterial;
import com.posco.mes3.reuse.common.errorobjects.PosBaseException;
import com.posco.mes3.sharedservice.share.domain.BooleanFilter;
import com.posco.mes3.sharedservice.share.domain.DynamicWhereFilter;
import com.posco.mes3.sharedservice.share.domain.Expression;
import com.posco.mes3.sharedservice.share.util.SharedServiceEventMapper;
import com.poscoict.base.share.domain.NameValueList;
import com.poscoict.base.share.util.string.StringUtil;

/**
 * 제강재료를 처리하기 위한 Class이다.
 *
 * @author  wy.seo
 * @version 1.0
 */
public class ChargeMaterialLogic implements ChargeMaterialService, M2dc01Constants {
	//
	private BatchMaterialStore batchMaterialStore;
	private ChargeMaterialStore chargeMaterialStore;
	private ControlStore controlStore;
	private final MaterialEventProducer materialEventProducer;

	/**
	 * ChargeMaterialLogic
	 *
	 * @param batchStoreLifecycle
	 */
	public ChargeMaterialLogic(BatchStoreLifecycle batchStoreLifecycle) {
		//
		this.batchMaterialStore = batchStoreLifecycle.requestBatchMaterialStore();
		this.materialEventProducer = null; // batch 에서는 사용하지 않으므로 NULL 로 SET
	}
	/**
	 * 제강재료를 처리한다.
	 *
	 * @param storeLifecycle
	 * @param proxyLifecycle
	 * @param materialEventProducer
	 */
	public ChargeMaterialLogic(StoreLifecycle storeLifecycle, ProxyLifecycle proxyLifecycle, MaterialEventProducer materialEventProducer) {
		//
		this.chargeMaterialStore = storeLifecycle.requestChargeMaterialStore();
		this.controlStore = storeLifecycle.requestControlStore();
		this.materialEventProducer = materialEventProducer;
	}

	/**
	 * Dynamic Where Filter 적용
	 *
	 * @param  whereFilter
	 * @return  List
	 */
	@Override
	public List<ChargeMaterial> retrieveChargeMaterialsByDynamicWhereFilter(List<DynamicWhereFilter> whereFilter) {
		//
		return chargeMaterialStore.retrieveChargeMaterialsByDynamicWhereFilter(whereFilter);
	}

	/**
	 * Dynamic Where Filter 조건으로 Select절 + Paging 기능 적용
	 *
	 * @param  fieldNames
	 * @param  whereFilters
	 * @return              List
	 */
	@Override
	public List<ChargeMaterial> findMaterialsByDynamicWhereFilter(List<String> fieldNames, List<DynamicWhereFilter> whereFilters) {
		//
		return this.chargeMaterialStore.retrieveMaterialsByDynamicWhereFilter(fieldNames, whereFilters);
	}
	/**
	 * Dynamic Where Filter 조건으로 Count 값 리턴
	 *
	 * @param  whereFilters
	 * @return              long
	 */
	@Override
	public long countMaterialsByDynamicWhereFilter(List<DynamicWhereFilter> whereFilters) {
		//
		return this.chargeMaterialStore.countMaterialsByDynamicWhereFilter(whereFilters);
	}
	/**
	 * 반송용강재료번호를 조회한다.
	 *
	 * @param  operFlag
	 * @param  facOpCdN
	 * @return          List
	 */
	@Override
	public List<String> findReturnMtlNos(String operFlag, String facOpCdN) {
		//
		List<Map<String, Object>> list = this.chargeMaterialStore.retrieveReturnMtlNos(operFlag, facOpCdN);
		List<String> listMtlNos = list != null && !list.isEmpty() ? list.parallelStream().map(m -> {
			return (String) m.get(CAMEL_MTL_NO);
		}).collect(Collectors.toList()) : new ArrayList<String>();
		return listMtlNos;
	}
	/**
	 * 준비강번에 대한 사전송여부를 조회한다.
	 *
	 * @param  prpChargeNo1
	 * @return              String
	 */
	@Override
	public String findTransferFlagByPrpChargeNo1(String prpChargeNo1) {
		//
		ChargeMaterial entity = chargeMaterialStore.retrieveByPrpChargeNo1(prpChargeNo1);
		return entity != null ? entity.getTrsF() : null;
	}

	/**
	 * 재료번호에 대한 사전송여부를 조회한다.
	 *
	 * @param  mtlNo
	 * @return       String
	 */
	@Override
	public String findTransferFlag(String mtlNo) {
		//
		ChargeMaterial entity = chargeMaterialStore.retrieve(mtlNo);
		return entity != null ? entity.getTrsF() : null;
	}

	/**
	 * 조업구분, 공장공정코드 별 가장 최근 재료번호를 조회한다.
	 *
	 * @param  operFlag
	 * @param  facOpCdN
	 * @return          String
	 */
	@Override
	public String findLastestMtlNo(String operFlag, String facOpCdN) {
		//
		String tmpFacOpCdN = M2dc01Util.getSubstrFirstFacOpCdN(facOpCdN) + CONST_FAC_OP_CD_N_L;
		Map<String, Object> map = chargeMaterialStore.retrieveLastestMtlNo(operFlag, tmpFacOpCdN);
		return map != null && !map.isEmpty() ? (String) map.get(CAMEL_MTL_NO) : "";
	}
	/**
	 * 조업구분, 공장공정코드 별 가장 최근 예정재료번호를 조회한다.
	 *
	 * @param  operFlag
	 * @param  facOpCdN
	 * @return          String
	 */
	@Override
	public String findLastestPlanChargeNo(String operFlag, String facOpCdN) {
		//
		String tmpFacOpCdN = M2dc01Util.getSubstrFirstFacOpCdN(facOpCdN) + CONST_FAC_OP_CD_N_L;
		Map<String, Object> map = chargeMaterialStore.retrieveLastestMtlNo(operFlag, tmpFacOpCdN);
		return map != null && !map.isEmpty() ? (String) map.get(CAMEL_PLAN_CHARGE_NO) : "";
	}

	/**
	 * 조업구분, 공장공정코드, 재료번호 기준으로 생성된 순서로 이전 재료번호를 조회한다.
	 *
	 * @param  mtlNo
	 * @param  prefixMtlNo
	 * @param  queryId
	 * @return             List<ChargeMaterial>
	 */
	@Override
	public List<ChargeMaterial> findMtlNoSelectList(String mtlNo, String prefixMtlNo, String queryId) {
		//
		return chargeMaterialStore.retrieveMtlNoSelectList(mtlNo, prefixMtlNo, queryId);
	}

	/**
	 * 제강재료 데이타를 조회한다.
	 *
	 * @param  fromMtlNo
	 * @param  toMtlNo
	 * @return           List
	 */
	@Override
	public List<ChargeMaterial> findMtlNoBetween(String fromMtlNo, String toMtlNo) {
		//
		return chargeMaterialStore.retrieveMtlNoBetween(fromMtlNo, toMtlNo);
	}
	/**
	 * 제강재료 데이타를 조회한다.
	 *
	 * @param  fromMtlNo
	 * @param  toMtlNo
	 * @param  trsF
	 * @return           List
	 */
	@Override
	public List<ChargeMaterial> findMtlNoBetweenAndTrsF(String fromMtlNo, String toMtlNo, String trsF) {
		//
		return chargeMaterialStore.retrieveMtlNoBetweenAndTrsF(fromMtlNo, toMtlNo, trsF);
	}
	/**
	 * 제강재료 데이타를 조회한다.
	 *
	 * @param  mtlNo
	 * @return       ChargeMaterial
	 */
	@Override
	public ChargeMaterial find(String mtlNo) {
		//
		return chargeMaterialStore.retrieve(mtlNo);
	}

	/**
	 * 제강재료 데이타를 조회한다.
	 *
	 * @param  listMtlNo
	 * @return           List<ChargeMaterial>
	 */
	@Override
	public List<ChargeMaterial> findByMtlNoIn(List<String> listMtlNo) {
		//
		String listToString = listMtlNo.stream().collect(Collectors.joining(DynamicWhereFilter.DELIMITER));
		List<DynamicWhereFilter> dynamicWhereFilters = new ArrayList<>();
		dynamicWhereFilters.add(new DynamicWhereFilter(CAMEL_MTL_NO, BooleanFilter.AND, Expression.IN, listToString));
		return chargeMaterialStore.retrieveChargeMaterialsByDynamicWhereFilter(dynamicWhereFilters); // chargeMaterialStore.retrieveByMtlNoIn(mtlNo);
	}

	/**
	 * 제강재료 데이타를 조회한다.
	 *
	 * @param  operFlag
	 * @param  fromDt
	 * @param  toDt
	 * @return          List<ChargeMaterial>
	 */
	@Override
	public List<ChargeMaterial> findByOperFlagAndTransactionDateBetween(String operFlag, String fromDt, String toDt) {
		//
		return chargeMaterialStore.retrieveByOperFlagAndTransactionDateBetween(operFlag, fromDt, toDt);
	}

	/**
	 * 제강재료 데이타를 조회한다.
	 *
	 * @param  operFlag
	 * @param  facOpCdN
	 * @return          List
	 */
	@Override
	public List<ChargeMaterial> findByOperFlagAndFacOpCdNAndTappDnDateNotNull(String operFlag, String facOpCdN) {
		//
		return chargeMaterialStore.retrieveByOperFlagAndFacOpCdNAndTappDnDateNotNull(operFlag, facOpCdN);
	}

	/**
	 * Charge재료 조회
	 *
	 * @param  operFlag
	 * @param  facOpCdN
	 * @param  fromDt
	 * @param  toDt
	 * @return          List
	 */
	@Override
	public List<ChargeMaterial> findByOperFlagAndFacOpCdNStartingWithAndTappDnDateBetween(String operFlag, String facOpCdN, String fromDt, String toDt) {
		//
		return chargeMaterialStore.retrieveByOperFlagAndFacOpCdNStartingWithAndTappDnDateBetween(operFlag, facOpCdN, fromDt, toDt);
	}

	/**
	 * Charge재료 조회
	 *
	 * @param  operFlag
	 * @param  facOpCdN
	 * @return          List
	 */
	@Override
	public List<ChargeMaterial> findByOperFlagAndFacOpCdNStartingWithAndTransactionDateIsNullAndTappStaDateIsNull(String operFlag, String facOpCdN) {
		//
		return chargeMaterialStore.retrieveOperFlagAndFacOpCdNStartingWithAndTransactionDateIsNullAndTappStaDateIsNull(operFlag, facOpCdN);
	}

	/**
	 * Charge재료 조회
	 *
	 * @param  facOpCdN
	 * @param  moltenSteelCharCd
	 * @param  smSteelGrd
	 * @return
	 */
	@Override
	public List<ChargeMaterial> findByFacOpCdNStartingWithAndMoltenSteelCharCdAndSmSteelGrd(String facOpCdN, String moltenSteelCharCd, String smSteelGrd) {
		//
		return chargeMaterialStore.retrieveFacOpCdNStartingWithAndMoltenSteelCharCdAndSmSteelGrd(facOpCdN, moltenSteelCharCd, smSteelGrd);
	}

	/**
	 * Charge재료 조회
	 *
	 * @param  worksCode
	 * @param  facOpCdN
	 * @param  tapOpSumupDt
	 * @return              List
	 */
	@Override
	public List<ChargeMaterial> findByTapOpSumupDtBefore(String worksCode, String facOpCdN, String tapOpSumupDt) {
		//
		List<ChargeMaterial> list = chargeMaterialStore.retrieveTapOpSumupDtBefore(worksCode, facOpCdN, tapOpSumupDt);
		return list != null && !list.isEmpty() ? list : new ArrayList<ChargeMaterial>();
		// return list != null ? list.parallelStream().limit(20).collect(Collectors.toList()) : null ;
	}
	/**
	 *
	 * 제강재료 데이타를 저장한다.
	 *
	 * @param  map
	 * @return     ChargeMaterial
	 */
	@Override
	public ChargeMaterial registerChargeMaterial(Map<String, Object> map) throws PosBaseException {
		//
		ChargeMaterial charge = null;
		if (map != null) {
			String mtlNo = (String) map.get(CAMEL_MTL_NO);

			boolean isCreated = false;
			if (mtlNo != null && !"".equals(mtlNo)) {
				ChargeMaterial entity = chargeMaterialStore.retrieve(mtlNo);
				if (entity == null) {
					isCreated = true;
					entity = new ChargeMaterial();
				}
				M2dc01EntityUtil.checkValidateAttributes(map, entity);

				entity = (ChargeMaterial) M2dc01EntityUtil.setResisterObject(map, entity);
				entity = setData(map, entity, isCreated);

				charge = chargeMaterialStore.createChargeMaterial(entity);
				if(charge != null) {
					sendPublishMaterialEvent(charge, isCreated);
					PosLogger.developerLog(PosLogWriterIF.INFO, "#### 제강재료 TB_M2DC01_C_CHMTL010 저장 데이타 결과 : 프로그램=["+charge.getLastUpdatedObjectId()+"], 데이타="+map, this);
				}
			} else {
				throw new PosBaseException(MSG_ERROR_REGISTER_NULL + "제강재료 : " + mtlNo);
			}
		} else {
			throw new PosBaseException(MSG_ERROR_REGISTER_NULL + "제강재료 ");
		}
		return charge;
	}

	/**
	 *
	 * 제강재료 데이타를 수정한다..
	 *
	 * @param  mtlNo
	 * @param  map
	 * @return       ChargeMaterial
	 */
	@Override
	public ChargeMaterial modifyChargeMaterial(String mtlNo, Map<String, Object> map) throws PosBaseException {
		//
		ChargeMaterial charge = null;
		if (map != null) {
			ChargeMaterial entity = chargeMaterialStore.retrieve(mtlNo);
			if (entity != null) {
				M2dc01EntityUtil.checkValidateAttributes(map, entity);

				//사소구분, 조업구분, 공장공정코드는 수정대상에서 제외
				map.remove(CAMEL_WORKS_CODE);
				map.remove(CAMEL_OPER_FLAG);
				map.remove(CAMEL_FAC_OP_CD_N);

				entity = (ChargeMaterial) M2dc01EntityUtil.setResisterObject(map, entity);
				charge = chargeMaterialStore.updateChargeMaterial(entity);
				if(charge != null) {
					sendPublishMaterialEvent(charge, false);
					PosLogger.developerLog(PosLogWriterIF.INFO, "#### 제강재료 TB_M2DC01_C_CHMTL010 수정 데이타 결과 : 프로그램=["+charge.getLastUpdatedObjectId()+"], 데이타="+map, this);
				}
			} else {
				throw new PosBaseException(MSG_ERROR_MODIFY_NULL + "제강재료 : " + mtlNo);
			}
		} else {
			throw new PosBaseException(MSG_ERROR_MODIFY_NULL + "제강재료 : " + mtlNo);
		}
		return charge;
	}

	/**
	 *
	 * checkValidate
	 *
	 * @param  map
	 * @param  entity
	 * @param isCreated
	 * @return   ChargeMaterial
	 */
	private ChargeMaterial setData(Map<String, Object> map, ChargeMaterial entity, boolean isCreated) {
		//
		String facOpCdN = (String) map.get(CAMEL_FAC_OP_CD_N);
		if(isCreated) {
			// MES2.0 charge create 시점 세팅과 동일하게 세팅.2020.02.11.김정중.
			entity.setMatShpTp("A");
			entity.setMatPrgTp("E");
			entity.setMatStatCngDt(M2dc01DateUtil.getCurrentTimeToTimestamp());
			entity.setMtrlProgressUpdateDate(M2dc01DateUtil.getCurrentTimeToTimestamp());
		}

		if (entity.getMtrlStatusFlag() == null || "".equals(entity.getMtrlStatusFlag())) {
			entity.setMtrlStatusFlag("2");
		}

		if (!"991".equals(facOpCdN)) {
			/*
			 * =========================================================================
			 *
			 * @CommentType : Biz Rule Description
			 *
			 * @BrOwner : M22(제강압연_제강)/김승곤
			 *
			 * @BaseAttribute : SM_PASS_FAC_CD(제강통과공장코드)
			 *
			 * @ReferenceAttribute : FAC_OP_CD(공장공저코드)
			 *
			 * @Event : insert, update
			 *
			 * @CategoryName:
			 *
			 * @CategoryId :
			 *
			 * @Description : not null이며 공장공정코드 첫번째 자리 set (*substring(FAC_OP_CD,1,1) set) ==========================================================================
			 */
			entity.setSmPassFacCd(facOpCdN != null && facOpCdN.length() > 0 ? facOpCdN.substring(0, 1) : entity.getSmPassFacCd());

			/*
			 * =========================================================================
			 *
			 * @CommentType : Biz Rule Description
			 *
			 * @BrOwner : M22(제강압연_제강)/김승곤
			 *
			 * @BaseAttribute : CH_UNCOND_SLAB_DIR_EA(Charge내주편지시매수)
			 *
			 * @ReferenceAttribute :
			 *
			 * @Event : Insert, update
			 *
			 * @CategoryName:
			 *
			 * @CategoryId :
			 *
			 * @Description : Strand별주편매수1(STRAND_SORT_CASTP_SHT1)+ Strand별주편매수2(STRAND_SORT_CASTP_SHT2)+ Strand별주편매수3(STRAND_SORT_CASTP_SHT3)+ Strand별주편매수4(STRAND_SORT_CASTP_SHT4) 값이어야 한다 (*select
			 * STRAND_SORT_CASTP_SHT1 + STRAND_SORT_CASTP_SHT2 + STRAND_SORT_CASTP_SHT3 + STRAND_SORT_CASTP_SHT4 from TB_M10_HR_SPEC_CHARGE where TB_M10_HR_SPEC_CHARGE.PLAN_CHARGE_NO = PLAN_CHARGE_NO
			 * ) ==========================================================================
			 */
		}

		if(entity.getPlanChargeNo() != null) {
			N1bSpecChargeDto dtoSpecCharge = controlStore.retrieveSpecChargePlanChargeNo(entity.getPlanChargeNo());
			if (dtoSpecCharge != null) {
				BigDecimal sht1 = dtoSpecCharge.getStrandSortCastpSht1() != null ? dtoSpecCharge.getStrandSortCastpSht1() : new BigDecimal(0);
				BigDecimal sht2 = dtoSpecCharge.getStrandSortCastpSht2() != null ? dtoSpecCharge.getStrandSortCastpSht2() : new BigDecimal(0);
				BigDecimal sht3 = dtoSpecCharge.getStrandSortCastpSht3() != null ? dtoSpecCharge.getStrandSortCastpSht3() : new BigDecimal(0);
				BigDecimal sht4 = dtoSpecCharge.getStrandSortCastpSht4() != null ? dtoSpecCharge.getStrandSortCastpSht4() : new BigDecimal(0);
				entity.setChUncondSlabDirEa(sht1.add(sht2).add(sht3).add(sht4));
			}
		}

		entity.setCurFacOpCdN(entity.getFacOpCdN());
		entity.setCcCastFacOpCdN(entity.getFacOpCdN());

		if (CONST_WORKS_CODE_P.equals(entity.getWorksCode())) {
			// 포항 용강Cross 인 경우
			// fac_op_cd_n 첫 자리가 2 인데 plan_charge_no 첫 두자리가 SF 이면 3L1
			// fac_op_cd_n 첫 자리가 3 인데 plan_charge_no 첫 두자리가 SB 이면 2L1
			// * 용강Cross 란 ?
			// 원래 2제강에서 생산하는 거는 2연주에서 주조를 하는데
			// 2제강에서 생산한 용강이 3연주에서 주조하거나 3제강에서 생산한 용강이 2연주에서 주조하는 경우를 말함^^
			if ("SB".equals(StringUtil.substring(entity.getPlanChargeNo(), 0, 2))) {
				entity.setCurFacOpCdN("2L1");
				entity.setCcCastFacOpCdN("2L1");
			} else if ("SF".equals(StringUtil.substring(entity.getPlanChargeNo(), 0, 2))) {
				entity.setCurFacOpCdN("3L1");
				entity.setCcCastFacOpCdN("3L1");
			}
		}

		return entity;
	}

	/**
	 * 공유재료 Event 발행
	 *
	 * @param e
	 * @param isCreated
	 */
	private void sendPublishMaterialEvent(ChargeMaterial e, boolean isCreated) {
		//
		List<SteelMaterial> listSteelMaterial = new ArrayList<>();
		SteelMaterial steelMaterial = new SteelMaterial();

		if (e != null) {
			steelMaterial.setWorksCode(e.getWorksCode());
			steelMaterial.setOperFlag(e.getOperFlag());
			steelMaterial.setFacOpCdN(e.getFacOpCdN());
			steelMaterial.setMtlNo(e.getMtlNo());
			steelMaterial.setProcChainTp(CHAIN_ID_STEEL_MAKING);
			steelMaterial.setMdlDefineNm(TABLE_ID_CHARGE_MATERIAL);
			steelMaterial.setMatShpTp(e.getMatShpTp());
			steelMaterial.setMatPrgTp(e.getMatPrgTp());
			steelMaterial.setOrdPdtItdsCdN(e.getOrdPdtItdsCdN());
			steelMaterial.setOrderHeadLineNo(e.getOrderHeadLineNo());
			steelMaterial.setMtrlStatusFlag(e.getMtrlStatusFlag());
			steelMaterial.setMatStatCngDt(e.getMatStatCngDt());
			steelMaterial.setMtrlCompleteFlag(e.getMtrlCompleteFlag());
			steelMaterial.setMtrlProgressUpdateDate(e.getMtrlProgressUpdateDate());
			steelMaterial.setOrdSurPrdFlag(e.getOrdSurPrdFlag());
			steelMaterial.setBefOrdSurPrdFlag(e.getBefOrdSurPrdFlag());
			steelMaterial.setAssembly(e.getAssembly501());
			steelMaterial.setSmSteelGrdN(e.getSmSteelGrdN());
			steelMaterial.setSmSteelGrd(e.getSmSteelGrd());
			steelMaterial.setMtrlCompleteDate(e.getMtrlCompleteDate());
			steelMaterial.setOpIndiDt(e.getOpIndiDt());
			steelMaterial.setSprdCauCd(e.getPathShopSprdCauCd() != null && !"".equals(e.getPathShopSprdCauCd()) ? e.getPathShopSprdCauCd() : e.getCompositionSprdCauCd());
			listSteelMaterial.add(steelMaterial);
		}

		List<NameValueList> nameValueList = SharedServiceEventMapper.SharedMaterialEventMapper(listSteelMaterial.stream().map(s -> (Object) s).collect(Collectors.toList()));
		if (nameValueList != null && !nameValueList.isEmpty()) {
			if(materialEventProducer != null) {
	         	if (isCreated) {
					this.materialEventProducer.sendSharedMaterialCreatedEvent(nameValueList);
				} else {
					this.materialEventProducer.sendSharedMaterialModifiedEvent(nameValueList);
				}
			} else {
				PosLogger.developerLog(PosLogWriterIF.INFO, "#### materialEventProducer is NULL" , this);
			}
		}
	}

	/**
	 * 조업구분, 공장공정코드 별 가장 최근 재료번호 조회
	 *
	 * @param operFlag
	 * @param facOpCdN
	 * @return String
	 */
	@Override
	public String findMybatisLastestMtlNo(String operFlag, String facOpCdN) {
		//
		String tmpFacOpCdN = M2dc01Util.getSubstrFirstFacOpCdN(facOpCdN) + CONST_FAC_OP_CD_N_L;
		Map<String, Object> map = batchMaterialStore.retrieveMybatisLastestMtlNo(operFlag, tmpFacOpCdN);
		return map != null && !map.isEmpty() ? (String) map.get("MTL_NO") : "";
	}

	/**
	 * 중복강번 대상 조회
	 *
	 * @param fromMtlNo
	 * @param toMtlNo
	 * @return List
	 */
	@Override
	public List<ChargeMaterial> findChargeDuplicateTarget(String fromMtlNo, String toMtlNo) {
		//
		return batchMaterialStore.retrieveChargeDuplicateTarget(fromMtlNo, toMtlNo);
	}
}
