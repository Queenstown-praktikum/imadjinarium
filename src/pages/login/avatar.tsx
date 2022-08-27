import React, { useCallback, useEffect, useMemo } from 'react';
import { useDropzone } from 'react-dropzone';
import { useSelector } from 'react-redux';
import { PlayerToken } from 'ui-kit';
import { ApplicationState } from '../../redux/store';
import { useChangeAvatarMutation } from '../../redux/userApi';
import { convertImageUrlToCssUrl } from '../../utils/url';
import styles from './login.scss'

const Avatar = () => {
  const [changeAvatar, {data} ] = useChangeAvatarMutation()
  const {acceptedFiles, getRootProps, getInputProps} = useDropzone({
    multiple: false,
    accept: {
      'image/*': [],
    },
    onDrop: useCallback(async (files: File[]) => {
      const formData = new FormData();
      const [file] = files;
      formData.append('avatar', file);

      await changeAvatar(formData)
    }, [])
  });
  const user = useSelector((state: ApplicationState) => state.user)
  
  const imageUrl = useMemo(() => (
    acceptedFiles.length && URL.createObjectURL(acceptedFiles[0]) || user?.avatar || ''
  ), [user, acceptedFiles])

  useEffect(() => {
    console.log('data after send avatar', data)
  }, [data])

  return (
    <div {...getRootProps({ className: styles.avatar })}>
      <input
        {...getInputProps()}
        style={{ backgroundImage: convertImageUrlToCssUrl(user?.avatar) }}
      />
      <PlayerToken
        imageUrl={imageUrl}
        className={styles.avatar_token}
      />
    </div>
  );
}

export default Avatar
