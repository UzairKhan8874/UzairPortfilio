// All portfolio content lives here. Edit text, add links, add projects.

export const profile = {
  name: 'Mohammad Uzair',
  role: 'Java Developer',
  location: 'Andheri, Mumbai',
  email: 'Uzairkhannaseem@gmail.com',
  phone: '+91 8318286928',
  // Add your own URLs here. Empty strings are hidden.
  links: { linkedin: '', github: '', leetcode: '' },
}

export const navLinks = [
  { id: 'about', label: 'About' },
  { id: 'work', label: 'Work' },
  { id: 'skills', label: 'Skills' },
  { id: 'services', label: 'Services' },
  { id: 'contact', label: 'Contact' },
]

export const marquee = [
  'Java development',
  'Spring Boot',
  'REST APIs',
  'Spring Security + JWT',
  'MySQL',
  'Clean architecture',
]

export const ledger = [
  { value: '8.1', sup: '/10', label: 'BCA CGPA' },
  { value: '3', sup: '', label: 'Spring Boot APIs built' },
  { value: '2026', sup: '', label: 'BCA graduation' },
]

export interface TreeRow { label: string; hint?: string; hot?: boolean }
export interface Project {
  title: string
  tags: string[]
  summary: string
  stack: string
  bullets: string[]
  tree: { root: string; rows: TreeRow[] }
}

export const projects: Project[] = [
  {
    title: 'Hospital Management System',
    tags: ['Healthcare', 'REST API'],
    summary:
      'A RESTful system for patients, doctors, appointments and medical history, with JWT authentication and role-based access to every endpoint.',
    stack: 'Java · Spring Boot · Spring Security · JWT · JPA/Hibernate · MySQL · Swagger',
    bullets: [
      'Modules for Patients, Doctors, Appointments, Medical History and Users.',
      'JWT authentication with role-based authorization for secure API access.',
      'CRUD operations with validation and exception handling.',
      'Swagger API documentation; endpoints verified with Postman and Swagger UI.',
    ],
    tree: {
      root: 'hospital-management/',
      rows: [
        { label: 'auth', hint: 'jwt · roles', hot: true },
        { label: 'patients' },
        { label: 'doctors' },
        { label: 'appointments' },
        { label: 'medical-history' },
        { label: 'users' },
      ],
    },
  },
  {
    title: 'Library Management System',
    tags: ['Education', 'REST API'],
    summary:
      'Books, students and issue records handled through a strict layered architecture, with custom exceptions and validation on every write.',
    stack: 'Java · Spring Boot · Spring Data JPA · MySQL · Postman',
    bullets: [
      'Modules for Books, Students and Issue Records.',
      'Controller, Service, ServiceImpl and Repository layers.',
      'CRUD operations with custom exception handling and validation.',
      'REST endpoints tested in Postman.',
    ],
    tree: {
      root: 'library-management/',
      rows: [
        { label: 'controller' },
        { label: 'service' },
        { label: 'serviceImpl', hot: true },
        { label: 'repository' },
        { label: 'books · students · issues' },
      ],
    },
  },
  {
    title: 'Banking API',
    tags: ['Finance', 'REST API'],
    summary:
      'Account management with deposit and withdrawal operations, returning the right HTTP status code for every outcome.',
    stack: 'Java · Spring Boot · Spring Data JPA · MySQL',
    bullets: [
      'Account management with deposit and withdrawal operations.',
      'JpaRepository with custom repository methods for database operations.',
      'Proper HTTP status codes and exception handling in API responses.',
    ],
    tree: {
      root: 'banking-api/',
      rows: [
        { label: 'accounts' },
        { label: 'deposit', hot: true },
        { label: 'withdraw', hot: true },
        { label: 'exception-handling', hint: 'status codes' },
      ],
    },
  },
]

export const skills = [
  { group: 'Core', items: ['Core Java', 'OOPs', 'Collections', 'Multithreading', 'Exception Handling', 'SQL'] },
  { group: 'Backend', items: ['Spring Boot', 'REST APIs', 'Spring Security', 'JWT', 'JPA / Hibernate', 'Servlets', 'JSP'] },
  { group: 'Data', items: ['MySQL', 'JDBC', 'DBMS'] },
  { group: 'Tools', items: ['Git', 'GitHub', 'IntelliJ IDEA', 'Maven', 'Postman', 'Swagger'] },
  { group: 'Fundamentals', items: ['Data Structures', 'Algorithms', 'HTML', 'CSS'] },
]

export const services = [
  { title: 'REST API Development', text: 'Clean, versioned endpoints with validation, correct status codes and consistent error responses.', tech: 'Spring Boot · REST' },
  { title: 'Authentication & Authorization', text: 'JWT login flows and role-based access so each user only reaches what they should.', tech: 'Spring Security · JWT' },
  { title: 'Database-Backed Backends', text: 'Relational models and repositories that stay readable as the project grows.', tech: 'MySQL · JPA / Hibernate' },
  { title: 'API Documentation & Testing', text: 'Swagger documentation and Postman checks so your frontend team can start without guessing.', tech: 'Swagger · Postman' },
]

export const why = [
  { t: 'Layered by default', s: 'Controller, service and repository, kept separate.' },
  { t: 'Secure from the start', s: 'Authentication and roles built in, not bolted on.' },
  { t: 'Documented endpoints', s: 'Swagger docs you can hand to anyone.' },
  { t: 'Tested before handoff', s: 'Every route exercised in Postman.' },
  { t: 'Clear error handling', s: 'Global exceptions that explain what went wrong.' },
  { t: 'Fundamentals first', s: 'Regular DSA practice on LeetCode.' },
]

export const highlights = [
  { t: 'Spring Boot REST APIs', s: 'Built multiple projects with layered architecture and industry-standard practices.' },
  { t: 'Security', s: 'Implemented authentication, authorization, validation and global exception handling.' },
  { t: 'Testing & debugging', s: 'Tested and debugged REST APIs with Postman and Swagger UI.' },
  { t: 'Problem solving', s: 'Active on LeetCode: arrays, strings, linked lists, stacks, queues and HashMaps.' },
]

export const projectTypes = [
  'Backend / REST API',
  'Authentication & security',
  'Database design',
  'Internship or role',
  'Something else',
]
