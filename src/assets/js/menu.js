import api from '@/api.js'

let menu = {}

menu.listTopMenu = () => {
  let user = sessionStorage.getKey(api.key.USER_SESSION_KEY)
  let param = {'user': user}
  api.ajax.sendPostRequest('ZHPT_LIST_TOP_MENU', param, (response) => {
    return response
  })
}



export default menu
