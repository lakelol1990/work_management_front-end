export const setToken = (accessToken: string) => {
  localStorage.setItem("accessToken", accessToken);
};

export const getAccessToken = () => {
  return localStorage.getItem("accessToken");
};

export const logout = () => {
  localStorage.removeItem("accessToken");
};