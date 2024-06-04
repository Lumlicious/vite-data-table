import { describe, it, expect, test } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import DataTable, { ITableData } from './DataTable';

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

describe('render', () => {
  it('renders the data table component with the correct data', () => {
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

    expect(counter[0].textContent).toBe('Selected 0');

    await fireEvent.click(checkboxes[0]);

    expect(counter[0].textContent).toBe('Selected 1');

    await fireEvent.click(checkboxes[0]);

    expect(counter[0].textContent).toBe('Selected 0');
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
