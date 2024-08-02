import styled from 'styled-components';

export const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Arial', sans-serif;
`;

export const Header = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
  padding: 10px 0;
`;

export const Title = styled.h1`
  font-size: 1.5rem;
  color: #2c3e50;
  text-align: center;
`;

export const ConversationBox = styled.div`
  height: 400px;
  overflow-y: auto;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 20px;
  background-color: #f9f9f9;
`;

export const Message = styled.div`
  margin-bottom: 15px;
  padding: 10px;
  border-radius: 8px;
  max-width: 70%;
  ${props => props.type === 'user' ? `
    background-color: #3498db;
    color: white;
    align-self: flex-end;
    margin-left: auto;
  ` : props.type === 'ai' ? `
    background-color: #2ecc71;
    color: white;
  ` : `
    background-color: #e74c3c;
    color: white;
  `}
`;

export const ControlButton = styled.button`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: none;
  background-color: ${props => props.isRecording ? '#e74c3c' : '#3498db'};
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }
`;

export const PlayButton = styled.button`
  background: none;
  border: none;
  color: #3498db;
  cursor: pointer;
  margin-left: 10px;
`;

export const InputContainer = styled.div`
  display: flex;
  margin-top: 20px;
`;

export const ChatInput = styled.input`
  flex-grow: 1;
  padding: 10px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  font-size: 1rem;
`;

export const SendButton = styled.button`
  padding: 10px 20px;
  margin-left: 10px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #2980b9;
  }
`;