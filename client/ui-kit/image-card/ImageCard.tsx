import React, { FC } from 'react';
import { PlayerToken } from 'ui-kit';
import { useSelector } from 'react-redux';
import styles from './image-card.scss';
import { convertImageUrlToCssUrl } from '../../utils/url';
import { playersSelectors } from '../../redux/slices/players';

type Props = {
  imageUrl: string;
  dataIdSelected?: number[];
  labelUrl?: string;
  caption?: string;
};

const ImageCard: FC<Props> = ({ imageUrl, labelUrl, caption, dataIdSelected }) => {
  const players = useSelector(playersSelectors.players);

  return (
    <div className={styles['image-card']} style={{ backgroundImage: convertImageUrlToCssUrl(imageUrl) }}>
      {dataIdSelected?.length
        ? dataIdSelected?.map((id) => (
            <div className={styles['image-card__label']}>
              {players[id].avatar.length === 0 ? (
                <div className={styles['image-card__voted-info']}>
                  <img className={styles['image-card__avatar']} src={players[id].avatar} alt="Аватар" />
                  <span className={styles['image-card__voted-name']}>{players[id].name}</span>
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
