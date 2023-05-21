import {HOST} from '../../commons/hosts';
import RestApiClient from "../../commons/api/rest-client";


const endpoint = {
    register: '/register'
};

 
function register(user, callback){
    let request = new Request(HOST.backend_api +  endpoint.register , {
        method: 'POST',
        headers : {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user)
    });

    console.log("URL: " + request.url);
    console.log("register URL: " + user);
    RestApiClient.performRequest(request, callback);
}


export {
  register
};