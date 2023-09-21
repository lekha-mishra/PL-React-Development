import React, { useRef, useEffect, useState } from "react";
import ContactsListing from "./ContactsListing";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import { Button, Card, Col, Row } from "react-bootstrap";
import CustomModal from "./Modal";

function ContactsListingContainer(props) {
  const listInnerRef = useRef();
  const [currPage, setCurrPage] = useState(1);
  const [contactsRequestStatus, setContactsFetchRequestStatus] = useState({
    isLoadingContacts: true,
    hasError: false,
  });
  const [contactList, setContactList] = useState([]);
  const [conditionalApiCalls, setConditionalApiCalls] = useState({
    countryId: props?.countryId,
  });

  const hideModal = () => {
    setContactsFetchRequestStatus({
      ...contactsRequestStatus,
      isLoadingContacts: false,
      errorCode: "",
      errorMessage: "",
      hasError: false,
    });
  };

  const fetchData = async (
    query = props?.searchValue || "",
    currentPage = 1
  ) => {
    setContactsFetchRequestStatus({
      ...contactsRequestStatus,
      isLoadingContacts: true,
    });

    await axios
      .get(`${process.env.REACT_APP_CONTACTS_API_URL}`, {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_AUTH_TOKEN}`,
        },
        params: {
          companyId: 560,
          query,
          page: currentPage,
          countryId: props?.countryId,
          noGroupDuplicates: 1,
        },
      })
      .then((response) => {
        const contactDataKey = Object.keys(response.data.contacts);
        if (contactDataKey.length) {
          const contactsDataArray = [];
          contactDataKey.map((contactIds) =>
            contactsDataArray.push(response.data.contacts[contactIds])
          );
          setContactList([...contactList, ...contactsDataArray]);
          setCurrPage(currentPage);
        }
        setContactsFetchRequestStatus({
          ...contactsRequestStatus,
          isLoadingContacts: false,
          errorCode: response.status,
          errorMessage: response.data.contacts.length ? "" : "No Data Found",
        });
      })
      .catch((error) => {
        setContactsFetchRequestStatus({
          ...contactsRequestStatus,
          isLoadingContacts: false,
          errorCode: error?.code,
          errorMessage: error?.message,
          hasError: true,
        });
      });
  };

  const onScroll = () => {
    if (listInnerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
      if (
        scrollTop + clientHeight === scrollHeight &&
        !contactsRequestStatus.isLoadingContacts
      ) {
        fetchData(props.searchValue, currPage + 1);
        setCurrPage(currPage + 1);
      }
    }
  };

  useEffect(() => {
    let delay;
    if (props?.isEnterPressed) {
      contactList.length = 0;
      setContactList([]);
      fetchData(props?.searchValue);
    } else if (conditionalApiCalls.countryId !== props?.countryId) {
      contactList.length = 0;
      setContactList([]);
      setCurrPage(1);
      setConditionalApiCalls({
        ...conditionalApiCalls,
        countryId: props?.countryId,
      });
      fetchData(props?.searchValue);
    } else {
      new Promise(function (resolve, reject) {
        delay = setTimeout(() => {
          contactList.length = 0;
          setContactList([]);
          fetchData(props?.searchValue);
          resolve();
        }, 2000);
      });
    }
    return () => clearTimeout(delay);
  }, [props?.isEnterPressed, props?.searchValue.length, props?.countryId]);

  const filteredContactList = props?.isEven
    ? contactList.filter((item) => {
        if (item.id % 2 === 0) return item;
      })
    : contactList;

  return (
    <>
      {contactsRequestStatus.isLoadingContacts && contactList.length === 0 ? (
        <div className="d-flex h-100 justify-content-center align-items-center flex-column pt-3">
          <Spinner animation="grow" variant="primary" />
          <h6 className="mt-2 text-secondary">Loading Contacts...</h6>
        </div>
      ) : (
        <>
          {contactList.length ? (
            <ContactsListing
              onScroll={onScroll}
              listInnerRef={listInnerRef}
              userList={filteredContactList.length ? filteredContactList : []}
              showEvenData={props?.isEven}
            />
          ) : (
            <Card className="w-50 m-auto shadow-sm border-0 text-center">
              <Card.Body>
                <h5 className="py-4 mb-2">
                  {contactsRequestStatus?.errorMessage || "Unable to Load Data"}
                </h5>
                {contactsRequestStatus?.errorCode !== 200 && (
                  <Button
                    variant="A"
                    className="A text-white"
                    onClick={() => fetchData(props?.searchValue)}
                  >
                    Retry
                  </Button>
                )}
              </Card.Body>
            </Card>
          )}
          {contactsRequestStatus.isLoadingContacts &&
            contactList.length > 0 && (
              <div className="position-absolute text-center start-0 end-0 text-gray">
                Loading...
              </div>
            )}
        </>
      )}

      {contactsRequestStatus?.errorCode &&
        contactsRequestStatus?.errorMessage && (
          <CustomModal
            show={contactsRequestStatus.hasError}
            onClose={hideModal}
            isFullWidth="md"
            cancelBtnTitle="Okay"
          >
            <Row>
              <Col xs={12}>
                <h5 className="text-danger text-center">
                  {contactsRequestStatus?.errorMessage}
                </h5>
              </Col>
              <Col xs={12} className="mt-4 text-center">
                Something went wrong, we are unable to complete your request
                right now. Please try again later.
              </Col>
            </Row>
          </CustomModal>
        )}
    </>
  );
}

export default ContactsListingContainer;
