import React from 'react';

import { getButtonClassName } from '../../styleHelpers';

function ButtonNextStage({
  onStageChange,
  disabled,
}: {
  onStageChange: () => void;
  disabled: boolean;
}) {
  return (
    <button className={getButtonClassName(!disabled)} onClick={onStageChange} disabled={!disabled}>
      Next stage
    </button>
  );
}

export default ButtonNextStage;
