import { ChangeEvent, onCustomChangeCb } from '../../types';
import InputInfo from './InputInfo';

type Props = {
  name: string;
  value: { [key: string]: string | number };
  description: string;
  options: { name: string; type: string }[];
  onChange: onCustomChangeCb;
};

export default function ObjectInput({
  name,
  description,
  options,
  value,
  onChange,
}: Props) {
  function handleChange(e: ChangeEvent) {
    const { target } = e;
    const update = {
      target: {
        name,
        value: { ...value, [target.name]: target.value },
      },
    };
    onChange(update);
  }

  return (
    <div className="">
      <InputInfo name={name} description={description} />
      <div className={`grid grid-cols-${options.length} gap-4`}>
        {options.map((option) => {
          return (
            <input
              key={option.name}
              type="text"
              name={option.name}
              onChange={handleChange}
              placeholder={option.name}
              value={value[option.name] as string}
            />
          );
        })}
      </div>
    </div>
  );
}
