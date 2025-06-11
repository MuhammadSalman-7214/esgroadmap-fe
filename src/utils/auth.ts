export const isAuthenticated = () => {
  return !!localStorage.getItem('id');
};
