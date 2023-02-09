import { onCustomChangeCb } from '../../types';
import InputInfo from './InputInfo';
import { InputProps } from './types';

type Props = {
  disabled?: boolean;
  value: string;
  choices: string[];
  default: string;
  onChange: onCustomChangeCb;
} & Omit<InputProps, 'onChange'>;

export default function ChoicesInput({
  value,
  onChange,
  name,
  choices = [],
  default: defaultChoice,
  description,
}: Props) {
  const handleChange = (name: string, value: string) =>
    onChange({ target: { name, value } });

  return (
    <div className="field">
      <InputInfo description={description} name={name} />
      <div className="flex gap-4">
        {/* Options */}
        {choices.map((choice) => (
          <Choice
            name={name}
            value={value}
            choice={choice}
            defaultChoice={defaultChoice}
            onChange={handleChange}
            key={choice}
          />
        ))}
      </div>
    </div>
  );
}

function Choice({
  name,
  value,
  choice,
  defaultChoice,
  onChange,
}: {
  name: string;
  value: string;
  choice: string;
  defaultChoice: string;
  onChange: (name: string, value: string) => void;
}) {
  const isDefault = choice === defaultChoice;
  const isChecked = value === choice || (value === '' && isDefault);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (isDefault) {
      onChange(name, '');
    } else {
      onChange(name, e.target.value);
    }
  }
  return (
    <div className="flex items-center gap-2">
      <input
        name={name}
        type="radio"
        checked={isChecked}
        value={choice}
        onChange={handleChange}
      />
      <label className="capitalize">
        {isDefault && <span>default: </span>}
        <span className="font-medium">{choice}</span>
      </label>
    </div>
  );
}
