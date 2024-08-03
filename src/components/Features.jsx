import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments, faChartLine } from '@fortawesome/free-solid-svg-icons';

function FeatureCard({ icon, title, description, onClick }) {
  return (
    <div className="feature-card" onClick={onClick}>
      <FontAwesomeIcon icon={icon} className="feature-icon" />
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
}

function Features() {
  const navigate = useNavigate();

  const features = [
    {
      icon: faComments,
      title: '실시간 대화',
      description: 'AI와 실시간으로 대화하며 자연스러운 영어 표현을 익히세요.',
      onClick: () => navigate('/conversation')
    },
    {
      icon: faChartLine,
      title: '진척도 분석',
      description: 'AI가 분석한 맞춤형 학습 보고서로 효과적으로 실력을 키우세요.',
      onClick: () => navigate('/progress')
    }
  ];

  return (
    <section className="features-container">
      <div className="features-grid">
        {features.map((feature, index) => (
          <FeatureCard key={index} {...feature} />
        ))}
      </div>
    </section>
  );
}
export default Features;