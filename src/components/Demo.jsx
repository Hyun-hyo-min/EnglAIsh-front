import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';

function Demo() {
  return (
    <section className="demo-section">
      <div className="container">
        <h2>EnglishAI 체험하기</h2>
        <p>지금 바로 AI와 대화를 시작해보세요.</p>
        <div className="demo-button">
          <FontAwesomeIcon icon={faPlay} />
          <span>무료 체험 시작하기</span>
        </div>
      </div>
    </section>
  );
}

export default Demo;