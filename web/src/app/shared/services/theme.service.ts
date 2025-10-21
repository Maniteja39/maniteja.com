import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID, effect, signal } from '@angular/core';

const THEME_STORAGE_KEY = 'maniteja-theme';

type ThemeMode = 'light' | 'dark';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly theme = signal<ThemeMode>('dark');
  private readonly isBrowser: boolean;

  constructor(
    @Inject(DOCUMENT) private readonly document: Document,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
    if (this.isBrowser) {
      const stored = (localStorage.getItem(THEME_STORAGE_KEY) as ThemeMode | null) ?? 'dark';
      this.theme.set(stored);
    }

    effect(() => {
      const mode = this.theme();
      const body = this.document.body;
      body.classList.remove('dark-theme', 'light-theme');
      body.classList.add(`${mode}-theme`);
      if (this.isBrowser) {
        localStorage.setItem(THEME_STORAGE_KEY, mode);
      }
    });
  }

  get active(): ThemeMode {
    return this.theme();
  }

  toggle(): void {
    this.setTheme(this.active === 'dark' ? 'light' : 'dark');
  }

  setTheme(mode: ThemeMode): void {
    this.theme.set(mode);
  }
}
