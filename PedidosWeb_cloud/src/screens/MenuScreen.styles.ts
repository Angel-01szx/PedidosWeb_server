// MenuScreen.styles.ts
import styled from 'styled-components';
import bgImage from '../assets/desktop.png';

const colorMap: Record<string, string> = {
  registrar: 'rgb(0, 216, 0)',
  articulo: '#2196F3',
  reportes: '#FF9800',
  nuevoArticulo: '#9C27B0',
  salir: '#F44336',
};

const S: any = {
  Container: styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 100vh;
  padding: 2rem;
  background: url(${bgImage}) no-repeat center center;
  background-size: cover;
`,

  Quadrants: styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 1.5rem;
    width: 100%;
    max-width: 800px;
  `,

  Button: styled.button<{ color: string }>`
    background-color: ${({ color }) => colorMap[color] || '#666'};
    border: none;
    border-radius: 12px;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    transition: background-color 0.3s ease;
    width: 100%;
    height: 100px;

    &:hover {
      background-color: ${({ color }) => colorMap[color] && `${colorMap[color]}DD`};
    }
  `,

  Icon: styled.div`
    font-size: 1.8rem;
    margin-bottom: 0.5rem;
    color: #fff;
  `,

  ButtonText: styled.span`
    font-size: 1rem;
    color: #fff;
    font-weight: 30;
    font-family: 'Blinker', Arial, Helvetica, sans-serif;
  `,

  Logo: styled.img`
    width: 120px;
    height: auto;
    margin-top: 2rem;
    filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2));
  `,

  // ----------- MODAL STYLES -----------
  ModalOverlay: styled.div`
    position: fixed;
    top: 0; left: 0; right: 0; bottom: 0;
    background: rgba(30, 30, 45, 0.35);
    z-index: 1000;
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
  `
};

export default S;
