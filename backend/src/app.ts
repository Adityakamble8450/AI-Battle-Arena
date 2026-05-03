import express from 'express';
const app = express();
import useGraph  from './services/graph.ai.services.js';     
import cors from 'cors';

app.use(express.json());
app.use(cors({
   origin: 'http://localhost:5173',
}));

app.post("/invoke",async (req, res) => {
   const message = req.body?.message?.trim();

   if (!message) {
      res.status(400).json({ error: "message is required" });
      return;
   }

   try {
      const response =  await useGraph(message)
      res.json(response);
   } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to generate battle results" });
   }
})


export default app;
