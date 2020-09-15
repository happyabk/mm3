
import React, { PureComponent, Fragment } from 'react';
import { Popup } from '@mes/mes-ui-react';
import { observer } from 'mobx-react';
import { mesAutobind } from '@mes/mes-shared';
import SteelScheduleMonitoringTooltipView from './SteelScheduleMonitoringTooltipView';

@mesAutobind
@observer
class SteelScheduleMonitoringLabelView extends PureComponent {

  render() {

    const {
      x,
      width,
      typeColor,
      text,
      mtlNo,
      prpChargeNo,
      planChargeNo,
      smSteelGrdN,
      mcNo,
      tt,
      operStartTime,
      operEndTime,
      datas,
      operFlag,
    } = this.props;

    return (
      <Fragment>
        <Popup
          hoverable
          trigger={
            <span
              style={{ left: x, width, backgroundColor: typeColor, border: datas.isLast === 'Y' ? '1px solid red' : null }}
              className="__label-box label"
              onMouseOver={() => {
                const labels = document.getElementsByClassName('label');
                for (let i = 0; i < labels.length; i++) {
                  labels[i].style.opacity = 0.2;
                }
                const labels2 = document.getElementsByClassName(mtlNo);
                for (let i = 0; i < labels2.length; i++) {
                  labels2[i].className =  `${mtlNo} blinkerStyle`;
                  labels2[i].parentNode.style.opacity = '';
                }
              }}
              onMouseOut={() => {
                const labels = document.getElementsByClassName('label');
                for (let i = 0; i < labels.length; i++) {
                  labels[i].style.opacity = '';
                }
                const labels2 = document.getElementsByClassName(mtlNo);
                for (let i = 0; i < labels2.length; i++) {
                  labels2[i].className =  `${mtlNo}`;
                  labels2[i].parentNode.style.backgroundColor = typeColor;
                }
              }}
            >
              <span className={`${mtlNo}`}>{text}</span>
            </span>
          }
          position="bottom center"
          hideOnScroll
          popperModifiers={{
            preventOverflow: {
              boundariesElement: 'offsetParent',
            },
          }}
        >
          <SteelScheduleMonitoringTooltipView
            datas={datas}
            operFlag={operFlag}
            mtlNo={mtlNo}
            prpChargeNo={prpChargeNo}
            planChargeNo={planChargeNo}
            smSteelGrdN={smSteelGrdN}
            mcNo={mcNo}
            tt={tt}
            operStartTime={operStartTime}
            operEndTime={operEndTime}
          />
        </Popup>
      </Fragment>
    );
  }
}

export default SteelScheduleMonitoringLabelView;
