import React, { useState } from "react";
import Users from "./Users";
import DashBoards from "./Dashboard";

function Variables() {
  const [list, setList] = useState([
    {
      firstName: "qwqwqwqw",
      lastName: "wdwdwdw",
      email: "d@gamil.com",
      userName: "yyyyty",
      status: {
        value: "Active",
        label: "Active",
      },
    },
    {
      firstName: "qwqwqwqw",
      lastName: "wdwdwdw",
      email: "d@gamil.com",
      userName: "yyyyty",
      status: {
        value: "Active",
        label: "Active",
      },
    },
    {
      firstName: "qwqwqwqw",
      lastName: "wdwdwdw",
      email: "d@gamil.com",
      userName: "yyyyty",
      status: {
        value: "Active",
        label: "Active",
      },
    },
    {
      firstName: "qwqwqwqw",
      lastName: "wdwdwdw",
      email: "d@gamil.com",
      userName: "yyyyty",
      status: {
        value: "Active",
        label: "Active",
      },
    },
    {
      firstName: "qwqwqwqw",
      lastName: "wdwdwdw",
      email: "d@gamil.com",
      userName: "yyyyty",
      status: {
        value: "Active",
        label: "Active",
      },
    },
    {
      firstName: "qwqwqwqw",
      lastName: "wdwdwdw",
      email: "d@gamil.com",
      userName: "yyyyty",
      status: {
        value: "Active",
        label: "Active",
      },
    },
    {
      firstName: "qwqwqwqw",
      lastName: "wdwdwdw",
      email: "d@gamil.com",
      userName: "yyyyty",
      status: {
        value: "Active",
        label: "Active",
      },
    },
    {
      firstName: "qwqwqwqw",
      lastName: "wdwdwdw",
      email: "d@gamil.com",
      userName: "yyyyty",
      status: {
        value: "Active",
        label: "Active",
      },
    },
    {
      firstName: "qwqwqwqw",
      lastName: "wdwdwdw",
      email: "d@gamil.com",
      userName: "yyyyty",
      status: {
        value: "Active",
        label: "Active",
      },
    },
    {
      firstName: "qwqwqwqw",
      lastName: "wdwdwdw",
      email: "d@gamil.com",
      userName: "yyyyty",
      status: {
        value: "Active",
        label: "Active",
      },
    },
    {
      firstName: "qwqwqwqw",
      lastName: "wdwdwdw",
      email: "d@gamil.com",
      userName: "yyyyty",
      status: {
        value: "Active",
        label: "Active",
      },
    },
    {
      firstName: "qwqwqwqw",
      lastName: "wdwdwdw",
      email: "d@gamil.com",
      userName: "yyyyty",
      status: {
        value: "Active",
        label: "Active",
      },
    },
    {
      firstName: "qwqwqwqw",
      lastName: "wdwdwdw",
      email: "d@gamil.com",
      userName: "yyyyty",
      status: {
        value: "Active",
        label: "Active",
      },
    },
    {
      firstName: "qwqwqwqw",
      lastName: "wdwdwdw",
      email: "d@gamil.com",
      userName: "yyyyty",
      status: {
        value: "Active",
        label: "Active",
      },
    },
    {
      firstName: "qwqwqwqw",
      lastName: "wdwdwdw",
      email: "d@gamil.com",
      userName: "yyyyty",
      status: {
        value: "Active",
        label: "Active",
      },
    },
    {
      firstName: "qwqwqwqw",
      lastName: "wdwdwdw",
      email: "d@gamil.com",
      userName: "yyyyty",
      status: {
        value: "Active",
        label: "Active",
      },
    },
  ]);
  //   const [currentPage, setCurrentPage] = useState(0);
  //   const itemsPerPage = 2;
  //   const startIndex = currentPage * itemsPerPage;
  //   const endIndex = startIndex + itemsPerPage;
  //   const records = list.slice(startIndex, endIndex);
  return (
    <div>
      <DashBoards />
      <Users
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        itemsPerPage={itemsPerPage}
        startIndex={startIndex}
        endIndex={endIndex}
        records={records}
        list={list}
        setList={setList}
      />
    </div>
  );
}

export default Variables;
