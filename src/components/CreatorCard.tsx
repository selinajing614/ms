/**
 * Draggable creator card component
 */
import { motion } from 'framer-motion';
import Image from 'next/image';

interface CreatorCardProps {
  id: string;
  name: string;
  image: string;
  isDragging?: boolean;
  onDragStart: () => void;
}

const CreatorCard = ({ id, name, image, isDragging, onDragStart }: CreatorCardProps) => {
  return (
    <div
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData('text/plain', id);
        onDragStart();
      }}
      className="transform transition-all"
    >
      <motion.div
        whileHover={{ scale: 1.05 }}
        className="flex cursor-grab flex-col items-center space-y-2"
      >
        <motion.div
          animate={isDragging ? {
            scale: 1.1,
            filter: 'brightness(1.1)',
          } : {
            scale: 1,
            filter: 'brightness(1)',
          }}
          className={`relative h-24 w-24 overflow-hidden rounded-full border-2 ${
            isDragging 
              ? 'border-[#AC3723] shadow-[0_0_20px_rgba(172,55,35,0.3)]' 
              : 'border-[#D6996D]'
          }`}
        >
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover"
            sizes="(max-width: 96px) 100vw, 96px"
          />
        </motion.div>
        <div className="text-center font-dotgothic16">
          <h3 className="text-lg font-bold text-[#85301C]">{name}</h3>
        </div>
      </motion.div>
    </div>
  );
};

export default CreatorCard; 