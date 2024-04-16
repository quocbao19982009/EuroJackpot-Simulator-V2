export interface GameSetting {
  name: string;
  primaryNumberCount: number;
  primaryNumberRange: number;
  secondaryNumberCount: number;
  secondaryNumberRange: number;
  maxTicketsPerUser: number;
  jackpotAmount: number;
}

export interface GameSettingsOptions {
  eurojackpot: GameSetting;
  lotto: GameSetting;
}

export enum GameType {
  Eurojackpot = "eurojackpot",
  Lotto = "lotto",
}
