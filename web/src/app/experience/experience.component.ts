import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RevealOnScrollDirective } from '../shared/directives/reveal.directive';
import { ContentDataService } from '../shared/services/content-data.service';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule, RevealOnScrollDirective],
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.scss'
})
export class ExperienceComponent {
  private readonly contentService = inject(ContentDataService);
  experiences = this.contentService.experiences;
}
