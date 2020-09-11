/*===================================================================================
 * @FileName : AgentEaiReceiverResource
 * Change history
 * @수정 날짜;SCR_NO;수정자;수정내용
 * @2019. 7. 28.;000000;jykim;최초생성
 *==================================================================================*/
package com.posco.mes3.m2db03.service.rest;

import java.util.Map;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.posco.mes3.m2db03.domain.lifecycle.ServiceLifecycle;
import com.posco.mes3.m2db03.domain.spec.composite.BAPArriveDepartCompositeService;
import com.posco.mes3.m2db03.domain.spec.composite.BAPStartEndCompositeService;
import com.posco.mes3.m2db03.domain.spec.composite.bapMinuteResult.BAPMinuteResultOpService;
import com.posco.mes3.m2db03.domain.spec.composite.bapModelResult.BAPModelResultOpService;
import com.posco.mes3.m2db03.domain.spec.composite.bapResult.BAPResultCompositeService;

/**
 * AgentEaiReceiverResource
 * @desc AgentEaiReceiverResource
 * @author jykim
 * @version 1.0
 */
@RestController
@RequestMapping(value = "/eai")
public class AgentEaiReceiverResource {

	private final BAPMinuteResultOpService bapMinuteResultOpService;
    private final BAPModelResultOpService bapModelResultOpService;
    private final BAPArriveDepartCompositeService bapArriveDepartCompositeService;
    private final BAPStartEndCompositeService bapStartEndCompositeService;
    private final BAPResultCompositeService bapResultCompositeService;

	/**
	 * AgentEaiReceiverResource 생성자
	 * @param serviceLifecycle
	 */
    public AgentEaiReceiverResource(ServiceLifecycle serviceLifecycle) {
		this.bapMinuteResultOpService = serviceLifecycle.requestBAPMinuteResultOpService();
		this.bapModelResultOpService = serviceLifecycle.requestBapModelResultOpService();
		this.bapArriveDepartCompositeService = serviceLifecycle.requestBAPArriveDepartCompositeService();
		this.bapStartEndCompositeService = serviceLifecycle.requestBAPStartEndCompositeService();
		 this.bapResultCompositeService = serviceLifecycle.requestBAPResultCompositeService();
    }
	
	/**
	 * @desc bapMinuteResult실적 처리
	 * @param data
	 * @return
	 */
	@PostMapping(value="/bapMinuteResult")
		public String receiveBapMinuteResultMessage(@RequestBody Map<String,Object> data) {
			return bapMinuteResultOpService.receiveMessage(data);
		}
	  
	/**
	 * @desc bapModelResult실적 처리
	 * @param data
	 * @return
	 */
	@PostMapping(value="/bapModelResult")
	   	public String receiveBapModelResultMessage(@RequestBody Map<String,Object> data) {
	    	return this.bapModelResultOpService.receiveMessage(data);
	    }
	/**
	 * @desc bapArriveDepart실적 처리
	 * @param data
	 * @return
	 */
	@PostMapping(value="/bapArriveDepart")
	   	public String receiveBapArriveDepartMessage(@RequestBody Map<String,Object> data) {
	    	return this.bapArriveDepartCompositeService.receiveMessage(data);
	    }
	/**
	 * @desc bapStartEnd실적 처리
	 * @param data
	 * @return
	 */
	@PostMapping(value="/bapStartEnd")
	   	public String receiveBapStartEndMessage(@RequestBody Map<String,Object> data) {
	    	return this.bapStartEndCompositeService.receiveMessage(data);
	    }
	/**
	 * @desc bapResult실적 처리
	 * @param data
	 * @return
	 */
	@PostMapping(value="/bapResult")
	public String receiveBAPResultMessage(@RequestBody Map<String, Object> data) {
		   return this.bapResultCompositeService.receiveMessage(data);
	}
}
