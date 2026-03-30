import { Phase, DayContent } from '../types';
import { cycleContent } from '../data/cycle-content';

export function daysBetween(start: string, end: Date): number {
  const s = new Date(start);
  s.setHours(0, 0, 0, 0);
  const e = new Date(end);
  e.setHours(0, 0, 0, 0);
  return Math.floor((e.getTime() - s.getTime()) / (1000 * 60 * 60 * 24));
}

export function getCycleDay(lastPeriodStart: string, cycleLength: number, today?: Date): number {
  const t = today || new Date();
  const elapsed = daysBetween(lastPeriodStart, t);
  if (elapsed < 0) return 1;
  return (elapsed % cycleLength) + 1;
}

export function mapTo28(cycleDay: number, cycleLength: number): number {
  if (cycleLength === 28) return cycleDay;
  const fraction = (cycleDay - 1) / (cycleLength - 1);
  return Math.round(fraction * 27) + 1;
}

export function getPhase(cycleDay: number, cycleLength: number): Phase {
  const mapped = mapTo28(cycleDay, cycleLength);
  if (mapped <= 5) return 'menstruation';
  if (mapped <= 13) return 'follicular';
  if (mapped <= 16) return 'ovulation';
  if (mapped <= 21) return 'luteal_early';
  return 'luteal_late';
}

export function getDayContent(cycleDay: number, cycleLength: number): DayContent {
  const mapped = mapTo28(cycleDay, cycleLength);
  const index = Math.max(0, Math.min(27, mapped - 1));
  return cycleContent[index];
}

export function getDaysUntilPeriod(cycleDay: number, cycleLength: number): number {
  return cycleLength - cycleDay + 1;
}

export function getExpectedPeriodDate(lastPeriodStart: string, cycleLength: number): Date {
  const start = new Date(lastPeriodStart);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const result = new Date(start);
  while (result <= today) {
    result.setDate(result.getDate() + cycleLength);
  }
  return result;
}
