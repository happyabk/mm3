
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class CustomTooltip extends PureComponent {
  static propTypes = {
    // type: PropTypes.string,
    payload: PropTypes.array,
    // label: PropTypes.string,
  };

  getIntroOfPage(label) {
    if (label === '1고로') {
      return this.props.iron.tooltip[0].실적;
    } else if (label === '2고로') {
      return this.props.iron.tooltip[1].실적;
    } else if (label === '3고로') {
      return this.props.iron.tooltip[2].실적;
    } else if (label === '4고로') {
      return this.props.iron.tooltip[3].실적;
    } else if (label === '2Finex') {
      return this.props.iron.tooltip[4].실적;
    } else if (label === '3Finex') {
      return this.props.iron.tooltip[5].실적;
    } else {
      return '';
    }
  }

  getIntroOfPage2(label) {
    if (label === '1고로') {
      return this.props.iron.tooltip[0].증감;
    } else if (label === '2고로') {
      return this.props.iron.tooltip[1].증감;
    } else if (label === '3고로') {
      return this.props.iron.tooltip[2].증감;
    } else if (label === '4고로') {
      return this.props.iron.tooltip[3].증감;
    } else if (label === '2Finex') {
      return this.props.iron.tooltip[4].증감;
    } else if (label === '3Finex') {
      return this.props.iron.tooltip[5].증감;
    } else {
      return '';
    }
  }

  render() {
    const { active } = this.props;

    if (active) {
      const { payload } = this.props;
      return (
        payload !== null ?
          <div className="custom-tooltip" style={{ border: '1px solid #ccc', backgroundColor: '#fff', padding: 10 }}>
            <p className="label">누계</p>
            <p className="desc">실적 : {this.getIntroOfPage(payload[0].payload.name)}</p>
            <p className="desc">증감 : {this.getIntroOfPage2(payload[0].payload.name)}</p>
          </div>
          : null
      );
    }

    return null;
  }
}

export default CustomTooltip;
