import styled from 'styled-components';

const S = {
  Overlay: styled.div`
    position: fixed;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.6);
    z-index: 1000;
    display: flex;
    justify-content: center;
    align-items: center;
  `,

  ModalContent: styled.div`
    background-color: #f4f9ee;
    border-radius: 20px;
    padding: 25px;
    width: 95%;
    max-width: 600px;
    max-height: 90vh;
    overflow-y: auto;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    position: relative;
    animation: fadeIn 0.3s ease-in-out;

    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: scale(0.95);
      }
      to {
        opacity: 1;
        transform: scale(1);
      }
    }

    @media (max-width: 480px) {
      padding: 20px;
    }
  `,

  Title: styled.h2`
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 20px;
    color: #333;
    text-align: center;
  `,

  Input: styled.input`
    width: 100%;
    padding: 12px;
    margin-bottom: 16px;
    font-size: 14px;
    border: 1px solid #ccc;
    border-radius: 8px;
    background-color: white;
    transition: border 0.2s ease;

    &:focus {
      outline: none;
      border-color: #8cbf2f;
    }
  `,

  Row: styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 16px;
    flex-wrap: wrap;
  `,

  TableContainer: styled.div`
    max-height: 250px;
    overflow-y: auto;
    background-color: #fefefe;
    border-radius: 12px;
    border: 1px solid #ddd;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    margin-bottom: 24px;
  `,

  TableRow: styled.div`
    display: flex;
    align-items: center;
    padding: 12px 16px;
    border-bottom: 1px solid #eee;
    cursor: pointer;
    transition: background-color 0.2s ease;

    &:hover {
      background-color: #e8f5e9;
    }

    &.selected {
      background-color: #c8e6c9;
      font-weight: 600;
    }
  `,

  IdColumn: styled.div`
    width: 25%;
    font-size: 13px;
    font-weight: 600;
    color: #333;

    @media (max-width: 480px) {
      font-size: 12px;
    }
  `,

  DescripcionColumn: styled.div`
    flex: 1;
    font-size: 13px;
    font-weight: 500;
    color: #2c3e50;
    padding: 0 8px;

    @media (max-width: 480px) {
      font-size: 12px;
    }
  `,

  PVentaColumn: styled.div`
    width: 25%;
    font-size: 13px;
    font-weight: bold;
    color: #009688;
    text-align: right;

    @media (max-width: 480px) {
      font-size: 12px;
    }
  `,

  SelectedDescription: styled.p`
    font-size: 14px;
    font-weight: bold;
    margin-bottom: 8px;
    color: #333;
  `,

  Button: styled.button`
    width: 100%;
    padding: 12px;
    border: none;
    border-radius: 8px;
    font-weight: bold;
    background-color: #8cbf2f;
    color: black;
    margin-bottom: 12px;
    font-size: 14px;
    cursor: pointer;
    transition: background 0.2s ease;

    &:hover {
      background-color: #7aab29;
    }
  `,

  IconButton: styled.button`
    background-color: #c96614;
    padding: 10px;
    border-radius: 8px;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    &:hover {
      opacity: 0.9;
    }
  `,

  CloseButton: styled.button`
    position: absolute;
    top: 16px;
    right: 16px;
    padding: 8px 12px;
    border: none;
    background-color: crimson;
    color: white;
    font-weight: bold;
    border-radius: 8px;
    cursor: pointer;
    z-index: 10;

    &:hover {
      opacity: 0.9;
    }
  `,

  CameraContainer: styled.div`
    position: fixed;
    inset: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: black;
    z-index: 1100;
  `,

  Camera: styled.video`
    width: 100%;
    height: 100%;
  `,
};

export default S;
