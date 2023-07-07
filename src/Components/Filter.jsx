import React from "react";
import Searching from "./Searching";

export default function Filter({ column, reactTable }) {
  const firstValue = reactTable
    .getPreFilteredRowModel()
    .flatRows[0]?.getValue(column.id);

  const columnFilterValue = column.getFilterValue();

  return typeof firstValue === "number" ? (
    <div className="flex space-x-2">
      <Searching
        type="number"
        min={Number(column.getFacetedMinMaxValues()?.[0] || "")}
        max={Number(column.getFacetedMinMaxValues()?.[1] || "")}
        value={(columnFilterValue || [])[0] || ""}
        onChange={(value) => column.setFilterValue((old) => [value, old?.[1]])}
        placeholder={`Min ${
          column.getFacetedMinMaxValues()?.[0]
            ? `(${column.getFacetedMinMaxValues()?.[0]})`
            : ""
        }`}
        className="w-24 border shadow rounded"
      />
      <Searching
        type="number"
        min={Number(column.getFacetedMinMaxValues()?.[0] || "")}
        max={Number(column.getFacetedMinMaxValues()?.[1] || "")}
        value={(columnFilterValue || [])[1] || ""}
        onChange={(value) => column.setFilterValue((old) => [old?.[0], value])}
        placeholder={`Max ${
          column.getFacetedMinMaxValues()?.[1]
            ? `(${column.getFacetedMinMaxValues()?.[1]})`
            : ""
        }`}
        className="w-24 border shadow rounded"
      />
      {/* <input
        type="number"
        value={(columnFilterValue || [])[0] || ""}
        onChange={(e) =>
          column.setFilterValue((old) => [e.target.value, old?.[1]])
        }
        placeholder={`Min`}
        className="w-24 border shadow rounded"
      />
      <input
        type="number"
        value={(columnFilterValue || [])[1] || ""}
        onChange={(e) =>
          column.setFilterValue((old) => [old?.[0], e.target.value])
        }
        placeholder={`Max`}
        className="w-24 border shadow rounded"
      /> */}
    </div>
  ) : (
    <>
      <Searching
        type="text"
        value={columnFilterValue || ""}
        onChange={(value) => column.setFilterValue(value)}
        placeholder={`Search... (${column.getFacetedUniqueValues().size})`}
        className="w-36 border shadow rounded"
        list={column.id + "list"}
      />
      <div className="h-1" />
      {/* <input
        type="text"
        value={columnFilterValue || ""}
        onChange={(e) => column.setFilterValue(e.target.value)}
        placeholder={`Search...`}
        className="w-36 border shadow rounded"
      /> */}
    </>
  );
}

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Failed to find the root element");
