import React from "react";
import DataTable from "react-data-table-component";
import { useRouter } from "next/router";

const columns = [
  {
    name: "Data",
    selector: (row) => row.date,
    sortable: true,
  },
  {
    name: "Pavadinimas",
    selector: (row) => row.name,
    sortable: true,
  },
  {
    name: "Gydytojas",
    selector: (row) => row.doctorName,
    sortable: true,
  },
  {
    name: "Statusas",
    selector: (row) => row.status,
    sortable: true,
  },
];

const data = [
  {
    id: 1,
    date: "2021-11-11",
    name: "Akių patikra",
    doctorName: "Bob Johnson",
    status: "Patvirtintas",
  },
  {
    id: 2,
    date: "2021-11-12",
    name: "Akių patikra",
    doctorName: "Bob Johnson",
    status: "Atšauktas",
  },
];

function TableSelectableRows() {
  const router = useRouter();

  return (
    <DataTable
      className="flex"
      columns={columns}
      data={data}
      highlightOnHover
      pointerOnHover
      onRowClicked={() => router.push("#")}
    />
  );
}

export default TableSelectableRows;
