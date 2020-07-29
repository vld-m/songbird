import React from 'react';

import { getButtonClassName } from '../../styleHelpers';

function NextStage({ onChange, disabled }: { onChange: () => void; disabled: boolean }) {
  return (
    <button className={getButtonClassName(disabled)} onClick={onChange} disabled={disabled}>
      Next stage
    </button>
  );
}

export default NextStage;
