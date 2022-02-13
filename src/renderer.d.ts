/* eslint-disable @typescript-eslint/no-explicit-any */
type Unsubscribe = () => void;
type Listener = (...args: unknown[]) => void;

export interface IElectronAPI {
  loadPreferences: () => Promise<void>;
  send: (channel: string, data: unknown) => void;
  on: (
    channel: string,
    listener: (event: Electron.IpcRendererEvent, ...args: any[]) => void
  ) => void;
}

declare global {
  interface Window {
    electronAPI: IElectronAPI;
  }
}
