import "./styles.css";
import React, { useState } from "react";

type User = {
  id: string;
  FirstName: string;
  MiddleName: string;
  LastName: string;
  Phone: string;
  Email: string;
};

export default function App() {
  const [file, setFile] = useState();
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

  const headerKeys = Object.keys(Object.assign({}, ...data));

  return (
    <div style={{ textAlign: "center" }}>
      <h1>CSV IMPORT </h1>
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

      <table>
        <thead>
          <tr key={"header"}>
            {headerKeys.map((key) => (
              <th>{key}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data?.map((item: any) => (
            <tr key={item.id}>
              {Object.values(item).map((val: any) => (
                <td>{val}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
