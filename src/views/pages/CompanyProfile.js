// ** Reactstrap Imports
import { useState, Fragment } from 'react'
import {
    Card,
    CardHeader,
    CardTitle,
    CardBody,
    Label,
    Input,
    Button,
    Row,
    Col,
    ListGroup,
    ListGroupItem
  } from "reactstrap";
  import Select from "react-select"; // eslint-disable-line
  import Flatpickr from 'react-flatpickr'
  import { useDropzone } from 'react-dropzone'
  import { FileText, X, DownloadCloud } from 'react-feather'
  import UILoader from '@components/ui-loader'
  import axios from 'axios'
  import toast from 'react-hot-toast'
  import moment from "moment";
  import '@styles/react/libs/flatpickr/flatpickr.scss'
  import Swal from 'sweetalert2'
  import withReactContent from 'sweetalert2-react-content'
  import { v4 as uuidv4 } from 'uuid'
  import { useNavigate } from "react-router-dom";

  const MySwal = withReactContent(Swal)

  const CompanyProfile = () => {
    const navigate = useNavigate()
    const [files, setFiles] = useState([])
    const [block, setBlock] = useState(false)
    const [state, setState] = useState({
      companyInfo: "",
      companyName: "",
      companyType: 1,
      companyTypeRef: "",
      companyRegNo: "",
      companyRegDate: moment(new Date()).format("DD/MM/YYYY"),
      companyPhone: "",
      companyAddress: "",
      uniquereference: null

    })

    const { getRootProps, getInputProps } = useDropzone({
      multiple: false,
      onDrop: acceptedFiles => {
        setFiles([...files, ...acceptedFiles.map(file => Object.assign(file))])
      }
    })
  
    const renderFilePreview = file => {
      if (file.type.startsWith('image')) {
        return <img className='rounded' alt={file.name} src={URL.createObjectURL(file)} height='28' width='28' />
      } else {
        return <FileText size='28' />
      }
    }
  
    const handleRemoveFile = file => {
      const uploadedFiles = files
      const filtered = uploadedFiles.filter(i => i.name !== file.name)
      setFiles([...filtered])
    }
  
    const renderFileSize = size => {
      if (Math.round(size / 100) / 10 > 1000) {
        return `${(Math.round(size / 100) / 10000).toFixed(1)} mb`
      } else {
        return `${(Math.round(size / 100) / 10).toFixed(1)} kb`
      }
    }
  
    const fileList = files.map((file, index) => (
      <ListGroupItem key={`${file.name}-${index}`} className='d-flex align-items-center justify-content-between'>
        <div className='file-details d-flex align-items-center'>
          <div className='file-preview me-1'>{renderFilePreview(file)}</div>
          <div>
            <p className='file-name mb-0'>{file.name}</p>
            <p className='file-size mb-0'>{renderFileSize(file.size)}</p>
          </div>
        </div>
        <Button color='danger' outline size='sm' className='btn-icon' onClick={() => handleRemoveFile(file)}>
          <X size={14} />
        </Button>
      </ListGroupItem>
    ))
    const companyExitOrApplication = (e) => {
      const sentdata = {
          companyProfile: {
              ...state
          },
          loanee: null,
          guarantors: [],
          coBorrowers: []
      }
      e.preventDefault()
      setBlock(true)
       axios.post('/doescompanyexisits', sentdata).then(res => {
          if(res.data?.result?.error === false){
              setBlock(false)
              companyApplication()
          } else if(res.data?.result?.error === true) {
              setBlock(false)
              handleExitCompany(res.data?.data)
              toast.error(res.data.result.errorMsg)
          }
       })
       .catch(err => {
          setBlock(false)
          console.log("first", err)
          toast.error(err.data?.result?.errorMsg)
       })
     }
    const companyApplication = (e) => {
      const sentdata = {
          companyProfile: {
              ...state
          },
          loanee: null,
          guarantors: [],
          coBorrowers: []
      }
      // e.preventDefault()
      setBlock(true)
       axios.post('/addcompany', sentdata).then(res => {
          if(res.data?.result?.error === false){
            console.log("res.data", res.data)
             localStorage.setItem("company", JSON.stringify(res.data?.data))
             localStorage.setItem("type", 2)
             navigate('/nid-verify')
              setBlock(false)
              toast.success('Successfully Created!')
              setUserinfo(res.data)
          } else if(res.data?.result?.error === true) {
              setBlock(false)
              toast.error(res.data.result.errorMsg)
          }
       })
       .catch(err => {
          setBlock(false)
          toast.error(err.data?.result?.errorMsg)
       })
     }
    const addloanCompany = (e) => {
      const sentdata = {
        loanapplication: {
          loan_no: uuidv4().substring(0,13),
          branchName: null,
          status: 5
      },
          companyProfile: {
              ...e
          },
          loanee: null,
          guarantors: [],
          coBorrowers: []
      }
      // e.preventDefault()
      setBlock(true)
       axios.post('/addloan', sentdata).then(res => {
          if(res.data?.result?.error === false){
              setBlock(false)
              localStorage.setItem("company", JSON.stringify(res.data?.data))
              localStorage.setItem("type", 2)
              navigate('/nid-verify')
              toast.success('Successfully Created!')
              setUserinfo(res.data)
          } else if(res.data?.result?.error === true) {
              setBlock(false)
              toast.error(res.data.result.errorMsg)
          }
       })
       .catch(err => {
          setBlock(false)
          toast.error(err.data?.result?.errorMsg)
       })
     }
     const handleExitCompany = (e) => {
      return MySwal.fire({
        title: 'Company Profile Exists',
        text: "Want to continue loan application?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        customClass: {
          confirmButton: 'btn btn-primary',
          cancelButton: 'btn btn-outline-danger ms-1'
        },
        buttonsStyling: false
      }).then((result) => {
        if (result.isConfirmed) {
          console.log("clicked", result)
          addloanCompany(e)
        }
      })
    }
    const handleRemoveAllFiles = () => {
      setFiles([])
    }
    const companyOptions = [
      { value: 1, label: "Proprietorship" },
      { value: 2, label: "Private Limited Company" },
      { value: 3, label: "Public Limited Company" },
      { value: 4, label: "Foreign Owned Company" },
      { value: 5, label: "Micro Finance Organization" },
      { value: 6, label: "NBFI" },
      { value: 7, label: "Others" },
    ];
    return (
      <UILoader blocking={block}>
      <Card>
        <CardBody>
        <form onSubmit={companyExitOrApplication}>
          <Row style={{marginBottom:"20px", marginTop:"30px", paddingTop:"25px", borderTop:"1px dashed gray"}}>
            <Col className="mb-1" xl="12" md="12" sm="12">
              <Label className="form-label" htmlFor="companyInfo">
              Company Info
              </Label>
              <Input
                type="text"
                id="companyInfo"
                placeholder="Enter Company Info"
                onChange={(e) => {
                  setState({...state, companyInfo: e.target.value})
                  }}
              />
            </Col>
            <Col className="mb-1" xl="6" md="6" sm="12">
              <Label className="form-label" for="basicInput">
                Company Name
              </Label>
              <Input
                type="text"
                id="basicInput"
                placeholder="Enter Company Name"
                onChange={(e) => {
                  setState({...state, companyName: e.target.value})
                  }}
              />
            </Col>
            <Col className="mb-1" xl="6" md="6" sm="12">
              <Label className="form-label" for="basicInput">
              Company Type
              </Label>
              <Select
                isClearable={false}
                placeholder="Select Company Type"
                name="companyOptions"
                options={companyOptions}
                className="react-select"
                classNamePrefix="select"
                onChange={(e) => {
                  setState({...state, companyType: e.value, companyTypeRef: e.label})
                  }}
              />
            </Col>
            <Col className="mb-1" xl="6" md="6" sm="12">
              <Label className="form-label required-field" for="basicInput">
                Registration Number
              </Label>
              <Input
                type="text"
                id="basicInput"
                placeholder="Enter Registration Number"
                onChange={(e) => {
                  setState({...state, companyRegNo: e.target.value})
                  }}
              />
            </Col>
            <Col className="mb-1" xl="6" md="6" sm="12">
              <Label className="form-label required-field" for="basicInput">
              Registration Date
              </Label>
              <Flatpickr
                value={state?.companyRegDate}
                id='range-picker'
                className='form-control invoice-edit-input date-picker'
                onChange={(date) => setState({...state, companyRegDate: moment(date[0]).format("DD/MM/YYYY")})}
                // options={{
                // mode: 'range',
                // defaultDate: ['2020-02-01', '2020-02-15']
                // }}
            />
            </Col>
            <Col className="mb-1" xl="6" md="6" sm="12">
              <Label className="form-label required-field" for="basicInput">
                Phone Number
              </Label>
              <Input
                type="number"
                id="basicInput"
                placeholder="Enter Phone Number"
                onChange={(e) => {
                  setState({...state, companyPhone: e.target.value})
                  }}
              />
            </Col>
            <Col className="mb-1" xl="6" md="6" sm="12">
              <Label className="form-label required-field" for="basicInput">
                Company Address
              </Label>
              <Input
                type="text"
                id="basicInput"
                placeholder="Enter Address"
                onChange={(e) => {
                  setState({...state, companyAddress: e.value})
                  }}
              />
            </Col>
            {/* <Col className="mb-1" xl="12" md="12" sm="12">
            <Label className="form-label" for="basicInput">
              Upload Documents
              </Label>
              <>
                <div {...getRootProps({ className: 'dropzone' })}>
                <input {...getInputProps()} />
                <div className='d-flex align-items-center justify-content-center flex-column' style={{border:"1px dashed #403e3e", padding:"40px 20px"}}>
                    <DownloadCloud size={64} />
                    <h5>Drop Files here or click to upload</h5>
                    <p className='text-secondary'>
                    Drop files here or click{' '}
                    <a href='/' onClick={e => e.preventDefault()}>
                        browse
                    </a>{' '}
                    thorough your machine
                    </p>
                </div>
                </div>
                {files.length ? (
                <Fragment>
                    <ListGroup className='my-2'>{fileList}</ListGroup>
                    <div className='d-flex justify-content-end'>
                    <Button className='me-1' color='danger' outline onClick={handleRemoveAllFiles}>
                        Remove All
                    </Button>
                    <Button color='primary'>Upload Files</Button>
                    </div>
                </Fragment>
                ) : null}
                </>
            </Col> */}
          </Row>
          <Row>
            <Col xl={12} style={{ textAlign: "center", marginTop: "20px" }}>
              <Button
                type="submit"
                color="primary"
              >
                Submit
              </Button>
            </Col>
          </Row>
          </form>
        </CardBody>
      </Card>
      </UILoader>
    );
  };
  export default CompanyProfile;  