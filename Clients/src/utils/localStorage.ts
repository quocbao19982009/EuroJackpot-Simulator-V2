const tokenKey = "token";

// TODO: Consider using a more secure way to store the token, for example, encrypted or hashed

export const saveTokenKeyLocalStorage = (token: string) => {
  // Encrypt the token before saving it to the local storage
  localStorage.setItem(tokenKey, token);
};

export const clearUserInfoStorage = () => {
  localStorage.removeItem(tokenKey);
};

export const getTokenFromStorage = (): string | null => {
  return localStorage.getItem(tokenKey);
};
