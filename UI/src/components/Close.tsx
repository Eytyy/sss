import { useNavigate } from 'react-router-dom';

import { useAppContext } from '../context/AppContext';

export default function Close() {
  const { reset } = useAppContext();
  const navigate = useNavigate();

  function onClick() {
    reset();
    navigate('/');
  }

  return (
    <div className="cursor-pointer text-xl font-bold" onClick={onClick}>
      exit
    </div>
  );
}
