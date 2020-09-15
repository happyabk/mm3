
import React from 'react';
import { notification, Icon, message } from '@mes/mes-ui-react';

class NotificationUtil {
  /*
   * alertWarning function은 message1과 message2를 개행해서 Warning notification return 하는
   * 기능을 하는 function이다.
   * @param  message1 : 메세지ID
   * @param  message2 : 추가로 담을 메시지 배열
   */
  static alertWarning(message1, message2, message3) {
    let messageCont;

    if (message1 === '') {
      messageCont = message3;
    } else {
      messageCont = message(message1, message2);
    }
    return notification.error(
      () => (
        <div className="alarm">
          <Icon name="bell" />
          <p>{messageCont}</p>
        </div>
      ), { autoClose: 1000 }
    );
  } //경고 알람 메세지 메서드

  static alertSuccess(message1, message2, message3) {
    let messageCont;

    if (message1 === '') {
      messageCont = message3;
    } else {
      messageCont = message(message1, message2);
    }

    return notification.success(
      () => (
        <div className="alarm">
          <Icon name="bell" />
          <p>{messageCont}</p>
        </div>
      ), { autoClose: 3000 }
    );
  } //성공 알람 메세지 메서드

  static alertMessage(message1, message2, message3) {
    let messageCont;

    if (message1 === '') {
      messageCont = message3;
    } else {
      messageCont = message(message1, message2);
    }
    return alert(messageCont);
  }

  static alertConfirm(message1, message2, message3) {
    let messageCont;

    if (message1 === '') {
      messageCont = message3;
    } else {
      messageCont = message(message1, message2);
    }

    return confirm(messageCont);
  }
}

export default NotificationUtil;

export {
  NotificationUtil,
};
