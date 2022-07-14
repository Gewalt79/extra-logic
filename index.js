const express = require('express');
const dotenv = require('dotenv').config();
const url = require('url');
const methods = require('./src/methods');
const types = require('./src/types');
const routes = require('./src/routes');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors({ origin: "*" }))


function requestListener(request, response) {
    let reqUrl = `http://${request.headers.host}${request.url}`;
    let parseURL = url.parse(reqUrl, true);
    let pathname = parseURL.pathname;

    response.setHeader('Content-Type', 'application/json');
    let body = request.body;

    if (routes[pathname]) {

        let compute = routes[pathname].call(null, body);

        if (!(compute instanceof Promise)) {
            response.statusCode = 500;
            response.end('server error');
            console.warn('i got everything but not a Promise from a rpc');
        } else {
            compute.then(res => {
                response.end(JSON.stringify(res))
            }).catch(err => {
                console.log(err);
                response.statusCode = 500;
                response.end('server error');
            })
        }
    } else {
        response.statusCode = 404;
        response.end(`error! ${pathname} not found here`);
    }
}

app.use(requestListener)
app.listen(8000);