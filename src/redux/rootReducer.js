// ** Reducers Imports
import navbar from './navbar'
import layout from './layout'
import auth from './authentication'
import todo from '@src/views/apps/todo/store'
import users from '@src/views/apps/user/store'
import invoice from '@src/views/apps/invoice/store'
import permissions from '@src/views/apps/roles-permissions/store'

const rootReducer = {
  auth,
  todo,
  users,
  navbar,
  layout,
  invoice,
  permissions
}

export default rootReducer
