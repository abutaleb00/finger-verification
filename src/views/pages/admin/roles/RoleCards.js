// ** React Imports
import { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import UILoader from "@components/ui-loader";
import axios from "axios";
import toast from "react-hot-toast";

// ** Reactstrap Imports
import {
  Row,
  Col,
  Card,
  Label,
  Input,
  Table,
  Modal,
  Button,
  CardBody,
  ModalBody,
  ModalHeader,
  FormFeedback,
  UncontrolledTooltip,
} from "reactstrap";

// ** Third Party Components
import { Copy, Info } from "react-feather";
import { useForm, Controller } from "react-hook-form";

// ** Custom Components
import AvatarGroup from "@components/avatar-group";

// ** FAQ Illustrations
import illustration from "@src/assets/images/illustration/faq-illustrations.svg";

// ** Vars
const data = [
  {
    totalUsers: 4,
    title: "Admin",
  },
  {
    totalUsers: 4,
    title: "Maker",
  },
  {
    totalUsers: 4,
    title: "Checker",
  },
  {
    totalUsers: 4,
    title: "Branch User",
  },
  {
    totalUsers: 4,
    title: "User",
  },
];
const roleId = [
  {
    name: "Dashboard",
    permissions: [],
  },
  {
    name: "FingerPrintVerify",
    permissions: [],
  },
  {
    name: "EcReturnData",
    permissions: [],
  },
  {
    name: "Grantor",
    permissions: [],
  },
  {
    name: "ViewApplicant",
    permissions: [],
  },
  {
    name: "NewApplications",
    permissions: [],
  },
  {
    name: "PendingApplications",
    permissions: [],
  },
  {
    name: "VerifiedApplications",
    permissions: [],
  },
  {
    name: "ApplicationForm",
    permissions: [],
  },
  {
    name: "Reports",
    permissions: [],
  },
  {
    name: "AdminSetting",
    permissions: [],
  },
];

const RoleCards = () => {
  // ** States
  const [show, setShow] = useState(false);
  const [modalType, setModalType] = useState("admin");
  const [admin, setAdmin] = useState([]);
  const [maker, setMaker] = useState([]);
  const [checker, setChecker] = useState([]);
  const [branchUser, setBranchUser] = useState([]);
  const [user, setUser] = useState([]);
  const [block, setBlock] = useState(false);
  const [checked, setChecked] = useState([]);

  // ** Hooks

  const allRole = () => {
    const send = {
      roleName: null,
    };
    setBlock(true);
    axios
      .post("/rolepages", send)
      .then((res) => {
        if (res.data.result.error === false) {
          setBlock(false);
          let arr1 = roleId;
          let arr2 = res.data.data;
          const admin = arr1.map(
            (item) =>
              arr2?.admin.find((item2) => item.name === item2.name) || item
          );
          setAdmin(admin);
          const maker = arr1.map(
            (item) =>
              arr2.maker.find((item2) => item.name === item2.name) || item
          );
          setMaker(maker);
          const checker = arr1.map(
            (item) =>
              arr2.checker.find((item2) => item.name === item2.name) || item
          );
          setChecker(checker);
          const branchadmin = arr1.map(
            (item) =>
              arr2.branchadmin.find((item2) => item.name === item2.name) || item
          );
          setBranchUser(branchadmin);
          const user = arr1.map(
            (item) =>
              arr2.user.find((item2) => item.name === item2.name) || item
          );
          setUser(user);
        } else if (res.data.result.error === false) {
          setBlock(false);
          toast.error(res.data.result.errorMsg);
        }
      })
      .catch((err) => {
        setBlock(false);
        toast.error(err.data.result?.errorMsg);
      });
  };

  const submitRole = () =>{

      let roles = {
        data: [{
          admin: admin,
          maker: maker,
          checker: checker,
          branchUser: branchUser,
          user: user
        }]
      }
    console.log("allrole", roles)
  }
  useEffect(() => {
    allRole();
  }, []);
  const {
    reset,
    control,
    setError,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: { roleName: "" } });

  const onSubmit = (data) => {
    if (data.roleName.length) {
      setShow(false);
    } else {
      setError("roleName", {
        type: "manual",
      });
    }
  };

  const onReset = () => {
    setShow(false);
    reset({ roleName: "" });
  };

  const handleModalClosed = () => {
    setModalType("admin");
    setValue("roleName");
  };
  const handleAdminCheck = (event) => {
    let updatedList = [...checked];
    console.log("updatedList", updatedList)
    if (event.target.checked) {
      updatedList = [...checked, event.target.value];
    } else {
      updatedList.splice(checked.indexOf(event.target.value), 1);
    }
    setChecked(updatedList);
    console.log("updatedList updatedList", updatedList)
  };
  return (
    <UILoader blocking={block}>
      <Row>
        {data.map((item, index) => {
          return (
            <Col key={index} xl={4} md={6}>
              <Card>
                <CardBody>
                  <div className="d-flex justify-content-between">
                    <span>{`Total ${item.totalUsers} users`}</span>
                    {/* <AvatarGroup data={item.users} /> */}
                  </div>
                  <div className="d-flex justify-content-between align-items-end mt-1 pt-25">
                    <div className="role-heading">
                      <h4 className="fw-bolder">{item.title}</h4>
                      <Link
                        to="/"
                        className="role-edit-modal"
                        onClick={(e) => {
                          e.preventDefault();
                          setModalType(item.title);
                          setShow(true);
                        }}
                      >
                        <small className="fw-bolder">Edit Role</small>
                      </Link>
                    </div>
                    <Link
                      to=""
                      className="text-body"
                      onClick={(e) => e.preventDefault()}
                    >
                      <Copy className="font-medium-5" />
                    </Link>
                  </div>
                </CardBody>
              </Card>
            </Col>
          );
        })}
      </Row>
      <Modal
        isOpen={show}
        onClosed={handleModalClosed}
        toggle={() => setShow(!show)}
        className="modal-dialog-centered modal-lg"
      >
        <ModalHeader
          className="bg-transparent"
          toggle={() => setShow(!show)}
        ></ModalHeader>
        <ModalBody className="px-5 pb-5">
          <div className="text-center mb-4">
            <h1>{modalType} Role Permissions</h1>
          </div>
          <Row tag="form" onSubmit={handleSubmit(onSubmit)}>
            <Col xs={12}>
              <h4 className="mt-2 pt-50">Role Permissions</h4>
              <Table className="table-flush-spacing" responsive>
                <tbody>
                  <tr>
                    <td className="text-nowrap fw-bolder">
                      <span className="me-50"> Administrator Access</span>
                      <Info size={14} id="info-tooltip" />
                      <UncontrolledTooltip
                        placement="top"
                        target="info-tooltip"
                      >
                        Allows a full access to the system
                      </UncontrolledTooltip>
                    </td>
                    <td>
                      <div className="form-check">
                        <Input type="checkbox" id="select-all" checked />
                        <Label className="form-check-label" for="select-all">
                          Select All
                        </Label>
                      </div>
                    </td>
                  </tr>
                  {modalType === "Admin"
                    ? admin?.map((role, index) => {
                        return (
                          <tr key={index}>
                            <td className="text-nowrap fw-bolder">
                              {role.name.replace(/([A-Z])/g, " $1").trim()}
                            </td>
                            <td>
                              <div className="d-flex">
                                <div className="form-check me-3 me-lg-5">
                                  <Input
                                    type="checkbox"
                                    id={`read-${role.permissions}`}
                                    defaultChecked={role.permissions.includes(
                                      "read"
                                    )}
                                    onChange={handleAdminCheck}
                                  />
                                  <Label
                                    className="form-check-label"
                                    for={`read-${role.permissions}`}
                                  >
                                    Read
                                  </Label>
                                </div>
                                <div className="form-check me-3 me-lg-5">
                                  <Input
                                    type="checkbox"
                                    id={`write-${role.permissions}`}
                                    defaultChecked={role.permissions.includes(
                                      "write"
                                    )}
                                  />
                                  <Label
                                    className="form-check-label"
                                    for={`write-${role.permissions}`}
                                  >
                                    Write
                                  </Label>
                                </div>
                                <div className="form-check">
                                  <Input
                                    type="checkbox"
                                    id={`create-${role.permissions}`}
                                  />
                                  <Label
                                    className="form-check-label"
                                    for={`create-${role.permissions}`}
                                  >
                                    Create
                                  </Label>
                                </div>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    : modalType === "Maker"
                    ? maker?.map((role, index) => {
                        return (
                          <tr key={index}>
                            <td className="text-nowrap fw-bolder">
                              {role.name.replace(/([A-Z])/g, " $1").trim()}
                            </td>
                            <td>
                              <div className="d-flex">
                                <div className="form-check me-3 me-lg-5">
                                  <Input
                                    type="checkbox"
                                    id={`read-${role.permissions}`}
                                    defaultChecked={role.permissions.includes(
                                      "read"
                                    )}
                                  />
                                  <Label
                                    className="form-check-label"
                                    for={`read-${role.permissions}`}
                                  >
                                    Read
                                  </Label>
                                </div>
                                <div className="form-check me-3 me-lg-5">
                                  <Input
                                    type="checkbox"
                                    id={`write-${role.permissions}`}
                                    defaultChecked={role.permissions.includes(
                                      "write"
                                    )}
                                  />
                                  <Label
                                    className="form-check-label"
                                    for={`write-${role.permissions}`}
                                  >
                                    Write
                                  </Label>
                                </div>
                                <div className="form-check">
                                  <Input
                                    type="checkbox"
                                    id={`create-${role.permissions}`}
                                  />
                                  <Label
                                    className="form-check-label"
                                    for={`create-${role.permissions}`}
                                  >
                                    Create
                                  </Label>
                                </div>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    : modalType === "Checker"
                    ? checker?.map((role, index) => {
                        return (
                          <tr key={index}>
                            <td className="text-nowrap fw-bolder">
                              {role.name.replace(/([A-Z])/g, " $1").trim()}
                            </td>
                            <td>
                              <div className="d-flex">
                                <div className="form-check me-3 me-lg-5">
                                  <Input
                                    type="checkbox"
                                    id={`read-${role.permissions}`}
                                    defaultChecked={role.permissions.includes(
                                      "read"
                                    )}
                                    onChange={(e)=>{
                                      if(e.target.checked === true){
                                        role.permissions.push("read")
                                      }
                                      console.log("value", e.target.checked)
                                    }}
                                  />
                                  <Label
                                    className="form-check-label"
                                    for={`read-${role.permissions}`}
                                  >
                                    Read
                                  </Label>
                                </div>
                                <div className="form-check me-3 me-lg-5">
                                  <Input
                                    type="checkbox"
                                    id={`write-${role.permissions}`}
                                    defaultChecked={role.permissions.includes(
                                      "write"
                                    )}
                                  />
                                  <Label
                                    className="form-check-label"
                                    for={`write-${role.permissions}`}
                                  >
                                    Write
                                  </Label>
                                </div>
                                <div className="form-check">
                                  <Input
                                    type="checkbox"
                                    id={`create-${role.permissions}`}
                                  />
                                  <Label
                                    className="form-check-label"
                                    for={`create-${role.permissions}`}
                                  >
                                    Create
                                  </Label>
                                </div>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    : modalType === "Branch User"
                    ? branchUser?.map((role, index) => {
                        return (
                          <tr key={index}>
                            <td className="text-nowrap fw-bolder">
                              {role.name.replace(/([A-Z])/g, " $1").trim()}
                            </td>
                            <td>
                              <div className="d-flex">
                                <div className="form-check me-3 me-lg-5">
                                  <Input
                                    type="checkbox"
                                    id={`read-${role.permissions}`}
                                    defaultChecked={role.permissions.includes(
                                      "read"
                                    )}
                                  />
                                  <Label
                                    className="form-check-label"
                                    for={`read-${role.permissions}`}
                                  >
                                    Read
                                  </Label>
                                </div>
                                <div className="form-check me-3 me-lg-5">
                                  <Input
                                    type="checkbox"
                                    id={`write-${role.permissions}`}
                                    defaultChecked={role.permissions.includes(
                                      "write"
                                    )}
                                  />
                                  <Label
                                    className="form-check-label"
                                    for={`write-${role.permissions}`}
                                  >
                                    Write
                                  </Label>
                                </div>
                                <div className="form-check">
                                  <Input
                                    type="checkbox"
                                    id={`create-${role.permissions}`}
                                  />
                                  <Label
                                    className="form-check-label"
                                    for={`create-${role.permissions}`}
                                  >
                                    Create
                                  </Label>
                                </div>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    : user?.map((role, index) => {
                        return (
                          <tr key={index}>
                            <td className="text-nowrap fw-bolder">
                              {role.name.replace(/([A-Z])/g, " $1").trim()}
                            </td>
                            <td>
                              <div className="d-flex">
                                <div className="form-check me-3 me-lg-5">
                                  <Input
                                    type="checkbox"
                                    id={`read-${role.permissions}`}
                                    defaultChecked={role.permissions.includes(
                                      "read"
                                    )}
                                  />
                                  <Label
                                    className="form-check-label"
                                    for={`read-${role.permissions}`}
                                  >
                                    Read
                                  </Label>
                                </div>
                                <div className="form-check me-3 me-lg-5">
                                  <Input
                                    type="checkbox"
                                    id={`write-${role.permissions}`}
                                    defaultChecked={role.permissions.includes(
                                      "write"
                                    )}
                                  />
                                  <Label
                                    className="form-check-label"
                                    for={`write-${role.permissions}`}
                                  >
                                    Write
                                  </Label>
                                </div>
                                <div className="form-check">
                                  <Input
                                    type="checkbox"
                                    id={`create-${role.permissions}`}
                                  />
                                  <Label
                                    className="form-check-label"
                                    for={`create-${role.permissions}`}
                                  >
                                    Create
                                  </Label>
                                </div>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                </tbody>
              </Table>
            </Col>
            <Col className="text-center mt-2" xs={12}>
              <Button type="submit" onClick={()=> submitRole()} color="primary" className="me-1">
                Submit
              </Button>
              <Button type="reset" outline onClick={onReset}>
                Discard
              </Button>
            </Col>
          </Row>
        </ModalBody>
      </Modal>
    </UILoader>
  );
};

export default RoleCards;
