import { ChangeEvent, useEffect, useRef } from 'react';

type InputFieldProps = {
  name: string;
  label: string;
  value: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export default function InputField({
  name,
  label,
  value,
  placeholder,
  onChange,
}: InputFieldProps) {
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => {
    ref.current?.focus();
  }, []);

  return (
    <div className="grid max-w-xl gap-1">
      <label className="text-xs font-bold" htmlFor={name}>
        {label}
      </label>
      <input
        ref={ref}
        type="text"
        id={name}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />
      {value !== '' && <p className="text-xs">press enter to submit</p>}
    </div>
  );
}
