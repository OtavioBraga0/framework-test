import styled, { css } from 'styled-components'

export const Wrapper = styled.img`
  ${({ theme }) => css`
    object-fit: cover;
    border: 3px solid ${theme.colors.hex.white}!important;
  `}
`
