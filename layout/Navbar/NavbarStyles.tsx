import Link from "next/link";
import styled from "styled-components";

export const Container = styled.nav`
  background-color: #F1F1F1;
  font-family: 'Poppins', sans-serif;
`
export const Wrapper = styled.div`
  max-width: 1080px;
  height: 60px;
	margin-left: auto;
	margin-right: auto;
  padding: 0 24px; //NECESSARY ?

	display: flex;
	justify-content: space-between;
	align-items: center;
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
export const Menu = styled.ul`
	list-style: none;

  display: flex;
	align-items: center;

  @media screen and (max-width: 768px) {
    display: none;
  }
`
export const IWrap = styled.li`
  transition: all 0.2s ease-in-out;
  -webkit-tap-highlight-color: rgba(0,0,0,0);
  -webkit-tap-highlight-color: transparent;

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
export const Item = styled(Link)`
  height: 60px;
  padding: 0 1rem;
  font-size: 14px;

  display: flex;
  flex-direction: row;
  align-items: center;	
  gap: 8px;
  
  cursor: pointer;
	transition: all 0.2s ease-in-out;
`
export const Logout = styled.button`
  border: none;
  height: 60px;
  padding: 0 1rem;
  font-size: 14px;
  font-family: 'Poppins', sans-serif;

  display: flex;
  flex-direction: row;
  align-items: center;	
  gap: 8px;
  
  cursor: pointer;
	transition: all 0.2s ease-in-out;
`
export const Mobile = styled.div`
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  display: none;

  @media screen and (max-width: 768px) {
    display: block;
    font-size: 1.8rem;
    cursor: pointer;
    color: #fff;
    width: 50px;
    height: 1.8rem;
		display: flex;
		justify-content: center;
		align-items: center;
  }
`