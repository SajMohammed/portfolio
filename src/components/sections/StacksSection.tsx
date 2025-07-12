"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

// Define types for the skill cards data structure
type SkillInfo = {
  name: string;
  description: string;
};

type IconInfo = {
  name: string;
  url: string;
};

type SkillCardData = {
  title: string;
  bgColor: string;
  borderColor: string;
  textColor: string;
  icons: IconInfo[];
  skills: SkillInfo[];
};

type SkillCategories = {
  [key: string]: SkillCardData;
};

// Define props type for the SkillCard component
interface SkillCardProps {
  category: string;
  data: SkillCardData;
  index: number;
  className?: string;
}

export default function StacksSection() {
  // Define card content for the Technical Arsenal with icons
  const skillCards: SkillCategories = {
    frontend: {
      title: "Frontend Development",
      bgColor: "from-pink-500/20 to-purple-600/20",
      borderColor: "border-pink-500/30",
      textColor: "from-pink-500 to-purple-600",
      icons: [
        { name: "React", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" },
        { name: "JavaScript", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" },
        { name: "TypeScript", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" },
        { name: "HTML5", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg" },
        { name: "CSS3", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg" },
      ],
      skills: [
        { name: "React.js", description: "From class components to hooks, I've lived the evolution" },
        { name: "JavaScript/TypeScript", description: "ES6+ fluency, type safety enthusiast" },
        { name: "HTML/CSS", description: "Semantic markup, responsive design, accessibility-first" },
        { name: "State Management", description: "Redux, Context API, Zustand - the right tool for the job" },
      ]
    },
    backend: {
      title: "Backend Development",
      bgColor: "from-blue-500/20 to-cyan-500/20",
      borderColor: "border-blue-500/30",
      textColor: "from-blue-500 to-cyan-500",
      icons: [
        { name: "Node.js", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg" },
        { name: "Express", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg" },
        { name: "Nest.js", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nestjs/nestjs-plain.svg" },
        { name: "GraphQL", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/graphql/graphql-plain.svg" },
      ],
      skills: [
        { name: "Node.js/Express", description: "Scalable APIs, middleware mastery, performance optimization" },
        { name: "RESTful APIs", description: "Design patterns, versioning, documentation excellence" },
        { name: "Authentication/Authorization", description: "JWT, OAuth, role-based access control" },
        { name: "Microservices", description: "Service decomposition, API gateways, event-driven architecture" },
      ]
    },
    database: {
      title: "Database Design",
      bgColor: "from-yellow-500/20 to-amber-600/20",
      borderColor: "border-yellow-500/30",
      textColor: "from-yellow-500 to-amber-600",
      icons: [
        { name: "MongoDB", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg" },
        { name: "PostgreSQL", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg" },
        { name: "MySQL", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg" },
        { name: "Redis", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redis/redis-original.svg" },
      ],
      skills: [
        { name: "MongoDB", description: "Schema design, aggregation pipelines, indexing strategies" },
        { name: "SQL Databases", description: "Complex queries, optimization, migration strategies" },
        { name: "Data Modeling", description: "Normalization, denormalization, relationship mapping" },
      ]
    },
    devops: {
      title: "Cloud & DevOps",
      bgColor: "from-blue-600/20 to-indigo-600/20",
      borderColor: "border-blue-600/30",
      textColor: "from-blue-600 to-indigo-600",
      icons: [
        { name: "AWS", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original.svg" },
        { name: "Docker", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg" },
        { name: "Kubernetes", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kubernetes/kubernetes-plain.svg" },
        { name: "GitHub", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg" },
      ],
      skills: [
        { name: "AWS/GCP", description: "EC2, S3, Lambda, Cloud Functions, managed services" },
        { name: "CI/CD Pipelines", description: "GitHub Actions, automated testing, deployment strategies" },
        { name: "Containerization", description: "Docker, Kubernetes, orchestration patterns" },
        { name: "Monitoring", description: "Application performance, error tracking, alerting systems" },
      ]
    },
    messaging: {
      title: "Messaging & Communication",
      bgColor: "from-green-500/20 to-emerald-600/20",
      borderColor: "border-green-500/30",
      textColor: "from-green-500 to-emerald-600",
      icons: [
        { name: "Kafka", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/apachekafka/apachekafka-original.svg" },
        { name: "Redis", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redis/redis-original.svg" },
        { name: "MQTT", url: "https://www.vectorlogo.zone/logos/mqtt/mqtt-icon.svg" },
      ],
      skills: [
        { name: "Apache Kafka", description: "Event streaming, pub/sub patterns, consumer groups" },
        { name: "Message Queues", description: "RabbitMQ, SQS, asynchronous processing" },
        { name: "Real-time Communication", description: "WebSockets, Server-Sent Events" },
      ]
    },
    leadership: {
      title: "Product & Leadership",
      bgColor: "from-purple-600/20 to-indigo-600/20",
      borderColor: "border-purple-600/30",
      textColor: "from-purple-600 to-indigo-600",
      icons: [
        { name: "Jira", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jira/jira-original.svg" },
        { name: "Confluence", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/confluence/confluence-original.svg" },
        { name: "Figma", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg" },
      ],
      skills: [
        { name: "Technical Product Management", description: "Requirements gathering, feature prioritization" },
        { name: "Code Review & Mentoring", description: "Best practices, knowledge sharing, team growth" },
        { name: "Architecture Decision Records", description: "Documentation, decision tracking, team alignment" },
      ]
    }
  };

  // Color mapping for gradient backgrounds
  const colorMap: Record<string, string> = {
    'pink': '236, 72, 153',
    'purple': '147, 51, 234',
    'blue': '59, 130, 246',
    'cyan': '6, 182, 212',
    'yellow': '234, 179, 8',
    'amber': '217, 119, 6',
    'green': '34, 197, 94',
    'emerald': '16, 185, 129',
    'indigo': '99, 102, 241'
  };

  const SkillCard: React.FC<SkillCardProps> = ({ category, data, index, className = "" }) => {
    const [mousePosition, setMousePosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState<boolean>(false);
    const cardRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current) return;
      
      const rect = cardRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      // Much more subtle rotation (reduced from /10 to /30)
      const rotateX = (e.clientY - centerY) / 30;
      const rotateY = (centerX - e.clientX) / 30;
      
      setMousePosition({ x: rotateY, y: rotateX });
    };

    const handleMouseEnter = () => {
      setIsHovered(true);
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
      setMousePosition({ x: 0, y: 0 });
    };

    // Process background gradient color
    const getProcessedBgColor = (): string => {
      if (!isHovered) return 'rgba(0, 0, 0, 0.4)';

      try {
        const bgColorParts = data.bgColor
          .replace('/20', '/30')
          .replace('from-', '')
          .replace('to-', '')
          .split(' ');
          
        // Extract color names
        const fromColorWithOpacity = bgColorParts[0];
        const toColorWithOpacity = bgColorParts[1];
          
        // Extract color name and opacity
        const fromColorMatch = fromColorWithOpacity.match(/(\w+)-(\d+)\/(\d+)/);
        const toColorMatch = toColorWithOpacity.match(/(\w+)-(\d+)\/(\d+)/);
          
        if (!fromColorMatch || !toColorMatch) return 'rgba(0, 0, 0, 0.4)';
          
        const fromColor = fromColorMatch[1];
        const fromOpacity = fromColorMatch[3];
        const toColor = toColorMatch[1];
        const toOpacity = toColorMatch[3];
          
        const fromRgb = colorMap[fromColor] || '255, 255, 255';
        const toRgb = colorMap[toColor] || '255, 255, 255';
          
        return `linear-gradient(135deg, rgba(${fromRgb}, 0.${fromOpacity}) 0%, rgba(${toRgb}, 0.${toOpacity}) 100%)`;
      } catch (error) {
        console.error("Error processing background color:", error);
        return 'rgba(0, 0, 0, 0.4)';
      }
    };

    return (
      <motion.div
        ref={cardRef}
        initial={{ opacity: 0, y: 20 }}
        animate={{ 
          opacity: 1, 
          y: 0,
        }}
        transition={{ 
          opacity: { delay: index * 0.1 },
          y: { delay: index * 0.1 },
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`relative group backdrop-blur-sm rounded-xl border border-white/10 transition-all duration-500 p-3 h-full ${className}`}
        style={{
          transformStyle: "preserve-3d",
          background: getProcessedBgColor(),
          borderColor: isHovered ? data.borderColor.replace('/30', '/50') : 'rgba(255, 255, 255, 0.1)'
        }}
      >
        {/* Framer Motion Tilt Container */}
        <motion.div
          animate={{
            rotateX: mousePosition.y,
            rotateY: mousePosition.x,
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
            mass: 0.5,
          }}
          className="h-full"
          style={{
            transformStyle: "preserve-3d",
          }}
        >

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col">
          {/* Header */}
          <div className="mb-2">
            <h3 className={`text-base font-bold bg-clip-text text-transparent bg-gradient-to-r ${data.textColor} mb-2`}>
              {data.title}
            </h3>
            
            {/* Tech Icons */}
            <div className="flex flex-wrap gap-1 mb-2">
              {data.icons.map((icon, i) => (
                <motion.div 
                  key={i}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="bg-white/10 backdrop-blur-sm p-1.5 rounded-lg border border-white/20 hover:border-white/40 transition-all duration-300 group-hover:bg-white/15"
                >
                  <img 
                    src={icon.url} 
                    alt={icon.name} 
                    className="w-3.5 h-3.5 object-contain"
                    onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                  />
                </motion.div>
              ))}
            </div>
          </div>
          
          {/* Skills List */}
          <div className="space-y-1.5 flex-1">
            {data.skills.map((skill, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: (index * 0.1) + (i * 0.05) }}
                className="bg-black/20 backdrop-blur-sm rounded-lg p-2 border border-white/10 hover:border-white/20 hover:bg-black/30 transition-all duration-300"
              >
                <h4 className="text-xs font-semibold text-white mb-0.5">{skill.name}</h4>
                <p className="text-xs text-gray-300 leading-relaxed">{skill.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
        </motion.div>
      </motion.div>
    );
  };

  return (
    <div id="stacks" className="min-h-screen flex items-center justify-center p-8 py-20">
      <div className="max-w-7xl w-full mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16 text-center"
        >
          <h2 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500">
            The Technical Arsenal
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
            A comprehensive showcase of my technical expertise and professional skills
          </p>
        </motion.div>
        
        {/* Skills Grid - Asymmetric Bento Layout */}
        <div className="grid grid-cols-12 gap-3">
          {/* Row 1: Frontend (large) + Backend (medium) */}
          <SkillCard 
            category="frontend" 
            data={skillCards.frontend} 
            index={0} 
            className="col-span-12 lg:col-span-8 min-h-[240px]"
          />
          <SkillCard 
            category="backend" 
            data={skillCards.backend} 
            index={1} 
            className="col-span-12 lg:col-span-4 min-h-[240px]"
          />
          
          {/* Row 2: Database (small) + DevOps (large) + Messaging (small) */}
          <SkillCard 
            category="database" 
            data={skillCards.database} 
            index={2} 
            className="col-span-12 md:col-span-4 lg:col-span-3 min-h-[200px]"
          />
          <SkillCard 
            category="devops" 
            data={skillCards.devops} 
            index={3} 
            className="col-span-12 md:col-span-8 lg:col-span-6 min-h-[200px]"
          />
          <SkillCard 
            category="messaging" 
            data={skillCards.messaging} 
            index={4} 
            className="col-span-12 md:col-span-6 lg:col-span-3 min-h-[200px]"
          />
          
          {/* Row 3: Leadership (full width but short) */}
          <SkillCard 
            category="leadership" 
            data={skillCards.leadership} 
            index={5} 
            className="col-span-12 min-h-[160px]"
          />
        </div>
      </div>
    </div>
  );
}