import cookie from 'react-cookies';

function headerForm() {
  const headers = {
    'X-CSRFToken': cookie.load('csrftoken'),
    'Content-Type': 'multipart/form-data',
  };
  return headers;
}

export default headerForm;
