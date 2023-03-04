import styled from "styled-components";

export const Container = styled.section`
  background-color: #FFF;
  font-family: 'Poppins', sans-serif;
  padding: 24px 0;
  min-height: 81vh;
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
export const TableWrapper = styled.div`
  width: 100%;
  overflow-x: auto;

  @media screen and (max-width: 768px) {
    padding: 8px;
  }
`
export const Table = styled.div`
  width: 100%;
  border-radius: 8px;
  overflow: hidden;

  display: flex;
  flex-direction: column;
  margin-top: 32px;
`
export const TableHeader = styled.div`
  background-color: #00c2cb;
  width: 100%;
  padding: 16px;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`
export const HeaderItem = styled.div`
  flex: 2;
  color: #F1F1F1;
  font-size: 14px;
  font-weight: 500;

  display: flex;
  justify-content: center;
  align-items: center;
`
export const HeaderItemSmall = styled.div`
  flex: 1;
  color: #F1F1F1;
  font-size: 14px;
  font-weight: 500;

  display: flex;
  justify-content: center;
  align-items: center;
`
export const TableRow = styled.div`
  background-color: #F1F1F1;
  width: 100%;
  padding: 16px 8px;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`
export const TableItem = styled.div`
  flex: 2;
  color: #13131A;
  font-size: 14px;

  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`
export const TableItemSmall = styled.div`
  flex: 1;
  color: #13131A;
  font-size: 14px;

  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`