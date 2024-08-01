import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGraduationCap } from '@fortawesome/free-solid-svg-icons';

function Header() {
  return (
    <header>
      <div className="container hero">
        <div className="hero-content">
          <FontAwesomeIcon icon={faGraduationCap} className="hero-icon" />
          <h1>EnglishAI</h1>
          <p>AI 기반 대화형 영어 학습으로 자신감 있는 영어 실력을 갖추세요.</p>
          <a href="#" className="cta-button">무료로 시작하기</a>
        </div>
      </div>
    </header>
  );
}

export default Header;