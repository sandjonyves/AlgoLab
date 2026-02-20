import React, { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { CommentModal } from './CommentModal';

export const FloatingButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 p-4 rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 hover:scale-110 hover:shadow-xl active:scale-95 transition-all duration-200"
        aria-label="Laisser un commentaire"
      >
        <MessageCircle className="w-6 h-6" />
      </button>
      <CommentModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};
