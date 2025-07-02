import React, { useState, useEffect } from 'react';
import S from './EditPedidoModal.styles';
import ClientSelectModal from './ClientSelectModal';
import ProductModifModal from './ProductModifModal';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Storage } from '../utils/storage';
import ipconfig from '../types/ipconfig';

interface EditPedidoModalProps {
  visible: boolean;
  onClose: () => void;
  pedido: any;
  detalles: any[];
  onProductSelect: (product: any, quantity: number, price: number) => void;
}

const EditPedidoModal: React.FC<EditPedidoModalProps> = ({
  visible,
  onClose,
  pedido,
  detalles,
  onProductSelect,
}) => {
  const [editableDetalles, setEditableDetalles] = useState(detalles);
  const [total, setTotal] = useState(0);
  const [isClientModalVisible, setClientModalVisible] = useState(false);
  const [isProductModalVisible, setProductModalVisible] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<string>('EFECTIVO');
  const [selectedClient, setSelectedClient] = useState({
    id: '',
    razon: '',
    codigo: '',
  });

  useEffect(() => {
    if (visible) {
      setEditableDetalles(detalles);
    }
  }, [visible, detalles]);

  useEffect(() => {
    const newTotal = editableDetalles.reduce((sum, item) => sum + item.cantped * item.precio, 0);
    setTotal(parseFloat(newTotal.toFixed(2)));
  }, [editableDetalles]);

  const eliminarDetalle = (index: number) => {
    const nuevosDetalles = editableDetalles.filter((_, i) => i !== index);
    setEditableDetalles(nuevosDetalles);
  };

  const handleProductSelect = (product: any, quantity: number, price: number) => {
    if (!product || quantity <= 0 || price <= 0) return;

    const newDetail = {
      ...product,
      cantped: quantity,
      precio: price,
      descrip: product.descrip?.trim() || product.producto,
    };

    setEditableDetalles((prev) => [...prev, newDetail]);
    setProductModalVisible(false);
  };

  const handleUpdatePedido = async () => {
    if (!pedido || !pedido.fechped || !pedido.sedarea || !pedido.ordped) return;

    const codper = await Storage.getItem('codper');
    if (!codper) {
      toast.error('Error: No se encontró el código del personal.', { position: 'bottom-center' });
      return;
    }

    const ordped = `${pedido.fechped.slice(0, 4)}${pedido.sedarea}${pedido.ordped}`;
    const requestData = {
      codcli: pedido.codcli,
      total: parseFloat(total.toFixed(2)),
      codper,
      importe: parseFloat(total.toFixed(2)),
      pago: paymentMethod,
      fechped: pedido.fechped.slice(0, 10),
      sedarea: pedido.sedarea,
      ordped: pedido.ordped,
    };

    try {
      const res = await fetch(`http://${ipconfig.url}/actpedidos`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      const del = await fetch(`http://${ipconfig.url}/deldpedidos`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ordped }),
      });

      if (!del.ok) throw new Error(await del.text());

      for (let i = 0; i < editableDetalles.length; i++) {
        const item = editableDetalles[i];
        const itemCode = String(i + 1).padStart(3, '0');
        const { codprod, cantped, precio, descrip } = item;
        if (!codprod || cantped <= 0 || precio <= 0 || !descrip) continue;

        const post = await fetch(`http://${ipconfig.url}/dpedidos`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ordped, item: itemCode, codprod, cantped, precio, descrip }),
        });

        if (!post.ok) {
          const err = await post.json();
          throw new Error(err.error);
        }
      }

      toast.success('Pedido actualizado correctamente.', { position: 'bottom-center' });
      onClose();
    } catch (error) {
      toast.error(`Error al actualizar el pedido: ${(error as Error).message}`, {
        position: 'bottom-center',
      });
    }
  };

  if (!visible) return null;

  return (
    <S.ModalContainer>
  <S.ModalContent>
    <S.Title>Modificar Pedido</S.Title>

    <S.PaymentMethodContainer>
      <S.Label>Método de Pago:</S.Label>
      <S.Picker
        value={paymentMethod}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setPaymentMethod(e.target.value)}
      >
        <option value="EFECTIVO">EFECTIVO</option>
        <option value="QR">QR</option>
        <option value="TARJETA">TARJETA</option>
      </S.Picker>
    </S.PaymentMethodContainer>

    {pedido && (
      <S.PedidoInfo>
        <S.InfoText><b>Fecha:</b> {pedido.fechped.slice(0, 10)}</S.InfoText>
        <S.InfoText><b>Serie:</b> {pedido.sedarea}</S.InfoText>
        <S.InfoText><b>Pedido:</b> {pedido.ordped}</S.InfoText>
        <S.InfoText><b>Cliente:</b> {pedido.codcli}</S.InfoText>
        <S.InfoText><b>Cliente Seleccionado:</b> {selectedClient.codigo || 'Ningún cliente seleccionado'}</S.InfoText>
        <S.InfoText><b>Total:</b> S/ {total}</S.InfoText>
      </S.PedidoInfo>
    )}

    <S.Subtitle>Detalles del Pedido:</S.Subtitle>

    {editableDetalles.map((item, index) => (
      <S.DetailCard key={index}>
        <S.Label>Producto: {item.descrip?.trim() || item.producto}</S.Label>
        <S.CardText><b>Cantidad:</b> {parseFloat(item.cantped).toFixed(2)}</S.CardText>
        <S.CardText><b>Precio:</b> S/ {parseFloat(item.precio).toFixed(2)}</S.CardText>
        <S.DeleteButton onClick={() => eliminarDetalle(index)}>Eliminar</S.DeleteButton>
      </S.DetailCard>
    ))}

    <S.ButtonContainer>
      <S.Button onClick={() => setClientModalVisible(true)}>Modificar Cliente</S.Button>
      <S.Button onClick={() => setProductModalVisible(true)}>Agregar Producto</S.Button>
      <S.Button onClick={handleUpdatePedido}>Actualizar Pedido</S.Button>
    </S.ButtonContainer>

    <S.CloseButton onClick={onClose}>Cerrar</S.CloseButton>

    <ClientSelectModal
      visible={isClientModalVisible}
      onClose={() => setClientModalVisible(false)}
      onSelectClient={(client) => {
        setSelectedClient(client);
        setClientModalVisible(false);
      }}
    />

    <ProductModifModal
      visible={isProductModalVisible}
      onClose={() => setProductModalVisible(false)}
      onProductSelect={handleProductSelect}
    />
  </S.ModalContent>
</S.ModalContainer>

  );
};

export default EditPedidoModal;
