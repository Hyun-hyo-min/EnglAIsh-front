import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { sendAudioToServer } from '../api/conversation';
import '../styles/App.css';

const AIConversation = () => {
    const navigate = useNavigate();
    const [isRecording, setIsRecording] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [conversation, setConversation] = useState([]);
    const mediaRecorder = useRef(null);
    const audioContext = useRef(null);

    useEffect(() => {
        audioContext.current = new (window.AudioContext)();
        return () => {
            if (audioContext.current) {
                audioContext.current.close();
            }
        };
    }, []);

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            mediaRecorder.current = new MediaRecorder(stream);
            mediaRecorder.current.start();

            const audioChunks = [];
            mediaRecorder.current.addEventListener("dataavailable", event => {
                audioChunks.push(event.data);
            });

            mediaRecorder.current.addEventListener("stop", async () => {
                const audioBlob = new Blob(audioChunks, { type: 'audio/mp3' });
                await handleAudioSend(audioBlob);
            });

            setIsRecording(true);
        } catch (error) {
            console.error('Error starting recording:', error);
            setConversation(prev => [...prev, { type: 'error', content: 'Failed to start recording' }]);
        }
    };

    const stopRecording = () => {
        if (mediaRecorder.current) {
            mediaRecorder.current.stop();
            setIsRecording(false);
        }
    };

    const handleAudioSend = async (audioBlob) => {
        try {
            const result = await sendAudioToServer(audioBlob);
            const audioUrl = result.audioUrl;

            console.log('Received audio URL:', audioUrl);

            setConversation(prev => [...prev,
            { type: 'user', content: 'Audio message sent' },
            { type: 'ai', content: result.text, audioUrl: audioUrl }
            ]);

            playAudioResponse(audioUrl);

        } catch (error) {
            console.error('Error handling audio send:', error);
            setConversation(prev => [...prev, { type: 'error', content: 'Failed to get AI response' }]);
        }
    };

    const playAudioResponse = async (audioUrl) => {
        try {
            const audio = new Audio(audioUrl);
            audio.play();
        } catch (error) {
            console.error('Error playing audio:', error);
        }
    };

    return (
        <div>
            <button onClick={() => navigate('/')}>뒤로 가기</button>
            <div style={{ height: '300px', overflowY: 'scroll', border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
                {conversation.map((message, index) => (
                    <div key={index} style={{ marginBottom: '10px', textAlign: message.type === 'user' ? 'right' : 'left' }}>
                        <strong>{message.type === 'user' ? 'You' : message.type === 'ai' ? 'AI' : 'Error'}:</strong> {message.content}
                        {message.audioUrl && <button onClick={() => playAudioResponse(message.audioUrl)}>Play Response</button>}
                    </div>
                ))}
            </div>
            {isLoading ? (
                <div>Processing...</div>
            ) : isRecording ? (
                <button onClick={stopRecording}>Stop Recording</button>
            ) : (
                <button onClick={startRecording}>Start Recording</button>
            )}
        </div>
    );
};

export default AIConversation;