interface GameSetting {
  name: string;
  primaryNumberCount: number;
  primaryNumberRange: number;
  secondaryNumberCount: number;
  secondaryNumberRange: number;
  maxTicketsPerUser: number;
}

export interface GameSettingsOptions {
  eurojackpot: GameSetting;
  lotto: GameSetting;
}

export enum GameType {
  Eurojackpot = "eurojackpot",
  Lotto = "lotto",
}
