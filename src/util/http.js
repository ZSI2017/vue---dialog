/* global VERSION:false */
'use strict'
import axios from "axios";
export default {
    get(url,successfn,errorfn){
        axios({
              url:url,
              method:'get',
              baseURL:'http://127.0.0.1:3000/',
              timeout: 10000,
              headers: {
                  'X-Requested-With': 'XMLHttpRequest'
                },
              validateStatus: function (status) {
                       return status>=0 && status  < 600;  // 默认的
               }
          }).then( (response) => {
             successfn(response);
          }
        ).catch(
              (error) => {
                console.log(error)

              }
        )
       }

};
