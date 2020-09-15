import { mesAutobind } from '@mes/mes-shared';
import React, { PureComponent } from 'react';
import { Input, Ref } from '@mes/mes-ui-react';

const InputEditor = ( resProps = {} ) => {
  const Editor = class extends PureComponent {
    constructor( props ) {
      super( props );
      this.state = { value: props.value };
    }

    afterGuiAttached = () => {
      const inputEl = this.ref.querySelector('input');
      if (inputEl && inputEl.tagName.toLowerCase() === 'input') {
        inputEl.focus();
        inputEl.select();
      }
    };

    onChange( e ) {
      const value = e.target.value;

      if (!isNaN(value) || value === '') {
        this.setState(
          { value },
          () => {
            if (resProps.onChange) {
              resProps.onChange(value, this.props);
            }
          });
      }
    }

    getValue() {
      return this.state.value;
    }

    render() {
      const { value } = this.state;
      const { field } = this.props.colDef;
      let limit = 5;
      if (field.includes('prdPlnChargeCnt') || field.includes('prdPlnChargeCnt')) {
        limit = 3;
      }



      //eqpDormantPlnTm


      return (
        <Ref innerRef={ node => this.ref = node }>
          <Input.Count
            limitDisabled={false}
            limit={limit}
          >
            <Input
            // { ...resProps }
              value={ value || ''}
              onChange={this.onChange}
              onBlur={() => this.props.stopEditing() }
            />
          </Input.Count>

        </Ref>
      );
    }
  };
  return mesAutobind( Editor );
};

export default InputEditor;
