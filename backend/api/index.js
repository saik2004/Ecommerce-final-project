const app = require('../app');
const connectDatabase = require('../config/database');

let databaseConnection;

module.exports = async (req, res) => {
    try {
        if (!databaseConnection) {
            databaseConnection = connectDatabase().catch(error => {
                databaseConnection = null;
                throw error;
            });
        }

        await databaseConnection;

        return app(req, res);

    } catch (error) {
        console.error('Serverless API Error:', error);

        return res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    }
};