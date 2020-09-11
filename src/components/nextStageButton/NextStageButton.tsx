import './NextStageButton.css';

import React from 'react';

const getButtonClassName = (isDisabled: boolean) =>
  isDisabled ? 'button_next-stage_disabled' : '';

function NextStageButton({ onChange, disabled }: { onChange: () => void; disabled: boolean }) {
  return (
    <button
      className={'button_next-stage ' + getButtonClassName(disabled)}
      onClick={onChange}
      disabled={disabled}
    >
      СЛЕДУЮЩИЙ УРОВЕНЬ
    </button>
  );
}

export default NextStageButton;
