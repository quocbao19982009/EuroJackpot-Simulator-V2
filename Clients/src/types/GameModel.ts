export interface GameModel {
  id: number;
  date: Date;
  ResultLottery?: LotteryInGame;
  LotteriesPlayed: LotteryInGame[];
  totalWinning: number;
  totalCost: number;
}

interface LotteryInGame {
  id: number;
  date: Date;
  primaryNumbers: number[];
  secondaryNumbers: number[];
}
