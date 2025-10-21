import { Injectable } from '@angular/core';
import { Experience, Project } from '../models/content.models';

@Injectable({ providedIn: 'root' })
export class ContentDataService {
  readonly experiences: Experience[] = [
    {
      company: 'Hughes Network Systems',
      role: 'Senior Cloud Engineer',
      timeline: '2022 — Present',
      summary:
        'Leading multi-region connectivity programs leveraging AWS Outposts and hybrid networking to deliver resilient connectivity.',
      achievements: [
        'Architected observability pipelines on AWS using OpenTelemetry, reducing MTTR by 40%.',
        'Optimized Kubernetes workloads with autoscaling tuned for satellite backhaul, cutting compute cost by 25%.',
        'Collaborated with product and SecOps to ship compliance automation across FedRAMP controls.'
      ],
      skills: ['AWS', 'Kubernetes', 'Terraform', 'OpenTelemetry', 'Hybrid Networking']
    },
    {
      company: 'iTradeNetwork',
      role: 'Cloud & Platform Engineer',
      timeline: '2019 — 2022',
      summary:
        'Migrated legacy supply-chain platforms to GCP with CI/CD, observability, and zero-downtime deploys.',
      achievements: [
        'Executed lift-and-evolve migration from on-prem to GCP across 30+ services with zero data loss.',
        'Implemented GitOps pipelines with Cloud Build and Spinnaker, shrinking release cycle from weekly to daily.',
        'Introduced BigQuery-based analytics for predictive fulfillment insights across retailer network.'
      ],
      skills: ['GCP', 'Cloud Build', 'Spinnaker', 'BigQuery', 'GitOps']
    },
    {
      company: 'Centillionz',
      role: 'Consultant - Cloud Solutions',
      timeline: '2017 — 2019',
      summary: 'Delivered advisory for enterprises adopting AWS/GCP with a focus on security baselines and automation.',
      achievements: [
        'Developed secure landing zones using AWS Control Tower accelerators.',
        'Automated infrastructure compliance scans leveraging Cloud Custodian.',
        'Coached engineering teams on IaC best practices to accelerate cloud adoption.'
      ],
      skills: ['AWS', 'GCP', 'Cloud Custodian', 'Security Automation']
    },
    {
      company: 'Internships',
      role: 'Software & Data Engineering Intern',
      timeline: '2015 — 2017',
      summary: 'Built data pipelines and early AI prototypes across fintech and health-tech startups.',
      achievements: [
        'Designed ETL workflows for payments telemetry using Python and Airflow.',
        'Implemented real-time anomaly detection models for transaction monitoring.',
        'Created chatbot prototypes leveraging early transformer APIs.'
      ],
      skills: ['Python', 'Airflow', 'ML Ops', 'Chatbots']
    }
  ];

  readonly projects: Project[] = [
    {
      name: 'Satellite Edge Observability',
      description:
        'A federated telemetry platform unifying space, edge, and cloud signals for resilient observability.',
      highlights: [
        'Ingests >4M metrics/min using AWS Timestream and Kafka.',
        'LLM-powered anomaly triage summarizing incidents for NOC teams.',
        'Implements adaptive dashboards optimized for low-bandwidth sites.'
      ],
      technologies: ['AWS', 'Kafka', 'Timestream', 'LLM', 'Grafana'],
      links: [{ label: 'Case Study', url: 'https://example.com/satellite-observability' }]
    },
    {
      name: 'Supply Chain Control Tower',
      description:
        'Real-time supply-chain analytics with predictive insights and automated remediation workflows.',
      highlights: [
        'Streaming pipelines built on GCP Dataflow and BigQuery.',
        'LLM copilots for supplier onboarding and compliance documentation.',
        'Surface carbon-footprint insights with Looker Studio dashboards.'
      ],
      technologies: ['GCP', 'Dataflow', 'BigQuery', 'Vertex AI', 'Looker Studio']
    },
    {
      name: 'LLM Playground',
      description:
        'Interactive experimentation suite for prompt engineering, evals, and guardrails.',
      highlights: [
        'Supports multi-provider models with latency-aware routing.',
        'Prompt templates versioned via GitOps workflows.',
        'Built-in evaluation harness using open-source benchmarks.'
      ],
      technologies: ['TypeScript', 'NestJS', 'LangChain', 'OpenAI', 'Anthropic'],
      links: [{ label: 'GitHub', url: 'https://example.com/llm-playground' }]
    }
  ];
}
