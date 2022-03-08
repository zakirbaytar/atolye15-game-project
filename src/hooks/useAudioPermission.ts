import { useContext } from 'react';
import { PermissionContext, PermissionContextState } from '../context/PermissionContext';

const useAudioPermission = (): PermissionContextState => {
  return useContext(PermissionContext);
};

export default useAudioPermission;
