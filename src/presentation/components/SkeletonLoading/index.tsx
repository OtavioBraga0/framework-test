import React, { HTMLAttributes } from 'react'
import { SkeletonWrapper, Item } from './style'

interface SkeletonItemProps extends HTMLAttributes<HTMLDivElement> {}

const SkeletonItem: React.FC<SkeletonItemProps> = ({ ...rest }) => {
  return <Item {...rest} />
}

interface SkeletonLoadingProps extends HTMLAttributes<HTMLDivElement> {
  loadingNumber?: number
  elementProps: HTMLAttributes<HTMLElement>
}
const SkeletonLoading: React.FC<SkeletonLoadingProps> = ({
  loadingNumber = 4,
  elementProps,
  ...rest
}) => {
  const elements = new Array(loadingNumber).fill('')

  return (
    <SkeletonWrapper {...rest}>
      {elements.map((el, index) => (
        <SkeletonItem key={index} {...elementProps} />
      ))}
    </SkeletonWrapper>
  )
}

export default SkeletonLoading
