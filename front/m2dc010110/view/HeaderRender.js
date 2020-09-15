import React, { useCallback, useState } from 'react';
import { Popup } from '@mes/mes-ui-react';

const HeaderRender = () => props => {
  const [sort, setSort] = useState('');
  const isSortable = !!props.progressSort;
  const isColumnGroup = !!props.columnGroup;
  const sortClassName = sort ? `ag-icon-${sort}` : 'ag-hidden';

  const onSort = useCallback(event => {
    props.progressSort(event.shiftKey);
    setSort(props.column.getSort());
  }, []);

  return (
    <div
      className={isColumnGroup ? 'ag-header-group-cell-label' : 'ag-header-cell-label'}
      onClick={isSortable ? onSort : undefined}
    >
      <span
        className={isColumnGroup ? 'ag-header-group-text' : 'ag-header-cell-text'}
      >
        <Popup
          trigger={<span className="tooltipTxt">{props.displayName}</span>}
          position="right center"
          header  = {props.header}
          className="pop-memo"
        />
      </span>
      <span className="ag-header-icon">
        <span className={`ag-icon ${sortClassName}`} />
      </span>
    </div>
  );
};

export default HeaderRender;

