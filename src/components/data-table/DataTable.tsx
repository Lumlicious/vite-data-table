import { useState } from 'react';
import ActionBar from './ActionBar';

export interface ITableData {
  name: string;
  device: string;
  path: string;
  status: 'available' | 'scheduled';
}

export interface IDataTableProps {
  data: ITableData[];
  header: IHeaderCell[];
}

export interface IHeaderCell {
  id: string;
  label: string;
}

const DataTable = ({ data, header }: IDataTableProps) => {
  // Using Set for quicker lookup & easier delete
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());

  const handleRowSelect = (index: number) => {
    const newSelectedRows = new Set(selectedRows);
    if (newSelectedRows.has(index)) {
      newSelectedRows.delete(index);
    } else {
      newSelectedRows.add(index);
    }
    setSelectedRows(newSelectedRows);
  };

  return (
    <div className="data-table-container">
      <ActionBar
        selectedRows={selectedRows}
        setSelectedRows={setSelectedRows}
        data={data}
      />
      <table className="data-table">
        <thead className="data-table__head">
          <tr className="data-table__head-row">
            {header.map((head) => (
              <th key={head.id} className="data-table__head-data">
                {head.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="data-table__body">
          {data.map((item, index) => (
            <tr
              key={index}
              className={`data-table__body-row ${selectedRows.has(index) && 'data-table__body-row--selected'}`}
            >
              <td className="data-table__body-data">
                <label>
                  <input
                    className="data-table__checkbox"
                    type="checkbox"
                    name={`select-${item.name}`}
                    disabled={item.status !== 'available'}
                    onChange={() => handleRowSelect(index)}
                    checked={selectedRows.has(index)}
                  />
                </label>
              </td>
              <td className="data-table__body-data">{item.name}</td>
              <td className="data-table__body-data">{item.device}</td>
              <td className="data-table__body-data">{item.path}</td>
              <td className="data-table__body-data data-table__body-data--available">
                {item.status === 'available' && <div className="dot"></div>}
              </td>
              <td className="data-table__body-data">
                {item.status[0].toUpperCase() + item.status.slice(1)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
