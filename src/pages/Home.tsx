import React from 'react';
import { EditorialHero } from '../components/EditorialHero';
import { StorytellingBridge } from '../components/StorytellingBridge';
import { EditorialProjects } from '../components/EditorialProjects';
import { EditorialAbout } from '../components/EditorialAbout';
import { EditorialSkillsAndCerts } from '../components/EditorialSkillsAndCerts';
import { EditorialContact } from '../components/EditorialContact';

export const Home: React.FC = () => {
  return (
    <div>
      <EditorialHero />
      <EditorialAbout />
      <StorytellingBridge />
      <EditorialProjects />
      <EditorialSkillsAndCerts />
      <EditorialContact />
    </div>
  );
};
