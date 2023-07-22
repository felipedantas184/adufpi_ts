import styled from "styled-components"

export const Container = styled.section`
  background-color: #FFF;
  font-family: 'Poppins', sans-serif;
  padding: 24px 0 0 0;
`
export const Wrapper = styled.div`
  max-width: 1080px;
  margin-left: auto;
  margin-right: auto;

  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 16px;
`
export const Box = styled.div`
  width: 100%;
  background-color: #13131A;
  color: white;
  border-radius: 20px;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 16px;
`
export const Title = styled.h1`
  color: #F6F6F6;
  font-size: 18px;
  font-weight: 600;
  text-transform: capitalize;
  
  @media screen and (max-width: 768px) {
    font-size: 16px;
  }
`
export const Item = styled.li`
  color: #F0F0F0;
  font-size: 14px;
  font-weight: 600;

  @media screen and (max-width: 768px) {
    font-size: 12px;
  }
`
