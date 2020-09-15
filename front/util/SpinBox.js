import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'semantic-ui-react';

/**
 * Input의 값을 컨트롤 버튼을 통해 증감시키는 스핀 박스
 */
import { mesAutobind } from '@mes/mes-shared';
@mesAutobind
class SpinBox extends Component {
  static propTypes = {
    value: PropTypes.number.isRequired,
    /** children 요소는 Input만 가능하며 1개를 초과할 수 없습니다. */
    children(props, propName, componentName) {
      if (propName === 'children') {
        if ( props.children.length && props.children.length > 1) {
          throw Error(`${componentName} - 자식 요소는 2개 이상 올 수 없습니다.`);
        } else if (props.children.type.displayName !== 'Input') {
          throw Error(`${componentName} - 자식 요소는 Input Type만 허용됩니다.`);
        }
      }
    },
    /** 편집가능 여부 */
    // eslint-disable-next-line react/no-unused-prop-types
    editable: PropTypes.bool,
    /** 자릿수 형식 (예: digit=5 이면 value값은 00000~99999 5자리의 형식) */
    digit: PropTypes.number,
    /** 최소 감소 수치 */
    min: PropTypes.number,
    /** 최대 증가 수치 */
    max: PropTypes.number,
    /** 증감 범위 */
    step: PropTypes.number,
    /** 증감 버튼의 화살표 방향 up-down / prev-next*/
    direction: PropTypes.oneOf(['UD', 'PN']),
    /** 유효성 검사 위반시 노출 메시지 */
    // eslint-disable-next-line react/no-unused-prop-types
    validateMsg: PropTypes.string,
    /** value format */
    formatter: PropTypes.string,
    /** onChange( value, formattedValue ) */
    onChange: PropTypes.func,
  };

  static defaultProps = {
    editable: true,
    min: -9999999,
    max: 9999999,
    step: 1,
    direction: 'UD',
    onChange: null,
    validateMsg: '',
    formatter: '{value}',
  };

  constructor(props) {
    super(props);
    this.state = {
      value: Number.isNaN(props.value) ? 0 : props.value,
      displayValue: this.getReplaceValue(props.value),
    };
    this.beforeValue = {
      value: this.state.value,
      displayValue: this.state.displayValue,
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    //const isUpdatePropsDisplayValue = nextProps.displayValue !== this.props.displayValue;
    const isUpdatePropsValue = nextProps.value !== this.props.value;
    const isUpdatePropsFormatter = nextProps.formatter !== this.props.formatter;

    if (Number.isNaN(nextProps.value)) {
      return false;
    }


    // (nextProps.value);
    // (nextState.displayValue);
    // (nextProps.formatter.replace(/{value}/gi, ''));
    // ('한묶음');

    console.log('isUpdatePropsValue',isUpdatePropsValue);

    if (isUpdatePropsValue || isUpdatePropsFormatter ) {
      if (nextProps.value === 0 && nextState.displayValue === (nextProps.formatter.replace(/{value}/gi, '')) ) {
        this.setState({
          value: nextProps.value,
          displayValue: nextProps.value,
        });
      }
      else if (nextProps.value === 0) {
        this.setState({
          value: nextProps.value,
          displayValue: nextProps.formatter.replace(/{value}/gi, ''),
        });
      }
      else {
        this.setState({
          value: nextProps.value,
          displayValue: this.getUpdateValue(nextProps.value, nextProps.formatter),
        });
      }
      
    }

    return true;
  }

  getReplaceValue(value) {
    const { formatter, digit } = this.props;
    console.log('getReplaceValue',value);
    const padded = digit ? value.toString().padStart(digit, '0') : value;
    return formatter.replace(/{value}/gi, padded);
  }

  getUpdateValue(value, format) {
    const { digit } = this.props;
    const padded = digit ? value.toString().padStart(digit, '0') : value;
    return format.replace(/{value}/gi, padded);
  }

  onUpClick() {
    const { max, step, onChange } = this.props;
    const currentValue = this.state.value;
    const newValue = currentValue + step;
    if (newValue <= max) {
      this.setState({
        value: newValue,
        displayValue: this.getReplaceValue(newValue),
      }, () => {
        this.beforeValue = {
          value: this.state.value,
          displayValue: this.state.displayValue,
        };
        if ( onChange ) onChange(this.state.value, this.state.displayValue, Object.freeze(this.props));
      });
    }
  }

  onDownClick() {
    const { min, step, onChange } = this.props;
    const currentValue = this.state.value;
    const newValue = currentValue - step;
    if (newValue >= min) {
      this.setState({
        value: newValue,
        displayValue: this.getReplaceValue(newValue),
      }, () => {
        this.beforeValue = {
          value: this.state.value,
          displayValue: this.state.displayValue,
        };
        if ( onChange ) onChange(this.state.value, this.state.displayValue, Object.freeze(this.props));
      });
    }
  }

  checkFormat(value) {
    const { min, max } = this.props;
    if (value < min || value > max || value === '') {
      return false;
    }
    return true;
  }

  onFocus(e) {
    const { formatter } = this.props;
    const replacedArray = formatter.split(/{value}/gi);
    let replacedValue = e.target.value;
    if (replacedValue === formatter.replace(/{value}/gi, '')) {
      this.setState({
        displayValue: 0,
      });
    } else {
      replacedArray.map((value) => {
        replacedValue = replacedValue.replace(value, '');
      });
      this.setState({
        displayValue: parseInt(replacedValue, 10),
      });
    }

    
  }

  onKeyDown(e) {
    const { formatter } = this.props;
    const replacedValue = formatter.replace(/{value}/gi, '');
    this.setState({
      value: parseInt(e.target.value.replace(replacedValue, ''), 10) - 1,
    });
  }

  onBlur(e) {
    const { onChange, formatter } = this.props;
    const initValue = this.getReplaceValue(e.target.value);
    console.log('initValue',initValue);
    if (parseInt(e.target.value, 10) === parseInt(this.state.value, 10)) {
      this.setState({ displayValue: initValue });
      return;
    }
    const eValue = e.target.value;
    const checkValue = this.checkFormat(eValue);
    const replacedValue = formatter.replace(/{value}/gi, '');
    const replacedArray = formatter.split(/{value}/gi);
    let flag = false;
    replacedArray.map((value) => {
      flag = e.target.value.includes(value);
    });
    const { value, displayValue } = this.beforeValue;
    if (checkValue === false) {
      if (this.props.validateMsg !== '') alert(this.props.validateMsg);
      this.setState({
        value,
        displayValue,
      });
    } else {
      this.setState({
        value: parseInt( eValue.replace(replacedValue, ''), 10),
        displayValue: !flag ? this.getReplaceValue(eValue) : eValue,
      }, () => {
        if ( onChange ) onChange(this.state.value, this.state.displayValue, Object.freeze(this.props));
      });
    }
  }

  forceOnChange(e) {
    const re = /^[0-9\b]+$/;
    console.log('forceOnChange',e.target.value);
    console.log('parseInt(e.target.value,10)<=100000',parseInt(e.target.value,10)<=100000);
    if (e.target.value === '' || (re.test(e.target.value) && parseInt(e.target.value,10)<=100000)) {
      
      this.setState({ displayValue: e.target.value });
    }
  }



  render() {
    const child = this.props.children;
    const ChildComponent = child.type;
    const iconNames = (this.props.direction.toUpperCase() === 'UD') ?
      ['caret up', 'caret down']
      : ['caret left', 'caret right'];
    const InputComponent = (this.props.editable === true) ? (
      <ChildComponent
        {...child.props}
        value={this.state.displayValue}
        onFocus={this.onFocus}
        onBlur={this.onBlur}
        onChange={this.forceOnChange}
        onSubmit={this.onSubmit}
        onClick={this.onClick}
        onSelect={this.onSelect}
        onKeyDown={this.onKeyDown}
        onKeyUp={this.KeyUp}
        onKeyPress={this.onKeyPress}
      />
    ) : (<ChildComponent {...child.props} value={this.state.displayValue} />);
    return (
      <React.Fragment>
        {InputComponent}
        <Button
          color="black"
          size="small"
          icon={iconNames[0]}
          onClick={
          this.props.direction === 'UD' ?
            this.onUpClick
            : this.onDownClick
        }
        />
        <Button
          color="black"
          size="small"
          icon={iconNames[1]}
          onClick={
          this.props.direction === 'UD' ?
            this.onDownClick
            : this.onUpClick
        }
        />
      </React.Fragment>
    );
  }
}

export default SpinBox;
