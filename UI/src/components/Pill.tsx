import { motion } from 'framer-motion';
import { Color, getColorClassNames } from '../lib/helpers';

const pill_variants = {
  active: {
    width: '2.5rem',
    borderRadius: '0.25rem',
  },
  inactive: {
    width: '1.25rem',
    borderRadius: '1.25rem',
  },
};

export default function Pill({
  title,
  active,
  color,
  fill,
  onClick,
}: {
  title?: string;
  color: Color;
  active: boolean;
  fill?: boolean;
  onClick: () => void;
}) {
  const { border, bg, text } = getColorClassNames(color);

  return (
    <motion.div
      className="flex cursor-pointer items-center gap-2"
      onClick={onClick}
    >
      <motion.div
        className={`h-5 w-10 rounded-md border-4 ${border} ${
          fill ? bg : undefined
        }`}
        variants={pill_variants}
        animate={active ? 'active' : 'inactive'}
      />
      {title && <span className={`text-xl font-bold ${text}`}>{title}</span>}
    </motion.div>
  );
}
