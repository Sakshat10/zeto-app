"use client";
import React, { useState } from "react";
import AnimatedProgressStepper from "./AnimatedProgressStepper";
import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { erc20Abi } from "../../libs/abis/erc20Abi";
import { zetoTokenAbi } from "../../libs/abis/zetoTokenAbi";
import { parseEther } from "viem";

const steps = [
  { title: "Approve", description: "Approve the transaction to proceed" },
  { title: "Deposit", description: "Deposit your funds into the account" },
  { title: "Transaction", description: "Finalize your transaction" },
];
const erc20Address = "0xBD1dF8b2eeB22ae2f6cB039a1191878eE06583C5";
const zetoTokenAddress = "0x2CE73d5A63c948CeFdf2E9ad3b414471c35c905C";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const MurphStep: React.FC = () => {
  const {
    data: hash,
    isPending,
    writeContract: approveContract,
  } = useWriteContract();

  const [currentStep, setCurrentStep] = useState(0);
  const [amount, setAmount] = useState("");
  const [recipient, setRecipient] = useState("");

  const handleNext = async (action: string) => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prevStep) => prevStep + 1);
    }

    if (action === "Approve") {
      try {
        console.log("console test", amount, recipient);
        const amountInWei = parseEther(amount);

        approveContract({
          address: erc20Address,
          abi: erc20Abi,
          functionName: "approve",
          args: [zetoTokenAddress, amountInWei.toString()],
        });

        while (!isPending) {
          // Should go to next stage, i.e. Deposit
        }

        console.log("Transaction completed!", hash);
      } catch (error) {
        console.error("Transaction failed", error);
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep((prevStep) => prevStep - 1);
    }
  };

  return (
    <div className="p-8">
      <AnimatedProgressStepper steps={steps} currentStep={currentStep} />

      <div className="mt-8">
        <h2 className="text-2xl font-semibold text-center">
          {steps[currentStep].title}
        </h2>
        <p className="text-center text-gray-600 mt-2">
          {steps[currentStep].description}
        </p>

        <div className="mt-6 border-2 border-blue-500 p-6 rounded-lg">
          <div className="mb-4">
            <div className="flex justify-between items-center">
              <label
                htmlFor="recipient"
                className="text-gray-700 font-semibold w-24"
              >
                Recipient:
              </label>
              <input
                type="text"
                name="recipient"
                className="border border-gray-300 rounded-md p-2 w-full"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="mb-4">
            <div className="flex justify-between items-center">
              <label
                htmlFor="amount"
                className="text-gray-700 font-semibold w-24"
              >
                Amount:
              </label>
              <input
                type="text"
                name="amount"
                className="border border-gray-300 rounded-md p-2 w-full"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="flex items-end justify-end gap-5 mt-5">
            <button
              onClick={handlePrevious}
              className="px-4 py-2 bg-gray-500 text-white rounded-md"
              disabled={currentStep === 0}
            >
              Previous
            </button>
            <button
              onClick={() => handleNext(steps[currentStep].title)}
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
