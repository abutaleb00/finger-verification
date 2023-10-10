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

const GuarantorsProfile = () => {

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
          <CardTitle tag="h4">Guarantors Information</CardTitle>
        </CardHeader>
      <Table responsive>
      <thead>
        <tr>
          <th>SL</th>
          <th>Company Name</th>
          <th>Guarantor Name</th>
          <th>Designation</th>
          <th>NID Number</th>
          <th>Date of Birth</th>
          <th>Phone Number</th>
          <th>Email</th>
          <th>Address</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><span className='align-middle fw-bold'>1</span></td>
          <td><span className='align-middle fw-bold'>SS International</span></td>
          <td><span className='align-middle fw-bold'>Moin Mustakim</span></td>
          <td><span className='align-middle fw-bold'>Director</span></td>
          <td>123456789</td>
          <td>10-02-1988</td>
          <td>01927485676</td>
          <td>moin@ssinternation.com</td>
          <td>12/3 Mohamadpur, Dhaka</td>
        </tr>
      </tbody>
    </Table>
      </CardBody>
    </Card>
  );
};

export default GuarantorsProfile;