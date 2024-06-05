import { useEffect, useState } from 'react';
import { ITableData } from './DataTable';

export interface IDataActionBarProps {
  data: ITableData[];
  setSelectedRows: any;
  selectedRows: any;
}

export const ActionBar = ({
  selectedRows,
  setSelectedRows,
  data,
}: IDataActionBarProps) => {
  const [selectAll, setSelectAll] = useState<boolean | 'indeterminate'>(false);

  const handleSelectAll = () => {
    if (selectAll === true) {
      setSelectedRows(new Set());
      setSelectAll(false);
    } else if (selectAll === false) {
      selectAllRows();
    } else {
      const selectableCount = data.filter((item) => {
        return item.status === 'available';
      }).length;

      // When in indeterminate state, if not all rows are selectable, remove all checks.
      if (selectableCount < data.length) {
        setSelectedRows(new Set());
        setSelectAll(false);
      } else {
        selectAllRows();
      }
    }
  };

  const selectAllRows = () => {
    setSelectAll(true);
    const newSelectedRows = new Set(selectedRows);

    data.forEach((item, index) => {
      if (item.status === 'available') {
        newSelectedRows.add(index);
      }
    });

    setSelectedRows(newSelectedRows);
  };

  const handleDownload = () => {
    let message = ``;
    if (selectedRows.size) {
      for (const index of selectedRows) {
        message += `${data[index].device} - ${data[index].path} \n`;
      }
      alert(message);
    }
  };

  useEffect(() => {
    if (selectedRows.size === data.length) {
      setSelectAll(true);
    } else if (selectedRows.size > 0 && selectedRows.size < data.length) {
      setSelectAll('indeterminate');
    } else {
      setSelectAll(false);
    }
  }, [selectAll, selectedRows, data]);

  const getSelectedCount = () => {
    return selectedRows.size === 0
      ? 'None Selected'
      : `Selected ${selectedRows.size}`;
  };

  return (
    <div className="action-bar">
      <label htmlFor="select-all">
        <input
          id="select-all"
          className="action-bar__checkbox"
          data-testid="select-all"
          type="checkbox"
          name="select-all"
          checked={selectAll === true}
          onChange={handleSelectAll}
          ref={(el) => {
            if (el) {
              el.indeterminate = selectAll === 'indeterminate';
            }
          }}
        />
      </label>
      <div className="action-bar__selected">{getSelectedCount()}</div>
      <button
        className="action-bar__button"
        type="button"
        onClick={handleDownload}
        disabled={!selectedRows.size}
      >
        <svg
          className="action-bar__button-icon"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <path d="M288 32c0-17.7-14.3-32-32-32s-32 14.3-32 32V274.7l-73.4-73.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0l128-128c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L288 274.7V32zM64 352c-35.3 0-64 28.7-64 64v32c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V416c0-35.3-28.7-64-64-64H346.5l-45.3 45.3c-25 25-65.5 25-90.5 0L165.5 352H64zm368 56a24 24 0 1 1 0 48 24 24 0 1 1 0-48z" />
        </svg>
        Download Selected
      </button>
    </div>
  );
};

export default ActionBar;
