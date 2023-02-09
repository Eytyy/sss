import { motion } from 'framer-motion';
import { Color, getColorClassNames } from '../lib/helpers';

type ButtonProps = {
  children: React.ReactNode;
  color: Color;
  noPill?: boolean;
  onClick: (a: string) => void;
};

export default function Button({
  children,
  color,
  noPill,
  onClick,
}: ButtonProps) {
  const { bg, text } = getColorClassNames(color);
  return (
    <motion.button
      className={`w-full text-xl font-medium capitalize ${text} flex items-center justify-between gap-2 rounded-md bg-white px-3 py-4 shadow-md`}
      whileTap={{ boxShadow: 'rgba(0, 0, 0, 0) 0px 0px 0px 0px' }}
      onClick={() => onClick('options')}
    >
      {!noPill && <div className={`h-5 w-5 rounded-full ${bg}`} />}
      {children}
    </motion.button>
  );
}
