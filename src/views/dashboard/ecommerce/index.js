import { useEffect, useState } from "react";
import { Row, Col, FormGroup, Button, Badge } from "reactstrap";
import UILoader from "@components/ui-loader";
import axios from "axios";
import moment from "moment";
import { Search } from "react-feather";
import Flatpickr from "react-flatpickr";
import Select from "react-select";
import "flatpickr/dist/themes/airbnb.css";
// ** Custom Components
import StatsHorizontal from "@components/widgets/stats/StatsHorizontal";
import "@styles/react/apps/app-users.scss";
import { getUserData } from "@utils";
import { useNavigate } from "react-router-dom";

// ** Icons Imports
import {
  User,
  UserPlus,
  UserCheck,
  UserX,
  Layers,
  Layout,
  Monitor,
} from "react-feather";

const styles = {
  control: (base) => ({
    ...base,
    fontFamily: "Times New Roman",
  }),
  menu: (base) => ({
    ...base,
    fontSize: 11,
    lineHeight: 1,
  }),
};
const EcommerceDashboard = () => {
  const user = getUserData();
  const navigate = useNavigate();
  const [block, setBlock] = useState(false);
  const [countData, setCountData] = useState(null);
  const [branchOption, setBranchOption] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);
  const [userData, setUserData] = useState(null);
  const [state, setState] = useState({
    startDate: moment().subtract(30, "days").format("YYYY-MM-DD"),
    endDate: moment().format("YYYY-MM-DD"),
    branchName:
      JSON.parse(localStorage.getItem("userData"))["roleName"] !== "admin"
        ? JSON.parse(localStorage.getItem("userData"))["branchName"]
        : null,
  });

  const allPendingApplicant = () => {
    const senddata = {
      startDate: moment().format("YYYY-MM-DD"),
      endDate: moment().add(1, "days").format("YYYY-MM-DD"),
      branchName:
        JSON.parse(localStorage.getItem("userData"))["roleName"] !== "admin"
          ? JSON.parse(localStorage.getItem("userData"))["branchName"]
          : null,
      status: null,
      isCompany: null,
      filter: null,
    };
    setBlock(true);
    axios
      .post("/loansecuserwise", senddata)
      .then((res) => {
        if (res.data.result.error === false) {
          setBlock(false);
          const size = 5;
          const items = res.data?.data?.slice(0, size).map((i) => {
            return i;
          });
          setRecentActivity(items);
          console.log("res", items);
          console.log("res.data?.data?", res.data?.data);
          // setData(res.data.data)
        } else if (res.data.result.error === true) {
          setBlock(false);
          toast.error(res.data.result.errorMsg);
        }
      })
      .catch((err) => {
        setBlock(false);
        toast.error(err.data.result.errorMsg);
      });
  };
  const dashboardLifeCount = () => {
    const sendData = {
      startDate: "2023-01-01",
      endDate: moment().format("YYYY-MM-DD"),
      branchName:
        JSON.parse(localStorage.getItem("userData"))["roleName"] !== "admin"
          ? JSON.parse(localStorage.getItem("userData"))["branchName"]
          : null,
    };
    setBlock(true);
    axios
      .post(`/dashboardcounts`, sendData)
      .then((res) => {
        setBlock(false);
        // setData(res.data.data);
        console.log("ress", res?.data?.data);
        setCountData(res?.data?.data);
      })
      .catch((err) => console.log(err));
  };
  const dashboardCount = () => {
    setBlock(true);
    axios
      .post(`/dashboardcounts`, state)
      .then((res) => {
        setBlock(false);
        // setData(res.data.data);
        console.log("ress", res?.data?.data);
        setCountData(res?.data?.data);
      })
      .catch((err) => console.log(err));
  };
  const getBranchList = () => {
    setBlock(true);
    axios
      .post("/getbranches?first=0&limit=200")
      .then((res) => {
        if (res.data.result.error === false) {
          setBlock(false);
          const branchOption = res.data?.data?.content?.map((item) => {
            return { value: item.name, label: item.name };
          });
          setBranchOption([
            { value: null, label: "Select Branch" },
            ...branchOption,
          ]);
        } else if (res.data.result.error === true) {
          setBlock(false);
          toast.error(res.data.result.errorMsg);
        }
      })
      .catch((err) => {
        setBlock(false);
        toast.error(err.data.result.errorMsg);
      });
  };
  useEffect(() => {
    getBranchList();
    allPendingApplicant();
    setUserData(JSON.parse(localStorage.getItem("userData")));
    userData &&
      userData["roleName"] !== "admin" &&
      setState({ ...state, branchName: userData["branchName"] });
    console.log(
      "JSON.parse(localStorage.getItem('userData')['branchName'])",
      JSON.parse(localStorage.getItem("userData"))["branchName"]
    ),
      console.log("state", state),
      dashboardCount();
    if (user?.passwordChange === false) {
      navigate("/user/change-password");
    }

    localStorage.setItem("accountType", "0");
  }, []);
  return (
    <UILoader blocking={block}>
      <div className="app-user-list">
        <Row
          style={{ marginBottom: "10px", paddingLeft: "30px", padding: "15px" }}
        >
          <Col md="3">
            <label>Start Date</label>
            <Flatpickr
              style={{
                backgroundColor: "#fff",
                opacity: "1",
                padding: "9px 12px",
              }}
              value={state?.startDate}
              id="date-time-picker"
              className="form-control"
              onChange={(date) => {
                setState({
                  ...state,
                  startDate: moment(date[0]).format("YYYY-MM-DD"),
                });
              }}
            />
          </Col>
          <Col md="3">
            <label>End Date</label>
            <Flatpickr
              options={{
                dateFormat: "Y-m-d",
              }}
              style={{
                backgroundColor: "#fff",
                opacity: "1",
                padding: "9px 12px",
              }}
              value={state?.endDate}
              data-enable-time
              id="date-time-picker"
              className="form-control"
              readonly={false}
              onChange={(date) => {
                setState({ ...state, endDate: date[0] });
              }}
            />
          </Col>
          <Col md="3">
            <FormGroup className="mbb">
              <label>Branch Name</label>
              <Select
                className="react-select"
                styles={styles}
                options={branchOption}
                placeholder="Select Branch"
                value={
                  JSON.parse(
                    localStorage.getItem("userData")
                  ).roleName?.toLowerCase() !== "admin"
                    ? branchOption?.filter(
                        (v) => v.value === userData["branchName"]
                      )
                    : branchOption?.filter((v) => v.value === state?.branchName)
                }
                onChange={(e) => setState({ ...state, branchName: e.value })}
                maxMenuHeight={140}
                isSearchable
                isDisabled={userData && userData["roleName"] !== "admin"}
              />
            </FormGroup>
          </Col>
          <Col
            md="3"
            style={{ textAlign: "left", display: "flex", alignItems: "center" }}
          >
            <Button.Ripple
              size="12"
              style={{ marginTop: "5px", marginRight: "5px" }}
              onClick={() => {
                dashboardCount();
              }}
              outline
              color="primary"
            >
              <Search size={14} />
              <span className="align-middle ms-25">Search</span>
            </Button.Ripple>
            <Button.Ripple
              size="12"
              style={{ marginTop: "5px" }}
              onClick={() => {
                dashboardLifeCount();
              }}
              outline
              color="info"
            >
              <span className="align-middle ms-25">All Data</span>
            </Button.Ripple>
          </Col>
        </Row>
        <Row>
          <Col lg="3" sm="6">
            <StatsHorizontal
              color="primary"
              statTitle="Total Users"
              icon={<User size={30} />}
              renderStats={
                <h3 className="fw-bolder mb-75" style={{ fontSize: "36px" }}>
                  {countData?.totalUsersCount !== null &&
                  countData?.totalUsersCount !== undefined
                    ? countData?.totalUsersCount
                    : 0}
                </h3>
              }
            />
          </Col>
          <Col lg="3" sm="6">
            <StatsHorizontal
              color="success"
              statTitle="Number of Maker"
              icon={<UserCheck size={30} />}
              renderStats={
                <h3 className="fw-bolder mb-75" style={{ fontSize: "36px" }}>
                  {countData?.makerCount !== null &&
                  countData?.makerCount !== undefined
                    ? countData?.makerCount
                    : 0}
                </h3>
              }
            />
          </Col>
          <Col lg="3" sm="6">
            <StatsHorizontal
              color="secondary"
              statTitle="Number of Checker"
              icon={<UserX size={30} />}
              renderStats={
                <h3 className="fw-bolder mb-75" style={{ fontSize: "36px" }}>
                  {countData?.checkerCount !== null &&
                  countData?.checkerCount !== undefined
                    ? countData?.checkerCount
                    : 0}
                </h3>
              }
            />
          </Col>
          <Col lg="3" sm="6">
            <StatsHorizontal
              color="warning"
              statTitle="Number of Admin"
              icon={<UserPlus size={30} />}
              renderStats={
                <h3 className="fw-bolder mb-75" style={{ fontSize: "36px" }}>
                  {countData?.adminCount !== null &&
                  countData?.adminCount !== undefined
                    ? countData?.adminCount
                    : 0}
                </h3>
              }
            />
          </Col>
        </Row>
        <Row>
          <Col lg="4" sm="12">
            <StatsHorizontal
              color="primary"
              statTitle="Number of New Application"
              icon={<Layers size={30} />}
              renderStats={
                <h3 className="fw-bolder mb-75" style={{ fontSize: "36px" }}>
                  {countData?.newLoans !== null &&
                  countData?.newLoans !== undefined
                    ? countData?.newLoans
                    : 0}
                </h3>
              }
            />
          </Col>
          <Col lg="4" sm="12">
            <StatsHorizontal
              color="secondary"
              statTitle="Number of Pending Application"
              icon={<Layout size={30} />}
              renderStats={
                <h3 className="fw-bolder mb-75" style={{ fontSize: "36px" }}>
                  {countData?.pendingLoans !== null &&
                  countData?.pendingLoans !== undefined
                    ? countData?.pendingLoans
                    : 0}
                </h3>
              }
            />
          </Col>
          <Col lg="4" sm="12">
            <StatsHorizontal
              color="success"
              statTitle="Number of Verified Application"
              icon={<Monitor size={30} />}
              renderStats={
                <h3 className="fw-bolder mb-75" style={{ fontSize: "36px" }}>
                  {countData?.verifiedLoans !== null &&
                  countData?.verifiedLoans !== undefined
                    ? countData?.verifiedLoans
                    : 0}
                </h3>
              }
            />
          </Col>
        </Row>
        <h2>Recent Activity</h2>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Date</th>
              <th>Application No</th>
              <th>Applicant Type</th>
              <th>Applicant Name</th>
              <th>Branch</th>
              <th>Created By</th>
              <th>Completed By</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {recentActivity?.length > 0 &&
              recentActivity?.map((v, i) => {
                return (
                  <tr key={i}>
                    <td>{v?.creationDate}</td>
                    <td>{v?.loanNo}</td>
                    <td>{v?.company === true ? "Company" : "Individual"}</td>
                    <td>
                      {v?.company === false ? v?.applicantName : v?.companyName}
                    </td>
                    <td>{v?.branchName}</td>
                    <td>{v?.createdBy}</td>
                    <td>{v?.modifiedBy}</td>
                    <td>
                      <div style={{ textAlign: "center" }}>
                        <Badge
                          color={
                            v?.status === 1
                              ? "primary"
                              : v?.status === 0
                              ? "warning"
                              : v?.status === 4
                              ? "info"
                              : v?.status === 5
                              ? "secondary"
                              : "success"
                          }
                        >
                          {v?.status === 1
                            ? "Waiting for Approval"
                            : v?.status === 0
                            ? "Pending"
                            : v?.status === 2
                            ? "Verified"
                            : v?.status === 4
                            ? "New Individual"
                            : "New Company"}
                        </Badge>
                      </div>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </UILoader>
  );
};

export default EcommerceDashboard;
