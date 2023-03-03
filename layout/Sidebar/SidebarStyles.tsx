import styled from "styled-components";

export const Container = styled.nav`
  background: #F1F1F1;
  font-family: 'Poppins';

  top: 0;
  right: 0;
  position: fixed;
  z-index: 999;
  width: 100%;
  height: 100%;

  transition: 0.7s ease-in-out;
  opacity: ${({ isOpen }) => (isOpen ? '100%' : '0')};
  right: ${({ isOpen }) => (isOpen ? '0' : '100%')};
`
export const Wrapper = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
export const Close = styled.div`
  
`
export const Logo = styled.div`
  
`
export const Menu = styled.ul`
  list-style: none;
  text-align: center;

  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(6, 80px);

  @media  screen and (max-width: 480px) {
    grid-template-rows: repeat(6, 60px);
  }
`
export const Item = styled.li`
  
`