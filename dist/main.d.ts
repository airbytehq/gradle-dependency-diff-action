import { DiffResult, TempDirs } from './types.js';
/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
export declare function run(): Promise<void>;
export declare function createTempDirs(): Promise<TempDirs>;
export declare function calculateDiffResults(jarPath: string, configurations: string[], oldRepoDir: string, newRepoDir: string, tempDirs: TempDirs): Promise<DiffResult[]>;
