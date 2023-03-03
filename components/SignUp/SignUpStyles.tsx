import styled from "styled-components";

export const Container = styled.section`
  background-color: #EB5757;
  min-height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;

  font-family: 'Poppins', sans-serif;
`
export const Wrapper = styled.div`
  background-color: #FFFFFF;
  border-radius: 20px;
  min-width: 55vw;

  padding: 24px;
  
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
`
export const Heading = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`
export const Title = styled.h1`
  color: #13131A;
  font-size: 16px;
  font-weight: 600;
  text-transform: capitalize;
`
export const Form = styled.form`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(4, 1fr);
  gap: 8px;
`
export const IWrap = styled.div`
  width: 250px;
  
  display: flex;
  flex-direction: column;
  gap: 4px;
`
export const Label = styled.label`
  color: #13131A;
  font-size: 14px;
  margin-left: 12px;
  margin-bottom: 4px;
`
export const Input = styled.input`
  background-color: #F1F1F1;
  color: #33333A;
  font-size: 14px;
  font-family: 'Poppins', sans-serif;

  padding: 8px 12px; 
  width: 100%;
  max-width: 300px;
  border: none;
  border-radius: 8px;
  outline: none;
`
export const BWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`
export const FButton = styled.button`
  background-color: #EB5757;
  color: #fff;
  font-weight: 500;
  font-size: 14px;
  text-transform: capitalize;

  height: 40px;
  width: 200px;
  border-radius: 8px;
  border: 0;

  transition: 0.5s;
  cursor: pointer;

  &:hover, &:focus {
    box-shadow: inset 200px 0 0 0 #13131A;
  }
`
export const FOption = styled.p`
  color: #22222A;
  font-size: 14px;
`