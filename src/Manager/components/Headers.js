import cookie from 'react-cookies';

function Header() {
  const token = cookie.load('token');
  console.log('token', token);
  const headers = {
    Authorization: `Token ${token}`,
  };
  return headers;
}

export default Header;
