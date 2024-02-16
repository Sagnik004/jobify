import { useLocation, Link, useNavigate } from 'react-router-dom';
import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi';

import Wrapper from '../assets/wrappers/PageBtnContainer';
import { useAllJobsContext } from '../pages/AllJobs';

const PageBtnContainer = () => {
  const { search, pathname } = useLocation();
  const navigate = useNavigate();
  const {
    data: { numberOfPages, currentPage },
  } = useAllJobsContext();

  const pages = Array.from({ length: numberOfPages }, (_, index) => {
    return index + 1;
  });

  const addPageButton = ({ pageNum, activeClass }) => {
    return (
      <button
        className={`btn page-btn ${activeClass && 'active'}`}
        key={pageNum}
        onClick={() => handlePageChange(pageNum)}
      >
        {pageNum}
      </button>
    );
  };

  const renderPageButtons = () => {
    const pageButtons = [];

    // Button for first page should show always...
    pageButtons.push(
      addPageButton({ pageNum: 1, activeClass: currentPage === 1 })
    );

    // Dots for the left of current button
    if (currentPage > 3) {
      pageButtons.push(
        <span className='page-btn dots' key='dots-1'>
          ...
        </span>
      );
    }

    // 1 before current page
    if (currentPage !== 1 && currentPage !== 2) {
      pageButtons.push(
        addPageButton({ pageNum: currentPage - 1, activeClass: false })
      );
    }

    // Button for current page...
    // Since first and last page button will always get displayed, when current page
    // is either first page or last page, in that case dont add current page button
    // again to avoid duplicates.
    if (currentPage !== 1 && currentPage !== numberOfPages) {
      pageButtons.push(
        addPageButton({ pageNum: currentPage, activeClass: true })
      );
    }

    // 1 after current page
    if (currentPage !== numberOfPages && currentPage !== numberOfPages - 1) {
      pageButtons.push(
        addPageButton({ pageNum: currentPage + 1, activeClass: false })
      );
    }

    // Dots for the right of current button
    if (currentPage < numberOfPages - 2) {
      pageButtons.push(
        <span className='page-btn dots' key='dots+1'>
          ...
        </span>
      );
    }

    // Button for last page should show always...
    pageButtons.push(
      addPageButton({
        pageNum: numberOfPages,
        activeClass: currentPage === numberOfPages,
      })
    );

    pages.map((pageNum) => {});

    return pageButtons;
  };

  const handlePageChange = (pageNum) => {
    const searchParams = new URLSearchParams(search);
    searchParams.set('page', pageNum);
    navigate(`${pathname}?${searchParams.toString()}`);
  };

  return (
    <Wrapper>
      <button
        className='btn prev-btn'
        onClick={() => {
          let prevPage = currentPage - 1;
          if (prevPage < 1) {
            prevPage = numberOfPages;
          }
          handlePageChange(prevPage);
        }}
      >
        <HiChevronDoubleLeft />
        Prev
      </button>
      <div className='btn-container'>{renderPageButtons()}</div>
      <button
        className='btn next-btn'
        onClick={() => {
          let nextPage = currentPage + 1;
          if (nextPage > numberOfPages) {
            nextPage = 1;
          }
          handlePageChange(nextPage);
        }}
      >
        Next
        <HiChevronDoubleRight />
      </button>
    </Wrapper>
  );
};

export default PageBtnContainer;
