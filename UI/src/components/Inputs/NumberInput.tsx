import { InputProps } from './types';

export type NumberInputProps = {
  value: number;
} & InputProps;

export default function NumberInput({
  value,
  onChange,
  name,
  description,
}: NumberInputProps) {
  return (
    <div>
      <div className="mb-2">
        <label className="block font-bold capitalize">{name}</label>
        <p className="text-sm">{description}</p>
      </div>
      <input
        className="w-full block"
        name={name}
        onChange={onChange}
        placeholder={name}
        type="number"
        value={value}
      />
    </div>
  );
}
