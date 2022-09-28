import React, { FC } from 'react';
import { PlayerToken } from 'ui-kit';
import { useSelector } from 'react-redux';
import styles from './image-card.scss';
import { convertImageUrlToCssUrl } from '../../utils/url';
// import { playersSelectors } from '../../redux/slices/players';
import { gameSelectors } from '../../redux/slices/game';

type Props = {
  imageUrl: string;
  dataIdSelected?: number[];
  labelUrl?: string;
  caption?: string;
};

const ImageCard: FC<Props> = ({ imageUrl, labelUrl, caption, dataIdSelected }) => {
  const dataUser = useSelector(gameSelectors.dataUser);
  return (
    <div className={styles['image-card']} style={{ backgroundImage: convertImageUrlToCssUrl(imageUrl) }}>
      {dataIdSelected?.length
        ? dataIdSelected?.map((id) => (
            <div className={styles['image-card__label']}>
              {dataUser[id]?.avatar === null || dataUser[id]?.avatar?.length === 0 ? (
                <div className={styles['image-card__voted-info']}>
                  <img
                    className={styles['image-card__avatar']}
                    src={
                      dataUser[id]?.avatar ||
                      'https://image.shutterstock.com/image-vector/elephant-icon-260nw-574537432.jpg'
                    }
                    alt='Аватар'
                  />
                  <span className={styles['image-card__voted-name']}>{dataUser[id]?.name}</span>
                </div>
              ) : (
                labelUrl && <PlayerToken imageUrl={labelUrl} />
              )}
            </div>
          ))
        : null}

      {caption && <div className={styles['image-card__caption']}>{caption}</div>}
    </div>
  );
};

export default ImageCard;
