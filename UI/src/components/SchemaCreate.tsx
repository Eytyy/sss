import { KeyboardEventHandler, useEffect, useRef, useState } from 'react';
import { useAppContext } from '../context/AppContext';

export default function SchemaCreate() {
  const [value, setValue] = useState('');
  const { createSchema, switchView } = useAppContext();

  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => {
    ref?.current?.focus();
  }, []);

  const onEnter: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key !== 'Enter') return void 0;
    createSchema(value);
    switchView({ mode: 'create', view: 'field' });
  };

  return (
    <div>
      <label className="text-sm font-bold" htmlFor="schema-name">
        create new schema
      </label>
      <input
        className="w-full rounded-lg border-4 border-purple-600 text-3xl focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
        ref={ref}
        type="text"
        placeholder="schema name"
        onKeyDown={onEnter}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      {value !== '' && <p className="text-xs">press enter to submit</p>}
    </div>
  );
}
