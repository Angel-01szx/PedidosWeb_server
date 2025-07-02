import styled from 'styled-components';

const S = {
  Container: styled.div`
    background-color: #f5f8f4;
    display: flex;
    flex-direction: column;
    flex: 1;
    padding: 20px;
    min-height: 100vh;
    font-family: 'Blinker', Arial, Helvetica, sans-serif;
  `,

  ScreenTitle: styled.h1`
    font-size: 28px;
    margin-bottom: 24px;
    font-weight: 700;
    text-align: center;
    color: #333;
  `,

  Input: styled.input`
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 12px;
    margin-bottom: 20px;
    height: 45px;
    font-size: 14px;
    background-color: #fff;
    width: 100%;
    box-sizing: border-box;
    'Blinker', Arial, Helvetica, sans-serif;
  `,

  TableContainer: styled.div`
    max-height: 400px;
    border: 1px solid #ddd;
    margin-bottom: 24px;
    background-color: #eaf4dc;
    border-radius: 8px;
    overflow-y: auto;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
    'Blinker', Arial, Helvetica, sans-serif;
  `,

  TableRow: styled.div`
    display: flex;
    justify-content: flex-start;
    padding: 10px 16px;
    border-bottom: 1px solid #ccc;
    cursor: pointer;
    transition: background-color 0.2s ease;
    &:hover {
      background-color: #d3e8b6;
    }
  `,

  SelectedRow: styled.div`
    display: flex;
    justify-content: flex-start;
    padding: 10px 16px;
    border-bottom: 1px solid #ccc;
    background-color: rgba(128, 128, 128, 0.5);
  `,

  IdColumn: styled.div`
    width: 60px;
    text-align: left;
    font-size: 12px;
    padding: 5px 0;
    color: #333;
  `,

  DescripcionColumn: styled.div`
    flex: 1;
    text-align: left;
    font-size: 14px;
    padding: 5px 0;
    color: #2c3e50;
    font-weight: 600;
  `,

  CodBarra: styled.div`
    width: 120px;
    text-align: right;
    font-size: 12px;
    padding: 5px 0;
    color: #555;
  `,

  SelectedDescription: styled.p`
    margin-top: 12px;
    font-size: 14px;
    font-weight: 600;
    color: #444;
    background-color: #f0f9ec;
    padding: 10px;
    border-radius: 6px;
  `,

  ButtonSave: styled.button`
    padding: 12px;
    border-radius: 8px;
    background-color: #6bbf3c;
    margin-top: 12px;
    width: 100%;
    border: none;
    cursor: pointer;
    color: white;
    font-weight: bold;
    font-size: 14px;
    transition: 0.2s;
    font-family: 'Blinker', Arial, Helvetica, sans-serif;
    &:hover {
      background-color: #58a72d;
    }
  `,

  ButtonScan: styled.button`
    padding: 12px;
    border-radius: 8px;
    background-color: #6bbf3c;
    width: 100%;
    border: none;
    cursor: pointer;
    color: white;
    font-weight: bold;
    font-size: 14px;
    transition: 0.2s;
    font-family: 'Blinker', Arial, Helvetica, sans-serif;
    &:hover {
      background-color: #58a72d;
    }
  `,

  ButtonText: styled.span`
    font-size: 14px;
    font-weight: bold;
    text-align: center;
    color: white;
  `,

  CloseButton: styled.button`
    position: absolute;
    top: 40px;
    right: 20px;
    background-color: #e53935;
    padding: 10px;
    border-radius: 8px;
    border: none;
    color: white;
    font-size: 14px;
    cursor: pointer;
    font-weight: bold;
    &:hover {
      background-color: #d32f2f;
    }
  `,

  CameraContainer: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: black;
    z-index: 999;
  `,

  Camera: styled.div`
    flex: 1;
    width: 100%;
    height: 100%;
  `,

  ButtonRow: styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 12px 0;
    gap: 10px;
  `,

  UpdateButton: styled.button`
    background-color: #f57c00;
    padding: 10px 14px;
    border-radius: 8px;
    border: none;
    color: white;
    font-weight: bold;
    font-size: 16px;
    cursor: pointer;
    transition: 0.2s;
    &:hover {
      background-color: #ef6c00;
    }
  `,
};

export default S;
