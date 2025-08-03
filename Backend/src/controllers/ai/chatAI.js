const ai = require("../../config/ai");
const createSystemInstructionWithContext = require("../../utils/createSystemInstructionWithContext");

const chatAI = async (req, res) => {
    try {

        const { problemDetails, userSolution, chatHistory} = req.body;

        if(!(problemDetails && userSolution && chatHistory))
          return res.status(400).send({ error: "Missing required fields"});

        const { username } = req.payload;

        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash",
            contents: chatHistory,
            config: {
            systemInstruction: createSystemInstructionWithContext(username, problemDetails, userSolution),
            },
        });
        res.status(201).send(response.text);

    } catch (error) {
        
        res.status(500).send({ error: error.message });

    }
};

module.exports = chatAI;