/**
 * FeedLogic Internship 介绍页面
 */
'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#7AA1BE] bg-opacity-10 p-8">
      {/* 显示器外壳 */}
      <div className="relative w-full max-w-4xl rounded-lg border-4 border-[#85301C] bg-white p-8 shadow-lg">
        {/* 显示器屏幕 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.5,
            ease: 'easeOut',
          }}
          className="relative overflow-hidden rounded-md border border-[#D6996D] bg-white p-8 shadow-[0_0_50px_rgba(214,153,109,0.15)]"
        >
          {/* 扫描线动画 */}
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(133,48,28,0.05)_50%)] bg-[length:100%_4px] mix-blend-overlay" />

          {/* 内容区域 */}
          <div className="space-y-8 text-[#85301C]">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <h1 className="mb-6 text-2xl font-bold">
                Welcome to the FeedLogic™ Internship Program.
              </h1>
              <h2 className="mb-4 text-xl">Our mission:</h2>
              <p className="text-lg">
                Make sure every user receives the content that fits them best.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="space-y-4"
            >
              <p>
                You'll be assisting FeedLogic AI, our personalization engine, as it
                learns which creators and content deserve to be promoted.
              </p>

              <p>Don't worry — you're not making the final decisions.</p>
              <p>You're just helping the system get a little bit smarter.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2, duration: 0.8 }}
              className="pt-4"
            >
              <p className="mb-8">Let's begin.</p>

              <Link
                href="/task1"
                className="group relative inline-block overflow-hidden rounded border border-[#AC3723] px-8 py-3 focus:outline-none focus:ring-2 focus:ring-[#AC3723] focus:ring-offset-2 focus:ring-offset-white"
              >
                <span className="absolute inset-y-0 left-0 w-[2px] bg-[#AC3723] transition-all duration-300 ease-out group-hover:w-full" />
                <span className="relative text-lg font-medium text-[#85301C] transition-colors duration-300 ease-out group-hover:text-white">
                  Start Training_
                </span>
              </Link>
            </motion.div>
          </div>

          {/* CRT 效果 */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0,rgba(133,48,28,0.05)_100%)]" />
        </motion.div>

        {/* 显示器按钮装饰 */}
        <div className="absolute -bottom-6 left-1/2 flex -translate-x-1/2 space-x-4">
          <div className="h-3 w-3 rounded-full bg-[#D6996D]" />
          <div className="h-3 w-3 rounded-full bg-[#D6996D]" />
          <div className="h-3 w-3 rounded-full bg-[#D6996D]" />
        </div>
      </div>
    </main>
  );
}
