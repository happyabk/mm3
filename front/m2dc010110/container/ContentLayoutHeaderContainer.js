/*==============================================================================================
* @화면ID(명): m2dc010110(출강Schedule조회 연관메뉴)
* Change history
* @2020-04-09;00000;최수지;최초생성
==============================================================================================*/
import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { mesAutobind } from '@mes/mes-shared';
import { ContentLayout } from '@mes/mes-ui-react';
import { PosM2DUtility } from '@/common';

@inject(
  'm2dc010110publicCodeStore',
)
@observer
@mesAutobind
class ContentLayoutHeaderContainer extends Component {
  render() {
    const {
      facOpCdN,
      mcNo,
      ldNo,
      mtlNo,
    } = this.props.m2dc010110publicCodeStore;
    const searchLink = {
      facOpCdN,
    };
    const searchLink2 = {
      mcNo,
      ldNo,
      mtlNo,
    };
    const { allUserInfo } = this.props;
    return (
      <ContentLayout.Header
        title={this.props.title}
        menuItems={[
          { ...PosM2DUtility.menuItemsLink(allUserInfo, 'm2dd010310', '제강진행Monitoring', searchLink) },
          facOpCdN[0] === '3' ?
            { ...PosM2DUtility.menuItemsLink(allUserInfo, 'n3ab060270', '제강성분실적', { facOpCdN: facOpCdN[0] }, 'n3ab06/n3ab060270') }
            :
            { ...PosM2DUtility.menuItemsLink(allUserInfo, 'n3ab060280', '제강성분실적', { facOpCdN: facOpCdN[0] }, 'n3ab06/n3ab060280') },
          { ...PosM2DUtility.menuItemsLink(allUserInfo, 'm2db070320', '수강래들준비', searchLink) },
          { ...PosM2DUtility.menuItemsLink(allUserInfo, 'm2dc010130', '출강지시주문', { ...searchLink, ...searchLink2 }) },
          { ...PosM2DUtility.menuItemsLink(allUserInfo, 'm2dc010140', '출강지시성분', { ...searchLink, ...searchLink2 }) },
          { ...PosM2DUtility.menuItemsLink(allUserInfo, 'm2dc010150', '조합성분지시', { ...searchLink, ...searchLink2 }) },
        ]}
      />
    );
  }
}
export default ContentLayoutHeaderContainer;
