import api from '@/api.js'
import store from '@/store/index.js'
let menu = {}

menu.listTopMenu = () => {
  let user = store.state.User.userInfo
  let param = {'user': user}
  api.ajax.sendPostRequest('ZHPT_LIST_TOP_MENU', param, (response) => {
    return response
  })
}



export default menu
