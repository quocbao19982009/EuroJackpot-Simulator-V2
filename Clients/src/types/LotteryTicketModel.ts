export interface LotteryTicketModel extends LotteryInput {
  id: string;
  manualSelection: {
    primary: number[];
    secondary: number[];
  };
}

export interface LotteryInput {
  primaryNumbers: number[];
  secondaryNumbers: number[];
}
