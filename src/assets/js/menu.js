import store from '@/store/index.js'
import ajax from '@/assets/js/ajax.js'
let menu = {}

menu.listTopMenu = () => {
 let user = store.state.User.userInfo
  let param = {'user': user}
  ajax.sendPostRequest('ZHPT_LIST_TOP_MENU', param, (response) => {

  }, err => {
     console.error(err)
  })
}



export default menu
