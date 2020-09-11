
package com.posco.mes3.m2dc01.store.jpastore.charge;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.stereotype.Repository;

import com.posco.mes.reuse.common.logging.PosLogWriterIF;
import com.posco.mes3.m2dc01.domain.entity.charge.ChargeMaterial;
import com.posco.mes3.m2dc01.domain.store.charge.ChargeMaterialStore;
import com.posco.mes3.m2dc01.helper.M2dc01DateUtil;
import com.posco.mes3.m2dc01.helper.constants.M2dc01Constants;
import com.posco.mes3.m2dc01.store.jpo.charge.ChargeMaterialJpo;
import com.posco.mes3.m2dc01.store.jpo.charge.QChargeMaterialJpo;
import com.posco.mes3.m2dc01.store.query.M2dc01JpqlUtil;
import com.posco.mes3.m2dc01.store.query.M2dc01NativeUtil;
import com.posco.mes3.m2dc01.store.repository.charge.ChargeMaterialRepository;
import com.posco.mes3.reuse.common.logging.PosLogger;
import com.posco.mes3.sharedservice.share.domain.DynamicWhereFilter;
import com.posco.mes3.sharedservice.share.querydsl.helper.DynamicClauseHelper;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.Expression;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.JPQLQuery;
import com.querydsl.jpa.impl.JPAQuery;

/**
 * 제강재료 STORE Class이다.
 *
 * @author wy.seo
 * @version 1.0
 */
@Repository
public class ChargeMaterialJpaStore implements ChargeMaterialStore, M2dc01Constants {
	//
	@PersistenceContext
	private EntityManager em;

	private ChargeMaterialRepository chargeMaterialRepository;

	/**
	 * 제강재료 STORE
	 *
	 * @param chargeMaterialRepository
	 */
	public ChargeMaterialJpaStore(ChargeMaterialRepository chargeMaterialRepository) {
		//
		this.chargeMaterialRepository = chargeMaterialRepository;
	}

	/**
	 * Dynamic Where Filter 적용
	 *
	 * @param whereFilter
	 * @return List
	 */
	@Override
	public List<ChargeMaterial> retrieveChargeMaterialsByDynamicWhereFilter(List<DynamicWhereFilter> whereFilter) {
		//
		QChargeMaterialJpo table = QChargeMaterialJpo.chargeMaterialJpo;
		JPQLQuery<ChargeMaterialJpo> query = new JPAQuery<>(this.em);
		query.from(table);

		DynamicClauseHelper dynamicHelper = new DynamicClauseHelper();
		BooleanBuilder builder = new BooleanBuilder();

		whereFilter.stream().map(filter -> dynamicHelper.getDynamicWhere(ChargeMaterialJpo.class, filter, builder)).collect(Collectors.toList());

		query.where(builder);
		return query.fetch().stream().map(ChargeMaterialJpo::toDomain).collect(Collectors.toList());
	}

	/**
	 * Dynamic Where Filter 조건으로 Select절 + Paging 기능 적용
	 *
	 * @param fieldNames
	 * @param whereFilters
	 * @return List
	 */
	@Override
	public List<ChargeMaterial> retrieveMaterialsByDynamicWhereFilter(List<String> fieldNames, List<DynamicWhereFilter> whereFilters) {
		//
		QChargeMaterialJpo table = QChargeMaterialJpo.chargeMaterialJpo;
		JPQLQuery<ChargeMaterialJpo> query = new JPAQuery<>(this.em);
		DynamicClauseHelper dynamicHelper = new DynamicClauseHelper();
		BooleanBuilder builder = new BooleanBuilder();

		if (fieldNames.size() == 0) {
			query.from(table);
		} else {
			Expression[] selectedFields = dynamicHelper.getDynamicSelectClause(ChargeMaterialJpo.class, fieldNames);
			query.select(Projections.fields(ChargeMaterialJpo.class, selectedFields)).from(table);
		}

		whereFilters.stream().map(filter -> dynamicHelper.getDynamicWhere(ChargeMaterialJpo.class, filter, builder)).collect(Collectors.toList());

		if (whereFilters.get(0).getOffset() == null && whereFilters.get(0).getLimit() == null)
			query.where(builder);
		else
			query.where(builder).offset(whereFilters.get(0).getOffset()).limit(whereFilters.get(0).getLimit());

		return query.fetch().stream().map(ChargeMaterialJpo::toDomain).collect(Collectors.toList());

	}

	/**
	 * Dynamic Where Filter 조건으로 Count 값 리턴
	 *
	 * @param whereFilters
	 * @return long
	 */
	@Override
	public long countMaterialsByDynamicWhereFilter(List<DynamicWhereFilter> whereFilters) {
		//
		QChargeMaterialJpo table = QChargeMaterialJpo.chargeMaterialJpo;
		JPQLQuery<ChargeMaterialJpo> query = new JPAQuery<>(this.em);

		query.from(table);

		DynamicClauseHelper dynamicHelper = new DynamicClauseHelper();
		BooleanBuilder builder = new BooleanBuilder();

		whereFilters.stream().map(filter -> dynamicHelper.getDynamicWhere(ChargeMaterialJpo.class, filter, builder)).collect(Collectors.toList());

		return query.where(builder).fetchCount();
	}

	/**
	 * 반송용강재료번호를 조회한다.
	 *
	 * @param operFlag
	 * @param facOpCdN
	 * @return List
	 */
	@Override
	public List<Map<String, Object>> retrieveReturnMtlNos(String operFlag, String facOpCdN) {
		//
		String jpqlQuery = M2dc01JpqlUtil.getDbQueryToJpqlQueryToMap("retrieveReturnMtlNos");
		List<Map<String, Object>> jpoList = new ArrayList<Map<String, Object>>();
		if (jpqlQuery != null) {
			jpoList = em.createQuery(jpqlQuery).setParameter(CAMEL_OPER_FLAG, operFlag).setParameter(CAMEL_FAC_OP_CD_N, facOpCdN).getResultList();
		}
		return jpoList;
	}
	/**
	 * 재장입강번조회
	 *
	 * @param rtnChNo
	 * @param operFlag
	 * @param facOpCdN
	 * @return List
	 */
	@Override
	public List<Map<String, Object>> retrieveReturnToCharge(String rtnChNo, String operFlag, String facOpCdN){
		//
		String jpqlQuery = M2dc01JpqlUtil.getDbQueryToJpqlQueryToMap("retrieveReturnToCharge");
		List<Map<String, Object>> jpoList = new ArrayList<Map<String, Object>>();
		if (jpqlQuery != null) {
			jpoList = em.createQuery(jpqlQuery).setParameter("rtnChNo", rtnChNo).setParameter(CAMEL_OPER_FLAG, operFlag).setParameter(CAMEL_FAC_OP_CD_N, facOpCdN).getResultList();
		}
		return jpoList;
	}
	/**
	 * 조업구분, 공장공정코드 별 가장 최근 재료정보를 조회한다.
	 *
	 * @param operFlag
	 * @param facOpCdN
	 * @return Map
	 */
	@Override
	public Map<String, Object> retrieveLastestMtlNo(String operFlag, String facOpCdN) {
		//
		Map<String, Object> params = new HashMap<String, Object>();
		params.put(CAMEL_OPER_FLAG, operFlag);
		params.put(CAMEL_FAC_OP_CD_N, facOpCdN);
		List<Map<String, Object>> list = M2dc01NativeUtil.getNativeQueryDataToMap(em, "retrieveLastestMtlNo", params);
		Map<String, Object> map = null;
		if (list != null && list.size() > 0) {
			map = list.get(0);
		}
		return map;
	}

	/**
	 * 조업구분, 공장공정코드, 재료번호 기준으로 생성된 순서로 이전 재료번호를 조회한다.
	 *
	 * @param mtlNo
	 * @param prefixMtlNo
	 * @param queryId
	 * @return List<ChargeMaterial>
	 */
	@Override
	public List<ChargeMaterial> retrieveMtlNoSelectList(String mtlNo, String prefixMtlNo, String queryId) {
		//
		String jpqlQuery = M2dc01JpqlUtil.getDbQueryToJpqlQuery(queryId);
		List<ChargeMaterialJpo> jpoList = null;
		if (jpqlQuery != null) {
			jpoList = em.createQuery(jpqlQuery, ChargeMaterialJpo.class).setParameter("prefixMtlNo", prefixMtlNo).setParameter(CAMEL_MTL_NO, mtlNo).setMaxResults(20).getResultList();
		}
		return ChargeMaterialJpo.toDomains(jpoList);
	}

	/**
	 * 제강재료 준비강번으로 데이타를 조회한다.
	 *
	 * @param prpChargeNo1
	 * @return ChargeMaterial
	 */
	@Override
	public ChargeMaterial retrieveByPrpChargeNo1(String prpChargeNo1) {
		//
		ChargeMaterialJpo jpo = chargeMaterialRepository.findByPrpChargeNo1(prpChargeNo1);
		return jpo != null ? jpo.toDomain() : null;
	}

	/**
	 * 제강재료 재료번호로 데이타를 조회한다.
	 *
	 * @param fromMtlNo
	 * @param toMtlNo
	 * @return List
	 */
	@Override
	public List<ChargeMaterial> retrieveMtlNoBetween(String fromMtlNo, String toMtlNo) {
		//
		List<ChargeMaterialJpo> jpoList = chargeMaterialRepository.findByMtlNoBetween(fromMtlNo, toMtlNo);
		return ChargeMaterialJpo.toDomains(jpoList);
	}
	/**
	 * 제강재료 재료번호로 데이타를 조회한다.
	 *
	 * @param fromMtlNo
	 * @param toMtlNo
	 * @param trsF
	 * @return List
	 */
	@Override
	public List<ChargeMaterial> retrieveMtlNoBetweenAndTrsF(String fromMtlNo, String toMtlNo, String trsF) {
		//
		List<ChargeMaterialJpo> jpoList = chargeMaterialRepository.findByMtlNoBetweenAndTrsF(fromMtlNo, toMtlNo, trsF);
		return ChargeMaterialJpo.toDomains(jpoList);
	}

	/**
	 * 제강재료 재료번호로 데이타를 조회한다.
	 *
	 * @param mtlNo
	 * @return ChargeMaterial
	 */
	@Override
	public ChargeMaterial retrieve(String mtlNo) {
		//
		ChargeMaterialJpo jpo = chargeMaterialRepository.findByMtlNo(mtlNo);
		return jpo != null ? jpo.toDomain() : null;
	}

	/**
	 * 제강재료 데이타를 조회한다.
	 *
	 * @param mtlNo
	 * @return List<ChargeMaterial>
	 */
	@Override
	public List<ChargeMaterial> retrieveByMtlNoIn(List<String> mtlNo) {
		//
		List<ChargeMaterialJpo> jpoList = chargeMaterialRepository.findByMtlNoIn(mtlNo);
		return ChargeMaterialJpo.toDomains(jpoList);
	}

	/**
	 * 제강재료 데이타를 조회한다.
	 *
	 * @param operFlag
	 * @param fromDt
	 * @param toDt
	 * @return List<ChargeMaterial>
	 */
	@Override
	public List<ChargeMaterial> retrieveByOperFlagAndTransactionDateBetween(String operFlag, String fromDt, String toDt) {
		//
		List<ChargeMaterialJpo> jpoList = chargeMaterialRepository.findByOperFlagAndTransactionDateBetween(operFlag, fromDt, toDt);
		return ChargeMaterialJpo.toDomains(jpoList);
	}

	/**
	 * 제강재료 데이타를 조회한다.
	 *
	 * @param operFlag
	 * @param facOpCdN
	 * @return List<ChargeMaterial>
	 */
	@Override
	public List<ChargeMaterial> retrieveByOperFlagAndFacOpCdNAndTappDnDateNotNull(String operFlag, String facOpCdN) {
		//
		//
		String jpqlQuery = M2dc01JpqlUtil.getDbQueryToJpqlQuery("retrieveMtlNoTappDnDate");
		List<ChargeMaterialJpo> jpoList = null;
		if (jpqlQuery != null) {
			jpoList = em.createQuery(jpqlQuery, ChargeMaterialJpo.class).setParameter(CAMEL_OPER_FLAG, operFlag).setParameter(CAMEL_FAC_OP_CD_N, facOpCdN).getResultList();
			//jpoList = em.createQuery(jpqlQuery, ChargeMaterialJpo.class).setParameter(CAMEL_OPER_FLAG, operFlag).setParameter(CAMEL_FAC_OP_CD_N, facOpCdN).setMaxResults(20).getResultList();
		}
		return ChargeMaterialJpo.toDomains(jpoList);
	}

	/**
	 * Charge재료 조회
	 *
	 * @param operFlag
	 * @param facOpCdN
	 * @param fromDt
	 * @param toDt
	 * @return List
	 */
	@Override
	public List<ChargeMaterial> retrieveByOperFlagAndFacOpCdNStartingWithAndTappDnDateBetween(String operFlag, String facOpCdN, String fromDt, String toDt) {
		//
		Timestamp fromTime = M2dc01DateUtil.convertToTimestamp(fromDt);
		Timestamp toTime = M2dc01DateUtil.convertToTimestamp(toDt);
		List<ChargeMaterialJpo> jpoList = chargeMaterialRepository.findByOperFlagAndFacOpCdNStartingWithAndTappDnDateBetween(operFlag, facOpCdN, fromTime, toTime);
		return ChargeMaterialJpo.toDomains(jpoList);
	}

	/**
	 * Charge재료 조회
	 *
	 * @param operFlag
	 * @param facOpCdN
	 * @return List
	 */
	@Override
	public List<ChargeMaterial> retrieveOperFlagAndFacOpCdNStartingWithAndTransactionDateIsNullAndTappStaDateIsNull(String operFlag, String facOpCdN) {
		//
		List<ChargeMaterialJpo> jpoList = chargeMaterialRepository.findByOperFlagAndFacOpCdNStartingWithAndTransactionDateIsNullAndTappStaDateIsNull(operFlag, facOpCdN);
		return ChargeMaterialJpo.toDomains(jpoList);
	}

	/**
	 * 제강재료 조회
	 *
	 * @param facOpCdN
	 * @param moltenSteelCharCd
	 * @param smSteelGrd
	 * @return List
	 */
	@Override
	public List<ChargeMaterial> retrieveFacOpCdNStartingWithAndMoltenSteelCharCdAndSmSteelGrd(String facOpCdN, String moltenSteelCharCd, String smSteelGrd) {
		//
		List<ChargeMaterialJpo> jpoList = chargeMaterialRepository.findByFacOpCdNStartingWithAndMoltenSteelCharCdAndSmSteelGrd(facOpCdN, moltenSteelCharCd, smSteelGrd);
		return ChargeMaterialJpo.toDomains(jpoList);
	}

	/**
	 * 제강재료 조회
	 *
	 * @param worksCode
	 * @param facOpCdN
	 * @param tapOpSumupDt
	 * @return List
	 */
	@Override
	public List<ChargeMaterial> retrieveTapOpSumupDtBefore(String worksCode, String facOpCdN, String tapOpSumupDt) {
		//
		String jpqlQuery = M2dc01JpqlUtil.getDbQueryToJpqlQuery("retrieveScrapHistory");
		List<ChargeMaterialJpo> jpoList = null;
		if (jpqlQuery != null) {
			jpoList = em.createQuery(jpqlQuery, ChargeMaterialJpo.class).setParameter(CAMEL_WORKS_CODE, worksCode).setParameter(CAMEL_FAC_OP_CD_N, facOpCdN).setParameter("tapOpSumupDt", tapOpSumupDt)
					.setMaxResults(20).getResultList();
		}
		return ChargeMaterialJpo.toDomains(jpoList);
	}

	/**
	 * 제강재료 데이타를 저장한다.
	 *
	 * @param entity
	 * @return ChargeMaterial
	 */
	@Override
	public ChargeMaterial createChargeMaterial(ChargeMaterial entity) {
		//
		ChargeMaterialJpo jpo = new ChargeMaterialJpo(entity);
		chargeMaterialRepository.save(jpo);
		return jpo.toDomain();
	}

	/**
	 * 제강재료 데이타를 수정한다.
	 *
	 * @param entity
	 * @return ChargeMaterial
	 */
	@Override
	public ChargeMaterial updateChargeMaterial(ChargeMaterial entity) {
		//
		ChargeMaterialJpo jpo = null;
		if(entity != null && entity.getMtlNo() != null) {
			jpo = new ChargeMaterialJpo(entity);
			chargeMaterialRepository.save(jpo);
		} else {
			PosLogger.developerLog(PosLogWriterIF.INFO, MSG_ERROR_MODIFY_NULL + " : 제강재료", this);
		}
		return jpo.toDomain();
	}
}
