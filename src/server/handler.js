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

async function predictionHistories(request, h) {
    try {
      const predictions_final = [];
  
      const histories = await fetchData();
  
      histories.forEach((snapshot) => {
        const data = snapshot.data();
        predictions_final.push({
          id: snapshot.id,
          history: {
            "id": data.id,
            "result": data.predictions_final,
            "story": data.sentence,
            "createdAt": data.createdAt,
          },
        });
      });
  
      const response = h.response({
        status: 'success',
        data: predictions_final,
      });
      response.code(200)
      return response;
    } catch (e) {
      const response = h.response({
        status: 'error',
        message: e,
        data: predictions_final,
      });
      response.code(500)
      return response;
    }
    
  }
  
  
   
  module.exports = { postPredictHandler, predictionHistories };