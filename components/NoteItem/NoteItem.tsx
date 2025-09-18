import Link from 'next/link';
import { FormatedNote } from '@/types/Note';
import css from './NoteItem.module.css';

type Props = {
  item: FormatedNote;
};

const NoteItem = ({ item }: Props) => {
  return (
    <li className={css.listItem}>
      <h2 className={css.title}>{item.title}</h2>
      <p className={css.content}>{item.content}</p>
      <p className={css.tag}>{item.category}</p>
      <Link href={`/notes/${item.id}`} className={css.link}>
        Details
      </Link>
    </li>
  );
};

export default NoteItem;
