import styled from 'styled-components';

const S = {
  ModalOverlay: styled.div`
    position: fixed;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 9999;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1rem;
  `,

  ModalContainer: styled.div`
    background-color: #ffffff;
    width: 100%;
    max-width: 900px;
    max-height: 90vh;
    border-radius: 16px;
    padding: 24px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);
    overflow: hidden;
    display: flex;
    flex-direction: column;
    gap: 16px;

    @media (max-width: 600px) {
      padding: 16px;
      border-radius: 12px;
    }
  `,

  Header: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
  `,

  Title: styled.h2`
    font-size: 1.6rem;
    color: #333;
    margin: 0;
  `,

  CloseButton: styled.button`
    background: none;
    border: none;
    font-size: 1.4rem;
    font-weight: bold;
    cursor: pointer;
    color: #888;

    &:hover {
      color: #d32f2f;
    }
  `,

  Input: styled.input`
    padding: 12px;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 12px;
    width: 100%;
    box-sizing: border-box;
  `,

  TableWrapper: styled.div`
    overflow-y: auto;
    max-height: 50vh;
    border: 1px solid #eee;
    border-radius: 8px;
  `,

  Table: styled.table`
    width: 100%;
    border-collapse: collapse;
    font-size: 0.95rem;

    thead {
      background-color: #f5f5f5;
      position: sticky;
      top: 0;
      z-index: 1;
    }

    th, td {
      padding: 12px;
      text-align: left;
      border-bottom: 1px solid #e0e0e0;
      word-break: break-word;
    }

    tr {
      cursor: pointer;
      transition: background-color 0.2s;
    }

    tr:hover {
      background-color: #f0f8ff;
    }
  `
};

export default S;
