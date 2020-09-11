package com.posco.mes3.m2db03.domain.spec.composite.bapResult;

import java.util.Map;

import com.posco.mes3.m2db03.domain.spec.entity.bapResult.BAPResultHistoryService;
import com.posco.mes3.m2db03.domain.spec.entity.bapResult.BAPResultService;
import com.posco.mes3.m2db03.domain.spec.reuse.MasterDataService;

public interface BAPResultCompositeService {
	public String receiveMessage(Map<String,Object> data);

	public void setBAPResultService(BAPResultService bapResultService);

	public void setMasterDataService(MasterDataService masterDataService);

	public void setBapResultHistoryService(BAPResultHistoryService bapResultHistoryService);
}
