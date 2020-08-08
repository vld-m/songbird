interface Bird {
  description: string;
  name: string;
  species: string;
}

interface GameData {
  BIRD_STUB: StageBird;
  MAX_STAGE_SCORE: number;
  STAGES: Stage[];
}

interface Stage {
  title: string;
  birds: Bird[];
}

interface StageBird extends Bird {
  isAnswer: boolean;
  isSelected: boolean;
}

export type { Bird, GameData, Stage, StageBird };
