import { HOST } from '../../commons/hosts';
import RestApiClient from "../../commons/api/rest-client";


const endpoint = {
    admin: '/adminboard',
    objectives: '/objectives'
};


function getObjectives(callback) {
    let request = new Request(HOST.backend_api + endpoint.admin + endpoint.objectives, {
        method: 'GET',
    });
    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}

function getObjectiveById(params, callback) {
    let request = new Request(HOST.backend_api + endpoint.admin + endpoint.objectives + params.id, {
        method: 'GET'
    });

    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}

function postObjective(objective, callback) {
    let request = new Request(HOST.backend_api + endpoint.admin + endpoint.objectives, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(objective)
    });

    console.log("URL: " + request.url);

    RestApiClient.performRequest(request, callback);
}


function updateObjective(id, objective, callback) {
    let request = new Request(HOST.backend_api + endpoint.admin + endpoint.objectives + '/update/' + id, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(objective)
    });

    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}


function deleteObjective(id, callback) {
    let request = new Request(HOST.backend_api + endpoint.admin + endpoint.objectives + '/delete/' + id, {
        method: 'DELETE'
    });

    console.log("delete" + request.url);
    RestApiClient.performRequest(request, callback);
}

export {
    getObjectives,
    getObjectiveById,
    postObjective,
    updateObjective,
    deleteObjective
};