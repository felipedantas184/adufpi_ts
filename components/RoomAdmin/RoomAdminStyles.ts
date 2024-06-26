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
  gap: 16px;
`
export const Heading = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;

  @media print {
    display: none;
  }
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
  padding: 8px;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`
export const HeaderItem = styled.div`
  flex: 2;
  color: #F1F1F1;
  font-size: 12px;
  font-weight: 500;

  display: flex;
  justify-content: center;
  align-items: center;

  @media print {
    font-size: 8px;
  }
`
export const HeaderItemSmall = styled.div`
  flex: 1;
  color: #F1F1F1;
  font-size: 12px;
  font-weight: 500;

  display: flex;
  justify-content: center;
  align-items: center;

  @media print {
    font-size: 8px;
  }
`
export const HeaderItemSmallAction = styled.div`
  flex: 1;
  color: #F1F1F1;
  font-size: 12px;
  font-weight: 500;

  display: flex;
  justify-content: center;
  align-items: center;

  @media print {
    display: none;
  }
`
export const TableRow = styled.div`
  background-color: #F1F1F1;
  width: 100%;
  padding: 4px 8px;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`
export const DetailsRow = styled.div`
  background-color: #F1F1F1;
  width: 100%;
  padding: 0px 8px;
  border-bottom: 1px solid #13131A;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`
export const TableItem = styled.div`
  flex: 2;
  color: #13131A;
  font-size: 12px;

  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;

  @media print {
    font-size: 8px;
  }
`
export const TableItemSmall = styled.div`
  flex: 1;
  color: #13131A;
  font-size: 12px;

  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;

  @media print {
    font-size: 8px;
  }
`
export const TableItemSmallAction = styled.div`
  flex: 1;
  color: #13131A;
  font-size: 12px;

  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;

  @media print {
    display: none;
  }
`
export const DetailsItem = styled.div`
  flex: 1;
  color: #13131A;
  font-size: 12px;

  display: flex;
  justify-content: flex-start;
  align-items: center;

  @media print {
    font-size: 8px;
  }
`

export const Box = styled.div`
  width: 100%;
  color: #13131A;

  display: flex;
  flex-direction: row;
  gap: 16px;

  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`
export const Half = styled.div`
  background-color: #D4D4D4;
  border-radius: 20px;
  
  flex: 1;
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`
export const Group = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
`
export const BoxTitle = styled.h3`
  color: #13131A;
  font-size: 18px;
  font-weight: 600;
  text-transform: capitalize;
  
  @media screen and (max-width: 768px) {
    font-size: 14px;
  }
`
export const BoxSubtitle = styled.h3`
  color: #13131A;
  font-size: 14px;
  font-weight: 500;
  text-transform: capitalize;
  
  @media screen and (max-width: 768px) {
    font-size: 14px;
  }
`