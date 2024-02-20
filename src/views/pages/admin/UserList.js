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
import Select from 'react-select'
import axios from 'axios'
import { Link, json } from "react-router-dom";
import "flatpickr/dist/themes/airbnb.css";
// ** Third Party Components
import "cleave.js/dist/addons/cleave-phone.us";
import MUIDataTable from "mui-datatables"
import moment from "moment"
import { Search, Settings, UserCheck, Eye, Edit } from 'react-feather'
import UILoader from '@components/ui-loader'
import Swal from "sweetalert2"
import toast from 'react-hot-toast'
// ** Styles
import "@styles/react/libs/react-select/_react-select.scss"


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
    const [roleName, setRoleName] = useState(null)
    const [fullName , setFullName ] = useState('')
    const [basicModal, setBasicModal] = useState(false);
    const [userId, setUserId] = useState(null)
    const [userData , setUserData ] = useState(null)
    const [state, setState] = useState({
        branch: null,
        status: null
    })
       const allEcData = () => {
        setBlock(true)
         axios.get('/user-list',null, {
          params: {
            first: first,
            last: last,
            filter: filter,
          },
         }).then(res => {
          setBlock(false)
          setData(res.data.data)
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
          allEcData()
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
                    if(res.data.result.error === false){
                        setBlock(false)
                        toast.success("Status Update Successfully")
                        allEcData()
                      } else if (res.data.result.error === true){
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
      {value: 'maker', label: "Maker"},
      {value: 'checker', label: "Checker"},
      {value: 'admin', label: "Admin"},
      {value: 'user', label: "User"}
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
        name: "employeeTypeRef",
        label: "Type",
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
        name: "isLocked",
        label: "Status",
        options: {
          filter: true,
          sort: true,
          customBodyRender: (value) => {
            return (
              <div>{value === false ? "Active" : "Locked"}</div>
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
            const alldata = data[dataIndex]
            const fullName = data[dataIndex]?.fullName
            const roleName = data[dataIndex]?.roleName
            const lockStatus = data[dataIndex]?.isLocked
            return (
                <div style={{ width: "auto", textAlign:"center"}}>
                <div style={{ display: "inline-flex" }}>
                  {/* <div style={{padding:"2px"}} className="btn btn-sm" >
                  <Eye id="details" size={14} className='me-50' color="green" />
                  <UncontrolledTooltip
                      placement="top"
                      target="details"
                    > View</UncontrolledTooltip>
                  </div> */}
                  <div style={{padding:"2px"}} className="btn btn-sm" >
                    <Link to="/admin/update-user" state={{ userinfo: alldata }}>
                  <Edit id="edit" size={14} className='me-50' color="blue" />
                  </Link>
                  <UncontrolledTooltip
                      placement="top"
                      target="edit"
                    > Edit</UncontrolledTooltip>
                  </div>
                  <div style={{padding:"2px"}} className="btn btn-sm" >
                    <span onClick={() => {
                      setUserId(id)
                      setFullName(fullName)
                      setUserData(roleName)
                      setBasicModal(!basicModal)}}><Settings id="roleUpdate" size={14} className='me-50' color="green" /></span>
                      <UncontrolledTooltip
                      placement="top"
                      target="roleUpdate"
                      trigger="hover"
                    > Role Update</UncontrolledTooltip>
                  </div>
                  <div style={{padding:"2px"}} className="btn btn-sm" >
                    <span onClick={() => {
                      setUserId(id)
                      setFullName(fullName)
                      setUserData(roleName)
                      changeStatus(lockStatus, id)}}><UserCheck id="statusUpdate" size={14} className='me-50' color="red" /></span>
                      <UncontrolledTooltip
                      placement="top"
                      target="statusUpdate"
                      trigger="hover"
                    > Status Update</UncontrolledTooltip>
                  </div>
                  {/* <div style={{padding:"2px"}} className="btn btn-sm" >
                  <Trash id="delete" size={14} className='me-50' color="red" />
                  <UncontrolledTooltip
                      placement="top"
                      target="delete"
                      trigger="hover"
                    > Delete</UncontrolledTooltip>
                  </div> */}
                </div>
              </div>
            )
          }
        }
      }
    ]
 

 useEffect(() => {
  allEcData()
}, [])   
    const roleOption = [
        {value: null, label: "Select Role"},
        {value: "Admin", label: "Admin"},
        {value: 'Maker', label: "Maker"},
        {value: 'Checker', label: "Checker"},
        {value: 'User', label: "User"},
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
        <Col md="4">
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
          onChange={(e) => setState({...state, status: e.value})}
          maxMenuHeight={140}
          
           />
        </FormGroup>
        </Col>
        <Col md="4">
        <FormGroup className="mbb">
        <label>Search Data</label>
        <Input
          id='accountName'
          className='w-100'
          type='text'
          placeholder={"Enter search data"}
          onChange={e => setFilter(e.target.value.trim())}
          onKeyDown={(e) => {
            if (e.keyCode === 13) {
              allEcData()
              }
           }}
           />
        </FormGroup>
        </Col>
        <Col md="2" style={{ textAlign: "left" }}>
          <Button.Ripple
            size="12"
            style={{marginTop:"18px", width:"100%"}}
            onClick={() => {
              allEcData()
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
        <Col md="2" style={{textAlign:"right"}}>
            <Button style={{marginTop:"18px",}} tag={Link} to="/admin/create-user" color="primary" className=''> + Add New </Button>
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
            <Col className="mb-1" xl="12" md="12" sm="12" style={{textAlign:"center"}}>
            <FormGroup>
            <Button onClick={()=> callRoleUpdate()} style={{marginRight:"10px"}} color='success' >
                Update
              </Button>
              <Button style={{marginLeft:"10px"}} color='danger' onClick={() => setBasicModal(!basicModal)}>
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