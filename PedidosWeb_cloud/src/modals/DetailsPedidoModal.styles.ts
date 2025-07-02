import styled from "styled-components";

const S = {
  ModalContainer: styled.div`
    position: fixed;
    top: 0; left: 0; right: 0; bottom: 0;
    background: rgba(40,60,60,0.16);
    backdrop-filter: blur(3px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1300;
  `,
  ModalContent: styled.div`
    background: #fff;
    border-radius: 1.5rem;
    box-shadow: 0 8px 32px 0 rgba(45,60,60,0.13), 0 2px 8px 0 rgba(35, 85, 120, 0.07);
    min-width: 410px;
    max-width: 820px;
    min-height: 560px;
    max-height: 90vh;
    width: 97vw;
    padding: 2.2rem 2rem 1.6rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
    font-family: 'Blinker', Arial, Helvetica, sans-serif;
    animation: showIn 0.25s cubic-bezier(.42,0,.58,1);
    overflow: hidden;
    @keyframes showIn {
      from { opacity: 0; transform: scale(0.96);}
      to { opacity: 1; transform: scale(1);}
    }
    @media (max-width: 700px) {
      min-width: 90vw;
      padding: 1.2rem 0.4rem;
    }
  `,
  ModalTitle: styled.h2`
    font-size: 1.6rem;
    font-weight: 800;
    color: #167a20;
    letter-spacing: -1px;
    margin-bottom: 0.1rem;
    text-align: center;
  `,
  ClientInfo: styled.div`
    background: rgba(210,235,250,0.15);
    border-radius: 1.1rem;
    padding: 0.7rem 1.2rem 0.3rem 1.2rem;
    font-size: 1.07rem;
    margin-bottom: 0.5rem;
    display: flex;
    flex-wrap: wrap;
    gap: 0.9rem 2.3rem;
    align-items: center;
    justify-content: flex-start;
  `,
  ClientText: styled.span`
    color: #294930;
    font-size: 1.08rem;
    font-weight: 500;
    margin-bottom: 1px;
  `,
  ClientHighlight: styled.span`
    font-weight: 800;
    color: #21b85c;
    letter-spacing: -1px;
  `,
  TableContainer: styled.div`
    width: 100%;
    border-radius: 1rem;
    background: #f7fcf7;
    box-shadow: 0 1px 7px 0 rgba(55,85,120,0.07);
    margin-bottom: 0.2rem;
    padding-bottom: 0.5rem;
    overflow-y: auto;
    max-height: 330px;  // permite ver muchas filas y descripción
    @media (max-width: 700px) {
      max-height: 190px;
      font-size: 0.98rem;
    }
  `,
  TableHeader: styled.div`
    display: flex;
    font-weight: 800;
    color: #146b24;
    background: linear-gradient(90deg,#e7fae6 0%, #e5f8f0 100%);
    border-radius: 0.9rem 0.9rem 0 0;
    font-size: 1.05rem;
    padding: 0.48rem 0.25rem 0.32rem 0.25rem;
    border-bottom: 1.3px solid #d7e3d2;
  `,
  TableHeaderText: styled.div`
    flex: 1;
    text-align: left;
    font-size: 1.09rem;
    font-weight: 800;
    padding-right: 0.2rem;
    white-space: nowrap;
    &:nth-child(3) { min-width: 180px; flex: 2; }  // descripción más ancha
  `,
  TableRow: styled.div`
    display: flex;
    border-bottom: 1px solid #f2f2f2;
    align-items: flex-start;
    padding: 0.34rem 0.3rem 0.18rem 0.3rem;
    &:last-child { border-bottom: none;}
  `,
  TableText: styled.div`
    flex: 1;
    font-size: 1.01rem;
    color: #1e3b22;
    padding-right: 0.15rem;
    white-space: pre-line;
    overflow-wrap: break-word;
    word-break: break-word;
    &:nth-child(3) {
      flex: 2;
      min-width: 185px;
      max-width: 400px;
      color: #146b24;
      font-weight: 600;
    }
  `,
  NoDetailsText: styled.div`
    color: #ac1e20;
    background: #fbeeee;
    border-radius: 0.7rem;
    text-align: center;
    font-weight: 700;
    padding: 0.5rem 0.9rem;
    font-size: 1.03rem;
    margin-bottom: 0.3rem;
  `,
  TotalText: styled.div`
    font-size: 1.19rem;
    font-weight: 900;
    color: #128c37;
    margin-top: 0.22rem;
    margin-bottom: 0.22rem;
    text-align: right;
    letter-spacing: -0.5px;
  `,
  InputContainer: styled.div`
    display: flex;
    align-items: center;
    gap: 1.1rem;
    margin: 0.6rem 0 0.16rem 0;
    flex-wrap: wrap;
  `,
  InputLabel: styled.span`
    font-weight: 600;
    color: #2d3e1a;
    font-size: 1.08rem;
    min-width: 140px;
    letter-spacing: -.5px;
  `,
  Input: styled.input`
    border: 1.5px solid #beeec7;
    background: #f7fdf7;
    border-radius: 0.85rem;
    padding: 0.62rem 1rem;
    font-size: 1.09rem;
    font-weight: 500;
    color: #21315c;
    outline: none;
    min-width: 170px;
    transition: border 0.16s;
    &:focus { border: 1.8px solid #6cdd69;}
  `,
  PrintButton: styled.button`
    margin-top: 0.3rem;
    background: linear-gradient(90deg, rgb(11,223,4) 0%, rgb(57,124,43) 100%);
    color: #fff;
    border: none;
    border-radius: 0.95rem;
    padding: 0.85rem 1.3rem;
    font-size: 1.12rem;
    font-weight: 800;
    cursor: pointer;
    margin-right: 0.5rem;
    box-shadow: 0 1px 7px 0 rgba(32, 148, 68, 0.07);
    transition: background 0.13s, transform 0.12s;
    letter-spacing: -.5px;
    &:disabled {
      background: #b3e7b5;
      color: #47713b;
      cursor: not-allowed;
    }
    &:hover:enabled {
      background: linear-gradient(90deg, rgb(6, 191, 8) 0%, rgb(52,100,41) 100%);
      transform: scale(1.03);
    }
  `,
  SaveButton: styled.button`
    margin-top: 0.18rem;
    background: linear-gradient(90deg, rgb(11,223,4) 0%, rgb(57,124,43) 100%);
    color: #fff;
    border: none;
    border-radius: 0.95rem;
    padding: 0.85rem 1.3rem;
    font-size: 1.12rem;
    font-weight: 800;
    cursor: pointer;
    margin-right: 0.5rem;
    box-shadow: 0 1px 7px 0 rgba(32, 148, 68, 0.07);
    transition: background 0.13s, transform 0.12s;
    letter-spacing: -.5px;
    &:hover {
      background: linear-gradient(90deg, rgb(6, 191, 8) 0%, rgb(52,100,41) 100%);
      transform: scale(1.03);
    }
  `,
  CloseButton: styled.button`
    margin-top: 0.21rem;
    background: #f6f8fa;
    color: #304d32;
    border: 1.3px solid #d5d5d5;
    border-radius: 0.92rem;
    padding: 0.81rem 1.38rem;
    font-size: 1.09rem;
    font-weight: 700;
    margin-left: 0.1rem;
    cursor: pointer;
    transition: background 0.13s, color 0.13s;
    box-shadow: 0 1px 6px 0 rgba(60,60,80,0.05);
    &:hover {
      background: #e9e9e9;
      color: #0d6a2c;
    }
  `,
};

export default S;
