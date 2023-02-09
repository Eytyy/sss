import { MdInfo } from 'react-icons/md';
import { motion } from 'framer-motion';
import { useState } from 'react';

type Props = {
  name: string;
  description: string;
};

const variants = {
  hidden: {
    opacity: 0,
    height: 0,
    transition: {
      opacity: { duration: 0.2 },
      height: { duration: 0.2, delay: 0.2 },
    },
    transitionEnd: { display: 'none' },
  },
  visible: {
    display: 'block',
    opacity: 1,
    height: 'auto',
    transition: {
      opacity: { duration: 0.2 },
      height: { duration: 0.2 },
    },
  },
};
export default function InputInfo({ name, description }: Props) {
  const [isDescriptionVisible, setIsDescriptionVisible] = useState(false);

  function toggleDescription() {
    setIsDescriptionVisible((isDescriptionVisible) => !isDescriptionVisible);
  }
  return (
    <div className="relative mb-2">
      <MdInfo
        className=":hover:text-blue absolute right-0 top-0 cursor-pointer text-2xl"
        onClick={toggleDescription}
      />
      <div className="font-bold capitalize">{name}</div>
      <motion.div
        variants={variants}
        initial={{ height: 0 }}
        animate={isDescriptionVisible ? 'visible' : 'hidden'}
        className="hidden text-sm"
      >
        {description}
      </motion.div>
    </div>
  );
}
