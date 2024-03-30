import { ChangeEvent, Dispatch } from 'react';

const MIN_ELEMENTS_COUNT = 1;
const MAX_ELEMENTS_COUNT = 20;

type Props = {
  elementsCount: number;
  setElementsCount: Dispatch<number>;
};

export default function Input({ elementsCount, setElementsCount }: Props) {
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    let value = +e.target.value;

    if (value < MIN_ELEMENTS_COUNT) {
      value = MIN_ELEMENTS_COUNT;
    }

    if (value > MAX_ELEMENTS_COUNT) {
      value = MAX_ELEMENTS_COUNT;
    }

    setElementsCount(value);
  }

  return (
    <input
      type="number"
      value={elementsCount}
      onChange={handleChange}
      className="border-2 border-black rounded-lg text-lg px-2"
    />
  );
}
