import { useState } from 'react';
import { ChangeEvent, onCustomChangeCb } from '../../types';

type Props = {
  name: string;
  list: [];
  onChange: onCustomChangeCb;
};

export default function StringArrayInput({ onChange, name, list }: Props) {
  const [value, setValue] = useState('');

  function add() {
    onChange({ target: { name, value: [...list, value] } });
    setValue('');
  }

  function handleChange(e: ChangeEvent) {
    setValue(e.target.value);
  }

  return (
    <div className="">
      <div className="grid grid-cols-3 gap-4">
        <input
          className="col-span-2 w-full"
          type="text"
          value={value}
          onChange={handleChange}
        />
        <button className="btn col-span-1" onClick={add}>
          +
        </button>
        {/* <List list={list} format="string" /> */}
      </div>
    </div>
  );
}
