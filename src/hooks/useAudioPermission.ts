import React, { useContext } from 'react';
import { PermissionContext } from '../context/PermissionContext';

const useAudioPermission = () => {
  return useContext(PermissionContext);
};

export default useAudioPermission;
