package com.posco.mes3.m2da01.domain.share;

import java.sql.Timestamp;

import com.posco.mes3.reuse.common.logging.PosLogWriterIF;
import com.posco.mes3.reuse.common.logging.PosLogger;
import com.poscoict.base.share.util.string.StringUtil;

public class LogUtils {

	/**
     * @MethodName(한글) Debug Message Logging
     * @desc Debug Message를 Logging하는 method이다.
     * @param msg Message
     * @param cls 발생 Class
     */
	public static void logDebug(String msg, Object cls) {
		log(PosLogWriterIF.DEBUG, null, msg, null, cls);
	}

	/**
     * @MethodName(한글) Debug Message Logging
     * @desc Debug Message를 Logging하는 method이다.
     * @param msg Message
     * @param ste 발생 Method
     * @param cls 발생 Class
     */
	public static void logDebug(String msg, StackTraceElement ste, Object cls) {
		log(PosLogWriterIF.DEBUG, msg, null, ste, cls);
	}

	/**
     * @MethodName(한글) Debug Message Logging
     * @desc Debug Message를 Logging하는 method이다.
     * @param msg1 Message1
     * @param msg2 Message2
     * @param ste 발생 Method
     * @param cls 발생 Class
     */
	public static void logDebug(String msg1, String msg2, StackTraceElement ste, Object cls) {
		log(PosLogWriterIF.DEBUG, msg1, msg2, ste, cls);
	}

	/**
     * @MethodName(한글) Info Message Logging
     * @desc Info Message를 Logging하는 method이다.
     * @param msg Message
     * @param cls 발생 Class
     */
	public static void logInfo(String msg, Object cls) {
		log(PosLogWriterIF.INFO, null, msg, null, cls);
	}

	/**
     * @MethodName(한글) Info Message Logging
     * @desc Info Message를 Logging하는 method이다.
     * @param msg Message
     * @param ste 발생 Method
     * @param cls 발생 Class
     */
	public static void logInfo(String msg, StackTraceElement ste, Object cls) {
		log(PosLogWriterIF.INFO, msg, null, ste, cls);
	}

	/**
     * @MethodName(한글) Info Message Logging
     * @desc Info Message를 Logging하는 method이다.
     * @param msg1 Message1
     * @param msg2 Message2
     * @param ste 발생 Method
     * @param cls 발생 Class
     */
	public static void logInfo(String msg1, String msg2, StackTraceElement ste, Object cls) {
		log(PosLogWriterIF.INFO, msg1, msg2, ste, cls);
	}

	/**
     * @MethodName(한글) Error Message Logging
     * @desc Error Message를 Logging하는 method이다.
     * @param msg Message
     * @param cls 발생 Class
     */
	public static void logError(String msg, Object cls) {
		log(PosLogWriterIF.ERROR, null, msg, null, cls);
	}

	/**
     * @MethodName(한글) Error Message Logging
     * @desc Error Message를 Logging하는 method이다.
     * @param msg1 Message1
     * @param msg2 Message2
     * @param ste 발생 Method
     * @param cls 발생 Class
     */
	public static void logError(String msg1, String msg2, StackTraceElement ste, Object cls) {
		log(PosLogWriterIF.ERROR, msg1, msg2, ste, cls);
	}

	/**
     * @MethodName(한글) EAI Send Message Logging
     * @desc EAI Send Message를 Logging하는 method이다.
     * @param msg Message
     * @param result 전송결과
     * @param data 전송 Message
     * @param ste 발생 Method
     * @param cls 발생 Class
     */
	public static void logEaiSendInfo(String msg, String result, String data, StackTraceElement ste, Object cls) {
		if (result.contains("FAIL")) {
			logError(msg + "::EAI Send Fail!!::" + result, data, ste, cls);
		} else {
			logInfo(msg + "::EAI Send Success!!::" + result, data, ste, cls);
		}
	}

	/**
     * @MethodName(한글) Event Send Message Logging
     * @desc Event Send Message를 Logging하는 method이다.
     * @param msg Message
     * @param result 전송결과
     * @param data 전송 Message
     * @param ste 발생 Method
     * @param cls 발생 Class
     */
	public static void logEventSendInfo(String msg, Boolean result, String data, StackTraceElement ste, Object cls) {
		if (result) {
			logInfo(msg + "::Event Send Success!!", data, ste, cls);
		} else {
			logError(msg + "::Event Send Fail!!", data, ste, cls);
		}
	}

	/**
     * @MethodName(한글) Message Logging
     * @desc Message를 Logging하는 method이다.
     * @param level LogLevel
     * @param msg1 Message1
     * @param msg2 Message2
     * @param ste 발생 Method
     * @param cls 발생 Class
     */
	public static void log(int level, String msg1, String msg2, StackTraceElement ste, Object cls) {
		String logMsg = "\n==>>==" + getMethodName(ste);
		if (StringUtil.isNotEmpty(msg1)) {
			logMsg += msg1;
		}
		if (StringUtil.isNotEmpty(msg2)) {
			logMsg += "\n-->>--" + msg2 + "\n";
		}
		PosLogger.developerLog(level, logMsg + "==<<==", cls);
	}

	/**
     * @MethodName(한글) Method명 반환
     * @desc 발생 Method명을 Return하는 method이다.
     * @param ste StackTraceElement
     * @return String Method명
     */
	private static String getMethodName(StackTraceElement ste) {
		String methodName = new Timestamp(System.currentTimeMillis()) + "::";
		if (ste != null) {
			String[] classNames = StringUtil.split(ste.getClassName(), ".");
			if (classNames.length > 3) {
				methodName += classNames[3] + "::";
				methodName += StringUtil.split(classNames[classNames.length - 1], "$")[0] + ".";
			}
			methodName += ste.getMethodName() + "::";
		}
		return methodName;
	}

}
