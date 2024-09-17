"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import { useAuth } from "@/auth/provider";
import { LoadingState } from "@/components/loading";
import { onboardingFlow } from "./config";
import { fromTemplate } from "@/utils";

const OnboardingProvider = () => {
  const hasCompletedOnboarding = true;
  const { loading, user } = useAuth(); // Add hasCompletedOnboarding
  const { isOpen, onOpenChange, onClose } = useDisclosure();
  const [currentState, setCurrentState] = useState<string>(!user ? "init" : "");
  const [subStage, setSubStage] = useState<"messages" | "component">(
    "messages",
  ); // Tracks messages or component sub-stage

  // Get current state content
  const stateContent: typeof onboardingFlow.init = onboardingFlow[currentState];

  const Message = dynamic(
    () => import("@/components/forms/chat-input").then((mod) => mod.Message),
    { ssr: false },
  );

  useEffect(() => {
    if (user && hasCompletedOnboarding) {
      // If user exists and has completed onboarding, close modal or skip process
      onClose();
    }
  }, [user, hasCompletedOnboarding, onClose]);

  const next = () => {
    // Move from messages to component if available, otherwise go to next state
    if (subStage === "messages" && stateContent?.component) {
      setSubStage("component");
    } else {
      moveToNextState();
    }
  };

  const moveToNextState = () => {
    // Logic to move to the next onboarding stage (auth, profile)
    switch (currentState) {
      case "init":
        setCurrentState("auth");
        break;
      case "auth":
        setCurrentState("profile");
        break;
      case "profile":
        // Optionally mark onboarding as completed for the user
        onClose();
        break;
      default:
        onClose();
    }
    setSubStage("messages"); // Reset sub-stage to messages for the new state
  };

  // if (loading) return <LoadingState />;

  return (
    <>
      <Modal
        size="xl"
        scrollBehavior="inside"
        isOpen={!user && !isOpen}
        onOpenChange={onOpenChange}
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        hideCloseButton
      >
        <ModalContent className="border-1 border-emerald-600 h-screen">
          {(onClose) => (
            <>
              {!user && (
                <>
                  <ModalHeader className="flex flex-col gap-1 font-bold">
                    {fromTemplate(stateContent?.heading, {}, "...")}
                  </ModalHeader>
                  <ModalBody className="overflow-y-auto custom-scrollbar">
                    {subStage === "messages" &&
                      stateContent?.messages?.map((msg, idx) => (
                        <Message
                          key={idx}
                          msg={msg}
                          className="text-lg text-justify"
                        />
                      ))}

                    {/* {subStage === "component" && stateContent?.component && (
                      dynamic(import={() => import(stateContent.component)})
                    )} */}
                  </ModalBody>
                  <ModalFooter className="justify-between">
                    <Button
                      size="sm"
                      color="danger"
                      variant="ghost"
                      onClick={onClose}
                      className="rounded font-bold"
                    >
                      Remind me later
                    </Button>
                    <Button
                      size="sm"
                      color="primary"
                      variant="ghost"
                      onClick={
                        currentState === "profile" && subStage === "component"
                          ? onClose
                          : next
                      }
                      className="rounded font-bold"
                    >
                      {subStage === "messages"
                        ? "Proceed to component"
                        : "Next Stage"}
                    </Button>
                  </ModalFooter>
                </>
              )}
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default OnboardingProvider;
