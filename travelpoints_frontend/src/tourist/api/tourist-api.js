import { HOST } from '../../commons/hosts';
import RestApiClient from "../../commons/api/rest-client";


const endpoint = {
    tourist: '/touristboard',
    comment: '/comment',
    objectives: '/objectives',
    wishlist: '/wishlist'
};



function getObjectives(callback) {
    let request = new Request(HOST.backend_api + endpoint.tourist + endpoint.objectives, { 
        method: 'GET',
    });
    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}
function getWishlists(callback) {
    let request = new Request(HOST.backend_api + endpoint.tourist + endpoint.wishlist, {
        method: 'GET',
    });
    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}
function comment(id, objective,callback){
    let request = new Request(HOST.backend_api + endpoint.tourist + endpoint.objectives + '/comment/' + id, {
        method: 'POST',
        headers : {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(objective)
    });

    console.log("URL: " + request.url);
    console.log("login URL: " + objective);
    RestApiClient.performRequest(request, callback);
}

function addWishObjective(id,callback) {
    let request = new Request(HOST.backend_api + endpoint.tourist + endpoint.objectives + '/wish/' + id, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(callback)

    });





    console.log("URL: " + request.url);

    RestApiClient.performRequest(request, callback);
}


export {
    comment,
    getObjectives,
    addWishObjective,
    getWishlists

};