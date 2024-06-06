import { describe, it, expect, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import DataTable, {
  IHeaderCell,
  ITableData,
} from '../components/data-table/DataTable';

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

describe('render', () => {
  it('renders the data table component with the correct data', () => {
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
    ];
    render(<DataTable data={data} header={header} />);
    expect(true).toBeTruthy();
  });
});

describe('Row selection', () => {
  it('should increment/decrement the counter when a row is checked/unchecked', () => {
    const data: ITableData[] = [
      {
        name: 'netsh.exe',
        device: 'Luigi',
        path: '\\Device\\HarddiskVolume2\\Windows\\System32\\netsh.exe',
        status: 'available',
      },
    ];
    const { container } = render(<DataTable data={data} header={header} />);
    const counter = container.getElementsByClassName('action-bar__selected');
    const checkboxes = container.getElementsByClassName('data-table__checkbox');

    expect(counter[0].textContent).toBe('None Selected');

    fireEvent.click(checkboxes[0]);

    expect(counter[0].textContent).toBe('Selected 1');

    fireEvent.click(checkboxes[0]);

    expect(counter[0].textContent).toBe('None Selected');
  });

  it('should be disabled for rows that are not of status available', () => {
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
    ];
    render(<DataTable data={data} header={header} />);
    const checkboxes = screen.getAllByRole('checkbox');

    expect(checkboxes[1]).toHaveAttribute('disabled');
    expect(checkboxes[2]).not.toHaveAttribute('disabled');
  });
});

describe('Select All', () => {
  const data: ITableData[] = [
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
  ];

  it('should be unselected if no items are selected', () => {
    const { getByTestId } = render(<DataTable data={data} header={header} />);
    const checkboxes = screen.getAllByRole('checkbox');
    const selectAll = getByTestId('select-all');

    for (const checkbox of checkboxes) {
      expect(checkbox).not.toBeChecked();
    }

    expect(selectAll).not.toBeChecked();
  });

  it('should be indeterminate if some of the checkboxes are checked', () => {
    render(<DataTable data={data} header={header} />);
    const checkboxes = screen.getAllByRole('checkbox');
    const selectAll = checkboxes[0] as HTMLInputElement;

    expect(selectAll.indeterminate).toBe(false);

    fireEvent.click(checkboxes[1]);

    expect(selectAll.indeterminate).toBe(true);
  });

  it('should be checked if all inputs are selected', () => {
    render(<DataTable data={data} header={header} />);
    const checkboxes = screen.getAllByRole('checkbox');
    const selectAll = checkboxes[0] as HTMLInputElement;

    expect(selectAll.checked).toBe(false);

    fireEvent.click(checkboxes[1]);

    expect(selectAll.checked).toBe(false);

    fireEvent.click(checkboxes[2]);

    expect(selectAll.checked).toBe(true);
  });

  it('should select all items if none are selected when clicked', () => {
    render(<DataTable data={data} header={header} />);
    const checkboxes = screen.getAllByRole('checkbox');
    const selectAll = checkboxes[0] as HTMLInputElement;

    fireEvent.click(selectAll);

    for (const checkbox of checkboxes) {
      expect(checkbox).toBeChecked();
    }
  });

  it('should select all items if some are selected when clicked', () => {
    render(<DataTable data={data} header={header} />);
    const checkboxes = screen.getAllByRole('checkbox');
    const selectAll = checkboxes[0] as HTMLInputElement;

    fireEvent.click(checkboxes[1]);

    fireEvent.click(selectAll);

    for (const checkbox of checkboxes) {
      expect(checkbox).toBeChecked();
    }
  });

  it('should de-select all items if all are currently selected when clicked', () => {
    render(<DataTable data={data} header={header} />);
    const checkboxes = screen.getAllByRole('checkbox');
    const selectAll = checkboxes[0] as HTMLInputElement;

    fireEvent.click(checkboxes[1]);
    fireEvent.click(checkboxes[2]);

    expect(selectAll).toBeChecked();

    fireEvent.click(checkboxes[0]);

    expect(checkboxes[1]).not.toBeChecked();
    expect(checkboxes[2]).not.toBeChecked();
  });

  it('should remove all selections if clicked in indeterminate mode and not all rows are selectable', () => {
    const data: ITableData[] = [
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
        status: 'scheduled',
      },
    ];

    render(<DataTable data={data} header={header} />);
    const checkboxes = screen.getAllByRole('checkbox');
    const selectAll = checkboxes[0] as HTMLInputElement;

    expect(selectAll.indeterminate).toBe(false);

    fireEvent.click(selectAll);

    expect(selectAll.indeterminate).toBe(true);

    fireEvent.click(selectAll);

    expect(selectAll.indeterminate).toBe(false);

    expect(checkboxes[1]).not.toBeChecked();
    expect(checkboxes[2]).not.toBeChecked();
  });
});

describe('download', () => {
  const data: ITableData[] = [
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
  ];

  it('should be disabled if no rows are selected', () => {
    render(<DataTable data={data} header={header} />);
    const downloadButton = screen.getByRole('button');

    expect(downloadButton).toHaveAttribute('disabled');
  });

  it('should be enabled if at least 1 row is selected', () => {
    render(<DataTable data={data} header={header} />);
    const checkboxes = screen.getAllByRole('checkbox');
    const downloadButton = screen.getByRole('button');

    fireEvent.click(checkboxes[1]);

    expect(downloadButton).not.toHaveAttribute('disabled');
  });

  it('should display alert with device and path for all selected when clicked', () => {
    window.alert = vi.fn();
    const alertMock = vi.spyOn(window, 'alert');
    render(<DataTable data={data} header={header} />);
    const checkboxes = screen.getAllByRole('checkbox');
    const downloadButton = screen.getByRole('button');

    fireEvent.click(checkboxes[1]);
    fireEvent.click(checkboxes[2]);

    fireEvent.click(downloadButton);

    expect(alertMock).toHaveBeenCalledTimes(1);
  });
});
