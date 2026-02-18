import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Project } from '../types';
import { ArrowUpRight } from 'lucide-react';

const projects: Project[] = [
  {
    id: 1,
    title: "Ikoyi Vertical Village",
    category: "Residential",
    year: "2023",
    location: "Lagos",
    description: "A luxury high-rise integrating hanging gardens to combat the heat island effect.",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2000&auto=format&fit=crop", 
  },
  {
    id: 2,
    title: "The Civic Hub",
    category: "Public",
    year: "2024",
    location: "Abuja",
    description: "Redefining public space with solar-responsive shading skins and local red clay finishes.",
    image: "https://images.unsplash.com/photo-1577495508048-b635879837f1?q=80&w=2000&auto=format&fit=crop", 
  },
  {
    id: 3,
    title: "Eko Atlantic Pavilion",
    category: "Commercial",
    year: "2022",
    location: "Lagos",
    description: "A waterfront structure designed to withstand rising sea levels while offering panoramic ocean views.",
    image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?q=80&w=2000&auto=format&fit=crop", 
  },
  {
    id: 4,
    title: "Yaba Tech Incubator",
    category: "Education",
    year: "2023",
    location: "Lagos",
    description: "Adaptive reuse of an old warehouse into a vibrant technology campus.",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2000&auto=format&fit=crop", 
  }
];

interface ProjectCardProps {
  project: Project;
  index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

  return (
    <motion.div
      ref={ref}
      className={`group relative cursor-pointer flex flex-col ${index % 2 === 1 ? 'md:mt-32' : ''}`}
    >
      <div className="relative overflow-hidden w-full h-[500px] mb-6 bg-gray-100">
        <motion.div style={{ y, height: "115%" }} className="w-full relative -top-[7%]">
            <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
        </motion.div>
        
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-flaux-red/80 opacity-0 group-hover:opacity-90 transition-opacity duration-300 flex items-center justify-center">
            <div className="border border-white/50 rounded-full p-4 transform scale-50 group-hover:scale-100 transition-transform duration-300">
                <ArrowUpRight className="text-white w-8 h-8" />
            </div>
        </div>
      </div>
      
      <div className="flex justify-between items-start border-b border-black/10 pb-6 group-hover:border-flaux-red transition-colors duration-300">
        <div>
           <span className="text-xs font-bold text-flaux-red uppercase tracking-widest mb-2 block">{project.location}</span>
          <h3 className="text-3xl font-serif text-black leading-none mb-2">
            {project.title}
          </h3>
          <p className="text-gray-500 text-sm">{project.category} / {project.year}</p>
        </div>
      </div>
      
      <div className="mt-4">
        <p className="text-gray-600 text-base leading-relaxed max-w-md">
            {project.description}
        </p>
      </div>
    </motion.div>
  );
};

const ProjectGallery: React.FC = () => {
  return (
    <section id="projects" className="py-32 bg-white scroll-mt-28">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24">
          <div>
             <h4 className="text-flaux-red font-bold uppercase tracking-widest mb-2">Portfolio</h4>
            <h2 className="text-5xl md:text-7xl font-sans font-bold text-black tracking-tight">
                Selected Works
            </h2>
          </div>
          <p className="text-gray-500 max-w-sm text-right mt-6 md:mt-0">
             Showcasing our contribution to the modern African skyline.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-24">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
        
        <div className="flex justify-center mt-24">
            <button className="px-10 py-4 bg-black text-white hover:bg-flaux-red transition-colors duration-300 uppercase tracking-widest text-xs font-bold">
                View All Projects
            </button>
        </div>
      </div>
    </section>
  );
};

export default ProjectGallery;