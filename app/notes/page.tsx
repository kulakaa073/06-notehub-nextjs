import NoteList from '@/components/NoteList/NoteList';
import Pagination from '@/components/Pagination/Pagination';
import { getNotes, getCategories } from '@/lib/api';
import { Note } from '@/types/Note';
import { Category } from '@/types/Category';

interface NotesProps {
  searchParams: { page?: string };
}

const Notes = async ({ searchParams }: NotesProps) => {
  const { page } = await searchParams;
  const currentPage = Number(page) || 1;
  const perPage = 10;

  const notesRes = await getNotes({ currentPage });
  const categoriesRes = await getCategories();
  const notesCount = notesRes.total;

  const notes = notesRes.notes.map((note: Note) => {
    const category =
      categoriesRes.find(
        (category: Category) => category.id === note.categoryId,
      )?.name || 'Uncategorized';
    return { ...note, category };
  });

  return (
    <section>
      <h1>Notes List</h1>
      {notes?.length > 0 && <NoteList notes={notes} />}
      {notesCount > perPage && (
        <Pagination total={notesCount} currentPage={currentPage} />
      )}
    </section>
  );
};

export default Notes;
