import Link from 'next/link';
import css from './Pagination.module.css';

interface PaginationProps {
  total: number;
  currentPage: number;
}

const Pagination = ({ total, currentPage }: PaginationProps) => {
  const perPage = 10;
  const totalPages = Math.ceil(total / perPage);

  return (
    <ul className={css.pagination} aria-label="Pagination Navigation">
      {Array.from({ length: totalPages }, (_, i) => {
        const page = i + 1;
        return (
          <li key={page} className={page === currentPage ? css.active : ''}>
            <Link href={`?page=${page}`}>{page}</Link>
          </li>
        );
      })}
    </ul>
  );
};

export default Pagination;
