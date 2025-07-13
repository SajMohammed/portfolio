"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";
import { TextColor } from "@/components/ui/text-color";
import MagicBento from "@/components/ui/magic-bento";

export default function StacksSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });
  
  // Define detailed card data with skills and icons for the MagicBento component
  const techCardData = [
    {
      color: "#060010",
      title: "Frontend Development",
      description: "From class components to hooks, responsive design, and state management",
      label: "Frontend",
      // Detailed skills information
      skills: [
        { name: "React.js", description: "From class components to hooks, I've lived the evolution" },
        { name: "JavaScript/TypeScript", description: "ES6+ fluency, type safety enthusiast" },
        { name: "HTML/CSS", description: "Semantic markup, responsive design, accessibility-first" },
        { name: "State Management", description: "Redux, Context API, Zustand - the right tool for the job" },
      ],
      // Tech icons
      icons: [
        { name: "React", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" },
        { name: "JavaScript", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" },
        { name: "TypeScript", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" },
        { name: "HTML5", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg" },
        { name: "CSS3", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg" },
      ]
    },
    {
      color: "#060010",
      title: "Backend Development",
      description: "Scalable APIs, authentication, and microservices architecture",
      label: "Backend",
      skills: [
        { name: "Node.js/Express", description: "Scalable APIs, middleware mastery, performance optimization" },
        { name: "RESTful APIs", description: "Design patterns, versioning, documentation excellence" },
        { name: "Authentication/Authorization", description: "JWT, OAuth, role-based access control" },
        { name: "Microservices", description: "Service decomposition, API gateways, event-driven architecture" },
      ],
      icons: [
        { name: "Node.js", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg" },
        { name: "Express", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg" },
        { name: "Nest.js", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nestjs/nestjs-plain.svg" },
        { name: "GraphQL", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/graphql/graphql-plain.svg" },
      ]
    },
    {
      color: "#060010",
      title: "Database Design",
      description: "MongoDB, SQL databases, and data modeling strategies",
      label: "Databases",
      skills: [
        { name: "MongoDB", description: "Schema design, aggregation pipelines, indexing strategies" },
        { name: "SQL Databases", description: "Complex queries, optimization, migration strategies" },
        { name: "Data Modeling", description: "Normalization, denormalization, relationship mapping" },
      ],
      icons: [
        { name: "MongoDB", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg" },
        { name: "PostgreSQL", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg" },
        { name: "MySQL", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg" },
        { name: "Redis", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redis/redis-original.svg" },
      ]
    },
    {
      color: "#060010",
      title: "Cloud & DevOps",
      description: "AWS/GCP, CI/CD, containerization, and monitoring solutions",
      label: "DevOps",
      skills: [
        { name: "AWS/GCP", description: "EC2, S3, Lambda, Cloud Functions, managed services" },
        { name: "CI/CD Pipelines", description: "GitHub Actions, automated testing, deployment strategies" },
        { name: "Containerization", description: "Docker, Kubernetes, orchestration patterns" },
        { name: "Monitoring", description: "Application performance, error tracking, alerting systems" },
      ],
      icons: [
        { name: "AWS", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original.svg" },
        { name: "Docker", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg" },
        { name: "Kubernetes", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kubernetes/kubernetes-plain.svg" },
        { name: "GitHub", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg" },
      ]
    },
    {
      color: "#060010",
      title: "Messaging & Communication",
      description: "Event streaming, message queues, and real-time communication",
      label: "Messaging",
      skills: [
        { name: "Apache Kafka", description: "Event streaming, pub/sub patterns, consumer groups" },
        { name: "Message Queues", description: "RabbitMQ, SQS, asynchronous processing" },
        { name: "Real-time Communication", description: "WebSockets, Server-Sent Events" },
      ],
      icons: [
        { name: "Kafka", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/apachekafka/apachekafka-original.svg" },
        { name: "Redis", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redis/redis-original.svg" },
        { name: "MQTT", url: "https://www.vectorlogo.zone/logos/mqtt/mqtt-icon.svg" },
      ]
    },
    {
      color: "#060010",
      title: "Product & Leadership",
      description: "Technical product management, code review, and architecture decisions",
      label: "Leadership",
      skills: [
        { name: "Technical Product Management", description: "Requirements gathering, feature prioritization" },
        { name: "Code Review & Mentoring", description: "Best practices, knowledge sharing, team growth" },
        { name: "Architecture Decision Records", description: "Documentation, decision tracking, team alignment" },
      ],
      icons: [
        { name: "Jira", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jira/jira-original.svg" },
        { name: "Confluence", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/confluence/confluence-original.svg" },
        { name: "Figma", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg" },
      ]
    },
  ];

  return (
    <div 
      id="stacks" 
      className="w-full flex items-center justify-center"
      ref={sectionRef}
    >
      <div className="max-w-7xl w-full mx-auto px-4 md:px-8 py-20">
        {/* Header */}
        <div className="mb-16 text-center">
          <TextColor 
            firstLine="Technical Arsenal."
            className="mb-6 flex justify-center"
          />
          <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
            A comprehensive showcase of my technical expertise and passion
          </p>
        </div>
        
        {/* Replace the existing skills grid with the MagicBento component */}
        <div className="flex justify-center">
          <div className="w-full">
            <MagicBento 
              textAutoHide={false}
              enableStars={true}
              enableSpotlight={true}
              enableBorderGlow={true}
              enableTilt={true}
              enableMagnetism={true}
              clickEffect={true}
              spotlightRadius={300}
              particleCount={12}
              glowColor="132, 0, 255"
              cardData={techCardData}
              fullWidth={true}
              showDetailedContent={true}
              showIcons={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
}