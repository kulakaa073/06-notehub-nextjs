'use client';

import { useQuery } from '@tanstack/react-query';
import { getNotes, getCategories } from '@/lib/api';
import { getCategoryIdByName, getCategoryNameById } from '@/utils/category';

import NoteList from '@/components/NoteList/NoteList';
import Pagination from '@/components/Pagination/Pagination';
import SearchBox from '@/components/SearchBox/SearchBox';
import { FormattedNote } from '@/types/note';

interface NotesClientProps {
  searchParams: { [key: string]: string };
}

const NotesClient = ({ searchParams }: NotesClientProps) => {
  const { page, query, category } = searchParams;
  const currentPage = Number(page) || 1;
  const perPage = 10;

  const { data: categories = [] } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  });

  const {
    data: notesRes,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ['notes', { page: currentPage, query, category }],
    queryFn: () =>
      getNotes({
        page: currentPage,
        title: query,
        categoryId: getCategoryIdByName(category, categories),
      }),
    enabled: categories.length > 0,
    staleTime: 1000,
  });

  if (isLoading) return <p>Loading notes...</p>;
  if (!notesRes) return <p>No notes found.</p>;

  const formattedNotes: FormattedNote[] = notesRes.notes.map((note) => ({
    ...note,
    category: getCategoryNameById(note.categoryId, categories),
  }));

  return (
    <section>
      <h1>Notes List</h1>
      <SearchBox categories={categories} isFetching={isFetching} />
      {formattedNotes.length > 0 && (
        <NoteList notes={formattedNotes} isFetching={isFetching} />
      )}
      {notesRes.total > perPage && (
        <Pagination total={notesRes.total} searchParams={searchParams} />
      )}
    </section>
  );
};

export default NotesClient;
