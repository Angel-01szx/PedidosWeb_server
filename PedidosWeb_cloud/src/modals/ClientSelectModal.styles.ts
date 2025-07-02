import styled from 'styled-components';

const S = {
  Overlay: styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  `,

  ModalContent: styled.div`
    background-color: #fff;
    width: 90%;
    max-width: 600px;
    max-height: 90vh;
    border-radius: 16px;
    padding: 24px;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
    position: relative;
  `,

  Title: styled.h2`
    font-size: 24px;
    font-weight: 600;
    margin-bottom: 16px;
    color: #333;
    text-align: center;
  `,

  Input: styled.input`
    padding: 10px 14px;
    border-radius: 8px;
    border: 1px solid #ccc;
    font-size: 14px;
    margin-bottom: 16px;
    width: 100%;
    box-sizing: border-box;
  `,

  TableContainer: styled.div`
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    border: 1px solid #ddd;
    border-radius: 8px;
    background-color: #f9f9f9;
    max-height: 300px;
    margin-bottom: 20px;
  `,

  TableHeader: styled.div`
    display: flex;
    background-color: #8cbf2f;
    color: white;
    font-weight: bold;
    padding: 10px;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
  `,

  TableBody: styled.div`
    display: flex;
    flex-direction: column;
  `,

  TableRow: styled.div`
    display: flex;
    padding: 10px;
    border-bottom: 1px solid #eee;
    cursor: pointer;
    transition: background-color 0.2s ease;

    &.selected {
      background-color: #d8eac0;
    }

    &:hover {
      background-color: #f0f0f0;
    }
  `,

  HeaderID: styled.div`
    width: 30%;
    font-size: 14px;
  `,

  HeaderRazon: styled.div`
    width: 50%;
    font-size: 14px;
  `,

  HeaderCodigo: styled.div`
    width: 20%;
    font-size: 14px;
    text-align: right;
  `,

  CellID: styled.div`
    width: 30%;
    font-size: 14px;
  `,

  CellRazon: styled.div`
    width: 50%;
    font-size: 14px;
  `,

  CellCodigo: styled.div`
    width: 20%;
    font-size: 14px;
    text-align: right;
  `,

  Button: styled.button`
    background-color: #ff4c4c;
    color: white;
    border: none;
    padding: 12px;
    border-radius: 8px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    width: 100%;
    margin-top: 12px;
    transition: 0.3s;

    &:hover {
      background-color: #e04343;
    }
  `,
};

export default S;