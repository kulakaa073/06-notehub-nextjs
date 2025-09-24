// components/NoteList/NoteList.tsx

import { FormattedNote } from '@/types/note';
import NoteItem from '../NoteItem/NoteItem';
import css from './NoteList.module.css';

type Props = {
  notes: FormattedNote[];
  isFetching?: boolean;
};

const NoteList = ({ notes, isFetching }: Props) => {
  return (
    <div>
      {isFetching && <div className={css.overlay}>Loading new page…</div>}
      <ul className={css.list}>
        {notes.map((note) => (
          <NoteItem key={note.id} item={note} />
        ))}
      </ul>
    </div>
  );
};

export default NoteList;
