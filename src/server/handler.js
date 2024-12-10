const { predictMentalHealth } = require("../services/inferenceService");
const storeData = require("../services/storeData");
const crypto = require("crypto");


async function postPredictHandler(request, h) {
    const { sentence } = request.payload;
    const id = crypto.randomUUID();
    const createdAt = new Date().toISOString();
    const predictions_final = await predictMentalHealth(sentence);

    const data = {
        "id": id,
         predictions_final,
        "story": sentence,
        "createdAt": createdAt
    }

    await storeData(id, data);

    const response = h.response({
        status: 'success',
        message: 'Prediction completed successfully',
        data
    });
    response.code(201);
    return response;
};

module.exports = postPredictHandler;