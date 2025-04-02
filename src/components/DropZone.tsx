/**
 * Drop zone component for creator cards
 */
import { motion } from 'framer-motion';

interface DropZoneProps {
  label: string;
  isHovered?: boolean;
  onDrop: () => void;
  onDragEnter: () => void;
  onDragLeave: () => void;
}

const DropZone = ({ label, isHovered, onDrop, onDragEnter, onDragLeave }: DropZoneProps) => {
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    onDrop();
  };

  return (
    <motion.div
      initial={false}
      animate={{
        backgroundColor: isHovered ? 'rgba(214, 153, 109, 0.1)' : 'rgba(234, 193, 163, 0.05)',
        borderColor: isHovered ? '#AC3723' : '#D6996D',
        boxShadow: isHovered 
          ? '0 0 30px rgba(172, 55, 35, 0.2)' 
          : '0 0 20px rgba(214, 153, 109, 0.1)',
      }}
      className="flex h-48 w-full flex-col items-center justify-center rounded-lg border-2 border-dashed transition-all"
      onDragEnter={(e) => {
        e.preventDefault();
        onDragEnter();
      }}
      onDragLeave={(e) => {
        e.preventDefault();
        onDragLeave();
      }}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <div className="space-y-2 text-center">
        <h3 className="font-dotgothic16 text-xl font-bold text-[#85301C]">
          {label}
        </h3>
        <p className="font-dotgothic16 text-sm text-[#85301C]/70">
          Drag creators here
        </p>
      </div>
    </motion.div>
  );
};

export default DropZone; 