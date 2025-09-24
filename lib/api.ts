import { Note, NoteListResponse } from '@/types/note';
import { Category } from '@/types/category';

import axios from 'axios';
import { GetNotesRequestParams } from '@/types/api';

axios.defaults.baseURL = 'https://next-docs-api.onrender.com';

export const getNotes = async ({
  page,
  title,
  categoryId,
}: GetNotesRequestParams) => {
  try {
    const res = await axios.get<NoteListResponse>('/notes', {
      params: { page, title, categoryId },
    });
    return res.data;
  } catch (error) {
    console.error('Error fetching notes:', error);
    throw error;
  }
};

export const getSingleNote = async (id: string) => {
  const res = await axios.get<Note>(`/notes/${id}`);
  return res.data;
};

export const getCategories = async () => {
  const res = await axios.get<Category[]>('/categories');
  return res.data;
};

// add functions for creating, updating and deleting notes
