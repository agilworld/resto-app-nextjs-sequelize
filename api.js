'use strict'
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

const getBaseUrl = () => {
    if( process.env.NODE_ENV==='development') {
        return 'http://localhost:3000/api'
    } else if(process.env.NODE_ENV==='production') {
        return 'http://localhost:3000/api'
    }
}

const CancelToken = axios.CancelToken;
let terminateAPI;

class Api {
    async _request(request) {
        const baseUrl = getBaseUrl()
        let token
        let header = {'Content-Type': 'application/json'}
        let options = {
            baseURL: baseUrl,
            url:request.url,
            method:request.method??'get',
            timeout: 1000 * 90,
        }

        if (token) {
            let Authorization = 'Bearer ' + token;
            header = { ...header, 'Authorization': Authorization }
        }

        if (header) options.headers = header;

        if(request.params) {
            options.params = request.params
        }

        if(request.data) {
            options.data = request.data
        }

        return await new axios.request(options)
    }

    singleRequest(requests) {
        return new Promise(function (resolve, reject) {
            requests.then((response) => {
                resolve(response);
            }).catch((error) => {
                const dataMessage = errorCondition(error);
                reject(dataMessage);
            })
        })
    }

    async getBranch(args,id) {
        return id ? this._request({
            url: `branch/${id}`,
            method: 'get',
            params: args,
        }) : this._request({
            url: 'branch',
            method: 'get',
            params: args,
        });
    }

    async createBranch(args) {
        return this._request({
            url: `branch`,
            method: 'post',
            data: args,
        })
    }

    async updateBranch(id, args) {
        return this._request({
            url: `branch/${id}`,
            method: 'put',
            data: args,
        })
    }

    async deleteBranch(id) {
        return this._request({
            url: `branch/${id}`,
            method: 'delete',
        })
    }

    // Meals
    async getMeals(args,id) {
        return id ? this._request({
            url: `meal/${id}`,
            method: 'get',
            data: args,
        }) : this._request({
            url: 'meal',
            method: 'get',
            params: args,
        });
    }

    async createMeal(args) {
        return this._request({
            url: `meal`,
            method: 'post',
            data: args,
        })
    }

    async updateMeal(id, args) {
        return this._request({
            url: `meal/${id}`,
            method: 'put',
            data: args,
        })
    }

    async deleteMeal(id) {
        return this._request({
            url: `meal/${id}`,
            method: 'delete',
        })
    }

    // Plans
    async getPlans(args,id) {
        return id ? this._request({
            url: `plan/${id}`,
            method: 'get',
            data: args,
        }) : this._request({
            url: 'plan',
            method: 'get',
            params: args,
        });
    }

    async createPlan(args) {
        return this._request({
            url: `plan`,
            method: 'post',
            data: args,
        })
    }

    async updatePlan(id, args) {
        return this._request({
            url: `plan/${id}`,
            method: 'put',
            data: args,
        })
    }

    async deletePlan(id) {
        return this._request({
            url: `plan/${id}`,
            method: 'delete',
        })
    }

    // User
    async getUsers(args,id) {
        return id ? this._request({
            url: `user/${id}`,
            method: 'get',
            data: args,
        }) : this._request({
            url: 'user',
            method: 'get',
            params: args,
        });
    }

    async createUser(args) {
        return this._request({
            url: `user`,
            method: 'post',
            data: args,
        })
    }

    async updateUser(id, args) {
        return this._request({
            url: `user/${id}`,
            method: 'put',
            data: args,
        })
    }

    async deleteUser(id) {
        return this._request({
            url: `user/${id}`,
            method: 'delete',
        })
    }
}

export function errorCondition(error) {
    const status = error.response ? error.response.status : undefined;
    let message;

    if (status && (status >= 200) && (status <= 400)) {
        message = error.response.data.error || error.response.data.message;
    } else {
        let errorResponseData = error.response ? error.response.data : undefined
        if (errorResponseData) {
            if (errorResponseData.message) {
                message = errorResponseData.message;
            } else {
                message = errorResponseData;
            }
        }

        if (status === 401) {
            message = '401';
        }

        if (status === 404) {
            message = 'Server not found';
        }
    }

    if (!message) {
        message = 'Something went wrong!'
    }

    const dataMessage = {
        message: message,
        alertType: 'error',
    }

    return dataMessage;
}

export default new Api