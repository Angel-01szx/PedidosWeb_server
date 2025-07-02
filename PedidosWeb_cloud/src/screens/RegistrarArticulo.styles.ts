import styled from 'styled-components';

const S = {
  Container: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 2rem;
    width: 100%;
    box-sizing: border-box;
    background-color: #f7f8fa;
    min-height: 100vh;
  `,

  Inner: styled.div`
    background-color: white;
    width: 100%;
    max-width: 720px;
    padding: 2rem;
    border-radius: 1.5rem;
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.1);
    box-sizing: border-box;
  `,

  Header: styled.div`
    text-align: center;
    margin-bottom: 1.5rem;
  `,

  Title: styled.h2`
    font-size: 2rem;
    color: #2c3e50;
    margin-bottom: 0.5rem;
    font-family: 'Blinker', Arial, Helvetica, sans-serif;
  `,

  DescriptionText: styled.p`
    font-size: 1rem;
    color: #7f8c8d;
    font-family: 'Blinker', Arial, Helvetica, sans-serif;
  `,

  Row: styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-bottom: 1rem;
    font-family: 'Blinker', Arial, Helvetica, sans-serif;

    @media (min-width: 600px) {
      flex-direction: row;
    }
  `,

  Input: styled.input`
    width: 100%;
    padding: 0.8rem 1rem;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 0.75rem;
    background: #f9f9f9;
    font-family: 'Blinker', Arial, Helvetica, sans-serif;
    outline: none;
    &:focus {
      border-color: #3498db;
    }
    margin-bottom: 1rem;
  `,

  InputCustomCode: styled.input`
    flex: 1;
    padding: 0.8rem 1rem;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 0.75rem;
    background: #ecf0f1;
    outline: none;
    font-family: 'Blinker', Arial, Helvetica, sans-serif;
  `,

  InputBarcode: styled.input`
    flex: 2;
    padding: 0.8rem 1rem;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 0.75rem;
    background: #f9f9f9;
    outline: none;
  `,

  PickerRow: styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    margin-bottom: 1.5rem;
    justify-content: space-between;
  `,

  Select: styled.select`
    flex: 1 1 100%;
    min-width: 100%;
    padding: 0.8rem 1rem;
    font-size: 1rem;
    border-radius: 0.75rem;
    border: 1px solid #ccc;
    background: #fff;
    outline: none;
    font-family: 'Blinker', Arial, Helvetica, sans-serif;

    @media (min-width: 600px) {
      flex: 1 1 calc(33.33% - 0.67rem);
      min-width: unset;
    }
  `,

  ButtonRow: styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 1.5rem;
  `,

  ButtonScan: styled.button`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.8rem 1.5rem;
    font-size: 1rem;
    background-color: #27ae60;
    color: white;
    border: none;
    border-radius: 0.75rem;
    cursor: pointer;
    transition: background 0.3s ease;
    &:hover {
      background-color: #219150;
    }
  `,

  ButtonSave: styled.button`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: 0.8rem;
    font-size: 1rem;
    background-color: #2980b9;
    color: white;
    border: none;
    border-radius: 0.75rem;
    cursor: pointer;
    transition: background 0.3s ease;
    &:hover {
      background-color: #2471a3;
    }
  `,

  CameraContainer: styled.div`
    width: 100%;
    max-width: 600px;
    margin: 0 auto;
  `,

  CloseButton: styled.button`
    margin-top: 1rem;
    padding: 0.6rem 1rem;
    background-color: #e74c3c;
    color: white;
    border: none;
    border-radius: 0.5rem;
    font-size: 1rem;
    cursor: pointer;
    &:hover {
      background-color: #c0392b;
    }
  `,
};

export default S;
