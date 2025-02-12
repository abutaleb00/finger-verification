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
import moment from "moment";
import { useLocation, Link, useNavigate } from "react-router-dom";
import calibriBold from "../../../../public/calibri-bold.ttf";
import calibriRegular from "../../../../public/calibri-regular.ttf";

Font.register({
  family: "kalpurush",
  src: "/kalpurush.ttf",
});

Font.register({
  family: "Calibri",
  src: calibriRegular,
  fontStyle: "normal",
  fontWeight: "normal",
  fonts: [
    {
      src: calibriRegular,
    },
    {
      src: calibriBold,
      fontWeight: "bold",
    },
  ],
});
// Font.register({
//   family: 'Calibri',
//   format: "truetype",
//   fonts: [
//     {
//       src: calibriRegular,
//     },
//     {
//       src: calibriBold,
//       fontWeight: 'bold',
//     },
//   ],
// });
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
    fontFamily: "Calibri",
  },
  text: {
    padding: "0px",
    fontSize: 11,
    width: "100%",
    fontFamily: "Calibri",
  },
  textT: {
    padding: "0px",
    fontSize: 14,
    width: "100%",
    textAlign: "center",
    fontWeight: "bold",
    marginTop: "10px",
    fontFamily: "Calibri",
  },
  text1: {
    fontSize: 11,
    width: "30%",
    display: "flex",
    fontFamily: "Calibri",
  },
  text2: {
    fontSize: 11,
    width: "70%",
    display: "flex",
    borderBottom: "1px dotted #000000",
    fontFamily: "Calibri",
  },
  textf: {
    fontSize: 11,
    width: "70%",
    display: "flex",
    fontFamily: "Calibri",
    borderBottom: "1px dotted #000000",
    maxLines: 2,
  },
  text3: {
    fontSize: 11,
    width: "33%",
    display: "flex",
    fontFamily: "Calibri",
  },
  text4: {
    fontSize: 11,
    width: "33%",
    display: "flex",
    fontFamily: "Calibri",
    borderBottom: "1px dotted #000000",
  },
  text5: {
    fontSize: 11,
    width: "21%",
    display: "flex",
    fontFamily: "Calibri",
    borderBottom: "1px dotted #000000",
  },
  text6: {
    fontSize: 11,
    width: "50%",
    display: "flex",
    fontFamily: "Calibri",
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
    width: "30%",
  },
  image2: {
    marginVertical: 0,
    marginHorizontal: 0,
    width: "80%",
    height: 100,
  },
  imagec: {
    marginVertical: 0,
    marginHorizontal: 0,
    width: "130px",
    height: "160px",
  },
  image3: {
    marginVertical: 0,
    marginHorizontal: 0,
    width: "50%",
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
    justifyContent: "center",
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
  leftColumn2: {
    flexDirection: "column",
    width: "30%",
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
  rightColumn2: {
    flexDirection: "column",
    width: "70%",
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
    fontFamily: "Calibri",
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
  const [coBorrowerList, setCoBorrowerList] = useState([]);
  const [coBorrowerName, setCoBorrowerName] = useState("");
  const [company, setCompany] = useState({});
  const [branchname, setBranchname] = useState("");
  const [createdBy, setCreatedBy] = useState(null);
  const [approvedBy, setApprovedBy] = useState(null);
  const [createdByTime, setCreatedByTime] = useState("");
  const [approvedByTime, setApprovedByTime] = useState("");
  const [loanInformation, setLoanInformation] = useState([]);

  useEffect(() => {
    setApplicantList(location.state?.userinfo?.loanee);
    setBranchname(location.state?.userinfo?.branchName);
    setNomineeList(location.state?.userinfo?.guarantors);
    setCompany(location.state?.userinfo?.companyProfile);
    setCoBorrowerList(location.state?.userinfo?.coBorrowers);
    setCoBorrowerName(location.state?.userinfo?.coBorrowers[0]?.nameEn ?? "");
    setCreatedBy(location.state?.userinfo?.createdByUser);
    setApprovedBy(location.state?.userinfo?.modifiedByUser);
    setCreatedByTime(location.state?.userinfo?.creationDate);
    setApprovedByTime(location.state?.userinfo?.modificationDate);
    setLoanInformation(location.state?.userinfo);
  }, [location.state?.userinfo]);
  console.log("location", location.state);

  const MyDoc = () => (
    <Document>
      <Page size="A4" style={styles.body}>
        <View style={styles.container}>
          <View style={styles.leftColumn2}>
            <Image style={styles.image1} src="/verified.png" />
          </View>
          <View style={styles.rightColumn2}>
            <Image style={styles.image3} src="/logo_sebplc.png" />
          </View>
          {/* <View
            style={[
              styles.cusViewImage,
              { textAlign: "left", width: "70%" },
            ]}
          >
            <Image style={styles.image3} src="/logo_sebplc.png" />
          </View> */}
        </View>
        <View style={styles.container}>
          <View
            style={[
              styles.cusView,
              { textAlign: "center", marginTop: "-10px" },
            ]}
          >
            <Text style={[styles.text, { fontSize: 18 }]}>
              Fingerprint Verification Report
            </Text>
          </View>
        </View>
        <View style={styles.container}>
          <View style={styles.leftColumn1}>
            <View style={styles.cusView}>
              <Text style={[styles.text, { fontFamily: "Calibri", fontSize: 10 }]}>The Manager</Text>
            </View>
            <View style={[styles.cusView, { marginTop: "-10px" }]}>
              <Text style={[styles.text, { fontFamily: "Calibri", fontSize: 10 }]}>Southeast Bank PLC.</Text>
            </View>
            <View style={[styles.cusView, { marginTop: "-10px" }]}>
              <Text
                style={{
                  display: "flex",
                  flexDirection: "row",
                  width: "auto",
                  fontSize: "10px",
                  fontFamily: "Calibri",
                }}
              >
                {branchname}
              </Text>
              {/* <Text style={[styles.text,{width:"auto", marginLeft:10}]}>Branch</Text> */}
            </View>
            {location.state?.userinfo?.isCompany === true && (
              <View
                style={[
                  styles.cusView,
                  { marginTop: "5px", marginBottom: "-10px" },
                ]}
              >
                <Text
                  style={[styles.text, { fontFamily: "Calibri", fontSize: 10 }]}
                >
                  Name of Enterprise : {company?.companyName}
                </Text>
              </View>
            )}
            <View
              style={[
                styles.cusView,
                { marginTop: "0px", marginBottom: "-10px" },
              ]}
            >
              <Text style={[styles.text, { fontFamily: "Calibri", fontSize: "10px", }]}>Dear Sir,</Text>
            </View>
          </View>
          <View style={styles.rightColumn1}>
            <Image
              style={styles.image2}
              height={50}
              src={
                applicantList?.nidphoto !== undefined
                  ? `data:image/jpeg;base64,${applicantList?.nidphoto}`
                  : "/user-image.jpg"
              }
            />
          </View>
        </View>
        <View style={[styles.cusView, { marginTop: "5px" }]}>
          {location.state?.userinfo?.isCompany === false ? (
            <Text style={[styles.text, { fontFamily: "Calibri", fontSize: "10px", textAlign: "justify" }]}>
              Thank you for approving a
              {loanInformation?.product_info !== null ? (
                <Text
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    width: "auto",
                    fontSize: "10px",
                    fontFamily: "Calibri",
                  }}
                >
                  {" "}
                  {loanInformation?.product_info}
                </Text>
              ) : (
                " _______________ "
              )}{" "}
              loan/lease/credit facility in favour of me/us for an amount of BDT
              {loanInformation?.loan_amount !== null ? (
                <Text
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    width: "auto",
                    fontSize: "11px",
                    fontFamily: "Calibri",
                  }}
                >
                  {" "}
                  {loanInformation?.loan_amount}
                </Text>
              ) : (
                " _______________ "
              )}{" "}
              from your esteemed organization vide sanction letter being
              reference no.{" "}
              {loanInformation?.sanction_ref !== null ? (
                <Text
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    width: "auto",
                    fontSize: "10px",
                    fontFamily: "Calibri",
                  }}
                >
                  {loanInformation?.sanction_ref}
                </Text>
              ) : (
                " _______________ "
              )}{" "}
              dated
              {loanInformation?.saction_date !== null ? (
                <Text
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    width: "auto",
                    fontSize: "10px",
                    fontFamily: "Calibri",
                  }}
                >
                  {" "}
                  {moment(loanInformation?.saction_date).format("DD-MMM-YYYY")}.
                </Text>
              ) : (
                " ____________ ."
              )}{" "}
              which has been duly accepted by me/us. I/We am/are fully aware of
              the approved credit facility{" "}
              <Text
                style={{
                  display: "flex",
                  flexDirection: "row",
                  width: "auto",
                  fontSize: "10px",
                  fontFamily: "Calibri",
                }}
              >
                along with all the terms and conditions and furnished below
                information and personal details generated through my thumb
                verification
              </Text>{" "}
              and executed all security charge documents against the above
              mentioned loan/lease facility.
            </Text>
          ) : (
            <Text style={[styles.text, { fontFamily: "Calibri", fontSize: "10px", textAlign: "justify" }]}>
              Thank you for approving a
              {loanInformation?.product_info !== null ? (
                <Text
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    width: "auto",
                    fontSize: "10px",
                    fontFamily: "Calibri",
                  }}
                >
                  {" "}
                  {loanInformation?.product_info}
                </Text>
              ) : (
                " ____________ "
              )}{" "}
              loan/lease/credit facility in favour of {company?.companyName}{" "}
              represented by its authorized officials/Director/Managing
              Director/Chairman Mr.
              {applicantList?.nameEn !== null ? (
                <Text
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    width: "auto",
                    fontSize: "10px",
                    fontFamily: "Calibri",
                  }}
                >
                  {applicantList?.nameEn}
                </Text>
              ) : (
                " ____________ "
              )}{" "}
              {coBorrowerName !== "" && (
                <Text
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    width: "auto",
                    fontSize: "10px",
                    fontFamily: "Calibri",
                  }}
                >
                  {", "}
                  Mr. {coBorrowerName}
                </Text>
              )}
              for an amount of BDT
              {loanInformation?.loan_amount !== null ? (
                <Text
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    width: "auto",
                    fontSize: "10px",
                    fontFamily: "Calibri",
                  }}
                >
                  {" "}
                  {loanInformation?.loan_amount}
                </Text>
              ) : (
                " _______________ "
              )}{" "}
              from your esteemed organization vide sanction letter being
              reference no.{" "}
              {loanInformation?.sanction_ref !== null ? (
                <Text
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    width: "auto",
                    fontSize: "10px",
                    fontFamily: "Calibri",
                  }}
                >
                  {loanInformation?.sanction_ref}
                </Text>
              ) : (
                " _______________ "
              )}{" "}
              dated
              {loanInformation?.saction_date !== null ? (
                <Text
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    width: "auto",
                    fontSize: "10px",
                    fontFamily: "Calibri",
                  }}
                >
                  {" "}
                  {moment(loanInformation?.saction_date).format("DD-MMM-YYYY")}.
                </Text>
              ) : (
                " ____________ ."
              )}{" "}
              which has been duly accepted by us. I/We am/are fully aware of the
              approved credit facility{" "}
              <Text
                style={{
                  display: "flex",
                  flexDirection: "row",
                  width: "auto",
                  fontSize: "10px",
                  fontFamily: "Calibri",
                }}
              >
                along with all the terms and conditions and furnished below
                information and personal details generated through my thumb
                verification
              </Text>{" "}
              and executed all security charge documents against the above
              mentioned loan/lease facility.{" "}
            </Text>
          )}
        </View>
        <View
          style={[styles.cusView, { marginTop: "10px", marginBottom: "10px" }]}
        >
          <Text
            style={[
              styles.textT,
              {
                fontSize: "14px",
                fontWeight: "bold",
                textAlign: "center",
                fontFamily: "Calibri",
              },
            ]}
          >
            Applicant Related Information
          </Text>
        </View>
        <View style={styles.leftColumn1}>
        {
              (localStorage.getItem("signature") !== undefined && localStorage.getItem("signature") !== null) &&

              <Image
                style={[styles.image2, {width: "100px" }]}
                height={160}
                src={`data:image/jpeg;base64,${localStorage.getItem("signature")}`}
              />
            }
            </View>
        <View style={[styles.cusView, { paddingRight: "0px", paddingLeft: "0px" }]}>
          <Text
            style={{
              fontSize: "10px",
              fontWeight: "bold",
              textAlign: "center",
              fontFamily: "Calibri",
            }}
          >
            EC Referance No: {applicantList?.ecjobid}
          </Text>
        </View>
        <View
          style={[styles.cusView, { paddingRight: "0px", paddingLeft: "0px" }]}
        >
          <Text style={{ fontSize: "10", fontWeight: "bold", color: "black", fontFamily: "Calibri", }}>
            Date & Time of obtaining Thumb Impression:{" "}
            {applicantList?.creationDate}
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
              <Text style={[styles.tableCellCus, { fontFamily: "kalpurush" }]}>
                {applicantList?.name}{" "}{" "}
              </Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View
              style={[styles.tableColCus, { width: "3%", borderTopWidth: 0 }]}
            >
              <Text style={styles.tableCellCus}></Text>
            </View>
            <View style={[styles.tableColCus, { width: "27%" }]}>
              <Text style={styles.tableCellCus}>In English</Text>
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
              <Text style={styles.tableCellCus}>
                {applicantList?.father}{" "}
              </Text>
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
              <Text style={styles.tableCellCus}>
                {applicantList?.mother}{" "}
              </Text>
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
                {moment(applicantList?.dateOfBirth).format("DD-MMM-YYYY")}
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
              <Text style={styles.tableCellCus}>
                {applicantList?.gender !== null
                  ? applicantList?.gender
                  : "Male"}
              </Text>
            </View>
            <View style={[styles.tableColCus, { width: "3%" }]}>
              <Text style={styles.tableCellCus}>vii</Text>
            </View>
            <View style={[styles.tableColCus, { width: "20%" }]}>
              <Text style={styles.tableCellCus}>Profession</Text>
            </View>
            <View style={[styles.tableColCus, { width: "28%" }]}>
              <Text style={[styles.tableCellCus, { fontFamily: "kalpurush" }]}>
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
              <Text style={styles.tableCellCus}>Loan Name</Text>
            </View>
            <View style={[styles.tableColCus, { width: "25%" }]}>
              <Text style={styles.tableCellCus}>
                {loanInformation?.product_info !== null
                  ? loanInformation?.product_info
                  : " "}
              </Text>
            </View>
            <View style={[styles.tableColCus, { width: "4%" }]}>
              <Text style={styles.tableCellCus}>xi </Text>
            </View>
            <View style={[styles.tableColCus, { width: "16%" }]}>
              <Text style={styles.tableCellCus}>Reference No </Text>
            </View>
            <View style={[styles.tableColCus, { width: "25%" }]}>
              <Text style={styles.tableCellCus}>
                {loanInformation?.sanction_ref !== null
                  ? loanInformation?.sanction_ref
                  : " "}
              </Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={[styles.tableColCus, { width: "3%" }]}>
              <Text style={styles.tableCellCus}>xii</Text>
            </View>
            <View style={[styles.tableColCus, { width: "27%" }]}>
              <Text style={styles.tableCellCus}>Loan Type</Text>
            </View>
            <View style={[styles.tableColCus, { width: "70%" }]}>
              <Text style={styles.tableCellCus}>
                {location.state?.userinfo?.isCompany === false
                  ? "INDIVIDUAL"
                  : "CORPORATE"}
              </Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={[styles.tableColCus, { width: "3%" }]}>
              <Text style={styles.tableCellCus}>xiii</Text>
            </View>
            <View style={[styles.tableColCus, { width: "27%" }]}>
              <Text style={styles.tableCellCus}> Loan Amount</Text>
            </View>
            <View style={[styles.tableColCus, { width: "7%" }]}>
              <Text style={styles.tableCellCus}>BDT</Text>
            </View>
            <View style={[styles.tableColCus, { width: "18%" }]}>
              <Text style={styles.tableCellCus}>
                {loanInformation?.loan_amount !== null
                  ? loanInformation?.loan_amount
                  : " "}
              </Text>
            </View>
            <View style={[styles.tableColCus, { width: "10%" }]}>
              <Text style={styles.tableCellCus}>Sanction Date</Text>
            </View>
            <View style={[styles.tableColCus, { width: "35%" }]}>
              <Text style={styles.tableCellCus}>
                {loanInformation?.saction_date !== null
                  ? moment(loanInformation?.saction_date).format("DD-MMM-YYYY")
                  : " "}
              </Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={[styles.tableColCus, { width: "3%" }]}>
              <Text style={styles.tableCellCus}>xiv</Text>
            </View>
            <View style={[styles.tableColCus, { width: "46%" }]}>
              <Text style={styles.tableCellCus}> Present Address</Text>
            </View>
            <View style={[styles.tableColCus, { width: "3%" }]}>
              <Text style={styles.tableCellCus}>xiv</Text>
            </View>
            <View style={[styles.tableColCus, { width: "48%" }]}>
              <Text style={styles.tableCellCus}>Parmanent Address</Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={[styles.tableColCus, { width: "49%" }]}>
              <Text style={styles.tableCellCus}>
                {applicantList?.presentAddress?.plainAddress}
              </Text>
            </View>
            <View style={[styles.tableColCus, { width: "51%" }]}>
              <Text style={styles.tableCellCus}>
                {applicantList?.permanentAddress?.plainAddress}
              </Text>
            </View>
          </View>
        </View>
        {coBorrowerList?.length > 0 && (
          <View
            style={[
              styles.cusView,
              { marginTop: "10px", marginBottom: "10px" },
            ]}
            break
            wrap={false}
          >
            <Text
              style={[
                styles.textT,
                {
                  fontSize: "14px",
                  fontWeight: "bold",
                  textAlign: "center",
                  fontFamily: "Calibri",
                },
              ]}
            >
              Co-Borrower's Information
            </Text>
          </View>
        )}
        {coBorrowerList?.length > 0 &&
          coBorrowerList?.map((v, i) => {
            return (
              <View key={i}>
                <View
                  style={[
                    styles.cusView1,
                    { width: "100%", marginTop: 10, marginBottom: 10 },
                  ]}
                >
                  <Text style={styles.text}>Co-Borrowers {i + 1}</Text>
                </View>
                <View
                  style={[
                    styles.cusView1,
                    { width: "30%", marginBottom: 20, marginTop: 20 },
                  ]}
                >
                  <Image
                    style={styles.image2}
                    height={50}
                    src={
                      v?.nidphoto !== undefined
                        ? `data:image/jpeg;base64,${v?.nidphoto}`
                        : "/user-image.jpg"
                    }
                  />
                </View>
                <View style={[styles.cusView, { marginTop: "5px" }]}>
                  {location.state?.userinfo?.isCompany === false ? (
                    <Text style={[styles.text, { fontSize: "10px", fontFamily: "Calibri", textAlign: "justify" }]}>
                      Thank you for approving a
                      {loanInformation?.product_info !== null ? (
                        <Text
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            width: "auto",
                            fontSize: "10px",
                            fontFamily: "Calibri",
                          }}
                        >
                          {" "}
                          {loanInformation?.product_info}
                        </Text>
                      ) : (
                        " _______________ "
                      )}{" "}
                      loan/lease/credit facility in favour of me/us for an
                      amount of BDT
                      {loanInformation?.loan_amount !== null ? (
                        <Text
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            width: "auto",
                            fontSize: "10px",
                            fontFamily: "Calibri",
                          }}
                        >
                          {" "}
                          {loanInformation?.loan_amount}
                        </Text>
                      ) : (
                        " _______________ "
                      )}{" "}
                      from your esteemed organization vide sanction letter being
                      reference no.{" "}
                      {loanInformation?.sanction_ref !== null ? (
                        <Text
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            width: "auto",
                            fontSize: "10px",
                            fontFamily: "Calibri",
                          }}
                        >
                          {loanInformation?.sanction_ref}
                        </Text>
                      ) : (
                        " _______________ "
                      )}{" "}
                      dated
                      {loanInformation?.saction_date !== null ? (
                        <Text
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            width: "auto",
                            fontSize: "10px",
                            fontFamily: "Calibri",
                          }}
                        >
                          {" "}
                          {moment(loanInformation?.saction_date).format(
                            "DD-MMM-YYYY"
                          )}
                          .
                        </Text>
                      ) : (
                        " ____________ ."
                      )}{" "}
                      which has been duly accepted by me/us. I/We am/are fully
                      aware of the approved credit facility{" "}
                      <Text
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          width: "auto",
                          fontSize: "10px",
                          fontFamily: "Calibri",
                        }}
                      >
                        along with all the terms and conditions and furnished
                        below information and personal details generated through
                        my thumb verification
                      </Text>{" "}
                      and executed all security charge documents against the
                      above mentioned loan/lease facility.
                    </Text>
                  ) : (
                    <Text style={[styles.text, { fontSize: "10px", fontFamily: "Calibri", textAlign: "justify" }]}>
                      Thank you for approving a
                      {loanInformation?.product_info !== null ? (
                        <Text
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            width: "auto",
                            fontSize: "11px",
                            fontFamily: "Calibri",
                          }}
                        >
                          {" "}
                          {loanInformation?.product_info}
                        </Text>
                      ) : (
                        " ____________ "
                      )}{" "}
                      loan/lease/credit facility in favour of{" "}
                      {company?.companyName} represented by its authorized
                      officials/Director/Managing Director/Chairman Mr.
                      {applicantList?.nameEn !== null ? (
                        <Text
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            width: "auto",
                            fontSize: "10px",
                            fontFamily: "Calibri",
                          }}
                        >
                          {" "}
                          {applicantList?.nameEn}
                        </Text>
                      ) : (
                        " ____________ "
                      )}{" "}
                      {coBorrowerName !== "" && (
                        <Text
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            width: "auto",
                            fontSize: "10px",
                            fontFamily: "Calibri",
                          }}
                        >
                          {", "}
                          Mr. {coBorrowerName}
                        </Text>
                      )}
                      for an amount of BDT
                      {loanInformation?.loan_amount !== null ? (
                        <Text
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            width: "auto",
                            fontSize: "10px",
                            fontFamily: "Calibri",
                          }}
                        >
                          {" "}
                          {loanInformation?.loan_amount}
                        </Text>
                      ) : (
                        " _______________ "
                      )}{" "}
                      from your esteemed organization vide sanction letter being
                      reference No.{" "}
                      {loanInformation?.sanction_ref !== null ? (
                        <Text
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            width: "auto",
                            fontSize: "10px",
                            fontFamily: "Calibri",
                          }}
                        >
                          {loanInformation?.sanction_ref}
                        </Text>
                      ) : (
                        " _______________ "
                      )}{" "}
                      dated
                      {loanInformation?.saction_date !== null ? (
                        <Text
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            width: "auto",
                            fontSize: "10px",
                            fontFamily: "Calibri",
                          }}
                        >
                          {" "}
                          {moment(loanInformation?.saction_date).format(
                            "DD-MMM-YYYY"
                          )}
                          .
                        </Text>
                      ) : (
                        " ____________ ."
                      )}{" "}
                      which has been duly accepted by us. I/We am/are fully
                      aware of the approved credit facility{" "}
                      <Text
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          width: "auto",
                          fontSize: "10px",
                          fontFamily: "Calibri",
                        }}
                      >
                        along with all the terms and conditions and furnished
                        below information and personal details generated through
                        my thumb verification
                      </Text>{" "}
                      and executed all security charge documents against the
                      above mentioned loan/lease facility.{" "}
                    </Text>
                  )}
                </View>
                <View style={[styles.cusView, { paddingRight: "0px", paddingLeft: "0px" }]}>
                  <Text
                    style={{
                      fontSize: "10px",
                      fontWeight: "bold",
                      textAlign: "center",
                      fontFamily: "Calibri",
                    }}
                  >
                    EC Referance No: {v?.ecjobid}
                  </Text>
                </View>
                <View
                  style={[
                    styles.cusView,
                    { paddingRight: "0px", paddingLeft: "0px" },
                  ]}
                >
                  <Text
                    style={{
                      fontSize: "10",
                      fontWeight: "bold",
                      color: "black",
                      fontFamily: "Calibri",
                    }}
                  >
                    Date & Time of obtaining Thumb Impression: {v?.creationDate}
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
                        Co-Borrowers Name (In Bangla)
                      </Text>
                    </View>
                    <View style={[styles.tableColCus, { width: "70%" }]}>
                      <Text
                        style={[
                          styles.tableCellCus,
                          { fontFamily: "kalpurush" },
                        ]}
                      >
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
                        In English
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
                        {v?.porichoyResponse?.fathersNameEN !== null
                          ? v?.porichoyResponse?.fathersNameEN
                          : ""}
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
                        {v?.porichoyResponse?.mothersNameEN !== null
                          ? v?.porichoyResponse?.mothersNameEN
                          : ""}
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
                        {v?.dateOfBirth !== null
                          ? moment(v?.dateOfBirth).format("DD-MMM-YYYY")
                          : "N/A"}
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
                      <Text style={styles.tableCellCus}>
                        {v?.gender !== null ? v?.gender : "Male"}
                      </Text>
                    </View>
                    <View style={[styles.tableColCus, { width: "3%" }]}>
                      <Text style={styles.tableCellCus}>ix</Text>
                    </View>
                    <View style={[styles.tableColCus, { width: "20%" }]}>
                      <Text style={styles.tableCellCus}>Profession</Text>
                    </View>
                    <View style={[styles.tableColCus, { width: "28%" }]}>
                      <Text style={[styles.tableCellCus, { fontFamily: "kalpurush" }]}>
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
                        {v?.presentAddress?.plainAddress}
                      </Text>
                    </View>
                    <View style={[styles.tableColCus, { width: "51%" }]}>
                      <Text style={styles.tableCellCus}>
                        {v?.permanentAddress?.plainAddress}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            );
          })}
        {nomineeList?.length > 0 && (
          <View
            style={[
              styles.cusView,
              { marginTop: "10px", marginBottom: "10px" },
            ]}
            break
            wrap={false}
          >
            <Text
              style={[
                styles.textT,
                {
                  fontSize: "14px",
                  fontWeight: "bold",
                  textAlign: "center",
                  fontFamily: "Calibri",
                },
              ]}
            >
              Gurantor's Information
            </Text>
          </View>
        )}
        {nomineeList?.length > 0 &&
          nomineeList?.map((v, i) => {
            return (
              <View key={i}>
                <View
                  style={[
                    styles.cusView1,
                    { width: "100%", marginTop: 10, marginBottom: 10 },
                  ]}
                >
                  <Text style={styles.text}>Guarantor {i + 1}</Text>
                </View>
                <View
                  style={[
                    styles.cusView1,
                    { width: "40%", marginBottom: 20, marginTop: 20 },
                  ]}
                >
                  <Image
                    style={[styles.image2, { width: "160px" }]}
                    height={160}
                    src={
                      v?.nidphoto !== undefined
                        ? `data:image/jpeg;base64,${v?.nidphoto}`
                        : "/user-image.jpg"
                    }
                  />
                  {
                    (localStorage.getItem("signature2") !== undefined && localStorage.getItem("signature2") !== null) &&

                    <Image
                      style={[styles.image2, { marginLeft: "20px", width: "130px" }]}
                      height={160}
                      src={`data:image/jpeg;base64,${localStorage.getItem("signature2")}`}
                    />
                  }
                </View>
                <View style={[styles.cusView, { marginTop: "5px" }]}>
                  {location.state?.userinfo?.isCompany === false ? (
                    <Text style={[styles.text, { fontSize: "10", fontFamily: "Calibri", textAlign: "justify" }]}>
                      Thank you for approving a
                      {loanInformation?.product_info !== null ? (
                        <Text
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            width: "auto",
                            fontSize: "10px",
                            fontFamily: "Calibri",
                          }}
                        >
                          {" "}
                          {loanInformation?.product_info}
                        </Text>
                      ) : (
                        " _______________ "
                      )}{" "}
                      loan/lease/credit facility in favour of{" "}
                      {coBorrowerName?.nameEn !== null ? (
                        <Text
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            width: "auto",
                            fontSize: "10px",
                            fontFamily: "Calibri",
                          }}
                        >
                          Mr.{" "}{applicantList?.nameEn}
                        </Text>
                      ) : (
                        " ____________ "
                      )}{" "}
                      {coBorrowerName !== "" && (
                        <Text
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            width: "auto",
                            fontSize: "10px",
                            fontFamily: "Calibri",
                          }}
                        >
                          {", "}Mr. {coBorrowerName}
                        </Text>
                      )}
                      for an amount of BDT
                      {loanInformation?.loan_amount !== null ? (
                        <Text
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            width: "auto",
                            fontSize: "10px",
                            fontFamily: "Calibri",
                          }}
                        >
                          {" "}
                          {loanInformation?.loan_amount}
                        </Text>
                      ) : (
                        " _______________ "
                      )}{" "}
                      from your esteemed organization vide sanction letter being
                      reference no.{" "}
                      {loanInformation?.sanction_ref !== null ? (
                        <Text
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            width: "auto",
                            fontSize: "10px",
                            fontFamily: "Calibri",
                          }}
                        >
                          {loanInformation?.sanction_ref}
                        </Text>
                      ) : (
                        " _______________ "
                      )}{" "}
                      dated
                      {loanInformation?.saction_date !== null ? (
                        <Text
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            width: "auto",
                            fontSize: "10px",
                            fontFamily: "Calibri",
                          }}
                        >
                          {" "}
                          {moment(loanInformation?.saction_date).format(
                            "DD-MMM-YYYY"
                          )}
                          .
                        </Text>
                      ) : (
                        " ____________ ."
                      )}{" "}
                      I/We am/are fully aware of the approved credit facility{" "}
                      <Text
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          width: "auto",
                          fontSize: "10px",
                          fontFamily: "Calibri",
                        }}
                      >
                        along with all the terms and conditions
                      </Text>{" "}
                      and furnished below information and personal details{" "}
                      <Text
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          width: "auto",
                          fontSize: "10px",
                          fontFamily: "Calibri",
                        }}
                      >
                        generated through my thumb verification
                      </Text>{" "}
                      and executed all security charge documents against the
                      above mentioned loan/lease facility.
                    </Text>
                  ) : (
                    <Text style={[styles.text, { fontSize: "10", fontFamily: "Calibri", textAlign: "justify" }]}>
                      Thank you for approving a
                      {loanInformation?.product_info !== null ? (
                        <Text
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            width: "auto",
                            fontSize: "10px",
                            fontFamily: "Calibri",
                          }}
                        >
                          {" "}
                          {loanInformation?.product_info}
                        </Text>
                      ) : (
                        " ____________ "
                      )}{" "}
                      loan/lease/credit facility in favour of{" "}
                      {company?.companyName} represented by its authorized
                      officials/Director/Managing Director/Chairman Mr.
                      {applicantList?.nameEn !== null ? (
                        <Text
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            width: "auto",
                            fontSize: "10px",
                            fontFamily: "Calibri",
                          }}
                        >
                          {applicantList?.nameEn}
                        </Text>
                      ) : (
                        " ____________ "
                      )}{" "}
                      {coBorrowerName !== "" && (
                        <Text
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            width: "auto",
                            fontSize: "10px",
                            fontFamily: "Calibri",
                          }}
                        >
                          {", "}
                          Mr. {coBorrowerName}
                        </Text>
                      )}
                      for an amount of BDT
                      {loanInformation?.loan_amount !== null ? (
                        <Text
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            width: "auto",
                            fontSize: "10px",
                            fontFamily: "Calibri",
                          }}
                        >
                          {" "}
                          {loanInformation?.loan_amount}
                        </Text>
                      ) : (
                        " _______________ "
                      )}{" "}
                      from your esteemed organization vide sanction letter being
                      reference no.{" "}
                      {loanInformation?.sanction_ref !== null ? (
                        <Text
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            width: "auto",
                            fontSize: "10px",
                            fontFamily: "Calibri",
                          }}
                        >
                          {loanInformation?.sanction_ref}
                        </Text>
                      ) : (
                        " _______________ "
                      )}{" "}
                      dated
                      {loanInformation?.saction_date !== null ? (
                        <Text
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            width: "auto",
                            fontSize: "10px",
                            fontFamily: "Calibri",
                          }}
                        >
                          {" "}
                          {moment(loanInformation?.saction_date).format(
                            "DD-MMM-YYYY"
                          )}
                          .
                        </Text>
                      ) : (
                        " ____________ ."
                      )}{" "}
                      We {company?.companyName} represented by its authorized
                      officials/Director/Managing Director/Chairman Mr.
                      {applicantList?.nameEn !== null ? (
                        <Text
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            width: "auto",
                            fontSize: "10px",
                            fontFamily: "Calibri",
                          }}
                        >
                          {" "}
                          {applicantList?.nameEn}
                        </Text>
                      ) : (
                        " ____________ "
                      )}{" "}
                      {coBorrowerName !== "" && (
                        <Text
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            width: "auto",
                            fontSize: "10px",
                            fontFamily: "Calibri",
                          }}
                        >
                          {", "}
                          Mr. {coBorrowerName}
                        </Text>
                      )}
                      are fully aware of the approved credit facility{" "}
                      <Text
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          width: "auto",
                          fontSize: "10px",
                          fontFamily: "Calibri",
                        }}
                      >
                        along with all the terms and conditions
                      </Text>{" "}
                      and furnished below information and details{" "}
                      <Text
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          width: "auto",
                          fontSize: "10px",
                          fontFamily: "Calibri",
                        }}
                      >
                        generated through my thumb verification
                      </Text>{" "}
                      as a corporate guarantor of the said credit facility as
                      well as executed security document against the above
                      mentioned loan/lease facility.
                    </Text>
                  )}
                </View>
                <View style={[styles.cusView, { paddingRight: "0px", paddingLeft: "0px" }]}>
                  <Text
                    style={{
                      fontSize: "10px",
                      fontWeight: "bold",
                      textAlign: "center",
                      fontFamily: "Calibri",
                    }}
                  >
                    EC Referance No: {v?.ecjobid}
                  </Text>
                </View>
                <View
                  style={[
                    styles.cusView,
                    { paddingRight: "0px", paddingLeft: "0px" },
                  ]}
                >
                  <Text
                    style={{
                      fontSize: "10",
                      fontWeight: "bold",
                      color: "black",
                    }}
                  >
                    Date & Time of obtaining Thumb Impression: {v?.creationDate}
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
                      <Text
                        style={[
                          styles.tableCellCus,
                          { fontFamily: "kalpurush" },
                        ]}
                      >
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
                        In English
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
                        {v?.porichoyResponse?.fathersNameEN !== null
                          ? v?.porichoyResponse?.fathersNameEN
                          : ""}
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
                        {v?.porichoyResponse?.mothersNameEN !== null
                          ? v?.porichoyResponse?.mothersNameEN
                          : ""}
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
                        {v?.dateOfBirth !== null
                          ? moment(v?.dateOfBirth).format("DD-MMM-YYYY")
                          : "N/A"}
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
                      <Text style={styles.tableCellCus}>
                        {v?.gender !== null ? v?.gender : "Male"}
                      </Text>
                    </View>
                    <View style={[styles.tableColCus, { width: "3%" }]}>
                      <Text style={styles.tableCellCus}>ix</Text>
                    </View>
                    <View style={[styles.tableColCus, { width: "20%" }]}>
                      <Text style={styles.tableCellCus}>Profession</Text>
                    </View>
                    <View style={[styles.tableColCus, { width: "28%" }]}>
                      <Text style={[styles.tableCellCus, { fontFamily: "kalpurush" }]}>
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
                        {v?.presentAddress?.plainAddress}
                      </Text>
                    </View>
                    <View style={[styles.tableColCus, { width: "51%" }]}>
                      <Text style={styles.tableCellCus}>
                        {v?.permanentAddress?.plainAddress}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            );
          })}
        <View
          style={[
            styles.cusViewH2,
            { marginBottom: "10px", marginTop: "30px" },
          ]}
          break
          wrap={false}
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
          >
            Declaration:
          </Text>
        </View>
        <View style={[styles.cusViewH2, { marginBottom: "10px" }]}>
          <Text
            style={[styles.text, { fontSize: "10", textAlign: "justify" }]}
            break
          >
            We the undersigned confirm that we have obtained the Thumb
            Impression(s) of the above person(s)
            [borrower/co-borrower/guarantor/mortgagor, as applicable] and they
            have put their Thumb Impression(s) as per guideline of BRPD Circular No-15, Dated 02 August 2023 in front of us. The above Thumb
            Impression(s) have been verified with the database preserved for
            National Identity Card (NID) of Bangladesh.
          </Text>
        </View>
        <View style={[styles.cusViewH2, { marginBottom: "10px" }]}>
          <Text style={[styles.text, { textAlign: "left", fontSize: "10" }]}>
            Date & Time of obtaining Thumb Impression: {createdBy?.creationDate}
          </Text>
        </View>
        <View style={styles.container}>
          <View style={[styles.leftColumn1, { width: "60%" }]}>
            <Text
              style={[
                styles.text,
                {
                  textAlign: "left",
                  fontSize: "11",
                  marginBottom: "5px",
                  fontFamily: "Calibri",
                },
              ]}
              break
            >
              Made by:
            </Text>
            <Text
              style={[styles.text, { textAlign: "left", fontSize: "11" }]}
              break
            >
              {createdBy?.fullName}
            </Text>
            <Text
              style={[styles.text, { textAlign: "left", fontSize: "11" }]}
              break
            >
              Employee ID: {createdBy?.employeeTypeRef}
            </Text>
            {/* <Text style={{fontSize: "13", fontWeight: "bold", color:"black"}}>{createdBy}</Text> */}
            <Text
              style={{
                fontSize: "11",
                color: "black",
                marginTop: "60px",
                fontFamily: "Calibri",
              }}
            >
              Signature with seal
            </Text>
            <Text
              style={{
                fontSize: "11",
                color: "black",
                fontFamily: "Calibri",
              }}
            >
              {createdBy?.creationDate}
            </Text>
          </View>
          <View style={styles.rightColumn1}>
            <Text
              style={[
                styles.text,
                {
                  textAlign: "left",
                  fontSize: "11",
                  marginBottom: "5px",
                  fontFamily: "Calibri",
                },
              ]}
              break
            >
              Authorized by:
            </Text>
            <Text
              style={[
                styles.text,
                { textAlign: "left", fontSize: "11", fontFamily: "Calibri" },
              ]}
              break
            >
              {approvedBy?.fullName}
            </Text>
            <Text
              style={[
                styles.text,
                { textAlign: "left", fontSize: "11", fontFamily: "Calibri" },
              ]}
              break
            >
              Employee ID: {approvedBy?.employeeTypeRef}
            </Text>
            {/* <Text style={{fontSize: "13", fontWeight: "bold", color:"black"}}>{approvedBy}</Text> */}
            <Text
              style={{
                fontSize: "11",
                fontFamily: "Calibri",
                color: "black",
                marginTop: "60px",
              }}
            >
              Signature with seal
            </Text>
            <Text
              style={{
                fontSize: "11",
                fontFamily: "Calibri",
                color: "black",
              }}
            >
              {approvedBy?.modificationDate}
            </Text>
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