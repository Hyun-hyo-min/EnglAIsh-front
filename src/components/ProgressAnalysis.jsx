import React, { useState, useEffect } from 'react';
import { Radar } from 'react-chartjs-2';
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine } from '@fortawesome/free-solid-svg-icons';
import { getUserProgress } from '../api/progress';
import '../styles/ProgressAnalysis.css';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

const ProgressAnalysis = ({ user }) => {
  const [progress, setProgress] = useState(null);

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        if (user && user.token) {
          const progressData = await getUserProgress(user.token);
          setProgress(progressData);
        }
      } catch (error) {
        console.error('Failed to fetch progress:', error);
      }
    };

    fetchProgress();
  }, [user]);

  if (!progress) {
    return <div>Loading progress data...</div>;
  }

  const data = {
    labels: ['Conversation', 'Grammar', 'Vocabulary'],
    datasets: [
      {
        label: 'Current Level',
        data: [progress.conversationLevel, progress.grammarLevel, progress.vocabularyLevel],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      r: {
        angleLines: {
          display: false,
        },
        suggestedMin: 0,
        suggestedMax: 5,
      },
    },
  };

  return (
    <div className="progress-analysis feature-card">
      <FontAwesomeIcon icon={faChartLine} className="feature-icon" />
      <h2>Your English Learning Progress</h2>
      <Radar data={data} options={options} />
      <div className="progress-stats">
        <p>Total Conversations Count: {progress.totalConversations}</p>
      </div>
    </div>
  );
};

export default ProgressAnalysis;
