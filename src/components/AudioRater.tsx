/**
 * 音频内容评分组件
 */
import { FC, useState } from 'react';
import { StarIcon } from '@heroicons/react/24/solid';
import { StarIcon as StarOutline } from '@heroicons/react/24/outline';

interface AudioRaterProps {
  audioUrl: string;
  onRate: (rating: number) => void;
}

const AudioRater: FC<AudioRaterProps> = ({ audioUrl, onRate }) => {
  const [rating, setRating] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleRate = (value: number) => {
    setRating(value);
    onRate(value);
  };

  return (
    <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
      <div className="mb-4">
        <audio
          className="w-full"
          controls
          src={audioUrl}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        />
      </div>

      <div className="flex items-center justify-center space-x-2">
        {[1, 2, 3, 4, 5].map((value) => (
          <button
            key={value}
            onClick={() => handleRate(value)}
            className="transition-transform hover:scale-110"
          >
            {value <= rating ? (
              <StarIcon className="h-8 w-8 text-yellow-400" />
            ) : (
              <StarOutline className="h-8 w-8 text-gray-400" />
            )}
          </button>
        ))}
      </div>

      {rating > 0 && (
        <p className="mt-2 text-center text-sm text-gray-600">
          您的评分：{rating} 星
        </p>
      )}
    </div>
  );
};

export default AudioRater; 