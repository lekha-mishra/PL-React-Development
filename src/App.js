import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Tab from "react-bootstrap/Tab";
import { useState } from "react";
import CustomModal from "./Component/Modal";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ContactsListingContainer from "./Component/ContactsListingContainer";

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const [showCantactModal, setShowCantactModal] = useState({
    openModal: false,
    activeInfoType: "all-contacts",
    countryId: "",
  });

  const [searchAction, setSearchAction] = useState({
    value: "",
    enterPressed: false,
    isEven: false,
  });

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      // call your method here
      setSearchAction({
        ...searchAction,
        enterPressed: true,
        value: e.target.value,
      });
    }
  };

  const hideModal = () => {
    navigate("/");
    setShowCantactModal({ ...showCantactModal, openModal: false });
  };

  return (
    <>
      <Container className="vh-100 d-flex justify-content-center align-items-center flex-column h-100 g-2">
        <Row className="g-4 text-center">
          <Col xs="12">
            <Link
              className="btn btn-lg px-5 py-3 A text-white"
              to="/modal/A"
              state={{ previousLocation: location }}
              onClick={() => {
                setShowCantactModal({
                  ...showCantactModal,
                  openModal: true,
                  activeInfoType: "all-contacts",
                  countryId: "",
                });
              }}
            >
              A
            </Link>
          </Col>
          <Col xs="12">
            <Link
              className="btn btn-lg px-5 py-3 B text-white"
              to="/modal/B"
              state={{ previousLocation: location }}
              onClick={() => {
                setShowCantactModal({
                  ...showCantactModal,
                  openModal: true,
                  activeInfoType: "us-contacts",
                  countryId: 226,
                });
              }}
            >
              B
            </Link>
          </Col>
        </Row>
      </Container>
      <CustomModal
        show={showCantactModal.openModal}
        onClose={hideModal}
        footerLeftPanelChildren={
          <Form.Check
            type="checkbox"
            id="only-even"
            label="Only even"
            onChange={(e) =>
              setSearchAction({
                ...searchAction,
                isEven: e.target.checked,
              })
            }
          />
        }
      >
        <Tab.Container
          id="left-tabs-example"
          defaultActiveKey={showCantactModal.activeInfoType}
        >
          <Row className="h-100">
            <Col xs={12}>
              <Row>
                <Col>
                  <Nav variant="pills" className="flex">
                    <Nav.Item>
                      <Nav.Link
                        eventKey="all-contacts"
                        className="A"
                        onClick={() =>
                          setShowCantactModal({
                            ...showCantactModal,
                            activeInfoType: "all-contacts",
                            countryId: "",
                          })
                        }
                      >
                        <Link
                          className="text-white btn A"
                          to="/modal/A"
                          state={{ previousLocation: location }}
                        >
                          All Contacts
                        </Link>
                      </Nav.Link>
                    </Nav.Item>

                    <Nav.Item>
                      <Nav.Link
                        eventKey="us-contacts"
                        className="B"
                        onClick={() =>
                          setShowCantactModal({
                            ...showCantactModal,
                            activeInfoType: "us-contacts",
                            countryId: 226,
                          })
                        }
                      >
                        <Link
                          className="text-white btn B"
                          to="/modal/B"
                          state={{ previousLocation: location }}
                        >
                          US Contacts
                        </Link>
                      </Nav.Link>
                    </Nav.Item>
                  </Nav>
                </Col>
                <Col xs="auto">
                  <Form.Control
                    as="input"
                    placeholder="Search..."
                    onChange={(e) =>
                      setSearchAction({
                        ...searchAction,
                        value: e.target.value,
                        enterPressed: false,
                      })
                    }
                    onKeyDown={handleKeyPress}
                  />
                </Col>
              </Row>
            </Col>
            <Col xs={12}>
              <Tab.Content className="pt-4">
                <Tab.Pane eventKey={showCantactModal.activeInfoType}>
                  <ContactsListingContainer
                    countryId={showCantactModal.countryId}
                    searchValue={searchAction.value}
                    isEnterPressed={searchAction.enterPressed}
                    isEven={searchAction.isEven}
                  />
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </CustomModal>
    </>
  );
}

export default App;
