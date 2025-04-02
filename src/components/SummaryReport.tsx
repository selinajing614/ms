/**
 * AI训练结果总结报告组件
 */
import { FC } from 'react';
import { useUserChoices } from '@/store/userChoices';

interface SummaryReportProps {
  onRetrain: () => void;
}

const SummaryReport: FC<SummaryReportProps> = ({ onRetrain }) => {
  const taskChoices = useUserChoices((state) => state.taskChoices);

  const calculateBias = () => {
    // 这里是示例实现，实际项目中需要根据具体的任务选择来计算偏差
    const biases = {
      content: 0,
      demographic: 0,
      engagement: 0,
    };

    taskChoices.forEach((task) => {
      // 根据不同任务的选择计算偏差
      switch (task.taskId) {
        case 1:
        case 2:
          biases.content += calculateContentBias(task.choices);
          break;
        case 3:
        case 4:
          biases.demographic += calculateDemographicBias(task.choices);
          break;
        case 5:
        case 6:
        case 7:
        case 8:
          biases.engagement += calculateEngagementBias(task.choices);
          break;
      }
    });

    return biases;
  };

  const calculateContentBias = (choices: Record<string, any>) => {
    // 示例实现
    return Math.random() * 100;
  };

  const calculateDemographicBias = (choices: Record<string, any>) => {
    // 示例实现
    return Math.random() * 100;
  };

  const calculateEngagementBias = (choices: Record<string, any>) => {
    // 示例实现
    return Math.random() * 100;
  };

  const biases = calculateBias();

  return (
    <div className="w-full max-w-4xl space-y-8 rounded-lg bg-white p-8 shadow-lg">
      <h2 className="text-2xl font-bold text-gray-900">AI 训练结果分析</h2>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="rounded-lg bg-blue-50 p-6">
          <h3 className="mb-2 text-lg font-semibold text-blue-900">内容偏好</h3>
          <div className="text-3xl font-bold text-blue-600">
            {biases.content.toFixed(1)}%
          </div>
          <p className="mt-2 text-sm text-blue-700">
            反映了您对特定类型内容的偏好程度
          </p>
        </div>

        <div className="rounded-lg bg-green-50 p-6">
          <h3 className="mb-2 text-lg font-semibold text-green-900">
            人群分布
          </h3>
          <div className="text-3xl font-bold text-green-600">
            {biases.demographic.toFixed(1)}%
          </div>
          <p className="mt-2 text-sm text-green-700">
            展示了推荐系统中的人群覆盖情况
          </p>
        </div>

        <div className="rounded-lg bg-purple-50 p-6">
          <h3 className="mb-2 text-lg font-semibold text-purple-900">
            互动倾向
          </h3>
          <div className="text-3xl font-bold text-purple-600">
            {biases.engagement.toFixed(1)}%
          </div>
          <p className="mt-2 text-sm text-purple-700">
            表示系统对高互动内容的偏好程度
          </p>
        </div>
      </div>

      <div className="mt-8 space-y-4 rounded-lg bg-gray-50 p-6">
        <h3 className="text-xl font-semibold text-gray-900">系统建议</h3>
        <p className="text-gray-700">
          基于您的选择，AI系统可能会产生一定的偏差。这些偏差可能会影响推荐的多样性和公平性。
        </p>
        <button
          onClick={onRetrain}
          className="mt-4 rounded-full bg-indigo-600 px-6 py-2 text-white transition-colors hover:bg-indigo-700"
        >
          重新训练系统
        </button>
      </div>
    </div>
  );
};

export default SummaryReport; 