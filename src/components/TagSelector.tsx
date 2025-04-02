/**
 * 标签选择器组件
 */
import { FC, useState } from 'react';
import { motion } from 'framer-motion';

interface Tag {
  id: string;
  name: string;
  category: string;
}

interface TagSelectorProps {
  tags: Tag[];
  maxSelection?: number;
  onSelectionChange: (selectedTags: Tag[]) => void;
}

const TagSelector: FC<TagSelectorProps> = ({
  tags,
  maxSelection = 5,
  onSelectionChange,
}) => {
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);

  const handleTagClick = (tag: Tag) => {
    setSelectedTags((prev) => {
      const isSelected = prev.some((t) => t.id === tag.id);
      let newSelection: Tag[];

      if (isSelected) {
        newSelection = prev.filter((t) => t.id !== tag.id);
      } else if (prev.length < maxSelection) {
        newSelection = [...prev, tag];
      } else {
        return prev;
      }

      onSelectionChange(newSelection);
      return newSelection;
    });
  };

  const categories = Array.from(new Set(tags.map((tag) => tag.category)));

  return (
    <div className="w-full max-w-2xl space-y-6">
      {categories.map((category) => (
        <div key={category} className="space-y-2">
          <h3 className="text-lg font-semibold text-gray-700">{category}</h3>
          <div className="flex flex-wrap gap-2">
            {tags
              .filter((tag) => tag.category === category)
              .map((tag) => {
                const isSelected = selectedTags.some((t) => t.id === tag.id);
                return (
                  <motion.button
                    key={tag.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleTagClick(tag)}
                    className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                      isSelected
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {tag.name}
                  </motion.button>
                );
              })}
          </div>
        </div>
      ))}

      <div className="mt-4 text-sm text-gray-600">
        已选择 {selectedTags.length}/{maxSelection} 个标签
      </div>
    </div>
  );
};

export default TagSelector; 