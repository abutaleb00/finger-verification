import { lazy } from 'react'

const Reactstrap = lazy(() => import('../../views/tables/reactstrap'))

const TablesRoutes = [
  {
    path: '/tables/reactstrap',
    element: <Reactstrap />
  }
]

export default TablesRoutes
