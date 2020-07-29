import React from 'react';

import { getButtonClassName } from '../../styleHelpers';

function ButtonNextStage({
  disabled,
  onStageChange,
}: {
  disabled: boolean;
  onStageChange: () => void;
}) {
  return (
    <button className={getButtonClassName(!disabled)} onClick={onStageChange} disabled={!disabled}>
      Next stage
    </button>
  );
}

export default ButtonNextStage;
