import React, { useCallback, useEffect, useState } from 'react';
import useCallbackRef from './useCallbackRef';

enum Permission {
  Unknown = 'Unknown',
  Granted = 'Granted',
  Denied = 'Denied',
}

interface UseAudioPermissionArguments {
  onGranted: () => void;
  onDenied: () => void;
}

const useAudioPermission = ({
  onGranted,
  onDenied,
}: UseAudioPermissionArguments): [Permission, () => void] => {
  const [permission, setPermission] = useState(Permission.Unknown);

  const onPermissionGranted = useCallbackRef(onGranted);
  const onPermissionDenied = useCallbackRef(onDenied);

  const askForPermission = useCallback(() => {
    setPermission(Permission.Unknown);

    navigator.mediaDevices
      .getUserMedia({ audio: true, video: false })
      .then((stream) => {
        stream.getTracks().forEach((track) => track.stop());
        setPermission(Permission.Granted);
      })
      .catch((error) => {
        setPermission(Permission.Denied);
      });
  }, []);

  useEffect(() => {
    if (permission === Permission.Granted) onPermissionGranted.current();
    if (permission === Permission.Denied) onPermissionDenied.current();
  }, [permission]);

  return [permission, askForPermission];
};

export default useAudioPermission;
