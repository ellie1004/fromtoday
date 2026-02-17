// Local storage service
import type { StorageData } from '../../shared/types';

const STORAGE_KEY = 'fromtoday-app-data';
const STORAGE_VERSION = '1.0';

class StorageService {
  private cache: StorageData | null = null;

  // Initialize storage with default data
  private getDefaultData(): StorageData {
    return {
      goals: [],
      subGoals: [],
      progressHistory: [],
      aiSessions: [],
      lastSync: new Date().toISOString(),
    };
  }

  // Get all data from storage
  getData(): StorageData {
    if (this.cache) {
      return this.cache;
    }

    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) {
        const defaultData = this.getDefaultData();
        this.saveData(defaultData);
        return defaultData;
      }

      const parsed = JSON.parse(stored);

      // Version check and migration if needed
      if (parsed.version !== STORAGE_VERSION) {
        console.log('Storage version mismatch, migrating...');
        const migrated = this.migrateData(parsed);
        this.saveData(migrated);
        return migrated;
      }

      this.cache = parsed.data;
      return parsed.data;
    } catch (error) {
      console.error('Error reading from storage:', error);
      return this.getDefaultData();
    }
  }

  // Save data to storage
  saveData(data: StorageData): void {
    try {
      const toStore = {
        version: STORAGE_VERSION,
        data: {
          ...data,
          lastSync: new Date().toISOString(),
        },
      };

      localStorage.setItem(STORAGE_KEY, JSON.stringify(toStore));
      this.cache = toStore.data;
    } catch (error) {
      console.error('Error saving to storage:', error);
      throw new Error('Failed to save data to storage');
    }
  }

  // Update specific data
  updateData(updates: Partial<StorageData>): void {
    const currentData = this.getData();
    const updatedData = { ...currentData, ...updates };
    this.saveData(updatedData);
  }

  // Clear all data
  clearData(): void {
    try {
      localStorage.removeItem(STORAGE_KEY);
      this.cache = null;
    } catch (error) {
      console.error('Error clearing storage:', error);
    }
  }

  // Export data as JSON
  exportData(): string {
    const data = this.getData();
    return JSON.stringify(data, null, 2);
  }

  // Import data from JSON
  importData(jsonString: string): boolean {
    try {
      const data = JSON.parse(jsonString) as StorageData;

      // Validate data structure
      if (!this.isValidStorageData(data)) {
        throw new Error('Invalid data structure');
      }

      this.saveData(data);
      return true;
    } catch (error) {
      console.error('Error importing data:', error);
      return false;
    }
  }

  // Validate storage data structure
  private isValidStorageData(data: unknown): data is StorageData {
    if (typeof data !== 'object' || data === null) return false;

    const d = data as Record<string, unknown>;

    return (
      Array.isArray(d.goals) &&
      Array.isArray(d.subGoals) &&
      Array.isArray(d.progressHistory) &&
      Array.isArray(d.aiSessions)
    );
  }

  // Migrate data from old versions
  private migrateData(oldData: unknown): StorageData {
    // Add migration logic here when version changes
    console.log('Migrating data from old version...');

    // For now, just return default data if structure is invalid
    if (typeof oldData === 'object' && oldData !== null) {
      const d = oldData as Record<string, unknown>;
      if (this.isValidStorageData(d.data)) {
        return d.data as StorageData;
      }
    }

    return this.getDefaultData();
  }

  // Get storage size in bytes
  getStorageSize(): number {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? new Blob([stored]).size : 0;
    } catch {
      return 0;
    }
  }

  // Check if storage quota is exceeded
  isStorageAvailable(): boolean {
    try {
      const testKey = '__storage_test__';
      localStorage.setItem(testKey, 'test');
      localStorage.removeItem(testKey);
      return true;
    } catch {
      return false;
    }
  }

  // Clear cache
  clearCache(): void {
    this.cache = null;
  }
}

// Export singleton instance
export const storageService = new StorageService();

// Export backup/restore utilities
export const backupToFile = (): void => {
  const data = storageService.exportData();
  const blob = new Blob([data], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `fromtoday-backup-${new Date().toISOString().split('T')[0]}.json`;
  link.click();
  URL.revokeObjectURL(url);
};

export const restoreFromFile = (file: File): Promise<boolean> => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      const success = storageService.importData(content);
      resolve(success);
    };
    reader.onerror = () => resolve(false);
    reader.readAsText(file);
  });
};
