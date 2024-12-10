// File ini bertanggung jawab menangani alur permintaan API
const {postPredictHandler, predictionHistories, registerHandler, loginHandler} = require('../server/handler');

const routes = [
    {
        path: '/predict',
        method: 'POST',
        handler: postPredictHandler,
        options: {
            payload: {
                allow: 'application/json',
                parse: true,
            }
        }
    },
    {
        method: 'GET',
        path: '/predict/histories',
        handler: predictionHistories,
    },
    {
        path: '/register',
        method: 'POST',
        handler: registerHandler,
        options: {
            payload: {
                allow: 'application/json',
                parse: true,
            },
        },
    },
    {
        path: '/login',
        method: 'POST',
        handler: loginHandler,
        options: {
            payload: {
                allow: 'application/json',
                parse: true,
            },
        },
    },
];

module.exports = routes;