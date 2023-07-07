import Link from "next/link";
import styled from "styled-components";

export const Container = styled.nav`
  background-color: #13131A;
  font-family: 'Poppins', sans-serif;
  
  @media print {
    display: none;
  }
`
export const Wrapper = styled.div`
  max-width: 1080px;
  margin: 0 auto;
  padding: 24px;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    gap: 16px;
  }
`
export const Logo = styled(Link)`
  position: relative;
  width: 100px;
  height: 32px;
  text-decoration: none;
  cursor: pointer;

  -webkit-tap-highlight-color: rgba(0,0,0,0);
  -webkit-tap-highlight-color: transparent;
`
export const Rights = styled.p`
  color: #F1F1F1;
  font-size: 14px;
`
export const Social = styled.ul`
  list-style: none;

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
`
export const SIcon = styled.li`
  color: #F1F1F1;
  font-size: 24px;
  cursor: pointer;
  
  &:hover {
    color: #EB5757;
  }
  &::after {
    display:block;
    content: '';
    border-bottom: solid 2px #EB5757;  
    transform: scaleX(0);  
    transition: transform 250ms ease-in-out;
  }
  &:hover::after {
    transform: scaleX(1);
  }
`
export const ELink = styled.a`
  
`