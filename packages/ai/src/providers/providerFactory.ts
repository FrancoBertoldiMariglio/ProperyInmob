import type { AIConfig, AIProvider } from '../types';
import { BaseAIProvider } from './baseProvider';
import { MockAIProvider } from './mockProvider';

/**
 * Factory function to create AI provider instances
 * Currently only mock provider is implemented
 * Add real providers (OpenAI, Anthropic, etc.) as needed
 */
export function createAIProvider(config: AIConfig): BaseAIProvider {
  switch (config.provider) {
    case 'mock':
      return new MockAIProvider(config);
    case 'openai':
      // TODO: Implement OpenAI provider
      console.warn('OpenAI provider not implemented, falling back to mock');
      return new MockAIProvider(config);
    case 'anthropic':
      // TODO: Implement Anthropic provider
      console.warn('Anthropic provider not implemented, falling back to mock');
      return new MockAIProvider(config);
    case 'google':
      // TODO: Implement Google AI provider
      console.warn('Google AI provider not implemented, falling back to mock');
      return new MockAIProvider(config);
    default:
      return new MockAIProvider(config);
  }
}

/**
 * Get the default AI configuration
 */
export function getDefaultAIConfig(): AIConfig {
  return {
    provider: 'mock',
    maxTokens: 1000,
    temperature: 0.7,
  };
}
