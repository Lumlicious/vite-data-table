import DataTable, {
  IHeaderCell,
  ITableData,
} from './components/data-table/DataTable';

const data: ITableData[] = [
  {
    name: 'smss.exe',
    device: 'Mario',
    path: '\\Device\\HarddiskVolume2\\Windows\\System32\\smss.exe',
    status: 'scheduled',
  },

  {
    name: 'netsh.exe',
    device: 'Luigi',
    path: '\\Device\\HarddiskVolume2\\Windows\\System32\\netsh.exe',
    status: 'available',
  },

  {
    name: 'uxtheme.dll',
    device: 'Peach',
    path: '\\Device\\HarddiskVolume1\\Windows\\System32\\uxtheme.dll',
    status: 'available',
  },

  {
    name: 'aries.sys',
    device: 'Daisy',
    path: '\\Device\\HarddiskVolume1\\Windows\\System32\\aries.sys',
    status: 'scheduled',
  },

  {
    name: 'cryptbase.dll',
    device: 'Yoshi',
    path: '\\Device\\HarddiskVolume1\\Windows\\System32\\cryptbase.dll',
    status: 'scheduled',
  },

  {
    name: '7za.exe',
    device: 'Toad',
    path: '\\Device\\HarddiskVolume1\\temp\\7za.exe',
    status: 'scheduled',
  },
];

const data2: ITableData[] = [
  {
    name: 'smss.exe',
    device: 'Mario',
    path: '\\Device\\HarddiskVolume2\\Windows\\System32\\smss.exe',
    status: 'available',
  },

  {
    name: 'netsh.exe',
    device: 'Luigi',
    path: '\\Device\\HarddiskVolume2\\Windows\\System32\\netsh.exe',
    status: 'available',
  },

  {
    name: 'uxtheme.dll',
    device: 'Peach',
    path: '\\Device\\HarddiskVolume1\\Windows\\System32\\uxtheme.dll',
    status: 'available',
  },

  {
    name: 'aries.sys',
    device: 'Daisy',
    path: '\\Device\\HarddiskVolume1\\Windows\\System32\\aries.sys',
    status: 'available',
  },

  {
    name: 'cryptbase.dll',
    device: 'Yoshi',
    path: '\\Device\\HarddiskVolume1\\Windows\\System32\\cryptbase.dll',
    status: 'available',
  },

  {
    name: '7za.exe',
    device: 'Toad',
    path: '\\Device\\HarddiskVolume1\\temp\\7za.exe',
    status: 'available',
  },
];

const header: IHeaderCell[] = [
  {
    id: 'checkbox',
    label: '',
  },
  {
    id: 'name',
    label: 'Name',
  },
  {
    id: 'device',
    label: 'Device',
  },
  {
    id: 'path',
    label: 'Path',
  },
  {
    id: 'status-icon',
    label: '',
  },
  {
    id: 'status',
    label: 'Status',
  },
];

function App() {
  return (
    <div className="container">
      <h1>Data Table with scheduled rows</h1>
      <DataTable data={data} header={header} />
      <br />
      <br />
      <h1>Data Table with all available rows</h1>
      <p>
        Added to show the select all functionality if all available downloads
      </p>
      <DataTable data={data2} header={header} />
    </div>
  );
}

export default App;
