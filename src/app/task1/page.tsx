/**
 * Task 1: Creator Assessment
 */
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useUserChoices } from '@/store/userChoices';
import CreatorCard from '@/components/CreatorCard';
import DropZone from '@/components/DropZone';

const creators = [
  {
    id: 'alex',
    name: 'Alex H.',
    image: '/creators/alex.jpg',
  },
  {
    id: 'maya',
    name: 'Maya R.',
    image: '/creators/maya.jpg',
  },
  {
    id: 'omar',
    name: 'Omar S.',
    image: '/creators/omar.jpg',
  },
  {
    id: 'juno',
    name: 'Juno K.',
    image: '/creators/juno.jpg',
  },
  {
    id: 'lin',
    name: 'Mr. Lin',
    image: '/creators/lin.jpg',
  },
  {
    id: 'daniela',
    name: 'Daniela T.',
    image: '/creators/daniela.jpg',
  },
  {
    id: 'amy',
    name: 'Amy W.',
    image: '/creators/amy.jpg',
  },
  {
    id: 'kai',
    name: 'Kai M.',
    image: '/creators/kai.jpg',
  },
];

export default function Task1() {
  const router = useRouter();
  const addChoice = useUserChoices((state) => state.addChoice);
  const [draggedCreator, setDraggedCreator] = useState<string | null>(null);
  const [systemMessage, setSystemMessage] = useState<string>('');
  const [hoveredZone, setHoveredZone] = useState<string | null>(null);
  const [remainingCreators, setRemainingCreators] = useState(creators);
  const [processedCount, setProcessedCount] = useState(0);

  const handleDragStart = (creatorId: string) => {
    setDraggedCreator(creatorId);
  };

  const handleDragEnter = (zone: string) => {
    setHoveredZone(zone);
  };

  const handleDragLeave = () => {
    setHoveredZone(null);
  };

  const handleDrop = (zone: 'homepage' | 'review') => {
    if (!draggedCreator) return;

    const message =
      zone === 'homepage' ? 'Trust signal recorded.' : 'Profile held for further analysis.';
    setSystemMessage(message);

    // Remove the creator from the list
    setRemainingCreators((prev) => 
      prev.filter((c) => c.id !== draggedCreator)
    );

    // Update processed count
    const newCount = processedCount + 1;
    setProcessedCount(newCount);

    addChoice(1, {
      creatorId: draggedCreator,
      decision: zone,
      timestamp: new Date().toISOString(),
    });

    setDraggedCreator(null);
    setHoveredZone(null);

    // If all creators have been sorted, proceed to next task
    if (newCount === creators.length) {
      setTimeout(() => {
        router.push('/task2');
      }, 2000);
    }
  };

  return (
    <main className="min-h-screen bg-[#7AA1BE] bg-opacity-10 p-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 space-y-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-2"
          >
            <h1 className="font-dotgothic16 text-3xl font-bold text-[#85301C]">
              LEVEL 1 — TRUSTWORTHY CREATOR
            </h1>
            <div className="h-1 mx-auto w-24 bg-[#AC3723]" />
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="font-dotgothic16 text-lg text-[#85301C]"
          >
            We're calibrating our trust-detection module.
            <br />
            Do these creators seem trustworthy?
          </motion.p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {/* Left: Creator Grid */}
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {remainingCreators.map((creator) => (
              <div key={creator.id}>
                <CreatorCard
                  {...creator}
                  isDragging={draggedCreator === creator.id}
                  onDragStart={() => handleDragStart(creator.id)}
                />
              </div>
            ))}
          </div>

          {/* Right: Drop Zones */}
          <div className="space-y-6">
            <DropZone
              label="Homepage"
              isHovered={hoveredZone === 'homepage'}
              onDrop={() => handleDrop('homepage')}
              onDragEnter={() => handleDragEnter('homepage')}
              onDragLeave={handleDragLeave}
            />
            <DropZone
              label="Needs Review"
              isHovered={hoveredZone === 'review'}
              onDrop={() => handleDrop('review')}
              onDragEnter={() => handleDragEnter('review')}
              onDragLeave={handleDragLeave}
            />

            {/* System Message */}
            <AnimatePresence>
              {systemMessage && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-4 text-center font-dotgothic16 text-[#85301C]"
                >
                  {systemMessage}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-8 text-center space-y-2"
        >
          <div className="font-dotgothic16 text-sm text-[#85301C]/60">
            Progress: {processedCount}/{creators.length}
          </div>
          <div className="mx-auto h-1 w-48 overflow-hidden bg-[#EAC1A3]/30">
            <motion.div
              className="h-full bg-[#7AA1BE]"
              initial={{ width: '0%' }}
              animate={{ width: `${(processedCount / creators.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </motion.div>
      </div>
    </main>
  );
} 