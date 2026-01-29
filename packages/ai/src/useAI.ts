import { useState, useCallback, useMemo } from 'react';
import type { AIConfig, ChatMessage, AIResponse } from './types';
import { createAIProvider, getDefaultAIConfig } from './providers';
import type { BaseAIProvider } from './providers/baseProvider';

interface UseAIOptions {
  config?: Partial<AIConfig>;
  onError?: (error: Error) => void;
}

interface UseAIReturn {
  // State
  isLoading: boolean;
  error: Error | null;
  messages: ChatMessage[];

  // Actions
  sendMessage: (content: string) => Promise<AIResponse | null>;
  streamMessage: (content: string, onChunk: (chunk: string) => void) => Promise<AIResponse | null>;
  generateText: (prompt: string) => Promise<string | null>;
  clearMessages: () => void;
  clearError: () => void;

  // Provider access
  provider: BaseAIProvider;
}

/**
 * React hook for interacting with AI providers
 */
export function useAI(options: UseAIOptions = {}): UseAIReturn {
  const { config: customConfig, onError } = options;

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  // Create provider instance
  const provider = useMemo(() => {
    const config: AIConfig = {
      ...getDefaultAIConfig(),
      ...customConfig,
    };
    return createAIProvider(config);
  }, [customConfig]);

  // Send a message and get a response
  const sendMessage = useCallback(
    async (content: string): Promise<AIResponse | null> => {
      setIsLoading(true);
      setError(null);

      const userMessage: ChatMessage = {
        role: 'user',
        content,
        timestamp: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, userMessage]);

      try {
        const response = await provider.chat([...messages, userMessage]);

        const assistantMessage: ChatMessage = {
          role: 'assistant',
          content: response.content,
          timestamp: new Date().toISOString(),
        };

        setMessages((prev) => [...prev, assistantMessage]);
        return response;
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Unknown error');
        setError(error);
        onError?.(error);
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [provider, messages, onError]
  );

  // Stream a message response
  const streamMessage = useCallback(
    async (content: string, onChunk: (chunk: string) => void): Promise<AIResponse | null> => {
      setIsLoading(true);
      setError(null);

      const userMessage: ChatMessage = {
        role: 'user',
        content,
        timestamp: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, userMessage]);

      try {
        const response = await provider.streamChat([...messages, userMessage], onChunk);

        const assistantMessage: ChatMessage = {
          role: 'assistant',
          content: response.content,
          timestamp: new Date().toISOString(),
        };

        setMessages((prev) => [...prev, assistantMessage]);
        return response;
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Unknown error');
        setError(error);
        onError?.(error);
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [provider, messages, onError]
  );

  // Generate text without conversation context
  const generateText = useCallback(
    async (prompt: string): Promise<string | null> => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await provider.generateText(prompt);
        return response;
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Unknown error');
        setError(error);
        onError?.(error);
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [provider, onError]
  );

  // Clear conversation history
  const clearMessages = useCallback(() => {
    setMessages([]);
  }, []);

  // Clear error state
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    isLoading,
    error,
    messages,
    sendMessage,
    streamMessage,
    generateText,
    clearMessages,
    clearError,
    provider,
  };
}
