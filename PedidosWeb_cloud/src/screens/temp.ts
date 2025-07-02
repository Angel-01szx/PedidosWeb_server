import styled from 'styled-components';

const S = {
  ModalOverlay: styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  `,

  ModalContainer: styled.div`
    background: #fff;
    padding: 2rem;
    border-radius: 1rem;
    width: 90%;
    max-width: 500px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
    animation: fadeIn 0.3s ease-in-out;

    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(-10%);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `,

  Field: styled.div`
    margin-bottom: 1.2rem;

    label {
      font-weight: 600;
      margin-bottom: 0.4rem;
      display: block;
      color: #333;
    }
  `,

  Input: styled.input`
    width: 100%;
    padding: 0.6rem 0.8rem;
    border: 1px solid #ccc;
    border-radius: 0.5rem;
    font-size: 1rem;
    transition: border-color 0.2s;

    &:focus {
      outline: none;
      border-color: #007bff;
    }
  `,

  Row: styled.div`
    display: flex;
    gap: 0.5rem;
    align-items: center;
  `,

  Button: styled.button`
    padding: 0.6rem 1rem;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 0.5rem;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover {
      background-color: #0056b3;
    }
  `,

  DeleteButton: styled.button`
    padding: 0.6rem 1rem;
    background-color: #dc3545;
    color: white;
    border: none;
    border-radius: 0.5rem;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover {
      background-color: #b02a37;
    }
  `,

  CancelButton: styled.button`
    padding: 0.6rem 1rem;
    background-color: #6c757d;
    color: white;
    border: none;
    border-radius: 0.5rem;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover {
      background-color: #5a6268;
    }
  `,

  Actions: styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 0.75rem;
    margin-top: 2rem;
    flex-wrap: wrap;
  `,
};

export default S;
