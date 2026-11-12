import React from 'react';
import { EditorialHero } from '../components/EditorialHero';
import { StorytellingBridge } from '../components/StorytellingBridge';
import { EditorialProjects } from '../components/EditorialProjects';
import { EditorialAbout } from '../components/EditorialAbout';
import { EditorialSkillsAndCerts } from '../components/EditorialSkillsAndCerts';
import { EditorialContact } from '../components/EditorialContact';
import { motion } from 'framer-motion';

export const Home: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
    >
      <EditorialHero />
      <StorytellingBridge />
      <EditorialProjects />
      <EditorialAbout />
      <EditorialSkillsAndCerts />
      <EditorialContact />
    </motion.div>
  );
};
