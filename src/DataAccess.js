import Axios from 'axios';
class DataAccess {    
    constructor(){}

    getAll(url){
        const response = Axios.get(url, {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json",
                "Access-Control-Allow-Headers": "*",
                'Access-Control-Allow-Methods': "*"
            }
        })
        .then((res) => {
            return res;
        })
        .catch((error) => {
            console.error('Error', error.response);
            return error;
        });
        return response;
    }

    get(url, id){
        const response = Axios.get(`${url}/${id}`, {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json",
                "Access-Control-Allow-Headers": "*",
                'Access-Control-Allow-Methods': "*"
            }
        })
        .then((res) => {
            return res;
        })
        .catch((error) => {
            console.error('Error get', error.response);
            return error;
        });
        return response;
    }

    post(url, data){
        const response = Axios.post(url, data, {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json",
                "Access-Control-Allow-Headers": "*",
                'Access-Control-Allow-Methods': "*"
            }
        })
        .then((res) => {
            return res;
        })
        .catch((error) => {
            console.error('Error post', error.response);
            return error;
        });
        return response;
    }

    patch(url, id, data){
        const response = Axios.patch(`${url}/${id}`, data, {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json",
                "Access-Control-Allow-Headers": "*",
                'Access-Control-Allow-Methods': "*"
            }
        })
        .then(async (res) => {
            console.log(res);
            return res;
        })
        .catch(async (error) => {
            console.error('Error patch', error.response);
            return error;
        });
        return response;
    }

    delete(url, id){
        const response = Axios.delete(`${url}/${encodeURIComponent(id)}`, {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json",
                "Access-Control-Allow-Headers": "*",
                'Access-Control-Allow-Methods': "*"
            }
        })
        .then(async (res) => {
            console.log('response delete', res);
            return res;
        })
        .catch(async (error) => {
            console.error('Error delete', error.response);
            return error;
        });
        return response;
    }

}

export default new DataAccess();
