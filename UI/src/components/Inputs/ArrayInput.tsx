import { onCustomChangeCb } from '../../types';
import InputInfo from './InputInfo';
import MultiSelectInput from './MultiSelectInput';
import StringArrayInput from './StringArrayInput';
import { InputProps } from './types';

type ArrayInputProps = {
  value: [];
  acceptedValues?: string[];
  onChange: onCustomChangeCb;
} & Omit<InputProps, 'onChange'>;

export default function ArrayInput(props: ArrayInputProps) {
  const { acceptedValues, ...rest } = props;
  if (acceptedValues) {
    return <MultiSelectInput acceptedValues={acceptedValues} {...rest} />;
  } else {
    return (
      <div>
        <InputInfo name={props.name} description={props.description} />
        <StringArrayInput list={props.value} {...props} />
      </div>
    );
  }
}
