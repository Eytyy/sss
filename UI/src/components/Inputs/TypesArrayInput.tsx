import { onCustomChangeCb, SchemaField } from '../../types';
import CreateArrayField from '../CreateArrayField';
import InputInfo from './InputInfo';
import { InputProps } from './types';

type Props = {
  value: [];
  parent: string;
  onChange: onCustomChangeCb;
} & Omit<InputProps, 'onChange'>;

export default function TypesArrayInput({
  name,
  description,
  value,
  parent,
  onChange,
}: Props) {
  function add(field: SchemaField) {
    onChange({ target: { name, value: [...value, field] } });
  }

  const allowNestedArrays = parent === 'object';

  return (
    <div>
      <InputInfo name={name} description={description} />
      <div className="my-4 rounded-md bg-white">
        <CreateArrayField onAdd={add} allowNestedArrays={allowNestedArrays} />
        <List list={value} />
      </div>
    </div>
  );
}

function List({ list }: { list: SchemaField[] }) {
  if (!list.length) return null;
  return (
    <ul className="flex flex-wrap gap-4 py-1">
      {list.map(({ _id, name, type }) => {
        return (
          <li
            key={_id as string}
            className="my-2 rounded-md bg-slate-200 py-1 px-2"
          >
            <div>
              <span className="mr-2 font-semibold">{name}:</span>
              <span className="font-mono">{type}</span>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
