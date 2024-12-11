const { predictMentalHealth } = require("../services/inferenceService");
const {storeData, fetchData} = require("../services/storeData");
const {registerUser, loginUser} = require("../services/authService");
const crypto = require("crypto");


async function postPredictHandler(request, h) {
    const { sentence,title, token } = request.payload;
    const id = crypto.randomUUID();
    const createdAt = new Date().toISOString();
    const predictions_final = await predictMentalHealth(sentence);

    const data = {
        id: id,
        token: token,
        title: title,
        result: predictions_final,
        story: sentence,
        createdAt: createdAt
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
        const result = [];
        //const token = request.headers.token;
        const histories = await fetchData();

        if (!token) {
            throw new InputError('Token is required');
        }

        histories.forEach((snapshot) => {
            const data = snapshot.data();
            result.push({
                id: snapshot.id,
                history: {
                    id: data.id,
                    token: data.token,
                    title: data.title,
                    result: data.result,
                    story: data.story,
                    createdAt: data.createdAt
                },
            });
        });
        const response = h.response({
            status: 'success',
            data: result,
        });
        response.code(200)
        return response;
    } catch(e) {
        const response = h.response({
            status: 'error',
            message: e,
            data: result,
        });
        response.code(500)
        return response;
    }
}

async function registerHandler(request, h) {
    const { name, email, password } = request.payload;

    if (!name || !email || !password) {
        throw new InputError('Name, email, and password are required');
    }

    const token = await registerUser(name, email, password);

    const response = h.response({           
        status: 'success',
        message: 'User registered successfully',
        data: { token },
    });
    response.type('application/json');
    response.code(201);
    return response;
}

// Handler untuk login
async function loginHandler(request, h) {
    const { email, password } = request.payload;

    if (!email || !password) {
        throw new InputError('Email and password are required');
    }

    const { token, name } = await loginUser(email, password);

    const response = h.response({
        status: 'success',
        message: 'Login successful',
        data: { token, name },
    });
    response.code(200);
    return response;
}

module.exports = {postPredictHandler, predictionHistories, registerHandler, loginHandler};