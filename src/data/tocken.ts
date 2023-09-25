const access_token = localStorage.getItem('access_token');
const tockenHeader = {
  headers: {
    Authorization: `Bearer ${access_token}`,
    withCredentials: true,
  },
};

const getToken = () => {
  const access_token = localStorage.getItem('access_token');
  const tockenHeader = {
    headers: {
      Authorization: `Bearer ${access_token}`,
      withCredentials: true,
    },
  };
  const tokenValue = access_token !== null ? tockenHeader : undefined;

  return { access_token, tockenHeader, tokenValue };
};

export { access_token, tockenHeader, getToken };
