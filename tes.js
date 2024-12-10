const axios = require("axios");

const TF_SERVING_URL = "https://ml-model-serving-26979933732.asia-southeast2.run.app/v1/models/model_bert-en-uncased-l-12-h-768-a-12:predict";

const inputData = {
  instances: [
    ["tomorrow is our presentation, i feel so nervous"],
  ],
};

axios
  .post(TF_SERVING_URL, inputData)
  .then((response) => {
    console.log("Predictions:", response.data.predictions);
  })
  .catch((error) => {
    console.error("Error communicating with TensorFlow Serving:", error.response?.data || error.message);
  });