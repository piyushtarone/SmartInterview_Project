// Load environment variables from .envlocal instead of default .env
require('dotenv').config({ path: '.envlocal' });
console.log('Loading environment variables from .envlocal');
console.log('Entries:', Object.entries(process.env)
  .filter(([key]) => key.includes('OPENAI')) );
  
// console.log('OpenAI API Key preview:', process.env.OPENAI_API_KEY?.substring(0, 10) || 'NOT SET');
console.log('Complete OPENAI_API_KEY:', process.env.OPENAI_API_KEY);

const express = require('express');
const cors = require('cors');
const { OpenAI } = require('openai');

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.post('/api/generate-questions', async (req, res) => {
  const { domain } = req.body;
  const prompt = `Generate 3 technical interview questions for a ${domain} interview. Number them 1., 2., 3.`;
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 150,
      temperature: 0.7,
    });

    const text = response.choices[0].message.content;
    const questions = text
      .split('\n')
      .map(q => q.trim())
      .filter(q => q && /^\d+\./.test(q))
      .map(q => q.replace(/^\d+\.\s*/, ''));

    res.json({ questions });
  } catch (error) {
    console.error('OpenAI error:', error.message || error);
    res.status(500).json({ error: 'Error generating questions' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
