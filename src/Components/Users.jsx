import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import Nav from "./Nav";
import DummyProfile from "../Components/DummyProfile.webp";
import { Modal, Form, Table, Button, Spinner } from "react-bootstrap";
import AddItems from "../Components/AddItems";
import ToastNotification from "./ToastNotification";
import "react-toastify/dist/ReactToastify.css";

import Searching from "./Searching";
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
  flexRender,
} from "@tanstack/react-table";
import { rankItem } from "@tanstack/match-sorter-utils";
import "../Components/Users.css";
import { defaultData } from "../constants";
import { showToast } from "./ToastNotification";
function fuzzyFilter(row, columnId, value, addMeta) {
  const itemRank = rankItem(row.getValue(columnId), value);
  addMeta({
    itemRank,
  });
  return itemRank.passed;
}
export default function Users() {
  const [columnFilters, setColumnFilters] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [list, setList] = useState(defaultData);

  const [show, setShow] = useState(false);
  const [showMessaga, setShowMessage] = useState(false);
  const [inputList, setInputList] = useState({ mode: "add", index: null });

  const [loading, setLoading] = useState(false);

  const data = useMemo(() => list, [list]);
  const columnHelper = createColumnHelper();

  useEffect(() => {
    const getUsers = async () => {
      setLoading(true);
      await axios
        .get("users")
        .then((resp) => {
          setList(resp.data);
        })
        .catch((err) => {
          console.log(err);
          showToast();
          setList("");
        });
      setLoading(false);
    };
    getUsers();
  }, []);

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
  const messageDelete = (row) => {
    setInputList({ mode: "delete", index: row.row.index });

    setShowMessage(true);
  };
  const editHandler = (row) => {
    setShow(true);

    setInputList({
      mode: "edit",
      index: row.row.index,
    });
  };
  const deleteHandler = async (index) => {
    setShowMessage(false);

    try {
      await axios.delete(`users/${list[inputList.index].id}`);
      setList((prevList) => {
        const updatedList = [...prevList];
        updatedList.splice(index, 1);
        return updatedList;
      });
    } catch (error) {
      console.log(error);
      showToast();
    }
  };

  const onSubmit = async (data) => {
    if (inputList.mode === "add") {
      await axios
        .post("users", data)
        .then((res) => {
          const newItem = res.data;
          setList((prevList) => [...prevList, newItem]);
        })
        .catch((err) => {
          console.log(err);
          showToast();
        });
    } else {
      await axios
        .put(`users/${list[inputList.index].id}`, data)
        .then((res) => {
          const updatedList = res.data;
          setList((prevList) => {
            const newList = [...prevList];
            newList[inputList.index] = updatedList;
            return newList;
          });
        })
        .catch((err) => {
          console.log(err);
          showToast();
        });
    }

    handleClose();
  };

  return (
    <>
      <Nav />
      <ToastNotification />
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
          {loading ? (
            <tr>
              <td colSpan={7} className="text-center">
                <Spinner />
              </td>
            </tr>
          ) : list.length > 0 ? (
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
            <tr>
              <td colSpan={7} className="text-center">
                <span style={{ textAlign: "center" }}>No Data Found</span>
              </td>
            </tr>
          )}
        </tbody>
      </Table>
      {/* <div className="text-center" id="spinner">
        <img src={Loader} alt="loader" />
      </div> */}
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
