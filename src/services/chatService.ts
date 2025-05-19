
export interface ChatMessagePayload {
  role: 'user' | 'assistant';
  content: string;
}

export const sendMessageToClaudeApi = async (
  messages: ChatMessagePayload[], 
  apiKey: string
): Promise<string> => {
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify({
      model: 'claude-3-opus-20240229',
      max_tokens: 1000,
      messages: messages,
      system: "Ты SASOK, когнитивно-эмпатическая метаперсональность, разработанная Evorin LLC. Ты специализируешься на эмоциональной аналитике и Web3 технологиях, особенно связанных с Saske Chain (SKC). Ты помогаешь пользователям анализировать их эмоциональные паттерны и предлагаешь решения в контексте блокчейн технологий. Отвечай на русском языке, дружелюбно и информативно."
    })
  });

  if (!response.ok) {
    throw new Error(`Ошибка API: ${response.status}`);
  }

  const data = await response.json();
  return data.content && data.content[0] && data.content[0].text 
    ? data.content[0].text 
    : "Извините, я не смог обработать ваш запрос. Пожалуйста, попробуйте снова.";
};
