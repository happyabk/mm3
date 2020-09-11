
package com.posco.mes3.m2drq0.domain.logic.bof;

import java.util.List;

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
import com.posco.mes3.m2drq0.domain.lifecycle.StoreLifecycle;
import com.posco.mes3.m2drq0.domain.spec.bof.BofService;
import com.posco.mes3.m2drq0.domain.store.bof.BofStore;

import lombok.NoArgsConstructor;
/**
 * Bof
 *
 * @author wy.seo
 * @version 1.0
 */
@NoArgsConstructor
public class BofLogic implements BofService {
	//
	private BofStore bofStore;
	/**
	 * Bof
	 *
	 * @param storeLifecycle
	 */
	public BofLogic(StoreLifecycle storeLifecycle) {
		this.bofStore = storeLifecycle.requestBofStore();
	}
	
	/**
	 * Test
	 *
	 * @param mtlNo
	 * @return List
	 */
	@Override
	public List<SteelSmRmatThwUseRstDto> findSteelSmRmatThwUseRst(String mtlNo,String smRmatThwTmTpCd,String mratSubRmatTp) {
		//
		return bofStore.findSteelSmRmatThwUseRst(mtlNo, smRmatThwTmTpCd, mratSubRmatTp);
	}

	@Override
	public List<SteelSmRmatThwUseRstTotalDto> findSteelSmRmatThwUseRstTotal(String mtlNo, String smRmatThwTmTpCd,
			String mratSubRmatTp) {
		// TODO Auto-generated method stub
		return bofStore.findSteelSmRmatThwUseRstTotal(mtlNo, smRmatThwTmTpCd, mratSubRmatTp);
	}
	
	@Override
	public SteelLdFceHotBlastStoveResultDto findSteelLdFceHotBlastStoveResult(String operFlag, String facOpCdN,
			String mtlNo) {
		// TODO Auto-generated method stub
		return bofStore.findSteelLdFceHotBlastStoveResult(operFlag, facOpCdN, mtlNo);
	}

	@Override
	public List<SteelLdFceLowBlowResultsDto> findSteelLdFceLowBlowResults(String operFlag, String facOpCdN,
			String mtlNo) {
		// TODO Auto-generated method stub
		return bofStore.findSteelLdFceLowBlowResults(operFlag, facOpCdN, mtlNo);
	}

	@Override
	public SteelRmatPumSteelDto findSteelRmatPumSteelInfo(String operFlag,String facOpCdN,String rmatManItemDescCdN){
		// TODO Auto-generated method stub
		return bofStore.findSteelRmatPumSteelInfo(operFlag, facOpCdN,rmatManItemDescCdN);
	}

	@Override
	public List<SteelRmatPumSteelDto> findSteelRmatPumSteelInfoList(String operFlag,String facOpCdN){
		// 
		return bofStore.findSteelRmatPumSteelInfoList(operFlag, facOpCdN);
	}

	@Override
	public SteelLdFceBlwHeaderDto findLdFceBlwHeader(String operFlag, String facOpCdN, String mtlNo) {
		// TODO Auto-generated method stub
		return bofStore.findLdFceBlwHeader(operFlag, facOpCdN,mtlNo);
	}

	@Override
	public SteelLdFceRmatUseHeaderDto findLdFceRmatUseHeader(String operFlag, String facOpCdN, String mtlNo) {
		// TODO Auto-generated method stub
		return bofStore.findLdFceRmatUseHeader(operFlag, facOpCdN, mtlNo);
	}

	@Override
	public List<SteelLdFceRmatUseDto> findLdFceRmatUse(String operFlag, String facOpCdN, String mtlNo,
			String ldFceBlwPurTp, String mRmatSubRmatTp) {
		// TODO Auto-generated method stub
		return bofStore.findLdFceRmatUse(operFlag, facOpCdN, mtlNo, ldFceBlwPurTp, mRmatSubRmatTp);
	}

	@Override
	public List<SteelLdFceRmatUseTotDto> findLdFceRmatUseTot(String operFlag, String facOpCdN, String mtlNo,
			String ldFceBlwPurTp, String mRmatSubRmatTp) {
		// TODO Auto-generated method stub
		return bofStore.findLdFceRmatUseTot(operFlag, facOpCdN, mtlNo, ldFceBlwPurTp, mRmatSubRmatTp);
	}

	@Override
	public List<SteelUIPumSteelDto> findSteelUIPumSteel(String worksCode, String facOpCdN, String mRmatSubRmatTp) {
		// TODO Auto-generated method stub
		return bofStore.findSteelUIPumSteel(worksCode, facOpCdN, mRmatSubRmatTp);
	}

	@Override
	public List<SteelLdFceProcessDto> findSteelLdFceProcess(String operFlag, String facOpCdN, String mtlNo) {
		// TODO Auto-generated method stub
		return bofStore.findSteelLdFceProcess(operFlag, facOpCdN, mtlNo);
	}

	@Override
	public List<SteelLdFceProcessHeaderDto> findSteelLdFceProcessHeader(String operFlag, String facOpCdN,
			String mtlNo) {
		// TODO Auto-generated method stub
		return bofStore.findSteelLdFceProcessHeader(operFlag, facOpCdN, mtlNo);
	}

	@Override
	public SteelMeltedIronHeaderDto findSteelMeltedIronHeader(String operFlag, String facOpCdN, String mtlNo) {
		// TODO Auto-generated method stub
		return bofStore.findSteelMeltedIronHeader(operFlag, facOpCdN, mtlNo);
	}

	@Override
	public List<SteelPrpChargeNoDto> findSteelPrpChargeNo(String operFlag, String facOpCdN,String mtlNo) {
		// TODO Auto-generated method stub
		return bofStore.findSteelPrpChargeNo(operFlag, facOpCdN,mtlNo);
	}

	@Override
	public SteelLdFceDpBlwHeaderDto findSteelLdFceDpBlwHeader(String operFlag, String facOpCdN, String mtlNo) {
		// TODO Auto-generated method stub
		return bofStore.findSteelLdFceDpBlwHeader(operFlag, facOpCdN, mtlNo);
	}

	@Override
	public SteelDpFceProcDto findSteelDpFceProc(String operFlag, String facOpCdN, String mtlNo) {
		// TODO Auto-generated method stub
		return bofStore.findSteelDpFceProc(operFlag, facOpCdN, mtlNo);
	}

	@Override
	public SteelLdFceDpProcessHeaderDto findSteelLdFceDpProcessHeader(String operFlag, String facOpCdN, String mtlNo) {
		// TODO Auto-generated method stub
		return bofStore.findSteelLdFceDpProcessHeader(operFlag, facOpCdN, mtlNo);
	}

	@Override
	public SteelLdFceDpProcessDto findSteelLdFceDpProcess(String operFlag, String facOpCdN, String mtlNo) {
		// TODO Auto-generated method stub
		return bofStore.findSteelLdFceDpProcess(operFlag, facOpCdN, mtlNo);
	}

	@Override
	public SteelLdFceDpRmatUseHeaderDto findSteelLdFceDpRmatUseHeader(String operFlag, String facOpCdN, String mtlNo) {
		// TODO Auto-generated method stub
		return bofStore.findSteelLdFceDpRmatUseHeader(operFlag, facOpCdN, mtlNo);
	}

	@Override
	public List<SteelBofLatestMtlNoDto> findSteelBofLatestMtlNoByType(String worksCode, String operFlag, String facOpCdN, String type) {
		// TODO Auto-generated method stub
		return bofStore.findSteelBofLatestMtlNoByType(worksCode, operFlag, facOpCdN, type);
	}

	@Override
	public List<SteelPlanChargeNoDto> findSteelPlanChargeNo(String operFlag, String facOpCdN) {
		// TODO Auto-generated method stub
		return bofStore.findSteelPlanChargeNo(operFlag, facOpCdN);
	}

	@Override
	public List<SteelReturnChargeNoDto> findSteelReturnChargeNo(String operFlag, String facOpCdN) {
		// TODO Auto-generated method stub
		return bofStore.findSteelReturnChargeNo(operFlag, facOpCdN);
	}

	@Override
	public List<SteelLdRstPerMinuteDataDto> findSteelLdRstPerMinuteData(String mtlNo) {
		// TODO Auto-generated method stub
		return bofStore.findSteelLdRstPerMinuteData(mtlNo);
	}

	@Override
	public SteelEbbBSMessageDto findSteelEbbBSMessage(String mtlNo) {
		// TODO Auto-generated method stub
		return bofStore.findSteelEbbBSMessage(mtlNo);
	}

	@Override
	public SteelSmDpfWorkTimeInfoDto findSteelSmDpfWorkTimeInfo(String mtlNo) {
		// TODO Auto-generated method stub
		return bofStore.findSteelSmDpfWorkTimeInfo(mtlNo);
	}

	@Override
	public List<SteelPrpChargeNoBackupDto> findSteelPrpChargeNoBackupDto(String operFlag, String facOpCdN,
			String mtlNo) {
		// TODO Auto-generated method stub
		return bofStore.findSteelPrpChargeNoBackupDto(operFlag, facOpCdN, mtlNo);
	}

	@Override
	public SteelDPFHistoryResultDto findSteelDPFHistoryResult(String mtlNo) {
		// TODO Auto-generated method stub
		return bofStore.findSteelDPFHistoryResult(mtlNo);
	}

	@Override
	public SteelBOFHistoryResultDto findSteelBOFHistoryResult(String mtlNo) {
		// TODO Auto-generated method stub
		return bofStore.findSteelBOFHistoryResult(mtlNo);
	}

	@Override
	public List<SteelDpfLdFceRmatUseDto> findDpfLdFceRmatUse(String operFlag, String facOpCdN, String mtlNo,
			String mRmatSubRmatTp) {
		// TODO Auto-generated method stub
		return bofStore.findDpfLdFceRmatUse(operFlag, facOpCdN, mtlNo, mRmatSubRmatTp);
	}

	@Override
	public List<SteelDpfLdFceRmatUseTotDto> findDpfLdFceRmatUseTot(String operFlag, String facOpCdN, String mtlNo,
			String mRmatSubRmatTp) {
		// TODO Auto-generated method stub
		return bofStore.findDpfLdFceRmatUseTot(operFlag, facOpCdN, mtlNo, mRmatSubRmatTp);
	}

	@Override
	public SteelLdStartTimeInfoDto findSteelLdStartTimeInfo(String mtlNo) {
		// TODO Auto-generated method stub
		return bofStore.findSteelLdStartTimeInfo(mtlNo);
	}
}
