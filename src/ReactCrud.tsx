import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import 'react-paginate/theme/basic/react-paginate.css';
import { Modal, Button, Card, Container } from 'react-bootstrap';
import ReactPaginate from 'react-paginate';

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
  listData: { [key: string]: string }[];
  fieldsToShow: string[];
  apiUrl: string;
}

const ReactCrud: React.FC<ReactCrudProps> = ({ dataStoreHook, formTitle, formEntryData, listData, fieldsToShow, apiUrl }) => {
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

  const getBengaliDate = (date: Date) => {
    return date.toLocaleDateString("bn-BD");
  };

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

  const [selectedItemToDelete, setSelectedItemToDelete] = useState<{ [key: string]: string } | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleDelete = () => {
    if (selectedItemToDelete) {
      const updatedList = crudListData.filter(item => item !== selectedItemToDelete);
      setCrudListData(updatedList);
      setShowDeleteModal(false);
      setSelectedItemToDelete(null);
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
                  alert(`${field.label} is required`);
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
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </form>
        </Modal.Body>
      </Modal>

      <Card>
        <Card.Header>
          <div className="row">
            <div className="col-md-6">
              <h3>{formTitle}</h3>
              {/* <Card.Text>
                <h6>{getBengaliDate(time)}</h6>
              </Card.Text> */}
            </div>
            <div className="col-md-6 align-right">
              <Button variant="primary" className="align-right" onClick={handleShow}>
                Add New
              </Button>
            </div>
          </div>
        </Card.Header>
        <Card.Body>
          <Container>
            {currentItems && <table className="table">
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
                        className="btn btn-warning"
                        onClick={() => {
                          const selectedItem = currentItems[index];
                          setFormData(selectedItem);
                          handleShow();
                        }}
                      >
                        <i className="fa fa-edit"></i> Edit
                      </button>
                        <button
                        className="btn btn-danger"
                        onClick={() => {
                          setSelectedItemToDelete(currentItems[index]);
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
              containerClassName={'pagination'}
              activeClassName={'active'}
            />
          </Card.Footer>
        </Card.Footer>

      </Card>
    </div>
  );
};

export default ReactCrud;
