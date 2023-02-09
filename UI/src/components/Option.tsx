import ArrayInput from './Inputs/ArrayInput';
import CheckboxInput from './Inputs/CheckboxInput';
import InputInfo from './Inputs/InputInfo';
import NumberInput from './Inputs/NumberInput';
import ObjectArrayInput from './Inputs/ObjectArrayInput';
import ObjectInput from './Inputs/ObjectInput';
import StringInput from './Inputs/StringInput';
import StringListInput from './Inputs/StringListInput';
import TypesArrayInput from './Inputs/TypesArrayInput';
import {
  FieldOptionValues,
  onChangeCb,
  onCustomChangeCb,
  OptionProps,
} from '../types';

export default function Option({
  onChange,
  value,
  ...option
}: {
  onChange: onChangeCb | onCustomChangeCb;
  value: FieldOptionValues;
  parent: string;
} & OptionProps) {
  if (option.type === 'array:stringOrObject') {
    return (
      <StringListInput
        key={option.name}
        onChange={onChange as onCustomChangeCb}
        value={value as []}
        {...option}
      />
    );
  }

  if (option.type === 'array:types') {
    return (
      <TypesArrayInput
        key={option.name}
        onChange={onChange as onCustomChangeCb}
        value={value as []}
        {...option}
      />
    );
  }

  if (option.type === 'array:object') {
    return (
      <div>
        <InputInfo description={option.description} name={option.name} />
        <ObjectArrayInput
          key={option.name}
          onChange={onChange as onCustomChangeCb}
          list={value as []}
          {...option}
        />
      </div>
    );
  }

  if (option.type === 'array') {
    return (
      <ArrayInput
        key={option.name}
        onChange={onChange as onCustomChangeCb}
        value={value as []}
        {...option}
      />
    );
  }

  if (option.type === 'object') {
    const { props: options, ...rest } = option;

    return (
      <ObjectInput
        key={option.name}
        onChange={onChange as onCustomChangeCb}
        options={options}
        value={value as { [key: string]: string | number }}
        {...rest}
      />
    );
  }

  if (option.type === 'string') {
    return (
      <StringInput
        key={option.name}
        onChange={onChange as onChangeCb}
        value={value as string}
        {...option}
      />
    );
  }

  if (option.type === 'boolean') {
    return (
      <CheckboxInput
        key={option.name}
        onChange={onChange as onCustomChangeCb}
        value={value as boolean}
        {...option}
      />
    );
  }

  if (option.type === 'number') {
    return (
      <NumberInput
        key={option.name}
        onChange={onChange as onCustomChangeCb}
        value={value as number}
        {...option}
      />
    );
  }
  return null;
}
