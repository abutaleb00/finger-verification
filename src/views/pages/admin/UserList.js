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
    const [state, setState] = useState({
        branch: null,
        status: null
    })
    const searchEcData = () => {
        setBlock(true)
         axios.post('/user-list',null, {
          params: {
            first: first,
            last: last,
            filter: filter,
          },
         }).then(res => {
          setBlock(false)
          setData(res.data.data)
         })
         .catch(err => console.log(err))
       }
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
        name: "locked",
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
    const branchOption = [
        {value: null, label: "Select Branch"},
        {value: 1, label: "Mirpur Branch"},
        {value: 2, label: "Gulshan 1 Branch"},
        {value: 3, label: "Dhanmondi Branch"},
        {value: 4, label: "Rampura Branch"},
      ]    
    const roleOption = [
        {value: null, label: "Select Role"},
        {value: "Admin", label: "Admin"},
        {value: 'Maker', label: "Maker"},
        {value: 'Checker', label: "Checker"},
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
              searchEcData()
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
    </UILoader>
  );
};

export default UserList