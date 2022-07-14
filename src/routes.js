const methods = require('./methods');

let routes = {
    '/create': function (body) {
        if(body.method !== "createForm") {
            return Promise.resolve({
                error: "wrong method"
            })
        }
        return new Promise((resolve, reject) => {
            if (!body) {
                throw new (`rpc request was expecting some data...!`);
            }
            let keys = Object.keys(body);
            let promiseArr = [];

            console.log(body)
            if (methods[body.method] && typeof (methods[body.method].exec) === 'function') {
                let execPromise = methods[body.method].exec.call(null, body);
                if (!(execPromise instanceof Promise)) {
                    throw new Error(`exec on ${body.method} did not return a promise`);
                }
                promiseArr.push(execPromise);
            } else {
                let execPromise = Promise.resolve({
                    error: 'method not defined'
                })
                promiseArr.push(execPromise);
            }


            Promise.all(promiseArr).then(iter => {
                console.log(iter);
                let response = {};
                iter.forEach((val, index) => {
                    response[keys[index]] = val;
                });

                resolve(response);
            }).catch(err => {
                reject(err);
            });
        });
    },

    '/get': function (body) {
        if(body.method !== "getForm") {
            return Promise.resolve({
                error: "wrong method"
            })
        }
        return new Promise((resolve, reject) => {
            if (!body) {
                throw new (`rpc request was expecting some data...!`);
            }
            let keys = Object.keys(body);
            let promiseArr = [];

            if (methods[body.method] && typeof (methods[body.method].exec) === 'function') {
                let execPromise = methods[body.method].exec.call(null, body);
                if (!(execPromise instanceof Promise)) {
                    throw new Error(`exec on ${body.method} did not return a promise`);
                }
                promiseArr.push(execPromise);
            } else {
                let execPromise = Promise.resolve({
                    error: 'method not defined'
                })
                promiseArr.push(execPromise);
            }


            Promise.all(promiseArr).then(iter => {
                console.log(iter);
                let response = {};
                iter.forEach((val, index) => {
                    response[keys[index]] = val;
                });

                resolve(response);
            }).catch(err => {
                reject(err);
            });
        });
    },
};

module.exports = routes;