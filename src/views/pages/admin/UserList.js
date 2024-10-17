// ** Reactstrap Imports
// ** React Imports
import { useState, useEffect } from "react";
import {
  Row,
  Col,
  Badge,
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Button,
  FormGroup,
  Input,
  UncontrolledTooltip,
  Modal,
  ModalHeader,
  ModalBody,
  Label,
} from "reactstrap";
import Flatpickr from "react-flatpickr"
import Select from 'react-select'
import axios from 'axios'
import { Link, json } from "react-router-dom";
import "flatpickr/dist/themes/airbnb.css";
// ** Third Party Components
import "cleave.js/dist/addons/cleave-phone.us";
import MUIDataTable from "mui-datatables"
import moment from "moment"
import { Search, UserCheck, Trash, Eye, Edit, Settings, UserX } from 'react-feather'
import UILoader from '@components/ui-loader'
// ** Styles
import "@styles/react/libs/react-select/_react-select.scss"
import toast from 'react-hot-toast'
import Swal from "sweetalert2"

const styles = {
  control: base => ({
    ...base,
    fontFamily: "Times New Roman"
  }),
  menu: base => ({
    ...base,
    fontSize: 11,
    lineHeight: 1
  })
}
const UserList = () => {
  const [data, setData] = useState([])
  const [first, setFirst] = useState(0)
  const [last, setLast] = useState(100)
  const [filter, setFilter] = useState("")
  const [block, setBlock] = useState(false)
  const [userId, setUserId] = useState(null)
  const [fullName, setFullName] = useState('')
  const [propertyValue, setPropertyValue] = useState("false")
  const [propertyName, setProperyName] = useState("isDeleted")
  const [userData, setUserData] = useState(null)
  const [roleName, setRoleName] = useState(null)
  const [basicModal, setBasicModal] = useState(false);
  const [basicModalPassword, setBasicModalPassword] = useState(false);
  const [basicModalUserName, setBasicModalUserName] = useState(false);
  const [passworChangeData, setPassworChangeData] = useState(null);
  const [newPassword, setNewPassword] = useState(null);
  const [currentUsername , setCurrentUsername ] = useState('');
  const [newUsername , setNewUsername ] = useState('');

  const searchEcData = () => {
    const senddata = {
      propertyName: propertyName,
      propertyValue: propertyValue
    }
    setBlock(true)
    axios.post(`/user-list/propertyvalue?first=${first}&limit=${last}&filter=${filter}`, senddata, {
    }).then(res => {
      setBlock(false)
      setData(res.data.data)
    })
      .catch(err => console.log(err))
  }

  const changePassword = () => {
    const datetosend = {
      ...passworChangeData,
      passwordSt: newPassword

    }
    setBlock(true)
    axios.post('/updateuser', datetosend)
      .then(res => {
        setBlock(false)
        toast.success('Password Update Successful')
        setBasicModalPassword(!basicModalPassword)
        searchEcData()
        // setData(res.data.data)
        console.log("res.data", res.data)
      })
      .catch(err => {
        setBlock(false)
        toast.error(err.data?.result?.errorMsg)
      })
  }
  const changeUsername = () => {
    const datetosend = {
      oldUserName: currentUsername,
      newUserName: newUsername
    }
    setBlock(true)
    axios.post('/updateUserName', datetosend)
      .then(res => {
        setBlock(false)
        toast.success('Username Update Successful')
        setBasicModalUserName(!basicModalUserName)
        searchEcData()
        // setData(res.data.data)
        console.log("res.data", res.data)
      })
      .catch(err => {
        setBlock(false)
        toast.error(err.data?.result?.errorMsg)
      })
  }
  const callRoleUpdate = () => {
    const datetosend = {
      userId: userId,
      roleNameUpdate: roleName

    }
    setBlock(true)
    axios.put('/updaterolename', datetosend)
      .then(res => {
        setBlock(false)
        toast.success('Role Update Successful')
        setBasicModal(!basicModal)
        searchEcData()
        // setData(res.data.data)
        console.log("res.data", res.data)
      })
  }
  const changeStatus = (e, id) => {
    const sentdata = {
      userId: id,
      lockStatus: !e,
    }
    Swal.fire({
      title: `Are you sure ?`,
      text: `You want to Change User Status`,
      type: "wanring",
      icon: 'warning',
      footer: "",
      showCancelButton: true,
      confirmButtonText: 'Yes',
      customClass: {
        cancelButton: 'btn btn-danger ms-1',
        confirmButton: 'btn btn-primary'
      }
    }).then((result) => {
      if (result.isConfirmed === true) {
        setBlock(true)
        axios.put(`/updatelockstatus`, sentdata).then((res) => {
          if (res.data.result.error === false) {
            setBlock(false)
            toast.success("Status Update Successfully")
            searchEcData()
          } else if (res.data.result.error === true) {
            setBlock(false)
            toast.error(res.data.result.errorMsg)
          }
        }).catch((e) => {
          setBlock(false)
          toast.error(e.data.result.errorMsg)
        })
      }
    })
  }
  const changeUser = (e) => {
    const sentdata = {
      ...e,
      isLocked: true,
      isDeleted: true,
    }
    Swal.fire({
      title: `Are you sure ?`,
      text: `You want to Delete this User?`,
      type: "wanring",
      icon: 'warning',
      footer: "",
      showCancelButton: true,
      confirmButtonText: 'Yes',
      customClass: {
        cancelButton: 'btn btn-danger ms-1',
        confirmButton: 'btn btn-primary'
      }
    }).then((result) => {
      if (result.isConfirmed === true) {
        setBlock(true)
        axios.post(`/updateuser`, sentdata).then((res) => {
          if (res.data.result.error === false) {
            setBlock(false)
            toast.success("User Delete Successfully")
            searchEcData()
          } else if (res.data.result.error === true) {
            setBlock(false)
            toast.error(res.data.result.errorMsg)
          }
        }).catch((e) => {
          setBlock(false)
          toast.error(e.data.result.errorMsg)
        })
      }
    })
  }
  const paymentOption = [
    { value: 'maker', label: "Maker" },
    { value: 'checker', label: "Checker" },
    { value: 'admin', label: "Admin" }
  ]
  const columns = [
    {
      name: "fullName",
      label: "Name",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value) => {
          return (
            <div style={{ width: "auto" }}>
              {value !== null && value !== undefined ? value : "N/A"}
            </div>
          );
        },
      },
    },
    {
      name: "username",
      label: "Username",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value) => {
          return (
            <div style={{ width: "auto" }}>
              {value !== null && value !== undefined ? value : "N/A"}
            </div>
          );
        },
      },
    },
    {
      name: "roleName",
      label: "Role",
      searchable: true,
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "mobile",
      label: "Phone",
      searchable: true,
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "email",
      label: "Email",
      searchable: true,
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "employeeDesignation",
      label: "Designation",
      searchable: true,
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "branchName",
      label: "Branch",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value) => {
          return (
            <div>{value !== null && value !== undefined ? value : "N/A"}</div>
          );
        },
      },
    },
    {
      name: "creationDate",
      label: "Create Date",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value) => {
          return (
            <div>{value !== null && value !== undefined ? value : "N/A"}</div>
          );
        },
      },
    },
    {
      name: "isLocked",
      label: "Status",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value) => {
          return (
            <div>{value === false ? <span style={{ background: "#128112", padding: "2px 8px", fontWeight: "bold", color: "white", borderRadius: "10px" }}>Active</span> : <span style={{ background: "#e94704", padding: "2px 8px", fontWeight: "bold", color: "white", borderRadius: "10px" }}>Inactive</span>}</div>
          );
        },
      },
    },
    {
      name: "id",
      label: "Action",
      options: {
        filter: true,
        sort: false,
        customBodyRenderLite: (dataIndex) => {
          const id = data[dataIndex]?.id
          const isDeleted = data[dataIndex]?.isDeleted
          const fullName = data[dataIndex]?.fullName
          const roleName = data[dataIndex]?.roleName
          const lockStatus = data[dataIndex]?.isLocked
          const alldata = data[dataIndex]
          return (
            <div style={{ width: "auto" }}>
              <div style={{ display: "inline-flex" }}>
                {/* <div style={{padding:"2px"}} className="btn btn-sm" >
                  <Eye id="details" size={14} className='me-50' color="green" />
                  <UncontrolledTooltip
                      placement="top"
                      target="details"
                    > View</UncontrolledTooltip>
                  </div> */}
                <div style={{ padding: "2px" }} className="btn btn-sm" >
                  <Link to="/update-user" state={{ userinfo: alldata }}>
                    <Edit id="edit" size={14} className='me-50' color="blue" />
                  </Link>
                  <UncontrolledTooltip
                    placement="top"
                    target="edit"
                  > Edit</UncontrolledTooltip>
                </div>
                <div style={{ padding: "2px" }} className="btn btn-sm" >
                  <span onClick={() => {
                    setUserId(id)
                    setFullName(fullName)
                    setUserData(roleName)
                    setBasicModal(!basicModal)
                  }}><Settings id="roleUpdate" size={14} className='me-50' color="green" /></span>
                  <UncontrolledTooltip
                    placement="top"
                    target="roleUpdate"
                    trigger="hover"
                  > Role Update</UncontrolledTooltip>
                </div>
                <div style={{ padding: "2px" }} className="btn btn-sm" >
                  <span onClick={() => {
                    setUserId(id)
                    setFullName(fullName)
                    setUserData(roleName)
                    changeStatus(lockStatus, id)
                  }}><UserCheck id="statusUpdate" size={14} className='me-50' color="red" /></span>
                  <UncontrolledTooltip
                    placement="top"
                    target="statusUpdate"
                    trigger="hover"
                  > Status Update</UncontrolledTooltip>
                </div>
                <div style={{ padding: "2px" }} className="btn btn-sm" >
                  <span onClick={() => {
                    setPassworChangeData(alldata)
                    setBasicModalPassword(!basicModalPassword)
                  }}><Eye id="changePassword" size={14} className='me-50' color="orange" /></span>
                  <UncontrolledTooltip
                    placement="top"
                    target="changePassword"
                    trigger="hover"
                  > Change Password</UncontrolledTooltip>
                </div>
                <div style={{ padding: "2px" }} className="btn btn-sm" >
                  <span onClick={() => {
                     setCurrentUsername(alldata?.username)
                     setBasicModalUserName(!basicModalUserName)
                  }}><UserX id="username" size={14} className='me-50' color="green" /></span>
                  <UncontrolledTooltip
                    placement="top"
                    target="username"
                    trigger="hover"
                  > Chaneg Username</UncontrolledTooltip>
                </div>
                <div style={{ padding: "2px" }} className="btn btn-sm" >
                  <span onClick={() => {
                    changeUser(alldata)
                  }}><Trash id="delete" size={14} className='me-50' color="red" /></span>
                  <UncontrolledTooltip
                    placement="top"
                    target="delete"
                    trigger="hover"
                  > Delete</UncontrolledTooltip>
                </div>

              </div>
            </div>
          )
        }
      }
    }
  ]


  useEffect(() => {
    searchEcData()
  }, [])
  const userTypeOption = [
    { value: "false", label: "Live User" },
    { value: "true", label: "Deleted User" },
  ]
  const roleOption = [
    { value: "false", label: "Select Role" },
    { value: "admin", label: "Admin" },
    { value: 'maker', label: "Maker" },
    { value: 'checker', label: "Checker" },
  ]
  const options = {
    filterType: "checkbox",
    responsive: "standard",
    filter: false,
    search: false,
    selectableRows: "none",
  }

  return (
    <UILoader blocking={block}>
      <Card>
        <CardHeader className="border-bottom">
          <CardTitle tag="h4">User List</CardTitle>
        </CardHeader>
        <CardBody className="my-2 py-50">
          <Row
            style={{ marginBottom: "10px", paddingLeft: "30px", padding: "15px" }}
          >
            <Col md="3">
              <FormGroup className="mbb">
                <label>Search Data</label>
                <Input
                  id='accountName'
                  className='w-100'
                  type='text'
                  style={{ height: "40px" }}
                  placeholder={"Enter search data"}
                  onChange={e => setFilter(e.target.value.trim())}
                  onKeyDown={(e) => {
                    if (e.keyCode === 13) {
                      searchEcData()
                    }
                  }}
                />
              </FormGroup>
            </Col>
            <Col md="2">
              <FormGroup className="mbb">
                <label>User Type</label>
                <Select
                  className='react-select'
                  styles={styles}
                  classNamePrefix='select'
                  placeholder="Select Role"
                  defaultValue={userTypeOption[0]}
                  options={userTypeOption}
                  isClearable={false}
                  onChange={(e) => {
                    setPropertyValue(e.value)
                  }}
                  maxMenuHeight={140}

                />
              </FormGroup>
            </Col>
            <Col md="3">
              <FormGroup className="mbb">
                <label>User Role</label>
                <Select
                  className='react-select'
                  styles={styles}
                  classNamePrefix='select'
                  placeholder="Select Role"
                  // defaultValue={currencyOptions[0]}
                  options={roleOption}
                  isClearable={false}
                  onChange={(e) => {
                    if (e.value === "false") {
                      setProperyName("isDeleted")
                    } else {
                      setProperyName("roleName")
                    }
                    setPropertyValue(e.value)
                  }}
                  maxMenuHeight={140}

                />
              </FormGroup>
            </Col>
            <Col md="2" style={{ textAlign: "left" }}>
              <Button.Ripple
                size="12"
                style={{ marginTop: "18px", width: "100%" }}
                onClick={() => {
                  searchEcData()
                }}
                outline
                color="primary"
              // onKeyDown={(e) => {
              //   if (e.keyCode === 13) {
              //     this.setState({ page: 0 }, () => {
              //       this.cusSearch();
              //     });
              //   }
              // }}
              >
                <Search size={14} />
                <span className="align-middle ms-25">Search</span>
              </Button.Ripple>
            </Col>
            <Col md="2" style={{ textAlign: "right" }}>
              <Button style={{ marginTop: "18px", }} tag={Link} to="/create-user" color="primary" className=''> + Add New </Button>
            </Col>
          </Row>
          <MUIDataTable
            title={"User List"}
            data={data}
            columns={columns}
            options={options}
          />

        </CardBody>
      </Card>
      <Modal
        className="sm"
        centered={true}
        isOpen={basicModal}
        backdrop={false}
        toggle={() => setBasicModal(!basicModal)}
      >
        <ModalHeader toggle={() => setBasicModal(!basicModal)}>
          Update Role
        </ModalHeader>
        <ModalBody>
          <Row>
            <Col className="mt-1" xl="12" md="12" sm="12" >
              <FormGroup>
                <Label for="selectDocument">User name</Label>
                <Input value={fullName} disabled />
              </FormGroup>
            </Col>
            <Col className="mt-1" xl="12" md="12" sm="12" >
              <FormGroup>
                <Label for="selectDocument">Select Role Type</Label>
                <Select
                  className='react-select'
                  classNamePrefix='Select'
                  id='label'
                  options={paymentOption}
                  defaultValue={paymentOption?.filter(option => option.value === userData)}
                  placeholder="Select Role"
                  onChange={(e) => {
                    setRoleName(e.value)
                  }}
                />
              </FormGroup>
            </Col>
            <Col className="mb-1" xl="12" md="12" sm="12" style={{ textAlign: "center" }}>
              <FormGroup>
                <Button onClick={() => callRoleUpdate()} style={{ marginRight: "10px" }} color='success' >
                  Update
                </Button>
                <Button style={{ marginLeft: "10px" }} color='danger' onClick={() => setBasicModal(!basicModal)}>
                  Cancel
                </Button>
              </FormGroup>
            </Col>
          </Row>
        </ModalBody>
      </Modal>
      <Modal
        className="sm"
        centered={true}
        isOpen={basicModalPassword}
        backdrop={false}
        toggle={() => setBasicModal(!basicModalPassword)}
      >
        <ModalHeader toggle={() => setBasicModalPassword(!basicModalPassword)}>
          Change Password
        </ModalHeader>
        <ModalBody>
          <Row>
            <Col className="mt-1" xl="12" md="12" sm="12" >
              <FormGroup>
                <Label htmlFor="NewPassword">New Password</Label>
                <Input placeholder="Enter New password" onChange={(e) => setNewPassword(e.target.value)} />
              </FormGroup>
            </Col>
            <Col className="mb-1" xl="12" md="12" sm="12" style={{ textAlign: "center" }}>
              <FormGroup>
                <Button onClick={() => changePassword()} style={{ marginRight: "10px" }} color='success' >
                  Update
                </Button>
                <Button style={{ marginLeft: "10px" }} color='danger' onClick={() => setBasicModalPassword(!basicModalPassword)}>
                  Cancel
                </Button>
              </FormGroup>
            </Col>
          </Row>
        </ModalBody>
      </Modal>
      <Modal
        className="sm"
        centered={true}
        isOpen={basicModalUserName}
        backdrop={false}
        toggle={() => setBasicModalUserName(!basicModalUserName)}
      >
        <ModalHeader toggle={() => setBasicModalUserName(!basicModalUserName)}>
          Update Username
        </ModalHeader>
        <ModalBody>
          <Row>
            <Col className="mt-1" xl="12" md="12" sm="12" >
              <FormGroup>
                <Label htmlFor="NewPassword">Current Username</Label>
                <Input placeholder="Enter current username" disabled value={currentUsername} />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="NewPassword">New Username</Label>
                <Input placeholder="Enter new username" onChange={(e) => setNewUsername(e.target.value)} />
              </FormGroup>
            </Col>
            <Col className="mb-1" xl="12" md="12" sm="12" style={{ textAlign: "center" }}>
              <FormGroup>
                <Button onClick={() => changeUsername()} style={{ marginRight: "10px" }} color='success' >
                  Update
                </Button>
                <Button style={{ marginLeft: "10px" }} color='danger' onClick={() => setBasicModalUserName(!basicModalUserName)}>
                  Cancel
                </Button>
              </FormGroup>
            </Col>
          </Row>
        </ModalBody>
      </Modal>
    </UILoader>
  );
};

export default UserList