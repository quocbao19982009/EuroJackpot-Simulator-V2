export const CURRENT_LOTTERY_ID = "currentLottery";

export const BASED_URL = `${import.meta.env.VITE_APP_BASE_URL}/api`;
export const SECRET_KEY = import.meta.env.VITE_APP_SECRET_KEY;

// Routes
export const HOME_ROUTE = "/";
export const GAME_ROUTE = "/game";
export const EUROJACKPOT_ROUTE = "/game/eurojackpot";
export const LOTTO_ROUTE = "/game/lotto";
export const PROFILE_ROUTE = "/profile";
export const HISTORY_ROUTE = "/history";
export const LOGIN_ROUTE = "/login";
export const REGISTER_ROUTE = "/register";
export const TRANSACTION_ROUTE = "/transaction";
export const NOT_FOUND_ROUTE = "*";
