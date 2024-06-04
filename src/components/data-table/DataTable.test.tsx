import { describe, it, expect, test } from 'vitest';
import { fireEvent, getByTestId, render, screen } from '@testing-library/react';
import DataTable, { ITableData } from './DataTable';

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
    render(<DataTable data={data} />);
    expect(true).toBeTruthy();
  });
});

describe('Row selection', () => {
  it('should increment/decrement the counter when a row is checked/unchecked', async () => {
    const data: ITableData[] = [
      {
        name: 'netsh.exe',
        device: 'Luigi',
        path: '\\Device\\HarddiskVolume2\\Windows\\System32\\netsh.exe',
        status: 'available',
      },
    ];
    const { container } = render(<DataTable data={data} />);
    const counter = await container.getElementsByClassName(
      'action-bar__selected'
    );
    const checkboxes = await container.getElementsByClassName(
      'data-table__checkbox'
    );

    expect(counter[0].textContent).toBe('None Selected');

    await fireEvent.click(checkboxes[0]);

    expect(counter[0].textContent).toBe('Selected 1');

    await fireEvent.click(checkboxes[0]);

    expect(counter[0].textContent).toBe('None Selected');
  });

  it('should be disabled for rows that are not of status available', async () => {
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
    render(<DataTable data={data} />);
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

  it('should be unselected if no items are selected', async () => {
    const { getByTestId } = render(<DataTable data={data} />);
    const checkboxes = screen.getAllByRole('checkbox');
    const selectAll = getByTestId('select-all');

    for (let checkbox of checkboxes) {
      expect(checkbox).not.toBeChecked();
    }

    expect(selectAll).not.toBeChecked();
  });

  it('should be indeterminate if some of the checkboxes are checked', async () => {
    render(<DataTable data={data} />);
    const checkboxes = screen.getAllByRole('checkbox');
    const selectAll = checkboxes[0] as HTMLInputElement;

    expect(selectAll.indeterminate).toBe(false);

    await fireEvent.click(checkboxes[1]);

    expect(selectAll.indeterminate).toBe(true);
  });

  it('should be checked if all inputs are selected', async () => {
    render(<DataTable data={data} />);
    const checkboxes = screen.getAllByRole('checkbox');
    const selectAll = checkboxes[0] as HTMLInputElement;

    expect(selectAll.checked).toBe(false);

    await fireEvent.click(checkboxes[1]);

    expect(selectAll.checked).toBe(false);

    await fireEvent.click(checkboxes[2]);

    expect(selectAll.checked).toBe(true);
  });

  it('should select all items if none are selected when clicked', async () => {
    render(<DataTable data={data} />);
    const checkboxes = screen.getAllByRole('checkbox');
    const selectAll = checkboxes[0] as HTMLInputElement;

    await fireEvent.click(selectAll);

    for (let checkbox of checkboxes) {
      expect(checkbox).toBeChecked();
    }
  });

  it('should select all items if some are selected when clicked', async () => {
    render(<DataTable data={data} />);
    const checkboxes = screen.getAllByRole('checkbox');
    const selectAll = checkboxes[0] as HTMLInputElement;

    await fireEvent.click(checkboxes[1]);

    await fireEvent.click(selectAll);

    for (let checkbox of checkboxes) {
      expect(checkbox).toBeChecked();
    }
  });

  it('should de-select all items if all are currently selected when clicked', async () => {
    render(<DataTable data={data} />);
    const checkboxes = screen.getAllByRole('checkbox');
    const selectAll = checkboxes[0] as HTMLInputElement;

    await fireEvent.click(checkboxes[1]);
    await fireEvent.click(checkboxes[2]);

    expect(selectAll).toBeChecked();

    await fireEvent.click(checkboxes[0]);

    expect(checkboxes[1]).not.toBeChecked();
    expect(checkboxes[2]).not.toBeChecked();
  });
});
