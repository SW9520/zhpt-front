import axios from 'axios';
import qs from 'qs'
var ajax = {};
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'; 
/** 
 * ajax.sendPostRequest
 * @param {Object} url
 * @param {Object} params
 * @param {Object} success
 * @param {Object} error
 */
ajax.sendPostRequest = function(url, params, success, error) {
      
        return new Promise((resolve, reject) => {
            axios.post(url,qs.stringify(params) )
                .then(res => {
                    resolve(res);
                })
                .catch(err => {
                    reject(err)
                })
        }).then(success).catch(error);
    },

    /** 
     * ajax.sendGetRequest
     * @param {Object} url
     * @param function success
     * @param function error
     */
    ajax.sendGetRequest = function(url, success, error) {
        return new Promise((resolve, reject) => {
            axios.get(url).then(res => {
                resolve(res)
            }).catch(err => {
                reject(err)
            });
        }).then(success).catch(error);
    }

export default ajax;