import React, { useState, useEffect } from "react";
import {
  Page,
  Text,
  PDFDownloadLink,
  View,
  Document,
  StyleSheet,
  PDFViewer,
  Image,
  Font,
} from "@react-pdf/renderer";
import { useLocation, Link, useNavigate } from "react-router-dom";

Font.register({
  family: "kalpurush",
  src: "/kalpurush.ttf",
});
// Font.register({
//   family: "Oswald",
//   src: "https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf",
// });
const BORDER_COLOR = "#000000";
const BORDER_STYLE = "solid";
const COL1_WIDTH = 12.5;
const COLN_WIDTH = (100 - COL1_WIDTH) / 14;
const COL2_WIDTH = 43.75;
const COLN2_WIDTH = (100 - COL2_WIDTH) / 9;
const COL3_WIDTH = 50;
const COLN3_WIDTH = (100 - COL3_WIDTH) / 8;
const styles = StyleSheet.create({
  body: {
    paddingTop: 25,
    paddingBottom: 25,
    paddingHorizontal: 35,
    fontFamily: "kalpurush",
  },
  text: {
    padding: "0px",
    fontSize: 10,
    width: "100%",
  },
  textT: {
    padding: "0px",
    fontSize: 14,
    width: "100%",
    textAlign: "center",
    fontWeight: "bold",
    marginTop: "10px",
  },
  text1: {
    fontSize: 10,
    width: "30%",
    display: "flex",
  },
  text2: {
    fontSize: 10,
    width: "70%",
    display: "flex",
    borderBottom: "1px dotted #000000",
  },
  textf: {
    fontSize: 10,
    width: "70%",
    display: "flex",
    fontFamily: "kalpurush",
    borderBottom: "1px dotted #000000",
    maxLines: 2,
  },
  text3: {
    fontSize: 10,
    width: "33%",
    display: "flex",
  },
  text4: {
    fontSize: 10,
    width: "33%",
    display: "flex",
    borderBottom: "1px dotted #000000",
  },
  text5: {
    fontSize: 10,
    width: "21%",
    display: "flex",
    borderBottom: "1px dotted #000000",
  },
  text6: {
    fontSize: 10,
    width: "50%",
    display: "flex",
    textAlign: "center",
  },
  image: {
    marginVertical: 15,
    marginHorizontal: 85,
    width: "50%",
  },
  image1: {
    marginVertical: 10,
    marginHorizontal: 5,
    width: "45%",
  },
  image2: {
    marginVertical: 0,
    marginHorizontal: 0,
    width: "80%",
    height: 100
  },
  image3: {
    marginVertical: 0,
    marginHorizontal: 0,
    width: "60%",
    // height: 100,
  },
  imageS: {
    marginVertical: 5,
    marginHorizontal: 5,
    width: "95%",
    maxHeight: "100px",
  },
  cusView: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    padding: "7px 0px",
  },
  cusViewImage: {
    flexDirection: "row",
    paddingHorizontal: 10,
    marginHorizontal: 35,
    justifyContent:"center"
  },
  cusView2: {
    display: "flex",
    flexDirection: "row",
    width: "50%",
    padding: "7px 0px",
  },
  cusView1: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    padding: "0px",
    marginTop: "-10px",
    paddingTop: "-10px",
  },
  container: {
    flexDirection: "row",
    "@media max-width: 400": {
      flexDirection: "column",
    },
  },
  leftColumn: {
    flexDirection: "column",
    width: "50%",
    marginLeft: 1,
    marginRight: 20,
    marginTop: 10,
    "@media max-width: 400": {
      width: "50%",
      marginRight: 30,
    },
    "@media orientation: landscape": {
      width: "50%",
      marginRight: 50,
    },
  },
  rightColumn: {
    flexDirection: "column",
    flexGrow: 1,
    flexShrink: 1,
    marginLeft: 10,
    marginRight: 0,
    marginTop: 25,

    "@media max-width: 400": {
      marginTop: 10,
      marginLeft: 5,
    },
  },
  leftColumn1: {
    flexDirection: "column",
    width: "80%",
    marginLeft: 1,
    marginRight: 20,
    marginTop: 10,
    "@media max-width: 400": {
      width: "50%",
      marginRight: 30,
    },
    "@media orientation: landscape": {
      width: "70%",
      marginRight: 50,
    },
  },
  rightColumn1: {
    flexDirection: "column",
    width: "30%",
    flexGrow: 1,
    flexShrink: 1,
    marginLeft: 20,
    marginRight: 10,
    marginTop: 5,

    "@media max-width: 400": {
      marginTop: 10,
      marginLeft: 5,
    },
  },
  table: {
    display: "table",
    width: "auto",
    borderStyle: BORDER_STYLE,
    borderColor: BORDER_COLOR,
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    margin: "auto",
    flexDirection: "row",
  },
  tableCol1Header: {
    width: COL1_WIDTH + "%",
    borderStyle: BORDER_STYLE,
    borderColor: BORDER_COLOR,
    borderBottomColor: "#000",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableColHeader: {
    width: COLN_WIDTH + "%",
    borderStyle: BORDER_STYLE,
    borderColor: BORDER_COLOR,
    borderBottomColor: "#000",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCol1: {
    width: COL1_WIDTH + "%",
    borderStyle: BORDER_STYLE,
    borderColor: BORDER_COLOR,
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCol2: {
    width: COL2_WIDTH + "%",
    borderStyle: BORDER_STYLE,
    borderColor: BORDER_COLOR,
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCol4: {
    width: COL3_WIDTH + "%",
    borderStyle: BORDER_STYLE,
    borderColor: BORDER_COLOR,
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableColCus: {
    borderStyle: BORDER_STYLE,
    borderColor: BORDER_COLOR,
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCol: {
    width: COLN_WIDTH + "%",
    borderStyle: BORDER_STYLE,
    borderColor: BORDER_COLOR,
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCol3: {
    width: COLN2_WIDTH + "%",
    borderStyle: BORDER_STYLE,
    borderColor: BORDER_COLOR,
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCol5: {
    width: COLN3_WIDTH + "%",
    borderStyle: BORDER_STYLE,
    borderColor: BORDER_COLOR,
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCellHeader: {
    margin: 5,
    fontSize: 12,
    fontWeight: 500,
  },
  tableCell: {
    margin: 2,
    fontSize: 7,
  },
  tableCellCus: {
    margin: 2,
    fontSize: 9,
  },
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

const ApplicationForm = (props) => {
  const location = useLocation();
  const [applicantList, setApplicantList] = useState([]);
  const [nomineeList, setNomineeList] = useState([]);
  const [branchname, setBranchname] = useState('');
  const [createdBy, setCreatedBy] = useState('');
  const [approvedBy, setApprovedBy] = useState('');
  const [createdByTime, setCreatedByTime] = useState('');
  const [approvedByTime, setApprovedByTime] = useState('');

  useEffect(() => {
    setApplicantList(location.state?.userinfo?.loanee);
    setBranchname(location.state?.userinfo?.branchName);
    setNomineeList(location.state?.userinfo?.guarantors);
    setCreatedBy(location.state?.userinfo?.createdBy);
    setApprovedBy(location.state?.userinfo?.modifiedBy);
    setCreatedByTime(location.state?.userinfo?.creationDate);
    setApprovedByTime(location.state?.userinfo?.modificationDate);
  }, [location.state?.userinfo]);
  console.log("location", location.state);
  const MyDoc = () => (
    <Document>
      <Page size="A4" style={styles.body}>
      <View style={styles.container}>
      <View style={[styles.cusViewImage,{textAlign:"center", width:"100%"}]}>
          <Image style={styles.image3} src="/logo_sebplc.png" />
      </View>
      </View>
      <View style={styles.container}>
      <View style={[styles.cusView,{textAlign:"center"}]}>
          <Text style={[styles.text,{fontSize: 18}]}>Fingerprint Verification Report</Text>
        </View>
      </View>
        <View style={styles.container}>
          <View style={styles.leftColumn}>
            <Image style={styles.image1} src="/verified.png" />
          </View>
          <View style={styles.rightColumn}>
            <View style={styles.table}>
              <View style={styles.tableRow}>
                <View style={styles.tableCol1}>
                  <Text style={styles.tableCell}>A/C No.</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>1</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>2</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>0</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>1</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>0</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>1</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>8</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>9</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>6</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>2</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>2</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>3</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>4</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>6</Text>
                </View>
              </View>
              <View style={styles.tableRow}>
                <View style={styles.tableCol2}>
                  <Text style={styles.tableCell}>Unique Customer ID Code</Text>
                </View>
                <View style={styles.tableCol3}>
                  <Text style={styles.tableCell}>1</Text>
                </View>
                <View style={styles.tableCol3}>
                  <Text style={styles.tableCell}>1</Text>
                </View>
                <View style={styles.tableCol3}>
                  <Text style={styles.tableCell}>0</Text>
                </View>
                <View style={styles.tableCol3}>
                  <Text style={styles.tableCell}>1</Text>
                </View>
                <View style={styles.tableCol3}>
                  <Text style={styles.tableCell}>2</Text>
                </View>
                <View style={styles.tableCol3}>
                  <Text style={styles.tableCell}>3</Text>
                </View>
                <View style={styles.tableCol3}>
                  <Text style={styles.tableCell}>4</Text>
                </View>
                <View style={styles.tableCol3}>
                  <Text style={styles.tableCell}>3</Text>
                </View>
                <View style={styles.tableCol3}>
                  <Text style={styles.tableCell}>4</Text>
                </View>
              </View>
              <View style={styles.tableRow}>
                <View style={styles.tableCol4}>
                  <Text style={styles.tableCell}>Date</Text>
                </View>
                <View style={styles.tableCol5}>
                  <Text style={styles.tableCell}>0</Text>
                </View>
                <View style={styles.tableCol5}>
                  <Text style={styles.tableCell}>5</Text>
                </View>
                <View style={styles.tableCol5}>
                  <Text style={styles.tableCell}>0</Text>
                </View>
                <View style={styles.tableCol5}>
                  <Text style={styles.tableCell}>9</Text>
                </View>
                <View style={styles.tableCol5}>
                  <Text style={styles.tableCell}>2</Text>
                </View>
                <View style={styles.tableCol5}>
                  <Text style={styles.tableCell}>0</Text>
                </View>
                <View style={styles.tableCol5}>
                  <Text style={styles.tableCell}>2</Text>
                </View>
                <View style={styles.tableCol5}>
                  <Text style={styles.tableCell}>3</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.container}>
          <View style={styles.leftColumn1}>
            <View style={styles.cusView}>
              <Text style={styles.text}>The Manager</Text>
            </View>
            <View style={[styles.cusView, { marginTop: "-10px" }]}>
              <Text style={styles.text}>Southeast Bank PLC</Text>
            </View>
            <View style={[styles.cusView, { marginTop: "-10px" }]}>
              <Text
                style={{
                  display: "flex",
                  flexDirection: "row",
                  width: "auto",
                  borderBottom: "1px solid #000000",
                  fontSize: "9px",
                }}
              >
                {branchname?.toUpperCase()}
              </Text>
              <Text style={[styles.text,{width:"auto", marginLeft:10}]}>Branch</Text>
            </View>
            <View
              style={[
                styles.cusView,
                { marginTop: "10px", marginBottom: "-10px" },
              ]}
            >
              <Text style={styles.text}>Dear Sir,</Text>
            </View>
          </View>
          <View style={styles.rightColumn1}>
            <Image style={styles.image2} height={50} src={applicantList?.nidphoto !== undefined ? `data:image/jpeg;base64,${applicantList?.nidphoto}` : "/user-image.jpg"} />
          </View>
        </View>
        <View style={[styles.cusView, { marginTop: "5px" }]}>
          <Text style={styles.text}>
            I/We am/are applying for a loan in your Branch. I/We furnish below
            information regarding the account and personal details:
          </Text>
        </View>
        <View style={styles.cusView}>
          <Text
            style={{
              textDecoration: "underline",
              fontSize: "10px",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            APPLICANT RELATED INFORMATION
          </Text>
        </View>
        <View style={styles.cusView}>
          <Text
            style={{
              fontSize: "9px",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            EC Referance No: {applicantList?.ecjobid}
          </Text>
        </View>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View
              style={[
                styles.tableColCus,
                { width: "3%", borderBottomWidth: 0 },
              ]}
            >
              <Text style={styles.tableCellCus}>i</Text>
            </View>
            <View style={[styles.tableColCus, { width: "27%" }]}>
              <Text style={styles.tableCellCus}>
                Applicant Name (In Bangla)
              </Text>
            </View>
            <View style={[styles.tableColCus, { width: "70%" }]}>
              <Text style={styles.tableCellCus}>{applicantList?.name} {" "} </Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View
              style={[styles.tableColCus, { width: "3%", borderTopWidth: 0 }]}
            >
              <Text style={styles.tableCellCus}></Text>
            </View>
            <View style={[styles.tableColCus, { width: "27%" }]}>
              <Text style={styles.tableCellCus}>In English Block Letter</Text>
            </View>
            <View style={[styles.tableColCus, { width: "70%" }]}>
              <Text style={styles.tableCellCus}>{applicantList?.nameEn}</Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View
              style={[styles.tableColCus, { width: "3%", borderTopWidth: 0 }]}
            >
              <Text style={styles.tableCellCus}>ii</Text>
            </View>
            <View style={[styles.tableColCus, { width: "27%" }]}>
              <Text style={styles.tableCellCus}>Father Name</Text>
            </View>
            <View style={[styles.tableColCus, { width: "70%" }]}>
              <Text style={styles.tableCellCus}>{applicantList?.father} {" "} </Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View
              style={[styles.tableColCus, { width: "3%", borderTopWidth: 0 }]}
            >
              <Text style={styles.tableCellCus}>iii</Text>
            </View>
            <View style={[styles.tableColCus, { width: "27%" }]}>
              <Text style={styles.tableCellCus}>Mother Name</Text>
            </View>
            <View style={[styles.tableColCus, { width: "70%" }]}>
              <Text style={styles.tableCellCus}>{applicantList?.mother} {" "}</Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={[styles.tableColCus, { width: "3%" }]}>
              <Text style={styles.tableCellCus}>iv</Text>
            </View>
            <View style={[styles.tableColCus, { width: "20%" }]}>
              <Text style={styles.tableCellCus}> NID Number:</Text>
            </View>
            <View style={[styles.tableColCus, { width: "26%" }]}>
              <Text style={styles.tableCellCus}>
                {applicantList?.nationalId}
              </Text>
            </View>
            <View style={[styles.tableColCus, { width: "3%" }]}>
              <Text style={styles.tableCellCus}>v</Text>
            </View>
            <View style={[styles.tableColCus, { width: "20%" }]}>
              <Text style={styles.tableCellCus}>Date of Birth</Text>
            </View>
            <View style={[styles.tableColCus, { width: "28%" }]}>
              <Text style={styles.tableCellCus}>
                {applicantList?.dateOfBirth}
              </Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={[styles.tableColCus, { width: "3%" }]}>
              <Text style={styles.tableCellCus}>vi</Text>
            </View>
            <View style={[styles.tableColCus, { width: "20%" }]}>
              <Text style={styles.tableCellCus}> Gender</Text>
            </View>
            <View style={[styles.tableColCus, { width: "26%" }]}>
              <Text style={styles.tableCellCus}>Male</Text>
            </View>
            <View style={[styles.tableColCus, { width: "3%" }]}>
              <Text style={styles.tableCellCus}>vii</Text>
            </View>
            <View style={[styles.tableColCus, { width: "20%" }]}>
              <Text style={styles.tableCellCus}>Profession</Text>
            </View>
            <View style={[styles.tableColCus, { width: "28%" }]}>
              <Text style={styles.tableCellCus}>
                {applicantList?.occupation}
              </Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={[styles.tableColCus, { width: "3%" }]}>
              <Text style={styles.tableCellCus}>viii</Text>
            </View>
            <View style={[styles.tableColCus, { width: "20%" }]}>
              <Text style={styles.tableCellCus}> Phone No</Text>
            </View>
            <View style={[styles.tableColCus, { width: "26%" }]}>
              <Text style={styles.tableCellCus}>
                {applicantList?.mobile !== null ? applicantList?.mobile : "N/A"}
              </Text>
            </View>
            <View style={[styles.tableColCus, { width: "3%" }]}>
              <Text style={styles.tableCellCus}>ix</Text>
            </View>
            <View style={[styles.tableColCus, { width: "20%" }]}>
              <Text style={styles.tableCellCus}>Email</Text>
            </View>
            <View style={[styles.tableColCus, { width: "28%" }]}>
              <Text style={styles.tableCellCus}>
                {applicantList?.email !== null ? applicantList?.email : "N/A"}
              </Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={[styles.tableColCus, { width: "3%" }]}>
              <Text style={styles.tableCellCus}>x</Text>
            </View>
            <View style={[styles.tableColCus, { width: "27%" }]}>
              <Text style={styles.tableCellCus}>Loan Type</Text>
            </View>
            <View style={[styles.tableColCus, { width: "25%" }]}>
              <Text style={styles.tableCellCus}>Personal</Text>
            </View>
            <View style={[styles.tableColCus, { width: "4%" }]}>
              <Text style={styles.tableCellCus}>xi </Text>
            </View>
            <View style={[styles.tableColCus, { width: "16%" }]}>
              <Text style={styles.tableCellCus}>Currency </Text>
            </View>
            <View style={[styles.tableColCus, { width: "25%" }]}>
              <Text style={styles.tableCellCus}>BDT </Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={[styles.tableColCus, { width: "3%" }]}>
              <Text style={styles.tableCellCus}>xii</Text>
            </View>
            <View style={[styles.tableColCus, { width: "27%" }]}>
              <Text style={styles.tableCellCus}>Mode of Loan Operation</Text>
            </View>
            <View style={[styles.tableColCus, { width: "70%" }]}>
              <Text style={styles.tableCellCus}>INDIVIDUAL</Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={[styles.tableColCus, { width: "3%" }]}>
              <Text style={styles.tableCellCus}>xiii</Text>
            </View>
            <View style={[styles.tableColCus, { width: "27%" }]}>
              <Text style={styles.tableCellCus}> Proposed Loan Amount</Text>
            </View>
            <View style={[styles.tableColCus, { width: "7%" }]}>
              <Text style={styles.tableCellCus}>In Fig</Text>
            </View>
            <View style={[styles.tableColCus, { width: "18%" }]}>
              <Text style={styles.tableCellCus}>5,00,000</Text>
            </View>
            <View style={[styles.tableColCus, { width: "10%" }]}>
              <Text style={styles.tableCellCus}>In Word</Text>
            </View>
            <View style={[styles.tableColCus, { width: "35%" }]}>
              <Text style={styles.tableCellCus}>Five Lac Taka</Text>
            </View>
          </View>
        </View>
        <View style={[styles.cusView, { marginTop: "10px" }]}>
          <Text style={styles.textT}>Guarantor’s information below:</Text>
        </View>
        {nomineeList?.length > 0 &&
          nomineeList?.map((v, i) => {
            return (
              <View key={i}>
                <View style={[styles.cusView1, { width: "100%", marginTop: 10, marginBottom: 10 }]}>
                  <Text style={styles.textH}>
                    Guarantor {i + 1}
                  </Text>
                </View>
        <View style={[styles.cusView1, { width: "30%", marginBottom: 20, marginTop: 20 }]}>
            <Image style={styles.image2} height={50} src={v?.nidphoto !== undefined ? `data:image/jpeg;base64,${v?.nidphoto}` : "/user-image.jpg"} />
          </View>
          <View style={[styles.cusView1, { width: "70%", flexDirection:"row", marginTop:50 }]}>
            <Text
              style={{
                fontSize: "9px",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              EC Referance No: {v?.ecjobid}
            </Text>
        </View>
                <View style={styles.table}>
                  <View style={styles.tableRow}>
                    <View
                      style={[
                        styles.tableColCus,
                        { width: "3%", borderBottomWidth: 0 },
                      ]}
                    >
                      <Text style={styles.tableCellCus}>i</Text>
                    </View>
                    <View style={[styles.tableColCus, { width: "27%" }]}>
                      <Text style={styles.tableCellCus}>
                        Guarantor Name (In Bangla)
                      </Text>
                    </View>
                    <View style={[styles.tableColCus, { width: "70%" }]}>
                      <Text style={styles.tableCellCus}>
                        {v?.name !== null ? v?.name : ""}
                        {"  "}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.tableRow}>
                    <View
                      style={[
                        styles.tableColCus,
                        { width: "3%", borderTopWidth: 0 },
                      ]}
                    >
                      <Text style={styles.tableCellCus}></Text>
                    </View>
                    <View style={[styles.tableColCus, { width: "27%" }]}>
                      <Text style={styles.tableCellCus}>
                        In English Block Letter
                      </Text>
                    </View>
                    <View style={[styles.tableColCus, { width: "70%" }]}>
                      <Text style={styles.tableCellCus}>
                        {v?.nameEn !== null ? v?.nameEn : ""}
                        {"  "}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.tableRow}>
                    <View
                      style={[
                        styles.tableColCus,
                        { width: "3%", borderTopWidth: 0 },
                      ]}
                    >
                      <Text style={styles.tableCellCus}>ii</Text>
                    </View>
                    <View style={[styles.tableColCus, { width: "27%" }]}>
                      <Text style={styles.tableCellCus}>Father Name</Text>
                    </View>
                    <View style={[styles.tableColCus, { width: "70%" }]}>
                      <Text style={styles.tableCellCus}>
                        {" "}
                        {v?.father !== null ? v?.father : ""}
                        {"  "}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.tableRow}>
                    <View
                      style={[
                        styles.tableColCus,
                        { width: "3%", borderTopWidth: 0 },
                      ]}
                    >
                      <Text style={styles.tableCellCus}>iv</Text>
                    </View>
                    <View style={[styles.tableColCus, { width: "27%" }]}>
                      <Text style={styles.tableCellCus}>Mother Name</Text>
                    </View>
                    <View style={[styles.tableColCus, { width: "70%" }]}>
                      <Text style={styles.tableCellCus}>
                        {v?.mother !== null ? v?.mother : ""}
                        {"  "}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.tableRow}>
                    <View style={[styles.tableColCus, { width: "3%" }]}>
                      <Text style={styles.tableCellCus}>v</Text>
                    </View>
                    <View style={[styles.tableColCus, { width: "27%" }]}>
                      <Text style={styles.tableCellCus}>Spouse Name</Text>
                    </View>
                    <View style={[styles.tableColCus, { width: "70%" }]}>
                      <Text style={styles.tableCellCus}>
                        {v?.spouse !== null ? v?.spouse : "N/A"}
                        {"  "}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.tableRow}>
                    <View style={[styles.tableColCus, { width: "3%" }]}>
                      <Text style={styles.tableCellCus}>vi</Text>
                    </View>
                    <View style={[styles.tableColCus, { width: "20%" }]}>
                      <Text style={styles.tableCellCus}> NID Number:</Text>
                    </View>
                    <View style={[styles.tableColCus, { width: "26%" }]}>
                      <Text style={styles.tableCellCus}>
                        {v?.nationalId !== null ? v?.nationalId : "N/A"}
                        {"  "}
                      </Text>
                    </View>
                    <View style={[styles.tableColCus, { width: "3%" }]}>
                      <Text style={styles.tableCellCus}>vii</Text>
                    </View>
                    <View style={[styles.tableColCus, { width: "20%" }]}>
                      <Text style={styles.tableCellCus}>Date of Birth</Text>
                    </View>
                    <View style={[styles.tableColCus, { width: "28%" }]}>
                      <Text style={styles.tableCellCus}>
                        {v?.dateOfBirth !== null ? v?.dateOfBirth : "N/A"}
                        {"  "}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.tableRow}>
                    <View style={[styles.tableColCus, { width: "3%" }]}>
                      <Text style={styles.tableCellCus}>viii</Text>
                    </View>
                    <View style={[styles.tableColCus, { width: "20%" }]}>
                      <Text style={styles.tableCellCus}> Gender</Text>
                    </View>
                    <View style={[styles.tableColCus, { width: "26%" }]}>
                      <Text style={styles.tableCellCus}>Male</Text>
                    </View>
                    <View style={[styles.tableColCus, { width: "3%" }]}>
                      <Text style={styles.tableCellCus}>ix</Text>
                    </View>
                    <View style={[styles.tableColCus, { width: "20%" }]}>
                      <Text style={styles.tableCellCus}>Profession</Text>
                    </View>
                    <View style={[styles.tableColCus, { width: "28%" }]}>
                      <Text style={styles.tableCellCus}>
                        {v?.occupation !== null ? v?.occupation : "N/A"}
                        {"  "}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.tableRow}>
                    <View style={[styles.tableColCus, { width: "3%" }]}>
                      <Text style={styles.tableCellCus}>x</Text>
                    </View>
                    <View style={[styles.tableColCus, { width: "20%" }]}>
                      <Text style={styles.tableCellCus}> Phone No</Text>
                    </View>
                    <View style={[styles.tableColCus, { width: "26%" }]}>
                      <Text style={styles.tableCellCus}>
                        {v?.mobile !== null ? v?.mobile : "N/A"}
                        {"  "}
                      </Text>
                    </View>
                    <View style={[styles.tableColCus, { width: "3%" }]}>
                      <Text style={styles.tableCellCus}>xi</Text>
                    </View>
                    <View style={[styles.tableColCus, { width: "20%" }]}>
                      <Text style={styles.tableCellCus}>Email</Text>
                    </View>
                    <View style={[styles.tableColCus, { width: "28%" }]}>
                      <Text style={styles.tableCellCus}>
                        {v?.email !== null ? v?.email : "N/A"}
                        {"  "}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.tableRow}>
                    <View style={[styles.tableColCus, { width: "3%" }]}>
                      <Text style={styles.tableCellCus}>xii</Text>
                    </View>
                    <View style={[styles.tableColCus, { width: "46%" }]}>
                      <Text style={styles.tableCellCus}> Present Address</Text>
                    </View>
                    <View style={[styles.tableColCus, { width: "3%" }]}>
                      <Text style={styles.tableCellCus}>xii</Text>
                    </View>
                    <View style={[styles.tableColCus, { width: "48%" }]}>
                      <Text style={styles.tableCellCus}>Parmanent Address</Text>
                    </View>
                  </View>
                  <View style={styles.tableRow}>
                    <View style={[styles.tableColCus, { width: "49%" }]}>
                      <Text style={styles.tableCellCus}>
                        {v?.presentAddress?.additionalVillageOrRoad}{" ,"}{v?.presentAddress?.postOffice}{" - "}
                        {v?.presentAddress?.postalCode}{" ,"}{v?.presentAddress?.upozila}{" ,"}
                        {v?.presentAddress?.district}{" ,"}{v?.presentAddress?.division}
                      </Text>
                    </View>
                    <View style={[styles.tableColCus, { width: "51%" }]}>
                      <Text style={styles.tableCellCus}>
                      {v?.permanentAddress?.additionalVillageOrRoad}{" ,"}{v?.permanentAddress?.postOffice}{" -"}
                        {v?.permanentAddress?.postalCode}{" ,"}{v?.permanentAddress?.upozila}{" ,"}
                        {v?.permanentAddress?.district}{" ,"}{v?.permanentAddress?.division}
                      </Text>
                    </View>
                  </View>
                </View>
                  <Text style={{fontSize: "11", fontWeight: "bold", color:"black"}}> Date Time of obtaining Thumb Impression: {v?.creationDate}</Text>
                <View
                  style={[
                    styles.cusViewH2,
                    { marginBottom: "10px", marginTop: "10px" },
                  ]}
                ></View>
              </View>
            );
          })}
        <View
          style={[
            styles.cusViewH2,
            { marginBottom: "10px", marginTop: "30px" },
          ]}
        >
          <Text
            style={[
              styles.text,
              {
                textAlign: "left",
                fontSize: "14",
                textDecoration: "underline",
              },
            ]}
            break
          >
            DECLARATION:
          </Text>
        </View>
        <View style={[styles.cusViewH2, { marginBottom: "10px" }]}>
          <Text
            style={[styles.text, { textAlign: "left", fontSize: "10" }]}
            break
          >
            We the undersigned confirm that we have obtained the Thumb Impression(s) of the above
            person(s) [borrower/co-borrower/guarantor/mortgagor, as applicable] and they have put their
            Thumb Impression(s) as per guideline of BRPD Circular # 15 dated 02.08.2023 in front of us. The
            above Thumb Impression(s) have been verified with the database preserved for National Identity
            Card (NID) of Bangladesh.
          </Text>
        </View>
        <View style={[styles.cusViewH2, { marginBottom: "10px" }]}>
          <Text style={[styles.text, { textAlign: "left", fontSize: "10" }]}>
          Date Time of obtaining Thumb Impression: {createdByTime}
          </Text>
        </View>
        {/* <View style={[styles.cusViewH2, { marginTop: "40px" }]}>
          <Text style={[styles.text, { textAlign: "left", fontSize: "12" }]}>
          </Text>
        </View>
        <View
          style={[
            styles.cusViewH2,
            { marginBottom: "10px", marginTop: "10px" },
          ]}
        >
          <Text
            style={[styles.text, { textAlign: "left", fontSize: "14" }]}
            break
          >
            (Guarantor’s Signature)
          </Text>
        </View>
        <View style={[styles.cusViewH2, { marginTop: "10px" }]}>
          <Text
            style={[styles.text, { textAlign: "left", fontSize: "12" }]}
            break
          >
            Date:- 05-09-2023
          </Text>
        </View>
        <View
          style={[styles.cusViewH2, { marginBottom: "10px", marginTop: "5px" }]}
        >
          <Text
            style={[
              styles.text,
              { textAlign: "left", fontSize: "12", fontWeight: "bold" },
            ]}
            break
          >
            Place:- Gulshan 1, Dhaka
          </Text>
        </View> */}
        <View style={styles.container}>
          <View style={[styles.leftColumn1,{width:"60%"}]}>
          <Text
            style={[
              styles.text,
              { textAlign: "left", fontSize: "12" },
            ]}
            break
          >
            Made by: {createdBy}
          </Text>
          {/* <Text style={{fontSize: "13", fontWeight: "bold", color:"black"}}>{createdBy}</Text> */}
          <Text style={{fontSize: "13", fontWeight: "bold", color:"black", marginTop:"30px"}}>Signature with seal</Text>
          <Text style={{fontSize: "13", fontWeight: "bold", color:"black"}}>{createdByTime}</Text>
          </View>
          <View style={styles.rightColumn1}>
          <Text
            style={[
              styles.text,
              { textAlign: "left", fontSize: "12" },
            ]}
            break
          >
            Authorized by: {approvedBy}
          </Text>
          {/* <Text style={{fontSize: "13", fontWeight: "bold", color:"black"}}>{approvedBy}</Text> */}
          <Text style={{fontSize: "13", fontWeight: "bold", color:"black", marginTop:"30px"}}>Signature with seal</Text>
          <Text style={{fontSize: "13", fontWeight: "bold", color:"black"}}>{approvedByTime}</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
  return (
    <div>
      <PDFDownloadLink document={<MyDoc />} fileName="somename.pdf">
        {({ blob, url, loading, error }) =>
          loading ? "Loading document..." : "Download now!"
        }
      </PDFDownloadLink>
      <PDFViewer style={{ width: "100%", height: "100vh", border: "none" }}>
        <MyDoc />
      </PDFViewer>
    </div>
  );
};

export default ApplicationForm;
