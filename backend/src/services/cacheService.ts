import NodeCache from 'node-cache';

class CacheService {
  private cache: NodeCache;

  constructor() {
    this.cache = new NodeCache({
      stdTTL: 3600,
      checkperiod: 600,
      deleteOnExpire: true,
      maxKeys: 1000
    });
  }

  set(key: string, value: any, ttl?: number): boolean {
    return this.cache.set(key, value, ttl || 3600);
  }

  get<T>(key: string): T | undefined {
    return this.cache.get<T>(key);
  }

  has(key: string): boolean {
    return this.cache.has(key);
  }

  delete(key: string): number {
    return this.cache.del(key);
  }

  flush(): void {
    this.cache.flushAll();
  }

  getStats() {
    return this.cache.getStats();
  }

  generateKey(url: string): string {
    return `ig_${Buffer.from(url).toString('base64').replace(/[^a-zA-Z0-9]/g, '').substring(0, 32)}`;
  }
}

export default new CacheService();