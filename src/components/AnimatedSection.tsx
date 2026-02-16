import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface AnimatedSectionProps {
  children: ReactNode;
  animation?: 'fade-up' | 'fade-in' | 'slide-up';
  delay?: number;
  className?: string;
}

const AnimatedSection: React.FC<AnimatedSectionProps> = ({ 
  children, 
  animation = 'fade-up', 
  delay = 0, 
  className = '' 
}) => {
  const getAnimationProps = () => {
    switch (animation) {
      case 'fade-up':
        return {
          initial: { opacity: 0, y: 30 },
          animate: { opacity: 1, y: 0 },
          transition: { delay: delay / 1000, duration: 0.6 }
        };
      case 'fade-in':
        return {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          transition: { delay: delay / 1000, duration: 0.6 }
        };
      case 'slide-up':
        return {
          initial: { opacity: 0, y: 50 },
          animate: { opacity: 1, y: 0 },
          transition: { delay: delay / 1000, duration: 0.8 }
        };
      default:
        return {
          initial: { opacity: 0, y: 30 },
          animate: { opacity: 1, y: 0 },
          transition: { delay: delay / 1000, duration: 0.6 }
        };
    }
  };

  return (
    <motion.div {...getAnimationProps()} className={className}>
      {children}
    </motion.div>
  );
};

export default AnimatedSection;
