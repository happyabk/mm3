
package com.posco.mes3.m2dc01.rest.charge;

import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.posco.mes3.m2dc01.domain.entity.charge.ChargeMaterial;
import com.posco.mes3.m2dc01.domain.lifecycle.ServiceLifecycle;
import com.posco.mes3.m2dc01.domain.spec.aggregate.charge.ChargeMaterialAggregateService;
import com.posco.mes3.m2dc01.domain.spec.entity.charge.ChargeMaterialService;
import com.posco.mes3.reuse.common.logging.PosLogWriterIF;
import com.posco.mes3.reuse.common.logging.PosLogger;
import com.posco.mes3.sharedservice.share.domain.DynamicWhereFilter;

/**
 * 제강재료를 처리하기 위한 Class이다.
 *
 * @author wy.seo
 * @version 1.0
 */
@RestController
@RequestMapping(value = "/charge-material")
public class ChargeMaterialResource {

	private ChargeMaterialService chargeMaterialService;
	private ChargeMaterialAggregateService chargeMaterialAggregateService;

	//
	/**
	 * 제강재료를 처리한다.
	 *
	 * @param serviceLifecycle
	 */
	public ChargeMaterialResource(ServiceLifecycle serviceLifecycle) {
		this.chargeMaterialService = serviceLifecycle.requestChargeMaterialService();
		this.chargeMaterialAggregateService = serviceLifecycle.requestChargeMaterialAggregateService();
	}
	/**
	 * Dynamic Where Filter 적용
	 *
	 * @param whereFilter
	 * @return List
	 */
	@PostMapping(value = "/dynamicChargeMaterial")
	 public List<ChargeMaterial> findByDynamicWhere(@RequestBody List<DynamicWhereFilter> whereFilter){
	  return this.chargeMaterialService.retrieveChargeMaterialsByDynamicWhereFilter(whereFilter);
	 }
	/**
	 * Dynamic Where Filter 조건으로 Select절 + Paging 기능 적용
	 *
	 * @param fieldNames
	 * @param whereFilters
	 * @return  List
	 */
	@PostMapping(value = "/count/dynamicWhereFilter")
	 public long countByDynamicWhere(@RequestBody List<DynamicWhereFilter> whereFilters) {
	  return this.chargeMaterialService.countMaterialsByDynamicWhereFilter(whereFilters);
	 }
	/**
	 * Dynamic Where Filter 조건으로 Count 값 리턴
	 *
	 * @param whereFilters
	 * @return long
	 */
	 @PostMapping(value = "/dynamicWhereFilter")
	 public List<ChargeMaterial> findMaterialsByDynamicWhere(
	   @RequestParam(value= "fieldNames", required = false, defaultValue ="") List<String> fieldNames,
	   @RequestBody List<DynamicWhereFilter> whereFilters) {

	  return this.chargeMaterialService.findMaterialsByDynamicWhereFilter(fieldNames, whereFilters);
	 }
	 /**
	 * 반송용강재료번호를 조회한다.
	 *
	 * @param operFlag
	 * @param facOpCdN
	 * @return List
	 */
	@GetMapping("/returnMtlNos")
	public List<String> findReturnMtlNos(@RequestParam(value="operFlag", required=false) String operFlag, @RequestParam(value="facOpCdN", required=false) String facOpCdN){
		//
		return this.chargeMaterialService.findReturnMtlNos(operFlag, facOpCdN);
	}
	/**
	 * 준비강번에 대한 사전송여부를 조회한다.
	 *
	 * @param prpChargeNo1
	 * @return String
	 */
	@GetMapping("/transferFlagPrpChargeNo1/{prpChargeNo1}")
	public String findTransferFlagByPrpChargeNo1(@PathVariable("prpChargeNo1") String prpChargeNo1) {
		return chargeMaterialService.findTransferFlagByPrpChargeNo1(prpChargeNo1);
	}
	/**
	 * 재료번호에 대한 사전송여부를 조회한다.
	 *
	 * @param mtlNo
	 * @return String
	 */
	@GetMapping("/transferFlag/{mtlNo}")
	public String findTransferFlag(@PathVariable("mtlNo") String mtlNo) {
		return chargeMaterialService.findTransferFlag(mtlNo);
	}

	/**
	 * 조업구분, 공장공정코드별 가장 최근 재료번호를 조회한다.
	 *
	 * @param operFlag
	 * @param facOpCdN
	 * @return String
	 */
	@GetMapping("/lastestMtlno/{operFlag}/{facOpCdN}")
	public String findLastestMtlNo(@PathVariable("operFlag") String operFlag, @PathVariable("facOpCdN") String facOpCdN) {
		return chargeMaterialService.findLastestMtlNo(operFlag, facOpCdN);
	}

	/**
	 * 제강재료 데이타를 조회한다.
	 *
	 * @param mtlNo
	 * @return ChargeMaterial
	 */
	@GetMapping("/{mtlNo}")
	public ChargeMaterial find(@PathVariable("mtlNo") String mtlNo) {
		return chargeMaterialService.find(mtlNo);
	}

	/**
	 * 제강재료 데이타를 조회한다.
	 *
	 * @param mtlNo
	 * @return ChargeMaterial
	 */
	@GetMapping("/mtlno/{mtlNo}")
	public ChargeMaterial findMtlNo(@PathVariable("mtlNo") String mtlNo) {
		return chargeMaterialService.find(mtlNo);
	}

	/**
	 * 재료번호 기준으로 생성된 순서로 이전 재료번호를 조회한다.
	 *
	 * @param mtlNo
	 * @return List<ChargeMaterial>
	 */
	@GetMapping("/mtlnoSelectList/{mtlNo}")
	public List<ChargeMaterial> findMtlNoSelectList(@PathVariable("mtlNo") String mtlNo) {
		return chargeMaterialAggregateService.findMtlNoSelectList(mtlNo);
	}

	/**
	 * 제강재료 데이타를 조회한다.
	 *
	 * @param mtlNo
	 * @return List<ChargeMaterial>
	 */
	@PostMapping("/findAll")
	public List<ChargeMaterial> findAllByMtlNo(@RequestBody List<String> mtlNo) {
		//
		return mtlNo == null ? null : chargeMaterialService.findByMtlNoIn(mtlNo);
	}

	/**
	 * 제강재료 데이타를 조회한다.
	 *
	 * @param operFlag
	 * @param fromDt
	 * @param toDt
	 * @return List<ChargeMaterial>
	 */
	@GetMapping("/transactionDate/{operFlag}/{fromDt}/{toDt}")
	public List<ChargeMaterial> findByOperFlagAndTransactionDateBetween(@PathVariable("operFlag") String operFlag, @PathVariable("fromDt") String fromDt, @PathVariable("toDt") String toDt) {
		return chargeMaterialService.findByOperFlagAndTransactionDateBetween(operFlag, fromDt, toDt);
	}

	/**
	 * 제강재료 데이타를 조회한다.
	 *
	 * @param operFlag
	 * @param facOpCdN
	 * @return List<ChargeMaterial>
	 */
	@GetMapping("/tappDnDate/{operFlag}/{facOpCdN}")
	public List<ChargeMaterial> findByOperFlagAndFacOpCdNAndTappDnDateNotNull(@PathVariable("operFlag") String operFlag, @PathVariable("facOpCdN") String facOpCdN) {
		return chargeMaterialService.findByOperFlagAndFacOpCdNAndTappDnDateNotNull(operFlag, facOpCdN);
	}
	/**
	 * Charge재료 조회
	 *
	 * @param operFlag
	 * @param facOpCdN
	 * @param fromDate
	 * @param toDate
	 * @return List
	 */
	@GetMapping("/tappDnDateBetween")
	public List<ChargeMaterial> findByOperFlagAndFacOpCdNStartingWithAndTappDnDateBetween(@RequestParam("operFlag") String operFlag, @RequestParam(value="facOpCdN", required=false, defaultValue="") String facOpCdN,  @RequestParam("fromDate") String fromDate, @RequestParam("toDate") String toDate){
		//
		return chargeMaterialService.findByOperFlagAndFacOpCdNStartingWithAndTappDnDateBetween(operFlag, facOpCdN, fromDate, toDate);
	}

	/**
	 * Charge재료 조회
	 *
	 * @param operFlag
	 * @param facOpCdN
	 * @return List
	 */
	@GetMapping("/tappStaDateIsNull/{operFlag}/{facOpCdN}")
	public List<ChargeMaterial> findByOperFlagAndFacOpCdNStartingWithAndTransactionDateIsNullAndTappStaDateIsNull(@PathVariable("operFlag") String operFlag, @PathVariable("facOpCdN") String facOpCdN) {
		//
		return chargeMaterialService.findByOperFlagAndFacOpCdNStartingWithAndTransactionDateIsNullAndTappStaDateIsNull(operFlag, facOpCdN);
	}

	/**
	 * Charge재료 조회
	 *
	 * @param worksCode
	 * @param facOpCdN
	 * @param tapOpSumupDt
	 * @return List
	 */
	@GetMapping("/tapOpSumupDtBefore/{worksCode}/{facOpCdN}/{tapOpSumupDt}")
	public List<ChargeMaterial> findByTapOpSumupDtBefore(@PathVariable("worksCode") String worksCode, @PathVariable("facOpCdN") String facOpCdN, @PathVariable("tapOpSumupDt") String tapOpSumupDt){
		//
		return chargeMaterialService.findByTapOpSumupDtBefore(worksCode, facOpCdN, tapOpSumupDt);
	}
	/**
	 * 제강재료 데이타를 저장한다.
	 *
	 * @param map
	 */
	@PostMapping(value = "")
	public void registerChargeMaterial(@RequestBody Map<String, Object> map) {
		//
		PosLogger.developerLog(PosLogWriterIF.INFO, "####### 제강재료 저장 대상 항목 => "+map, this);
		chargeMaterialService.registerChargeMaterial(map);
	}

	/**
	 * 제강재료 데이타를 수정한다.
	 *
	 * @param mtlNo
	 * @param map
	 */
	@PutMapping("/modify/{mtlNo}")
	public void modifyChargeMaterial(@PathVariable("mtlNo") String mtlNo, @RequestBody Map<String, Object> map) {
		//
		PosLogger.developerLog(PosLogWriterIF.INFO, "####### 제강재료 수정 대상 항목 => "+map, this);
		chargeMaterialService.modifyChargeMaterial(mtlNo, map);
	}

}
