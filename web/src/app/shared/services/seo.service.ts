import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Router, ActivationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';

interface RouteSeoData {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
}

@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly isBrowser: boolean;

  constructor(
    private readonly title: Title,
    private readonly meta: Meta,
    private readonly router: Router,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  initialize(): void {
    this.router.events
      .pipe(
        filter((event): event is ActivationEnd => event instanceof ActivationEnd),
        filter((event) => event.snapshot.outlet === 'primary'),
        map((event) => event.snapshot.data as RouteSeoData)
      )
      .subscribe((data) => this.updateMetadata(data));
  }

  private updateMetadata(data: RouteSeoData): void {
    const title = data.title ?? 'Maniteja';
    this.title.setTitle(title);
    const description =
      data.description ??
      'Maniteja portfolio showcasing cloud architecture, large language model experimentation, and resilient product delivery.';

    const tags = [
      { name: 'description', content: description },
      { name: 'keywords', content: data.keywords ?? 'cloud, aws, gcp, llm, portfolio, software engineer' },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:type', content: 'website' },
      { property: 'og:image', content: data.ogImage ?? '/assets/og/default.png' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: data.ogImage ?? '/assets/og/default.png' }
    ];

    tags.forEach((tag) => {
      if ('name' in tag) {
        this.meta.updateTag({ name: tag.name, content: tag.content });
      } else {
        this.meta.updateTag({ property: tag.property, content: tag.content });
      }
    });

    if (this.isBrowser) {
      this.meta.updateTag({ name: 'theme-color', content: '#0f6d4b' });
    }
  }
}
