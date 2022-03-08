import { createContext } from 'react';

export enum AudioPermission {
  Unknown = 'Unknown',
  Granted = 'Granted',
  Denied = 'Denied',
}

export type PermissionContextState = {
  permission: AudioPermission;
  askForPermission: (onGranted?: Callback) => void;
};

export const PermissionContext = createContext({
  permission: AudioPermission.Unknown,
  askForPermission: (onGranted?: Callback) => {},
});
