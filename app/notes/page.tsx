import NoteList from '@/components/NoteList/NoteList';
import Pagination from '@/components/Pagination/Pagination';
import { getNotes, getCategories } from '@/lib/api';
import { Note } from '@/types/Note';

import { getCategoryIdByName, getCategoryNameById } from '@/utils/category';
import SearchBox from '@/components/SearchBox/SearchBox';

interface NotesProps {
  searchParams: { [key: string]: string };
}

const Notes = async ({ searchParams }: NotesProps) => {
  const resSearchParams = await searchParams;
  const { page, query, category } = resSearchParams;
  const currentPage = Number(page) || 1;
  const perPage = 10;

  const categoriesRes = await getCategories();
  const notesRes = await getNotes({
    page: currentPage,
    title: query,
    categoryId: getCategoryIdByName(category, await categoriesRes),
  });
  const notesCount = notesRes.total;

  const notes = notesRes.notes.map((note: Note) => {
    const category = getCategoryNameById(note.categoryId, categoriesRes);
    return { ...note, category };
  });

  return (
    <section>
      <h1>Notes List</h1>
      <SearchBox categories={categoriesRes} />
      {notes?.length > 0 && <NoteList notes={notes} />}
      {notesCount > perPage && (
        <Pagination total={notesCount} searchParams={resSearchParams} />
      )}
    </section>
  );
};

export default Notes;
