// ** Reactstrap Imports
// ** React Imports
import { useState } from "react";
import {
  Row,
  Col,
  Badge,
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
import image1 from '@src/assets/images/avatars/1.png'
import image2 from '@src/assets/images/avatars/2.png'
import image3 from '@src/assets/images/avatars/3.png'

const Grantors = () => {

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
      <CardHeader className="border-bottom">
        <CardTitle tag="h4">Guarantors List</CardTitle>
      </CardHeader>
      <CardBody className="my-2 py-50">
      <Row>
        <Col md="12" className="mb-1" style={{textAlign:"right"}}>
        <Link to="/new-grantors" className="btn btn-primary">
        + Add New Guarantor
        </Link>
      </Col>
      </Row>
      <Table responsive>
      <thead>
        <tr>
          <th>Photo</th>
          <th>Applicant Name</th>
          <th>Name</th>
          <th>Father Name</th>
          <th>NID Number</th>
          <th>Phone Number</th>
          <th>Relation</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <img className='me-75' src={image2} alt='angular' height='20' width='20' />
          </td>
          <td><span className='align-middle fw-bold'>Kamal Ahamed</span></td>
          <td><span className='align-middle fw-bold'>Abdul Kalam</span></td>
          <td>Ahamed Sharif</td>
          <td>9088768732423</td>
          <td>01927485676</td>
          <td>Brother</td>
          <td>
            <Badge pill color='light-primary' className='me-1'>
              Active
            </Badge>
          </td>
          <td>
              <Link to="/grantor-edit" >
              <Badge color={'primary'} className="text-capitalize" style={{cursor:"pointer"}} >
                <span >Edit</span>
              </Badge>
              </Link>
          </td>
        </tr>
        <tr>
          <td>
            <img className='me-75' src={image1} alt='angular' height='20' width='20' />
          </td>
          <td><span className='align-middle fw-bold'>Kamal Ahamed</span></td>
          <td><span className='align-middle fw-bold'>Nadia Hassan</span></td>
          <td>Kaser Hossain</td>
          <td>8963453459</td>
          <td>0192792304</td>
          <td>Friend</td>
          <td>
            <Badge pill color='light-primary' className='me-1'>
              Active
            </Badge>
          </td>
          <td>
            <Link to="/grantor-edit" >
              <Badge color={'primary'} className="text-capitalize" style={{cursor:"pointer"}} >
                <span >Edit</span>
              </Badge>
              </Link>
          </td>
        </tr>
        <tr>
          <td>
            <img className='me-75' src={image3} alt='angular' height='20' width='20' />
          </td>
          <td><span className='align-middle fw-bold'>Kamal Ahamed</span></td>
          <td><span className='align-middle fw-bold'>Amirul Islam</span></td>
          <td>Javed Iqbal</td>
          <td>9088768732423</td>
          <td>01723426478</td>
          <td>Wife</td>
          <td>
            <Badge pill color='light-primary' className='me-1'>
              Active
            </Badge>
          </td>
          <td>
            <Link to="/grantor-edit" >
              <Badge color={'primary'} className="text-capitalize" style={{cursor:"pointer"}} >
                <span >Edit</span>
              </Badge>
              </Link>
          </td>
        </tr>
      </tbody>
    </Table>
      </CardBody>
    </Card>
  );
};

export default Grantors;
