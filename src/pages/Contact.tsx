import React from 'react';
import { EditorialContact } from '../components/EditorialContact';
import { motion } from 'framer-motion';

export const Contact: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.35 }}
      className="pt-12"
    >
      <EditorialContact />
    </motion.div>
  );
};
