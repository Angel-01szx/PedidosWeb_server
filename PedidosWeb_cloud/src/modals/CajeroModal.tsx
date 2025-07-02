import React from 'react';
import S from './CajeroModal.styles';

interface CajeroModalProps {
  visible: boolean;
  onClose: () => void;
  cajeroNombre: string | null;
}

const CajeroModal: React.FC<CajeroModalProps> = ({ visible, onClose, cajeroNombre }) => {
  if (!visible) return null;

  return (
    <S.ModalContainer>
      <S.ModalContent>
        <S.Title>Cancelado por Cajero:</S.Title>
        <S.Nombre>{cajeroNombre || 'Cajero no encontrado'}</S.Nombre>
        <S.CloseButton onClick={onClose}>Cerrar</S.CloseButton>
      </S.ModalContent>
    </S.ModalContainer>
  );
};

export default CajeroModal;
