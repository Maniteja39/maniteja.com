import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AnimationOptions, LottieComponent } from 'ngx-lottie';
import { RevealOnScrollDirective } from '../shared/directives/reveal.directive';
import { ContentDataService } from '../shared/services/content-data.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, LottieComponent, RevealOnScrollDirective, NgOptimizedImage],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  private readonly contentService = inject(ContentDataService);

  heroAnimation: AnimationOptions = {
    path: 'https://lottie.host/3faae9c8-cloud-orbit.json',
    loop: true,
    autoplay: true
  };

  skills = ['AWS', 'GCP', 'LLM Engineering', 'DevOps', 'MLOps'];
  spotlightProjects = this.contentService.projects.slice(0, 2);
}
