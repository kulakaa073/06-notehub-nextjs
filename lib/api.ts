import { Note, NoteListResponse } from '@/types/Note';

import axios from 'axios';

axios.defaults.baseURL = 'https://next-docs-api.onrender.com';

export const getNotes = async ({ currentPage }: { currentPage: number }) => {
  try {
    const res = await axios.get<NoteListResponse>('/notes', {
      params: { page: currentPage },
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
  const res = await axios.get('/categories');
  return res.data;
};

// add functions for creating, updating and deleting notes
