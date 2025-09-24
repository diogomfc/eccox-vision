// src/components/machines/message-display.tsx
"use client";

import { AnimatePresence, motion } from 'framer-motion';

interface MessageDisplayProps {
  message: string | null;
}

const MessageDisplay: React.FC<MessageDisplayProps> = ({ message }) => {
  if (!message) {
    return null;
  }

  const isSuccess = message.includes("sucesso") || message.includes("concluída");
  const baseClasses = "p-4 rounded-lg border mt-4 text-sm font-medium";
  const colorClasses = isSuccess
    ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
    : "bg-red-500/10 text-red-400 border-red-500/30";

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className={`${baseClasses} ${colorClasses}`}
      >
        <p>{message}</p>
      </motion.div>
    </AnimatePresence>
  );
};

export default MessageDisplay;