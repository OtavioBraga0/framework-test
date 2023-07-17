import styled, { css } from 'styled-components'

export const PulseWrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    gap: 10px;
    align-items: center;
    justify-content: center;

    & > span {
      display: inline-block;
      width: 10px;
      height: 10px;
      border-radius: 100%;
      background: ${theme.colors.hex.white};
      animation: pulse 1.2s cubic-bezier(0, 0.5, 0.5, 1) infinite;

      &:nth-child(1) {
        animation-delay: -0.24s;
      }
      &:nth-child(2) {
        animation-delay: -0.12s;
      }
      &:nth-child(3) {
        animation-delay: 0;
      }
    }

    @keyframes pulse {
      0% {
        transform: scale(1);
      }
      50%,
      100% {
        transform: scale(1.5);
      }
    }
  `}
`

export const FullScreenWrapper = styled.div`
  width: 100%;
  height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;

  & > img {
    animation: spinnig 3s linear infinite;
    width: 70px;
    height: 77px;
  }

  @keyframes spinnig {
    0% {
      transform: rotate(0deg);
    }
    50% {
      transform: rotate(180deg);
    }
    100% {
      transform: rotate(359deg);
    }
  }
`
