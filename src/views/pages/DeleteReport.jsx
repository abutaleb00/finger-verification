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
    Input,
    FormGroup
} from "reactstrap";
import Flatpickr from "react-flatpickr"
import Select from 'react-select'
import { Tooltip as ReactTooltip } from "react-tooltip";
import { Link } from "react-router-dom";
import "flatpickr/dist/themes/airbnb.css";
// ** Third Party Components
import "cleave.js/dist/addons/cleave-phone.us";
import GrantorList from "./GrantorList";
import axios from 'axios'
import { User, Edit, BarChart } from 'react-feather'
import MUIDataTable from "mui-datatables"
import moment from "moment"
import { Search } from 'react-feather'
// ** Styles
import "@styles/react/libs/react-select/_react-select.scss";
import toast from 'react-hot-toast'
import Swal from "sweetalert2"
import UILoader from '@components/ui-loader'
import { getUserData } from '@utils'
import { useNavigate } from 'react-router-dom'


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

const DeleteReport = () => {
    const user = getUserData()
    const navigate = useNavigate()
    const [startDate, setStartDate] = useState(moment().subtract(30, 'days').format("YYYY-MM-DD"))
    const [endDate, setEndDate] = useState(moment().add(1, 'days').format("YYYY-MM-DD"))
    const [block, setBlock] = useState(false)
    const [data, setData] = useState([])
    const [branchOption, setBranchOption] = useState([])
    const [state, setState] = useState({
        startDate: moment().subtract(30, 'days').format("YYYY-MM-DD"),
        endDate: moment().add(1, 'days').format("YYYY-MM-DD"),
        skip: 0,
        limit: 1000,
        filter: null
    })

    const deleteApplicant = () => {
        setBlock(true)
        axios.post('/deletedlists', state).then(res => {
            if (res.data.result.error === false) {
                setBlock(false)
                setData(res.data.data?.ldb)
            } else if (res.data.result.error === true) {
                setBlock(false)
                toast.error(res.data.result.errorMsg)
            }
        })
            .catch((err) => {
                setBlock(false)
                toast.error(err.data.result.errorMsg)
            })
    }

    const columns = [
        {
            name: "loanNo",
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
            name: "loanType",
            label: "Loan Type",
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value) => {
                    return (
                        <div style={{ width: "auto" }}>
                            {value}
                        </div>
                    );
                },
            },
        },
        {
            name: "ecJobId",
            label: "EC Ref No",
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value) => {
                    return (
                        <div style={{ width: "70", wordBreak: "break-all" }}>
                            {value !== '' ? value : 'N/A'}
                        </div>
                    );
                },
            },
        },
        {
            name: "deletedId",
            label: "Old Application ID",
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value) => {
                    return (
                        <div style={{ width: "70", wordBreak: "break-all" }}>
                            {value !== '' ? value : 'N/A'}
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
            name: "nid",
            label: "NID",
            searchable: true,
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
            name: "email",
            label: "Email",
            searchable: true,
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value) => {
                    return (
                        <div style={{ width: "auto" }}>
                            {value !== '' ? value : "N/A"}
                        </div>
                    );
                },
            },
        },
        {
            name: "mobile",
            label: "Mobile",
            searchable: true,
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value) => {
                    return (
                        <div style={{ width: "auto" }}>
                            {value !== '' ? value : "N/A"}
                        </div>
                    );
                },
            },
        },
        {
            name: "branchName",
            label: "Branch",
            searchable: true,
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
            name: "remarks",
            label: "Remarks",
            searchable: true,
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value) => {
                    return (
                        <div style={{ width: "auto" }}>
                            <div style={{ textAlign: "center", color: "red" }}>{value}</div>
                        </div>
                    );
                },
            },
        },
        {
            name: "createdByUser",
            label: "Deleted By",
            searchable: true,
            options: {
                filter: true,
                sort: true,
                customBodyRenderLite: (dataIndex) => {
                    const name = data[dataIndex]?.createdByUser?.username;
                    return (
                        <div style={{ width: "auto" }}>
                            {name !== null && name !== undefined ? name : "N/A"}
                        </div>
                    );
                }
            },
        },

    ]

    const options = {
        filterType: "none",
        responsive: "standard",
        filter: false,
        selectableRows: "none",
    }

    useEffect(() => {
        if (user?.passwordChange === false) {
            navigate('/user/change-password')
        }
        deleteApplicant()
    }, [])
    return (
        <UILoader blocking={block}>
            <Card>
                <CardHeader className="border-bottom">
                    <CardTitle tag="h4">Delete Report</CardTitle>
                </CardHeader>
                <CardBody className="my-2 py-50">
                    <Row
                        style={{ marginBottom: "10px", paddingLeft: "30px", padding: "15px" }}
                    >
                        <Col md="3">
                            <label>Search Data</label>
                            <Input
                                type="text"
                                id="basicInput"
                                placeholder="Enter search"
                                value={state?.filter}
                                onChange={(e) => {
                                    setState({ ...state, filter: e.target.value })
                                }}
                            />
                        </Col>
                        <Col md="3">
                            <label>Start Date</label>
                            <Flatpickr
                                style={{ backgroundColor: "#fff", opacity: "1", padding: "9px 12px" }}
                                value={state?.startDate}
                                id="date-time-picker"
                                className="form-control"
                                onChange={(date) => {
                                    setState({ ...state, startDate: moment(date[0]).format("YYYY-MM-DD") })
                                }}
                            />
                        </Col>
                        <Col md="3">
                            <label>End Date</label>
                            <Flatpickr
                                options={{
                                    dateFormat: "Y-m-d"
                                }}
                                style={{ backgroundColor: "#fff", opacity: "1", padding: "9px 12px" }}
                                value={state?.endDate}
                                data-enable-time
                                id="date-time-picker"
                                className="form-control"
                                readonly={false}
                                onChange={(date) => {
                                    setState({ ...state, endDate: date[0] })
                                }}
                            />
                        </Col>
                        <Col md="3" style={{ textAlign: "left" }}>
                            <Button.Ripple
                                size="12"
                                style={{ marginTop: "17px" }}
                                onClick={() => {
                                    deleteApplicant()
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
                        title={"Delete Report"}
                        data={data}
                        columns={columns}
                        options={options}
                    />

                </CardBody>
            </Card>
        </UILoader>
    );
};

export default DeleteReport;