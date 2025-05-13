// import {
//   GoogleGenerativeAI,
//   HarmCategory,
//   HarmBlockThreshold,
// } from "@google/generative-ai";

// import { fs } from "node:fs";
// import { mime } from "mime-types";

// const apiKey = process.env.GEMINI_API_KEY;
// const genAI = new GoogleGenerativeAI(apiKey);

// const model = genAI.getGenerativeModel({
//   model: "gemini-2.5-pro-preview-03-25",
// });

// const generationConfig = {
//   temperature: 1,
//   topP: 0.95,
//   topK: 64,
//   maxOutputTokens: 65536,
//   responseModalities: [],
//   responseMimeType: "text/plain",
// };

// async function run() {
//   const chatSession = model.startChat({
//     generationConfig,
//     history: [],
//   });

//   const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
//   // TODO: Following code needs to be updated for client-side apps.
//   const candidates = result.response.candidates;
//   for (
//     let candidate_index = 0;
//     candidate_index < candidates.length;
//     candidate_index++
//   ) {
//     for (
//       let part_index = 0;
//       part_index < candidates[candidate_index].content.parts.length;
//       part_index++
//     ) {
//       const part = candidates[candidate_index].content.parts[part_index];
//       if (part.inlineData) {
//         try {
//           const filename = `output_${candidate_index}_${part_index}.${mime.extension(
//             part.inlineData.mimeType
//           )}`;
//           fs.writeFileSync(
//             filename,
//             Buffer.from(part.inlineData.data, "base64")
//           );
//           console.log(`Output written to: ${filename}`);
//         } catch (err) {
//           console.error(err);
//         }
//       }
//     }
//   }
//   console.log(result.response.text());
// }

// export default run;

// To run this code you need to install the following dependencies:
// npm install @google/genai mime
// npm install -D @types/node

// import { GoogleGenAI } from "@google/genai";
import { GoogleGenerativeAI } from "@google/generative-ai";

async function main(input) {
  const ai = new GoogleGenAI({
    apiKey: import.meta.env.VITE_GEMINI_API_KEY,
  });
  const config = {
    temperature: 1.35,
    thinkingConfig: {
      thinkingBudget: 0,
    },
    responseMimeType: "text/plain",
  };
  const model = "gemini-1.5-flash";
  const contents = [
    {
      role: "user",
      parts: [
        {
          text: input,
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: `Hello there! How can I help you today?
`,
        },
      ],
    },
    {
      role: "user",
      parts: [
        {
          text: input,
        },
      ],
    },
  ];

  const response = await ai.models.generateContentStream({
    model,
    config,
    contents,
  });
  let responses = "";
  for await (const chunk of response) {
    // let response = chunk.text;
    // return response;
    responses += chunk.text;
  }
  return responses;
}

export default main;
