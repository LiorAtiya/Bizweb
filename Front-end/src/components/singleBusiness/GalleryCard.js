import React, { useEffect, useContext, useState } from 'react'
import { Col, Row } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';

export const GalleryCard = ({ id, name }) => {

  //data of all images
  const [data, setData] = useState([]);
  const [imageName, setImageName] = useState("");

  useEffect(() => {
    const getResult = async () => {
      //get all images of the business from mongodb
      await axios.get(`http://localhost:5015/api/gallery/${name}`).
        then((res) => setData(res.data)).
        catch((err) => console.log(err));
    };
    getResult();
  }, []);

  //Admin Permissions
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const getUserData = JSON.parse(localStorage.getItem('token'));
  const isAdmin = () => {
    if (getUserData) {
      return getUserData.business.includes(id);
    }
    return false;
  }

  const handleImage = (e) => {
    setImageName(e.target.files[0]);
  }

  const uploadImage = async () => {

    let formData = new FormData();
    formData.append('image', imageName)
    formData.append('name', name);

    //send request to server for upload new image
    await axios.post('http://localhost:5015/api/gallery', formData).
      then((res) => console.log(res.data)).
      catch((err) => console.log(err));
    window.location.reload(false);
  }

  return (

    <>
      {
        isAdmin() ?
          <>
            <Button variant="btn btn-warning" onClick={handleShow}>
              Admin Permissions
            </Button>
            <hr></hr>
          </>
          :
          null
      }
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <h5>Update gallery</h5>
        </Modal.Header>
        <Modal.Body>

          <br></br>
          <input type="file" filename="image"
            onChange={handleImage} />
          <br></br>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="btn btn-success" onClick={uploadImage}>Upload</Button>
        </Modal.Footer>
      </Modal>

      <Row>
        {
          data.reverse().map((singleData, i) => {
            const base64String = btoa(
              String.fromCharCode(...new Uint8Array(singleData.img.data.data))
            );
            return (
              <Col size={12} sm={6} md={4}>
                <div className="proj-imgbx">
                  <img src={`data:image/png;base64,${base64String}`} alt={i} width="450" height="250" />
                  {/* <div className="proj-txtx">
              <h4>{"title"}</h4>
              <span>{"description"}</span>
            </div> */}
                </div>
              </Col>
            )
            // <GalleryCard src={`data:image/png;base64,${base64String}`} key={i} />
          })
        }
      </Row>

    </>
  )
}
