import { onCustomChangeCb } from '../../types';
import { InputProps } from './types';

type CheckboxInputProps = {
  value: boolean;
  onChange: onCustomChangeCb;
} & Omit<InputProps, 'onChange'>;

export default function CheckboxInput({
  value,
  name,
  description,
  onChange,
}: CheckboxInputProps) {
  return (
    <div>
      <div className="flex gap-1 items-center">
        <input
          id={name}
          type="checkbox"
          name={name}
          checked={value}
          onChange={(e) => {
            onChange({
              target: { name, value: e.target.checked },
            });
          }}
        />
        <label htmlFor={name} className="font-bold capitalize ml-2">
          {name}
        </label>
      </div>
      <div className="text-sm">{description}</div>
    </div>
  );
}
