// ** Reactstrap Imports
// ** React Imports
import { useState } from "react";
import {
  Row,
  Col,
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Table
} from "reactstrap";
import { Link } from "react-router-dom";
import "flatpickr/dist/themes/airbnb.css";
// ** Third Party Components
import "cleave.js/dist/addons/cleave-phone.us";
// import MUIDataTable from "mui-datatables";
// ** Utils

// ** Styles
import "@styles/react/libs/react-select/_react-select.scss";

const CompanyProfileProcess = () => {

  // const columns = ["Name", "Father Name", "Date of Birth", "Mobile No", "Gender", "Profession", "Relation"];

  // const data = [
  //   ["Abdul Aziz", "Md. Samaz", "16-02-1995", "01926543252", "Male", "Business", "Friend"],
  //   ["Ataur rahman", "Md. Kasem Shikdar", "17-05-1993", "0192353556", "Make", "Service Holder", "Brother"]
  // ];

  // const options = {
  //   filterType: "checkbox",
  //   responsive: "standard",
  //   filter: false,
  //   download: false,
  //   print: false,
  //   selectableRows: "none",
  //   rowsPerPage: 100,
  //   rowsPerPageOptions: [10, 100, 200, 500, 1000],
  // };

  return (
    <Card>
      <CardBody className="my-2 py-50">
      <CardHeader>
          <CardTitle tag="h4">Company Information</CardTitle>
        </CardHeader>
      <Table responsive>
      <thead>
        <tr>
          <th>Borrower Type</th>
          <th>Company Name</th>
          <th>Registration Number</th>
          <th>Registration Date</th>
          <th>Phone Number</th>
          <th>Address</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><span className='align-middle fw-bold'>Corporate</span></td>
          <td><span className='align-middle fw-bold'>SS International</span></td>
          <td>20395969565</td>
          <td>10-02-2017</td>
          <td>01927485676</td>
          <td>12/3 Gulshan 1, Dhaka</td>
        </tr>
      </tbody>
    </Table>
    <Row>
        <Col md="12" className="mb-1" style={{textAlign:"right", marginTop:"20px"}}>
        <Button 
        onClick={() => {
            localStorage.setItem("accountType", "4")
            window.location.href = "/nid-verify";
        }} 
        className="btn btn-primary">
        + Add New Guarantor
        </Button>
      </Col>
      </Row>
      </CardBody>
    </Card>
  );
};

export default CompanyProfileProcess;