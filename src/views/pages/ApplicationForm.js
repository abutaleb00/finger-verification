import React, { Component } from "react";
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


class ApplicationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //  ...props?.location?.state,
      
    };
    // console.log("...props.location.state", location.state?.userinfo)
  }
  // const location = useLocation()
  // customerCreation = () => {
  //   let customerName = "";
  //   let fatherName,
  //     motherName,
  //     spouseName,
  //     presentAddress,
  //     permanentAddress,
  //     dob;
  //   this.state.listCustomers.map((e, i) => {
  //     if (i === 0) {
  //       customerName = e.cp.name;
  //     } else {
  //       customerName += " AND " + e.cp.name;
  //     }
  //     fatherName = e.cp.f_name + " ";
  //     motherName = e.cp.m_name;
  //     spouseName = e.cp.spouse_name;
  //     presentAddress =
  //       e.presentAddress.additionalMouzaOrMoholla +
  //       e.presentAddress.additionalVillageOrRoad +
  //       e.presentAddress.district +
  //       e.presentAddress.division;
  //     permanentAddress = e.permanentAddress.additionalMouzaOrMoholla;
  //     dob = e.cp.dob;

  //     e.documentDetailList.map((v, k) => {
  //       if (Number(v.documentType) === DOCUMENTCHECKLIST.PHOTO.value) {
  //         this.setState({ customerPhoto: v.base64Content });
  //       } else if (
  //         Number(v.documentType) === DOCUMENTCHECKLIST.SIGNATURE.value
  //       ) {
  //         this.setState({ customerSignature: v.base64Content });
  //       } else if (
  //         Number(v.documentType) === DOCUMENTCHECKLIST.NIDFRONT.value
  //       ) {
  //         this.setState({ customerNIDFRONT: v.base64Content }, () => {
  //           console.log(this.state.customerNIDFRONT);
  //         });
  //       } else if (Number(v.documentType) === DOCUMENTCHECKLIST.NIDBACK.value) {
  //         this.setState({ customerNIDBACK: v.base64Content });
  //       } else if (
  //         Number(v.documentType) === DOCUMENTCHECKLIST.PASSPORT.value
  //       ) {
  //         this.setState({ customerPASSPORT: v.base64Content });
  //       }
  //     });
  //   });
  //   this.setState({
  //     customerName: customerName,
  //     fatherName: fatherName,
  //     motherName: motherName,
  //     spouseName: spouseName,
  //     presentAddress: presentAddress,
  //     permanentAddress: permanentAddress,
  //     dob: dob,
  //   });
  // };

  componentDidMount() {
    // this.customerCreation();
    console.log("this.props.location.state", this.props.location?.state)
    
    
  }

  render() {
    console.log("first", this.props)
    Font.register({
      family: "kalpurush",
      src: "/kalpurush.ttf",
    });
    Font.register({
      family: "Oswald",
      src: "https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf",
    });
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
        marginVertical: 15,
        marginHorizontal: 5,
        width: "100%",
      },
      image2: {
        marginVertical: 0,
        marginHorizontal: 0,
        width: "70%",
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
    });
    
    const MyDoc = () => (
      <Document>
        <Page size="A4" style={styles.body}>
        <View style={styles.container}>
          <View style={styles.leftColumn}>
            <Image style={styles.image1} src="/logo1.png" />
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
        <View style={styles.cusView}>
          <Text style={styles.textT}>LOAN APPLICATION FORM (INDIVIDUAL)</Text>
        </View>
        <View style={styles.container}>
          <View style={styles.leftColumn1}>
          <View style={styles.cusView}>
          <Text style={styles.text}>The Manager</Text>
        </View>
        <View style={[styles.cusView, { marginTop: "-10px" }]}>
          <Text style={styles.text}>UCO Bank</Text>
        </View>
        <View style={[styles.cusView, { marginTop: "-10px" }]}>
          <Text
            style={{
              display: "flex",
              flexDirection: "row",
              width: "15%",
              borderBottom: "1px solid #000000",
              fontSize: "9px",
            }}
          >
            Gulshan
          </Text>
          <Text style={styles.text}>Branch</Text>
        </View>
        <View
          style={[styles.cusView, { marginTop: "10px", marginBottom: "-10px" }]}
        >
          <Text style={styles.text}>Dear Sir,</Text>
        </View>
          </View>
          <View style={styles.rightColumn1}>
            <Image style={styles.image2} src="/user-image.jpg" />
          </View>
        </View>
        <View style={[styles.cusView, { marginTop: "5px" }]}>
          <Text style={styles.text}>
            I/We am/are applying for a loan in your Branch. I/We furnish
            below information regarding the account and personal details:
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
              <Text style={styles.tableCellCus}>Applicant Name (In Bangla)</Text>
            </View>
            <View style={[styles.tableColCus, { width: "70%" }]}>
              <Text style={styles.tableCellCus}>
              আসিফ বইন মোস্তফা অনিক  {" "}
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
              <Text style={styles.tableCellCus}>In English Block Letter</Text>
            </View>
            <View style={[styles.tableColCus, { width: "70%" }]}>
              <Text style={styles.tableCellCus}>ASIF BIN MOSTAFA ANIK</Text>
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
              <Text style={styles.tableCellCus}>Md Golam Mostafa</Text>
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
              <Text style={styles.tableCellCus}>Rabveya Mostafa</Text>
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
              <Text style={styles.tableCellCus}>1948048457</Text>
            </View>
            <View style={[styles.tableColCus, { width: "3%" }]}>
              <Text style={styles.tableCellCus}>v</Text>
            </View>
            <View style={[styles.tableColCus, { width: "20%" }]}>
              <Text style={styles.tableCellCus}>Date of Birth</Text>
            </View>
            <View style={[styles.tableColCus, { width: "28%" }]}>
              <Text style={styles.tableCellCus}>17/09/1992</Text>
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
              <Text style={styles.tableCellCus}>Service</Text>
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
              <Text style={styles.tableCellCus}>01824320390</Text>
            </View>
            <View style={[styles.tableColCus, { width: "3%" }]}>
              <Text style={styles.tableCellCus}>ix</Text>
            </View>
            <View style={[styles.tableColCus, { width: "20%" }]}>
              <Text style={styles.tableCellCus}>Email</Text>
            </View>
            <View style={[styles.tableColCus, { width: "28%" }]}>
              <Text style={styles.tableCellCus}>anik@commlinkinfotech.com</Text>
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
              <Text style={styles.tableCellCus}>
                Personal
              </Text>
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
          <Text style={styles.text}>
            Guarantor’s information below:
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
              <Text style={styles.tableCellCus}>Guarantor Name (In Bangla)</Text>
            </View>
            <View style={[styles.tableColCus, { width: "70%" }]}>
              <Text style={styles.tableCellCus}>
              মোঃ সোলায়মান আল- হাসান{"  "}
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
              <Text style={styles.tableCellCus}>In English Block Letter</Text>
            </View>
            <View style={[styles.tableColCus, { width: "70%" }]}>
              <Text style={styles.tableCellCus}>MD SOLIMAN AL- HASAN</Text>
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
              <Text style={styles.tableCellCus}>মোঃ ফজলুর রহমান</Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View
              style={[styles.tableColCus, { width: "3%", borderTopWidth: 0 }]}
            >
              <Text style={styles.tableCellCus}>iv</Text>
            </View>
            <View style={[styles.tableColCus, { width: "27%" }]}>
              <Text style={styles.tableCellCus}>Mother Name</Text>
            </View>
            <View style={[styles.tableColCus, { width: "70%" }]}>
              <Text style={styles.tableCellCus}>সালেহা বেগম</Text>
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
              <Text style={styles.tableCellCus}>N/A</Text>
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
              <Text style={styles.tableCellCus}>3263339149</Text>
            </View>
            <View style={[styles.tableColCus, { width: "3%" }]}>
              <Text style={styles.tableCellCus}>vii</Text>
            </View>
            <View style={[styles.tableColCus, { width: "20%" }]}>
              <Text style={styles.tableCellCus}>Date of Birth</Text>
            </View>
            <View style={[styles.tableColCus, { width: "28%" }]}>
              <Text style={styles.tableCellCus}>01-11-1991</Text>
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
              <Text style={styles.tableCellCus}>ছাত্র</Text>
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
              <Text style={styles.tableCellCus}>01926374653</Text>
            </View>
            <View style={[styles.tableColCus, { width: "3%" }]}>
              <Text style={styles.tableCellCus}>xi</Text>
            </View>
            <View style={[styles.tableColCus, { width: "20%" }]}>
              <Text style={styles.tableCellCus}>Email</Text>
            </View>
            <View style={[styles.tableColCus, { width: "28%" }]}>
              <Text style={styles.tableCellCus}>solaiman@commlinkinfotech.com</Text>
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
            <Text style={styles.tableCellCus}>৬৭২, পশ্চিম শেওড়াপাড়া, ওয়ার্ড নং-14, মিরপুর-1216, ঢাকা উত্তর সিটি কর্পোরেশন, ঢাকা </Text>
              <Text style={styles.tableCellCus}>বিদ্যাবাগীশ,ফুলবাড়ী,ফুলবাড়ী -৫৬৮০,  কুড়িগ্রাম, রংপুর </Text>
            </View>
            <View style={[styles.tableColCus, { width: "51%" }]}>
            <Text style={styles.tableCellCus}>বিদ্যাবাগীশ,ফুলবাড়ী,ফুলবাড়ী -৫৬৮০,  কুড়িগ্রাম, রংপুর </Text>
            </View>
          </View>
        </View>
        <View style={[styles.cusViewH2, { marginBottom: "10px", marginTop:"30px" }]} >
          <Text
            style={[styles.text, { textAlign: "left", fontSize: "14", textDecoration:"underline" }]}
            break
          >
           DECLARATION:
          </Text>
          </View>
          <View style={[styles.cusViewH2, { marginBottom: "10px" }]} >
          <Text
            style={[styles.text, { textAlign: "left", fontSize: "10" }]}
            break
          >
            I declare that all particulars and information given in the above form are true, correct and complete 
            and that they shall form the basis of loan to be availed from UCO Bank. 
          </Text>
        </View>
          <View style={[styles.cusViewH2, { marginBottom: "10px" }]} >
          <Text
            style={[styles.text, { textAlign: "left", fontSize: "10" }]}
          >
           I confirm that I have had no insolvency proceedings against me nor have I ever been adjudicated /insolvent. 
          </Text>
        </View>
          <View style={[styles.cusViewH2, { marginBottom: "10px" }]} >
          <Text
            style={[styles.text, { textAlign: "left", fontSize: "10" }]}

          >
           I also agree to UCO Bank making enquiries in respect of the above statement/information made by 
            me. I further agree as guarantor of the above stated loan if sanctioned shall be governed by the rules
            of UCO Bank which may be in force from time to time. 
          </Text>
        </View>
        <View style={[styles.cusViewH2, { marginTop:"40px" }]} >
          <Text
            style={[styles.text, { textAlign: "left", fontSize: "12" }]}
          >
          SOLIMAN AL- HASAN
          </Text>
        </View>
          <View style={[styles.cusViewH2, { marginBottom: "10px", marginTop:"10px" }]} >
          <Text
            style={[styles.text, { textAlign: "left", fontSize: "14" }]}
            break
          >
          (Guarantor’s Signature)
          </Text>
        </View>
          <View style={[styles.cusViewH2, { marginTop:"10px" }]} >
          <Text
            style={[styles.text, { textAlign: "left", fontSize: "12" }]}
            break
          >
          Date:- 05-09-2023
          </Text>
        </View>
          <View style={[styles.cusViewH2, { marginBottom: "10px", marginTop:"5px" }]} >
          <Text
            style={[styles.text, { textAlign: "left", fontSize: "12", fontWeight:"bold" }]}
            break
          >
          Place:- Gulshan 1, Dhaka
          </Text>
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
  }
}

export default ApplicationForm;
