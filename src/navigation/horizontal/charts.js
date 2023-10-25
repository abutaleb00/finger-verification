// ** Icons Import
import {  CheckCircle, PlusCircle, Users, UserX,BarChart,Database, Share2, Globe, Clock, PieChart, Settings, Circle } from 'react-feather'

export default [
  {
    id: "nidverify",
    title: "Finger Verification",
    icon: <Globe size={20} />,
    action: 'read',
    resource: 'FingerPrintVerify',
    navLink: "/nid-verify",
  },
  {
    id: "applications",
    title: "Applications",
    icon: <Users size={20} />,
    action: 'read',
    resource: 'ViewApplicant',
    children: [
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
        navLink: '/admin/user-list',
        action: 'read',
        resource: 'AdminSetting',
      },
      {
        id: 'Permissions',
        title: 'Permissions',
        icon: <Share2 />,
        navLink: '/admin/role-permissions',
        action: 'read',
        resource: 'AdminSetting',
      },
      {
        id: 'audittrail',
        title: 'Audit Trail',
        icon: <BarChart />,
        navLink: '/admin/audit-trail',
        action: 'read',
        resource: 'AdminSetting',
      },
      {
        id: 'ecData',
        title: 'EC Data',
        icon: <Database />,
        navLink: '/admin/ec-data',
        action: 'read',
        resource: 'AdminSetting',
      }
    ]
  }
]
