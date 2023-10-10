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
  UncontrolledTooltip
} from "reactstrap";
import Flatpickr from "react-flatpickr"
import Select from 'react-select'
import axios from 'axios'
import { Tooltip as ReactTooltip } from "react-tooltip";
import UILoader from '@components/ui-loader'
import { Link } from "react-router-dom";
import "flatpickr/dist/themes/airbnb.css";
// ** Third Party Components
import "cleave.js/dist/addons/cleave-phone.us";
import MUIDataTable from "mui-datatables"
import moment from "moment"
import { Search, MoreVertical, Trash, Eye, Edit } from 'react-feather'
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
const EcData = () => {
  const [data, setData] = useState([])
  const [first, setFirst] = useState(0)
  const [last, setLast] = useState(100)
  const [block, setBlock] = useState(false)
  const [filter, setFilter] = useState("")
  const [startDate, setStartDate] = useState(moment().subtract(30, 'days').format("YYYY-MM-DD"))
  const [endDate, setEndDate] = useState(moment().format("YYYY-MM-DD"))

  const allEcData = () =>{
    setBlock(true)
    axios.post('/getallvoters',null, {
      params: {
        first: first,
        limit: last,
        filter: filter,
      },
    }).then(res => {
    setBlock(false)
    console.log("res", res)
    setData(res.data?.data?.content)
    })
    }
    const columns = [
      {
        name: "nationalId",
        label: "NID",
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
        label: "Name English",
        searchable: true,
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "name",
        label: "Name Bangla",
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
        name: "father",
        label: "Father Name",
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
        name: "mother",
        label: "Mother Name",
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
        name: "dateOfBirth",
        label: "Date Of Birth",
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
        name: "occupation",
        label: "Profession",
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
          name: "id",
          label: "Action",
          options: {
            filter: true,
            sort: false,
            width: 100,
            customBodyRenderLite: (dataIndex) => {
              const alldata = data[dataIndex]
              return (
                  <div style={{ width: "auto"}}>
                  <div style={{ display: "inline-flex" }}>
                    <div style={{padding:"2px"}} className="btn btn-sm" >
                    <Badge id="details" color={'secondary'} className="text-capitalize" style={{cursor:"pointer"}} >
                    <span ><Eye /></span>
                    </Badge>
                    <UncontrolledTooltip
                        placement="top"
                        target="details"
                      > View</UncontrolledTooltip>
                    </div>
                    <div style={{padding:"2px"}} className="btn btn-sm" >
                      <Link
                        to={`/admin/ec-user-update`}
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
    const branchOption = [
        {value: null, label: "Select Branch"},
        {value: 1, label: "Mirpur Branch"},
        {value: 2, label: "Gulshan 1 Branch"},
        {value: 3, label: "Dhanmondi Branch"},
        {value: 4, label: "Rampura Branch"},
      ]    
    const statusOption = [
        {value: null, label: "Select Status"},
        {value: 1, label: "Verification Complete"},
        {value: 2, label: "Verification Pending"}
      ]    
    const options = {
    filterType: "none",
    responsive: "standard",
    filter: false,
    search: false,
    selectableRows: "none",
    }

  useEffect(()=> {
    localStorage.setItem("accountType", "0")
  }, [])
  return (
    <UILoader blocking={block}>
    <Card>
      <CardHeader className="border-bottom">
        <CardTitle tag="h4">Electrion Commission User List</CardTitle>
      </CardHeader>
      <CardBody className="my-2 py-50">
      <Row
        style={{ marginBottom: "10px", paddingLeft: "30px", padding: "15px" }}
      >
        <Col md="2">
        <label>Start Date</label>
          <Flatpickr
            style={{ backgroundColor:"#fff", opacity: "1", padding:"9px 12px" }}
            value={startDate}
            id="date-time-picker"
            className="form-control"
            onChange={(date) => {
              setStartDate(date[0])
            }}
          />
        </Col>
        <Col md="2">
        <label>End Date</label>
          <Flatpickr
            options={{
              dateFormat: "Y-m-d"
            }}
            style={{ backgroundColor:"#fff", opacity: "1", padding:"9px 12px" }}
            value={endDate}
            data-enable-time
            id="date-time-picker"
            className="form-control"
            readonly={false}
            onChange={(date) => {
              setEndDate(date[0])
            }}
          />
        </Col>
        <Col md="2">
        <FormGroup className="mbb">
            <label>Branch Name</label>
          <Select
          className='react-select'
          styles={styles}
          classNamePrefix='select'
          placeholder="Select Branch"
          // defaultValue={currencyOptions[0]}
          options={branchOption}
          isClearable={false}
          onChange={(e) => setState({...state, branch: e.value})}
          maxMenuHeight={140}
          
           />
        </FormGroup>
        </Col>
        <Col md="2">
        <FormGroup className="mbb">
         <label>Select Status</label>
          <Select
          className='react-select'
          styles={styles}
          classNamePrefix='select'
          placeholder="Select Stock"
          // defaultValue={currencyOptions[0]}
          options={statusOption}
          isClearable={false}
          onChange={(e) => setState({...state, status: e.value})}
          maxMenuHeight={140}
          
           />
        </FormGroup>
        </Col>
        <Col md="2" style={{ textAlign: "left" }}>
          <Button.Ripple
            size="12"
            style={{marginTop:"18px"}}
            onClick={() => {
              getSearch()
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
            <Button style={{marginTop:"18px",}} tag={Link} to="/admin/ec-user-create" color="primary" className=''> + Add New </Button>
        </Col>
      </Row>
      <MUIDataTable
        title={"Electrion Commission User List"}
        data={data}
        columns={columns}
        options={options}
        />
      </CardBody>
    </Card>
    </UILoader>
  );
};

export default EcData;