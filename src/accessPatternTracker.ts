/**
 * Access Pattern Tracker — records cache key access patterns.
 *
 * This module is COMPLETE. Your task is in warmupScheduler.ts.
 *
 * Author: Anjali Nair (Backend team)
 * Last Modified: 2026-03-19
 */

interface AccessRecord {
  key: string;
  timestamp: number;
  hitOrMiss: 'hit' | 'miss';
  latencyMs: number;
}

class AccessPatternTracker {
  private records: AccessRecord[] = [];
  private frequency: Map<string, number> = new Map();
  private lastAccess: Map<string, number> = new Map();
  private maxRecords: number;

  constructor(maxRecords: number = 10000) {
    this.maxRecords = maxRecords;
  }

  record(key: string, hitOrMiss: 'hit' | 'miss', latencyMs: number): void {
    const now = Date.now();
    this.records.push({ key, timestamp: now, hitOrMiss, latencyMs });
    this.frequency.set(key, (this.frequency.get(key) || 0) + 1);
    this.lastAccess.set(key, now);

    if (this.records.length > this.maxRecords) {
      this.records = this.records.slice(-this.maxRecords);
    }
  }

  getFrequency(key: string): number {
    return this.frequency.get(key) || 0;
  }

  getLastAccess(key: string): number {
    return this.lastAccess.get(key) || 0;
  }

  getTopKeys(limit: number): Array<{ key: string; count: number }> {
    return Array.from(this.frequency.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, limit)
      .map(([key, count]) => ({ key, count }));
  }

  getMissRate(): number {
    if (this.records.length === 0) return 0;
    const misses = this.records.filter(r => r.hitOrMiss === 'miss').length;
    return misses / this.records.length;
  }

  getAvgLatency(): number {
    if (this.records.length === 0) return 0;
    const total = this.records.reduce((sum, r) => sum + r.latencyMs, 0);
    return total / this.records.length;
  }
}

export { AccessPatternTracker, AccessRecord };
