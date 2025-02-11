// ** Icons Import
import {  CheckCircle, PlusCircle, Users, UserX,BarChart,BarChart2, Database, Share2, Globe, Clock, PieChart, Settings, Circle } from 'react-feather'

export default [
  // {
  //   id: "nidverify",
  //   title: "Finger Verification",
  //   icon: <Globe size={20} />,
  //   action: 'read',
  //   resource: 'FingerPrintVerify',
  //   navLink: "/nid-verify",
  // },
  {
    id: "nidverify",
    title: "Application Initiate",
    icon: <Globe size={20} />,
    action: 'read',
    resource: 'FingerPrintVerify',
    navLink: "/application-initiate",
  },
  {
    id: "applications",
    title: "Applications",
    icon: <Users size={20} />,
    action: 'read',
    resource: 'ViewApplicant',
    children: [
      {
        id: 'IndividualApplicationList',
        title: 'Initiate Individual Application',
        icon: <Circle />,
        navLink: '/initiate-individual-application',
        action: 'read',
        resource: 'NewApplications',
      },
      {
        id: 'CompanyApplicationList',
        title: 'Initiate Company Application',
        icon: <Circle />,
        navLink: '/initiate-company-application',
        action: 'read',
        resource: 'NewApplications',
      },
      {
        id: 'NewApplications',
        title: 'New Applications',
        icon: <PlusCircle />,
        navLink: '/new-applications',
        action: 'read',
        resource: 'NewApplications',
      },
      {
        id: 'PendingApplications',
        title: 'Pending Applications',
        icon: <Clock />,
        navLink: '/pending-applications',
        action: 'read',
        resource: 'PendingApplications',
      },
      {
        id: 'VerifiedApplications',
        title: 'Verified Applications',
        icon: <CheckCircle />,
        navLink: '/verified-applications',
        action: 'read',
        resource: 'VerifiedApplications',
      }
    ]
  },
  {
    id: "Reports",
    title: "Reports",
    icon: <PieChart size={20} />,
    navLink: "/reports",
    action: 'read',
    resource: 'Reports',
  },
  {
    id: "DeleteReports",
    title: "Delete Report",
    icon: <BarChart2 size={20} />,
    navLink: "/delete-report",
    action: 'read',
    resource: 'AdminSetting',
  },
  {
    id: 'AdminSetting',
    title: 'Admin Settings',
    icon: <Settings />,
    action: 'read',
    resource: 'AdminSetting',
    children: [
      {
        id: 'list',
        title: 'User List',
        icon: <UserX />,
        navLink: '/user-list',
        action: 'read',
        resource: 'AdminSetting',
      },
      {
        id: 'Permissions',
        title: 'Permissions',
        icon: <Share2 />,
        navLink: '/role-permissions',
        action: 'read',
        resource: 'AdminSetting',
      },
      {
        id: 'audittrail',
        title: 'Audit Trail',
        icon: <BarChart />,
        navLink: '/audit-trail',
        action: 'read',
        resource: 'AdminSetting',
      },
      {
        id: 'ecData',
        title: 'EC Data',
        icon: <Database />,
        navLink: '/ec-user',
        action: 'read',
        resource: 'AdminSetting',
      }
    ]
  }
]
