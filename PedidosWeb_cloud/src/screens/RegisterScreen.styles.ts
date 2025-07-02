// RegisterScreen.styles.ts
import styled from 'styled-components';

const S = {
  Container: styled.div`
    padding: 2rem;
    background: #f9f9f9;
    min-height: 100vh;
    font-family: 'Blinker', Arial, Helvetica, sans-serif;
  `,

  Title: styled.h2`
    font-size: 1.75rem;
    text-align: center;
    font-weight: 700;
    color: #2d2d2d;
    margin-bottom: 1.5rem;
  `,

  CenterText: styled.p`
    font-size: 0.9rem;
    text-align: center;
    color: #555;
    margin-bottom: 1rem;
  `,

  Row: styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    margin-bottom: 1rem;
  `,

  FlexColumn: styled.div`
    flex: 1;
    min-width: 200px;
  `,

  FixedColumn: styled.div`
    width: 120px;
  `,

  Subtitle: styled.label`
    display: block;
    font-size: 0.85rem;
    font-weight: 600;
    margin-bottom: 0.3rem;
    color: #333;
  `,

  Select: styled.select`
    height: 45px;
    width: 100%;
    padding: 0 0.75rem;
    background-color: #ffffff;
    border: 1px solid #ccc;
    border-radius: 8px;
    font-size: 0.9rem;
    transition: all 0.2s ease;
    font-family: 'Blinker', Arial, Helvetica, sans-serif;
    &:focus {
      outline: none;
      border-color: #8cbf2f;
      box-shadow: 0 0 0 2px rgba(140, 191, 47, 0.3);
    }
  `,

  Input: styled.input`
    height: 45px;
    width: 100%;
    padding: 0 0.75rem;
    background-color: #ffffff;
    border: 1px solid #ccc;
    border-radius: 8px;
    font-size: 0.9rem;
    color: #333;
    transition: border 0.2s;
    &:focus {
      outline: none;
      border-color: #8cbf2f;
    }
  `,

  InputObs: styled.textarea`
    width: 100%;
    height: 70px;
    padding: 0.75rem;
    font-size: 0.9rem;
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 8px;
    resize: none;
    margin: 1rem 0;
    transition: border 0.2s;
    &:focus {
      outline: none;
      border-color: #8cbf2f;
    }
  `,

  ButtonGroup: styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin: 1.5rem 0;
  justify-content: center;

  @media (min-width: 768px) {
    justify-content: flex-start;
  }
`,

  GreenButton: styled.button`
    background-color:rgb(140, 191, 47);
    color: #fff;
    border: none;
    border-radius: 8px;
    padding: 0.75rem 1.5rem;
    font-size: 0.95rem;
    font-weight: bold;
    margin: 0.5rem 0;
    cursor: pointer;
    transition: background 0.3s;
    &:hover {
      background-color: #7aad28;
    }
  `,

  ButtonText: styled.span`
    color: #fff;
    font-size: 0.95rem;
    font-weight: bold;
  `,

  ImporteText: styled.p`
    font-size: 1rem;
    font-weight: 600;
    margin-top: 1.5rem;
    text-align: center;
    color: #333;
  `,

  ProductItem: styled.div`
    padding: 1rem;
    margin-bottom: 0.75rem;
    border-radius: 8px;
    background-color: #ffffff;
    box-shadow: 0 1px 4px rgba(0,0,0,0.05);
  `,

  ProductName: styled.h3`
    font-size: 1.1rem;
    color: #222;
    margin-bottom: 0.3rem;
  `,

  ProductText: styled.p`
    font-size: 0.9rem;
    color: #666;
  `,
};

export default S;
