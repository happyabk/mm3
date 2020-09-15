import React, { Component } from 'react';
import { SearchBox, Input, Select, DatePicker, Label } from '@mes/mes-ui-react';

import { mesAutobind } from '@mes/mes-shared';

@mesAutobind
class SearchView extends Component {
  state= {};
  componentDidMount() {
    this.setState({ facCd: this.props.facCd });
  }

  componentDidUpdate(prevProps) {
    if (this.props.facCd !== prevProps.facCd) {
      this.set(this.props.facCd);
    }
  }

  set(facCd) {
    this.setState({ facCd });
  }

  onSearch() {
    const { onSearch, setFacCd } = this.props;
    setFacCd(this.state.facCd);
    onSearch();
  }

  render() {
    const {
      facCdLov,
      mpPlanDate,
      setMpPlanDate,
    } = this.props;

    return (
      <SearchBox
        onSearch={this.onSearch}
      >
        <SearchBox.Fields>
          <SearchBox.Field>
            <Label>공장</Label>
            <Select
              options={facCdLov}
              value={this.state.facCd}
              onChange={(e, v) => this.set(v.value)}
            />
          </SearchBox.Field>
          <SearchBox.Field>
            <Label>조회월</Label>
            <DatePicker
              type="month"
              value={mpPlanDate}
              onChange={setMpPlanDate}
            >
              <Input icon="calendar alternate outline" />
            </DatePicker>
          </SearchBox.Field>
        </SearchBox.Fields>
      </SearchBox>
    );
  }
}

export default SearchView;
