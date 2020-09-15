
import React, { Component, Fragment } from 'react';
import { SearchBox, Checkbox, Button, DatePicker, Input, Label, Radio } from '@mes/mes-ui-react';
import { observer } from 'mobx-react';
import { mesAutobind } from '@mes/mes-shared';

@mesAutobind
@observer
class MonitoringSearchView extends Component {
  //
  render() {

    const {
      date,
      setDate,
      onSearch,
      chk1,
      changeCheck,
      onClickDay,
      onClickWeek,
      onClickMonth,
      onClickTable,
      day,
    } = this.props;

    return (
      <SearchBox
        defaultButtonHidden
        onSearch={onSearch}
        buttonAlign="right"
        buttonVerticalAlign="bottom"
        buttonAdditionalNode={
          <Fragment>
            {/* <Button
              icon="chart bar"
              size="big"
              onClick={onClickChart}
            /> */}
            <Button
              icon="table"
              onClick={onClickTable}
            />
          </Fragment>
        }
      >
        <SearchBox.Fields>
          <SearchBox.Field>
            <Label>기간</Label>
            <DatePicker
              period
              value={date}
              onChange={setDate}
            >
              <Input
                className="datepicker input-period"
                icon="calendar alternate outline"
              />
            </DatePicker>
          </SearchBox.Field>
          <SearchBox.Field>
            <Checkbox
              label="자동 새로고침"
              name="chk1"
              checked={chk1}
              onChange={changeCheck}
            />
          </SearchBox.Field>
          <SearchBox.Field>
            <Radio
              label="일계"
              value="day"
              name="dayChk"
              onClick={onClickDay}
              checked={day === 'day'}
            />
            <Radio
              label="주계"
              value="week"
              name="dayChk"
              onClick={onClickWeek}
              checked={day === 'week'}
            />
            <Radio
              label="월계"
              value="month"
              name="dayChk"
              onClick={onClickMonth}
              checked={day === 'month'}
            />
            <Button
              content="조회"
              color="blue"
              onClick={onSearch}
            />
          </SearchBox.Field>
        </SearchBox.Fields>
      </SearchBox>
    );
  }
}

export default MonitoringSearchView;
