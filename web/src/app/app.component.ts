import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet, ChildrenOutletContexts } from '@angular/router';
import { AnimationOptions, LottieComponent } from 'ngx-lottie';
import { routeTransitionAnimation } from './shared/animations/route-animations';
import { ThemeService } from './shared/services/theme.service';
import { SeoService } from './shared/services/seo.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive, LottieComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  animations: [routeTransitionAnimation]
})
export class AppComponent implements OnInit {
  readonly themeService = inject(ThemeService);
  private readonly seoService = inject(SeoService);
  private readonly contexts = inject(ChildrenOutletContexts);

  readonly navigation = [
    { label: 'Home', path: '/home' },
    { label: 'Experience', path: '/experience' },
    { label: 'Projects', path: '/projects' },
    { label: 'LLM Playground', path: '/llm-playground' },
    { label: 'Contact', path: '/contact' }
  ];

  readonly animationOptions: AnimationOptions = {
    path: 'https://lottie.host/0b85db1d-hero-glow.json',
    loop: true,
    autoplay: true
  };

  readonly year = new Date().getFullYear();

  ngOnInit(): void {
    this.seoService.initialize();
  }

  prepareRoute(): string | undefined {
    return this.contexts.getContext('primary')?.route?.snapshot?.data?.['animation'];
  }
}
