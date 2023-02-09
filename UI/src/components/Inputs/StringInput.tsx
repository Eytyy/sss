import { onCustomChangeCb } from '../../types';
import ChoicesInput from './ChoicesInput';
import InputInfo from './InputInfo';
import { InputProps } from './types';

export type StringInputProps = {
  value: string;
  choices?: string[];
  default?: string;
} & InputProps;

export default function StringInput({
  value,
  onChange,
  name,
  choices,
  default: defaultChoice,
  description,
}: StringInputProps) {
  if (choices) {
    return (
      <ChoicesInput
        value={value}
        onChange={onChange as onCustomChangeCb}
        name={name}
        choices={choices}
        default={defaultChoice as string}
        description={description}
      />
    );
  }

  return (
    <div>
      <InputInfo name={name} description={description} />
      <input
        className="w-full block"
        name={name}
        onChange={onChange}
        placeholder={name}
        type="text"
        value={value}
      />
    </div>
  );
}
