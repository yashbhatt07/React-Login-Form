import React from 'react';
import Modal from "react-bootstrap/Modal";
import { Button, Row, Col } from "react-bootstrap";
import Form from "react-bootstrap/Form";

function DeleteItems({showMessaga,item,index,setList,setShowMessage}) {
  const messageClose = () => {
    setShowMessage(false);
  };
  const deleteHandler = index => {
    setList(oldValue => {
      return oldValue.filter(id => index !== id);
    });
    messageClose();
  };

    return (
        <div>
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
                        onClick={() => deleteHandler(item, index)}
                      >
                        Delete
                      </Button>
                    </Modal.Footer>
                  </Modal>
        </div>
    )
}

export default DeleteItems
