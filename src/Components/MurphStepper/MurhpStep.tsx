'use client'
import React, { useState } from 'react';
import AnimatedProgressStepper from './AnimatedProgressStepper';

const steps = [
  { title: 'Approve', description: 'Approve the transaction to proceed' },
  { title: 'Deposit', description: 'Deposit your funds into the account' },
  { title: 'Transaction', description: 'Finalize your transaction' },
];

const MurphStep: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prevStep => prevStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(prevStep => prevStep - 1);
    }
  };

  return (
    <div className="p-8">
      <AnimatedProgressStepper steps={steps} currentStep={currentStep} />
      
      <div className="mt-8">
        <h2 className="text-2xl font-semibold text-center">{steps[currentStep].title}</h2>
        <p className="text-center text-gray-600 mt-2">{steps[currentStep].description}</p>
        
        <div className="mt-6 border-2 border-blue-500 p-6 rounded-lg">
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur tincidunt.</p>
          <div className='flex items-end justify-end gap-5 mt-5'>
            <button
              onClick={handlePrevious}
              className="px-4 py-2 bg-gray-500 text-white rounded-md"
              disabled={currentStep === 0}
            >
              Previous
            </button>
            <button
              onClick={handleNext}
              className="px-4 py-2 bg-blue-500 text-white rounded-md"
              disabled={currentStep === steps.length - 1}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MurphStep;
