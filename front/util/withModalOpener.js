import React, { Component, Fragment } from 'react';
import { Button } from '@mes/mes-ui-react';

const withModalOpener = (btnName = '팝업오픈') => WrapperComponent => {
  class ModalTrigger extends Component {
    state = {
      open: false,
    };

    onClick = () => {
      const setData = {
        open: true,
      };
      this.setState(() => setData);
    };

    onClose = () => {
      const setData = {
        open: false,
      };
      this.setState(() => setData);
    };

    render() {
      return (
        <Fragment>
          <Button className="for-puppeteer" onClick={this.onClick}>{btnName}</Button>
          <WrapperComponent
            {...this.props}
            onClose={this.onClose}
            open={this.state.open}
          />
        </Fragment>
      );
    }
  }
  return ModalTrigger;
};


export default withModalOpener;
