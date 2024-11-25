const Hapi = require('@hapi/hapi');
const { Client } = require('pg'); // Untuk menghubungkan dengan Cloud SQL
const { Storage } = require('@google-cloud/storage'); // Google Cloud Storage client
const analysisRoute = require('./routes/analysisRoute'); // Import route untuk analisis

// Membuat server Hapi.js
const init = async () => {
    const server = Hapi.server({
        port: 3000,
        host: 'localhost',
    });

    // Registrasi route
    server.route(analysisRoute);

    // Mulai server Hapi
    await server.start();
    console.log('Server running on %s', server.info.uri);
};

init();
