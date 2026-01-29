import type { AIConfig, ChatMessage, AIResponse } from '../types';

export abstract class BaseAIProvider {
  protected config: AIConfig;

  constructor(config: AIConfig) {
    this.config = config;
  }

  abstract chat(messages: ChatMessage[]): Promise<AIResponse>;

  abstract streamChat(
    messages: ChatMessage[],
    onChunk: (chunk: string) => void
  ): Promise<AIResponse>;

  abstract generateText(prompt: string): Promise<string>;

  getConfig(): AIConfig {
    return this.config;
  }
}
