import React, { FC } from 'react';
import MaterialReactTable, {
  MRT_ColumnDef,
  MRT_Row,
} from 'material-react-table';
import { Box, Button } from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { ExportToCsv } from 'export-to-csv'; //or use your library of choice here
import { data, Person, User } from './makeData';

//defining columns outside of the component is fine, is stable
//Username; Identifier;First name;Last name

const columns: MRT_ColumnDef<User>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
    size: 40,
  },
  {
    accessorKey: 'FirstName',
    header: 'First Name',
    size: 120,
  },
  {
    accessorKey: 'MiddleName',
    header: 'Middle Name',
    size: 120,
  },
  {
    accessorKey: 'LastName',
    header: 'Last Name',
    size: 120,
  },
  {
    accessorKey: 'Phone',
    header: 'Phone',
    size: 120,
  },
  {
    accessorKey: 'Email',
    header: 'Email',
    size: 120,
  },
];

const csvOptions = {
  fieldSeparator: ',',
  quoteStrings: '"',
  decimalSeparator: '.',
  showLabels: true,
  useBom: true,
  useKeysAsHeaders: false,
  headers: columns.map((c) => c.header),
};

const csvExporter = new ExportToCsv(csvOptions);

const CsvTable: FC = () => {
  const [file, setFile] = React.useState();
  const [data, setData] = React.useState<User[]>([]);

  const fileReader = new FileReader();

  const handleOnChange = (e: any) => {
    setFile(e.target.files[0]);
  };

  const csvToArray = (string: string) => {
    const headers = string.slice(0, string.indexOf('\n')).split(',');
    const rows = string.slice(string.indexOf('\n') + 1).split('\n');

    const rowArray = rows.map((i, id) => {
      const values = i.split(',');
      const obj = headers.reduce((object: any, header: any, index: any) => {
        object[header.replace(/['‘’"“”""``"\r\n"]/g, '')] = values[index];
        return object;
      }, {});
      return { id: id++, ...obj };
    });
    setData(rowArray);
  };

  const handleOnSubmit = (e: any) => {
    e.preventDefault();

    if (file) {
      fileReader.onload = function (event: any) {
        const text = event.target.result;
        csvToArray(text);
      };

      fileReader.readAsText(file);
    }
  };
  const handleExportRows = (rows: MRT_Row<User>[]) => {
    csvExporter.generateCsv(rows.map((row) => row.original));
  };

  const handleExportData = () => {
    csvExporter.generateCsv(data);
  };

  return (
    <>
      <div style={{ textAlign: 'center' }}>
        <h1>CSV Table </h1>
        <form>
          <input
            type={'file'}
            id={'csvFileInput'}
            accept={'.csv'}
            onChange={handleOnChange}
          />

          <button
            onClick={(e) => {
              handleOnSubmit(e);
            }}
          >
            IMPORT CSV
          </button>
        </form>

        <br />
      </div>
      <MaterialReactTable
        columns={columns}
        data={data}
        enableRowSelection
        positionToolbarAlertBanner="bottom"
        renderTopToolbarCustomActions={({ table }) => (
          <Box
            sx={{ display: 'flex', gap: '1rem', p: '0.5rem', flexWrap: 'wrap' }}
          >
            <Button
              color="primary"
              //export all data that is currently in the table (ignore pagination, sorting, filtering, etc.)
              onClick={handleExportData}
              startIcon={<FileDownloadIcon />}
              variant="contained"
            >
              Export All Data
            </Button>
            <Button
              disabled={table.getPrePaginationRowModel().rows.length === 0}
              //export all rows, including from the next page, (still respects filtering and sorting)
              onClick={() =>
                handleExportRows(table.getPrePaginationRowModel().rows)
              }
              startIcon={<FileDownloadIcon />}
              variant="contained"
            >
              Export All Rows
            </Button>
            <Button
              disabled={table.getRowModel().rows.length === 0}
              //export all rows as seen on the screen (respects pagination, sorting, filtering, etc.)
              onClick={() => handleExportRows(table.getRowModel().rows)}
              startIcon={<FileDownloadIcon />}
              variant="contained"
            >
              Export Page Rows
            </Button>
            <Button
              disabled={
                !table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()
              }
              //only export selected rows
              onClick={() => handleExportRows(table.getSelectedRowModel().rows)}
              startIcon={<FileDownloadIcon />}
              variant="contained"
            >
              Export Selected Rows
            </Button>
          </Box>
        )}
      />
    </>
  );
};

export default CsvTable;
