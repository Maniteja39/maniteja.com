import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./home/home.component').then((m) => m.HomeComponent),
    data: {
      animation: 'Home',
      title: 'Maniteja | Cloud & AI Engineer',
      description:
        'Portfolio of Maniteja showcasing cloud architecture, LLM experimentation, and resilient product delivery across AWS and GCP.',
      keywords: 'Maniteja, cloud engineer, AWS, GCP, LLMs, portfolio',
      ogImage: '/assets/og/home.png'
    }
  },
  {
    path: 'experience',
    loadComponent: () =>
      import('./experience/experience.component').then((m) => m.ExperienceComponent),
    data: {
      animation: 'Experience',
      title: 'Experience | Maniteja',
      description:
        'Professional experience across Hughes, iTradeNetwork, Centillionz, and internships delivering cloud-first, AI-enabled solutions.',
      keywords: 'experience, Hughes, iTradeNetwork, Centillionz, internships, AWS, GCP',
      ogImage: '/assets/og/experience.png'
    }
  },
  {
    path: 'projects',
    loadComponent: () =>
      import('./projects/projects.component').then((m) => m.ProjectsComponent),
    data: {
      animation: 'Projects',
      title: 'Projects | Maniteja',
      description:
        'Selected projects highlighting large-scale cloud migrations, ML pipelines, and LLM playground initiatives.',
      keywords: 'projects, cloud, machine learning, LLM, portfolio',
      ogImage: '/assets/og/projects.png'
    }
  },
  {
    path: 'llm-playground',
    loadComponent: () =>
      import('./llm-playground/llm-playground.component').then((m) => m.LlmPlaygroundComponent),
    data: {
      animation: 'LLM',
      title: 'LLM Playground | Maniteja',
      description:
        'Experiment with large language models via a secure playground showcasing prompt engineering and evaluation workflows.',
      keywords: 'LLM playground, AI, generative AI, prompt engineering',
      ogImage: '/assets/og/llm.png'
    }
  },
  {
    path: 'contact',
    loadComponent: () =>
      import('./contact/contact.component').then((m) => m.ContactComponent),
    data: {
      animation: 'Contact',
      title: 'Contact | Maniteja',
      description:
        'Get in touch with Maniteja for cloud, AI, and platform engineering collaborations.',
      keywords: 'contact, email, cloud engineer, AI engineer',
      ogImage: '/assets/og/contact.png'
    }
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];
