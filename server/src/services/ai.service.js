const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_KEY);


const model = genAI.getGenerativeModel({
  model: "gemini-flash-latest",

  systemInstruction:`You are an expert Code Reviewer with deep knowledge across all programming languages.
  Your task is to analyze the provided code snippet, identify the programming language, find any bugs, security vulnerabilities, or anti-patterns, and suggest improvements.
  
  Always try to find the best solution for the developer and make the code more efficient, clean, and maintainable.
  Please structure your review clearly and provide code examples for your suggested fixes in the identified language.`
});

 async function generateContent(prompt) {
  try{const result= await model.generateContent(prompt);
    return result.response.text();
  }catch(error){
    console.error("🔴 GEMINI FULL ERROR:", error);
    throw error;
  }
 }

module.exports= generateContent


