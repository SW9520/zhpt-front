var ajax = {}
var axios = require("axios")
/**
 * @param {Object} url
 * @param {Object} param
 * @param {Object} success
 * @param {Object} error
 */
axios.defaults.baseURL = "http://localhost:8080"
ajax.sendPostRequest = function(url, param, success, error){
        axios.post(url, param)
            .then(success)
            .catch(error);
    },
    
/** 
 * 
 * @param {Object} url
 * @param {Object} param
 * @param function success
 * @param function error
 */    
ajax.sendGetRequest = function(url, success, error) {
    axios
        .get(url)
        .then(response => (this.info = response))
        .catch(function(error) { // 请求失败处理
            console.log(error);
        });
}


export {
    ajax
}
