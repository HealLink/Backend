// File ini bertanggung jawab menangani alur permintaan API
const postPredictHandler = require('../server/handler');

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
    }
]

module.exports = routes;