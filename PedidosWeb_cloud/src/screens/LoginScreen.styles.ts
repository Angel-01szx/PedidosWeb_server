// LoginScreen.styles.ts
import styled, { keyframes } from 'styled-components';
import bgImage from '../assets/desktop.png';

const bgMove = keyframes`
  0% { background-position: 0% 50% }
  50% { background-position: 100% 50% }
  100% { background-position: 0% 50% }
`;

const S = {
  Background: styled.div`
    min-height: 100vh;
    min-width: 100vw;
    position: fixed;
    top: 0; left: 0;
    z-index: -1;
    overflow: hidden;
    background: url(${bgImage}) center/cover no-repeat;
  `,

  Container: styled.div`
    max-width: 440px;
    margin: 64px auto;
    padding: 38px 32px 30px 32px;
    background: rgba(122, 122, 122, 0.57); /* puedes ajustar opacidad si quieres más glassmorphism */
    border-radius: 22px;
    box-shadow: 0 8px 44px 0 rgba(40,60,60,0.18);
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    z-index: 1;
    backdrop-filter: blur(4px) saturate(120%);
  `,
  LogoContainer: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin-bottom: 14px;
    svg {
      width: 330px;
      max-width: 80vw;
      height: auto;
      display: block;
    }
  `,
  Title: styled.h2`
    font-size: 2.1rem;
    font-weight: 700;
    margin-bottom: 16px;
    color:rgb(255, 255, 255);
    text-align: center;
    letter-spacing: 1px;
    font-family: 'Blinker', 'Arial', sans-serif;
  `,
  Error: styled.div`
    color: #c02424;
    margin-bottom: 12px;
    width: 100%;
    text-align: center;
    font-weight: 500;
  `,
  PickerContainer: styled.div`
    width: 100%;
    margin-bottom: 14px;
  `,
  Picker: styled.select`
    width: 100%;
    padding: 10px 12px;
    border-radius: 8px;
    border: 1.5px solid #21D375;
    background: #f9f9f9;
    font-size: 1rem;
    margin-bottom: 8px;
    outline: none;
  `,
  Input: styled.input`
    width: 100%;
    padding: 10px 12px;
    margin-bottom: 14px;
    border-radius: 8px;
    border: 1.5px solid #bfead7;
    font-size: 1rem;
    background: #f9f9f9;
    outline: none;
    transition: border 0.2s;
    &:focus {
      border: 1.5px solid #21D375;
    }
  `,
  Button: styled.button`
    width: 100%;
    padding: 12px 0;
    background:rgb(21, 255, 0);
    color: rgb(109, 109, 109);
    font-weight: 600;
    border: none;
    border-radius: 8px;
    font-size: 1.1rem;
    cursor: pointer;
    margin-bottom: 12px;
    transition: background 0.2s;
    &:hover {
      background:rgb(42, 185, 23);
    }
  `,
  ExitButton: styled.button`
    width: 100%;
    padding: 10px 0;
    background: rgb(24, 24, 24);
    color:rgb(131, 131, 131);
    font-weight: 600;
    border: 1.5px solid #21D375;
    border-radius: 8px;
    font-size: 1rem;
    cursor: pointer;
    margin-top: 2px;
    transition: background 0.2s, color 0.2s;
    &:hover {
      background:rgb(255, 0, 0);
      color:rgb(255, 255, 255);
    }
  `,
};

export default S;
