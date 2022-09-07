import React, { FC, useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router';
import { Transition } from 'react-transition-group';
import cn from 'classnames';
import { shuffle } from '../../utils/shuffle';
import styles from './multi-block.scss';
import FigureCircle from '../assets/figure-circle.svg'
import FigurePolygon from '../assets/figure-polygon.svg'
import FigureRectangle from '../assets/figure-rectangle.svg'
import FigureStar from '../assets/figure-star.svg'

const defaultFigureList = [{
  id: 'FigureCircle',
  Component: FigureCircle,
  zIndex: 100,
}, {
  id: 'FigureRectangle',
  Component: FigureRectangle,
  zIndex: 200,
}, {
  id: 'FigurePolygon',
  Component: FigurePolygon,
  zIndex: 300,
}, {
  id: 'FigureStar',
  Component: FigureStar,
  zIndex: 400,
}]

const MultiBlock: FC = () => {
  const [inProps, setIn] = useState(false)
  const [figureList, upFigureList] = useState(defaultFigureList)
  const navigate = useNavigate();
  useEffect(() => {
    setIn(false)
    setTimeout(() => {
      upFigureList(shuffle(figureList))
      setIn(true)
    }, 1000)
  }, [figureList, navigate])

  const renderFigures = useCallback(({id, Component, zIndex}: any) => (
    <Component key={id} style={{ zIndex }} />
  ), [])

  return <div className={styles.mblock}>
    <div
      className={styles.mblock_figures}
    >
      <Transition
        in={inProps}
        timeout={{
          enter: 300,
          exit: 1000,
        }}
      >
        {(state) => (
          <div className={cn(styles.mblock_figures, {
            [styles['mblock_figures-entering']]: state === 'entering',
            [styles['mblock_figures-exiting']]: state === 'exiting',
          })}>
            {figureList.map(renderFigures)}
          </div>
        )}
      </Transition>
    </div>
  </div>
}


export default MultiBlock
