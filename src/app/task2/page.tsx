/**
 * Task 2: Communication Clarity Rating
 */
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useUserChoices } from '@/store/userChoices';

const audioClips = [
  {
    id: 'audio1',
    creator: 'Creator A',
    file: '/audio/sample1.mp3',
  },
  {
    id: 'audio2',
    creator: 'Creator B',
    file: '/audio/sample2.mp3',
  },
  {
    id: 'audio3',
    creator: 'Creator C',
    file: '/audio/sample3.mp3',
  },
];

type Rating = 'clear' | 'moderate' | 'unclear';

const feedbackMessages = {
  clear: 'Clarity signal confirmed. Auto-boost applied.',
  moderate: 'Marked for review. Processing cost increased.',
  unclear: 'Content blocked. Creator notified.',
};

const Task2 = () => {
  const router = useRouter();
  const addChoice = useUserChoices((state) => state.addChoice);
  const [currentAudioIndex, setCurrentAudioIndex] = useState(0);
  const [systemMessage, setSystemMessage] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);

  const currentAudio = audioClips[currentAudioIndex];

  const handleRating = (rating: Rating) => {
    setSystemMessage(feedbackMessages[rating]);

    addChoice(2, {
      audioId: currentAudio.id,
      rating,
      timestamp: new Date().toISOString(),
    });

    // Proceed to next audio or finish task
    setTimeout(() => {
      if (currentAudioIndex < audioClips.length - 1) {
        setCurrentAudioIndex(prev => prev + 1);
        setSystemMessage('');
      } else {
        router.push('/task3');
      }
    }, 2000);
  };

  return (
    <main className="min-h-screen bg-[#7AA1BE] bg-opacity-10 p-8">
      <div className="mx-auto max-w-2xl">
        <div className="mb-12 space-y-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-2"
          >
            <h1 className="font-dotgothic16 text-3xl font-bold text-[#85301C]">
              LEVEL 2 — COMMUNICATION CLARITY
            </h1>
            <div className="h-1 mx-auto w-24 bg-[#AC3723]" />
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="font-dotgothic16 text-lg text-[#85301C]"
          >
            Rate each creator's speech clarity.
            <br />
            Your input will help optimize our auto-transcription system.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          {/* Audio Player */}
          <div className="rounded-lg border border-[#D6996D] bg-white p-6 shadow-lg">
            <div className="mb-4 text-center font-dotgothic16 text-[#85301C]">
              {currentAudio.creator}
            </div>
            <audio
              className="mx-auto w-full"
              src={currentAudio.file}
              controls
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
            />
          </div>

          {/* Rating Buttons */}
          <div className="grid grid-cols-3 gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleRating('clear')}
              className="rounded border border-[#7AA1BE] bg-white px-4 py-3 font-dotgothic16 text-[#85301C] transition-colors hover:bg-[#8FB4C7]/10"
            >
              Clear
              <span className="block text-xs text-[#85301C]/70">Auto-Publish</span>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleRating('moderate')}
              className="rounded border border-[#D6996D] bg-white px-4 py-3 font-dotgothic16 text-[#85301C] transition-colors hover:bg-[#EAC1A3]/20"
            >
              Moderate
              <span className="block text-xs text-[#85301C]/70">Needs Review</span>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleRating('unclear')}
              className="rounded border border-[#AC3723] bg-white px-4 py-3 font-dotgothic16 text-[#85301C] transition-colors hover:bg-[#AC3723]/10"
            >
              Unclear
              <span className="block text-xs text-[#85301C]/70">Re-record Required</span>
            </motion.button>
          </div>

          {/* System Message */}
          <AnimatePresence mode="wait">
            {systemMessage && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-center font-dotgothic16 text-[#85301C]"
              >
                {systemMessage}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="text-center font-dotgothic16 text-sm text-[#85301C]/60">
              Progress: {currentAudioIndex + 1}/{audioClips.length}
            </div>
            <div className="mx-auto h-1 w-48 overflow-hidden bg-[#EAC1A3]/30">
              <motion.div
                className="h-full bg-[#7AA1BE]"
                initial={{ width: '0%' }}
                animate={{ 
                  width: `${((currentAudioIndex + 1) / audioClips.length) * 100}%` 
                }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
};

export default Task2; 