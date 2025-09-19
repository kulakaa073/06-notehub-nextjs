import Link from 'next/link';
import css from './Pagination.module.css';

interface PaginationProps {
  total: number;
  searchParams: Record<string, string | undefined>;
}

const Pagination = ({ total, searchParams }: PaginationProps) => {
  const perPage = 10;
  const totalPages = Math.ceil(total / perPage);
  const currentPage = Number(searchParams.page) || 1;

  if (totalPages <= 1) return null;

  const createPageUrl = (page: number) => {
    const params = new URLSearchParams();

    Object.entries(searchParams).forEach(([key, value]) => {
      if (key !== 'page' && value !== undefined && value !== '') {
        params.set(key, value);
      }
    });

    params.set('page', page.toString());

    return `?${params.toString()}`;
  };

  return (
    <ul className={css.pagination} aria-label="Pagination Navigation">
      {currentPage > 1 && (
        <li className={css.nav}>
          <Link
            href={createPageUrl(currentPage - 1)}
            aria-label="Go to previous page"
          >
            ← Previous
          </Link>
        </li>
      )}
      {Array.from({ length: totalPages }, (_, i) => {
        const page = i + 1;
        return (
          <li key={page} className={page === currentPage ? css.active : ''}>
            <Link href={createPageUrl(page)}>{page}</Link>
          </li>
        );
      })}
      {currentPage < totalPages && (
        <li className={css.nav}>
          <Link
            href={createPageUrl(currentPage + 1)}
            aria-label="Go to next page"
          >
            Next →
          </Link>
        </li>
      )}
    </ul>
  );
};

export default Pagination;
