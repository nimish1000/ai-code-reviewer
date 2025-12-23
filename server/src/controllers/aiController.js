const aiService = require("../services/ai.service")

module.exports.getReview = async (req, res) => {
    try {
        const code = req.body.code;

        if (!code) {
            return res.status(400).send("Code is Required");
        }

        // If the AI service fails (like a 429 error), the catch block will handle it
        const response = await aiService(code);

        res.send(response);
    } catch (error) {
        console.error("AI Service Error:", error.message);
        
        // Send a 500 error instead of crashing the server
        res.status(500).send("The AI service is currently overwhelmed. Please try again in a minute.");
    }
}