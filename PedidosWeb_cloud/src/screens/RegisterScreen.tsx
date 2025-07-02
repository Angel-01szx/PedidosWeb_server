import React, { useState, useEffect } from 'react';
import S from './RegisterScreen.styles';
import ipconfig from '../types/ipconfig';
import ProductSelectModal from '../modals/ProductSelectModal';
import ClientSelectModal from '../modals/ClientSelectModal';
import ClientRegister from '../modals/ClientRegister';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Storage } from '../utils/storage';

interface Product {
  codprod: string;
  name: string;
  quantity: string;
  producto?: string;
  precio: string;
}

const getLocalDate = (): string => {
  const now = new Date();
  const offset = now.getTimezoneOffset(); // en minutos
  const localDate = new Date(now.getTime() - offset * 60 * 1000);
  return localDate.toISOString().split('T')[0];
};

export default function RegisterScreen() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isClientModalVisible, setClientModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState('');
  const [precio, setPrecio] = useState('');
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedClient, setSelectedClient] = useState({ id: '100001', razon: 'AL PUBLICO', codigo: '100001' });
  const [correlativo, setCorrelativo] = useState('');
  const [observacion, setObservacion] = useState('');
  const [selectedSerie, setSelectedSerie] = useState('');
  const [selectedPago, setSelectedPago] = useState('EFECTIVO');
  const [sede, setSede] = useState('');
  const [concatser, setConcatser] = useState('');
  const [importeTotal, setImporteTotal] = useState(0);
  const [isRegisterClientVisible, setRegisterClientVisible] = useState(false);

  useEffect(() => {
    const init = async () => {
      try {
        const storedSede = await Storage.getItem('sede');
        const ptventa = await Storage.getItem('ptventa');
        if (storedSede) setSede(storedSede);
        if (ptventa) {
          setSelectedSerie(ptventa);
          setConcatser(`${storedSede}${ptventa}`);
        }
      } catch (error) {
        console.error('Error cargando sede o ptventa:', error);
      }
    };
    init();
  }, []);

  useEffect(() => {
    if (concatser) {
      fetchCorrelativo(concatser);
    }
  }, [concatser]);

  useEffect(() => {
    setImporteTotal(products.reduce((sum, p) => sum + (+p.quantity * +p.precio), 0));
  }, [products]);

  const fetchCorrelativo = async (serie: string) => {
    try {
      const res = await fetch(`http://${ipconfig.url}/correlativo?serie=${serie}`);
      const data = await res.json();
      const num = data.correlativo.padStart(6, '0');
      setCorrelativo(num);
      return num;
    } catch (e) {
      console.error('Error obteniendo correlativo', e);
    }
  };

  const handleAddOrModifyProduct = () => {
    if (!quantity || !selectedProduct) return showToast('error', 'Faltan datos', 'Completa todos los campos.');
    const exists = products.some(p => p.codprod === selectedProduct.codprod);
    if (exists && !isEditMode) return showToast('error', 'Producto duplicado', 'Ya existe en la lista.');

    const updated = {
      codprod: selectedProduct.codprod,
      name: selectedProduct.name,
      quantity,
      precio,
      producto: selectedProduct.producto || '',
    };

    setProducts(prev =>
      isEditMode ? prev.map(p => (p.codprod === updated.codprod ? updated : p)) : [...prev, updated]
    );

    showToast('success', isEditMode ? 'Modificado' : 'Agregado', `Producto ${updated.producto}`);
    setModalVisible(false);
    setSelectedProduct(null);
    setQuantity('');
    setPrecio('');
    setIsEditMode(false);
  };

  const handleSaveToDatabase = async () => {
    try {
      const fecha = getLocalDate();
      const codper = await Storage.getItem("codper");
      const correl = await fetchCorrelativo(concatser);
      const ordped = `${new Date().getFullYear()}${concatser}${correl}`;

      const pedido = {
        fechped: fecha,
        fechoc: fecha,
        fechentr: fecha,
        sedarea: concatser,
        ordped: correl,
        codcli: selectedClient.codigo,
        total: importeTotal,
        importe: importeTotal,
        obs: observacion,
        codper,
        pago: selectedPago,
        hora: new Date().toLocaleTimeString('en-US', { hour12: false }),
      };

      await fetch(`http://${ipconfig.url}/pedidos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pedido),
      });

      for (let i = 0; i < products.length; i++) {
        const item = {
          ordped,
          item: (i + 1).toString().padStart(3, '0'),
          codprod: products[i].codprod,
          cantped: products[i].quantity,
          precio: products[i].precio,
          descrip: products[i].producto || 'No disponible',
        };

        await fetch(`http://${ipconfig.url}/dpedidos`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(item),
        });
      }

      showToast('success', 'Guardado', `Pedido ${correl} registrado.`);
      setProducts([]);
      setObservacion('');
    } catch (err) {
      console.error(err);
      showToast('error', 'Error', 'No se pudo guardar el pedido.');
    }
  };

  const showToast = (type: 'success' | 'error' | 'info' | 'warning', text1: string, text2?: string) => {
    const message = text2 ? `${text1}: ${text2}` : text1;
    switch (type) {
      case 'success': toast.success(message); break;
      case 'error': toast.error(message); break;
      case 'info': toast.info(message); break;
      case 'warning': toast.warning(message); break;
      default: toast(message);
    }
  };

  return (
    <S.Container>
      <S.Title>Registrar Pedido</S.Title>
      <S.CenterText>Fecha: {new Date().toLocaleDateString()}</S.CenterText>

      <S.Row>
        <S.FlexColumn>
          <S.Subtitle>Serie</S.Subtitle>
          <S.Select disabled value={concatser}>
            <option>{concatser || 'Cargando...'}</option>
          </S.Select>
        </S.FlexColumn>
        <S.FixedColumn>
          <S.Subtitle>Número</S.Subtitle>
          <S.Input value={correlativo} readOnly />
        </S.FixedColumn>
      </S.Row>

      <S.Subtitle>Pago</S.Subtitle>
      <S.Select value={selectedPago} onChange={e => setSelectedPago(e.target.value)}>
        <option value="EFECTIVO">EFECTIVO</option>
        <option value="QR">QR</option>
        <option value="TARJETA">TARJETA</option>
      </S.Select>

      <S.ButtonGroup>
        <S.GreenButton onClick={() => setModalVisible(true)}>Seleccionar Producto</S.GreenButton>
        <S.GreenButton onClick={() => setClientModalVisible(true)}>Seleccionar Cliente</S.GreenButton>
        <S.GreenButton onClick={() => setRegisterClientVisible(true)}>Clientes</S.GreenButton>
      </S.ButtonGroup>

      <S.Subtitle>Cliente: {selectedClient.razon}</S.Subtitle>

      {products.map(item => (
        <S.ProductItem key={item.codprod}>
          <S.ProductName>{item.name}</S.ProductName>
          <S.ProductText>Descripción: {item.producto || 'Sin descripción'}</S.ProductText>
          <S.ProductText>Cantidad: {item.quantity} | Precio: {item.precio}</S.ProductText>
        </S.ProductItem>
      ))}

      <S.ImporteText>Total: S/. {importeTotal.toFixed(2)}</S.ImporteText>

      <S.InputObs
        value={observacion}
        onChange={e => setObservacion(e.target.value)}
        placeholder="Observaciones"
      />

      <S.GreenButton onClick={handleSaveToDatabase}>Guardar Pedido</S.GreenButton>

      <ProductSelectModal
        visible={isModalVisible}
        products={[]}
        selectedProduct={selectedProduct}
        setSelectedProduct={setSelectedProduct}
        quantity={quantity}
        setQuantity={setQuantity}
        precio={precio}
        setPrecio={setPrecio}
        isEditMode={isEditMode}
        handleAddOrModifyProduct={handleAddOrModifyProduct}
        onClose={() => setModalVisible(false)}
      />

      <ClientSelectModal
        visible={isClientModalVisible}
        onSelectClient={(client) => {
          setSelectedClient(client);
          setClientModalVisible(false);
        }}
        onClose={() => setClientModalVisible(false)}
      />

      <ClientRegister
        visible={isRegisterClientVisible}
        onClose={() => setRegisterClientVisible(false)}
        onSave={(client) => {
          // Aquí puedes guardar el cliente como desees
          console.log('Cliente guardado:', client);
          setRegisterClientVisible(false);
        }}
        onDelete={(ruc) => {
          // Aquí puedes eliminar el cliente como desees
          console.log('Eliminar cliente con RUC:', ruc);
        }}
      />

    </S.Container>
  );
}
