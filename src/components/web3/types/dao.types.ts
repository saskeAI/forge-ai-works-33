
export interface Proposal {
  id: number;
  title: string;
  description: string;
  creator: string;
  createdAt: string;
  endDate: string;
  votesFor: number;
  votesAgainst: number;
  status: 'active' | 'passed' | 'rejected';
  voted?: boolean;
  voteType?: 'for' | 'against';
  category: string;
}

export interface EmotionalAnalysisResult {
  timestamp: string;
  emotionalState: {
    joy: number;
    sadness: number;
    anger: number;
    fear: number;
    surprise: number;
    neutral: number;
  };
  attentionLevel: number;
  engagementLevel: number;
  dominantEmotion: 'joy' | 'sadness' | 'anger' | 'fear' | 'surprise' | 'neutral';
}

export interface ModalityFeatures {
  text?: TextFeatures;
  voice?: VoiceFeatures;
  video?: VideoFeatures;
  biometric?: BiometricFeatures;
}

export interface TextFeatures {
  sentiment: number;
  emotions: {
    joy: number;
    sadness: number;
    anger: number;
    fear: number;
    surprise: number;
  };
  topics: string[];
  length: number;
  wordCount: number;
}

export interface VoiceFeatures {
  pitch: number;
  pace: number;
  volume: number;
  emotion: {
    calm: number;
    stressed: number;
    excited: number;
  };
  speechClarity: number;
  toneVariation: number;
}

export interface VideoFeatures {
  facialEmotions: {
    happy: number;
    sad: number;
    angry: number;
    surprised: number;
    neutral: number;
  };
  eyeContact: number;
  movement: number;
  posture: {
    upright: number;
    leaning: number;
    slouched: number;
  };
  gestures: {
    positive: number;
    negative: number;
    neutral: number;
  };
  attentionLevel: number;
}

export interface BiometricFeatures {
  stressLevel: number;
  arousalLevel: number;
  heartRate?: number;
  skinConductance?: number;
  respirationRate?: number;
}
