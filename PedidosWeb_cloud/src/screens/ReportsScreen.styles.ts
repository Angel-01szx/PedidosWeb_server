import styled from 'styled-components';

const S = {
  Container: styled.div`
    padding: 32px;
    background-color: #f8fbf8;
    min-height: 100vh;
    max-width: 1200px;
    margin: 0 auto;
    font-family: 'Blinker', Arial, Helvetica, sans-serif;
  `,

  Button: styled.button`
    padding: 12px 24px;
    border-radius: 10px;
    background-color: #8cbf2f;
    color: white;
    font-size: 14px;
    font-weight: 600;
    border: none;
    cursor: pointer;
    margin-bottom: 16px;
    transition: background-color 0.3s ease, transform 0.1s ease;
    box-shadow: 0 3px 6px rgba(0,0,0,0.08);
    &:hover {
      background-color: #76a420;
      transform: translateY(-1px);
    }
  `,

  ButtonText: styled.span`
    font-size: 14px;
    font-weight: 600;
    font-family: 'Blinker', Arial, Helvetica, sans-serif;
  `,

  Input: styled.input`
    border: 1px solid #dcdcdc;
    border-radius: 8px;
    padding: 10px 14px;
    margin-bottom: 20px;
    font-size: 14px;
    background-color: white;
    width: 100%;
    box-shadow: inset 0 1px 2px rgba(0,0,0,0.04);
  `,

  Picker: styled.select`
    width: 100%;
    height: 44px;
    padding: 10px;
    border: 1px solid #ccc;
    background-color: #fff;
    border-radius: 8px;
    font-size: 14px;
    margin-bottom: 20px;
    transition: border-color 0.3s;
    font-family: 'Blinker', Arial, Helvetica, sans-serif;
    &:focus {
      border-color: #8cbf2f;
      outline: none;
    }
  `,

  TableHeader: styled.div`
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    padding: 14px 0;
    background-color: #e8f0e0;
    font-weight: bold;
    font-size: 13px;
    border-radius: 8px 8px 0 0;
    text-align: center;
    box-shadow: inset 0 -1px 0 #ccc;
  `,

  HeaderCell: styled.div`
    padding: 8px;
    border-right: 1px solid #ddd;
    &:last-child {
      border-right: none;
    }
  `,

  Row: styled.div`
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    align-items: center;
    padding: 12px 0;
    border-bottom: 1px solid #eee;
    font-size: 13px;
    background-color: #fff;
    transition: background-color 0.2s;
    &:hover {
      background-color: #f4f8f0;
    }
  `,

  Cell: styled.span`
    padding: 6px;
    text-align: center;
  `,

  ButtonsContainer: styled.div`
    display: flex;
    justify-content: center;
    gap: 12px;
  `,

  CloseButton: styled.button`
    background-color: #e74c3c;
    color: white;
    padding: 10px 16px;
    margin-top: 10px;
    border-radius: 8px;
    font-weight: 600;
    border: none;
    cursor: pointer;
    &:hover {
      background-color: #c0392b;
    }
  `,

  CalendarModal: styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0,0,0,0.4);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  `,

  CalendarBox: styled.div`
    background-color: white;
    padding: 24px;
    border-radius: 14px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.1);
  `,

  CustomDatePicker: styled.div`
    .react-datepicker {
      border: none;
    }

    .react-datepicker__header {
      background-color: #8cbf2f;
      color: white;
      border-top-left-radius: 14px;
      border-top-right-radius: 14px;
    }

    .react-datepicker__day--selected,
    .react-datepicker__day--keyboard-selected {
      background-color: #8cbf2f;
      color: white;
    }

    .react-datepicker__day--today {
      font-weight: bold;
      color: #2f7300;
    }
  `,

  AdditionalControls: styled.div`
    display: flex;
    gap: 12px;
    margin-top: 20px;
    flex-wrap: wrap;
  `,

  AdditionalButton: styled.button`
    flex: 1;
    background-color: #8cbf2f;
    color: white;
    padding: 10px;
    border-radius: 8px;
    font-weight: 600;
    border: none;
    cursor: pointer;
    &:hover {
      background-color: #76a420;
    }
  `,

  PickerAdditional: styled.select`
    flex: 1;
    height: 44px;
    background-color: #fff;
    border-radius: 8px;
    border: 1px solid #ccc;
    font-size: 14px;
    padding: 10px;
    &:focus {
      border-color: #8cbf2f;
      outline: none;
    }
  `,

  ModalOverlay: styled.div`
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(30, 30, 45, 0.35);
  z-index: 1001;
  display: flex; align-items: center; justify-content: center;
  backdrop-filter: blur(2px);
`,

  Modal: styled.div`
  background: #fff;
  border-radius: 22px;
  box-shadow: 0 10px 32px rgba(0,0,0,0.15);
  padding: 2.3rem 2rem 1.5rem 2rem;
  min-width: 320px;
  min-height: 150px;
  display: flex; flex-direction: column; align-items: center;
  animation: modalIn .25s cubic-bezier(.42,0,.58,1);
  @keyframes modalIn {
    from { opacity: 0; transform: scale(0.95);}
    to { opacity: 1; transform: scale(1);}
  }
`,

  ModalTitle: styled.h2`
  font-family: 'Blinker', Arial, sans-serif;
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: #22223b;
`,

  ModalMessage: styled.p`
  font-size: 1.06rem;
  margin-bottom: 2.1rem;
  text-align: center;
  color: #34344e;
`,

  ModalActions: styled.div`
  display: flex;
  gap: 1.1rem;
`,

  ModalButton: styled.button<{ color?: string }>`
  padding: 0.8rem 2.1rem;
  border-radius: 11px;
  border: none;
  font-size: 1.06rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.15s, color 0.15s;
  ${({ color }) =>
      color === "primary"
        ? `
        background: #1818e6;
        color: #fff;
        &:hover { background: #2222bb; }
      `
        : `
        background: #efefef;
        color: #22223b;
        &:hover { background: #e0e0e0; }
      `
    }
`,

};

export default S;
