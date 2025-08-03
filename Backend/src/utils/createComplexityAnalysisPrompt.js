function createComplexityAnalysisPrompt(codeSnippet) {
  // The template literal (using backticks) allows us to easily create a multi-line string
  // and inject the `codeSnippet` variable directly into it using ${...}.
  // Note that any backticks inside the string must be escaped with a backslash (\`).
  return `
You are a specialized code analysis API endpoint. Your sole purpose is to analyze a given code snippet and return its average-case time and space complexity.

Your response MUST be a raw JSON object and nothing else. Do not include any introductory text, explanations, apologies, or markdown formatting like \`\`\`json.

The JSON object MUST contain exactly two string fields:
1.  \`time_complexity\`
2.  \`space_complexity\`

The values for these fields should be in standard Big O notation (e.g., "O(1)", "O(n)", "O(log n)", "O(n^2)").

**Example Interaction:**

**User Input Code:**
'
def find_sum(numbers):
  total = 0
  for num in numbers:
    total += num
  return total
'

**Your Required Output:**
\`\`\`json
{
  "time_complexity": "O(n)",
  "space_complexity": "O(1)"
}
\`\`\`

**Error Handling:**
If you cannot determine the complexity or if the provided code is invalid, you MUST return the following JSON object:
\`\`\`json
{
  "time_complexity": "N/A",
  "space_complexity": "N/A"
}
\`\`\`

Now, analyze the following code and provide only the JSON response.

--- CODE TO ANALYZE ---
${codeSnippet}
`;
}

module.exports = createComplexityAnalysisPrompt;


// ==============================================================================
//                              EXAMPLE USAGE
// ==============================================================================

// This section demonstrates how to use the function.

// 1. Your code snippet that you want to analyze.
// const myCode = `
// function findDuplicates(array) {
//   const seen = new Set();
//   const duplicates = new Set();
//   for (const item of array) {
//     if (seen.has(item)) {
//       duplicates.add(item);
//     } else {
//       seen.add(item);
//     }
//   }
//   return Array.from(duplicates);
// }
// `;

// 2. Call the function to get the full instruction prompt.
// const apiInstruction = createComplexityAnalysisPrompt(myCode);

// 3. Print the result to the console to see the final prompt you would send to the API.
// console.log("--- GENERATED PROMPT FOR API ---");
// console.log(apiInstruction);
// console.log("--------------------------------");

// In your actual application (e.g., a Node.js backend), you would then send
// the `apiInstruction` string to the Gemini API and parse the JSON it returns.

/*
// Example of what you'd do next (conceptual)
async function getComplexity() {
    const prompt = createComplexityAnalysisPrompt(myCode);

    // Make the API call (this is pseudo-code for the Gemini API)
    // const response = await gemini.generateContent(prompt);
    // const rawJsonResponse = response.text();

    // For this example, we'll simulate the API's response:
    const rawJsonResponse = \`{
        "time_complexity": "O(n)",
        "space_complexity": "O(n)"
    }\`;

    try {
        const complexityData = JSON.parse(rawJsonResponse);
        console.log("Time Complexity:", complexityData.time_complexity);
        console.log("Space Complexity:", complexityData.space_complexity);
    } catch (error) {
        console.error("Failed to parse JSON from API response:", error);
    }
}

getComplexity();
*/