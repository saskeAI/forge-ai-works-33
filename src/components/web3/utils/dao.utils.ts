
export const calculateTimeRemaining = (endDateStr: string) => {
  const endDate = new Date(endDateStr);
  const now = new Date();
  const diffTime = endDate.getTime() - now.getTime();
  
  if (diffTime <= 0) return "Голосование завершено";
  
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  const diffHours = Math.floor((diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  
  if (diffDays > 0) {
    return `${diffDays} д ${diffHours} ч`;
  } else {
    const diffMinutes = Math.floor((diffTime % (1000 * 60 * 60)) / (1000 * 60));
    return `${diffHours} ч ${diffMinutes} мин`;
  }
};

export const mapDominantEmotionToColor = (emotion: string): string => {
  const colorMap: Record<string, string> = {
    joy: 'bg-green-500',
    sadness: 'bg-blue-400',
    anger: 'bg-red-500',
    fear: 'bg-purple-500',
    surprise: 'bg-yellow-400',
    neutral: 'bg-gray-400'
  };
  
  return colorMap[emotion] || 'bg-gray-400';
};

export const formatEmotionValue = (value: number): string => {
  return `${Math.round(value * 100)}%`;
};

export const getEmotionEmoji = (emotion: string): string => {
  const emojiMap: Record<string, string> = {
    joy: '😊',
    sadness: '😢',
    anger: '😠',
    fear: '😨',
    surprise: '😲',
    neutral: '😐'
  };
  
  return emojiMap[emotion] || '🤔';
};
