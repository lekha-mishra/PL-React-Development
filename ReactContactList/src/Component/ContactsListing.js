import { React, useState } from "react";
import { Col, Row } from "react-bootstrap";
import CustomModal from "./Modal";

const ContactsListing = ({
  onScroll,
  listInnerRef,
  userList,
  showEvenData,
}) => {
  const [showContentInfo, setShowContentModal] = useState({
    showModal: false,
    modalData: {},
  });

  const hideModal = () => {
    setShowContentModal({ ...showContentInfo, showModal: false });
  };

  return (
    <>
      <Row
        className="gx-2 text-primary rounded-top"
        style={{ background: "#0d6efd42" }}
      >
        <Col className="p-2">Contact Id</Col>
        <Col className="p-2">Name</Col>
        <Col className="p-2">Email</Col>
        <Col className="p-2">Phone Number</Col>
      </Row>
      <div
        onScroll={onScroll}
        ref={listInnerRef}
        style={{ height: "calc(100vh - 260px)", overflowY: "auto" }}
      >
        {userList.map((item, index) => {
          return (
            <Row
              className="gx-2 dataRow m-0"
              key={index}
              onClick={() =>
                setShowContentModal({
                  ...showContentInfo,
                  showModal: true,
                  modalData: item,
                })
              }
            >
              <Col className="p-2">{item.id}</Col>
              <Col className="p-2">
                {item.first_name} {item.last_name}
              </Col>
              <Col className="p-2">{item.email}</Col>
              <Col className="p-2">{item.phone_number}</Col>
            </Row>
          );
        })}
      </div>
      <CustomModal
        show={showContentInfo.showModal}
        onClose={hideModal}
        isFullWidth="md"
      >
        <Row className="gx-2 dataRow m-0">
          <Col xs="12" className="p-2">
            Name: {showContentInfo.modalData.first_name}{" "}
            {showContentInfo.modalData.last_name}{" "}
            {!showContentInfo.modalData.first_name &&
              !showContentInfo.modalData.last_name &&
              "NA"}
          </Col>
          <Col xs="12" className="p-2">
            Email :{" "}
            {showContentInfo.modalData.email
              ? showContentInfo.modalData.email
              : "NA"}
          </Col>
          <Col xs="12" className="p-2">
            Phone No. :{" "}
            {showContentInfo.modalData.phone_number
              ? showContentInfo.modalData.phone_number
              : "NA"}
          </Col>
        </Row>
      </CustomModal>
    </>
  );
};

export default ContactsListing;
