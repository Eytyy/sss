import { onCustomChangeCb, CustomChangeEvent } from '../../types';
import InputInfo from './InputInfo';
import { InputProps } from './types';
import CheckboxInput from './CheckboxInput';
import { useState } from 'react';

type Props = {
  acceptedValues: string[];
  value: string[];
  onChange: onCustomChangeCb;
} & Omit<InputProps, 'onChange'>;

export default function MultiSelectInput({
  description,
  name,
  acceptedValues,
  onChange,
}: Props) {
  const [state, setState] = useState<string[]>([]);

  function handleChange(e: CustomChangeEvent, value: string) {
    const checked = e.target.value;
    if (checked) {
      setState([...state, value]);
    } else {
      setState(state.filter((v) => v !== value));
    }
    onChange({
      target: {
        name,
        value: state,
      },
    });
  }

  function isSelected(value: string) {
    return state.includes(value);
  }

  return (
    <div>
      <InputInfo name={name} description={description} />
      <div style={{ display: 'flex', gap: '1rem' }}>
        {acceptedValues.map((value) => {
          return (
            <CheckboxInput
              key={value}
              description=""
              name={value}
              value={isSelected(value)}
              onChange={(e) => handleChange(e, value)}
            />
          );
        })}
      </div>
    </div>
  );
}
