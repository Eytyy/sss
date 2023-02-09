import { useState } from 'react';
import {
  CustomChangeEvent,
  ObjectStructure,
  onCustomChangeCb,
} from '../../types';
import List from '../List';
import ChoicesInput from './ChoicesInput';
import InputInfo from './InputInfo';
import ObjectArrayInput from './ObjectArrayInput';
import StringArrayInput from './StringArrayInput';
import { InputProps } from './types';

type StateProps = 'string' | 'object';

type Props = {
  value: [];
  typeStructure: ObjectStructure;
  onChange: onCustomChangeCb;
} & Omit<InputProps, 'onChange'>;

export default function StringListInput({
  name,
  value: list,
  description,
  typeStructure,
  onChange,
}: Props) {
  const [format, setFormat] = useState<StateProps>('string');

  function onChangeFormat(e: CustomChangeEvent) {
    const value = e.target.value as StateProps;
    setFormat(value);
  }

  const disableChangeFormat = list.length > 0;
  return (
    <div>
      <InputInfo name={name} description={description} />
      <ChoicesInput
        name="format"
        value={format}
        onChange={onChangeFormat}
        choices={['string', 'object']}
        default="string"
        disabled={disableChangeFormat}
        description={
          'Select the format of the list, array of strings or array of objects'
        }
      />
      <div className="my-4">
        {format === 'string' ? (
          <StringArrayInput name={name} list={list} onChange={onChange} />
        ) : (
          <ObjectArrayInput
            name={name}
            list={list}
            typeStructure={typeStructure}
            onChange={onChange}
          />
        )}
      </div>
    </div>
  );
}
