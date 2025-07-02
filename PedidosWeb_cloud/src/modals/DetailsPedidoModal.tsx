import React, { useState, useEffect } from 'react';
import S from './DetailsPedidoModal.styles';
import enterprise from '../types/enterprise';
import ipconfig from '../types/ipconfig';

interface DetailsPedidoModalProps {
  visible: boolean;
  onClose: () => void;
  detalles: any[];
  cliente: { nomcli: string; nruc: string };
  fecha: string;
  serie: string;
  pedido: string;
}

const DetailsPedidoModal: React.FC<DetailsPedidoModalProps> = ({
  visible,
  onClose,
  detalles,
  cliente,
  fecha,
  serie,
  pedido,
}) => {
  const [printerIP, setPrinterIP] = useState('');
  const [isPrinting, setIsPrinting] = useState(false);
  const [hora, setHora] = useState<string>('');

  const calculateTotal = () => detalles
    .reduce((total, item) => total + (isNaN(Number(item.precio)) ? 0 : item.cantped * Number(item.precio)), 0)
    .toFixed(2);

  const formatHtmlData = () => {
    const clienteInfo = `
      <p>${enterprise.ruc} - ${enterprise.razon}</p>
      <p><strong>Cliente:</strong> ${cliente.nomcli}</p>
      <p><strong>RUC:</strong> ${cliente.nruc}</p>
      <p><strong>Fecha:</strong> ${fecha}</p>
      <p><strong>Serie:</strong> ${serie}</p>
      <p><strong>Pedido:</strong> ${pedido}</p>
      <p><strong>Hora:</strong> ${hora}</p>
    `;
    const rows = detalles.map(item => {
      const precio = !isNaN(Number(item.precio)) ? Number(item.precio).toFixed(2) : '0.00';
      return `
        <tr>
          <td>${item.item}</td>
          <td>${item.codprod}</td>
          <td>${item.descrip}</td>
          <td>${item.cantped}</td>
          <td>${precio}</td>
        </tr>
      `;
    }).join('');
    const total = calculateTotal();
    return `
      <html>
        <head>
          <style>
            @page { size: auto; margin: 10px; }
            body { font-family: 'Courier', monospace; font-size: 12px; margin: 10px; }
            table { width: 100%; border-collapse: collapse; }
            th, td { padding: 5px; text-align: left; border-bottom: 1px solid #ddd; }
            th { background-color: #f2f2f2; }
            .total { font-weight: bold; text-align: right; }
          </style>
        </head>
        <body>
          ${clienteInfo}
          <table>
            <thead>
              <tr>
                <th>Item</th>
                <th>Código</th>
                <th>Descripción</th>
                <th>Cantidad</th>
                <th>Precio</th>
              </tr>
            </thead>
            <tbody>
              ${rows}
            </tbody>
          </table>
          <p class="total">Total: S/. ${total}</p>
        </body>
      </html>
    `;
  };

  const handleSavePdf = async () => {
    try {
      const htmlContent = formatHtmlData();
      const blob = new Blob([htmlContent], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `Pedido-${serie}-${pedido}.html`;
      link.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      alert('Ocurrió un error al generar el archivo PDF.');
    }
  };

  const fetchHora = async () => {
  if (!fecha || !serie || !pedido) return setHora('');
  // <-- Arreglamos la fecha para quitar la parte de la hora (si la hay)
  const fechaSolo = fecha.split('T')[0];
  try {
    const response = await fetch(
      `http://${ipconfig.url}/pedidos-hora?fechped=${fechaSolo}&sedarea=${serie}&ordped=${pedido}`
    );
    const data = await response.json();
    setHora(data?.hora || '');
  } catch (error) {
    setHora('');
  }
};

  useEffect(() => { if (visible) fetchHora(); }, [visible, fecha, serie, pedido]);

  if (!visible) return null;

  return (
    <S.ModalContainer>
      <S.ModalContent>
        <S.ModalTitle>Detalles del Pedido {serie}-{pedido}</S.ModalTitle>
        <S.ClientInfo>
          <S.ClientText>
            Cliente: <S.ClientHighlight>{cliente.nomcli}</S.ClientHighlight>
          </S.ClientText>
          <S.ClientText>
            RUC: <S.ClientHighlight>{cliente.nruc}</S.ClientHighlight>
          </S.ClientText>
          <S.ClientText>
            Fecha: <S.ClientHighlight>{fecha}</S.ClientHighlight>
          </S.ClientText>
          <S.ClientText>
            Hora: <S.ClientHighlight>{hora}</S.ClientHighlight>
          </S.ClientText>
        </S.ClientInfo>
        {detalles.length > 0 ? (
          <S.TableContainer>
            <S.TableHeader>
              <S.TableHeaderText>Item</S.TableHeaderText>
              <S.TableHeaderText>Código</S.TableHeaderText>
              <S.TableHeaderText>Descripción</S.TableHeaderText>
              <S.TableHeaderText>Cantidad</S.TableHeaderText>
              <S.TableHeaderText>Precio</S.TableHeaderText>
            </S.TableHeader>
            {detalles.map((item, index) => (
              <S.TableRow key={index}>
                <S.TableText>{item.item}</S.TableText>
                <S.TableText>{item.codprod}</S.TableText>
                <S.TableText>{item.descrip}</S.TableText>
                <S.TableText>{item.cantped}</S.TableText>
                <S.TableText>
                  {!isNaN(Number(item.precio)) ? Number(item.precio).toFixed(2) : '0.00'}
                </S.TableText>
              </S.TableRow>
            ))}
          </S.TableContainer>
        ) : (
          <S.NoDetailsText>No se encontraron detalles.</S.NoDetailsText>
        )}
        <S.TotalText>Total: S/. {calculateTotal()}</S.TotalText>
        <S.InputContainer>
          <S.InputLabel>Dirección IP de la impresora:</S.InputLabel>
          <S.Input
            placeholder="Ej: 192.168.1.100"
            value={printerIP}
            onChange={e => setPrinterIP(e.target.value)}
          />
        </S.InputContainer>
        <S.PrintButton disabled={isPrinting}>
          {isPrinting ? 'Imprimiendo...' : 'Imprimir'}
        </S.PrintButton>
        <S.SaveButton onClick={handleSavePdf}>Guardar Archivo</S.SaveButton>
        <S.CloseButton onClick={onClose}>Cerrar</S.CloseButton>
      </S.ModalContent>
    </S.ModalContainer>
  );
};

export default DetailsPedidoModal;
