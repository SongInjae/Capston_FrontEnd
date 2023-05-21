import cookie from 'react-cookies';

function header() {
  const headers = {
    'X-CSRFToken': cookie.load('csrftoken'),
  };
  return headers;
}

export default header;
