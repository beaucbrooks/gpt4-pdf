import dotenv from 'dotenv';
import { commonStrings } from "./common";

dotenv.config()

export default {
    ...commonStrings,
    environment: 'development',
    openAIKey: process.env.OPENAI_API_KEY || 'ADD OPENAI KEY TO YOUR .ENV FILE',
    milvusURL: process.env.MILVUS_URL || 'ADD A MILVUS URL TO YOUR .ENV FILE',
    modelName: process.env.MODEL_NAME || 'ADD A MODEL NAME TO YOUR .ENV FILE',
    vectorStoreName: process.env.COLLECTION_NAME || 'ADD A COLLECTION OR VECTOR STORE NAME TO YOUR .ENV FILE',
    documentFilePath: process.env.DOCUMENT_FILE_PATH || 'ADD A PDF FOLDER PATH TO YOUR .ENV FILE'
}