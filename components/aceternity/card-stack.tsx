'use client';

import { useEffect, useState } from 'react';
import { motion } from 'motion/react';

import { cn } from '@/lib/utils';

type Card = {
  id: number;
  name: string;
  designation: string;
  content: React.ReactNode;
};

type CardStackProps = Readonly<{
  items: Card[];
  offset?: number;
  scaleFactor?: number;
  className?: string;
}>;

export function CardStack({
  items,
  offset = 10,
  scaleFactor = 0.06,
  className,
}: CardStackProps) {
  const CARD_OFFSET = offset;
  const SCALE_FACTOR = scaleFactor;
  const [cards, setCards] = useState<Card[]>(items);

  useEffect(() => {
    const interval = setInterval(() => {
      setCards((prevCards) => {
        const newArray = [...prevCards];
        const lastCard = newArray.pop();
        if (lastCard) {
          newArray.unshift(lastCard);
        }
        return newArray;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={cn('relative h-60 w-60 md:h-60 md:w-96', className)}>
      {cards.map((card, index) => (
        <motion.div
          key={card.id}
          className="absolute h-60 w-60 md:h-60 md:w-96 rounded-3xl p-4 shadow-xl border border-neutral-200 dark:border-white/10 shadow-black/10 dark:shadow-white/5 flex flex-col justify-between bg-white dark:bg-black"
          style={{
            transformOrigin: 'top center',
          }}
          animate={{
            top: index * -CARD_OFFSET,
            scale: 1 - index * SCALE_FACTOR,
            zIndex: cards.length - index,
          }}
          initial={false}
        >
          <div className="font-normal text-neutral-700 dark:text-neutral-200">
            {card.content}
          </div>
          <div>
            <p className="text-neutral-500 font-medium dark:text-white">
              {card.name}
            </p>
            <p className="text-neutral-400 font-normal dark:text-neutral-200">
              {card.designation}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

