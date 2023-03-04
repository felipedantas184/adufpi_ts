import styled from "styled-components";

export const Container = styled.section`
  background-color: #FFF;
  font-family: 'Poppins', sans-serif;
  padding: 24px 0;
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
export const Heading = styled.div`
  width: 100%;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;
`
export const Title = styled.h1`
  color: #13131A;
  font-size: 32px;
  font-weight: 600;
  text-transform: capitalize;

  @media screen and (max-width: 768px) {
    font-size: 24px;
  }
`
export const Cost = styled.p`
  color: #44444A;
  font-size: 16px;
  font-weight: 500;

  @media screen and (max-width: 768px) {
    font-size: 14px;
  }
`
export const Info = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 3fr 2fr;
  gap: 16px;

  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(1, 1fr);
  }
`
export const ImgWrap = styled.div`
  position: relative;
  width: 100%;
  min-height: 475px;

  border-radius: 8px;
  overflow: hidden;
`
export const Boxes = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media screen and (max-width: 768px) {
    gap: 16px;
  }
`
export const BData = styled.div`
  padding: 16px;

  display: flex;
  flex-direction: column;
  gap: 16px;

  border-radius: 8px;
  background-color: #F6F6F6;
  box-shadow:  5px 5px 10px #F1F1F1,
              -5px -5px 10px #ffffff;
`
export const CTitle = styled.div`
  color: #13131A;
  font-size: 18px;
  font-weight: 600;
`
export const CBox = styled.div`
  display: flex;
  flex-direction: column;
`
export const CLabel = styled.div`
  color: #13131A;
  font-size: 14px;
  font-weight: 500;
`
export const CName = styled.div`
  color: #13131A;
  font-size: 14px;
  font-weight: 400;
`
export const HBox = styled.div`  
  display: grid;
  grid-template-columns: repeat(2, 1fr);
`
export const BResume = styled.div`
  padding: 16px;

  display: flex;
  flex-direction: column;
  gap: 16px;

  border-radius: 8px;
  background-color: #F6F6F6;
  box-shadow:  5px 5px 10px #F1F1F1,
              -5px -5px 10px #ffffff;
`
export const Button = styled.button`
  background-color: #EB5757;
  color: #fff;
  font-size: 14px;
  font-weight: 500;
  font-family: 'Poppins' !important;
  text-transform: capitalize;

  border: 0;
  padding: 8px 16px;
  border-radius: 8px;
  
  cursor: pointer;
  transition: 0.5s;
  -webkit-tap-highlight-color: transparent;

  &:hover, &:focus {
    box-shadow: inset 400px 0 0 0 #13131A;
  }
`