import { useState, useEffect, useCallback, useMemo } from "react";
import _ from "lodash";
import Nav from "./Nav";
import DummyProfile from "../Components/DummyProfile.webp";
import { Modal, Form, Table, Button } from "react-bootstrap";
import AddItems from "../Components/AddItems";
// import Filter from "./Filter";
import Searching from "./Searching";
// import reactTable from "./reactTable";
// import Pagination from "./Pagination";
import {
  createColumnHelper,
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFacetedMinMaxValues,
  getPaginationRowModel,
  getSortedRowModel,
  // SortingState,
  flexRender,
} from "@tanstack/react-table";
import { rankItem, compareItems } from "@tanstack/match-sorter-utils";
import Blue from "../Components/blue.png";
import Green from "../Components/green.png";
import "../Components/Users.css";
import { defaultData } from "../constants";
function fuzzyFilter(row, columnId, value, addMeta) {
  const itemRank = rankItem(row.getValue(columnId), value);
  addMeta({
    itemRank,
  });
  return itemRank.passed;
}

// function fuzzySort(rowA, rowB, columnId) {
//   let dir = 0;
//   if (rowA.columnFiltersMeta[columnId]) {
//     dir = compareItems(
//       rowA.columnFiltersMeta[columnId]?.itemRank,
//       rowB.columnFiltersMeta[columnId]?.itemRank
//     );
//   }
//   return dir === 0 ? sortingFns.alphanumeric(rowA, rowB, columnId) : dir;
// }
// const sortingFnss={
//   alphanumeric:(rowA,rowB,columnId)=>{

//   }
// }
// const sortingFnsWithDisabledColumns = {
//   ...sortingFnss,
//   firstName: () => 0, // Disable sorting for "First Name" column
//   lastName: () => 0, // Disable sorting for "Last Name" column
// };
export default function Users() {
  const [columnFilters, setColumnFilters] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [list, setList] = useState(defaultData);
  console.log("🚀 ~ file: Users.jsx:180 ~ Users ~ list:", list);

  const [show, setShow] = useState(false);
  const [showMessaga, setShowMessage] = useState(false);
  const [inputList, setInputList] = useState({ mode: "add", index: null });

  // const [currentPage, setCurrentPage] = useState(0);
  // console.log("🚀 ~ file: Users.jsx:187 ~ Users ~ currentPage:", currentPage);
  // const itemsPerPage = 3;
  // const startIndex = currentPage * itemsPerPage;
  // const endIndex = startIndex + itemsPerPage;
  // const records = list.slice(startIndex, endIndex);
  // const nPage = Math.ceil(list.length / itemsPerPage);
  const [sortOrderF, setSortOrderF] = useState("asc");
  const [sortOrderL, setSortOrderL] = useState("asc");
  /** @type import('@tanstack/react-table').ColumnDef<any>*/
  const data = useMemo(() => list, [list]);
  const columnHelper = createColumnHelper();

  const columns = [
    columnHelper.accessor((row) => row.profile, {
      id: "profile",
      enableSorting: false,
      cell: (row) => (
        <span>
          {row.row.original.profile ? (
            <img src={row.row.original.profile} width={45} alt="Profile" />
          ) : (
            <img src={DummyProfile} width={45} alt="Dummy Profile" />
          )}
        </span>
      ),
    }),

    {
      header: "First Name",
      accessorKey: "firstName",
    },
    {
      header: "Last Name",
      accessorKey: "lastName",
    },
    {
      header: "Email",
      accessorKey: "email",
    },
    {
      header: "Users Name",
      accessorKey: "userName",
    },

    {
      header: "Status",
      accessorKey: "status.value",
      enableSorting: false,
    },

    columnHelper.accessor((row) => row.actions, {
      id: "actions",
      enableSorting: false,
      cell: (row) => (
        <>
          <div className="d-flex align-items-center">
            <button
              className="btn btn-secondary mr-2"
              onClick={() => editHandler(row)}
            >
              Edit
            </button>
            <button
              className="btn btn-danger"
              onClick={() => messageDelete(row)}
            >
              Delete
            </button>
          </div>
          <Modal show={showMessaga} onHide={messageClose}>
            <Modal.Header>
              <Modal.Title>Delete Items</Modal.Title>
            </Modal.Header>
            <Modal.Body className="form-modal">
              <Form.Label>Do You Want To Delete This Item?</Form.Label>
            </Modal.Body>

            <Modal.Footer>
              <Button variant="secondary p-3" onClick={messageClose}>
                Close
              </Button>
              <Button
                variant="primary p-3"
                onClick={() => deleteHandler(row, row.index)}
              >
                Delete
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      ),
      header: () => <span>Actions</span>,
    }),
  ];
  const [sorting, setSorting] = useState([]);

  console.log(columns);
  const reactTable = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: fuzzyFilter,
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    debugHeaders: true,
    debugColumns: false,
    debugTable: true,
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    state: {
      columnFilters,
      globalFilter,
      sorting,
    },
  });
  useEffect(() => {
    if (reactTable.getState().columnFilters[0]?.id === "fullName") {
      if (reactTable.getState().sorting[0]?.id !== "fullName") {
        reactTable.setSorting([{ id: "fullName", desc: false }]);
      }
    }
  }, [reactTable.getState().columnFilters[0]?.id]);

  const defaultOptions = [
    { value: "Active", label: "Active" },
    { value: "In-Active", label: "In-Active" },
  ];
  const SortingFName = useCallback(() => {
    if (sortOrderF === "asc") {
      list.sort((a, b) => a.firstName.localeCompare(b.firstName));
      setSortOrderF("desc");
    } else {
      list.sort((a, b) => b.firstName.localeCompare(a.firstName));
      setSortOrderF("asc");
    }
    setList([...list]);
  }, [list, sortOrderF]);

  const SortingLName = useCallback(() => {
    if (sortOrderL === "asc") {
      list.sort((a, b) => a.lastName.localeCompare(b.lastName));
      setSortOrderL("desc");
    } else {
      list.sort((a, b) => b.lastName.localeCompare(a.lastName));
      setSortOrderL("asc");
    }
    setList([...list]);
  }, [list, sortOrderL]);

  const onStatus = (index) => {
    const updatedList = [...list];
    const currentStatus = updatedList[index].status.value;
    const newStatus = currentStatus === "Active" ? "In-Active" : "Active";
    updatedList[index].status = {
      value: newStatus,
      label: newStatus,
    };

    setList(updatedList);
  };

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);

  // const changeCpage = (id) => {
  //   setCurrentPage(id.selected);
  // };

  const handleShow = () => {
    setShow(true);
    setInputList({
      mode: "add",
      index: 0,
    });
  };
  const handleClose = () => {
    setInputList(inputList);
    setShow(false);
  };
  const messageClose = () => {
    setShowMessage(false);
  };
  const messageDelete = (index) => {
    setInputList({ mode: "delete", index });

    setShowMessage(true);
  };
  const editHandler = (row) => {
    console.log("🚀 ~ file: Users.jsx:259 ~ editHandler ~ row:", row);
    setShow(true);

    setInputList({
      mode: "edit",
      index: row.row.index,
    });
    console.log("now function is called", inputList);
    console.log(
      "🚀 ~ file: Users.jsx:265 ~ editHandler ~ index:",
      inputList.index
    );
  };

  const deleteHandler = (index) => {
    setList((oldValue) => {
      const updatedList = [...oldValue];
      updatedList.splice(index, 1);

      return updatedList;
    });
    messageClose();
  };

  const onSubmit = (data, row) => {
    console.log("🚀 ~ file: Users.jsx:284 ~ onSubmit ~ row:", row);
    console.log("🚀 ~ file: Users.jsx:284 ~ onSubmit ~ data:", data);
    const newList = _.cloneDeep(list);
    if (inputList.mode === "add") {
      newList.push(data);
    } else {
      newList[inputList.index] = data;
      console.log("🚀this is the new list console log", newList);
    }

    setList(() => {
      return newList;
    });

    handleClose();
  };

  return (
    <>
      <Nav />
      <div>
        <Searching
          value={globalFilter ?? ""}
          onChange={(value) => setGlobalFilter(String(value))}
          placeholder="Search all columns"
        />

        <Button
          variant="dark btn-add"
          onClick={handleShow}
          style={{ display: "flex", marginLeft: "auto" }}
        >
          Add New
        </Button>
      </div>
      <Table striped bordered hover>
        <thead>
          {reactTable.getHeaderGroups()?.map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers?.map((header) => (
                <th key={header.id} colSpan={header.colSpan}>
                  {header.isPlaceholder ? null : (
                    <div
                      className={`${
                        header.column.getCanSort()
                          ? "cursor-pointer select-none"
                          : ""
                      }`}
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {header.column.getCanFilter() ? (
                        <div>
                          {/* <Filter column={header.column} reactTable={reactTable} /> */}
                        </div>
                      ) : null}
                      {list.length > 0
                        ? {
                            asc: " 🔼",
                            desc: " 🔽",
                          }[header.column.getIsSorted() ?? ""] || null
                        : ""}
                    </div>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {list.length > 0 ? (
            reactTable.getRowModel().rows?.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells()?.map((cell) => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <span style={{ textAlign: "center" }}>No Data Found</span>
          )}
        </tbody>
        {/* <tfoot></tfoot> */}
      </Table>
      <div className="h-2" />
      <div className="flex items-center gap-2">
        <button
          className="border rounded p-1"
          onClick={() => reactTable.setPageIndex(0)}
          disabled={!reactTable.getCanPreviousPage()}
        >
          {"<<"}
        </button>
        <button
          className="border rounded p-1"
          onClick={() => reactTable.previousPage()}
          disabled={!reactTable.getCanPreviousPage()}
        >
          {"<"}
        </button>
        <button
          className="border rounded p-1"
          onClick={() => reactTable.nextPage()}
          disabled={!reactTable.getCanNextPage()}
        >
          {">"}
        </button>
        <button
          className="border rounded p-1"
          onClick={() => reactTable.setPageIndex(reactTable.getPageCount() - 1)}
          disabled={!reactTable.getCanNextPage()}
        >
          {">>"}
        </button>
        <span className="flex items-center gap-1">
          <div>Page</div>
          <strong>
            {reactTable.getState().pagination.pageIndex + 1} of{" "}
            {reactTable.getPageCount()}
          </strong>
        </span>
        <span className="flex items-center gap-1">
          | Go to page:
          <input
            type="number"
            defaultValue={reactTable.getState().pagination.pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              reactTable.setPageIndex(page);
            }}
            className="border p-1 rounded w-16"
          />
        </span>
        <select
          style={{ margin: "0 0 0 10px" }}
          value={reactTable.getState().pagination.pageSize}
          onChange={(e) => {
            reactTable.setPageSize(Number(e.target.value));
          }}
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
      <div>{reactTable.getRowModel().rows.length} Rows</div>
      <pre>{JSON.stringify(reactTable.getState().pagination, null, 2)}</pre>
      {/* <Pagination
        changeCpage={changeCpage}
        nPage={nPage}
        currentPage={currentPage}
      /> */}
      {show && (
        <AddItems
          inputList={inputList}
          show={show}
          handleClose={handleClose}
          onSubmit={onSubmit}
          data={inputList.mode === "edit" ? list[inputList.index] : null}
          defaultOptions={defaultOptions}
          index={inputList.index}
        />
      )}
    </>
  );
}
