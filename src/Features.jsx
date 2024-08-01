import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments, faTheaterMasks, faChartLine } from '@fortawesome/free-solid-svg-icons';

function FeatureCard({ icon, title, description }) {
  return (
    <div className="feature-card">
      <FontAwesomeIcon icon={icon} className="feature-icon" />
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
}

function Features() {
  const features = [
    {
      icon: faComments,
      title: '실시간 대화',
      description: 'AI와 실시간으로 대화하며 자연스러운 영어 표현을 익히세요.'
    },
    {
      icon: faTheaterMasks,
      title: '시나리오 학습',
      description: '다양한 상황별 시나리오로 실전 영어 능력을 향상시킵니다.'
    },
    {
      icon: faChartLine,
      title: '진척도 분석',
      description: 'AI가 분석한 맞춤형 학습 보고서로 효과적으로 실력을 키우세요.'
    }
  ];

  return (
    <section className="features">
      {features.map((feature, index) => (
        <FeatureCard key={index} {...feature} />
      ))}
    </section>
  );
}

export default Features;