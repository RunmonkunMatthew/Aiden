// const path = require('path')
const express = require('express')
import type {Request, Response} from 'express'

const axios = require('axios')
require('dotenv').config()
const port = process.env.PORT

const app = express()
const SYSTEM_PROMPT = require('./prompt')
app.use(express.json())

app.post('/api/chat', async (req: Request, res: Response) => {
  try {
    const {prompt} = req.body

    const response = await axios.post(
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent", 
          {
      contents: [
      {
        role: "user",
        parts: [{ text: prompt }]
    }
    ]}, 

    {
      params: {
      key: process.env.GEMINI_API_KEY
      }
    }

    );

    res.json(response.data)
    console.log(response.data);
    
  } catch (error) {
    console.log(error);
    res.status(500).json({error: 'AI request failed'})
  }
})


app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
})



