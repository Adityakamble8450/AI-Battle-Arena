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
  solution_1_score: new ReducedValue(z.number().default(0), {
    reducer(current, next) {
      return next;
    },
  }),
  solution_2_score: new ReducedValue(z.number().default(0), {
    reducer(current, next) {
      return next;
    },
  }),
  solution_1_recommendation: new ReducedValue(z.string().default(""), {
    reducer(current, next) {
      return next;
    },
  }),
  solution_2_recommendation: new ReducedValue(z.string().default(""), {
    reducer(current, next) {
      return next;
    },
  }),
  winner: new ReducedValue(z.string().default(""), {
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
  // console.log("Invoking solutionNode with state:", state);

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
  // console.log("Invoking judgeNode with state:", state);
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
      solution_1_recommendation: z.string(),
      solution_2_recommendation: z.string(),
      winner: z.enum(["solution_1", "solution_2"]),
    })),
    systemPrompt: "You are a judge tasked with evaluating two solutions to a problem. Provide a score between 0 and 10 for each solution and recommend which one is better.",
  })

  const judgeResponse = await judge.invoke({
    messages : [
      new HumanMessage(`you are a judge tasked with evaluating two solutions to the following problem: ${state.messages[0].text}. Solution 1 is: ${solution_1}. Solution 2 is: ${solution_2}. Please evaluate both solutions and provide a score between 0 and 10 for each, along with a recommendation on which solution is better.`)
    ]
  });

  const {
    solution_1_score,
    solution_2_score,
    solution_1_recommendation,
    solution_2_recommendation,
    winner,

  } = judgeResponse.structuredResponse || {};

  return {
    solution_1_score,
    solution_2_score,
    solution_1_recommendation,
    solution_2_recommendation,
    winner,
    judge_recommendation: winner || "",
  };

};

const graph = new StateGraph(State)
  .addNode("solutionNode", solutionNode)
  .addNode("judgeNode", judgeNode)
  .addEdge(START, "solutionNode")
  .addEdge("solutionNode", "judgeNode")
  .addEdge("judgeNode", END)
  .compile();


export default async function runGraph(usermessage: string) {
  const result = await graph.invoke({
        messages : [new HumanMessage(usermessage)]
  });
  // console.log("Final State:", result);
  return {
    solution_1: result.solution_1,
    solution_2: result.solution_2,
    solution_1_score: result.solution_1_score,
    solution_2_score: result.solution_2_score,
    solution_1_recommendation: result.solution_1_recommendation,
    solution_2_recommendation: result.solution_2_recommendation,
    winner: result.winner,
  };
}


