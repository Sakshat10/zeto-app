"use client";
import React, { useState, useEffect } from "react";
import AnimatedProgressStepper from "./AnimatedProgressStepper";
import {
  useWriteContract,
  useWaitForTransactionReceipt,
  useAccount,
} from "wagmi";
import { erc20Abi } from "../../libs/abis/erc20Abi";
import { zetoTokenAbi } from "../../libs/abis/zetoTokenAbi";
import { parseEther } from "viem";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const steps = [
  {
    title: "Approve",
    description: "Give ERC20 contract approval to Zeto Contract",
  },
  {
    title: "Deposit",
    description:
      "Deposit your ERC20 to Zeto contract. Get respective amount of UTXO token",
  },
  { title: "Transfer", description: "Transfer UTXO anonymously" },
  { title: "Success", description: "Transfer successful" },
];

// const erc20Address = "0xBD1dF8b2eeB22ae2f6cB039a1191878eE06583C5";
// const zetoTokenAddress = "0x2CE73d5A63c948CeFdf2E9ad3b414471c35c905C";

const erc20Address = "0x95DbE88709331652C0296cf50235958f83b3B19c";
const zetoTokenAddress = "0x36Bb4C2d4E5CCBB11617Dec032AB4e9212E6d127";

const MurphStep: React.FC = () => {
  const { address: senderAddress, isConnected } = useAccount();
  const {
    data: approveHash,
    isPending: isApprovePending,
    writeContract: approveContract,
  } = useWriteContract();
  const {
    data: approvalReceipt,
    isSuccess: isApprovalSuccess,
    isError: isApprovalError,
  } = useWaitForTransactionReceipt({
    hash: approveHash,
  });

  const {
    data: depositHash,
    isPending: isDepositPending,
    writeContract: deposit,
  } = useWriteContract();
  const {
    data: depositReceipt,
    isSuccess: isDepositSuccess,
    isError: isDepositError,
  } = useWaitForTransactionReceipt({
    hash: depositHash,
  });

  const {
    data: transferHash,
    isPending: isTransferPending,
    writeContract: transfer,
  } = useWriteContract();
  const {
    data: transferReceipt,
    isSuccess: isTransferSuccess,
    isError: isTransferError,
  } = useWaitForTransactionReceipt({
    hash: transferHash,
  });

  const [currentStep, setCurrentStep] = useState(0);
  const [approveAmount, setApproveAmount] = useState("");
  const [approveRecipient, setApproveRecipient] = useState("");
  const [depositAmount, setDepositAmount] = useState("");
  const [depositRecipient, setDepositRecipient] = useState("");
  const [waitingForApproval, setWaitingForApproval] = useState(false);
  const [waitingForDeposit, setWaitingForDeposit] = useState(false);
  const [waitingForTransfer, setWaitingForTransfer] = useState(false);

  const [isApprovalSuccess1, setIsApprovalSuccess] = useState(false);
  const [isDepositSuccess1, setIsDepositSuccess] = useState(false);
  const [isTransferSuccess1, setIsTransferSuccess] = useState(false);
  const [salt, setSalt] = useState();

  const [utxo, setUTXO] = useState({
    value: "",
    hash: "",
    salt: "",
  });

  const [isUtxoSet, setUtxoActive] = useState(false);

  // Approval useEffect
  useEffect(() => {
    if (isApprovalSuccess && currentStep === 0) {
      toast.success("Approval successful! Proceed to Deposit.");
      setCurrentStep(1);
      setIsApprovalSuccess(true);
      setWaitingForApproval(false);
    }

    if (isApprovalError && currentStep === 0) {
      toast.error("Approval failed!");
      setWaitingForApproval(false);
    }
  }, [isApprovalSuccess, isApprovalError, currentStep]);

  // Deposit useEffect
  useEffect(() => {
    if (isDepositSuccess && currentStep === 1) {
      toast.success("Deposit successful! Proceed to Transfer.");
      setCurrentStep(2);
      setIsDepositSuccess(true);
      setWaitingForDeposit(false);
    }

    if (isDepositError && currentStep === 0) {
      toast.error("Deposit failed!");
      setWaitingForDeposit(false);
    }
  }, [isDepositSuccess, isDepositError, currentStep]);

  // Transfer useEffect
  useEffect(() => {
    if (isTransferSuccess && currentStep === 2) {
      toast.success("UTXO transfer successful!");
      setCurrentStep(3);
      setIsTransferSuccess(true);
      setWaitingForTransfer(false);
    }

    if (isTransferError && currentStep === 2) {
      toast.error("Transfer failed!");
      setWaitingForTransfer(false);
    }
  }, [isTransferSuccess, isTransferError, currentStep]);

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
        console.log("console inside deposit", approveAmount, approveRecipient);
        setWaitingForDeposit(true);
        // Call api to generate the proof
        const response = await axios.post(
          "http://localhost:3001/api/generate-proof",
          { amount: approveAmount, address: senderAddress }
        );
        const { outputCommitments, encodedProof } = await response.data;

        console.log({ outputCommitments, encodedProof });

        await deposit({
          address: zetoTokenAddress,
          abi: zetoTokenAbi,
          functionName: "deposit",
          args: [approveAmount, outputCommitments[0], encodedProof],
        });

        console.log("Deposit transaction initiated!");
      } catch (error) {
        console.error("Deposit failed", error);
        setWaitingForDeposit(false);
      }
    } else if (currentStep === 2) {
      try {
        setWaitingForTransfer(true);
        // Prepare transfer proofs
        const transferRes = await axios.post(
          "http://localhost:3001/api/transfer-proof",
          { amount: approveAmount, address: senderAddress }
        );
        const transferProof = await transferRes.data;

        console.log("console transferProof", transferProof);

        const inputCommitments = transferProof.inputCommitments;
        const outputCommitmentsOfTransfer = transferProof.outputCommitments;
        const encodedProofOfTransfer = transferProof.encodedProof;

        console.log(
          "transfer Proof",
          inputCommitments,
          outputCommitmentsOfTransfer,
          JSON.stringify(encodedProofOfTransfer)
        );

        await transfer({
          address: zetoTokenAddress,
          abi: zetoTokenAbi,
          functionName: "transfer",
          args: [
            inputCommitments,
            outputCommitmentsOfTransfer,
            encodedProofOfTransfer,
          ],
        });

        // update sender utxo from db
        console.log("transferProof.utxoHash", transferProof.utxoHash);
        setSalt(transferProof.salt);

        await axios.post("http://localhost:3001/api/updateUtxo", {
          utxoHash: transferProof.utxoHash,
          recipient: approveRecipient,
        });
      } catch (err) {
        console.error("Transfer failed", err);
        setWaitingForTransfer(false);
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep((prevStep) => prevStep - 1);
    }
  };

  const handleSaltSubmit = async () => {
    console.log("console salt");

    const utxo = await axios.post("http://localhost:3001/api/getUtxo", {
      ethAddress: senderAddress,
    });

    console.log("test", utxo.data[0]);
    setUTXO(utxo.data[0]);

    setUtxoActive(true);
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

        {/* Approve Block */}
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

          {/* {currentStep === 1 && (
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
          )} */}

          {currentStep === 3 ? (
            <div className="flex items-center justify-center gap-5 mt-5 mx-auto ">
              <p>Anonomous Transaction Hash: {transferHash || "undefined"}</p>
              <p>Salt: {salt || "undefined"}</p>
            </div>
          ) : (
            <div className="flex items-center justify-center gap-5 mt-5 mx-auto ">
              <button
                onClick={handlePrevious}
                className="px-4 py-2 bg-gray-500 text-white rounded-md"
                disabled={
                  currentStep === 0 ||
                  waitingForApproval ||
                  waitingForDeposit ||
                  waitingForTransfer
                }
              >
                Previous
              </button>
              <button
                onClick={handleNext}
                className="px-4 py-2 bg-blue-500 text-white rounded-md"
                // disabled={
                //   isApprovePending ||
                //   waitingForApproval ||
                //   waitingForDeposit ||
                //   waitingForTransfer
                // }
              >
                {waitingForApproval || waitingForDeposit || waitingForTransfer
                  ? "Waiting for Tx..."
                  : steps[currentStep].title}
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="mt-6 border-2 border-blue-500 p-6 rounded-lg">
        <h2 className="text-2xl font-semibold text-center">Get my UTXO</h2>

        <div className="flex justify-between items-center">
          <label
            htmlFor="approveAmount"
            className="text-gray-700 font-semibold w-24"
          >
            Salt:
          </label>
          <input
            type="text"
            name="approveAmount"
            className="border border-gray-300 rounded-md p-2 w-full text-black"
            placeholder="Enter salt from sender"
            required
          />
          <button
            onClick={handleSaltSubmit}
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            Submit
          </button>
        </div>
        <br></br>

        {isUtxoSet && (
          <div>
            <p>Value: {utxo.value}</p>
            <p>Salt: {utxo.salt}</p>
            <p>Hash: {utxo.hash}</p>
          </div>
        )}
      </div>

      <ToastContainer position="top-right" autoClose={5000} />
    </div>
  );
};

export default MurphStep;
