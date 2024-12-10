const axios = require("axios");
const InputError = require("../exceptions/InputError");

const TF_SERVING_URL = "https://ml-model-serving-26979933732.asia-southeast2.run.app/v1/models/model_bert-en-uncased-l-12-h-768-a-12:predict";

async function predictMentalHealth(sentence) {
    try {
        if (!sentence || typeof sentence !== "string") {
            throw new InputError("Input sentence is required and must be a string");
        }

        // Format data untuk TensorFlow Serving
        const inputData = {
            instances: [[sentence]],
        };

        // Kirim permintaan ke TensorFlow Serving
        const tfServingModel = await axios.post(TF_SERVING_URL, inputData);

        // Validasi respons dari TensorFlow Serving
        const predictions = tfServingModel.data.predictions;
        if (!predictions || predictions.length === 0) {
            throw new Error("No predictions returned from TensorFlow Serving");
        }

        const logits = predictions[0];
        const maxLogit = logits.reduce((a, b) => Math.max(a, b), -Infinity);
        const scores = logits.map((l) => Math.exp(l - maxLogit));
        const denom = scores.reduce((a, b) => a + b);
        const predictions_final = scores.map((s) => s / denom);

        return predictions_final; // Asumsi prediksi adalah array
    } catch (error) {
        console.error("Error in predictMentalHealth:", error.message);
        throw new InputError("Failed to process prediction from TensorFlow Serving");
    }
}

module.exports = { predictMentalHealth };
