'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useDebounce } from '@/hooks/useDebounce';
import { Category } from '@/types/Category';
import Select, { SingleValue, ActionMeta } from 'react-select';
import { CategoryOption } from '@/types/Category';
import css from './SearchBox.module.css';

interface SearchBoxProps {
  categories: Category[];
}

const SearchBox = ({ categories }: SearchBoxProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [query, setQuery] = useState(() => searchParams.get('query') || '');
  const debouncedQuery = useDebounce(query, 350);

  const [selectedCategory, setSelectedCategory] =
    useState<CategoryOption | null>(() => {
      const categoryParam = searchParams.get('category');
      if (categoryParam) {
        const category = categories.find((cat) => cat.id === categoryParam);
        return category ? { value: category.id, label: category.name } : null;
      }
      return null;
    });

  const lastUrlQuery = useRef(searchParams.get('query') || '');
  const isUserInput = useRef(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    isUserInput.current = true;
  };

  const categoryOptions: CategoryOption[] = useMemo(
    () =>
      categories.map((cat) => ({
        value: cat.name,
        label: cat.name,
      })),
    [categories],
  );

  const handleCategoryChange = (
    newValue: SingleValue<CategoryOption>,
    actionMeta: ActionMeta<CategoryOption>,
  ) => {
    setSelectedCategory(newValue);

    const params = new URLSearchParams(searchParams.toString());
    if (newValue) {
      params.set('category', newValue.value);
    } else {
      params.delete('category');
    }
    params.delete('page');
    router.push(`?${params.toString()}`);
  };

  useEffect(() => {
    if (!isUserInput.current || debouncedQuery === lastUrlQuery.current) {
      return;
    }
    const params = new URLSearchParams(searchParams.toString());
    if (debouncedQuery) {
      params.set('query', debouncedQuery);
    } else {
      params.delete('query');
    }
    params.delete('page');
    lastUrlQuery.current = debouncedQuery;
    isUserInput.current = false;
    router.push(`?${params.toString()}`);
  }, [debouncedQuery, router, searchParams]);

  return (
    <div className={css.searchBox}>
      <input
        type="text"
        value={query}
        placeholder="Search..."
        onChange={handleInputChange}
        className={css.input}
      />
      <Select
        options={categoryOptions}
        value={selectedCategory}
        onChange={handleCategoryChange}
        isClearable={true}
        isSearchable={true}
        placeholder="Select category..."
        className={css.input}
        instanceId="category-select"
      />
    </div>
  );
};

export default SearchBox;
