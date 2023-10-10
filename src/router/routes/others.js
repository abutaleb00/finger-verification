import { lazy } from 'react'
const ViewApplicant = lazy(() => import("../../views/pages/applications/ViewApplicant"));
const NewApplications = lazy(() => import("../../views/pages/applications/NewApplications"))
const PendingApplications = lazy(() => import("../../views/pages/applications/PendingApplications"))
const VerifiedApplications = lazy(() => import("../../views/pages/applications/VerifiedApplications"))
const EditApplicant = lazy(() => import("../../views/pages/applications/EditApplicant"));
const NidVerify2 = lazy(() => import("../../views/pages/NidVerify2"));
const EcReturnData = lazy(() => import("../../views/pages/EcReturnData"));
const Grantors = lazy(() => import("../../views/pages/Grantors"));
const ApplicationForm = lazy(() => import("../../views/pages/ApplicationForm"));
const NewGrantors = lazy(() => import("../../views/pages/NewGrantors"));
const VerifiedUserList = lazy(() => import("../../views/pages/VerifiedUserList"));
const GrantorEdit = lazy(() => import("../../views/pages/GrantorEdit"));
const PendingUser = lazy(() => import("../../views/pages/PendingUser"));
const Reports = lazy(() => import("../../views/pages/Reports"));
const EcData = lazy(() => import("../../views/pages/ec/EcData"));
const AuditTrail = lazy(() => import("../../views/pages/admin/AuditTrail"));
const UserList = lazy(() => import("../../views/pages/admin/UserList"));
const CreateUser = lazy(() => import("../../views/pages/admin/CreateUser"));
const UpdateUser = lazy(() => import("../../views/pages/admin/UpdateUser"));
const OthersRoutes = [
    {
        path: "/nid-verify",
        element: <NidVerify2 />,
        meta: {
          action: 'read',
          resource: 'FingerPrintVerify'
        }
      },
      {
        path: "/ec-data",
        element: <EcReturnData />,
        meta: {
          action: 'read',
          resource: 'EcReturnData'
        }
      },
      {
        path: "/grantors",
        element: <Grantors />,
        meta: {
          action: 'read',
          resource: 'Grantor'
        }
      },
      {
        path: "/new-grantors",
        element: <NewGrantors />,
        meta: {
          action: 'read',
          resource: 'Grantor'
        }
      },
      {
        path: "/verified-userlist",
        element: <VerifiedUserList />,
        meta: {
          action: 'read',
          resource: 'VerifiedUserList'
        }
      },
      {
        path: "/grantor-edit",
        element: <GrantorEdit />,
        meta: {
          action: 'read',
          resource: 'Grantor'
        }
      },
      {
        path: "/pending-user",
        element: <PendingUser />,
        meta: {
          action: 'read',
          resource: 'PendingUser'
        }
      },
      {
        path: "/user-view",
        element: <ViewApplicant />,
        meta: {
          action: 'read',
          resource: 'PendingUser'
        }
      },
      {
        path: "/new-applications",
        element: <NewApplications />,
        meta: {
          action: 'read',
          resource: 'PendingUser'
        }
      },
      {
        path: "/pending-applications",
        element: <PendingApplications />,
        meta: {
          action: 'read',
          resource: 'PendingUser'
        }
      },
      {
        path: "/verified-applications",
        element: <VerifiedApplications />,
        meta: {
          action: 'read',
          resource: 'PendingUser'
        }
      },
      {
        path: "/user-edit",
        element: <EditApplicant />,
        meta: {
          action: 'read',
          resource: 'PendingUser'
        }
      },
      {
        path: "/application-form",
        element: <ApplicationForm />,
        meta: {
          action: 'read',
          resource: 'ApplicationForm'
        }
      },
      {
        path: "/reports",
        element: <Reports />,
        meta: {
          action: 'read',
          resource: 'Reports'
        }
      },
      {
        path: "/admin/audit-trail",
        element: <AuditTrail />,
        meta: {
          action: 'read',
          resource: 'AdminSetting'
        }
      },
      {
        path: "/admin/ec-data",
        element: <EcData />,
        meta: {
          action: 'read',
          resource: 'AdminSetting'
        }
      },
      {
        path: "/admin/user-list",
        element: <UserList />,
        meta: {
          action: 'read',
          resource: 'AdminSetting'
        }
      },
      {
        path: "/admin/create-user",
        element: <CreateUser />,
        meta: {
          action: 'read',
          resource: 'AdminSetting'
        }
      },
      {
        path: "/admin/update-user",
        element: <UpdateUser />,
        meta: {
          action: 'read',
          resource: 'AdminSetting'
        }
      }
]

export default OthersRoutes
