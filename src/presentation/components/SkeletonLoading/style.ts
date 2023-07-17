import styled, { css } from 'styled-components'

export const SkeletonWrapper = styled.div`
  display: flex;
`

export const Item = styled.div`
  ${({ theme }) => css`
    background: ${theme.colors.hex.gray.light};
    background: linear-gradient(
      90deg,
      ${theme.colors.hex.gray.normal} 8%,
      ${theme.colors.hex.white} 18%,
      ${theme.colors.hex.gray.normal} 33%
    );
    background-size: 200% 100%;
    animation: 1.5s shine linear infinite;

    @keyframes shine {
      to {
        background-position-x: -200%;
      }
    }
  `}
`
