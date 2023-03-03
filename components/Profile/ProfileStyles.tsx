import styled from "styled-components"

export const Container = styled.section`
  background-color: #FFF;
  font-family: 'Poppins', sans-serif;
  padding: 24px 0;
  min-height: 86vh;
`
export const Wrapper = styled.div`
  max-width: 1080px;
  margin-left: auto;
  margin-right: auto;

  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 16px;
  gap: 24px;
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
export const Personal = styled.div`
  width: 100%;

  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 16px;
`
export const Name = styled.h1`
  color: #13131A;
  font-size: 24px;
  font-weight: 600;
`
export const Info = styled.div`
  width: 100%;

  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
`
export const Box = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  border-bottom: 1px solid #44444A;
`
export const Label = styled.p`
  color: #13131A;
  font-size: 14px;
  font-weight: 500;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`
export const Resume = styled.p`
  color: #44444A;
  font-size: 14px;
  font-weight: 400;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`