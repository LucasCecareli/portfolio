import React from 'react';
import { EditorialAbout } from '../components/EditorialAbout';
import { EditorialSkillsAndCerts } from '../components/EditorialSkillsAndCerts';
import { motion } from 'framer-motion';

export const About: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.35 }}
      className="pt-12"
    >
      <EditorialAbout />
      <EditorialSkillsAndCerts />
    </motion.div>
  );
};
