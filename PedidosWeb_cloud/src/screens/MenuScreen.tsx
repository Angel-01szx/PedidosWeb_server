// MenuScreen.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Storage } from '../utils/storage';
import { FaShoppingCart, FaBox, FaChartBar, FaPlus, FaSignOutAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';
import S from './MenuScreen.styles';
import Logo from '../assets/logo_ositec-removebg-preview.jpg';

export default function MenuScreen() {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleExit = () => setShowModal(true);

  const confirmExit = async () => {
    await Storage.removeItem('codper');
    setShowModal(false);
    navigate('/', { replace: true });
  };

  const cancelExit = () => setShowModal(false);

  const buttons = [
    { color: 'registrar', icon: <FaShoppingCart />, text: 'Registrar Pedido', path: '/register' },
    { color: 'articulo', icon: <FaBox />, text: 'Consultar Artículos', path: '/articles' },
    { color: 'reportes', icon: <FaChartBar />, text: 'Reportes de Pedidos', path: '/reports' },
    { color: 'nuevoArticulo', icon: <FaPlus />, text: 'Registrar Artículo', path: '/registrar-articulo' },
    { color: 'salir', icon: <FaSignOutAlt />, text: 'Cerrar Sesión', action: handleExit },
  ];

  return (
    <>
      {showModal && (
        <S.ModalOverlay>
          <S.Modal>
            <S.ModalTitle>¿Cerrar sesión?</S.ModalTitle>
            <S.ModalMessage>¿Estás seguro de que deseas salir de tu cuenta?</S.ModalMessage>
            <S.ModalActions>
              <S.ModalButton onClick={confirmExit} color="primary">Sí, salir</S.ModalButton>
              <S.ModalButton onClick={cancelExit} color="secondary">Cancelar</S.ModalButton>
            </S.ModalActions>
          </S.Modal>
        </S.ModalOverlay>
      )}
      <S.Container>
        <S.Quadrants>
          {buttons.map((btn, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <S.Button
                color={btn.color}
                onClick={btn.action ? btn.action : () => navigate(btn.path!)}
              >
                <S.Icon>
                  {btn.icon}
                </S.Icon>
                <S.ButtonText>{btn.text}</S.ButtonText>
              </S.Button>
            </motion.div>
          ))}
        </S.Quadrants>
      </S.Container>
    </>
  );
}
