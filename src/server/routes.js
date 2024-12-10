// File ini bertanggung jawab menangani alur permintaan API
const {postPredictHandler, predictionHistories} = require('../server/handler');

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
        path: '/histories',
        method: 'GET',
        handler: predictionHistories,
    }
]

module.exports = routes;