import { KeyboardEventHandler, useEffect, useRef, useState } from 'react';
import { useAppContext } from '../context/AppContext';

export default function ProjectCreate() {
  const [value, setValue] = useState('');
  const { createProject, switchView } = useAppContext();

  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => {
    ref?.current?.focus();
  }, []);

  const onEnter: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key !== 'Enter') return void 0;
    createProject(value);
    switchView({ mode: 'create', view: 'schema' });
  };

  return (
    <div>
      <label className="text-sm font-bold" htmlFor="project-name">
        create new project
      </label>
      <input
        id="project-name"
        className="min-w-full rounded-lg border-4 border-black text-3xl focus:border-black focus:ring-1 focus:ring-black"
        ref={ref}
        type="text"
        placeholder="project name"
        onKeyDown={onEnter}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      {value !== '' && <p className="text-xs">press enter to submit</p>}
    </div>
  );
}
