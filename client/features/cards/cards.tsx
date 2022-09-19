import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import { ImageCard } from 'ui-kit';
import cn from 'classnames'
import styles from './cards.scss';
import { UserDataProps } from '../../redux/slices/cards';
import { IUser } from '../../redux/slices/user';

type CardsProps = {
  data: UserDataProps;
  user: IUser;
  choiceCard: (value: number) => void;
};

const CartList = ({id, choiceCard, choisenId}: {id: number, choisenId: number, choiceCard: (value: number) => void}) => {
  const handleClick = useCallback(() => choiceCard(id), [choiceCard, id])
  // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
  return <li
    key={id}
    className={cn(choisenId === id && styles.card__choisen, styles.card)}
    onClick={handleClick}
  >
    <ImageCard imageUrl={`/image-cards/${id}.jpeg`} />
  </li>
}
  /* eslint-disable-next-line */

const Canvas: FC<CardsProps> = ({data, user, choiceCard}) => {
  const cardsRef = useRef<HTMLCanvasElement>(null);

  const draw = useCallback((context: any, id: number, index: number) => {
    const img = new Image()
    img.src = `/image-cards/${id}.jpeg`

    img.onload = () => {
      context.drawImage(img, 0, 0, 466, 692, index*50, 0, 50, 150)
    }
  }, [])

  useEffect(() => {
    const context = cardsRef.current?.getContext('2d')

    data?.[user?.id]?.map((id, index) => draw(context, id, index))
  }, [data, user, draw])

  const handleClick = useCallback((e: any) => {
    const offsite = e.target.getBoundingClientRect().x
    const positionInsiteCanvas = e.clientX - offsite
    const getIndex = Math.floor(positionInsiteCanvas / 225)
    const getId = data?.[user?.id][getIndex]
    choiceCard(getId)
  }, [choiceCard, data, user])

  return <canvas onClick={handleClick} ref={cardsRef} className={styles.canvas} />
}

export const Cards: FC<CardsProps> = ({ data, user, choiceCard }) => {
  const [useCanvas, setUseCanvas] = useState(false)
  const [choisenId, setChoisenId] = useState<number>()

  const handleChoise = useCallback((id: number) => {
    setChoisenId(id)
    choiceCard(id)
  }, [choiceCard])

  if (useCanvas) {
    return <>
      <div onClick={() => setUseCanvas(false)}>switch to image</div>
      <Canvas {...{data, user, choiceCard: handleChoise}} />
    </>
  }

  return <>
    <div onClick={() => setUseCanvas(true)}>switch to canvas</div>
    <ul className={styles.cards}>{data?.[user?.id]?.map((id) => <CartList
      id={id}
      choiceCard={handleChoise}
      choisenId={choisenId!}
    />)}</ul>
  </>
}
