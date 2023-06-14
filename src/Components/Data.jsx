import React from 'react'

function Data() {
    const editHandler = (item, index) => {
        setInputList({
          ...item,
          mode: "edit",
          index,
          firstName: item.firstName,
          lastName: item.lastName,
          email: item.email,
          userName: item.userName,
          status: item.status
        });
        console.log(editHandler);
    
        handleShow();
      };
      const messageDelete = () => {
        setShowMessage(true);
      };
    return (
        <div>
             <Table striped bordered hover variant="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Username</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        {records.length > 0 ? (
          <tbody>
            {records.map((item, index) => {
              return (
                <tr key={index}>
                  {records.length > 0}
                  <td>{index + startIndex + 1}</td>
                  <td>{item.firstName.value}</td>
                  <td>{item.lastName.value}</td>
                  <td>{item.email.value}</td>
                  <td>{item.userName.value}</td>
                  <td>{item.status.value}</td>
                  <td>
                    <button
                      className="btn btn-secondary mr-2"
                      onClick={() => editHandler(item, index)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => messageDelete(item, index)}
                    >
                      Delete
                    </button>
                  </td>

                  <DeleteItems
                    messageClose={messageClose}
                    showMessaga={showMessaga}
                    deleteHandler={deleteHandler}
                    item={item}
                    index={index}
                  />
                </tr>
              );
            })}
          </tbody>
        ) : (
          <th colSpan={7} className="error">
            No Data Found
          </th>
        )}
      </Table>
        </div>
    )
}

export default Data
