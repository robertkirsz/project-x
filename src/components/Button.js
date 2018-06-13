import styled from 'styled-components'

export default styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: none;
  font-family: inherit;
  width: 100%;
  height: 52px;
  background: #cc0915;
  border: none;
  outline: none;
  border-radius: 100px;
  font-size: 18px;
  color: white;
  letter-spacing: 0;
  text-align: center;
  cursor: pointer;
  transition: 0.3s;

  &:disabled {
    opacity: 0.4;
    pointer-events: none;
  }
`
