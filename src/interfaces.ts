interface Bird {
  name: string;
  species: string;
  description: string;
}

interface Stage {
  title: string;
  birds: Bird[];
}

interface GameData {
  STAGES: Stage[];
  BIRD_STUB: Bird;
  MAX_STAGE_SCORE: number;
}

export type { Bird, Stage, GameData };
