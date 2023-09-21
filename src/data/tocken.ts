export const access_token = localStorage.getItem('access_token');
export const tockenHeader = {
  headers: {
    Authorization: `Bearer ${access_token}`,
    withCredentials: true,
  },
};

export const tokenValue = access_token !== null ? tockenHeader : undefined;
