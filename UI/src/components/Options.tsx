import { FieldOptionValues, onCustomChangeCb, OptionProps } from '../types';
import Option from './Option';

export default function Options({
  options,
  onChange,
  type,
  optionsValues,
}: {
  options: OptionProps[];
  onChange: onCustomChangeCb;
  type: string;
  optionsValues: {
    [key: string]: FieldOptionValues;
  };
}) {
  return (
    <div>
      {options?.map((option: OptionProps) => {
        return (
          <div
            key={option.name}
            className="my-4 rounded-md bg-white p-4 shadow-sm shadow-slate-700"
          >
            <Option
              onChange={onChange}
              value={optionsValues[option.name]}
              parent={type}
              {...option}
            />
          </div>
        );
      })}
    </div>
  );
}
