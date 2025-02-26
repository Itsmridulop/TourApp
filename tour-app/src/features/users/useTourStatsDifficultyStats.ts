import { useMemo } from 'react';

type TourData = {
  name: string;
  difficulty: string;
  [key: string]: any;
};

type GuideData = {
  name: string;
  email: string;
  tour: TourData[];
  [key: string]: any;
};

export const useTourDifficultyStats = (guide: GuideData) => {
  const tourStats = useMemo(() => {
    const stats = guide.tour.reduce((acc, tour) => {
      acc[tour.difficulty] = (acc[tour.difficulty] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(stats).map(([name, value]) => ({ name, value }));
  }, [guide]);

  return tourStats;
};