import React from 'react';
import { EditorialProjects } from '../components/EditorialProjects';
import { motion } from 'framer-motion';

export const Projects: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.35 }}
      className="pt-12"
    >
      <EditorialProjects />
    </motion.div>
  );
};
