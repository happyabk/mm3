
package com.posco.mes3.m2dc01.client;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import com.posco.mes3.common.trace.PosRequestInterceptor;
import com.posco.mes3.m2dc01.domain.entity.charge.ChargeDuplicate;
import com.posco.mes3.m2dc01.domain.entity.charge.ChargeMaterial;
import com.posco.mes3.m2dc01.domain.entity.charge.ChargeMaterialComponentActualItem;
import com.posco.mes3.m2dc01.domain.entity.charge.ChargeMaterialOperation;
import com.posco.mes3.m2dc01.domain.entity.charge.ChargeMaterialSteelGrade;
import com.posco.mes3.m2dc01.domain.entity.charge.ProductionSteelGrade;
import com.posco.mes3.m2dc01.domain.entity.charge.ProductionSteelGradeRegistrant;
import com.posco.mes3.m2dc01.domain.entity.dto.n1b.N1bSpecSlabDto;
import com.posco.mes3.m2dc01.domain.entity.dto.order.ChargeOrderRequestDto;
import com.posco.mes3.m2dc01.domain.entity.knowhow.ManufacturingSpecification;
import com.posco.mes3.m2dc01.domain.entity.knowhow.SteelMakingMethod;
import com.posco.mes3.m2dc01.domain.entity.knowhow.SteelMakingMethodDocument;
import com.posco.mes3.m2dc01.domain.entity.knowhow.SteelMakingMethodDocumentLink;
import com.posco.mes3.m2dc01.domain.entity.order.ChargeOrder;
import com.posco.mes3.m2dc01.domain.entity.order.ChargeOrderSteelGrade;
import com.posco.mes3.m2dc01.domain.entity.order.StrategicProductProduction;
import com.posco.mes3.m2dc01.domain.entity.product.ChargeProduction;
import com.posco.mes3.m2dc01.domain.entity.result.MaterialTracking;
import com.posco.mes3.m2dc01.domain.entity.result.NonOperationResult;
import com.posco.mes3.m2dc01.domain.entity.result.OperationProgress;
import com.posco.mes3.m2dc01.domain.entity.result.RawMaterialUseResult;
import com.posco.mes3.m2dc01.domain.entity.result.RawMaterialUseResultStep;
import com.posco.mes3.m2dc01.domain.entity.result.SecondRefiningCommonResult;
import com.posco.mes3.sharedservice.share.domain.DynamicWhereFilter;

/**
 * 제강재료관리서비스에서 제공하는 Feign Client Class이다.
 *
 * @author wy.seo
 * @version 1.0
 */
@FeignClient(contextId = "com.posco.mes3.m2dc01.client.ChargeMaterialClient", name = "m2dc01-material", configuration=PosRequestInterceptor.class)
public interface ChargeMaterialClient {
	// charge ---------------------------------------------------------------------------------------------------------------
	/**
	 * Charge중복 조회
	 *
	 * @param standardDate
	 * @param mtlNo
	 * @return ChargeDuplicate
	 */
	@GetMapping(value = "/charge-duplicate/{standardDate}/{mtlNo}") // Charge중복 조회
	public ChargeDuplicate findChargeDuplicate(@PathVariable("standardDate") String standardDate, @PathVariable("mtlNo") String mtlNo);
	/**
	 * Charge중복 조회
	 *
	 * @param standardDate
	 * @param operFlag
	 * @param facOpCdN
	 * @return List
	 */
	@GetMapping(value = "/charge-duplicate/all/{standardDate}/{operFlag}/{facOpCdN}")
	public List<ChargeDuplicate> findChargeDuplicateAll(@PathVariable("standardDate") String standardDate, @PathVariable("operFlag") String operFlag, @PathVariable("facOpCdN") String facOpCdN);
	/**
	 * Charge중복 저장
	 *
	 * @param map
	 */
	@PostMapping(value = "/charge-duplicate") // Charge중복 저장
	public void registerChargeDuplicate(@RequestBody Map<String, Object> map);

	/**
	 * Dynamic Where Filter 적용
	 *
	 * @param whereFilter
	 * @return List
	 */
	@PostMapping(value = "/charge-material/dynamicChargeMaterial")
	public List<ChargeMaterial> findByDynamicWhere(@RequestBody List<DynamicWhereFilter> whereFilter);

	/**
	 * Dynamic Where Filter 조건으로 Select절 + Paging 기능 적용
	 *
	 * @param fieldNames
	 * @param whereFilters
	 * @return List
	 */
	@PostMapping(value = "/charge-material/dynamicWhereFilter")
	public List<ChargeMaterial> findMaterialsByDynamicWhere(@RequestParam(value = "fieldNames", required = false, defaultValue = "") List<String> fieldNames, @RequestBody List<DynamicWhereFilter> whereFilters);

	/**
	 * Dynamic Where Filter 조건으로 Count 값 리턴
	 *
	 * @param whereFilters
	 * @return long
	 */
	@PostMapping(value = "/charge-material/count/dynamicWhereFilter")
	public long countMaterialsByDynamicWhere(@RequestBody List<DynamicWhereFilter> whereFilters);

	/**
	 * Charge재료 조회 : 준비강번에 대한 사전송여부
	 *
	 * @param prpChargeNo1
	 * @return String
	 */
	@GetMapping(value = "/charge-material/transferFlagPrpChargeNo1/{prpChargeNo1}") // Charge재료 조회 : 사전송여부
	public String findTransferFlagByPrpChargeNo1(@PathVariable("prpChargeNo1") String prpChargeNo1);

	/**
	 * Charge재료 조회 : 사전송여부
	 *
	 * @param mtlNo
	 * @return String
	 */
	@GetMapping(value = "/charge-material/transferFlag/{mtlNo}") // Charge재료 조회 : 사전송여부
	public String findTransferFlag(@PathVariable("mtlNo") String mtlNo);

	/**
	 * Charge재료 조회 : 가장 최근 재료번호
	 *
	 * @param operFlag
	 * @param facOpCdN
	 * @return String
	 */
	@GetMapping(value = "/charge-material/lastestMtlno/{operFlag}/{facOpCdN}") // Charge재료 조회 : 가장 최근 재료번호
	public String findLastestMtlNo(@PathVariable("operFlag") String operFlag, @PathVariable("facOpCdN") String facOpCdN);

	/**
	 * Charge재료 조회 : 재료번호 기준으로 생성된 순서로 이전 재료번호를 조회
	 *
	 * @param mtlNo
	 * @return List<ChargeMaterial>
	 */
	@GetMapping(value = "/charge-material/mtlnoSelectList/{mtlNo}") // Charge재료 조회 : 재료번호 기준으로 생성된 순서로 이전 재료번호를 조회
	public List<ChargeMaterial> findMtlNoSelectList(@PathVariable("mtlNo") String mtlNo);

	/**
	 * Charge재료 조회
	 *
	 * @param mtlNo
	 * @return ChargeMaterial
	 */
	@GetMapping(value = "/charge-material/mtlno/{mtlNo}") // Charge재료 조회
	public ChargeMaterial findChargeMaterial(@PathVariable("mtlNo") String mtlNo);

	/**
	 * Charge재료 조회
	 *
	 * @param mtlNo
	 * @return List<ChargeMaterial>
	 */
	@PostMapping(value = "/charge-material/findAll") // Charge재료 조회
	public List<ChargeMaterial> findChargeMaterialAllByMtlNo(@RequestBody List<String> mtlNo);

	/**
	 * Charge재료 조회
	 *
	 * @param operFlag
	 * @param fromDt
	 * @param toDt
	 * @return List<ChargeMaterial>
	 */
	@GetMapping("/charge-material/transactionDate/{operFlag}/{fromDt}/{toDt}") // Charge재료 조회
	public List<ChargeMaterial> findByOpFlagAndTransactionDateBetween(@PathVariable("operFlag") String operFlag, @PathVariable("fromDt") String fromDt, @PathVariable("toDt") String toDt);

	/**
	 * Charge재료 조회
	 *
	 * @param operFlag
	 * @param facOpCdN
	 * @return List<ChargeMaterial>
	 */
	@GetMapping("/charge-material/tappDnDate/{operFlag}/{facOpCdN}") // Charge재료 조회
	public List<ChargeMaterial> findByOperFlagAndFacOpCdNAndTappDnDateNotNull(@PathVariable("operFlag") String operFlag, @PathVariable("facOpCdN") String facOpCdN);

	/**
	 * Charge재료 조회
	 *
	 * @param operFlag
	 * @param facOpCdN
	 * @param fromDate
	 * @param toDate
	 * @return List
	 */
	@GetMapping("/charge-material/tappDnDateBetween") // Charge재료 조회
	public List<ChargeMaterial> findByOperFlagAndFacOpCdNStartingWithAndTappDnDateBetween(@RequestParam("operFlag") String operFlag,
			@RequestParam(value = "facOpCdN", required = false, defaultValue = "") String facOpCdN, @RequestParam("fromDate") String fromDate, @RequestParam("toDate") String toDate);

	/**
	 * Charge재료 조회
	 *
	 * @param operFlag
	 * @param facOpCdN
	 * @return List
	 */
	@GetMapping("/charge-material/tappStaDateIsNull/{operFlag}/{facOpCdN}")
	public List<ChargeMaterial> findByOperFlagAndFacOpCdNStartingWithAndTransactionDateIsNullAndTappStaDateIsNull(@PathVariable("operFlag") String operFlag, @PathVariable("facOpCdN") String facOpCdN);

	/**
	 * Charge재료 조회
	 *
	 * @param worksCode
	 * @param facOpCdN
	 * @param tapOpSumupDt
	 * @return List
	 */
	@GetMapping("/charge-material/tapOpSumupDtBefore/{worksCode}/{facOpCdN}/{tapOpSumupDt}")
	public List<ChargeMaterial> findByTapOpSumupDtBefore(@PathVariable("worksCode") String worksCode, @PathVariable("facOpCdN") String facOpCdN, @PathVariable("tapOpSumupDt") String tapOpSumupDt);

	/**
	 * Charge재료 저장
	 *
	 * @param map
	 */
	@PostMapping(value = "/charge-material") // Charge재료 저장
	public void registerChargeMaterial(@RequestBody Map<String, Object> map);
	/**
	 * Charge재료 수정
	 *
	 * @param mtlNo
	 * @param map
	 */
	@PutMapping(value = "/charge-material/modify/{mtlNo}") // Charge재료 수정
	public void modifyChargeMaterial(@PathVariable("mtlNo") String mtlNo, @RequestBody Map<String, Object> map);

	/**
	 * Charge재료_강종 조회
	 *
	 * @param mtlNo
	 * @return List<ChargeMaterialSteelGrade>
	 */
	@GetMapping(value = "/charge-material-steel-grade/{mtlNo}") // Charge재료_강종 조회
	public List<ChargeMaterialSteelGrade> findAllChargeMaterialSteelGrade(@PathVariable("mtlNo") String mtlNo);

	/**
	 * Charge재료__Operation 조회
	 *
	 * @param mtlNo
	 * @return List<ChargeMaterialOperation>
	 */
	@GetMapping(value = "/charge-material-operation/{mtlNo}") // Charge재료_Operation 조회
	public List<ChargeMaterialOperation> findAllChargeMaterialOperation(@PathVariable("mtlNo") String mtlNo);

	/**
	 * Charge재료_생산소재Item 조회
	 *
	 * @param mtlNo
	 * @return List<ChargeMaterialComponentActualItem>
	 */
	@GetMapping(value = "/charge-material-component-actual-item/{mtlNo}") // Charge재료_생산소재Item 조회
	public List<ChargeMaterialComponentActualItem> findAllChargeMaterialComponentActualItem(@PathVariable("mtlNo") String mtlNo);

	/**
	 * 생산강종이력 조회
	 *
	 * @param transactionId
	 * @return ProductionSteelGrade
	 */
	@GetMapping("/production-steel-grade/{transactionId}") // 생산강종이력 조회
	public ProductionSteelGrade findProductionSteelGrade(@PathVariable("transactionId") String transactionId);

	/**
	 * 생산강종이력 조회
	 *
	 * @param facOpCdN
	 * @param moltenSteelCharCdN
	 * @param productCd
	 * @param uncondSlabDirThk
	 * @return List
	 */
	@GetMapping("/production-steel-grade/all")
	public List<ProductionSteelGrade> findFacOpCdNAndMoltenSteelCharCdNInAndProductCdInAndUncondSlabDirThkIn(@RequestParam(value = "facOpCdN", required = false, defaultValue = "") String facOpCdN,
			@RequestParam(value = "moltenSteelCharCdN", required = false) List<String> moltenSteelCharCdN, @RequestParam(value = "productCd", required = false) List<String> productCd,
			@RequestParam(value = "uncondSlabDirThk", required = false) List<String> uncondSlabDirThk);
	/**
	 * 생산강종이력 조회 Dynamic Where Filter 적용
	 *
	 * @param whereFilter
	 * @return List
	 */
	@PostMapping(value = "/production-steel-grade/dynamicProductionSteelGrade")
	public List<ProductionSteelGrade> findProductionSteelGradesByDynamicWhere(@RequestBody List<DynamicWhereFilter> whereFilter);

	/**
	 * Dynamic Where Filter 조건으로 Select절 + Paging 기능 적용
	 *
	 * @param fieldNames
	 * @param whereFilters
	 * @return List
	 */
	@PostMapping(value = "/production-steel-grade/dynamicWhereFilter")
	public List<ProductionSteelGrade> findProductionSteelGradeByDynamicWhere(@RequestParam(value = "fieldNames", required = false, defaultValue = "") List<String> fieldNames, @RequestBody List<DynamicWhereFilter> whereFilters);
	/**
	 * 생산강종이력 저장
	 *
	 * @param map
	 */
	@PostMapping(value = "/production-steel-grade") // 생산강종이력 저장
	public void registerProductionSteelGrade(@RequestBody Map<String, Object> map);
	/**
	 * 생산강종이력_등록자 Dynamic Where Filter 적용
	 *
	 * @param whereFilter
	 * @return List
	 */
	@PostMapping(value = "/production-steel-grade-registrant/dynamicProductionSteelGradeRegistrant")
	 public List<ProductionSteelGradeRegistrant> findProductionSteelGradeRegistrantsByDynamicWhere(@RequestBody List<DynamicWhereFilter> whereFilter);
	/**
	 * 생산강종이력_등록자 Dynamic Where Filter 조건으로 Select절 + Paging 기능 적용
	 *
	 * @param fieldNames
	 * @param whereFilters
	 * @return List
	 */
	@PostMapping(value = "/production-steel-grade-registrant/dynamicWhereFilter")
	public List<ProductionSteelGradeRegistrant> findProductionSteelGradeRegistrantsByDynamicWhere(@RequestParam(value= "fieldNames", required = false, defaultValue ="") List<String> fieldNames, @RequestBody List<DynamicWhereFilter> whereFilters);
	/**
	 * 생산강종이력_등록자 조회
	 *
	 * @param transactionId
	 * @return ProductionSteelGradeRegistrant
	 */
	@GetMapping("/production-steel-grade-registrant/{transactionId}") // 생산강종이력_등록자 조회
	public ProductionSteelGradeRegistrant findProductionSteelGradeRegistrant(@PathVariable("transactionId") String transactionId);
	/**
	 * 생산강종이력_등록자 조회 Dynamic Where Filter 적용
	 *
	 * @param whereFilter
	 * @return List
	 */
	@PostMapping(value = "/production-steel-grade-registrant/dynamicProductionSteelGradeRegistrant")
	public List<ProductionSteelGradeRegistrant> findProductionSteelGradeRegistrantByDynamicWhere(@RequestBody List<DynamicWhereFilter> whereFilter);

	/**
	 * Dynamic Where Filter 조건으로 Select절 + Paging 기능 적용
	 *
	 * @param fieldNames
	 * @param whereFilters
	 * @return List
	 */
	@PostMapping(value = "/production-steel-grade-registrant/dynamicWhereFilter")
	public List<ProductionSteelGradeRegistrant> findProductionSteelGradeRegistrantByDynamicWhere(@RequestParam(value = "fieldNames", required = false, defaultValue = "") List<String> fieldNames, @RequestBody List<DynamicWhereFilter> whereFilters);
	/**
	 * 생산강종이력_등록자 저장
	 *
	 * @param map
	 */
	@PostMapping(value = "/production-steel-grade-registrant") // 생산강종이력_등록자 저장
	public void registerProductionSteelGradeRegistrant(@RequestBody Map<String, Object> map);

	// knowhow ---------------------------------------------------------------------------------------------------------------
	/**
	 * Dynamic Where Filter 적용
	 *
	 * @param whereFilter
	 * @return List
	 */
	@PostMapping(value = "/manufacturing-specification/dynamicManufacturingSpecification")
	public List<ManufacturingSpecification> findManufacturingSpecificationByDynamicWhere(@RequestBody List<DynamicWhereFilter> whereFilter);
	/**
	 * Dynamic Where Filter 조건으로 Select절 + Paging 기능 적용
	 *
	 * @param fieldNames
	 * @param whereFilters
	 * @return List
	 */
	@PostMapping(value = "/manufacturing-specification/dynamicWhereFilter")
	public List<ManufacturingSpecification> findManufacturingSpecificationByDynamicWhere(@RequestParam(value = "fieldNames", required = false, defaultValue = "") List<String> fieldNames, @RequestBody List<DynamicWhereFilter> whereFilters);

	/**
	 * 제조사양수신이력 조회
	 *
	 * @param smModDesnItemTp
	 * @param moltenSteelCharCdN
	 * @param requiredWarehouse
	 * @return List<ManufacturingSpecification>
	 */
	@GetMapping(value = "/manufacturing-specification/{smModDesnItemTp}/{moltenSteelCharCdN}/{requiredWarehouse}") // 제조사양수신이력 조회
	public List<ManufacturingSpecification> findAllManufacturingSpecification(@PathVariable("smModDesnItemTp") String smModDesnItemTp, @PathVariable("moltenSteelCharCdN") String moltenSteelCharCdN,
			@PathVariable("requiredWarehouse") String requiredWarehouse);

	/**
	 * 제조사양수신이력 저장
	 *
	 * @param map
	 */
	@PostMapping(value = "/manufacturing-specification") // 제조사양수신이력 저장
	public void registerManufacturingSpecification(@RequestBody Map<String, Object> map);

	/**
	 * Dynamic Where Filter 적용
	 *
	 * @param whereFilter
	 * @return List
	 */
	@PostMapping(value = "/steel-making-method/dynamicSteelMakingMethod")
	public List<SteelMakingMethod> findSteelMakingMethodByDynamicWhere(@RequestBody List<DynamicWhereFilter> whereFilter);
	/**
	 * Dynamic Where Filter 조건으로 Select절 + Paging 기능 적용
	 *
	 * @param fieldNames
	 * @param whereFilters
	 * @return List
	 */
	@PostMapping(value = "/steel-making-method/dynamicWhereFilter")
	public List<SteelMakingMethod> findSteelMakingMethodByDynamicWhere(@RequestParam(value = "fieldNames", required = false, defaultValue = "") List<String> fieldNames, @RequestBody List<DynamicWhereFilter> whereFilters);

	/**
	 * 제강요령 조회
	 *
	 * @param operFlag
	 * @param smPassFacCd
	 * @param smModDesnItemTp
	 * @param moltenSteelCharCdN
	 * @return SteelMakingMethod
	 */
	@GetMapping("/steel-making-method/{operFlag}/{smPassFacCd}/{smModDesnItemTp}/{moltenSteelCharCdN}") // 제강요령 조회
	public SteelMakingMethod findSteelMakingMethod(@PathVariable("operFlag") String operFlag, @PathVariable("smPassFacCd") String smPassFacCd, @PathVariable("smModDesnItemTp") String smModDesnItemTp,
			@PathVariable("moltenSteelCharCdN") String moltenSteelCharCdN);

	/**
	 * 제강요령 조회
	 *
	 * @param operFlag
	 * @param smPassFacCd
	 * @param smModDesnItemTp
	 * @return List<SteelMakingMethod>
	 */
	@GetMapping("/steel-making-method/{operFlag}/{smPassFacCd}/{smModDesnItemTp}") // 제강요령 조회
	public List<SteelMakingMethod> findByOperFlagAndSmPassFacCdAndSmModDesnItemTp(@PathVariable("operFlag") String operFlag, @PathVariable("smPassFacCd") String smPassFacCd,
			@PathVariable("smModDesnItemTp") String smModDesnItemTp);

	/**
	 * 제강요령 조회
	 *
	 * @param smPassFacCd
	 * @param moltenSteelCharCdN
	 * @param smSteelGrdN
	 * @return List
	 */
	@GetMapping("/steel-making-method/all") // 제강요령 조회
	public List<SteelMakingMethod> findBySmPassFacCdAndMoltenSteelCharCdNInAndSmSteelGrdNIn(@RequestParam(value = "smPassFacCd", required = false) String smPassFacCd,
			@RequestParam(value = "moltenSteelCharCdN", required = false) List<String> moltenSteelCharCdN, @RequestParam(value = "smSteelGrdN", required = false) List<String> smSteelGrdN);

	/**
	 * 제강요령 저장
	 *
	 * @param map
	 */
	@PostMapping(value = "/steel-making-method") // 제강요령 저장
	public void registerSteelMakingMethod(@RequestBody Map<String, Object> map);

	/**
	 * Dynamic Where Filter 적용
	 *
	 * @param whereFilter
	 * @return List
	 */
	@PostMapping(value = "/steel-making-method-document/dynamicSteelMakingMethodDocument")
	public List<SteelMakingMethodDocument> findSteelMakingMethodDocumentByDynamicWhere(@RequestBody List<DynamicWhereFilter> whereFilter);
	/**
	 * Dynamic Where Filter 조건으로 Select절 + Paging 기능 적용
	 *
	 * @param fieldNames
	 * @param whereFilters
	 * @return List
	 */
	@PostMapping(value = "/steel-making-method-document/dynamicWhereFilter")
	public List<SteelMakingMethodDocument> findSteelMakingMethodDocumentByDynamicWhere(@RequestParam(value = "fieldNames", required = false, defaultValue = "") List<String> fieldNames, @RequestBody List<DynamicWhereFilter> whereFilters);

	/**
	 * Dynamic Where Filter 적용
	 *
	 * @param whereFilter
	 * @return List
	 */
	@PostMapping(value = "/steel-making-method-document-link/dynamicSteelMakingMethodDocument")
	public List<SteelMakingMethodDocumentLink> findSteelMakingMethodDocumentLinkByDynamicWhere(@RequestBody List<DynamicWhereFilter> whereFilter);
	/**
	 * Dynamic Where Filter 조건으로 Select절 + Paging 기능 적용
	 *
	 * @param fieldNames
	 * @param whereFilters
	 * @return List
	 */
	@PostMapping(value = "/steel-making-method-document-link/dynamicWhereFilter")
	public List<SteelMakingMethodDocumentLink> findSteelMakingMethodDocumentLinkByDynamicWhere(@RequestParam(value = "fieldNames", required = false, defaultValue = "") List<String> fieldNames, @RequestBody List<DynamicWhereFilter> whereFilters);

	// order ---------------------------------------------------------------------------------------------------------------
	/**
	 * Dynamic Where Filter 적용
	 *
	 * @param whereFilter
	 * @return List
	 */
	@PostMapping(value = "/charge-order/dynamicOrder")
	public List<ChargeOrder> findOrdersByDynamicWhereFilter(@RequestBody List<DynamicWhereFilter> whereFilter);

	/**
	 * Dynamic Where Filter 조건으로 Select절 + Paging 기능 적용
	 *
	 * @param fieldNames
	 * @param whereFilters
	 * @return List
	 */
	@PostMapping(value = "/charge-order/dynamicWhereFilter")
	public List<ChargeOrder> findOrdersByDynamicWhereFilter(@RequestParam(value = "fieldNames", required = false, defaultValue = "") List<String> fieldNames, @RequestBody List<DynamicWhereFilter> whereFilters);
	/**
	 * Charge지시 개별작업지시요구를 처리한다. TbM10HrDretResendRequestVO
	 *
	 * @param mtlNo
	 * @param operFlag
	 * @param facOpCdN
	 * @param smHrOpIndiTp
	 * @return ChargeOrderRequestDto
	 */
	@GetMapping(value = "/charge-order/eachWorkOrder")
	public ChargeOrderRequestDto findEachWorkOrder(@RequestParam(value = "mtlNo", required = false) String mtlNo, @RequestParam(value = "operFlag", required = false) String operFlag, @RequestParam(value = "facOpCdN", required = false) String facOpCdN, @RequestParam(value = "smHrOpIndiTp", required = false) String smHrOpIndiTp);
	/**
	 * Charge지시 출강지시, 일괄작업지시요구, 지시재전송요구를 처리한다. TbM10HrDretInformationVO
	 *
	 * @param mtlNo
	 * @param operFlag
	 * @param facOpCdN
	 * @param smHrOpIndiTp
	 * @return List
	 */
	@GetMapping(value = "/charge-order/tappingOrder")
	public List<ChargeOrderRequestDto> findTappingOrder(@RequestParam(value = "mtlNo", required = false) String mtlNo, @RequestParam(value = "operFlag", required = false) String operFlag, @RequestParam(value = "facOpCdN", required = false) String facOpCdN, @RequestParam(value = "smHrOpIndiTp", required = false) String smHrOpIndiTp);
	/**
	 * 자동차강판 갯수 구하기
	 *
	 * @param listPlanChargeNo
	 * @return Map
	 */
	@PostMapping("/charge-order/carPlateCounts")
	public Map<String, BigDecimal> findCarPlateCounts(@RequestBody List<String> listPlanChargeNo);
	/**
	 * 출강지시Matching을 처리
	 *
	 * @param operFlag
	 * @param facOpCdN
	 * @param mtlNo
	 * @param planChargeNo
	 * @param interfaceDataUpdTp
	 * @return String
	 */
	@GetMapping("/charge-order/orderMatching")
	public String processOrderMatching(@RequestParam(value="operFlag") String operFlag, @RequestParam(value="facOpCdN") String facOpCdN, @RequestParam(value="mtlNo") String mtlNo, @RequestParam(value="planChargeNo") String planChargeNo, @RequestParam(value="interfaceDataUpdTp", required=false) String interfaceDataUpdTp);
	/**
	 * Charge지시 조회
	 *
	 * @param mtlNo
	 * @return ChargeOrder
	 */
	@GetMapping("/charge-order/{mtlNo}") // Charge지시 조회
	public ChargeOrder findChargeOrder(@PathVariable("mtlNo") String mtlNo);

	/**
	 * Charge지시 조회
	 *
	 * @param mtlNo
	 * @return List
	 */
	@GetMapping("/charge-order/all/mtlNo") // Charge지시 조회
	public List<ChargeOrder> findChargeOrderAllMtlNo(@RequestParam(value = "mtlNo", required = false) List<String> mtlNo);

	/**
	 * Charge지시 조회
	 *
	 * @param planChargeNo
	 * @return List
	 */
	@GetMapping("/charge-order/all/planChargeNo") // Charge지시 조회
	public List<ChargeOrder> findChargeOrderAllPlanChargeNo(@RequestParam(value = "planChargeNo", required = false) List<String> planChargeNo);

	/**
	 * Charge지시 저장
	 *
	 * @param map
	 */
	@PostMapping(value = "/charge-order") // Charge지시 저장
	public void registerChargeOrder(@RequestBody Map<String, Object> map);
	/**
	 * Charge지시 수정
	 *
	 * @param mtlNo
	 * @param map
	 */
	@PutMapping(value = "/charge-order/modify/{mtlNo}") // Charge지시 수정
	public void modifyChargeOrder(@PathVariable("mtlNo") String mtlNo, @RequestBody Map<String, Object> map);

	/**
	 * Charge지시 강종 조회
	 *
	 * @param mtlNo
	 * @return List<ChargeOrderSteelGrade>
	 */
	@GetMapping("/charge-order-steel-grade/{mtlNo}") // Charge지시 강종 조회
	public List<ChargeOrderSteelGrade> findChargeOrderSteelGrade(@PathVariable("mtlNo") String mtlNo);
	/**
	 * Dynamic Where Filter 적용
	 *
	 * @param whereFilter
	 * @return List
	 */
	@PostMapping(value = "/strategic-product-production/dynamicStrategicProductProduction")
	public List<StrategicProductProduction> findStrategicProductProductionByDynamicWhere(@RequestBody List<DynamicWhereFilter> whereFilter);

	/**
	 * Dynamic Where Filter 조건으로 Select절 + Paging 기능 적용
	 *
	 * @param fieldNames
	 * @param whereFilters
	 * @return List
	 */
	@PostMapping(value = "/strategic-product-production/dynamicWhereFilter")
	public List<StrategicProductProduction> findStrategicProductProductionByDynamicWhere(@RequestParam(value = "fieldNames", required = false, defaultValue = "") List<String> fieldNames, @RequestBody List<DynamicWhereFilter> whereFilters);

	/**
	 * 전략제품Matching
	 *
	 * @param map
	 * @return String
	 */
	@PostMapping("/strategic-product-production/processStrategicProductProduction")
	public String processStrategicProductProduction(@RequestBody Map<String, Object> map);

	/**
	 * 고급재구분
	 *
	 * @param listPlanChargeNo
	 * @param listSpecSlab
	 * @return Map
	 */
	@PostMapping("/view/steel-tapping-schedule/hmInfo")
	public Map<String, String> getHmInfo(@RequestParam(value = "listPlanChargeNo", required = false) List<String> listPlanChargeNo, @RequestBody List<N1bSpecSlabDto> listSpecSlab);

	// product ---------------------------------------------------------------------------------------------------------------
	/**
	 * 생산실적이력 Dynamic Where Filter 적용
	 *
	 * @param whereFilter
	 * @return List
	 */
	@PostMapping(value = "/charge-production/dynamicChargeProduction")
	public List<ChargeProduction> findChargeProductionsByDynamicWhere(@RequestBody List<DynamicWhereFilter> whereFilter);
	/**
	 * 생산실적이력 Dynamic Where Filter 조건으로 Select절 + Paging 기능 적용
	 *
	 * @param fieldNames
	 * @param whereFilters
	 * @return List
	 */
	@PostMapping(value = "/charge-production/dynamicWhereFilter")
	public List<ChargeProduction> findChargeProductionsByDynamicWhere(@RequestParam(value = "fieldNames", required = false, defaultValue = "") List<String> fieldNames, @RequestBody List<DynamicWhereFilter> whereFilters);

	/**
	 * 생산실적이력 데이타를 조회한다.
	 *
	 * @param mtlNo
	 * @return List
	 */
	@GetMapping("/charge-production/mtlNo/{mtlNo}")
	public List<ChargeProduction> findChargeProductionByMtlNo(@PathVariable("mtlNo") String mtlNo);
	/**
	 * 생산실적이력 데이타를 수정한다.
	 *
	 * @param transactionId
	 * @param map
	 */
	@PutMapping("/charge-production/update/{transactionId}")
	public void updateChargeProduction(@PathVariable("transactionId") BigDecimal transactionId, @RequestBody Map<String, Object> map);

	// result ---------------------------------------------------------------------------------------------------------------
	/**
	 * 재료Tracking 데이타 조회
	 *
	 * @param trackingCodes
	 * @param lastUpdateTime
	 * @return List
	 */
	@GetMapping("/material-tracking/lastUpdateTime")
	public List<MaterialTracking> findTrackingCodeInAndLastUpdateTimestampGreaterThan(@RequestParam(value="trackingCodes") List<String> trackingCodes, @RequestParam(value="lastUpdateTime") String lastUpdateTime);
	/**
	 * 재료Tracking 조회 : 조업구분, 공장공정코드별 가장 최근 재료번호
	 *
	 * @param operFlag
	 * @param facOpCdN
	 * @return String
	 */
	@GetMapping(value = "/material-tracking/lastestMtlno/{operFlag}/{facOpCdN}") // 재료Tracking 조회 : 조업구분, 공장공정코드별 가장 최근 재료번호
	public String findLastestMaterialTrackingMtlNo(@PathVariable("operFlag") String operFlag, @PathVariable("facOpCdN") String facOpCdN);

	/**
	 * 재료Tracking 조회
	 *
	 * @param trackingCode
	 * @return MaterialTracking
	 */
	@GetMapping(value = "/material-tracking/{trackingCode}") // 재료Tracking 조회
	public MaterialTracking findMaterialTracking(@PathVariable("trackingCode") String trackingCode);

	/**
	 * 재료Tracking 조회
	 *
	 * @param prefixTrackingCode
	 * @return List
	 */
	@GetMapping(value = "/material-tracking/allPrefixTrackingCode/{prefixTrackingCode}") // 재료Tracking 조회
	public List<MaterialTracking> findMaterialTrackingCodeStartingWith(@PathVariable("prefixTrackingCode") String prefixTrackingCode);
	/**
	 * 재료Tracking 데이타를 조회한다.
	 *
	 * @param listTrackingCode
	 * @return List
	 */
	@PostMapping("/allTrackingCodes")
	public List<MaterialTracking> findTrackingCodeIn(@RequestBody List<String> listTrackingCode);
	/**
	 * 재료Tracking 데이타 조회
	 *
	 * @param mtlNo
	 * @return List
	 */
	@GetMapping(value = "/material-tracking/allMtlNo/{mtlNo}")
	public List<MaterialTracking> findMaterialTrackingMtlNo(@PathVariable("mtlNo") String mtlNo);
	/**
	 * 재료Tracking 데이타를 조회한다.
	 *
	 * @param listMtlNo
	 * @return List
	 */
	@PostMapping("/allMtlNos")
	public List<MaterialTracking> findMtlNoIn(@RequestBody List<String> listMtlNo);
	/**
	 * 재료Tracking 저장
	 *
	 * @param map
	 */
	@PostMapping(value = "/material-tracking") // 재료Tracking 저장
	public void registerMaterialTracking(@RequestBody Map<String, Object> map);
	/**
	 * 재료Tracking 수정
	 *
	 * @param trackingCode
	 * @param map
	 */
	@PutMapping(value = "/material-tracking/{trackingCode}") // 재료Tracking 수정
	public void updateMaterialTracking(@PathVariable("trackingCode") String trackingCode, @RequestBody Map<String, Object> map);

	/**
	 * 재료Tracking 삭제
	 *
	 * @param trackingCode
	 */
	@DeleteMapping(value = "/material-tracking/{trackingCode}") // 재료Tracking 삭제
	public void removeMaterialTracking(@PathVariable("trackingCode") String trackingCode);

	/**
	 * 설비휴지실적 전문을 처리한다.
	 *
	 * @param map
	 * @return String
	 */
	@PostMapping("/eai/nonOperation")
	public String receiveNonOperation(@RequestBody Map<String, Object> map);

	/**
	 * 비가동실적 Dynamic Where Filter 적용
	 *
	 * @param whereFilter
	 * @return List
	 */
	@PostMapping(value = "/non-operation-result/dynamicNonOperationResult")
	 public List<NonOperationResult> findNonOperationResultByDynamicWhere(@RequestBody List<DynamicWhereFilter> whereFilter);
	/**
	 * 비가동실적 조회
	 *
	 * @param operFlag
	 * @param facOpCdN
	 * @param mtlNo
	 * @param eqpDormantCd
	 * @return List
	 */
	@GetMapping("/non-operation-result/mtlNoEqpDormantCd/{operFlag}/{facOpCdN}/{mtlNo}/{eqpDormantCd}")
	public List<NonOperationResult> findByOperFlagAndFacOpCdNAndMtlNoAndEqpDormantCd(@PathVariable("operFlag") String operFlag, @PathVariable("facOpCdN") String facOpCdN, @PathVariable("mtlNo") String mtlNo, @PathVariable("eqpDormantCd") String eqpDormantCd);
	/**
	 * 비가동실적 조회
	 *
	 * @param operFlag
	 * @param facOpCdN
	 * @param eqpDormantSatDt
	 * @param opSft
	 * @return NonOperationResult
	 */
	@GetMapping(value = "/non-operation-result/{operFlag}/{facOpCdN}/{eqpDormantSatDt}/{opSft}") // 비가동실적 조회
	public NonOperationResult findNonOperationResult(@PathVariable("operFlag") String operFlag, @PathVariable("facOpCdN") String facOpCdN, @PathVariable("EqpDormantSatDt") String EqpDormantSatDt,
			@PathVariable("opSft") String opSft);

	/**
	 * 비가동실적 조회
	 *
	 * @param mtlNo
	 * @param facOpCdN
	 * @return List
	 */
	@GetMapping(value = "/non-operation-result/{mtlNo}/{facOpCdN}") // 비가동실적 조회
	public List<NonOperationResult> findByMtlNoAndFacOpCdN(@PathVariable("mtlNo") String mtlNo, @PathVariable("facOpCdN") String facOpCdN);
	/**
	 * 비가동실적 데이타를 조회한다.
	 *
	 * @param mtlNo
	 * @return List
	 */
	@GetMapping("/non-operation-result/dataEndStatusNull/{mtlNo}")
	public List<NonOperationResult> findByMtlNoAndDataEndStatusIsNull(@PathVariable("mtlNo") String mtlNo);
	/**
	 * 비가동실적 조회
	 *
	 * @param operFlag
	 * @param facOpCdN
	 * @param eqpDormantCd
	 * @param eqpDormantSatDt
	 * @return List
	 */
	@GetMapping("/all/{operFlag}/{facOpCdN}/{eqpDormantCd}/{eqpDormantSatDt}")
	public List<NonOperationResult> findByOperFlagAndFacOpCdNAndEqpDormantCdAndEqpDormantSatDtGreaterThanEqual(@PathVariable("operFlag") String operFlag, @PathVariable("facOpCdN") String facOpCdN,
			@PathVariable("eqpDormantCd") String eqpDormantCd, @PathVariable("eqpDormantSatDt") String eqpDormantSatDt);

	/**
	 * 비가동실적 저장
	 *
	 * @param map
	 */
	@PostMapping(value = "/non-operation-result") // 비가동실적 저장
	public void registerNonOperationResult(@RequestBody Map<String, Object> map);
	/**
	 * 비가동실적 데이타를 저장한다.
	 *
	 * @param list
	 */
	@PostMapping(value = "/non-operation-result/saves")
	public void registerNonOperationResults(@RequestBody List<Map<String, Object>> list);
	/**
	 * 비가동실적 삭제 mark 한다.
	 *
	 * @param entities
	 */
	@PostMapping("/non-operation-result/expireEntities")
	public void expireNonOperationResultEntites(@RequestBody List<NonOperationResult> entities);
	/**
	 * 비가동실적 삭제 mark 한다.
	 *
	 * @param operFlag
	 * @param facOpCdN
	 * @param mtlNo
	 * @param eqpDormantCd
	 */
	@GetMapping(value = "/non-operation-result/expireMtlNoEqpDormantCd/{operFlag}/{facOpCdN}/{mtlNo}/{eqpDormantCd}")
	public void expireNonOperationResultMtlNoEqpDormantCd(@PathVariable("operFlag") String operFlag, @PathVariable("facOpCdN") String facOpCdN, @PathVariable("mtlNo") String mtlNo, @PathVariable("eqpDormantCd") String eqpDormantCd);
	/**
	 * 공정진행 Dynamic Where Filter
	 *
	 * @param whereFilter
	 * @return List
	 */
	@PostMapping("/operation-progress/dynamicOperationProgress")
	public List<OperationProgress> findOperationProgressByDynamicWhereFilter(@RequestBody List<DynamicWhereFilter> whereFilter);

	/**
	 * 공정진행 조회
	 *
	 * @param mtlNo
	 * @param operationTrackingCd
	 * @return List
	 */
	@GetMapping(value = "/operation-progress/{mtlNo}/{operationTrackingCd}") // 공정진행 조회
	public List<OperationProgress> findOperationProgress(@PathVariable("mtlNo") String mtlNo, @PathVariable("operationTrackingCd") String operationTrackingCd);

	/**
	 * 공정진행 조회
	 *
	 * @param operationTrackingCd
	 * @param mtlNos
	 * @return List
	 */
	@GetMapping(value = "/operation-progress/all") // 공정진행 조회
	public List<OperationProgress> findOperationProgressAll(@RequestParam(value = "operationTrackingCd", required = false) String operationTrackingCd,
			@RequestParam(value = "mtlNos") List<String> mtlNos);

	/**
	 * 공정진행 조회
	 *
	 * @param mtlNo
	 * @param operationTrackingCd
	 * @param acOcrPasNum
	 * @param mSteWkYrdNo
	 * @return OperationProgress
	 */
	@GetMapping(value = "/operation-progress/{mtlNo}/{operationTrackingCd}/{acOcrPasNum}/{mSteWkYrdNo}") // 공정진행 조회
	public OperationProgress findOperationProgressDetail(@PathVariable("mtlNo") String mtlNo, @PathVariable("operationTrackingCd") String operationTrackingCd,
			@PathVariable("acOcrPasNum") String acOcrPasNum, @PathVariable("mSteWkYrdNo") BigDecimal mSteWkYrdNo);

	/**
	 * 공정진행 데이타를 조회한다.
	 *
	 * @param mtlNo
	 * @param operationTrackingCd
	 * @param acOcrPasNum
	 * @param mSteWkYrdNo
	 * @return List
	 */
	@GetMapping(value = "/operation-progress/allAcOcrPasNum")
	public List<OperationProgress> findByMtlNoAndOperationTrackingCdAndAcOcrPasNumStartingWithAndMSteWkYrdNoStartingWith(@RequestParam("mtlNo") String mtlNo,
			@RequestParam("operationTrackingCd") String operationTrackingCd, @RequestParam(value = "acOcrPasNum", required = false, defaultValue = "") String acOcrPasNum,
			@RequestParam(value = "mSteWkYrdNo", required = false) BigDecimal mSteWkYrdNo);

	/**
	 * 공정진행 조회
	 *
	 * @param operationTrackingCd
	 * @param fromDate
	 * @param toDate
	 * @return List
	 */
	@GetMapping("/operation-progress/{operationTrackingCd}/{fromDate}/{toDate}")
	public List<OperationProgress> findByOperationTrackingCdAndOpDnDtBetween(@PathVariable("operationTrackingCd") String operationTrackingCd, @PathVariable("fromDate") String fromDate,
			@PathVariable("toDate") String toDate);

	/**
	 * 공정진행 조회
	 *
	 * @param operFlag
	 * @param facOpCdN
	 * @return List
	 */
	@GetMapping("/operation-progress/all/{operFlag}/{facOpCdN}")
	public List<OperationProgress> findByOperFlagAndFacOpCdN(@PathVariable("operFlag") String operFlag, @PathVariable("facOpCdN") String facOpCdN);

	/**
	 * 공정진행 저장
	 *
	 * @param map
	 */
	@PostMapping(value = "/operation-progress")
	public void registerOperationProgress(@RequestBody Map<String, Object> map);
	/**
	 * 공정진행 저장
	 *
	 * @param map
	 */
	@PostMapping(value = "/operation-progress/nonEvent")
	public void registerOperationProgressNonEvent(@RequestBody Map<String, Object> map);
	/**
	 * 공정진행 수정
	 *
	 * @param passageshopId
	 * @param map
	 */
	@PutMapping("/operation-progress/nonEvent/{passageshopId}")
	public void updateOperationProgressNonEvent(@PathVariable("passageshopId") String passageshopId, @RequestBody Map<String, Object> map);
	/**
	 * 통합관제 실적송신
	 * @param map
	 * @return String
	 */
	@PostMapping("/operation-progress/sendCombinationControl")
	public String sendCombinationControlToMap(@RequestBody Map<String, Object> map);
	/**
	 * 원료사용실적 Dynamic Where Filter 적용
	 *
	 * @param whereFilter
	 * @return List
	 */
	@PostMapping(value = "/raw-material-use-result/dynamicRawMaterialUseResult")
	 public List<RawMaterialUseResult> findRawMaterialUseResultByDynamicWhere(@RequestBody List<DynamicWhereFilter> whereFilter);

	/**
	 * Dynamic Where Filter 조건으로 Select절 + Paging 기능 적용
	 *
	 * @param fieldNames
	 * @param whereFilters
	 * @return List
	 */
	@PostMapping(value = "/raw-material-use-result/dynamicWhereFilter")
	public List<RawMaterialUseResult> findRawMaterialUseResultByDynamicWhere(@RequestParam(value = "fieldNames", required = false, defaultValue = "") List<String> fieldNames, @RequestBody List<DynamicWhereFilter> whereFilters);

	/**
	 * 원료사용실적 조회
	 *
	 * @param mtlNo
	 * @return RawMaterialUseResult
	 */
	@GetMapping(value = "/raw-material-use-result/{mtlNo}") // 원료사용실적 조회
	public RawMaterialUseResult findRawMaterialUseResult(@PathVariable("mtlNo") String mtlNo);

	/**
	 * 원료사용실적 조회
	 *
	 * @param mtlNo
	 * @return List<RawMaterialUseResult>
	 */
	@PostMapping("/raw-material-use-result/all") // 원료사용실적 조회
	public List<RawMaterialUseResult> findRawMaterialUseResultAllByMtlNo(@RequestBody List<String> mtlNo);

	/**
	 * 원료사용실적 조회
	 *
	 * @param mtlNo
	 * @param operFlag
	 * @param facOpCdN
	 * @param mrmatSubRmatTp
	 * @return List
	 */
	@GetMapping(value = "/raw-material-use-result/{mtlNo}/{operFlag}/{facOpCdN}/{mrmatSubRmatTp}") // 원료사용실적 조회
	public List<RawMaterialUseResult> findByMtlNoAndOperFlagAndFacOpCdNAndMrmatSubRmatTpAndDataEndStatusIsNull(@PathVariable("mtlNo") String mtlNo, @PathVariable("operFlag") String operFlag,
			@PathVariable("facOpCdN") String facOpCdN, @PathVariable("mrmatSubRmatTp") String mrmatSubRmatTp);

	/**
	 * 원료사용실적 저장
	 *
	 * @param map
	 */
	@PostMapping(value = "/raw-material-use-result") // 원료사용실적 저장
	public void registerRawMaterialUseResult(@RequestBody Map<String, Object> map);
	/**
	 * 원료사용실적 데이타를 저장한다.
	 *
	 * @param list
	 */
	@PostMapping(value = "/raw-material-use-result/saves") // 원료사용실적 저장
	public void registerRawMaterialUseResults(@RequestBody List<Map<String, Object>> list) ;
	/**
	 * 원료사용실적을 삭제 mark한다.
	 *
	 * @param transactionId
	 */
	@DeleteMapping("/raw-material-use-result/expire")
	public void expireRawMaterialUseResult(@RequestParam("transactionId") BigDecimal transactionId);
	/**
	 * 원료사용실적을 삭제 mark한다.
	 *
	 * @param transactionIds
	 */
	@PostMapping("/raw-material-use-result/expires")
	public void expireRawMaterialUseResultAll(@RequestBody List<BigDecimal> transactionIds);
	/**
	 * 원료사용실적을 삭제 mark한다.
	 *
	 * @param entities
	 */
	@PostMapping("/raw-material-use-result/expireEntities")
	public void expireRawMaterialUseResultEntities(List<RawMaterialUseResult> entities);
	/**
	 * 원료사용실적을 삭제 mark한다.
	 *
	 * @param mtlNo
	 * @param facOpCdN
	 * @param mSteWkYrdNo
	 * @param acOcrPasNum
	 */
	@DeleteMapping("/raw-material-use-result/expire/{mtlNo}/{facOpCdN}/{mSteWkYrdNo}/{acOcrPasNum}")
	public void expireRawMaterialUseResult(@PathVariable("mtlNo") String mtlNo, @PathVariable("facOpCdN") String facOpCdN, @PathVariable("mSteWkYrdNo") String mSteWkYrdNo, @PathVariable("acOcrPasNum") String acOcrPasNum);
	/**
	 * 원료사용실적_투입시점별 조회
	 *
	 * @param mtlNo
	 * @param mSteWkYrdNo
	 * @param smRmatThwTmTpCd
	 * @return List<RawMaterialUseResultStep>
	 */
	@GetMapping("/raw-material-use-result-step/{mtlNo}/{mSteWkYrdNo}/{smRmatThwTmTpCd}") // 원료사용실적_투입시점별 조회
	public List<RawMaterialUseResultStep> findRawMaterialUseResultStep(@PathVariable("mtlNo") String mtlNo, @PathVariable("mSteWkYrdNo") String mSteWkYrdNo,
			@PathVariable("smRmatThwTmTpCd") String smRmatThwTmTpCd);

	/**
	 * 원료사용실적_투입시점별 저장
	 *
	 * @param map
	 */
	@PostMapping(value = "/raw-material-use-result-step") // 원료사용실적_투입시점별 저장
	public void registerRawMaterialUseResultStep(@RequestBody Map<String, Object> map);

	/**
	 * 2차정련공통실적 조회
	 *
	 * @param mtlNo
	 * @return SecondRefiningCommonResult
	 */
	@GetMapping("/second-refining-common-result/{mtlNo}") // 2차정련공통실적 조회
	public SecondRefiningCommonResult findSecondRefiningCommonResult(@PathVariable("mtlNo") String mtlNo);

	/**
	 * 2차정련공통실적 저장
	 *
	 * @param map
	 */
	@PostMapping("/second-refining-common-result") // 2차정련공통실적 저장
	public void registerSecondRefiningCommonResult(@RequestBody Map<String, Object> map);

	/**
	 * 원료관리 제강대표품명 에서 사소구분, 조업구분, 공장공정코드 ,원료대표품명코드에 해당하는 레코드를 추출한다.
	 *
	 * @param worksCode         - 사소구분
	 * @param operFlag          - 조업구분
	 * @param facOpCdN          - 공장공정코드
	 * @param rmatManItemDescCd - 원료대표품명코드
	 * @return Map - 주부원료구분,생산Item코드,제강원료조업코드,CostCenter,SubInventoryCode,원료대표품명코드명
	 */
	@GetMapping("/raw-material-use-result/pumsteel/{worksCode}/{operFlag}/{facOpCdN}/{rmatManItemDescCd}")
	public Map<String, Object> getPumSteel(@PathVariable("worksCode") String worksCode, @PathVariable("operFlag") String operFlag, @PathVariable("facOpCdN") String facOpCdN, @PathVariable("rmatManItemDescCd") String rmatManItemDescCd);

	/**
	 * PQ7R2017(품질판정-조업품질기준-(포)제강조업품질지시수신) / KQ7R2017(품질판정-조업품질기준-(광)제강조업품질지시수신)
	 *
	 * @param map
	 * @return String
	 */
	@PostMapping("/steel-quality/order")
	public String sendSteelQualityOrder(@RequestBody Map<String, Object> map);

	/**
	 * PQ7R2007(품질판정-조업품질기준-(포)제강조업품질실적수신) / KQ7R2007(품질판정-조업품질기준-(광)제강조업품질실적수신)
	 *
	 * @param map
	 * @return String
	 */
	@PostMapping("/steel-quality/result")
	public String sendSteelQualityResult(@RequestBody Map<String, Object> map);

	/**
	 * 공정별성분판정요구 처리한다 KEC1D303
	 *
	 * @param map
	 * @return String
	 */
	@PostMapping(value = "/event/operationIngredientJudgmentRequest")
	public String receiveOperationIngredientJudgmentRequest(@RequestBody Map<String, Object> map);

	/**
	 * Charge재료실적 KEZ1A241
	 *
	 * @param map
	 * @return String
	 */
	@PostMapping("/event/chargeResultK")
	public String receiveChargeMaterialResultK(@RequestBody Map<String, Object> map);

	/**
	 * Charge재료실적 PEZ1A242,PEZ1A243,PEZ1A244
	 *
	 * @param map
	 * @return String
	 */
	@PostMapping("/event/chargeResultP")
	public String receiveChargeMaterialResultP(@RequestBody Map<String, Object> map);

	/**
	 * Charge생산실적 PEZ1A281,KEZ1A281
	 *
	 * @param map
	 * @return String
	 */
	@PostMapping("/event/chargeProductionResultSend")
	public String receiveChargeProductionResult(@RequestBody Map<String, Object> map);

	/**
	 * Charge생산실적취소 PEA1A282,KEA1A282
	 *
	 * @param map
	 * @return String
	 */
	@PostMapping("/event/secondRefiningProductionResultSend")
	public String receiveChargeProductionResultCancel(@RequestBody Map<String, Object> map);
}
