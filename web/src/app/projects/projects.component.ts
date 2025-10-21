import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RevealOnScrollDirective } from '../shared/directives/reveal.directive';
import { ContentDataService } from '../shared/services/content-data.service';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, RevealOnScrollDirective],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent {
  private readonly contentService = inject(ContentDataService);
  projects = this.contentService.projects;
}
