export const setDefaultTheme = () => {
  const isDarkTheme = localStorage.getItem('darkTheme') === 'true';
  document.body.classList.toggle('dark-theme', isDarkTheme);
  return isDarkTheme;
};

export const changeTheme = (newState) => {
  document.body.classList.toggle('dark-theme', newState);
  localStorage.setItem('darkTheme', newState);
};
