import axiosInstance from './axios';

export const getUserProgress = async (userToken) => {
  try {
    const response = await axiosInstance.get('/users/progress');
    return response.data;
  } catch (error) {
    console.error('Error fetching user progress:', error);
    throw error;
  }
};