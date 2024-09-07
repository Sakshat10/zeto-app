"use client";
import React, { useState, useEffect } from "react";
import AnimatedProgressStepper from "./AnimatedProgressStepper";
import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { erc20Abi } from "../../libs/abis/erc20Abi";
import { zetoTokenAbi } from "../../libs/abis/zetoTokenAbi";
import { parseEther } from "viem";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const steps = [
  { title: "Approve", description: "Approve the transaction to proceed" },
  { title: "Deposit", description: "Deposit your funds into the account" },
  { title: "Transact", description: "Finalize your transaction" },
];

const erc20Address = "0xBD1dF8b2eeB22ae2f6cB039a1191878eE06583C5";
const zetoTokenAddress = "0x2CE73d5A63c948CeFdf2E9ad3b414471c35c905C";

const MurphStep: React.FC = () => {
  const { data: approveHash, isPending: isApprovePending, writeContract: approveContract } =
    useWriteContract();
  const { data: receipt, isSuccess, isError } =
    useWaitForTransactionReceipt({
      hash: approveHash,
    });

  const [currentStep, setCurrentStep] = useState(0);
  const [approveAmount, setApproveAmount] = useState("");
  const [approveRecipient, setApproveRecipient] = useState("");
  const [depositAmount, setDepositAmount] = useState("");
  const [depositRecipient, setDepositRecipient] = useState("");
  const [waitingForApproval, setWaitingForApproval] = useState(false);
  const [isApprovalSuccess, setIsApprovalSuccess] = useState(false);

  useEffect(() => {
    if (isSuccess && currentStep === 0) {
      toast.success("Approval successful! Proceed to Deposit.");
      setCurrentStep(1); 
      setIsApprovalSuccess(true); 
      setWaitingForApproval(false); 
    }

    if (isError && currentStep === 0) {
      toast.error("Approval failed!");
      setWaitingForApproval(false);
    }
  }, [isSuccess, isError, currentStep]);

  const handleNext = async () => {
    if (currentStep === 0) {

      try {
        const amountInWei = parseEther(approveAmount);
        setWaitingForApproval(true); 

        await approveContract({
          address: erc20Address,
          abi: erc20Abi,
          functionName: "approve",
          args: [zetoTokenAddress, amountInWei.toString()],
        });
        console.log("Approval transaction initiated!", approveHash);
      } catch (error) {
        console.error("Approval failed", error);
        setWaitingForApproval(false); 
        return;
      }
    } else if (currentStep === 1) {

      try {
        const depositAmountInWei = parseEther(depositAmount);

        console.log("Deposit transaction initiated!");
        toast.info("Deposit functionality not implemented yet.");
        setCurrentStep(2); 
      } catch (error) {
        console.error("Deposit failed", error);
      }
    } else if (currentStep === 2) {

      toast.info("Transaction finalized.");
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
          {currentStep === 0 && (
            <div>
              <div className="mb-4">
                <div className="flex justify-between items-center">
                  <label
                    htmlFor="approveRecipient"
                    className="text-gray-700 font-semibold w-24"
                  >
                    Recipient:
                  </label>
                  <input
                    type="text"
                    name="approveRecipient"
                    className="border border-gray-300 rounded-md p-2 w-full text-black ml-2"
                    placeholder="Enter recipient address"
                    value={approveRecipient}
                    onChange={(e) => setApproveRecipient(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="mb-4">
                <div className="flex justify-between items-center">
                  <label
                    htmlFor="approveAmount"
                    className="text-gray-700 font-semibold w-24"
                  >
                    Amount:
                  </label>
                  <input
                    type="text"
                    name="approveAmount"
                    className="border border-gray-300 rounded-md p-2 w-full text-black"
                    placeholder="Enter amount"
                    value={approveAmount}
                    onChange={(e) => setApproveAmount(e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>
          )}

          {currentStep === 1 && (
            <div>
              <div className="mb-4">
                <div className="flex justify-between items-center">
                  <label
                    htmlFor="depositRecipient"
                    className="text-gray-700 font-semibold w-24"
                  >
                    Recipient:
                  </label>
                  <input
                    type="text"
                    name="depositRecipient"
                    className="border border-gray-300 rounded-md p-2 w-full text-black ml-2"
                    placeholder="Enter recipient address"
                    value={depositRecipient}
                    onChange={(e) => setDepositRecipient(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="mb-4">
                <div className="flex justify-between items-center">
                  <label
                    htmlFor="depositAmount"
                    className="text-gray-700 font-semibold w-24"
                  >
                    Amount:
                  </label>
                  <input
                    type="text"
                    name="depositAmount"
                    className="border border-gray-300 rounded-md p-2 w-full text-black ml-2"
                    placeholder="Enter amount"
                    value={depositAmount}
                    onChange={(e) => setDepositAmount(e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>
          )}

          <div className="flex items-end justify-end gap-5 mt-5">
            <button
              onClick={handlePrevious}
              className="px-4 py-2 bg-gray-500 text-white rounded-md"
              disabled={currentStep === 0 || waitingForApproval}
            >
              Previous
            </button>
            <button
              onClick={handleNext}
              className="px-4 py-2 bg-blue-500 text-white rounded-md"
              disabled={
                isApprovePending || waitingForApproval || 
                (currentStep === 0 && (!approveRecipient || !approveAmount)) ||
                (currentStep === 1 && (!depositRecipient || !depositAmount))
              }
            >
              {waitingForApproval
                ? "Waiting for Approval..."
                : steps[currentStep].title}
            </button>
          </div>
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={5000} />
    </div>
  );
};

export default MurphStep;
