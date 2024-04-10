export interface GameModel {
  id: number;
  date: string;
  name: GameModelName;
  resultLottery: LotteryInGame;
  lotteriesPlayed: LotteryInGame[];
  totalWinning: number;
  totalCost: number;
}

export interface LotteryInGame {
  id: number;
  date: string;
  primaryNumbers: number[];
  secondaryNumbers: number[];
}

export enum GameModelName {
  Eurojackpot = "Eurojackpot",
  Lotto = "Lotto",
}
