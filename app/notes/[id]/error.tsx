'use client';

type Props = {
  error: Error;
  reset: () => void;
};

export const Error = ({ error, reset }: Props) => {
  return (
    <div>
      <p>Could not fetch note details. {error.message}</p>
      <button onClick={reset}>Try again</button>
    </div>
  );
};
