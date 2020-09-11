
package com.posco.mes3.m2drq0.store.mybatis.bof;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;

import com.posco.mes3.m2drq0.domain.dto.bof.SteelBOFHistoryResultDto;
import com.posco.mes3.m2drq0.domain.dto.bof.SteelBofLatestMtlNoDto;
import com.posco.mes3.m2drq0.domain.dto.bof.SteelDPFHistoryResultDto;
import com.posco.mes3.m2drq0.domain.dto.bof.SteelDpFceProcDto;
import com.posco.mes3.m2drq0.domain.dto.bof.SteelDpfLdFceRmatUseDto;
import com.posco.mes3.m2drq0.domain.dto.bof.SteelDpfLdFceRmatUseTotDto;
import com.posco.mes3.m2drq0.domain.dto.bof.SteelEbbBSMessageDto;
import com.posco.mes3.m2drq0.domain.dto.bof.SteelLdFceBlwHeaderDto;
import com.posco.mes3.m2drq0.domain.dto.bof.SteelLdFceDpBlwHeaderDto;
import com.posco.mes3.m2drq0.domain.dto.bof.SteelLdFceDpProcessDto;
import com.posco.mes3.m2drq0.domain.dto.bof.SteelLdFceDpProcessHeaderDto;
import com.posco.mes3.m2drq0.domain.dto.bof.SteelLdFceDpRmatUseHeaderDto;
import com.posco.mes3.m2drq0.domain.dto.bof.SteelLdFceHotBlastStoveResultDto;
import com.posco.mes3.m2drq0.domain.dto.bof.SteelLdFceLowBlowResultsDto;
import com.posco.mes3.m2drq0.domain.dto.bof.SteelLdFceProcessDto;
import com.posco.mes3.m2drq0.domain.dto.bof.SteelLdFceProcessHeaderDto;
import com.posco.mes3.m2drq0.domain.dto.bof.SteelLdFceRmatUseDto;
import com.posco.mes3.m2drq0.domain.dto.bof.SteelLdFceRmatUseHeaderDto;
import com.posco.mes3.m2drq0.domain.dto.bof.SteelLdFceRmatUseTotDto;
import com.posco.mes3.m2drq0.domain.dto.bof.SteelLdRstPerMinuteDataDto;
import com.posco.mes3.m2drq0.domain.dto.bof.SteelLdStartTimeInfoDto;
import com.posco.mes3.m2drq0.domain.dto.bof.SteelMeltedIronHeaderDto;
import com.posco.mes3.m2drq0.domain.dto.bof.SteelPlanChargeNoDto;
import com.posco.mes3.m2drq0.domain.dto.bof.SteelPrpChargeNoBackupDto;
import com.posco.mes3.m2drq0.domain.dto.bof.SteelPrpChargeNoDto;
import com.posco.mes3.m2drq0.domain.dto.bof.SteelReturnChargeNoDto;
import com.posco.mes3.m2drq0.domain.dto.bof.SteelRmatPumSteelDto;
import com.posco.mes3.m2drq0.domain.dto.bof.SteelSmDpfWorkTimeInfoDto;
import com.posco.mes3.m2drq0.domain.dto.bof.SteelSmRmatThwUseRstDto;
import com.posco.mes3.m2drq0.domain.dto.bof.SteelSmRmatThwUseRstTotalDto;
import com.posco.mes3.m2drq0.domain.dto.bof.SteelUIPumSteelDto;
import com.posco.mes3.m2drq0.domain.store.bof.BofStore;

/**
 * BofMybatisStore
 *
 * @author m2drq0
 * @version 1.0
 */
@Repository
public class BofMybatisStore implements BofStore {
	//
	private SqlSessionTemplate sqlSessionTemplate;

	/**
	 * BofMybatisStore
	 *
	 * @param sqlSessionTemplate
	 */
	public BofMybatisStore(SqlSessionTemplate sqlSessionTemplate) {
		this.sqlSessionTemplate = sqlSessionTemplate;
	}

	@Override
	public List<SteelSmRmatThwUseRstDto> findSteelSmRmatThwUseRst(String mtlNo, String smRmatThwTmTpCd,
			String mratSubRmatTp) {
		// TODO Auto-generated method stub
		Map<String, Object> param = new HashMap<>();
		param.put("mtlNo", mtlNo);
		param.put("smRmatThwTmTpCd", smRmatThwTmTpCd);
		param.put("mratSubRmatTp", mratSubRmatTp);
		List<SteelSmRmatThwUseRstDto> results = sqlSessionTemplate
				.selectList("com.posco.mes3.m2drq0.bof.SteelSmRmatThwUseRst", param);
		return results;
	}

	@Override
	public List<SteelSmRmatThwUseRstTotalDto> findSteelSmRmatThwUseRstTotal(String mtlNo, String smRmatThwTmTpCd,
			String mratSubRmatTp) {
		// TODO Auto-generated method stub
		Map<String, Object> param = new HashMap<>();
		param.put("mtlNo", mtlNo);
		param.put("smRmatThwTmTpCd", smRmatThwTmTpCd);
		param.put("mratSubRmatTp", mratSubRmatTp);
		List<SteelSmRmatThwUseRstTotalDto> results = sqlSessionTemplate
				.selectList("com.posco.mes3.m2drq0.bof.SteelSmRmatThwUseRstTotal", param);
		return results;
	}

	@Override
	public SteelLdFceHotBlastStoveResultDto findSteelLdFceHotBlastStoveResult(String operFlag, String facOpCdN,
			String mtlNo) {
		// TODO Auto-generated method stub
		Map<String, Object> param = new HashMap<>();
		param.put("mtlNo", mtlNo);
		param.put("operFlag", operFlag);
		param.put("facOpCdN", facOpCdN);
		// sqlSessionTemplate.selectMap(statement, param);
		SteelLdFceHotBlastStoveResultDto results = sqlSessionTemplate
				.selectOne("com.posco.mes3.m2drq0.bof.SteelLdFceHotBlastStoveResult", param);
		return results;
	}

	@Override
	public List<SteelLdFceLowBlowResultsDto> findSteelLdFceLowBlowResults(String operFlag, String facOpCdN,
			String mtlNo) {
		// TODO Auto-generated method stub
		Map<String, Object> param = new HashMap<>();
		param.put("mtlNo", mtlNo);
		param.put("operFlag", operFlag);
		param.put("facOpCdN", facOpCdN);
		List<SteelLdFceLowBlowResultsDto> results = sqlSessionTemplate
				.selectList("com.posco.mes3.m2drq0.bof.SteelLdFceLowBlowResults", param);
		return results;
	}

	@Override
	public SteelRmatPumSteelDto findSteelRmatPumSteelInfo(String operFlag, String facOpCdN, String rmatManItemDescCdN) {
		// TODO Auto-generated method stub
		Map<String, Object> param = new HashMap<>();
		param.put("operFlag", operFlag);
		param.put("facOpCdN", facOpCdN);
		param.put("rmatManItemDescCdN", rmatManItemDescCdN);
		SteelRmatPumSteelDto results = sqlSessionTemplate.selectOne("com.posco.mes3.m2drq0.bof.SteelRmatPumSteelInfo",
				param);
		return results;
	}

	@Override
	public List<SteelRmatPumSteelDto> findSteelRmatPumSteelInfoList(String operFlag, String facOpCdN) {
		//
		Map<String, Object> param = new HashMap<>();
		param.put("operFlag", operFlag);
		param.put("facOpCdN", facOpCdN);
		List<SteelRmatPumSteelDto> results = sqlSessionTemplate
				.selectList("com.posco.mes3.m2drq0.bof.SteelRmatPumSteelInfoList", param);
		return results;
	}

	@Override
	public SteelLdFceBlwHeaderDto findLdFceBlwHeader(String operFlag, String facOpCdN, String mtlNo) {
		// TODO Auto-generated method stub
		Map<String, Object> param = new HashMap<>();
		param.put("operFlag", operFlag);
		param.put("facOpCdN", facOpCdN);
		param.put("mtlNo", mtlNo);
		SteelLdFceBlwHeaderDto results = sqlSessionTemplate.selectOne("com.posco.mes3.m2drq0.bof.SteelLdFceBlwHeaderVO",
				param);
		return results;
	}

	@Override
	public SteelLdFceRmatUseHeaderDto findLdFceRmatUseHeader(String operFlag, String facOpCdN, String mtlNo) {
		// TODO Auto-generated method stub
		Map<String, Object> param = new HashMap<>();
		param.put("operFlag", operFlag);
		param.put("facOpCdN", facOpCdN);
		param.put("mtlNo", mtlNo);
		SteelLdFceRmatUseHeaderDto results = sqlSessionTemplate
				.selectOne("com.posco.mes3.m2drq0.bof.SteelLdFceRmatUseHeaderVO", param);
		return results;
	}

	@Override
	public List<SteelLdFceRmatUseDto> findLdFceRmatUse(String operFlag, String facOpCdN, String mtlNo,
			String ldFceBlwPurTp, String mRmatSubRmatTp) {
		// TODO Auto-generated method stub
		Map<String, Object> param = new HashMap<>();
		param.put("operFlag", operFlag);
		param.put("facOpCdN", facOpCdN);
		param.put("mtlNo", mtlNo);
		param.put("ldFceBlwPurTp", ldFceBlwPurTp);
		param.put("mRmatSubRmatTp", mRmatSubRmatTp);
		List<SteelLdFceRmatUseDto> results = sqlSessionTemplate
				.selectList("com.posco.mes3.m2drq0.bof.SteelLdFceRmatUseVO", param);
		return results;
	}

	@Override
	public List<SteelLdFceRmatUseTotDto> findLdFceRmatUseTot(String operFlag, String facOpCdN, String mtlNo,
			String ldFceBlwPurTp, String mRmatSubRmatTp) {
		// TODO Auto-generated method stub
		Map<String, Object> param = new HashMap<>();
		param.put("operFlag", operFlag);
		param.put("facOpCdN", facOpCdN);
		param.put("mtlNo", mtlNo);
		param.put("ldFceBlwPurTp", ldFceBlwPurTp);
		param.put("mRmatSubRmatTp", mRmatSubRmatTp);
		List<SteelLdFceRmatUseTotDto> results = sqlSessionTemplate
				.selectList("com.posco.mes3.m2drq0.bof.SteelLdFceRmatUseTotVO", param);
		return results;
	}

	@Override
	public List<SteelUIPumSteelDto> findSteelUIPumSteel(String worksCode, String facOpCdN, String mRmatSubRmatTp) {
		// TODO Auto-generated method stub
		Map<String, Object> param = new HashMap<>();
		param.put("worksCode", worksCode);
		param.put("facOpCdN", facOpCdN);
		param.put("mRmatSubRmatTp", mRmatSubRmatTp);
		List<SteelUIPumSteelDto> results = sqlSessionTemplate.selectList("com.posco.mes3.m2drq0.bof.SteelUIPumSteelVO",
				param);
		return results;
	}

	@Override
	public List<SteelLdFceProcessDto> findSteelLdFceProcess(String operFlag, String facOpCdN, String mtlNo) {
		// TODO Auto-generated method stub
		Map<String, Object> param = new HashMap<>();
		param.put("operFlag", operFlag);
		param.put("facOpCdN", facOpCdN);
		param.put("mtlNo", mtlNo);
		List<SteelLdFceProcessDto> results = sqlSessionTemplate
				.selectList("com.posco.mes3.m2drq0.bof.SteelLdFceProcessVO", param);
		return results;
	}

	@Override
	public List<SteelLdFceProcessHeaderDto> findSteelLdFceProcessHeader(String operFlag, String facOpCdN,
			String mtlNo) {
		// TODO Auto-generated method stub
		Map<String, Object> param = new HashMap<>();
		param.put("operFlag", operFlag);
		param.put("facOpCdN", facOpCdN);
		param.put("mtlNo", mtlNo);
		List<SteelLdFceProcessHeaderDto> results = sqlSessionTemplate
				.selectList("com.posco.mes3.m2drq0.bof.SteelLdFceProcessHeaderVO", param);
		return results;
	}

	@Override
	public SteelMeltedIronHeaderDto findSteelMeltedIronHeader(String operFlag, String facOpCdN, String mtlNo) {
		// TODO Auto-generated method stub
		Map<String, Object> param = new HashMap<>();
		param.put("operFlag", operFlag);
		param.put("facOpCdN", facOpCdN);
		param.put("mtlNo", mtlNo);
		SteelMeltedIronHeaderDto results = sqlSessionTemplate
				.selectOne("com.posco.mes3.m2drq0.bof.SteelMeltedIronHeaderVO", param);
		return results;
	}

	@Override
	public List<SteelPrpChargeNoDto> findSteelPrpChargeNo(String operFlag, String facOpCdN, String mtlNo) {
		// TODO Auto-generated method stub
		Map<String, Object> param = new HashMap<>();
		param.put("operFlag", operFlag);
		param.put("facOpCdN", facOpCdN);
		param.put("mtlNo", mtlNo);
		List<SteelPrpChargeNoDto> results = sqlSessionTemplate
				.selectList("com.posco.mes3.m2drq0.bof.SteelPrpChargeNoVO", param);
		return results;
	}

	@Override
	public SteelLdFceDpBlwHeaderDto findSteelLdFceDpBlwHeader(String operFlag, String facOpCdN, String mtlNo) {
		// TODO Auto-generated method stub
		Map<String, Object> param = new HashMap<>();
		param.put("operFlag", operFlag);
		param.put("facOpCdN", facOpCdN);
		param.put("mtlNo", mtlNo);
		SteelLdFceDpBlwHeaderDto results = sqlSessionTemplate
				.selectOne("com.posco.mes3.m2drq0.bof.SteelLdFceDpBlwHeaderVO", param);
		return results;
	}

	@Override
	public SteelDpFceProcDto findSteelDpFceProc(String operFlag, String facOpCdN, String mtlNo) {
		// TODO Auto-generated method stub
		Map<String, Object> param = new HashMap<>();
		param.put("operFlag", operFlag);
		param.put("facOpCdN", facOpCdN);
		param.put("mtlNo", mtlNo);
		SteelDpFceProcDto results = sqlSessionTemplate.selectOne("com.posco.mes3.m2drq0.bof.SteelDpFceProcVO", param);
		return results;
	}

	@Override
	public SteelLdFceDpProcessHeaderDto findSteelLdFceDpProcessHeader(String operFlag, String facOpCdN, String mtlNo) {
		// TODO Auto-generated method stub
		Map<String, Object> param = new HashMap<>();
		param.put("operFlag", operFlag);
		param.put("facOpCdN", facOpCdN);
		param.put("mtlNo", mtlNo);
		SteelLdFceDpProcessHeaderDto results = sqlSessionTemplate
				.selectOne("com.posco.mes3.m2drq0.bof.SteelLdFceDpProcessHeaderVO", param);
		return results;
	}

	@Override
	public SteelLdFceDpProcessDto findSteelLdFceDpProcess(String operFlag, String facOpCdN, String mtlNo) {
		// TODO Auto-generated method stub
		Map<String, Object> param = new HashMap<>();
		param.put("operFlag", operFlag);
		param.put("facOpCdN", facOpCdN);
		param.put("mtlNo", mtlNo);
		SteelLdFceDpProcessDto results = sqlSessionTemplate.selectOne("com.posco.mes3.m2drq0.bof.SteelLdFceDpProcessVO",
				param);
		return results;
	}

	@Override
	public SteelLdFceDpRmatUseHeaderDto findSteelLdFceDpRmatUseHeader(String operFlag, String facOpCdN, String mtlNo) {
		// TODO Auto-generated method stub
		Map<String, Object> param = new HashMap<>();
		param.put("operFlag", operFlag);
		param.put("facOpCdN", facOpCdN);
		param.put("mtlNo", mtlNo);
		SteelLdFceDpRmatUseHeaderDto results = sqlSessionTemplate
				.selectOne("com.posco.mes3.m2drq0.bof.SteelLdFceDpRmatUseHeaderVO", param);
		return results;
	}

	@Override
	public List<SteelBofLatestMtlNoDto> findSteelBofLatestMtlNoByType(String worksCode, String operFlag,
			String facOpCdN, String type) {
		// TODO Auto-generated method stub
		Map<String, Object> param = new HashMap<>();
		param.put("operFlag", operFlag);
		param.put("facOpCdN", facOpCdN);
		param.put("worksCode", worksCode);
		param.put("type", type);
		List<SteelBofLatestMtlNoDto> results = sqlSessionTemplate
				.selectList("com.posco.mes3.m2drq0.bof.SteelBofLatestMtlNoVOByType", param);
		return results;
	}

	@Override
	public List<SteelPlanChargeNoDto> findSteelPlanChargeNo(String operFlag, String facOpCdN) {
		// TODO Auto-generated method stub
		Map<String, Object> param = new HashMap<>();
		param.put("operFlag", operFlag);
		param.put("facOpCdN", facOpCdN);
		List<SteelPlanChargeNoDto> results = sqlSessionTemplate
				.selectList("com.posco.mes3.m2drq0.bof.SteelPlanChargeNoVO", param);
		return results;
	}

	@Override
	public List<SteelReturnChargeNoDto> findSteelReturnChargeNo(String operFlag, String facOpCdN) {
		// TODO Auto-generated method stub
		Map<String, Object> param = new HashMap<>();
		param.put("operFlag", operFlag);
		param.put("facOpCdN", facOpCdN);
		List<SteelReturnChargeNoDto> results = sqlSessionTemplate
				.selectList("com.posco.mes3.m2drq0.bof.SteelReturnChargeNoVO", param);
		return results;
	}

	@Override
	public List<SteelLdRstPerMinuteDataDto> findSteelLdRstPerMinuteData(String mtlNo) {
		// TODO Auto-generated method stub
		Map<String, Object> param = new HashMap<>();
		param.put("mtlNo", mtlNo);
		List<SteelLdRstPerMinuteDataDto> results = sqlSessionTemplate
				.selectList("com.posco.mes3.m2drq0.bof.SteelLdRstPerMinuteDataVO", param);
		return results;
	}

	@Override
	public SteelEbbBSMessageDto findSteelEbbBSMessage(String mtlNo) {

		Map<String, Object> param = new HashMap<>();
		param.put("mtlNo", mtlNo);
		SteelEbbBSMessageDto results = sqlSessionTemplate.selectOne("com.posco.mes3.m2drq0.bof.SteelEbbBSMessageVO",
				param);
		return results;
	}

	@Override
	public SteelSmDpfWorkTimeInfoDto findSteelSmDpfWorkTimeInfo(String mtlNo) {
		// TODO Auto-generated method stub
		Map<String, Object> param = new HashMap<>();
		param.put("mtlNo", mtlNo);
		SteelSmDpfWorkTimeInfoDto results = sqlSessionTemplate
				.selectOne("com.posco.mes3.m2drq0.bof.SteelSmDpfWorkTimeInfoVO", param);
		return results;
	}

	@Override
	public List<SteelPrpChargeNoBackupDto> findSteelPrpChargeNoBackupDto(String operFlag, String facOpCdN,
			String mtlNo) {
		// TODO Auto-generated method stub
		Map<String, Object> param = new HashMap<>();
		param.put("operFlag", operFlag);
		param.put("facOpCdN", facOpCdN);
		param.put("mtlNo", mtlNo);
		List<SteelPrpChargeNoBackupDto> results = sqlSessionTemplate
				.selectList("com.posco.mes3.m2drq0.bof.SteelPrpChargeNoBackupVO", param);
		return results;
	}

	@Override
	public SteelDPFHistoryResultDto findSteelDPFHistoryResult(String mtlNo) {
		// TODO Auto-generated method stub
		Map<String, Object> param = new HashMap<>();
		param.put("mtlNo", mtlNo);
		SteelDPFHistoryResultDto results = sqlSessionTemplate
				.selectOne("com.posco.mes3.m2drq0.bof.SteelDPFHistoryResultVO", param);
		return results;
	}

	@Override
	public SteelBOFHistoryResultDto findSteelBOFHistoryResult(String mtlNo) {
		// TODO Auto-generated method stub
		Map<String, Object> param = new HashMap<>();
		param.put("mtlNo", mtlNo);
		SteelBOFHistoryResultDto results = sqlSessionTemplate
				.selectOne("com.posco.mes3.m2drq0.bof.SteelBOFHistoryResultVO", param);
		return results;
	}

	@Override
	public List<SteelDpfLdFceRmatUseDto> findDpfLdFceRmatUse(String operFlag, String facOpCdN, String mtlNo,
			String mRmatSubRmatTp) {
		// TODO Auto-generated method stub
		Map<String, Object> param = new HashMap<>();
		param.put("operFlag", operFlag);
		param.put("facOpCdN", facOpCdN);
		param.put("mtlNo", mtlNo);
		param.put("mRmatSubRmatTp", mRmatSubRmatTp);
		List<SteelDpfLdFceRmatUseDto> results = sqlSessionTemplate
				.selectList("com.posco.mes3.m2drq0.bof.SteelDpfLdFceRmatUseVO", param);
		return results;
	}

	@Override
	public List<SteelDpfLdFceRmatUseTotDto> findDpfLdFceRmatUseTot(String operFlag, String facOpCdN, String mtlNo,
			String mRmatSubRmatTp) {
		// TODO Auto-generated method stub
		Map<String, Object> param = new HashMap<>();
		param.put("operFlag", operFlag);
		param.put("facOpCdN", facOpCdN);
		param.put("mtlNo", mtlNo);
		param.put("mRmatSubRmatTp", mRmatSubRmatTp);
		List<SteelDpfLdFceRmatUseTotDto> results = sqlSessionTemplate
				.selectList("com.posco.mes3.m2drq0.bof.SteelDpfLdFceRmatUseTotVO", param);
		return results;
	}

	@Override
	public SteelLdStartTimeInfoDto findSteelLdStartTimeInfo(String mtlNo) {
		// TODO Auto-generated method stub
		Map<String, Object> param = new HashMap<>();
		param.put("mtlNo", mtlNo);
		SteelLdStartTimeInfoDto results = sqlSessionTemplate
				.selectOne("com.posco.mes3.m2drq0.bof.SteelLdStartTimeInfoVO", param);
		return results;
	}
}
