import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import 'react-paginate/theme/basic/react-paginate.css';
import { Modal, Button, Card, Container, Row, Col } from 'react-bootstrap';
import ReactPaginate from 'react-paginate';
import 'font-awesome/css/font-awesome.min.css';

interface Field {
  isRequired: boolean;
  name: string;
  type: string;
  label: string;
  placeholder: string;
  value: string;
}

interface ReactCrudProps {
  formTitle: string;
  formEntryData: Field[];
  dataStoreHook: (formData: { [key: string]: string }) => Promise<void>;
  dataRemoveHook: (indexToRemove: number) => Promise<void>;
  listData: { [key: string]: string }[];
  fieldsToShow: string[];
  apiUrl: string;
}

const ReactCrud: React.FC<ReactCrudProps> = ({ dataStoreHook, dataRemoveHook, formTitle, formEntryData, listData, fieldsToShow, apiUrl }) => {
  const [time, setTime] = useState(new Date());
  const [formData, setFormData] = useState<{ [key: string]: string }>(
    formEntryData.reduce((acc, field) => ({ ...acc, [field.name]: field.value }), {})
  );

  const [crudListData, setCrudListData] = useState(listData);
  const [crudListDataLabels, setCrudListDataLabels] = useState<string[]>([]);

  useEffect(() => {
    setCrudListData(listData);
  }, [listData]);

  useEffect(() => {
    let labels = [];
    for (let fieldToShow of fieldsToShow) {
      const fieldLabel = formEntryData.find((field) => field.name === fieldToShow)?.label || fieldToShow;
      labels.push(fieldLabel);
    }
    setCrudListDataLabels(labels);
  }, []);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;

  const handlePageClick = (data: { selected: number }) => {
    setCurrentPage(data.selected);
  };

  const offset = currentPage * itemsPerPage;
  const currentItems = crudListData.slice(offset, offset + itemsPerPage);

  const [selectedItemToDelete, setSelectedItemToDelete] = useState<number | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [validationMessage, setValidationMessage] = useState('');

  const handleDelete = () => {
    if (selectedItemToDelete) {
      dataRemoveHook(selectedItemToDelete!).then((resultDeleteData) => {
        console.log("Result of delete data:", resultDeleteData);
        const updatedList = crudListData.filter((_, index) => index !== selectedItemToDelete);
        setCrudListData(updatedList);
        setShowDeleteModal(false);
        setSelectedItemToDelete(null);
      }).catch((error) => {
        console.error("Error deleting data:", error);
        alert("Failed to delete data. Please try again.");
      });
    }
  };

  return (
    <div className="container">
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this item?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{formTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              for (let field of formEntryData) {
                if (field.isRequired && !formData[field.name]) {
                  setValidationMessage(`${field.label} is required`);
                  return;
                }
              }

              dataStoreHook(formData).then((updatedFormData) => {
                const existingIndex = crudListData.findIndex(item => item.id === formData.id);

                if (existingIndex !== -1) {
                  const updatedList = crudListData.map((item, index) =>
                    index === existingIndex ? formData : item
                  );

                  setCrudListData(updatedList);
                } else {
                  console.log(updatedFormData);
                  const updatedList = [...crudListData, formData];
                  setCrudListData(updatedList);
                }
                setFormData(formEntryData.reduce((acc, field) => ({ ...acc, [field.name]: field.value }), {}));
                handleClose();
              }).catch((error) => {
                console.error("Error storing data:", error);
                alert("Failed to store data. Please try again.");
              });
            }}
          >
            {formEntryData.map((field) => (
              <div key={field.name} className="row mb-3">
                {(field.type != 'hidden') && <div className="col col-md-3" >
                  <label htmlFor={field.name} className="form-label">
                    {field.label}
                  </label>
                </div>}
                {(field.type != 'hidden') && <div className="col col-md-9">
                  {(field.type == 'text' || field.type == 'date' || field.type == 'number' || field.type == 'email') &&
                    <input
                      type={field.type}
                      className="form-control"
                      name={field.name}
                      placeholder={field.placeholder}
                      value={formData[field.name]}
                      onChange={handleChange}
                    />}

                  {(field.type == 'textarea') &&
                    <textarea
                      className="form-control"
                      name={field.name}
                      placeholder={field.placeholder}
                      onChange={handleChange}
                    >{formData[field.name]}</textarea>}
                </div>}

                {(field.type == 'hidden') && <input
                  type={'hidden'}
                  className="form-control"
                  name={field.name}
                  value={formData[field.name]}
                />}
              </div>
            ))}
            {validationMessage && <div className="alert alert-danger">{validationMessage}</div>}
            <div className="row mb-3">
              <div className="col col-md-3">
                <Button variant="secondary" onClick={() => {
                  setFormData(formEntryData.reduce((acc, field) => ({ ...acc, [field.name]: field.value }), {}));
                  handleClose();
                }}>
                  Cancel
                </Button>
              </div>
              <div className="col col-md-9">
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </div>
            </div>
          </form>
        </Modal.Body>
      </Modal>

      <Card>
        <Card.Header>
          <Row>
            <Col md={6}>
              <h3>{formTitle}</h3>
            </Col>
            <Col md={3} className="float-right">
              <input
                type="text"
                className="form-control"
                placeholder="Search..."
                onChange={(e) => {
                  console.log(e.target.value);
                  const searchValue = e.target.value.toLowerCase();
                  const filteredData = crudListData.filter(item =>
                    fieldsToShow.some(field =>
                      String(item[field]).toLowerCase().includes(searchValue)
                    )
                  );
                  setCrudListData(filteredData);
                }}
              />
            </Col>
            <Col md={3} className="float-right">
              <Button variant="primary" className="float-right" onClick={() => {
                setFormData(formEntryData.reduce((acc, field) => ({ ...acc, [field.name]: field.value }), {}));
                handleShow();
              }}>
                Add New
              </Button>
            </Col>
          </Row>
        </Card.Header>
        <Card.Body>
          <Container>
            {currentItems && <table className="table table-striped">
              <thead>
                <tr>
                  {crudListDataLabels.map((field) => (
                    <th key={field}>{field}</th>
                  ))}
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((item, index) => (
                  <tr key={index}>
                    {fieldsToShow.map((field) => (
                      <td key={field}>{item[field]}</td>
                    ))}
                    <td>
                      <button
                        className="btn btn-sm btn-warning"
                        onClick={() => {
                          const selectedItem = currentItems[index];
                          setFormData(selectedItem);
                          handleShow();
                        }}
                      >
                        <i className="fa fa-edit"></i> Edit
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => {
                          setSelectedItemToDelete(offset + index);
                          setShowDeleteModal(true);
                        }}
                      >
                        <i className="fa fa-trash"></i> Delete
                      </button>

                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            }
          </Container>
        </Card.Body>
        <Card.Footer>
          <ReactPaginate
            previousLabel={'previous'}
            nextLabel={'next'}
            breakLabel={'...'}
            breakClassName={'break-me'}
            pageCount={Math.ceil(crudListData.length / itemsPerPage)}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageClick}
          />
        </Card.Footer>

      </Card>
    </div>
  );
};

export default ReactCrud;
