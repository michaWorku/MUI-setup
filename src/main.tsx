import * as React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";

import {
  ColumnDef,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable
} from "@tanstack/react-table";

type Person = {
  Id: string;
  FirstName: string;
  MiddleName: string;
  LastName: string;
  Phone: string;
  Email: string
};

const defaultData: Person[] = [
  { 
    Id: '1',
    FirstName: "Tesfaye",
    MiddleName: "Abegaz",
    LastName: "Kassa",
    Phone: "251947361193",
    Email: "tesfaye@gmail.com",
  },
  {
    Id: '2',
    FirstName: "Tesfaye",
    MiddleName: "Abegaz",
    LastName: "Kassa",
    Phone: "251947361193",
    Email: "tesfaye@gmail.com",
  },
  {
    Id: '3',
    FirstName: "Tesfaye",
    MiddleName: "Abegaz",
    LastName: "Kassa",
    Phone: "251947361193",
    Email: "tesfaye@gmail.com",
  }
];

const columnHelper = createColumnHelper<Person>();

const columns: ColumnDef<Person, string>[] = [
  columnHelper.accessor("Id", {
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id
  }),
  columnHelper.accessor("FirstName", {
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id
  }),
  columnHelper.accessor((row) => row.MiddleName, {
    id: "MiddleName",
    cell: (info) => <i>{info.getValue()}</i>,
    header: () => <span>Last Name</span>,
    footer: (info) => info.column.id
  }),
  columnHelper.accessor((row) => row.LastName, {
    id: "LastName",
    cell: (info) => <i>{info.getValue()}</i>,
    header: () => <span>Last Name</span>,
    footer: (info) => info.column.id
  }),
  columnHelper.accessor("Phone", {
    cell: (info) => <i>{info.getValue()}</i>,
    footer: (info) => info.column.id
  }),
  columnHelper.accessor("Email", {
    cell: (info) => <i>{info.getValue()}</i>,
    footer: (info) => info.column.id
  })
];

function App() {
  const [data, setData] = React.useState([...defaultData]);
  const rerender = React.useReducer(() => ({}), {})[1];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel()
  });

  const [file, setFile] = React.useState();

  const fileReader = new FileReader();

  const handleOnChange = (e: any) => {
    setFile(e.target.files[0]);
  };

  const csvFileToArray = (string: string) => {
    const headers = string.slice(0, string.indexOf("\n")).split(",")
    const rows = string.slice(string.indexOf("\n") + 1).split("\n");

    const rowArray = rows.map((i) => {
      const values = i.split(",");
      const obj = headers.reduce((object: any, header: any, index: any) => {
        object[header.replace(/['‘’"“”""``"\r\n"]/g, '')] = values[index];
        return object;
      }, {});
      return obj;
    });
    setData(rowArray);
  };

  const handleOnSubmit = (e: any) => {
    e.preventDefault();

    if (file) {
      fileReader.onload = function (event: any) {
        const text = event.target.result;
        csvFileToArray(text);
      };

      fileReader.readAsText(file);
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h1> CSV IMPORT </h1>
      <form>
        <input
          type={"file"}
          id={"csvFileInput"}
          accept={".csv"}
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

      <div className="p-2">
        <table>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
          <tfoot>
            {table.getFooterGroups().map((footerGroup) => (
              <tr key={footerGroup.id}>
                {footerGroup.headers.map((header) => (
                  <th key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.footer,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </tfoot>
        </table>
        <div className="h-4" />
        <button onClick={() => rerender()} className="border p-2">
          Rerender
        </button>
      </div>
    </div>
  );
}

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Failed to find the root element");

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
