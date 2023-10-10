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
  
  const CompanyProfile = () => {
    const [picker, setPicker] = useState(new Date())
    const [files, setFiles] = useState([])

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
  
    const handleRemoveAllFiles = () => {
      setFiles([])
    }
    const companyOptions = [
      { value: "1", label: "Private Limited Company" },
      { value: "2", label: "Public Limited Company" },
      { value: "3", label: "One-person Company" },
      { value: "4", label: "Companies limited by guarantee" },
      { value: "5", label: "Companies with unlimited liabilities" },
      { value: "6", label: "Sole Proprietorship" },
    ];
    return (
      <Card>
        <CardHeader>
          <CardTitle tag="h4">Company Information</CardTitle>
        </CardHeader>
  
        <CardBody>
          <Row>
            <Col className="mb-1" xl="6" md="6" sm="12">
              <Label className="form-label" for="basicInput">
                Company Name
              </Label>
              <Input
                type="text"
                id="basicInput"
                placeholder="Enter Company Name"
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
              />
            </Col>
            <Col className="mb-1" xl="6" md="6" sm="12">
              <Label className="form-label" for="basicInput">
                Registration Number
              </Label>
              <Input
                type="text"
                id="basicInput"
                placeholder="Enter Company Name"
              />
            </Col>
            <Col className="mb-1" xl="6" md="6" sm="12">
              <Label className="form-label" for="basicInput">
              Registration Date
              </Label>
              <Flatpickr
                value={picker}
                id='range-picker'
                className='form-control'
                onChange={date => setPicker(date)}
                options={{
                mode: 'range',
                defaultDate: ['2020-02-01', '2020-02-15']
                }}
            />
            </Col>
            <Col className="mb-1" xl="6" md="6" sm="12">
              <Label className="form-label" for="basicInput">
                Phone Number
              </Label>
              <Input
                type="text"
                id="basicInput"
                placeholder="Enter Phone Number"
              />
            </Col>
            <Col className="mb-1" xl="6" md="6" sm="12">
              <Label className="form-label" for="basicInput">
                Company Address
              </Label>
              <Input
                type="text"
                id="basicInput"
                placeholder="Enter Address"
              />
            </Col>
            <Col className="mb-1" xl="12" md="12" sm="12">
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
            </Col>
          </Row>
          <Row>
            <Col xl={12} style={{ textAlign: "center", marginTop: "20px" }}>
              <Button
                type="submit"
                color="primary"
                onClick={() => {
                    localStorage.setItem("accountType", "3")
                    window.location.href = "/nid-verify";
                }}
              >
                Submit
              </Button>
            </Col>
          </Row>
        </CardBody>
      </Card>
    );
  };
  export default CompanyProfile;  