import React from 'react';
import { motion } from 'framer-motion';
import { TiTick } from 'react-icons/ti';

interface ProgressStep {
  title: string;
  description: string;
}

interface AnimatedProgressStepperProps {
  steps: ProgressStep[];
  currentStep: number;
}

const AnimatedProgressStepper: React.FC<AnimatedProgressStepperProps> = ({ steps, currentStep }) => {
  return (
    <div className="flex flex-col items-center w-full">
      <div className="relative w-full flex items-center">
        {steps.map((_, index) => (
          <React.Fragment key={index}>
            <div
              className={`flex-1 h-1 ${index < currentStep ? 'bg-blue-500' : 'bg-gray-300'}`}
            />
            <motion.div
              className={`relative w-12 h-12 flex items-center justify-center rounded-full border-2 transition-all ${
                index < currentStep
                  ? 'bg-blue-500 text-white border-blue-500'
                  : index === currentStep
                  ? 'bg-blue-200 text-blue-500 border-blue-500'
                  : 'bg-white text-gray-500 border-gray-300'
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {index < currentStep ? (
                <TiTick className="w-6 h-6 text-white" />
              ) : (
                <span>{index + 1}</span>
              )}
            </motion.div>
            {index < steps.length - 1 && (
              <div
                className={`flex-1 h-1 ${index < currentStep ? 'bg-blue-500' : 'bg-gray-300'}`}
              />
            )}
          </React.Fragment>
        ))}
      </div>
      <div className="mt-4 w-full">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            className={`text-center text-sm ${
              index <= currentStep ? 'text-blue-500' : 'text-gray-500'
            }`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2, duration: 0.5 }}
          >
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AnimatedProgressStepper;
