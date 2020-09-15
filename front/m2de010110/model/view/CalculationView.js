
import React, { Component } from 'react';
import { Checkbox, ControlLine, Button, Input, Label  } from '@mes/mes-ui-react';

class CalculationView extends Component {
  state = {
    prdPlnBeChQt: '',
    prdPlnBeChQt2: '',
    chk1: true,
    chk2: true,
    chk3: true,
    chk4: true,
  };

  componentDidUpdate(prevProps) {
    if (prevProps.facCd !== this.props.facCd) {
      this.Initializing();
    }
  }

  Initializing = () => this.setState({
    prdPlnBeChQt: '',
    prdPlnBeChQt2: '',
    chk1: true,
    chk2: true,
    chk3: true,
    chk4: true,
  });

  handleChange = (e, data) => this.setState(data.changed);


  //전장입량, 조강량
  onCompute = () => {
    const { onCompute, facCd, constantsCodes } = this.props;
    const operFlag = constantsCodes.operFlag;
    const { prdPlnBeChQt, chk1, chk2, chk3, chk4 } = this.state;
    onCompute(prdPlnBeChQt, facCd, operFlag, chk1, chk2, chk3, chk4);
  };

  //용강량
  calculate = () => {
    const { calculate, facCd, constantsCodes } = this.props;
    const operFlag = constantsCodes.operFlag;
    const { prdPlnBeChQt2, chk1, chk2, chk3, chk4 } = this.state;
    calculate(prdPlnBeChQt2, facCd, operFlag, chk1, chk2, chk3, chk4);
  };

  getItems(i) {
    const operFlag = this.props.constantsCodes.operFlag;
    const {  chk1, chk2, chk3, chk4 } = this.state;
    const { handleChange } = this;
    if (i === '1') {
      return (
        <React.Fragment>
          <Checkbox label="1전로" name="chk1" checked={chk1} onChange={handleChange} />
          <Checkbox label="2전로" name="chk2" checked={chk2} onChange={handleChange} />
          <Checkbox label="3전로" name="chk3" checked={chk3} onChange={handleChange} />
        </React.Fragment>
      );
    }  else if (i === '2') {
      if (operFlag === 'C') {
        return (
          <React.Fragment>
            <Checkbox label="1전로" name="chk1" checked={chk1} onChange={handleChange} />
            <Checkbox label="2전로" name="chk2" checked={chk2} onChange={handleChange} />
            <Checkbox label="3전로" name="chk3" checked={chk3} onChange={handleChange} />
            <Checkbox label="4전로" name="chk4" checked={chk4} onChange={handleChange} />
          </React.Fragment>
        );
      } else {
        return (
          <React.Fragment>
            <Checkbox label="1전로" name="chk1" checked={chk1} onChange={handleChange} />
            <Checkbox label="2전로" name="chk2" checked={chk2} onChange={handleChange} />
            <Checkbox label="3전로" name="chk3" checked={chk3} onChange={handleChange} />
          </React.Fragment>
        );
      }
    } else if (i === '3') {
      return (
        <React.Fragment>
          <Checkbox label="1전로" name="chk1" checked={chk1} onChange={handleChange} />
          <Checkbox label="2전로" name="chk2" checked={chk2} onChange={handleChange} />
          <Checkbox label="3전로" name="chk3" checked={chk3} onChange={handleChange} />
        </React.Fragment>
      );
    } else if (i === '4') {
      if (operFlag === 'C') {
        return (
          <React.Fragment>
            <Checkbox label="Slab" name="chk1" checked={chk1} onChange={handleChange} />
            <Checkbox label="1Bloom" name="chk2" checked={chk2} onChange={handleChange} />
            <Checkbox label="2Bloom" name="chk3" checked={chk3} onChange={handleChange} />
            <Checkbox label="Billet" name="chk4" checked={chk4} onChange={handleChange} />
          </React.Fragment>
        );
      } else {
        return (
          <React.Fragment>
            <Checkbox label="1M/C" name="chk1" checked={chk1} onChange={handleChange} />
            <Checkbox label="2M/C" name="chk2" checked={chk2} onChange={handleChange} />
            <Checkbox label="3M/C" name="chk3" checked={chk3} onChange={handleChange} />
            <Checkbox label="4M/C" name="chk4" checked={chk4} onChange={handleChange} />
          </React.Fragment>
        );
      }
    } else if (i === '5') {
      return (
        <React.Fragment>
          <Checkbox label="1M/C" name="chk1" checked={chk1} onChange={handleChange} />
          <Checkbox label="2M/C" name="chk2" checked={chk2} onChange={handleChange} />
          <Checkbox label="3M/C" name="chk3" checked={chk3} onChange={handleChange} />
          <Checkbox label="4M/C" name="chk4" checked={chk4} onChange={handleChange} />
        </React.Fragment>
      );
    } else if (i === '6') {
      return (
        <React.Fragment>
          <Checkbox label="1M/C" name="chk1" checked={chk1} onChange={handleChange} />
          <Checkbox label="2M/C" name="chk2" checked={chk2} onChange={handleChange} />
        </React.Fragment>
      );
    } else if (i === '7') {
      return (
        <React.Fragment>
          <Checkbox label="Slab" name="chk1" checked={chk1} onChange={handleChange} />
          <Checkbox label="Bloom" name="chk2" checked={chk2} onChange={handleChange} />
        </React.Fragment>
      );
    }

    return null;

  }

  render() {

    const {
      facCd,
    } = this.props;

    return (
      <React.Fragment>
        {this.getItems(facCd)}
        {facCd === '1' || facCd === '2' || facCd === '3' ?
          <React.Fragment>
            <Label>전장입량</Label>
            <Input.Count
              limitDisabled={false}
              limit={3}
            >
              <Input
                value = {this.state.prdPlnBeChQt}
                onChange = {(e, v) => this.setState({ prdPlnBeChQt: v.value })}
              />
            </Input.Count>
            <Button content="계산" onClick={this.onCompute} />
          </React.Fragment>
          :
          <React.Fragment>
            <Label>조강량 </Label>
            <Input.Count
              limitDisabled={false}
              limit={3}
            >
              <Input
                value = {this.state.prdPlnBeChQt}
                onChange = {(e, v) => this.setState({ prdPlnBeChQt: v.value })}
              />
            </Input.Count>
            <Button content="계산" onClick={this.onCompute} />
            <Label>용강량 </Label>
            <Input.Count
              limitDisabled={false}
              limit={3}
            >
              <Input
                value = {this.state.prdPlnBeChQt2}
                onChange = {(e, v) => this.setState({ prdPlnBeChQt2: v.value })}
              />
            </Input.Count>
            <Button content="계산" onClick={this.calculate} />
          </React.Fragment>}
      </React.Fragment>

    );
  }


}
export default CalculationView;
