import { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  CardText,
  CardLink,
  Row, Col
} from "reactstrap";
import UILoader from "@components/ui-loader";
import axios from "axios";
// ** Custom Components
import StatsHorizontal from '@components/widgets/stats/StatsHorizontal'
import '@styles/react/apps/app-users.scss'
import { getUserData } from '@utils'
import { useNavigate } from 'react-router-dom'

// ** Icons Imports
import { User, UserPlus, UserCheck, UserX, Layers, Layout, Monitor } from 'react-feather'

const EcommerceDashboard = () => {
  const user = getUserData()
  const navigate = useNavigate()
  const [block, setBlock] = useState(false);
  const [countData, setCountData] = useState(null);
  const dashboardCount = () => {
    const send = {
      loanapplication: {
        status: 2,
      },
    };
    setBlock(true);
    axios
      .post(`/dashboardcounts?startDate=2024-01-01&endDate=2024-10-03`)
      .then((res) => {
        setBlock(false);
        // setData(res.data.data);
        console.log("ress", res?.data?.data)
        setCountData(res?.data?.data)
      })
      .catch((err) => console.log(err));
  }; 
  useEffect(()=> {
    dashboardCount()
    if(user?.passwordChange === false){
      navigate('/user/change-password')
    }

    localStorage.setItem("accountType", "0")
  }, [])
  return (
    <UILoader blocking={block}>
    <div className='app-user-list'>
    <Row>
      <Col lg='3' sm='6'>
        <StatsHorizontal
          color='primary'
          statTitle='Total Users'
          icon={<User size={30} />}
          renderStats={<h3 className='fw-bolder mb-75' style={{fontSize:"36px"}}>{countData?.totalUsersCount}</h3>}
        />
      </Col>
      <Col lg='3' sm='6'>
        <StatsHorizontal
          color='success'
          statTitle='Number of Maker'
          icon={<UserCheck size={30} />}
          renderStats={<h3 className='fw-bolder mb-75' style={{fontSize:"36px"}}>{countData?.makerCount}</h3>}
        />
      </Col>
      <Col lg='3' sm='6'>
        <StatsHorizontal
          color='secondary'
          statTitle='Number of Checker'
          icon={<UserX size={30} />}
          renderStats={<h3 className='fw-bolder mb-75' style={{fontSize:"36px"}}>{countData?.checkerCount}</h3>}
        />
      </Col>
      <Col lg='3' sm='6'>
        <StatsHorizontal
          color='warning'
          statTitle='Number of Admin'
          icon={<UserPlus size={30} />}
          renderStats={<h3 className='fw-bolder mb-75' style={{fontSize:"36px"}}>{countData?.adminCount}</h3>}
        />
      </Col>
    </Row>
    <Row>
      <Col lg='4' sm='12'>
        <StatsHorizontal
          color='primary'
          statTitle='Number of New Application'
          icon={<Layers size={30} />}
          renderStats={<h3 className='fw-bolder mb-75' style={{fontSize:"36px"}}>{countData?.newLoans}</h3>}
        />
      </Col>
      <Col lg='4' sm='12'>
        <StatsHorizontal
          color='secondary'
          statTitle='Number of Pending Application'
          icon={<Layout size={30} />}
          renderStats={<h3 className='fw-bolder mb-75' style={{fontSize:"36px"}}>{countData?.pendingLoans}</h3>}
        />
      </Col>
      <Col lg='4' sm='12'>
        <StatsHorizontal
          color='success'
          statTitle='Number of Verified Application'
          icon={<Monitor size={30} />}
          renderStats={<h3 className='fw-bolder mb-75' style={{fontSize:"36px"}}>{countData?.verifiedLoans}</h3>}
        />
      </Col>
    </Row>
  </div>
  </UILoader>
  );
};

export default EcommerceDashboard