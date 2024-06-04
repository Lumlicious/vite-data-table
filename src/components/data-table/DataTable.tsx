export interface ITableData {
  name: string;
  device: string;
  path: string;
  status: 'available' | 'scheduled';
}

export interface IDataTableProps {
  data: ITableData[];
}

const DataTable = ({ data }: IDataTableProps) => {
  return (
    <div className="data-table-container">
      <div className="action-bar">
        <label htmlFor="select-all">
          <input
            id="select-all"
            className="action-bar__checkbox"
            type="checkbox"
            name="select-all"
          />
        </label>
        <div className="action-bar__selected">Selected 2</div>
        <button className="action-bar__button" type="button">
          <div className="action-bar__button-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              width="20px"
              height="20px"
            >
              <path d="M288 32c0-17.7-14.3-32-32-32s-32 14.3-32 32V274.7l-73.4-73.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0l128-128c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L288 274.7V32zM64 352c-35.3 0-64 28.7-64 64v32c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V416c0-35.3-28.7-64-64-64H346.5l-45.3 45.3c-25 25-65.5 25-90.5 0L165.5 352H64zm368 56a24 24 0 1 1 0 48 24 24 0 1 1 0-48z" />
            </svg>
          </div>
          Download Selected
        </button>
      </div>
      <table className="data-table">
        <thead className="data-table__head">
          <tr className="data-table__head-row">
            <th className="data-table__head-data"></th>
            <th className="data-table__head-data">Name</th>
            <th className="data-table__head-data">Device</th>
            <th className="data-table__head-data">Path</th>
            <th className="data-table__head-data"></th>
            <th className="data-table__head-data">Status</th>
          </tr>
        </thead>
        <tbody className="data-table__body">
          {data.map((item) => (
            <tr className="data-table__body-row">
              <td className="data-table__body-data">
                <label htmlFor="select-1">
                  <input
                    className="data-table__checkbox"
                    type="checkbox"
                    name="select-1"
                  />
                </label>
              </td>
              <td className="data-table__body-data">{item.name}</td>
              <td className="data-table__body-data">{item.device}</td>
              <td className="data-table__body-data">{item.path}</td>
              <td className="data-table__body-data data-table__body-data--available">
                <div className="dot"></div>
              </td>
              <td className="data-table__body-data">{item.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
