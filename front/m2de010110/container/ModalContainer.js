/*==============================================================================================
* @화면ID(명): m2de010110(제강연주생산계획등록)
* Change history
* @2020-04-21;00000;최수지;최초생성
==============================================================================================*/
import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { mesAutobind } from '@mes/mes-shared';
import {
  Modal,
  Header,
  Button,
  Input,
  ControlLine,
  Label,
  Segment,
} from '@mes/mes-ui-react';

import { PosM2DUtility } from '@/common';
import Form from '@resource/form/Excel_Import_Form_P.xls';
import FormK from '@resource/form/Excel_Import_Form_K.xls';

@inject('m2de010110Store')
@observer
@mesAutobind
class BodyContainer extends Component {

  ecmUrl = 'http://swpecm.posco.net:7091/ECM/ecm.redirect.jsp?'; //가동계 ECM 서버
  //ecmUrl = "http://uswpecm.posco.net:7091/ECM/ecm.redirect.jsp?";//테스트계 ECM 서버
  callbackURL = 'https://ma0a01-image.apps.dpmes.posco.co.kr/ecm/popup'; //배포 위치에 따라 변경 필요 tpmes,dpmes등

  state = {
    message: [],
  };

  componentDidMount() {
    window.onmessage = (e) => { // ecm에서 선택한 파일 정보
      const data = JSON.parse(decodeURIComponent(e.data).replace(/'/g, '"'));
      this.setState({
        message: data,
      });
    };
  }

  fileUpload = () => {
    const { message } = this.state;
    if (message.length > 0) {
      const { mpPlanDate, fileUpload } = this.props.m2de010110Store;
      const { onSearch } = this.props;

      const yyyy = mpPlanDate.substring(0, 4);
      const mm = mpPlanDate.substring(5, 7);
      const worksCode = this.state.worksCode;
      const operFlag = worksCode === 'P' ? 'C' : '3';
      const data = {
        docId: message[0].docid,
        objId: message[0].objid,
        fileName: message[0].filename,
        operFlag,
        yyyy,
        mm,
      };
      fileUpload({ data });
      onSearch();
      this.onClose();
    }
  };

  onClose() {
    this.props.m2de010110Store.setModel({ open: false });
    this.setState({ message: []});
  }

  onEcm(e) {
    if (this.state.message[e.target.id].objid) {
      PosM2DUtility.attachFile('M22', 'viewlink', '', this.state.message[e.target.id].objid);
    }
  }

  render() {
    const { message } = this.state;
    const { constantsCodes } = this.props;
    const { modal } = this.props.m2de010110Store;
    // const redStyle = { color: 'red' };

    return (
      <React.Fragment>
        <Modal
          open={modal.open}
          onClose={this.onClose}
          closeIcon
          size="tiny"
          draggable
          modaless = {false}
        >
          <Modal.Header content="제강연주생산계획등록 Excel Import" />
          <Modal.Content>
            <Modal.Description>
              <div
                style={{
                  border: '1px solid #dcdcdc',
                  padding: '2px',
                }}
              >
                <ControlLine
                  leftItems={[
                    <React.Fragment>
                      {message.length > 0 ?
                        <div className="badge-group">
                          {message.map((data, i) => (
                            <Label key={i} style={{ cursor: 'pointer' }}>
                              <Label type="textarea" onClick={this.onEcm} id={i}>{data.filename}</Label>
                            </Label>
                          ))
                          }
                        </div>

                        : <div className="grey">Import할 파일을 선택하세요.</div>}
                    </React.Fragment>,

                  ]}
                  rightItems={[
                    <React.Fragment>
                      <Button size="large" content="ECM열기" onClick={() => { PosM2DUtility.attachFile('test_doc_id_m', 'regist', '', '', 'ecm_popup'); }} />
                    </React.Fragment>,
                  ]}
                />
              </div>

              <div>
                <a
                  onClick={(e) => e.target.href = constantsCodes.operFlag === 'C' ? Form : FormK}
                  download={constantsCodes.operFlag === 'C' ? Form.saveAsFileName : FormK.saveAsFileName}
                >Import Application
                </a>
              </div>

              <div>
                <Label>※ IMPORT시 유의사항</Label>
                <div>
                  &nbsp;&nbsp;1)Import하시려면 양식을 먼저 다운로드받아 사용해 주십시오.
                  <br />
                  &nbsp;&nbsp;2)Import 하는 양식은 Import Application 링크 클릭하시면 다운받을수 있습니다.
                  <br />
                  &nbsp;&nbsp;3)1제강,2제강,1연주,2연주 데이타가 동시에 등록됩니다.
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;단, 등록을 원하지 않는 공장데이타는 입력하지 않으면 됩니다.
                  <br />
                  &nbsp;&nbsp;4)Import Excel 입력데이타 변경후[ Excel 파일 반드시 저장후 ] Import 하세요.
                  <br />
                  &nbsp;&nbsp;5)Import Excel 셀서식을 일반으로 지정해주세요.(이상한 값이 들어갈수 있습니다.)
                </div>
              </div>

            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            <Button
              color="grey"
              size="large"
              content="Import"
              onClick={this.fileUpload}
            />
            <Button size="large" content="닫기" onClick={this.onClose} />
          </Modal.Actions>
          <Modal.Actions>

          </Modal.Actions>
        </Modal>
      </React.Fragment>
    );
  }
}
export default BodyContainer;
