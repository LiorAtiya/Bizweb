import React from "react";
import { Col } from "react-bootstrap";

export const GalleryCard = ({ src ,key}) => {
  return (
    <Col size={12} sm={6} md={4}>
      <div className="proj-imgbx">
        <img src={src} alt={key} width="450" height="250"/>
        {/* <div className="proj-txtx">
          <h4>{"title"}</h4>
          <span>{"description"}</span>
        </div> */}
      </div>
    </Col>
  )
}
