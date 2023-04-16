
if (!process.env.MILVUS_URL) {
    throw new Error('Missing MILVUS_URL in .env file');
}  
const MILVUS_URL = process.env.MILVUS_URL ?? '';  

export { MILVUS_URL };