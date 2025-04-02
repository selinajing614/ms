/**
 * 内容创作者资料卡片组件
 */
import { FC } from 'react';

interface ProfileCardProps {
  name: string;
  avatar: string;
  bio: string;
  stats: {
    followers: number;
    posts: number;
    engagement: number;
  };
}

const ProfileCard: FC<ProfileCardProps> = ({ name, avatar, bio, stats }) => {
  return (
    <div className="max-w-sm rounded-lg border border-gray-200 bg-white p-6 shadow-md">
      <div className="flex items-center space-x-4">
        <img
          className="h-16 w-16 rounded-full object-cover"
          src={avatar}
          alt={name}
        />
        <div>
          <h3 className="text-xl font-bold text-gray-900">{name}</h3>
          <p className="text-sm text-gray-600">{bio}</p>
        </div>
      </div>
      
      <div className="mt-4 flex justify-between border-t pt-4">
        <div className="text-center">
          <span className="block text-lg font-bold">{stats.followers}</span>
          <span className="text-sm text-gray-500">关注者</span>
        </div>
        <div className="text-center">
          <span className="block text-lg font-bold">{stats.posts}</span>
          <span className="text-sm text-gray-500">发布</span>
        </div>
        <div className="text-center">
          <span className="block text-lg font-bold">{stats.engagement}%</span>
          <span className="text-sm text-gray-500">互动率</span>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard; 