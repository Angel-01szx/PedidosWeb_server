// EditPedidoModal.styles.ts
import styled from 'styled-components';

const S: any = {};

S.ModalContainer = styled.div`
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(24, 30, 54, 0.15);
  backdrop-filter: blur(4px);
  z-index: 1011;
`;

S.ModalContent = styled.div`
  background: rgba(255,255,255,0.97);
  border-radius: 2rem;
  box-shadow: 0 12px 64px 0 rgba(24,34,64,0.14), 0 2px 10px 0 rgba(55, 145, 190, 0.11);
  min-width: 380px;
  max-width: 600px;
  width: 98vw;
  padding: 2.6rem 2.1rem 1.7rem 2.1rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  font-family: 'Blinker', Arial, Helvetica, sans-serif;
  animation: fadeIn 0.21s cubic-bezier(.42,0,.58,1);

  @keyframes fadeIn {
    from { opacity: 0; transform: scale(0.91);}
    to { opacity: 1; transform: scale(1);}
  }
`;

S.Title = styled.h2`
  font-size: 1.7rem;
  font-weight: 800;
  color: #16447c;
  margin-bottom: 0.7rem;
  letter-spacing: -1px;
  text-align: center;
`;

S.PaymentMethodContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1.1rem;
  background: #f5fbfe;
  border-radius: 1.2rem;
  padding: 0.6rem 1rem;
  margin-bottom: 0.3rem;
`;

S.Label = styled.span`
  font-size: 1rem;
  font-weight: 600;
  color: #555;
  min-width: 120px;
`;

S.Picker = styled.select`
  border: none;
  background: #f2f6fd;
  border-radius: 0.7rem;
  padding: 0.58rem 1.08rem;
  font-size: 1rem;
  font-weight: 500;
  color: #223e57;
  box-shadow: 0 1px 8px 0 rgba(44,73,113,0.07);
  outline: none;
  transition: box-shadow 0.2s;
  &:focus { box-shadow: 0 1px 8px 0 rgba(120,176,255,0.14);}
`;

S.PedidoInfo = styled.div`
  background: rgba(210, 235, 250, 0.13);
  border-radius: 1rem;
  padding: 1rem 1.3rem 0.6rem 1.3rem;
  font-size: 1.06rem;
  margin-bottom: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.32rem;
`;

S.InfoText = styled.span`
  color: #334266;
  font-size: 1.07rem;
  margin-bottom: 1px;
  display: flex;
  align-items: center;
  gap: 0.22rem;
`;

S.Highlight = styled.span`
  font-weight: 800;
  color: #18c986;
`;

S.Subtitle = styled.h3`
  font-size: 1.18rem;
  color: #163e58;
  margin: 0.7rem 0 0.2rem 0;
  font-weight: 700;
  letter-spacing: -.5px;
`;

S.DetailsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
  margin-bottom: 0.8rem;
  max-height: 210px;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: #bde3ff #e8f2fc;
`;

S.DetailCard = styled.div`
  background: rgba(195,207,226,0.15);
  border-radius: 1.2rem;
  box-shadow: 0 1px 7px 0 rgba(55,85,120,0.08);
  padding: 1.06rem 1.2rem 0.8rem 1.2rem;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  position: relative;
  transition: box-shadow 0.18s;
  &:hover { box-shadow: 0 2px 9px 0 rgba(40,120,190,0.10);}
`;

S.CardText = styled.span`
  font-size: 1.03rem;
  color: #405080;
  margin-bottom: 2px;
`;

S.DeleteButton = styled.button`
  position: absolute;
  top: 1.08rem;
  right: 1.05rem;
  background: #ed476c;
  color: #fff;
  border: none;
  border-radius: 0.8rem;
  padding: 0.23rem 0.85rem;
  font-weight: 700;
  font-size: 0.98rem;
  cursor: pointer;
  transition: background 0.16s;
  box-shadow: 0 1px 6px 0 rgba(242,46,105,0.10);
  &:hover { background: #b6204e; }
`;

S.ButtonContainer = styled.div`
  display: flex;
  gap: 1.1rem;
  margin: 1.25rem 0 0.1rem 0;
  flex-wrap: wrap;
  justify-content: center;
`;

S.Button = styled.button`
  flex: 1;
  min-width: 140px;
  background: linear-gradient(90deg,rgb(11, 223, 4) 0%,rgb(57, 124, 43) 100%);
  color: #fff;
  font-weight: 700;
  border: none;
  border-radius: 1rem;
  padding: 0.90rem 1.12rem;
  margin-bottom: 0.05rem;
  font-size: 1.09rem;
  letter-spacing: -0.5px;
  cursor: pointer;
  box-shadow: 0 2px 9px 0 rgba(24,180,135,0.08);
  transition: background 0.14s, transform 0.12s;
  &:hover {
    background: linear-gradient(90deg, #138dff 0%, #19ae7a 100%);
    transform: scale(1.045);
  }
`;

S.CloseButton = styled.button`
  margin-top: 0.7rem;
  background: #f8f8f8;
  color: #394857;
  border: none;
  border-radius: 0.8rem;
  padding: 0.78rem 1.22rem;
  font-weight: 700;
  font-size: 1.04rem;
  cursor: pointer;
  box-shadow: 0 1px 5px 0 rgba(44,65,125,0.07);
  transition: background 0.13s;
  &:hover { background:rgb(197, 55, 55);
  color: rgb(255,255,255) }
`;

export default S;
