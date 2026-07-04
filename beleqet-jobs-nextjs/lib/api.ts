const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/v1';

// Validation utilities
function validateRequired(value: unknown, fieldName: string): void {
  if (value === null || value === undefined || value === '') {
    throw new Error(`${fieldName} is required`);
  }
}

function validateString(value: unknown, fieldName: string): string {
  validateRequired(value, fieldName);
  if (typeof value !== 'string') {
    throw new Error(`${fieldName} must be a string`);
  }
  return value;
}

// Custom API Error class
export class ApiError extends Error {
  statusCode: number;
  details?: unknown;

  constructor(message: string, statusCode: number, details?: unknown) {
    super(message);
    this.name = 'ApiError';
    this.statusCode = statusCode;
    this.details = details;
  }
}

// Types matching backend responses
export interface JobCategory {
  id: string;
  label: string;
  slug: string;
  icon?: string;
}

export interface Company {
  id: string;
  name: string;
  logoUrl?: string;
  website?: string;
}

export interface Job {
  id: string;
  title: string;
  description: string;
  requirements: string[];
  location: string;
  jobType: string;
  salaryMin?: number;
  salaryMax?: number;
  status: string;
  featured: boolean;
  deadline?: string;
  companyId: string;
  categoryId: string;
  createdAt: string;
  company: Company;
  category: JobCategory;
  _count: { applications: number };
}

export interface JobsResponse {
  items: Job[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// API Client with robust error handling and validation
class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    try {
      const url = `${this.baseUrl}${endpoint}`;
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
        ...options,
      });

      // Handle HTTP errors
      if (!response.ok) {
        let errorDetails: unknown;
        try {
          errorDetails = await response.json();
        } catch {
          errorDetails = await response.text();
        }

        throw new ApiError(
          `API request failed: ${response.statusText}`,
          response.status,
          errorDetails
        );
      }

      // Parse and return JSON
      return await response.json();
    } catch (error) {
      // Re-throw ApiErrors
      if (error instanceof ApiError) {
        throw error;
      }

      // Handle network errors
      if (error instanceof Error && error.name === 'TypeError') {
        throw new ApiError(
          'Network error: Could not connect to server',
          0,
          error
        );
      }

      // Handle all other errors
      const errorMessage =
        error instanceof Error ? error.message : 'An unexpected error occurred';
      throw new ApiError(errorMessage, 500, error);
    }
  }

  // Jobs endpoints with validation
  async getJobs(params?: {
    q?: string;
    category?: string;
    location?: string;
    type?: string;
    page?: number;
    limit?: number;
  }): Promise<JobsResponse> {
    const searchParams = new URLSearchParams();
    if (params?.q) searchParams.append('q', params.q);
    if (params?.category) searchParams.append('category', params.category);
    if (params?.location) searchParams.append('location', params.location);
    if (params?.type) searchParams.append('type', params.type);
    if (params?.page) {
      if (params.page < 1) throw new Error('Page must be at least 1');
      searchParams.append('page', params.page.toString());
    }
    if (params?.limit) {
      if (params.limit < 1 || params.limit > 100) {
        throw new Error('Limit must be between 1 and 100');
      }
      searchParams.append('limit', params.limit.toString());
    }

    const queryString = searchParams.toString();
    return this.request<JobsResponse>(`/jobs${queryString ? `?${queryString}` : ''}`);
  }

  async getJob(id: string): Promise<Job> {
    validateString(id, 'Job ID');
    return this.request<Job>(`/jobs/${id}`);
  }

  async getCategories(): Promise<JobCategory[]> {
    return this.request<JobCategory[]>('/jobs/categories');
  }
}

export const api = new ApiClient(API_BASE_URL);
