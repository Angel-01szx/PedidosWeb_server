import React, { useState, useEffect } from 'react';
import S from './CajaModal.styles';
import { Storage } from '../utils/storage';
import ipconfig from '../types/ipconfig';

interface CajaModalProps {
  visible: boolean;
  onClose: () => void;
  datos: {
    codcli: string;
    fechped: string;
    sedarea: string;
    ordped: string;
    total: number;
  } | null;
}

const CajaModal: React.FC<CajaModalProps> = ({ visible, onClose, datos }) => {
  const [pagos, setPagos] = useState<{ forma: string; importe: number }[]>([]);
  const [formaPago, setFormaPago] = useState('EFECTIVO');
  const [importe, setImporte] = useState('');
  const [codper, setCodper] = useState<string | null>(null);
  const [errores, setErrores] = useState<string[]>([]);

  useEffect(() => {
    if (!visible) {
      setPagos([]);
      setErrores([]);
      return;
    }

    const cargarCodper = async () => {
      try {
        const codperGuardado = await Storage.getItem('codper');
        if (codperGuardado) {
          setCodper(codperGuardado);
        }
      } catch {
        window.alert('Hubo un problema al cargar el valor de codper.');
      }
    };

    const cargarPagosExistentes = async () => {
      if (datos) {
        const { fechped, sedarea, ordped } = datos;
        try {
          const response = await fetch(`http://${ipconfig.url}/dcancelar`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              fechped: fechped.substring(0, 10),
              sedarea,
              ordped,
            }),
          });

          const responseText = await response.text();
          if (response.ok) {
            const data = JSON.parse(responseText);
            if (Array.isArray(data) && data.length > 0) {
              const pagosExistentes = [
                { forma: data[0].pago, importe: parseFloat(data[0].monto) },
                { forma: data[0].pago2, importe: parseFloat(data[0].monto2) },
                { forma: data[0].pago3, importe: parseFloat(data[0].monto3) },
              ]
                .filter(p => p.importe > 0 && p.forma !== '-')
                .map(p => ({
                  forma: p.forma || '-',
                  importe: p.importe || 0,
                }));

              setPagos(pagosExistentes);
            } else {
              setPagos([]);
            }
          } else {
            window.alert('Hubo un problema al cargar los pagos existentes.');
          }
        } catch {
          window.alert('Hubo un problema al cargar los pagos existentes.');
        }
      }
    };

    if (visible && datos) {
      cargarCodper();
      cargarPagosExistentes();
    }
  }, [visible, datos]);

  const totalPagos = pagos.reduce((sum, pago) => sum + (pago.importe || 0), 0);
  const diferencia = datos && datos.total !== undefined ? datos.total - totalPagos : 0;

  const handleAgregarPago = () => {
    if (pagos.length >= 3) {
      window.alert('Solo puedes añadir hasta 3 pagos.');
      return;
    }

    const importeNum = parseFloat(importe);
    if (!importe || isNaN(importeNum)) {
      window.alert('Por favor, ingresa un importe válido.');
      return;
    }

    setPagos([...pagos, { forma: formaPago, importe: importeNum }]);
    setImporte('');
  };

  const handleEliminarPago = (index: number) => {
    setPagos(pagos.filter((_, i) => i !== index));
  };

  const handleGuardar = async () => {
    if (!datos) {
      setErrores(['No se encontraron datos del pedido.']);
      return;
    }

    if (pagos.length === 0) {
      setErrores(['Debes añadir al menos un pago.']);
      return;
    }

    const parametros = {
      pago: pagos[0]?.forma || '',
      monto: pagos[0]?.importe || 0,
      pago2: pagos[1]?.forma || '-',
      monto2: pagos[1]?.importe || 0,
      pago3: pagos[2]?.forma || '-',
      monto3: pagos[2]?.importe || 0,
      acta: pagos.reduce((sum, p) => sum + (p.importe || 0), 0),
      usuario: codper || '',
      fechped: datos.fechped.substring(0, 10),
      sedarea: datos.sedarea,
      ordped: datos.ordped,
    };

    try {
      const response = await fetch(`http://${ipconfig.url}/cancelar`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(parametros),
      });

      const data = await response.json();

      if (response.ok) {
        window.alert('Pedido cancelado con éxito');
        onClose();
      } else {
        window.alert(data.error || 'Hubo un error al cancelar el pedido.');
      }
    } catch {
      window.alert('Hubo un problema al realizar la operación.');
    }
  };

  if (!visible) return null;

  return (
    <S.ModalBackground>
      <S.ModalContainer>
        <S.ModalTitle>Cancelar Pedido</S.ModalTitle>
        {datos ? (
          <>
            <S.TextRow>Cliente: {datos.codcli}</S.TextRow>
            <S.TextRow>Fecha: {datos.fechped}</S.TextRow>
            <S.TextRow>Serie: {datos.sedarea}</S.TextRow>
            <S.TextRow>Orden de Pedido: {datos.ordped}</S.TextRow>
            <S.TextRow>Total: {datos.total}</S.TextRow>
          </>
        ) : (
          <S.TextRow>No se encontraron datos del pedido.</S.TextRow>
        )}
        {codper && <S.TextRow>Código Personal: {codper}</S.TextRow>}
        <S.PagoContainer>
          <S.Picker value={formaPago} onChange={e => setFormaPago(e.target.value)}>
            <option value="EFECTIVO">EFECTIVO</option>
            <option value="QR">QR</option>
            <option value="TARJETA">TARJETA</option>
          </S.Picker>
          <S.Input
            placeholder="Importe"
            type="number"
            value={importe}
            onChange={e => setImporte(e.target.value)}
          />
          <S.ButtonSmall onClick={handleAgregarPago}>
            <S.ButtonText>Añadir Pago</S.ButtonText>
          </S.ButtonSmall>
        </S.PagoContainer>
        {pagos.length > 0 ? (
          pagos.map((pago, index) => (
            <S.PagoItem key={index}>
              <S.PagoItemText>{pago.forma}: {pago.importe}</S.PagoItemText>
              <S.ButtonSmall onClick={() => handleEliminarPago(index)}>
                <S.ButtonText>Eliminar</S.ButtonText>
              </S.ButtonSmall>
            </S.PagoItem>
          ))
        ) : (
          <S.TextRow>No hay pagos agregados</S.TextRow>
        )}
        {errores.length > 0 && (
          <S.ErrorContainer>
            {errores.map((error, index) => (
              <S.ErrorText key={index}>{error}</S.ErrorText>
            ))}
          </S.ErrorContainer>
        )}
        <S.DifRow>
          Diferencia: {diferencia < 0 ? 'Exceso de pago' : ''} {diferencia.toFixed(2)}
        </S.DifRow>
        <S.Button onClick={handleGuardar}>
          <S.ButtonText>Confirmar Cancelación</S.ButtonText>
        </S.Button>
        <S.ButtonCancelar onClick={onClose}>
          <S.ButtonText>Cancelar</S.ButtonText>
        </S.ButtonCancelar>
      </S.ModalContainer>
    </S.ModalBackground>
  );
};

export default CajaModal;
