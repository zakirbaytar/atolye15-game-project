import React, { FunctionComponent, useCallback, useState } from 'react';
import { AudioPermission, PermissionContext } from './PermissionContext';

const PermissionProvider: FunctionComponent = ({ children }) => {
  const [permission, setPermission] = useState(AudioPermission.Unknown);

  const askForPermission = useCallback((onGranted?: Callback) => {
    setPermission(AudioPermission.Unknown);

    navigator.mediaDevices
      .getUserMedia({ audio: true, video: false })
      .then((stream) => {
        stream.getTracks().forEach((track) => track.stop());
        setPermission(AudioPermission.Granted);
        onGranted?.();
      })
      .catch(() => {
        setPermission(AudioPermission.Denied);
      });
  }, []);

  return (
    <PermissionContext.Provider value={{ permission, askForPermission }}>
      {children}
    </PermissionContext.Provider>
  );
};

export default PermissionProvider;
