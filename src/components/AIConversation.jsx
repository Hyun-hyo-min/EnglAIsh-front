import React, { useState, useRef, useEffect } from 'react';
import { sendAudioToServer } from '../api/conversation';
import { FaMicrophone, FaStop, FaPlay, FaPaperPlane } from 'react-icons/fa';
import {
    Container,
    Header,
    Title,
    ConversationBox,
    Message,
    ControlButton,
    PlayButton,
    InputContainer,
    ChatInput,
    SendButton
} from '../styles/AIConversation.styles';

const AIConversation = () => {
    const [isRecording, setIsRecording] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [conversation, setConversation] = useState([]);
    const [inputText, setInputText] = useState('');
    const mediaRecorder = useRef(null);
    const audioContext = useRef(null);

    useEffect(() => {
        audioContext.current = new (window.AudioContext || window.webkitAudioContext)();
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

            setConversation(prev => [...prev,
            { type: 'user', content: result.userText },
            { type: 'ai', content: result.aiText, audioUrl: audioUrl }
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

    const handleInputChange = (e) => {
        setInputText(e.target.value);
    };

    const handleSendMessage = async () => {
        if (inputText.trim() === '') return;

        setConversation(prev => [...prev, { type: 'user', content: inputText }]);
        setInputText('');
    };

    return (
        <Container>
            <Header>
                <Title>English With AI!</Title>
            </Header>
            <ConversationBox>
                {conversation.map((message, index) => (
                    <Message key={index} type={message.type}>
                        <strong>{message.type === 'user' ? 'You' : message.type === 'ai' ? 'AI' : 'Error'}:</strong> {message.content}
                        {message.audioUrl && (
                            <PlayButton onClick={() => playAudioResponse(message.audioUrl)}>
                                <FaPlay />
                            </PlayButton>
                        )}
                    </Message>
                ))}
            </ConversationBox>
            <InputContainer>
                <ChatInput
                    type="text"
                    value={inputText}
                    onChange={handleInputChange}
                    placeholder="메시지를 입력하세요..."
                />
                <SendButton onClick={handleSendMessage}>
                    <FaPaperPlane />
                </SendButton>
            </InputContainer>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                {isLoading ? (
                    <div>Processing...</div>
                ) : (
                    <ControlButton
                        isRecording={isRecording}
                        onClick={isRecording ? stopRecording : startRecording}
                    >
                        {isRecording ? <FaStop /> : <FaMicrophone />}
                    </ControlButton>
                )}
            </div>
        </Container>
    );
};

export default AIConversation;