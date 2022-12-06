import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";

type User = {
  id: string;
  FirstName: string;
  MiddleName: string;
  LastName: string;
  Phone: string;
  Email: string;
};

const result = [
  {
    id: "1",
    FirstName: "miki",
    MiddleName: "worku",
    LastName: "won",
    Phone: "245678239",
    Email: "test@test.com"
  }
];

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "FirstName",
    headerName: "First Name",
    width: 150,
    editable: true
  },
  {
    field: "MiddleName",
    headerName: "Middle Name",
    width: 150,
    editable: true
  },
  {
    field: "LastName",
    headerName: "Last name",
    width: 150,
    editable: true
  },
  {
    field: "Email",
    headerName: "Email",
    width: 160,
    editable: true
  },
  {
    field: "Phone",
    headerName: "Phone",
    width: 160,
    editable: true
  },

  {
    field: "fullName",
    headerName: "Full name",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
    valueGetter: (params: GridValueGetterParams) =>
      `${params.row.FirstName || ""} ${params.row.LastName || ""}`
  }
];

const DataGridCSVTABLE = () => {
  const [file, setFile] = React.useState();
  const [data, setData] = React.useState<User[]>([]);

  const fileReader = new FileReader();

  const handleOnChange = (e: any) => {
    setFile(e.target.files[0]);
  };

  const csvToArray = (string: string) => {
    const headers = string.slice(0, string.indexOf("\n")).split(",")
    const rows = string.slice(string.indexOf("\n") + 1).split("\n");

    const rowArray = rows.map((i, id) => {
      const values = i.split(",");
      const obj = headers.reduce((object: any, header: any, index: any) => {
        object[header.replace(/['‘’"“”""``"\r\n"]/g, '')] = values[index];
        return object;
      }, {});
      return {id: id++, ...obj};
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
      <Box sx={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={data}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          disableSelectionOnClick
          // experimentalFeatures={{ newEditingApi: true }}
        />
      </Box>
    </div>
  );
}

export default DataGridCSVTABLE