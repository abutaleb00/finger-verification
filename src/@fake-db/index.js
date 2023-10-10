import mock from './mock'

import './jwt'
import './apps/todo'
import './apps/invoice'
import './apps/userList'
import './pages/profile'
import './pages/blog-data'
import './navbar/navbarSearch'
import './apps/permissionsList'
import './cards/card-analytics'
import './cards/card-statistics'
import './pages/account-settings'
import './autoComplete/autoComplete'

mock.onAny().passThrough()
