/** Source of truth for the card content (taken from the resume). */
import { DEFAULT_PROFILE_SLUG } from '../../common/constants';

const env = process.env;

// Public links can be overridden through the environment (e.g. for a fork of the project).
const githubUrl = env.PROFILE_GITHUB_URL || 'https://github.com/vcjfdtdvg4-creator';
const repositoryUrl = env.REPOSITORY_URL || `${githubUrl}/digital-business-card`;

export const profileData = {
  slug: DEFAULT_PROFILE_SLUG,
  name: 'Чернявский Алексей Владимирович',
  title: 'AI-инженер, Python-разработчик',
  description:
    'Python backend-разработчик с фокусом на AI. Строю бэкенд с нуля до прода и LLM-системы, ' +
    'которые работают в продакшене: агенты на LangGraph, RAG с измеряемым качеством, ' +
    'инференс на собственных GPU. Внедряю стандарты разработки и процессы с AI-агентами в команде.',
  location: 'Москва',
};

export const links: { label: string; url: string }[] = [
  { label: 'Telegram', url: 'https://t.me/L1ks0s' },
  { label: 'Email', url: 'mailto:alekseicherniavskii77@mail.ru' },
  { label: 'GitHub', url: githubUrl },
  // LinkedIn is not in the resume, so it is added only when configured.
  ...(env.PROFILE_LINKEDIN_URL ? [{ label: 'LinkedIn', url: env.PROFILE_LINKEDIN_URL }] : []),
];

export const skills: { category: string; names: string[] }[] = [
  { category: 'Languages', names: ['Python', 'TypeScript', 'SQL'] },
  {
    category: 'Backend',
    names: [
      'FastAPI', 'Django', 'Django REST Framework', 'Flask', 'Node.js', 'NestJS',
      'GraphQL', 'REST API', 'SQLAlchemy', 'Prisma', 'Celery', 'Pytest',
    ],
  },
  {
    category: 'AI / ML',
    names: [
      'LLM', 'RAG', 'LangChain', 'LangGraph', 'Qdrant', 'vLLM', 'Ollama',
      'WhisperX', 'pyannote', 'Pydantic', 'ONNX',
    ],
  },
  {
    category: 'Data & Messaging',
    names: ['PostgreSQL', 'Redis', 'RabbitMQ', 'Apache Kafka', 'ClickHouse', 'MongoDB'],
  },
  {
    category: 'DevOps',
    names: [
      'Docker', 'Docker Compose', 'Kubernetes', 'Git', 'GitHub', 'GitLab',
      'CI/CD', 'Nginx', 'Linux', 'Prometheus', 'Grafana',
    ],
  },
];

export const experience = [
  {
    company: 'ПалитрумЛаб',
    companyUrl: 'https://palitrumlab.ru' as string | null,
    position: 'Python-бэкенд / ML Engineer',
    location: 'Москва',
    startDate: new Date('2024-12-01'),
    endDate: null as Date | null,
    achievements: [
      'Снизил долю невалидных ответов LLM (синтаксических и смысловых) в 26 раз — с 13% до 0,5%.',
      'Построил RAG-систему (Qdrant, LangChain/LangGraph) по плейбукам клиента и LLM-модуль плана действий: структурированный JSON по Pydantic-схеме, валидация и пометка «требует ручной проверки» при низкой уверенности.',
      'Реализовал дедупликацию перепечаток и кластеризацию инфоповодов на эмбеддингах, дайджесты по клиенту, AI-агента с tool-calling для мониторинга конкурентов (Celery, Redis).',
      'Развернул локальный инференс LLM (vLLM, Ollama) с абстракцией клиента для переключения на внешний API; интегрировал транскрибацию аудио и видео (WhisperX, pyannote) в общий конвейер.',
      'Спроектировал каскадный ML-пайплайн обработки упоминаний: оптимизировал расходы на LLM и ускорил реакцию на значимые события.',
    ],
  },
  {
    company: 'Софт Медиа Груп',
    companyUrl: null as string | null,
    position: 'Python-бэкенд разработчик',
    location: 'Москва',
    startDate: new Date('2023-05-01'),
    endDate: new Date('2024-11-30') as Date | null,
    achievements: [
      'Ускорил диаризацию pyannote более чем в 12 раз (час аудио — 2 минуты вместо 23) за счёт батчинга, укрупнения окон сегментации и ONNX-квантизации.',
      'Перевёл инференс LLM с Ollama на vLLM — рост пропускной способности в 8 раз при параллельных запросах.',
      'Разработал production-ready сервис транскрибации, диаризации и суммаризации аудио (WhisperX, pyannote, LangChain, Ollama/vLLM).',
      'Реализовал асинхронную архитектуру на FastAPI + Celery + Redis для устойчивой обработки долгих задач, JWT-аутентификацию (access/refresh) и RBAC/ABAC.',
      'Настроил контейнеризацию (Docker, Docker Compose) и сбор метрик производительности (Prometheus + Grafana).',
    ],
  },
];

export const projects = [
  {
    name: 'Live-мониторинг репутации с LLM-рекомендациями',
    description:
      'SaaS-платформа мониторинга упоминаний: RAG по плейбукам клиента, каскадный ML-пайплайн, кластеризация инфоповодов, AI-агент для мониторинга конкурентов.',
    url: 'https://palitrumlab.ru' as string | null,
    technologies: ['Python', 'LangGraph', 'Qdrant', 'Celery', 'Redis', 'vLLM'],
  },
  {
    name: 'Платформа обработки аудио с ML',
    description:
      'Сервис транскрибации, диаризации и суммаризации собеседований и созвонов; асинхронная обработка долгих задач, JWT, RBAC/ABAC, метрики.',
    url: null as string | null,
    technologies: ['FastAPI', 'Celery', 'WhisperX', 'pyannote', 'Prometheus', 'Grafana'],
  },
  {
    name: 'Digital Business Card (этот проект)',
    description:
      'GraphQL-визитка: NestJS, Prisma, PostgreSQL, DataLoader для батчинга вложенных запросов, авто-миграции и сидинг при старте в Docker.',
    url: repositoryUrl as string | null,
    technologies: ['TypeScript', 'NestJS', 'GraphQL', 'Prisma', 'PostgreSQL', 'Docker'],
  },
];
