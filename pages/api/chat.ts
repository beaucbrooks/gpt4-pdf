import type { NextApiRequest, NextApiResponse } from 'next';
import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import { Milvus } from 'langchain/vectorstores/milvus';
import { ConversationalRetrievalQAChain } from 'langchain/chains';
import { OpenAI } from 'langchain';
import config from '@config/config';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { question, history } = req.body;

  console.log('question', question);

  //only accept post requests
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  if (!question) {
    return res.status(400).json({ message: 'No question in the request' });
  }
  // OpenAI recommends replacing newlines with spaces for best results
  const sanitizedQuestion = question.trim().replaceAll('\n', ' ');

  try {
    //create chain
    const vectorStore = await Milvus.fromExistingCollection(
      new OpenAIEmbeddings(),
      {
        collectionName: config.vectorStoreName,
      }
    );
    const chain = ConversationalRetrievalQAChain.fromLLM(
      new OpenAI({
        temperature: config.temperature,
        modelName: config.modelName, 
      }),
      vectorStore.asRetriever()
    );
    //Ask a question using chat history
    const response = await chain.call({
      question: sanitizedQuestion,
      chat_history: history || [],
    });

    console.log('response', response);
    res.status(200).json(response);
  } catch (error: any) {
    console.log('error', error);
    res.status(500).json({ error: error.message || 'Something went wrong' });
  }
}
