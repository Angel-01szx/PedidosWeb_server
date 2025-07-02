import styled from 'styled-components';

const S = {
  ModalOverlay: styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
  `,

  ModalContainer: styled.div`
    background-color: #fff;
    width: 95%;
    max-width: 700px;
    border-radius: 16px;
    padding: 24px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.25);
    display: flex;
    flex-direction: column;
    gap: 16px;
  `,

  HeaderRow: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 12px;
  `,

  Title: styled.h2`
    font-size: 1.5rem;
    font-weight: bold;
    color: #333;
  `,

  Field: styled.div`
    display: flex;
    flex-direction: column;
    gap: 6px;
  `,

  Label: styled.label`
    font-size: 0.95rem;
    font-weight: 500;
    color: #444;
  `,

  Input: styled.input`
    padding: 10px;
    border-radius: 8px;
    border: 1px solid #ccc;
    font-size: 1rem;
    width: 100%;
  `,

  Row: styled.div`
    display: flex;
    gap: 12px;
    align-items: center;
  `,

  Button: styled.button`
    background-color:rgb(140, 191, 47);
    color: white;
    border: none;
    padding: 10px 16px;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.3s ease;
    
    &:hover {
      background-color:rgb(7, 233, 45);
    }
  `,

  DeleteButton: styled.button`
    background-color: #d32f2f;
    color: white;
    border: none;
    padding: 10px 16px;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    
    &:hover {
      background-color: #b71c1c;
    }
  `,

  CancelButton: styled.button`
    background-color: #9e9e9e;
    color: white;
    border: none;
    padding: 10px 16px;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    
    &:hover {
      background-color:rgb(255, 0, 0);
      color:rgb(0,0,0);
    }
  `,

  Actions: styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 12px;
    margin-top: 16px;
    flex-wrap: wrap;
  `,

  InfoText: styled.span`
    font-size: 0.9rem;
    color: #555;
  `,

  DistritoLabel: styled.span`
    font-size: 0.9rem;
    color: #00796b;
    font-style: italic;
    margin-top: 4px;
    display: block;
  `,
};

export default S;
