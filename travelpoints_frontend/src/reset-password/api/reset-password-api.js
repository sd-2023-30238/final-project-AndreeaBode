import {HOST} from '../../commons/hosts';
import RestApiClient from "../../commons/api/rest-client";


const endpoint = {
    reset: '/reset/'
};

function resetPass(email,credentials, callback){
    let request = new Request(HOST.backend_api + endpoint.reset + email , {
        method: 'PUT',
        headers : {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials) 
    });

    console.log("URL: " + request.url);
    RestApiClient.performRequest(request, callback);
}


export {
  resetPass
};