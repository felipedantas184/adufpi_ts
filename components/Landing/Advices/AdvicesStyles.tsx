import styled from "styled-components"

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
  gap: 32px;
`
export const Heading = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  align-self: flex-start;
`
export const Title = styled.h1`
  color: #13131A;
  font-size: 24px;
  font-weight: 600;
  text-transform: capitalize;
`
export const RulesMenu = styled.ul`
  list-style: none;
  width: 100%;

  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
`
export const Rule = styled.li`
  color: #44444A;
  font-size: 16px;
  font-weight: 500;
`