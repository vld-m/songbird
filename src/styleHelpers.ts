const getButtonClassName = (isDisabled: boolean) =>
  isDisabled ? 'button button_disabled' : 'button';

const getListItemStageClassName = (stage: string, currentGameStage: string) =>
  stage === currentGameStage ? 'navigation__item navigation__item_selected' : 'navigation__item';

export { getButtonClassName, getListItemStageClassName };
