import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import React, { useState, useRef } from "react";
import { useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import { IoIosMic } from "react-icons/io";
import {
  IoMicCircleOutline,
  IoMicSharp,
  IoPauseCircle,
  IoPlay,
} from "react-icons/io5";
import { MdSaveAlt } from "react-icons/md";
import { useRecorder } from "react-microphone-recorder";

interface VoiceRecorderProps {
  save: () => void;
}

export const VoiceRecorder: React.FC<VoiceRecorderProps> = ({ save }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const {
    startRecording,
    pauseRecording,
    stopRecording,
    resetRecording,
    resumeRecording,
    audioLevel,
    timeElapsed,
    recordingState,
    isRecording,
  } = useRecorder();
  const [duration, setDuration] = useState<number>(0);

  useEffect(() => {
    isRecording && setDuration(Number((timeElapsed / 60).toFixed(2)));
  }, [isRecording, timeElapsed]);

  const reset = () => {
    resetRecording && resetRecording();
    setDuration(0);
  };

  return (
    <>
      <Button
        isIconOnly
        radius="sm"
        color="primary"
        variant="light"
        onClick={reset}
        onPress={onOpen}
        startContent={<IoMicSharp size={22} />}
        className="dark:text-white"
      ></Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        backdrop="blur"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 py-2">
                <small className="text-sm ">Record your audio</small>
              </ModalHeader>

              <ModalBody className="justify-between flex-col gap-3">
                <div className="flex flex-col items-center mx-auto">
                  <span className="p-3 lg:p-5 rounded-full bg-gray-100 dark:bg-gray-950">
                    <IoIosMic size={56} />
                  </span>
                  <small className="font-bold text-xs py-3">
                    {duration} min
                  </small>
                </div>
              </ModalBody>

              <ModalFooter className="pb-2 flex justify-center items-center gap-5 h-24">
                {recordingState === "idle" && (
                  <Button
                    size="sm"
                    color="primary"
                    onClick={startRecording}
                    startContent={<IoPlay size={16} />}
                    className="px-4"
                  >
                    Start recording
                  </Button>
                )}

                {recordingState === "paused" && (
                  <Button
                    size="sm"
                    color="primary"
                    onClick={resumeRecording}
                    startContent={<IoPlay size={16} />}
                    className="px-4"
                  >
                    Continue recording
                  </Button>
                )}

                {recordingState === "recording" && (
                  <Button
                    size="sm"
                    color="danger"
                    variant="ghost"
                    onClick={reset}
                    startContent={<FaTimes size={16} />}
                    className="font-bold gap-1"
                  >
                    Cancel
                  </Button>
                )}

                {recordingState === "recording" && (
                  <Button
                    isIconOnly
                    size="lg"
                    radius="full"
                    color="primary"
                    onClick={pauseRecording}
                    startContent={<IoPauseCircle size={28} />}
                    className=""
                  ></Button>
                )}

                {recordingState === "recording" && (
                  <Button
                    size="sm"
                    color="primary"
                    variant="ghost"
                    onClick={save}
                    onPress={onClose}
                    startContent={<MdSaveAlt size={16} />}
                    className="font-bold"
                  >
                    Save
                  </Button>
                )}
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
