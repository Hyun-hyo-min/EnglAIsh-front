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
    const [error, setError] = useState(null);
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
            setError(null);
        } catch (error) {
            console.error('Error starting recording:', error);
            setError('녹음을 시작하는 데 실패했습니다. 마이크 권한을 확인해주세요.');
        }
    };

    const stopRecording = () => {
        if (mediaRecorder.current) {
            mediaRecorder.current.stop();
            setIsRecording(false);
        }
    };

    const handleAudioSend = async (audioBlob) => {
        setIsLoading(true);
        setError(null);
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
            if (error.response && error.response.status === 400 && error.response.data.message === 'Daily message limit exceeded') {
                setError('일일 메시지 한도를 초과했습니다. 내일 다시 시도해주세요.');
            } else {
                setError('AI 응답을 받는 데 실패했습니다. 잠시 후 다시 시도해주세요.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    const playAudioResponse = async (audioUrl) => {
        try {
            const audio = new Audio(audioUrl);
            audio.play();
        } catch (error) {
            console.error('Error playing audio:', error);
            setError('오디오 재생에 실패했습니다.');
        }
    };

    const handleInputChange = (e) => {
        setInputText(e.target.value);
    };

    const handleSendMessage = async () => {
        if (inputText.trim() === '') return;

        setConversation(prev => [...prev, { type: 'user', content: inputText }]);
        setInputText('');
        // 텍스트 메시지 전송 로직 구현 예정
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
                {error && <Message type="error"><strong>Error:</strong> {error}</Message>}
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
                        disabled={!!error}
                    >
                        {isRecording ? <FaStop /> : <FaMicrophone />}
                    </ControlButton>
                )}
            </div>
        </Container>
    );
};

export default AIConversation;