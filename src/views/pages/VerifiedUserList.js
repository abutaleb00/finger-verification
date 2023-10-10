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
import Flatpickr from "react-flatpickr"
import Select from 'react-select'
import axios from 'axios'
import { Tooltip as ReactTooltip } from "react-tooltip";
import { Link, json } from "react-router-dom";
import "flatpickr/dist/themes/airbnb.css";
// ** Third Party Components
import "cleave.js/dist/addons/cleave-phone.us";
import MUIDataTable from "mui-datatables"
import moment from "moment"
import { Search, MoreVertical, Trash, Eye, Edit } from 'react-feather'
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
const VerifiedUserList = () => {
  const [data, setData] = useState([])
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
            status: 1
        }
    }
        setBlock(true)
         axios.post('/getloandetailswaiting', send).then(res => {
          setBlock(false)
          setData(res.data.data)
         })
         .catch(err => console.log(err))
       }
       const allEcData = () => {
        const send = {
          loanapplication: {
              status: 1
          }
        }
        setBlock(true)
         axios.post('/getloandetailswaiting', send).then(res => {
          if(res.data.result.error === false){
            setBlock(false)
            setData(res.data.data)
          } else  if(res.data.result.error === false){
            setBlock(false)
            toast.error(res.data.result.errorMsg)
          }
         })
         .catch((err) =>{
          setBlock(false)
            toast.error(err.data.result.errorMsg)
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
        name: "nationalId",
        label: "Mother Name",
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
            return (
                <div style={{ width: "auto"}}>
                <div style={{ display: "inline-flex" }}>
                  <div style={{padding:"2px"}} className="btn btn-sm" >
                  <Eye id="details" size={14} className='me-50' color="green" />
                  <UncontrolledTooltip
                      placement="top"
                      target="details"
                    > View</UncontrolledTooltip>
                  </div>
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
                  <Trash id="delete" size={14} className='me-50' color="red" />
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
  allEcData()
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
        <CardTitle tag="h4">Verified Application List</CardTitle>
      </CardHeader>
      <CardBody className="my-1 py-50">
      <Row
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
      </Row>
      <MUIDataTable
        title={"Verified Application List"}
        data={data}
        columns={columns}
        options={options}
        />
      
      </CardBody>
    </Card>
    </UILoader>
  );
};

export default VerifiedUserList