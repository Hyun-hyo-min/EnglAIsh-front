import axiosInstance from './axios';

export const sendAudioToServer = async (audioBlob) => {
  const formData = new FormData();
  formData.append('audio', audioBlob, 'recording.mp3');

  try {
    const response = await axiosInstance.post('/conversations/voice-conversation', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error sending audio to server:', error);
    throw error;
  }
};

export const getAudioResponse = async (audioUrl) => {
    try {
      console.log('Fetching audio from:', audioUrl);
      const response = await axiosInstance.get(audioUrl, {
        responseType: 'arraybuffer',
        withCredentials: true,
      });
      console.log('Audio response received:', response);
      return response.data;
    } catch (error) {
      console.error('Error getting audio response:', error);
      if (error.response) {
        console.error('Error response:', error.response);
        console.error('Error response data:', error.response.data);
      }
      throw error;
    }
};
