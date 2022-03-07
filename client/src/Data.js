import config from './config';

let id = [];

export default class Data {

    // Get data from API
    api(path, method = 'GET', body = null, requiresAuth = false, credentials = null) {
        const url = config.apiBaseUrl + path;

        const options = {
            method,
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            },
        };

        if(body !== null) {
            options.body = JSON.stringify(body);
        } 
        //Checks if authorization is necessary
        if (requiresAuth) {
            const encodedCredentials = btoa(`${credentials.emailAddress}:${credentials.password}`);
            options.headers['Authorization'] = `Basic ${encodedCredentials}`;
        }

        return fetch(url, options);
    }

    // Gets user from API
    async getUser(emailAddress, password) {
        const response = await this.api('/users', 'GET', null, true, {emailAddress, password});
        if (response.status === 200) {
            return response.json().then(data => data);
        } else if (response.status === 401) {
            return null;
        } else {
            throw new Error();
        }
    }

    // Creates new user
    async createUser(user) {
        const response = await this.api('/users', 'POST', user);
        if (response.status === 201) {
            console.log("User created");
            return [];
        } else if (response.status === 400) {
            return response.json().then(data=> {
                return data.errors;
            });
        } else {
            throw new Error();
        }
    }


    // Gets courses from API
    async getCourses() {
        const response = await this.api('/courses', 'GET', null);
        if (response.status === 200) {
            return response.json();//.then(data => data);
        } else if (response.status === 401) {
            return response.status;
        } else {
            throw new Error();
        }
    }


    // Gets specific courses from API with id
    async getCourse(id) {
        const response = await this.api(`/courses/${id}`, 'GET', null);
        if (response.status === 200) {
            return response.json().then(data => data);
        } else if (response.status === 404) {
            console.log(response.status);    // Remove later
            return response.status;
        } else {
            throw new Error();
        }
    }

    // Creates a new course
    async createCourse(course, emailAddress, password) {
        const response = await this.api(`/courses/${id}`, 'POST', course, true, {emailAddress, password});
        if (response.status === 201) {
            return [];
        } else if (response.status === 400) {
            return response.json().then(data => {
                return data.errors;
            });
        } else {
            throw new Error();
        }
    }

    // Updates a course's information
    async updateCourse(course, id, emailAddress, password) {
        const response = await this.api(`/courses/${id}`, 'PUT', course, true, {emailAddress, password});
        if (response.status === 204) {
            return [];
        } else if (response.status === 400) {
            return response.json().then(data => {
                return data.errors;
            });
        } else {
            throw new Error();
        }
    }

    // Deletes a course
    async deleteCourse(id, emailAddress, password) {
        const response = await this.api(`/courses/${id}`, 'DELETE', null, true, {emailAddress, password});
        if (response.status === 204) {
            return [];
        } else if (response.status === 400) {
            return response.json().then(data => {
                return data.errors;
            });
        } else {
            throw new Error();
        }
    }

}