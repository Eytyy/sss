import { useState } from 'react';
import { ChangeEvent, ObjectStructure, onCustomChangeCb } from '../../types';
import Button from '../Button';
import List from '../List';

type Props = {
  list: [];
  name: string;
  typeStructure: ObjectStructure;
  onChange: onCustomChangeCb;
};

function initState(props: ObjectStructure['props']) {
  return props.reduce((props, field) => {
    return { ...props, [field.name]: field.type === 'string' ? '' : 0 };
  }, {} as { [key: string]: string | number });
}

export default function ObjectArrayInput({
  list,
  name,
  onChange,
  typeStructure,
}: Props) {
  const [state, setState] = useState(() => initState(typeStructure.props));

  function handleChange(e: ChangeEvent) {
    setState((state) => {
      return {
        ...state,
        [e.target.name]: e.target.value,
      };
    });
  }

  function add() {
    onChange({ target: { name, value: [...list, state] } });
    // reset state
    setState(initState(typeStructure.props));
  }

  return (
    <div>
      <div className="grid auto-cols-auto grid-cols-3 items-start gap-4">
        {typeStructure.props.map((prop) => {
          return (
            <input
              key={prop.name}
              type="text"
              name={prop.name}
              onChange={handleChange}
              placeholder={prop.name}
              value={state[prop.name]}
            />
          );
        })}
        <Button color="green" onClick={add}>
          + Add
        </Button>
      </div>
      <List list={list} format={'object'} />
    </div>
  );
}
