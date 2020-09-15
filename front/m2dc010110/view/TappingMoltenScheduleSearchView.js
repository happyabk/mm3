import React, { Component } from 'react';
import { Label, SearchBox, Select, Input, Icon } from '@mes/mes-ui-react';

class TappingMoltenScheduleSearchView extends Component {

  render() {
    const {
      onSearch,
      onMtlNoSearch,

      lovFacOpCdN,
      facOpCdN,
      lovLdNo,
      ldNo,
      lovMcNo,
      mcNo,
      mtlNo,

      setFacOpCdN,
      setMcNo,
      setLdNo,
      setMtlNo,
    } = this.props;

    return (
      <SearchBox
        onSearch={onSearch}
      >
        <SearchBox.Fields>
          <SearchBox.Field>
            <Label>공장</Label>
            <Select
              id="facOpCdN"
              onChange={setFacOpCdN}
              value={facOpCdN}
              options={lovFacOpCdN}
            />
          </SearchBox.Field>
          <SearchBox.Field>
            <Label>로 NO</Label>
            <Select
              id="ldNo"
              onChange={setLdNo}
              value={ldNo}
              options={lovLdNo}
            />
          </SearchBox.Field>

          <SearchBox.Field>
            <Label>M/C NO</Label>
            <Select
              id="mcNo"
              onChange={setMcNo}
              value={mcNo}
              options={lovMcNo}
            />
          </SearchBox.Field>
          <SearchBox.Field>
            <Label>강번</Label>
            <Input
              id="mtlNo"
              case="Upper"
              onChange={setMtlNo}
              value={mtlNo}
              icon={<Icon name="search" link onClick={onMtlNoSearch} />}
            />
          </SearchBox.Field>
        </SearchBox.Fields>
      </SearchBox>
    );
  }
}

export default TappingMoltenScheduleSearchView;
