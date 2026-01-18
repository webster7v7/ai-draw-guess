import jwt from 'jsonwebtoken';

const API_KEY = process.env.ZHIPU_API_KEY || '';

export const generateToken = () => {
  if (!API_KEY) throw new Error('ZHIPU_API_KEY is missing');

  const [id, secret] = API_KEY.split('.');
  
  const payload = {
    api_key: id,
    exp: Math.floor(Date.now() / 1000) + 3600, // 1 hour expiration
    timestamp: Math.floor(Date.now() / 1000),
  };

  // Zhipu requires specific header
  // @ts-ignore
  const token = jwt.sign(payload, secret, {
    algorithm: 'HS256',
    header: {
      alg: 'HS256',
      sign_type: 'SIGN',
    },
  });

  return token;
};

export async function chatCompletion(messages: any[]) {
  const token = generateToken();
  
  const response = await fetch('https://open.bigmodel.cn/api/paas/v4/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'glm-4v-flash',
      messages: messages,
      stream: false,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Zhipu API Error: ${error}`);
  }

  return response.json();
}
