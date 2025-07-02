import styled from 'styled-components';

interface ButtonProps {
  typeColor: 'add' | 'cancel';
}

const S = {
  ModalContainer: styled.div`
    position: fixed;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  `,

  ModalContent: styled.div`
    background: white;
    padding: 20px;
    border-radius: 10px;
    width: 90%;
    max-height: 90vh;
    overflow-y: auto;
  `,

  Title: styled.h2`
    text-align: center;
    margin-bottom: 10px;
  `,

  FiltroField: styled.input`
    width: 100%;
    padding: 10px;
    font-size: 12px;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-bottom: 10px;
  `,

  InputContainer: styled.div`
    display: flex;
    gap: 10px;
    margin-bottom: 10px;
  `,

  InputField: styled.input`
    flex: 1;
    padding: 10px;
    font-size: 12px;
    border: 1px solid #ccc;
    border-radius: 5px;
  `,

  ListContainer: styled.div`
    max-height: 250px;
    overflow-y: auto;
    margin-bottom: 10px;
  `,

  ListContent: styled.div`
    display: flex;
    flex-direction: column;
  `,

  TableRow: styled.div`
    display: flex;
    padding: 10px;
    border-bottom: 1px solid #ccc;
    cursor: pointer;

    &:hover {
      background-color: #f5f5f5;
    }
  `,

  CodeCell: styled.div`
    width: 30%;
    font-weight: bold;
    font-size: 12px;
    margin-right: 10px;
  `,

  DescriptionCell: styled.div`
    width: 70%;
    font-size: 12px;
  `,

  SelectedProductContainer: styled.div`
    padding: 10px;
    background-color: #f9f9f9;
    border-radius: 5px;
    margin-bottom: 10px;
  `,

  SelectedProductText: styled.p`
    font-size: 12px;
    margin: 0;
  `,

  Bold: styled.span`
    font-weight: bold;
  `,

  ButtonContainer: styled.div`
    display: flex;
    gap: 10px;
    justify-content: space-between;
  `,

  Button: styled.button<ButtonProps>`
    flex: 1;
    padding: 10px;
    border-radius: 5px;
    color: white;
    font-weight: bold;
    cursor: pointer;
    border: none;

    background-color: ${({ typeColor }) =>
      typeColor === 'add' ? '#4CAF50' : '#f44336'};
  `,
};

export default S;
