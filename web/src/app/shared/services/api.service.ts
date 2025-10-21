import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';

export interface ContactPayload {
  name: string;
  email: string;
  message: string;
}

export interface ContactResponse {
  status: 'success' | 'error';
  message: string;
}

export interface LlmPayload {
  prompt: string;
  model: string;
  temperature: number;
}

export interface LlmResponse {
  output: string;
  usage?: Record<string, unknown>;
  warnings?: string[];
}

@Injectable({ providedIn: 'root' })
export class ApiService {
  private readonly baseUrl = environment.apiBaseUrl;

  constructor(private readonly http: HttpClient) {}

  submitContact(payload: ContactPayload): Observable<ContactResponse> {
    return this.http.post<ContactResponse>(`${this.baseUrl}/contact`, payload);
  }

  invokeLlm(payload: LlmPayload): Observable<LlmResponse> {
    return this.http.post<LlmResponse>(`${this.baseUrl}/llm`, payload);
  }
}
