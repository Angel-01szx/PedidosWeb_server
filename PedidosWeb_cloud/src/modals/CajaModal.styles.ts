import styled from "styled-components";

const S = {
  ModalBackground: styled.div`
    position: fixed;
    top: 0; left: 0; right: 0; bottom: 0;
    background: rgba(40,60,60,0.19);
    backdrop-filter: blur(4px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1500;
  `,
  ModalContainer: styled.div`
    background: #fff;
    border-radius: 1.5rem;
    box-shadow: 0 8px 32px 0 rgba(45,60,60,0.13), 0 2px 8px 0 rgba(35, 85, 120, 0.07);
    min-width: 370px;
    max-width: 520px;
    width: 100%;
    padding: 2.1rem 1.8rem 1.3rem 1.8rem;
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
    font-family: 'Blinker', Arial, Helvetica, sans-serif;
    animation: showIn 0.25s cubic-bezier(.42,0,.58,1);
    @keyframes showIn {
      from { opacity: 0; transform: scale(0.96);}
      to { opacity: 1; transform: scale(1);}
    }
  `,
  ModalTitle: styled.h2`
    font-size: 1.35rem;
    font-weight: 800;
    color: #167a20;
    letter-spacing: -1px;
    margin-bottom: 0.2rem;
    text-align: center;
  `,
  TextRow: styled.div`
    color: #273d26;
    font-size: 1.07rem;
    margin-bottom: 0.13rem;
    display: flex;
    gap: 0.5rem;
    align-items: center;
    word-break: break-word;
  `,
  PagoContainer: styled.div`
    display: flex;
    align-items: center;
    gap: 0.8rem;
    margin-bottom: 0.2rem;
  `,
  Picker: styled.select`
    background: #f7fdf7;
    border: 1.5px solid #beeec7;
    border-radius: 0.85rem;
    padding: 0.67rem 1rem;
    font-size: 1rem;
    font-weight: 600;
    color: #218a3c;
    outline: none;
    min-width: 130px;
    transition: border 0.18s;
    &:focus { border: 1.7px solid #6cdd69;}
  `,
  Input: styled.input`
    background: #f7fdf7;
    border: 1.5px solid #beeec7;
    border-radius: 0.85rem;
    padding: 0.67rem 1rem;
    font-size: 1rem;
    font-weight: 600;
    color: #333;
    width: 110px;
    outline: none;
    transition: border 0.18s;
    &:focus { border: 1.7px solid #6cdd69;}
  `,
  Button: styled.button`
    margin-top: 0.2rem;
    background: linear-gradient(90deg, rgb(11,223,4) 0%, rgb(57,124,43) 100%);
    color: #fff;
    border: none;
    border-radius: 0.95rem;
    padding: 0.83rem 1.6rem;
    font-size: 1.12rem;
    font-weight: 700;
    cursor: pointer;
    transition: background 0.13s, transform 0.12s;
    box-shadow: 0 2px 10px 0 rgba(32, 148, 68, 0.08);
    letter-spacing: -.5px;
    &:hover {
      background: linear-gradient(90deg, rgb(6, 191, 8) 0%, rgb(52,100,41) 100%);
      transform: scale(1.035);
    }
  `,
  ButtonSmall: styled.button`
    background: linear-gradient(90deg, #e2e7e2 0%, #e9f0e7 100%);
    color: #278a43;
    border: none;
    border-radius: 0.82rem;
    padding: 0.41rem 1.09rem;
    font-weight: 700;
    font-size: 1rem;
    cursor: pointer;
    margin-left: 0.5rem;
    box-shadow: 0 1px 5px 0 rgba(40, 180, 105, 0.09);
    transition: background 0.16s, color 0.14s;
    &:hover {
      background: linear-gradient(90deg, #cbe4d2 0%, #b2d7bc 100%);
      color: #174d19;
    }
  `,
  ButtonCancelar: styled.button`
    background: #f6f8fa;
    color: #b33e34;
    border: 1.3px solid #d5d5d5;
    border-radius: 0.92rem;
    padding: 0.81rem 1.38rem;
    font-size: 1.08rem;
    font-weight: 700;
    margin-top: 0.6rem;
    cursor: pointer;
    transition: background 0.18s, color 0.13s;
    box-shadow: 0 1px 6px 0 rgba(60,60,80,0.06);
    &:hover {
      background: #ececec;
      color: #921e1e;
    }
  `,
  PagoItem: styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #eaf9e5;
    border-radius: 0.7rem;
    padding: 0.45rem 1rem;
    margin: 0.13rem 0;
  `,
  PagoItemText: styled.span`
    color: #217634;
    font-weight: 600;
    font-size: 1.03rem;
  `,
  ButtonText: styled.span`
    font-weight: 700;
    font-size: 1rem;
    letter-spacing: -.4px;
  `,
  ErrorContainer: styled.div`
    margin-top: 0.12rem;
    background: #fff2ee;
    border-radius: 0.7rem;
    padding: 0.5rem 0.9rem;
    box-shadow: 0 1px 5px 0 rgba(242,46,105,0.05);
  `,
  ErrorText: styled.div`
    color: #d22;
    font-weight: 600;
    font-size: 1rem;
    margin-bottom: 2px;
  `,
  DifRow: styled.div`
    margin-top: 0.1rem;
    font-size: 1.11rem;
    font-weight: 700;
    color: #217634;
    text-align: right;
    padding-right: 0.18rem;
  `,
};

export default S;
