import { CommonModule } from '@angular/common';
import { Component, signal, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { ApiService, LlmResponse } from '../shared/services/api.service';
import { RevealOnScrollDirective } from '../shared/directives/reveal.directive';

interface PlaygroundResult extends LlmResponse {
  model: string;
  prompt: string;
  timestamp: Date;
}

@Component({
  selector: 'app-llm-playground',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RevealOnScrollDirective],
  templateUrl: './llm-playground.component.html',
  styleUrl: './llm-playground.component.scss'
})
export class LlmPlaygroundComponent {
  private readonly fb = inject(FormBuilder);
  private readonly api = inject(ApiService);

  readonly models = [
    { id: 'gpt-4o-mini', label: 'GPT-4o mini (OpenAI)' },
    { id: 'claude-3-haiku', label: 'Claude 3 Haiku (Anthropic)' },
    { id: 'vertex-gemini-pro', label: 'Gemini Pro (Vertex AI)' }
  ];

  readonly form = this.fb.group({
    prompt: ['', [Validators.required, Validators.minLength(10)]],
    model: [this.models[0].id, Validators.required],
    temperature: [0.3, [Validators.min(0), Validators.max(1)]]
  });

  readonly loading = signal(false);
  readonly error = signal<string | null>(null);
  readonly results = signal<PlaygroundResult[]>([]);

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading.set(true);
    this.error.set(null);

    const value = this.form.value as { prompt: string; model: string; temperature: number | null };
    const payload = {
      prompt: value.prompt,
      model: value.model,
      temperature: value.temperature ?? 0.3
    };

    this.api
      .invokeLlm(payload)
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (response) => {
          const result: PlaygroundResult = {
            ...response,
            model: payload.model,
            prompt: payload.prompt,
            timestamp: new Date()
          };
          this.results.update((items) => [result, ...items].slice(0, 5));
        },
        error: (err) => {
          const message = err?.error?.message ?? 'Unable to reach the LLM service. Please try again later.';
          this.error.set(message);
        }
      });
  }
}
