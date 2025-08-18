"use client"

import React, { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { 
  SiReact, 
  SiNextdotjs, 
  SiTypescript, 
  SiJavascript, 
  SiNodedotjs, 
  SiPython, 
  SiMongodb, 
  SiPostgresql, 
  SiAmazon, 
  SiDocker, 
  SiGit, 
  SiFigma, 
  SiTailwindcss, 
  SiExpress, 
  SiRedis, 
  SiVercel 
} from "react-icons/si"

// Official icon components using react-icons
const ReactIcon = () => <SiReact className="w-full h-full" />
const NextJSIcon = () => <SiNextdotjs className="w-full h-full" />
const TypeScriptIcon = () => <SiTypescript className="w-full h-full" />
const JavaScriptIcon = () => <SiJavascript className="w-full h-full" />
const NodeJSIcon = () => <SiNodedotjs className="w-full h-full" />
const PythonIcon = () => <SiPython className="w-full h-full" />
const MongoDBIcon = () => <SiMongodb className="w-full h-full" />
const PostgreSQLIcon = () => <SiPostgresql className="w-full h-full" />
const AWSIcon = () => <SiAmazon className="w-full h-full" />
const DockerIcon = () => <SiDocker className="w-full h-full" />
const GitIcon = () => <SiGit className="w-full h-full" />
const FigmaIcon = () => <SiFigma className="w-full h-full" />
const TailwindIcon = () => <SiTailwindcss className="w-full h-full" />
const ExpressIcon = () => <SiExpress className="w-full h-full" />
const RedisIcon = () => <SiRedis className="w-full h-full" />
const VercelIcon = () => <SiVercel className="w-full h-full" />

// Tech skills with their respective colors and official icons
const techSkills = [
  { name: "React", icon: ReactIcon, color: "#61DAFB" },
  { name: "Next.js", icon: NextJSIcon, color: "#FFFFFF" },
  { name: "TypeScript", icon: TypeScriptIcon, color: "#3178C6" },
  { name: "JavaScript", icon: JavaScriptIcon, color: "#F7DF1E" },
  { name: "Node.js", icon: NodeJSIcon, color: "#339933" },
  { name: "Python", icon: PythonIcon, color: "#3776AB" },
  { name: "MongoDB", icon: MongoDBIcon, color: "#47A248" },
  { name: "PostgreSQL", icon: PostgreSQLIcon, color: "#336791" },
  { name: "AWS", icon: AWSIcon, color: "#FF9900" },
  { name: "Docker", icon: DockerIcon, color: "#2496ED" },
  { name: "Git", icon: GitIcon, color: "#F05032" },
  { name: "Figma", icon: FigmaIcon, color: "#F24E1E" },
  { name: "Tailwind", icon: TailwindIcon, color: "#06B6D4" },
  { name: "Express", icon: ExpressIcon, color: "#FFFFFF" },
  { name: "Redis", icon: RedisIcon, color: "#DC382D" },
  { name: "Vercel", icon: VercelIcon, color: "#FFFFFF" },
]

// Enhanced skill item component with modern design
const SkillItem = ({ skill }: { skill: typeof techSkills[0] }) => (
  <motion.div 
    className="relative flex flex-col items-center justify-center p-6 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 rounded-2xl hover:border-white/40 transition-all duration-500 w-32 h-40 group flex-shrink-0 cursor-pointer shadow-lg hover:shadow-2xl"
    whileHover={{ 
      scale: 1.05,
      rotateY: 5,
      rotateX: 5
    }}
    whileTap={{ scale: 0.95 }}
    transition={{ 
      type: "spring", 
      stiffness: 300, 
      damping: 20 
    }}
  >
    {/* Glow effect */}
    <div 
      className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 blur-xl"
      style={{ 
        background: `radial-gradient(circle, ${skill.color}40 0%, transparent 70%)`
      }}
    />
    
    {/* Icon container */}
    <div 
      className="relative w-16 h-16 rounded-2xl flex items-center justify-center mb-3 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3"
      style={{ 
        background: `linear-gradient(135deg, ${skill.color}25, ${skill.color}15)`,
        boxShadow: `0 8px 32px ${skill.color}20`
      }}
    >
      <div className="w-10 h-10 transition-transform duration-300" style={{ color: skill.color }}>
        <skill.icon />
      </div>
    </div>
    
    {/* Skill name */}
    <h3 className="text-white text-sm font-semibold text-center leading-tight tracking-wide group-hover:text-opacity-90 transition-colors duration-300">
      {skill.name}
    </h3>
    
    {/* Bottom accent line */}
    <div 
      className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 group-hover:w-16 transition-all duration-500 rounded-full"
      style={{ backgroundColor: skill.color }}
    />
  </motion.div>
)

// Quintuple the skills for ultra-smooth infinite scrolling
const infiniteSkills = [...techSkills, ...techSkills, ...techSkills, ...techSkills, ...techSkills]

export default function HorizontalSkills() {
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const scrollContainer = scrollRef.current
    if (!scrollContainer) return

    // Ensure container starts with proper positioning
    let isInitialized = false
    
    const initializePosition = () => {
      if (!isInitialized && scrollContainer.scrollWidth > 0) {
        const totalWidth = scrollContainer.scrollWidth
        const middlePosition = totalWidth * 0.4
        scrollContainer.scrollLeft = middlePosition
        isInitialized = true
      }
    }

    // Initialize position immediately and after a small delay
    initializePosition()
    const initTimeout = setTimeout(initializePosition, 50)

    let animationId: number
    let scrollSpeed = 0.3 // Slower speed for relaxed viewing
    let isRunning = true

    const scroll = () => {
      if (scrollContainer && isRunning && isInitialized) {
        scrollContainer.scrollLeft -= scrollSpeed
        
        // Reset scroll position for seamless infinite loop
        const totalWidth = scrollContainer.scrollWidth
        const singleSetWidth = totalWidth / 5 // We have 5 copies
        
        // When we've scrolled past two complete sets, reset to middle
        if (scrollContainer.scrollLeft <= singleSetWidth) {
          scrollContainer.scrollLeft = singleSetWidth * 3
        }
      }
      
      // Always continue the animation loop
      if (isRunning) {
        animationId = requestAnimationFrame(scroll)
      }
    }

    // Start animation immediately
    animationId = requestAnimationFrame(scroll)

    // Ensure animation continues even if page loses focus
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible' && !isRunning) {
        isRunning = true
        animationId = requestAnimationFrame(scroll)
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      isRunning = false
      cancelAnimationFrame(animationId)
      clearTimeout(initTimeout)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [])

  return (
    <motion.section 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true }}
      className="py-20 relative overflow-hidden bg-gradient-to-b from-transparent via-blue-950/10 to-transparent"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full mb-6">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
            <span className="text-blue-300 text-sm font-medium">Technologies & Tools</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent mb-6">
            Tech Stack
          </h2>
          <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Cutting-edge technologies and tools I leverage to build exceptional digital experiences
          </p>
        </motion.div>

        {/* Enhanced Scrolling Container */}
        <div className="relative">
          {/* Background glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-purple-600/5 to-cyan-600/5 rounded-3xl blur-3xl" />
          
          {/* Scrolling container with enhanced styling */}
          <div
            ref={scrollRef}
            className="flex gap-8 overflow-x-auto overflow-y-hidden py-8 px-4 scrollbar-hide relative"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              scrollBehavior: 'auto', // Prevent smooth scroll interference
              userSelect: 'none', // Prevent text selection
              pointerEvents: 'auto' // Ensure hover events work on cards
            }}
          >
            <style jsx>{`
              .scrollbar-hide::-webkit-scrollbar {
                display: none;
              }
            `}</style>
            {infiniteSkills.map((skill, index) => (
              <SkillItem key={`${skill.name}-${index}`} skill={skill} />
            ))}
          </div>
          
          {/* Navigation indicators */}
          <motion.div 
            className="flex justify-center mt-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 flex items-center justify-center bg-white/5 backdrop-blur-sm border border-white/10 rounded-full">
                <span className="text-gray-400 text-lg font-medium">&lt;</span>
              </div>
              <div className="w-10 h-10 flex items-center justify-center bg-white/5 backdrop-blur-sm border border-white/10 rounded-full">
                <span className="text-gray-400 text-lg font-medium">&gt;</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}
