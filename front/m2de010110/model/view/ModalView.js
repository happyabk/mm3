import React, { Component } from 'react';
import { Modal, Button, Header, Grid, Icon } from '@mes/mes-ui-react';

class ExcelPopupView extends Component {
    state = {
      open: false,
    };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleTempSave = () => {
    //console.log('tempSave');
  };

  handleSave = () => {
    // console.log('save');
  };

  render() {
    //
    return (
      <Modal
        trigger={<Button content="show Modal" onClick={this.handleOpen} />}
        onClose={this.handleClose}
        open={this.state.open}
      >
        <Modal.Header>
          <Grid columns="equal">
            <Grid.Column>
              <Icon name="archive" /> Custom
            </Grid.Column>
          </Grid>
        </Modal.Header>

        <Modal.Content image>
          <Icon name="image" size="massive" />
          <Modal.Description>
            <Header>커스텀 모달입니다.</Header>
            커스텀 모달입니다.
          </Modal.Description>
        </Modal.Content>

        <Modal.Actions>
          <Button
            color="grey"
            content="임시저장"
            onClick={this.handleTempSave}
          />
          <Button color="grey" content="저장" onClick={this.handleSave} />
          <Button content="닫기" onClick={this.handleClose} />
        </Modal.Actions>
      </Modal>
    );
  }
}

export default ExcelPopupView;
