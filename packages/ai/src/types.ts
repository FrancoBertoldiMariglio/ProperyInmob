// AI Types

export type AIProvider = 'openai' | 'anthropic' | 'google' | 'mock';

export interface AIConfig {
  provider: AIProvider;
  apiKey?: string;
  model?: string;
  maxTokens?: number;
  temperature?: number;
}

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp?: string;
}

export interface AIResponse {
  content: string;
  usage?: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
}

export interface StreamingAIResponse {
  content: string;
  done: boolean;
}

// Function-specific types
export interface DescriptionGeneratorInput {
  propertyType: string;
  operation: 'sale' | 'rent';
  neighborhood: string;
  features: {
    totalArea: number;
    coveredArea?: number;
    bedrooms?: number;
    bathrooms?: number;
    age?: number;
    condition?: string;
  };
  amenities: string[];
  tone: 'formal' | 'casual' | 'premium';
  maxLength: 'short' | 'medium' | 'long';
}

export interface MarketAnalysisInput {
  zone: string;
  propertyType?: string;
  operation?: 'sale' | 'rent';
}

export interface LeadResponseInput {
  leadName: string;
  propertyTitle: string;
  leadMessage: string;
  context?: string;
}

export interface ListingOptimizationInput {
  title: string;
  description: string;
  propertyType: string;
  operation: 'sale' | 'rent';
}
