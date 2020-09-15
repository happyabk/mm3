
import React, { Component } from 'react';
import { SearchBox, Label, DatePicker, Input } from '@mes/mes-ui-react';
import { observer } from 'mobx-react';
import { mesAutobind } from '@mes/mes-shared';

@mesAutobind
@observer
class SteelScheduleMonitoringSearchView extends Component {

  render() {

    const {
      onSearch,
      date,
      setDate,
    } = this.props;

    return (
      <SearchBox onSearch={onSearch}>
        <SearchBox.Fields>
          <SearchBox.Field>
            <Label>조회시각 : {/*date*/}</Label>
            <DatePicker
              type="datetime"
              value={date}
              onChange={setDate}
            >
              <Input icon="calendar alternate outline" width="160px" />
            </DatePicker>
          </SearchBox.Field>
        </SearchBox.Fields>
      </SearchBox>
    );
  }
}

export default SteelScheduleMonitoringSearchView;
