import express from 'express';
const app = express();
import useGraph  from './services/graph.ai.services.js';     

app.use(express.json());

app.post("/use-graph",async (req, res) => {
    await useGraph("what is the capital of France?")
})


export default app;