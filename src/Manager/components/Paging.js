import Pagination from 'react-js-pagination';
import './Paging.css';

const Paging = ({ currpage, maxcntItem, count, setPage }) => {
  return (
    <Pagination
      activePage={currpage}
      itemsCountPerPage={maxcntItem}
      totalItemsCount={count}
      pageRangeDisplayed={5}
      prevPageText={'<'}
      nextPageText={'>'}
      onChange={setPage}
    />
  );
};

export default Paging;
