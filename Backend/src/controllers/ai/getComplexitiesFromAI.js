const ai = require("../../config/ai");
const createComplexityAnalysisPrompt = require("../../utils/createComplexityAnalysisPrompt");
const { extractJSONFromCodeBlock } = require("../../utils/utils");

const getComplexitiesFromAI = async (req, res) => {
    try {

        const { userCode } = req.body;

        if(!userCode)
          return res.status(400).send({ error: "Missing required fields"});

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: createComplexityAnalysisPrompt(userCode),
            config: {
            temperature: 0.0,
            },
        });

        const extractedJSON = extractJSONFromCodeBlock(response.text);

        let complexityData;
        if(extractedJSON)
            complexityData = JSON.parse(extractedJSON);
        else
            complexityData = JSON.parse(response.text);

        res.status(201).json(complexityData);

    } catch (error) {
        
        res.status(500).send({ error: error.message });

    }
};

module.exports = getComplexitiesFromAI;