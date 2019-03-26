const path = require('path');
const express = require('express');

function initServer({
    ueWasmAppFolder = ".",
    port = 3000,
}) {
    const app = express();

    app.use('*.jsgz', function (req, res, next) {
        res.setHeader('Content-Encoding', 'gzip');
        res.setHeader('Content-Type', 'application/x-javascript');
        next();
    });

    app.use('*.wasmgz', function (req, res, next) {
        res.setHeader('Content-Encoding', 'gzip');
        res.setHeader('Content-Type', 'application/wasm');
        next();
    });

    app.use('*.symbolsgz', function (req, res, next) {
        res.setHeader('Content-Encoding', 'gzip');
        res.setHeader('Content-Type', 'text/plain');
        next();
    });

    app.use('*.memgz', function (req, res, next) {
        res.setHeader('Content-Encoding', 'gzip');
        res.setHeader('Content-Type', 'application/octet-stream');
        next();
    });

    app.use('*.datagz', function (req, res, next) {
        res.setHeader('Content-Encoding', 'gzip');
        res.setHeader('Content-Type', 'application/octet-stream');
        next();
    });

    app.use('*.data', function (req, res, next) {
        res.setHeader('Content-Type', 'application/octet-stream');
        next();
    });

    app.use(express.static(ueWasmAppFolder));

    app.listen(port, function () {
        console.log('UE app listening on port 3000!');
    });

    return app;
}

module.exports = initServer;