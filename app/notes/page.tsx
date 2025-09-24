import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from '@tanstack/react-query';
import { getNotes, getCategories } from '@/lib/api';
import { getCategoryIdByName } from '@/utils/category';
import NotesClient from './Notes.client';

interface NotesPageProps {
  searchParams: { [key: string]: string };
}

const NotesPage = async ({ searchParams }: NotesPageProps) => {
  const resolvedSearchParams = await searchParams;
  const { page, query, category } = resolvedSearchParams;
  const currentPage = Number(page) || 1;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  });

  await queryClient.prefetchQuery({
    queryKey: ['notes', { page: currentPage, query, category }],
    queryFn: () =>
      getNotes({
        page: currentPage,
        title: query,
        categoryId: getCategoryIdByName(category, []), // categories fetched in client too
      }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient searchParams={resolvedSearchParams} />
    </HydrationBoundary>
  );
};

export default NotesPage;
