import { StateSchema, MessagesValue, StateGraph, START, END } from "@langchain/langgraph";


type judgementState = {
    winner: "solution1" | "solution2"
    solution1Score: number;
    solution2Score: number;
}

type AIBattleArenaState = {
    messages: typeof MessagesValue;
    solution1: string;
    solution2: string;
    judgement: judgementState | null;
}

const state: AIBattleArenaState = {
    messages: MessagesValue,
    solution1: "",
    solution2: "",
    judgement: {
        winner: "solution1",
        solution1Score: 0,
        solution2Score: 0
    }
}


