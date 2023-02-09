import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { motion } from 'framer-motion';

export default function App() {
  return (
    <div>
      <header className="header">
        <div className="header-inner">
          <div className="flex items-center gap-4">
            <Link to="/ss">
              <motion.div
                className={`h-5 w-10 cursor-pointer rounded-md border-4 border-black bg-transparent`}
              />
            </Link>
            <Projects />
          </div>
        </div>
      </header>
    </div>
  );
}

function Projects() {
  const { projects } = useAppContext();
  return (
    <>
      {projects.map((p) => (
        <Link
          to={`/ss/${p._id}`}
          key={p._id}
          className="flex items-center gap-2 font-bold"
        >
          <div className={`h-5 w-5 rounded-full bg-black`} /> {p.name}
        </Link>
      ))}
    </>
  );
}
