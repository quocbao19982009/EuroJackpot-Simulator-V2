// TODO: I feel like these need to be dffierent from the DTOs
export interface UserInfo {
  email: string;
  id: number;
  balance: number;
  token?: string;
  totalGames: number;
  totalWinnings: number;
  totalTopUps: number;
}
