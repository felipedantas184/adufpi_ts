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
  border-radius: 20px;
  padding: 32px;
  
  display: flex;
  flex-direction: row;
`
export const LBox = styled.div`
  flex: 5;
  background-color: #FFFFFF;
  border-radius: 20px 0 0 20px;

  padding: 48px;
  
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
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`
export const IWrap = styled.div`
  width: 300px;
  
  display: flex;
  flex-direction: column;
  gap: 4px;
`
export const Label = styled.label`
  color: #13131A;
  font-size: 14px;
  margin-left: 12px;
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
  font-family: 'Poppins', sans-serif;

  height: 40px;
  width: 200px;
  border-radius: 8px;
  border: 0;

  transition: 0.5s;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;

  &:hover, &:focus {
    box-shadow: inset 200px 0 0 0 #13131A;
  }
`
export const FOption = styled.p`
  color: #22222A;
  font-size: 14px;
`
export const RBox = styled.div`
  flex: 3;
  background-color: #4F4F4F;
  padding: 16px;
  border-radius: 0 20px 20px 0;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;

  @media screen and (max-width: 720px) {
    display: none;
    border-radius: 20px 20px 0 0; 
  }
`
export const RTitle = styled.h3`
  color: #F1F1F1;
  font-size: 18px;
  font-weight: 600;
  text-transform: capitalize;

  max-width: 300px;
  margin-bottom: 16px;
`
export const RSubtitle = styled.h5`
  color: #F1F1F1;
  font-size: 14px;
  font-weight: 400;

  max-width: 350px;
`