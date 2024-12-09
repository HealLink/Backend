// File ini bertanggung jawab menangani alur permintaan API
const postPredictHandler = require('../server/handler');

const routes = [
    {
        path: '/predict',
        method: 'POST',
        handler: postPredictHandler,
        options: {
            payload: {
                allow: 'multipart/form-data',
                multipart: true,
                maxBytes: 1000 * 1000,
            }
        }
    }
]

module.exports = routes;