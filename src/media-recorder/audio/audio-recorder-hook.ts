import { useState, useCallback, useEffect, useRef } from 'react';
import RecordRTC from "recordrtc";

interface UseAudioRecorder {
    startRecording: () => void;
    stopRecording: () => void;
    pauseRecording: () => void;
    resumeRecording: () => void;
    resetRecording: () => void;
    audioURL: string | null;
    audioFile: File | null;
    transcription: string;
    isRecording: boolean;
    recordingState: 'idle' | 'recording' | 'paused';
    timeElapsed: number; // Track elapsed time in seconds
}

export const useAudioRecorder = (): UseAudioRecorder => {
    const [recorder, setRecorder] = useState<RecordRTC | null>(null);
    const [audioURL, setAudioURL] = useState<string | null>(null);
    const [audioFile, setAudioFile] = useState<File | null>(null);
    const [transcription, setTranscription] = useState<string>('');
    const [isRecording, setIsRecording] = useState<boolean>(false);
    const [recordingState, setRecordingState] = useState<'idle' | 'recording' | 'paused'>('idle');
    const [timeElapsed, setTimeElapsed] = useState<number>(0);

    const timerRef = useRef<NodeJS.Timeout | null>(null);

    // Helper function to start the timer
    const startTimer = () => {
        timerRef.current = setInterval(() => {
            setTimeElapsed((prevTime) => prevTime + 1);
        }, 1000); // Update time every second
    };

    // Helper function to clear the timer
    const clearTimer = () => {
        if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
        }
    };

    // Start recording and initialize the timer
    const startRecording = useCallback(() => {
        if (recorder) return;

        navigator.mediaDevices.getUserMedia({ audio: true })
            .then((stream) => {
                const newRecorder = new RecordRTC(stream, { type: 'audio' });
                setRecorder(newRecorder);
                newRecorder.startRecording();
                setIsRecording(true);
                setRecordingState('recording');

                // Start the timer
                setTimeElapsed(0);
                clearTimer();
                startTimer();
            })
            .catch((error) => {
                console.error('Error accessing audio devices:', error);
            });
    }, [recorder]);

    // Stop recording and clean up
    const stopRecording = useCallback(() => {
        if (!recorder) return;

        recorder.stopRecording(() => {
            const blob = recorder.getBlob();
            const url = URL.createObjectURL(blob);
            const file = new File([blob], 'recording.webm', { type: 'audio/webm' });

            setAudioURL(url);
            setAudioFile(file);
            setIsRecording(false);
            setRecordingState('idle');

            clearTimer();

            // Optionally transcribe audio
            // transcribeAudio(file);
        });
    }, [recorder]);

    // Pause the recording
    const pauseRecording = useCallback(() => {
        if (!recorder || !isRecording || recordingState === "paused") return;

        recorder.pauseRecording();
        setRecordingState('paused');
        clearTimer(); // Pause timer
    }, [recorder, isRecording, recordingState]);

    // Resume recording after pausing
    const resumeRecording = useCallback(() => {
        if (!recorder || recordingState === "recording") return;

        recorder.resumeRecording();
        setRecordingState('recording');

        // Restart the timer
        clearTimer();
        startTimer();
    }, [recorder, recordingState]);

    // Reset the recording
    const resetRecording = useCallback(() => {
        if (!recorder) return;

        recorder.stopRecording(() => {
            setAudioURL(null);
            setAudioFile(null);
            setIsRecording(false);
            setTimeElapsed(0);
            setRecordingState('idle');
            clearTimer(); // Reset timer
        });
    }, [recorder]);

    // Transcription function (optional)
    // const transcribeAudio = async (file: File) => {
    //     try {
    //         const formData = new FormData();
    //         formData.append('file', file);

    //         const response = await fetch('YOUR_TRANSCRIPTION_API_ENDPOINT', {
    //             method: 'POST',
    //             body: formData,
    //         });

    //         if (response.ok) {
    //             const data = await response.json();
    //             setTranscription(data.transcription);
    //         } else {
    //             console.error('Transcription service failed:', response.statusText);
    //         }
    //     } catch (error) {
    //         console.error('Error transcribing audio:', error);
    //     }
    // };

    // Cleanup timer when component unmounts
    useEffect(() => {
        return () => {
            clearTimer();
        };
    }, []);

    return {
        startRecording,
        stopRecording,
        pauseRecording,
        resumeRecording,
        resetRecording,
        audioURL,
        audioFile,
        transcription,
        isRecording,
        recordingState,
        timeElapsed,
    };
};
