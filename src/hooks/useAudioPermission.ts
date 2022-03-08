import React, { useCallback, useState } from 'react';

export enum AudioPermission {
  Unknown = 'Unknown',
  Granted = 'Granted',
  Denied = 'Denied',
}

const useAudioPermission = (): [AudioPermission, () => void] => {
  const [permission, setPermission] = useState(AudioPermission.Unknown);

  const askForPermission = useCallback(() => {
    setPermission(AudioPermission.Unknown);

    navigator.mediaDevices
      .getUserMedia({ audio: true, video: false })
      .then((stream) => {
        stream.getTracks().forEach((track) => track.stop());
        setPermission(AudioPermission.Granted);
      })
      .catch((error) => {
        setPermission(AudioPermission.Denied);
      });
  }, []);

  return [permission, askForPermission];
};

export default useAudioPermission;
