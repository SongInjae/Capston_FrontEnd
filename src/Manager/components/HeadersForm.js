import cookie from 'react-cookies';

function HeaderForm() {
  const token = cookie.load('token');
  console.log('form token', token);
  const headers = {
    Authorization: `Token ${token}`,
    'Content-Type': 'multipart/form-data',
  };
  return headers;
}

export default HeaderForm;
