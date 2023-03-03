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
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
`
export const Title = styled.h1`
  color: #13131A;
  font-size: 24px;
  font-weight: 600;
  text-transform: capitalize;
`
export const Subtitle = styled.h3`
  color: #44444A;
  font-size: 16px;
  font-weight: 500;
`
export const Cards = styled.ul`
  list-style: none;
  width: 100%;
  margin-top: 24px;

  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 24px;

  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(1, 1fr);
  }
`
export const Card = styled.li`
  background-color: #F6F6F6;
  border-radius: 20px;
  box-shadow: rgba(0, 0, 0, 0.15) 2.4px 2.4px 3.2px;
`
export const ImgWrap = styled.div`
  position: relative;
  width: 100%;
  height: 250px;

  border-radius: 20px 20px 0 0;
  overflow: hidden;
`
export const Text = styled.div`
  display: flex;
  flex-direction: column;
	padding: 16px;
  gap: 8px;
`
export const Details = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`
export const DText = styled.p`
  background: rgba(235, 87, 87, 0.1);
  color: #EB5757;
  font-size: 12px;
  font-weight: 600;
  padding: 4px 15px;
  border-radius: 4px;
  
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 4px
`
export const Info = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
`
export const CTitle = styled.p`
  color: #13131A;
  font-size: 16px;
  font-weight: 500;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`
export const Group = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`
export const CLabel = styled.p`
  color: #13131A;
  font-size: 14px;
  font-weight: 500;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`
export const CResume = styled.p`
  color: #44444A;
  font-size: 14px;
  font-weight: 400;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`
export const CFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 10px 16px;
  border-top: 1px solid #cccfd9;
`
export const FText = styled.p`
  color: #44444A;
  font-size: 14px;
  font-weight: 500;
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
  
  &:hover, &:focus {
    box-shadow: inset 200px 0 0 0 #13131A;
  }
`