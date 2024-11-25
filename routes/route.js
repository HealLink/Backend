const dbHandler = require('../handlers/dbHandler'); // Mengimpor dbHandler
const mlHandler = require('../handlers/mlHandler'); // Mengimpor mlHandler

// Route untuk menerima cerita pengguna dan menganalisisnya
const route = [
    {
        method: 'POST',
        path: '/analyze',
        handler: async (request, h) => {
            const { userId, note } = request.payload;

            // Simpan cerita ke Cloud SQL
            const noteId = await dbHandler.saveNoteToDB(userId, note);

            // Analisis sementara (Placeholder) menggunakan mlHandler
            const result = await mlHandler.analyzeText(note);

            // Simpan hasil analisis ke Cloud SQL
            await dbHandler.saveAnalysisResult(userId, result);

            return { message: 'Note received and analysis stored', noteId, result };
        },
    },
    {
        method: 'GET',
        path: '/result/{userId}',
        handler: async (request, h) => {
            const { userId } = request.params;

            const result = await dbHandler.getLatestAnalysisResult(userId);
            
            if (!result) {
                return h.response({ message: 'No analysis found for this user' }).code(404);
            }

            return result; // Mengembalikan hasil analisis terakhir
        },
    }
];

module.exports = route;
