import { ChatGoogle } from "@langchain/google";
import { ChatMistralAI  } from "@langchain/mistralai";
import { ChatCohere } from "@langchain/cohere";
import configuration from "../config/config.js";


export const geminiModel = new ChatGoogle({
    model: "gemini-flash-latest",
    apiKey: configuration.GOOGLE_API_KEY
})

export const mistralModel = new ChatMistralAI({
    model: "mistral-medium-latest",
    apiKey: configuration.MISTRAL_API_KEY
})

export const cohereModel = new ChatCohere({
    model: "command-a-03-2025",
    apiKey: configuration.COHERE_API_KEY
})

