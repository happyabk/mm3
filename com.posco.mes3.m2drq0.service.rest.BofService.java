
package com.posco.mes3.m2drq0.service.rest;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
import com.posco.mes3.m2drq0.domain.lifecycle.ServiceLifecycle;
import com.posco.mes3.m2drq0.domain.spec.bof.BofService;

/**
 * BofResource.java -- 기능을 제공하는 클래스이다.
 *
 * @author m2drq0
 * @version 1.0.0
 * @since 2019. 9. 17.
 */
@RestController
@RequestMapping(value = "/bof")
public class BofResource {
	//
	private BofService bofService;

	/**
	 * BofResource
	 *
	 * @param serviceLifecycle
	 */
	public BofResource(ServiceLifecycle serviceLifecycle) {
		//
		this.bofService = serviceLifecycle.requestBofService();
	}

	/**
	 * Test
	 *
	 * @param mtlNo
	 * @return List
	 */
	@GetMapping("/SteelSmRmatThwUseRst/{mtlNo}/{smRmatThwTmTpCd}/{mratSubRmatTp}")
	public List<SteelSmRmatThwUseRstDto> findSteelSmRmatThwUseRst(@PathVariable String mtlNo,
			@PathVariable String smRmatThwTmTpCd, @PathVariable String mratSubRmatTp) {

		if (smRmatThwTmTpCd.equals("total"))
			smRmatThwTmTpCd = "%";

		if (mratSubRmatTp.equals("total"))
			mratSubRmatTp = "%";

		return this.bofService.findSteelSmRmatThwUseRst(mtlNo, smRmatThwTmTpCd, mratSubRmatTp);
	}

	/**
	 * Test
	 *
	 * @param mtlNo
	 * @return List
	 */
	@GetMapping("/SteelSmRmatThwUseRstTotal/{mtlNo}/{smRmatThwTmTpCd}/{mratSubRmatTp}")
	public List<SteelSmRmatThwUseRstTotalDto> findSteelSmRmatThwUseRstTotal(@PathVariable("mtlNo") String mtlNo,
			@PathVariable("smRmatThwTmTpCd") String smRmatThwTmTpCd,
			@PathVariable("mratSubRmatTp") String mratSubRmatTp) {

		if (smRmatThwTmTpCd.equals("total"))
			smRmatThwTmTpCd = "%";

		if (mratSubRmatTp.equals("total"))
			mratSubRmatTp = "%";

		return this.bofService.findSteelSmRmatThwUseRstTotal(mtlNo, smRmatThwTmTpCd, mratSubRmatTp);
	}

	/**
	 * 
	 *
	 * @param mtlNo
	 * @return
	 */
	@GetMapping("/SteelLdFceHotBlastStoveResult/{operFlag}/{facOpCdN}/{mtlNo}")
	public SteelLdFceHotBlastStoveResultDto findSteelLdFceHotBlastStoveResult(@PathVariable("operFlag") String operFlag,
			@PathVariable("facOpCdN") String facOpCdN, @PathVariable("mtlNo") String mtlNo) {
		return this.bofService.findSteelLdFceHotBlastStoveResult(operFlag, facOpCdN, mtlNo);
	}

	/**
	 * 
	 *
	 * @param mtlNo
	 * @return
	 */
	@GetMapping("/SteelLdFceLowBlowResults/{operFlag}/{facOpCdN}/{mtlNo}")
	public List<SteelLdFceLowBlowResultsDto> findSteelLdFceLowBlowResults(@PathVariable("operFlag") String operFlag,
			@PathVariable("facOpCdN") String facOpCdN, @PathVariable("mtlNo") String mtlNo) {

		return this.bofService.findSteelLdFceLowBlowResults(operFlag, facOpCdN, mtlNo);
	}

	@GetMapping("/SteelRmatPumSteelInfo/{operFlag}/{facOpCdN}/{rmatManItemDescCdN}")
	public SteelRmatPumSteelDto findSteelRmatPumSteelInfo(@PathVariable(value = "operFlag") String operFlag,
			@PathVariable(value = "facOpCdN") String facOpCdN,
			@PathVariable(value = "rmatManItemDescCdN") String rmatManItemDescCdN) {

		return this.bofService.findSteelRmatPumSteelInfo(operFlag, facOpCdN, rmatManItemDescCdN);
	}

	@GetMapping("/SteelRmatPumSteelInfoList/{operFlag}/{facOpCdN}")
	public List<SteelRmatPumSteelDto> findSteelRmatPumSteelInfoList(@PathVariable(value = "operFlag") String operFlag,
			@PathVariable(value = "facOpCdN") String facOpCdN) {

		return this.bofService.findSteelRmatPumSteelInfoList(operFlag, facOpCdN);
	}

	@GetMapping("/SteelLdFceBlwHeader/{operFlag}/{facOpCdN}/{mtlNo}")
	public SteelLdFceBlwHeaderDto findLdFceBlwHeader(@PathVariable("operFlag") String operFlag,
			@PathVariable("facOpCdN") String facOpCdN, @PathVariable("mtlNo") String mtlNo) {

		return this.bofService.findLdFceBlwHeader(operFlag, facOpCdN, mtlNo);
	}

	@GetMapping("/SteelLdFceRmatUseHeader/{operFlag}/{facOpCdN}/{mtlNo}")
	public SteelLdFceRmatUseHeaderDto findLdFceRmatUseHeader(@PathVariable("operFlag") String operFlag,
			@PathVariable("facOpCdN") String facOpCdN, @PathVariable("mtlNo") String mtlNo) {

		return this.bofService.findLdFceRmatUseHeader(operFlag, facOpCdN, mtlNo);
	}

	@GetMapping("/SteelLdFceRmatUse/{operFlag}/{facOpCdN}/{mtlNo}/{ldFceBlwPurTp}/{mRmatSubRmatTp}")
	public List<SteelLdFceRmatUseDto> findLdFceRmatUse(@PathVariable("operFlag") String operFlag,
			@PathVariable("facOpCdN") String facOpCdN, @PathVariable("mtlNo") String mtlNo,
			@PathVariable("ldFceBlwPurTp") String ldFceBlwPurTp,
			@PathVariable("mRmatSubRmatTp") String mRmatSubRmatTp) {

		return this.bofService.findLdFceRmatUse(operFlag, facOpCdN, mtlNo, ldFceBlwPurTp, mRmatSubRmatTp);
	}

	@GetMapping("/SteelLdFceRmatUseTot/{operFlag}/{facOpCdN}/{mtlNo}/{ldFceBlwPurTp}/{mRmatSubRmatTp}")
	public List<SteelLdFceRmatUseTotDto> findLdFceRmatUseTot(@PathVariable("operFlag") String operFlag,
			@PathVariable("facOpCdN") String facOpCdN, @PathVariable("mtlNo") String mtlNo,
			@PathVariable("ldFceBlwPurTp") String ldFceBlwPurTp,
			@PathVariable("mRmatSubRmatTp") String mRmatSubRmatTp) {

		return this.bofService.findLdFceRmatUseTot(operFlag, facOpCdN, mtlNo, ldFceBlwPurTp, mRmatSubRmatTp);
	}

	@GetMapping("/SteelUIPumSteel/{worksCode}/{facOpCdN}/{mRmatSubRmatTp}")
	public List<SteelUIPumSteelDto> findSteelUIPumSteel(@PathVariable("worksCode") String worksCode,
			@PathVariable("facOpCdN") String facOpCdN, @PathVariable("mRmatSubRmatTp") String mRmatSubRmatTp) {
		return this.bofService.findSteelUIPumSteel(worksCode, facOpCdN, mRmatSubRmatTp);
	}

	@GetMapping("/SteelLdFceProcess/{operFlag}/{facOpCdN}/{mtlNo}")
	public List<SteelLdFceProcessDto> findSteelLdFceProcess(@PathVariable("operFlag") String operFlag,
			@PathVariable("facOpCdN") String facOpCdN, @PathVariable("mtlNo") String mtlNo) {
		// TODO Auto-generated method stub
		return this.bofService.findSteelLdFceProcess(operFlag, facOpCdN, mtlNo);
	}

	@GetMapping("/SteelLdFceProcessHeader/{operFlag}/{facOpCdN}/{mtlNo}")
	public List<SteelLdFceProcessHeaderDto> findSteelLdFceProcessHeader(@PathVariable("operFlag") String operFlag,
			@PathVariable("facOpCdN") String facOpCdN, @PathVariable("mtlNo") String mtlNo) {
		// TODO Auto-generated method stub
		return this.bofService.findSteelLdFceProcessHeader(operFlag, facOpCdN, mtlNo);
	}

	@GetMapping("/SteelMeltedIronHeader/{operFlag}/{facOpCdN}/{mtlNo}")
	public SteelMeltedIronHeaderDto findSteelMeltedIronHeader(@PathVariable("operFlag") String operFlag,
			@PathVariable("facOpCdN") String facOpCdN, @PathVariable("mtlNo") String mtlNo) {
		return this.bofService.findSteelMeltedIronHeader(operFlag, facOpCdN, mtlNo);
	}

	@GetMapping("/SteelPrpChargeNo/{operFlag}/{facOpCdN}/{mtlNo}")
	public List<SteelPrpChargeNoDto> findSteelPrpChargeNo(@PathVariable("operFlag") String operFlag,
			@PathVariable("facOpCdN") String facOpCdN, @PathVariable("mtlNo") String mtlNo) {
		return this.bofService.findSteelPrpChargeNo(operFlag, facOpCdN, mtlNo);
	}

	@GetMapping("/SteelLdFceDpBlwHeader/{operFlag}/{facOpCdN}/{mtlNo}")
	public SteelLdFceDpBlwHeaderDto findSteelLdFceDpBlwHeader(@PathVariable("operFlag") String operFlag,
			@PathVariable("facOpCdN") String facOpCdN, @PathVariable("mtlNo") String mtlNo) {
		return this.bofService.findSteelLdFceDpBlwHeader(operFlag, facOpCdN, mtlNo);
	}

	@GetMapping("/SteelDpFceProc/{operFlag}/{facOpCdN}/{mtlNo}")
	public SteelDpFceProcDto findSteelDpFceProc(@PathVariable("operFlag") String operFlag,
			@PathVariable("facOpCdN") String facOpCdN, @PathVariable("mtlNo") String mtlNo) {
		return this.bofService.findSteelDpFceProc(operFlag, facOpCdN, mtlNo);
	}

	@GetMapping("/SteelLdFceDpProcessHeader/{operFlag}/{facOpCdN}/{mtlNo}")
	public SteelLdFceDpProcessHeaderDto findSteelLdFceDpProcessHeader(@PathVariable("operFlag") String operFlag,
			@PathVariable("facOpCdN") String facOpCdN, @PathVariable("mtlNo") String mtlNo) {
		return this.bofService.findSteelLdFceDpProcessHeader(operFlag, facOpCdN, mtlNo);
	}

	@GetMapping("/SteelLdFceDpProcess/{operFlag}/{facOpCdN}/{mtlNo}")
	public SteelLdFceDpProcessDto findSteelLdFceDpProcess(@PathVariable("operFlag") String operFlag,
			@PathVariable("facOpCdN") String facOpCdN, @PathVariable("mtlNo") String mtlNo) {
		return this.bofService.findSteelLdFceDpProcess(operFlag, facOpCdN, mtlNo);
	}

	@GetMapping("/SteelLdFceDpRmatUseHeader/{operFlag}/{facOpCdN}/{mtlNo}")
	public SteelLdFceDpRmatUseHeaderDto findSteelLdFceDpRmatUseHeader(@PathVariable("operFlag") String operFlag,
			@PathVariable("facOpCdN") String facOpCdN, @PathVariable("mtlNo") String mtlNo) {
		return this.bofService.findSteelLdFceDpRmatUseHeader(operFlag, facOpCdN, mtlNo);
	}

	@GetMapping("/SteelBofLatestMtlNo/{worksCode}/{operFlag}/{facOpCdN}/{type}")
	public List<SteelBofLatestMtlNoDto> findSteelBofLatestMtlNoByType(
			@PathVariable(value = "worksCode") String worksCode, @PathVariable(value = "operFlag") String operFlag,
			@PathVariable(value = "facOpCdN") String facOpCdN, @PathVariable(value = "type") String type) {
		// TODO Auto-generated method stub
		return this.bofService.findSteelBofLatestMtlNoByType(worksCode, operFlag, facOpCdN, type);
	}

	@GetMapping("/SteelPlanChargeNo/{operFlag}/{facOpCdN}")
	public List<SteelPlanChargeNoDto> findSteelPlanChargeNo(@PathVariable(value = "operFlag") String operFlag,
			@PathVariable(value = "facOpCdN") String facOpCdN) {
		// TODO Auto-generated method stub
		return this.bofService.findSteelPlanChargeNo(operFlag, facOpCdN);
	}

	@GetMapping("/SteelReturnChargeNo/{operFlag}/{facOpCdN}")
	public List<SteelReturnChargeNoDto> findSteelReturnChargeNo(@PathVariable(value = "operFlag") String operFlag,
			@PathVariable(value = "facOpCdN") String facOpCdN) {
		// TODO Auto-generated method stub
		return this.bofService.findSteelReturnChargeNo(operFlag, facOpCdN);
	}

	@GetMapping("/SteelLdRstPerMinuteData/{mtlNo}")
	public List<SteelLdRstPerMinuteDataDto> findSteelLdRstPerMinuteData(@PathVariable(value = "mtlNo") String mtlNo) {
		// TODO Auto-generated method stub
		return this.bofService.findSteelLdRstPerMinuteData(mtlNo);
	}

	@GetMapping("/SteelEbbBSMessage/{mtlNo}")
	public SteelEbbBSMessageDto findSteelEbbBSMessage(@PathVariable(value = "mtlNo") String mtlNo) {
		// TODO Auto-generated method stub
		return this.bofService.findSteelEbbBSMessage(mtlNo);
	}

	@GetMapping("/SteelSmDpfWorkTimeInfo/{mtlNo}")
	public SteelSmDpfWorkTimeInfoDto findSteelSmDpfWorkTimeInfo(@PathVariable(value = "mtlNo") String mtlNo) {
		// TODO Auto-generated method stub
		return this.bofService.findSteelSmDpfWorkTimeInfo(mtlNo);
	}

	@GetMapping("/SteelPrpChargeNoBackup/{operFlag}/{facOpCdN}/{mtlNo}")
	public List<SteelPrpChargeNoBackupDto> findSteelPrpChargeNoBackupDto(@PathVariable("operFlag") String operFlag,
			@PathVariable("facOpCdN") String facOpCdN, @PathVariable("mtlNo") String mtlNo) {
		return this.bofService.findSteelPrpChargeNoBackupDto(operFlag, facOpCdN, mtlNo);
	}

	@GetMapping("/SteelDPFHistoryResult/{mtlNo}")
	public SteelDPFHistoryResultDto findSteelDPFHistoryResult(@PathVariable(value = "mtlNo") String mtlNo) {
		// TODO Auto-generated method stub
		return this.bofService.findSteelDPFHistoryResult(mtlNo);
	}

	@GetMapping("/SteelBOFHistoryResult/{mtlNo}")
	public SteelBOFHistoryResultDto findSteelBOFHistoryResult(@PathVariable(value = "mtlNo") String mtlNo) {
		// TODO Auto-generated method stub
		return this.bofService.findSteelBOFHistoryResult(mtlNo);
	}

	@GetMapping("/SteelDpfLdFceRmatUse/{operFlag}/{facOpCdN}/{mtlNo}/{mRmatSubRmatTp}")
	public List<SteelDpfLdFceRmatUseDto> findLdFceRmatUse(@PathVariable("operFlag") String operFlag,
			@PathVariable("facOpCdN") String facOpCdN, @PathVariable("mtlNo") String mtlNo,
			@PathVariable("mRmatSubRmatTp") String mRmatSubRmatTp) {

		return this.bofService.findDpfLdFceRmatUse(operFlag, facOpCdN, mtlNo, mRmatSubRmatTp);
	}

	@GetMapping("/SteelDpfLdFceRmatUseTot/{operFlag}/{facOpCdN}/{mtlNo}/{mRmatSubRmatTp}")
	public List<SteelDpfLdFceRmatUseTotDto> findLdFceRmatUseTot(@PathVariable("operFlag") String operFlag,
			@PathVariable("facOpCdN") String facOpCdN, @PathVariable("mtlNo") String mtlNo,
			@PathVariable("mRmatSubRmatTp") String mRmatSubRmatTp) {

		return this.bofService.findDpfLdFceRmatUseTot(operFlag, facOpCdN, mtlNo, mRmatSubRmatTp);
	}
	
	@GetMapping("/SteelLdStartTimeInfo/{mtlNo}")
	public SteelLdStartTimeInfoDto findSteelLdStartTimeInfo(@PathVariable(value = "mtlNo") String mtlNo) {
		// TODO Auto-generated method stub
		return this.bofService.findSteelLdStartTimeInfo(mtlNo);
	}
}
