import styled from 'styled-components';

const S = {
  ModalContainer: styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1000;
  `,

  ModalContent: styled.div`
    width: 80%;
    background-color: #fff;
    border-radius: 10px;
    padding: 20px;
    text-align: center;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.3);
  `,

  Title: styled.h2`
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 10px;
    color: #333;
  `,

  Nombre: styled.p`
    font-size: 18px;
    color: #555;
    text-align: center;
    margin-bottom: 20px;
  `,

  CloseButton: styled.button`
    background-color: #007bff;
    padding: 10px 20px;
    border-radius: 5px;
    border: none;
    color: #fff;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
      background-color: #0069d9;
    }
  `,
};

export default S;
