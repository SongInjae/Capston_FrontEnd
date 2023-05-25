import styled from 'styled-components';

const Nav = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  //gap: 0.25rem;
  //gap: 0.05rem;
  margin: 1rem;
`;

const Button = styled.button`
  border: none;
  //border-radius: 0.5rem;
  //padding: 0.5rem;
  margin: 0;
  background: white;
  border: 1px solid #e2e2e2;
  color: rgb(195, 0, 47);
  font-size: 1rem;

  width: 2rem;
  height: 2rem;

  &:last-child {
    border-radius: 0 0.25rem 0.25rem 0;
  }
  &:first-child {
    border-radius: 0.25rem 0 0 0.25rem;
  }
  &:hover {
    background-color: rgba(195, 0, 47, 0.1);
    cursor: pointer;
    transform: translateY(-0.1rem);
  }
  &[disabled] {
    background: grey;
    cursor: revert;
    transform: revert;
    color: white;
  }
  &[aria-current] {
    background-color: rgb(195, 0, 47);
    color: white;
    font-weight: bold;
    cursor: revert;
    transform: revert;
  }
`;

const Pagenation = ({ total, limit, page, setPage }) => {
  const numPages = Math.ceil(total / limit);
  let firstNum = 0;
  if (page % 5 === 0) firstNum = (page / 5 - 1) * 5 + 1;
  else firstNum = page - (page % 5) + 1;
  return (
    <>
      <Nav>
        <Button onClick={() => setPage(page - 1)} disabled={page === 1}>
          &lt;
        </Button>
        {Array(5)
          .fill()
          .map((_, i) => (
            <Button
              key={i + firstNum}
              onClick={() => setPage(i + firstNum)}
              aria-current={page === i + firstNum ? 'page' : null}
              disabled={i + firstNum > numPages}
            >
              {i + firstNum}
            </Button>
          ))}
        <Button onClick={() => setPage(page + 1)} disabled={page === numPages}>
          &gt;
        </Button>
      </Nav>
    </>
  );
};

export default Pagenation;
