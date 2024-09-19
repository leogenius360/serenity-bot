import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import React, { useState } from "react";
import { useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import { IoIosMic } from "react-icons/io";
import { IoMicSharp, IoPauseCircle, IoPlay } from "react-icons/io5";
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
    resetRecording,
    resumeRecording,
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
        startContent={<IoMicSharp size={22} />}
        className="dark:text-white"
        onClick={reset}
        onPress={onOpen}
      />
      <Modal
        isOpen={isOpen}
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        backdrop="blur"
        onOpenChange={onOpenChange}
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
                    startContent={<IoPlay size={16} />}
                    className="px-4"
                    onClick={startRecording}
                  >
                    Start recording
                  </Button>
                )}

                {recordingState === "paused" && (
                  <Button
                    size="sm"
                    color="primary"
                    startContent={<IoPlay size={16} />}
                    className="px-4"
                    onClick={resumeRecording}
                  >
                    Continue recording
                  </Button>
                )}

                {recordingState === "recording" && (
                  <Button
                    size="sm"
                    color="danger"
                    variant="ghost"
                    startContent={<FaTimes size={16} />}
                    className="font-bold gap-1"
                    onClick={reset}
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
                    startContent={<IoPauseCircle size={28} />}
                    className=""
                    onClick={pauseRecording}
                  />
                )}

                {recordingState === "recording" && (
                  <Button
                    size="sm"
                    color="primary"
                    variant="ghost"
                    startContent={<MdSaveAlt size={16} />}
                    className="font-bold"
                    onClick={save}
                    onPress={onClose}
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
