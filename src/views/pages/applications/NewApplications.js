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
  UncontrolledTooltip
} from "reactstrap";
import Swal from "sweetalert2"
import Flatpickr from "react-flatpickr"
import Select from 'react-select'
import axios from 'axios'
import { Link, useNavigate } from "react-router-dom";
import "flatpickr/dist/themes/airbnb.css";
// ** Third Party Components
import "cleave.js/dist/addons/cleave-phone.us";
import MUIDataTable from "mui-datatables"
import moment from "moment"
import GrantorList from "../GrantorList";
import DocumentList from "./DocumentList";
import AddDocument from "./AddDocument";
import { Search, Eye, Edit, UserPlus, X, CheckCircle } from 'react-feather'
import UILoader from '@components/ui-loader'
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
const NewApplications = () => {
  const [data, setData] = useState([])
  const navigate = useNavigate()
    const [first, setFirst] = useState(0)
    const [last, setLast] = useState(100)
    const [filter, setFilter] = useState("")
    const [block, setBlock] = useState(false)
    const [state, setState] = useState({
        branch: null,
        status: null
    })
    const searchEcData = () => {
      const send = {
        loanapplication: {
            status: 0
        }
    }
        setBlock(true)
         axios.post('/getloandetailspending', send).then(res => {
          setBlock(false)
          setData(res.data.data)
         })
         .catch(err => console.log(err))
       }
       const allNewApplication = () => {
        const send = {
          loanapplication: {
              status: 0
          }
        }
        setBlock(true)
         axios.post('/getloandetailspending', send).then(res => {
          if(res.data.result.error === false){
            setBlock(false)
            setData(res.data.data)
          } else if(res.data.result.error === true){
            setBlock(false)
            toast.error(res.data.result.errorMsg)
          }
         })
         .catch((err) =>{
          setBlock(false)
            toast.error(err.data.result.errorMsg)
         })
       }
  const updateStatus = (e) => {
    const sentdata = {
        loanapplication: {
            loan_no: e,
            status: 1
        }
    }
    Swal.fire({
        title: `Are you sure ?`,
        text: `You want to Complete this Application`,
        type: "warning",
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
            axios.put(`/updateloanstatus`, sentdata).then((res) => {
                if(res.data.result.error === false){
                    setBlock(false)
                    toast.success("Loan Application Update Successfully")
                    allNewApplication()
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
    const columns = [
      {
        name: "loan_no",
        label: "Application No",
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
        name: "creationDate",
        label: "Date",
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
        name: "nameEn",
        label: "Applicant Name",
        searchable: true,
        options: {
          filter: true,
          sort: true,
          customBodyRenderLite: (dataIndex) => {
            const loanee = data[dataIndex]?.loanee
            return (
                <div style={{ width: "auto"}}>
                {loanee?.nameEn}
              </div>
            )
          }
        },
      },
      {
        name: "nidphoto",
        label: "Photo",
        searchable: true,
        options: {
          filter: true,
          sort: true,
          customBodyRenderLite: (dataIndex) => {
            const loanee = data[dataIndex]?.loanee
            return (
                <div style={{ width: "auto", textAlign:"center"}}>
                <img src={`data:image/jpeg;base64,${loanee?.nidphoto}`} alt='img' style={{width: 30, height: 30, border:"1px solid gray", borderRadius:"2px"}} />
              </div>
            )
          }
        },
      },
      {
        name: "ecjobid",
        label: "EC Ref.",
        searchable: true,
        options: {
          filter: true,
          sort: true,
          customBodyRenderLite: (dataIndex) => {
            const loanee = data[dataIndex]?.loanee
            return (
                <div style={{ width: "auto"}}>
                {loanee?.ecjobid}
              </div>
            )
          }
        },
      },
      {
        name: "nationalId",
        label: "NID",
        searchable: true,
        options: {
          filter: true,
          sort: true,
          customBodyRenderLite: (dataIndex) => {
            const loanee = data[dataIndex]?.loanee
            return (
                <div style={{ width: "auto"}}>
                {loanee?.nationalId}
              </div>
            )
          }
        },
      },
      {
        name: "lonee",
        label: "Father Name",
        searchable: true,
        options: {
          filter: true,
          sort: true,
          customBodyRenderLite: (dataIndex) => {
            const loanee = data[dataIndex]?.loanee
            return (
                <div style={{ width: "auto"}}>
                {loanee?.father}
              </div>
            )
          }
        },
      },
      {
        name: "lonee",
        label: "Mother Name",
        searchable: true,
        options: {
          filter: true,
          sort: true,
          customBodyRenderLite: (dataIndex) => {
            const loanee = data[dataIndex]?.loanee
            return (
                <div style={{ width: "auto"}}>
                {loanee?.mother}
              </div>
            )
          }
        },
      },
      {
        name: "mobile",
        label: "Mobile",
        searchable: true,
        options: {
          filter: true,
          sort: true,
          customBodyRenderLite: (dataIndex) => {
            const loanee = data[dataIndex]?.loanee
            return (
                <div style={{ width: "auto"}}>
                {loanee?.mobile}
              </div>
            )
          }
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
        name: "createdBy",
        label: "Created By",
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
        name: "status",
        label: "Status",
        options: {
          filter: true,
          sort: true,
          customBodyRender: (value) => {
            return (
              <div style={{textAlign:"center"}}><Badge color="warning">{value === 0 ? "Pending" : "Approved"}</Badge></div>
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
            const alldata = data[dataIndex]
            const guarantors = data[dataIndex]?.guarantors
            const id = data[dataIndex]?.loan_no
            const uniquereference = data[dataIndex]?.uniquereference
            console.log("alldata", alldata)
            return (
                <div style={{ width: "auto"}}>
                <div style={{ display: "inline-flex" }}>
                  <div style={{padding:"2px"}} className="btn btn-sm" >
                  <Link
                    id='button2'
                      to={`/view-application`}
                      state={{ userinfo: alldata }}
                  >
                    <Badge id="details" color={'secondary'} className="text-capitalize" style={{cursor:"pointer"}} >
                    <span ><Eye /></span>
                    </Badge>
                  </Link>
                  {/* <Eye id="details" size={14} className='me-50' color="green" /> */}
                  <UncontrolledTooltip
                      placement="top"
                      target="details"
                    > View</UncontrolledTooltip>
                  </div>
                  <div style={{padding:"2px"}} className="btn btn-sm" >
                  <Link
                    id='button2'
                      to={`/edit-application`}
                      state={{ userinfo: alldata }}
                  >
                    <Badge id="edit" color={'info'} className="text-capitalize" style={{cursor:"pointer"}} >
                   <span ><Edit /></span>
                  </Badge>
                  </Link>
                  <UncontrolledTooltip
                      placement="top"
                      target="edit"
                    > Edit</UncontrolledTooltip>
                  </div>
                  <div style={{padding:"2px"}} className="btn btn-sm" >
                  {/* <Link
                      to={`/guarantor-nid-verify`}
                      state={{ loanee: alldata }}
                  > */}
                  <Badge 
                  onClick={() => {
                    localStorage.setItem("lonee", JSON.stringify(alldata))
                    navigate('/guarantor-nid-verify')}} id="adduser" color={'warning'} className="text-capitalize" style={{cursor:"pointer"}} >
                   <span ><UserPlus /></span>
                  </Badge>
                  <UncontrolledTooltip
                      placement="top"
                      target="adduser"
                      trigger="hover"
                    > Add Guarantor</UncontrolledTooltip>
                    {/* </Link> */}
                  </div>
                  <div style={{padding:"2px"}} className="btn btn-sm" >
                  <GrantorList guarantors={guarantors} />
                  </div>
                  <div style={{padding:"2px"}} className="btn btn-sm" >
                  <AddDocument uniquereference={uniquereference} />
                  </div>
                  <div style={{padding:"2px"}} className="btn btn-sm" >
                  <DocumentList uniquereference={uniquereference} />
                  </div>
                  {((JSON.parse(localStorage.getItem('userData')).roleName)?.toLowerCase() === 'maker') &&
                  <div style={{padding:"2px"}} className="btn btn-sm" >
                  <Badge onClick={() => updateStatus(id)} id="Complete" color={'success'} className="text-capitalize" style={{cursor:"pointer"}} >
                   <span ><CheckCircle /></span>
                  </Badge>
                  <UncontrolledTooltip
                      placement="top"
                      target="Complete"
                      trigger="hover"
                    > Complete</UncontrolledTooltip>
                  </div>
                   }
                </div>
              </div>
            )
          }
        }
      }
    ]

 useEffect(() => {
  allNewApplication()
}, [])  
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
        <CardTitle tag="h4">New Application List</CardTitle>
      </CardHeader>
      <CardBody className="my-1 py-50">
      {/* <Row
        style={{ marginBottom: "10px", paddingLeft: "30px", padding: "15px" }}
      >
        <Col md="6">
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
              searchEcData()
              }
           }}
           />
        </FormGroup>
        </Col>
        <Col md="2" style={{ textAlign: "left" }}>
          <Button.Ripple
            size="12"
            style={{marginTop:"19px", width:"100%"}}
            onClick={() => {
              searchEcData()
            }}
            outline
            color="primary"
          >
            <Search size={14} />
            <span className="align-middle ms-25">Search</span>
          </Button.Ripple>
        </Col>
      </Row> */}
      <MUIDataTable
        title={"New Application List"}
        data={data}
        columns={columns}
        options={options}
        />
      
      </CardBody>
    </Card>
    </UILoader>
  );
};

export default NewApplications