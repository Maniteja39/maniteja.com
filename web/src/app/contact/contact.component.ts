import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { ApiService } from '../shared/services/api.service';
import { RevealOnScrollDirective } from '../shared/directives/reveal.directive';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RevealOnScrollDirective],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  private readonly fb = inject(FormBuilder);
  private readonly api = inject(ApiService);

  readonly form = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(80)]],
    email: ['', [Validators.required, Validators.email]],
    message: ['', [Validators.required, Validators.minLength(20)]]
  });

  readonly loading = signal(false);
  readonly status = signal<'idle' | 'success' | 'error'>('idle');
  readonly statusMessage = signal('');

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading.set(true);
    this.status.set('idle');
    this.statusMessage.set('');

    this.api
      .submitContact(this.form.value as { name: string; email: string; message: string })
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (response) => {
          this.status.set('success');
          this.statusMessage.set(response.message ?? 'Thanks! I will reply soon.');
          this.form.reset();
        },
        error: (err) => {
          this.status.set('error');
          this.statusMessage.set(err?.error?.message ?? 'We could not send your message. Please try again.');
        }
      });
  }
}
