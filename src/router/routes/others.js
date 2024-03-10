import { lazy } from 'react'
const ViewApplicant = lazy(() => import("../../views/pages/applications/ViewApplicant"));
const NewApplications = lazy(() => import("../../views/pages/applications/NewApplications"))
const PendingApplications = lazy(() => import("../../views/pages/applications/PendingApplications"))
const VerifiedApplications = lazy(() => import("../../views/pages/applications/VerifiedApplications"))
const GuarantorNidVerify = lazy(() => import("../../views/pages/applications/GuarantorNidVerify"))
const GuarantorEcData = lazy(() => import("../../views/pages/applications/GuarantorEcData"))
const EditApplicant = lazy(() => import("../../views/pages/applications/EditApplicant"));
const InitNidVerify = lazy(() => import("../../views/pages/InitNidVerify"));
const BorrowerNidVerify = lazy(() => import("../../views/pages/applications/BorrowerNidVerify"));
const BorrowerEcData = lazy(() => import("../../views/pages/applications/BorrowerEcData"));
const EcReturnData = lazy(() => import("../../views/pages/EcReturnData"));
const Grantors = lazy(() => import("../../views/pages/Grantors"));
// const ApplicationForm = lazy(() => import("../../views/pages/ApplicationForm"));
const ApplicationForm = lazy(() => import("../../views/pages/applications/ApplicationForm"));
const NewGrantors = lazy(() => import("../../views/pages/NewGrantors"));
const VerifiedUserList = lazy(() => import("../../views/pages/VerifiedUserList"));
const GrantorEdit = lazy(() => import("../../views/pages/GrantorEdit"));
const ApplicationInit = lazy(() => import("../../views/pages/applications/application-init/ApplicationInit"));
const IndividualApplicationList = lazy(() => import("../../views/pages/applications/application-init/IndividualApplicationList"));
const CompanyApplicationList = lazy(() => import("../../views/pages/applications/application-init/CompanyApplicationList"));
const EditGuarantor = lazy(() => import("../../views/pages/applications/EditGuarantor"));
const ViewGuarantor = lazy(() => import("../../views/pages/applications/ViewGuarantor"));
const PendingUser = lazy(() => import("../../views/pages/PendingUser"));
const Reports = lazy(() => import("../../views/pages/Reports"));
const EcData = lazy(() => import("../../views/pages/ec/EcData"));
const AuditTrail = lazy(() => import("../../views/pages/admin/AuditTrail"));
const UserList = lazy(() => import("../../views/pages/admin/UserList"));
const CreateUser = lazy(() => import("../../views/pages/admin/CreateUser"));
const UpdateUser = lazy(() => import("../../views/pages/admin/UpdateUser"));
const Role = lazy(() => import("../../views/pages/admin/roles"));
const CreateEcUser = lazy(() => import("../../views/pages/admin/CreateEcUser"));
const EditEcUser = lazy(() => import("../../views/pages/ec/EditEcUser"));
const ChangePassword = lazy(() => import("../../views/pages/users/ChangePassword"));
const CoBorrowerNidVerify = lazy(() => import("../../views/pages/applications/co-borrower/CoBorrowerNidVerify"));
const CoBorrowerEcData = lazy(() => import("../../views/pages/applications/co-borrower/CoBorrowerEcData"));
const ViewCoBorrower = lazy(() => import("../../views/pages/applications/co-borrower/ViewCoBorrower"));
const OthersRoutes = [
    {
        path: "/application-initiate",
        element: <ApplicationInit />,
        meta: {
          action: 'read',
          resource: 'FingerPrintVerify'
        }
      },
    {
        path: "/nid-verify",
        element: <InitNidVerify />,
        meta: {
          action: 'read',
          resource: 'FingerPrintVerify'
        }
      },
    {
        path: "/borrower-nid-verify",
        element: <BorrowerNidVerify />,
        meta: {
          action: 'read',
          resource: 'FingerPrintVerify'
        }
      },
    {
        path: "/borrower-ec-data",
        element: <BorrowerEcData />,
        meta: {
          action: 'read',
          resource: 'FingerPrintVerify'
        }
      },
    {
        path: "/guarantor-nid-verify",
        element: <GuarantorNidVerify />,
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
        path: "/guarantor-ec-data",
        element: <GuarantorEcData />,
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
        path: "/coborrower-nid-verify",
        element: <CoBorrowerNidVerify />,
        meta: {
          action: 'read',
          resource: 'Grantor'
        }
      },
      {
        path: "/coborrower-view",
        element: <ViewCoBorrower />,
        meta: {
          action: 'read',
          resource: 'Grantor'
        }
      },
      {
        path: "/coborrower-ec-data",
        element: <CoBorrowerEcData />,
        meta: {
          action: 'read',
          resource: 'EcReturnData'
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
        element: <EditGuarantor />,
        meta: {
          action: 'read',
          resource: 'Grantor'
        }
      },
      {
        path: "/grantor-view",
        element: <ViewGuarantor />,
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
        path: "/view-application",
        element: <ViewApplicant />,
        meta: {
          action: 'read',
          resource: 'ViewApplicant'
        }
      },
      {
        path: "/new-applications",
        element: <NewApplications />,
        meta: {
          action: 'read',
          resource: 'NewApplications'
        }
      },
      {
        path: "/pending-applications",
        element: <PendingApplications />,
        meta: {
          action: 'read',
          resource: 'PendingApplications'
        }
      },
      {
        path: "/verified-applications",
        element: <VerifiedApplications />,
        meta: {
          action: 'read',
          resource: 'VerifiedApplications'
        }
      },
      {
        path: "/edit-application",
        element: <EditApplicant />,
        meta: {
          action: 'read',
          resource: 'ViewApplicant'
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
      },
      {
        path: "/admin/ec-user-create",
        element: <CreateEcUser />,
        meta: {
          action: 'read',
          resource: 'AdminSetting'
        }
      },
      {
        path: "/admin/ec-user-update",
        element: <EditEcUser />,
        meta: {
          action: 'read',
          resource: 'AdminSetting'
        }
      },
      {
        path: "/admin/role-permissions",
        element: <Role />,
        meta: {
          action: 'read',
          resource: 'AdminSetting'
        },
      },
      {
        path: "/user/change-password",
        element: <ChangePassword />,
        meta: {
          action: 'read',
          resource: 'ChangePassword'
        }
      },
      {
        path: "/initiate-individual-application",
        element: <IndividualApplicationList />,
        meta: {
          action: 'read',
          resource: 'FingerPrintVerify'
        }
      },
      {
        path: "/initiate-company-application",
        element: <CompanyApplicationList />,
        meta: {
          action: 'read',
          resource: 'FingerPrintVerify'
        }
      }
]

export default OthersRoutes
