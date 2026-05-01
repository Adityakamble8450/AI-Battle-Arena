import express from 'express';
const app = express();
import useGraph  from './services/graph.ai.services.js';     

app.use(express.json());

app.post("/use-graph",async (req, res) => {
   const message = req.body?.message;

   if (!message) {
      res.status(400).json({ error: "message is required" });
      return;
   }

   const response =  await useGraph(message)
   res.json(response);
})


export default app;
