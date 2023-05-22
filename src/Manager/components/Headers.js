import cookie from 'react-cookies';

function Header() {
  const token = cookie.load('token');
  console.log('token', token);
  const headers = {
    Authorization: `Token ${token}`,
  };
  console.log(headers);
  return headers;
}

export default Header;
