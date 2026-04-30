import {
  StateSchema,
  MessagesValue,
  StateGraph,
  START,
  END,
  ReducedValue,
} from "@langchain/langgraph";
import { HumanMessage } from "langchain";
import type { GraphNode } from "@langchain/langgraph";
import { z } from "zod";
import { geminiModel, mistralModel, cohereModel } from "./models.services.js";
import { createAgent , providerStrategy } from "langchain";

const State = new StateSchema({
  messages: MessagesValue,
  solution_1: new ReducedValue(z.string().default(""), {
    reducer(current, next) {
      return next;
    },
  }),
  solution_2: new ReducedValue(z.string().default(""), {
    reducer(current, next) {
      return next;
    },
  }),
  judge_recommendation: new ReducedValue(z.string().default(""), {
    reducer(current, next) {
      return next;
    },
  }),
});

const solutionNode: GraphNode<typeof State> = async (state: typeof State.State) => {
  console.log("Invoking solutionNode with state:", state);

  const firstMessage = state.messages[0];
  if (!firstMessage) {
    throw new Error("No input message provided to solutionNode");
  }

  const [mistralResponse, cohereResponse] = await Promise.all([
    mistralModel.invoke([firstMessage]),
    cohereModel.invoke([firstMessage]),
  ]);

  return {
    solution_1: mistralResponse.text,
    solution_2: cohereResponse.text,
  };
};

const judgeNode: GraphNode<typeof State> = async (state: typeof State.State) => {
  console.log("Invoking judgeNode with state:", state);
  const { solution_1, solution_2 } = state;

  if (!solution_1 || !solution_2) {
    throw new Error("Solutions not available for judging");
  }

  const judge = createAgent({
    model: geminiModel,
    tools:[] ,
    responseFormat: providerStrategy(z.object({
      solution_1_score: z.number().min(0).max(10),
      solution_2_score: z.number().min(0).max(10),
      winner: z.enum(["solution_1", "solution_2"]),
    }))
  })

  const judgeResponse = await judge.invoke({
    messages : [
      new HumanMessage(`you are a judge tasked with evaluating two solutions to the following problem: ${state.messages[0].text}. Solution 1 is: ${solution_1}. Solution 2 is: ${solution_2}. Please evaluate both solutions and provide a score between 0 and 10 for each, along with a recommendation on which solution is better.`)
    ]
  });

  const result = judgeResponse.output as {
    solution_1_score: number;
    solution_2_score: number;
    winner: "solution_1" | "solution_2";
  };
  

  const resultof = judgeResponse.structuredResponse

  return{
    judge_recommendation: `Winner: ${resultof.winner}, Solution 1 Score: ${resultof.solution_1_score}, Solution 2 Score: ${resultof.solution_2_score}`
  }
}

const graph = new StateGraph(State)
  .addNode("solutionNode", solutionNode)
  .addNode("judgeNode", judgeNode)
  .addEdge(START, "solutionNode")
  .addEdge("solutionNode", "judgeNode")
  .addEdge("judgeNode", END)
  .compile();

export default async function (usermessage: string) {
  const result = await graph.invoke({
    messages: [new HumanMessage(usermessage)],
  });

  console.log("Final State:", result);
  return result.messages;
}

// type judgementState = 
//     winner: "solution1" | "solution2"
//     solution1Score: number;
//     solution2Score: number;
// }

// type AIBattleArenaState = {
//     messages: typeof MessagesValue;
//     solution1: string;
//     solution2: string;
//     judgement: judgementState | null;
// }

// const state: AIBattleArenaState = {
//     messages: MessagesValue,
//     solution1: "",
//     solution2: "",
//     judgement: {
//         winner: "solution1",
//         solution1Score: 0,
//         solution2Score: 0
//     }
// }
