// File ini bertanggung jawab menangani alur permintaan API
const {postPredictHandler, predictionHistoriesHandler} = require('../server/handler');

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
        handler: predictionHistoriesHandler,
    }
]

module.exports = routes;