import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

export interface ResearchRequest {
  query: string;
}

export interface SourceItem {
  title: string;
  url: string;
}

export interface ResearchResponse {
  status: 'success' | 'error';
  query: string;
  report?: string;
  sources?: SourceItem[];
  steps_completed?: string[];
  message?: string;
}

export const runResearch = async (query: string): Promise<ResearchResponse> => {
  try {
    const response = await axios.post<ResearchResponse>(
      `${API_BASE_URL}/research`,
      { query },
      {
        headers: {
          'Content-Type': 'application/json',
        },
        timeout: 120000, // 2-minute timeout for multi-agent LLM + web search
      }
    );
    return response.data;
  } catch (error: any) {
    if (axios.isAxiosError(error) && error.response?.data?.message) {
      return {
        status: 'error',
        query,
        message: error.response.data.message,
      };
    }
    return {
      status: 'error',
      query,
      message: error.message || 'Failed to connect to MarketMind AI backend server.',
    };
  }
};
