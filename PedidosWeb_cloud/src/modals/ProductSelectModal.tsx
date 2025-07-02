import React, { useState, useEffect } from 'react';
import S from './ProductSelectModal.styles';
import { toast } from 'react-toastify';
import ipconfig from '../types/ipconfig';
import { MdRefresh } from 'react-icons/md';

interface Product {
  codprod: string;
  name: string;
  quantity: string;
  producto?: string;
  precio: string;
  pventa?: string;
}

interface ProductSelectModalProps {
  visible: boolean;
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;
  quantity: string;
  setQuantity: (quantity: string) => void;
  precio: string;
  setPrecio: (precio: string) => void;
  isEditMode: boolean;
  handleAddOrModifyProduct: (product: Product) => void;
  onClose: () => void;
  products: Product[];
}

const ProductSelectModal: React.FC<ProductSelectModalProps> = ({
  visible,
  selectedProduct,
  setSelectedProduct,
  quantity,
  setQuantity,
  precio,
  setPrecio,
  isEditMode,
  handleAddOrModifyProduct,
  onClose,
  products,
}) => {
  const [searchText, setSearchText] = useState('');
  const [scanning, setScanning] = useState(false);
  const [productos, setProductos] = useState<Product[]>(products);

  const filteredProducts = productos.filter(product =>
    product.producto?.toLowerCase().includes(searchText.toLowerCase())
  );

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`http://${ipconfig.url}/productos`);
        if (!response.ok) throw new Error('Error fetching products');
        const data = await response.json();
        setProductos(data);
      } catch (error) {
        console.error('Error fetching products:', error);
        toast.error('No se pudieron cargar los productos.');
      }
    };

    if (visible) {
      setSelectedProduct(null);
      setQuantity('');
      setPrecio('');
      setSearchText('');
      fetchProducts();
    }

    if (!visible) {
      setSearchText('');
    }
  }, [visible]);

  useEffect(() => {
    if (selectedProduct?.pventa && parseFloat(selectedProduct.pventa) > 0) {
      setPrecio(selectedProduct.pventa);
    } else {
      setPrecio('');
    }
  }, [selectedProduct, setPrecio]);

  useEffect(() => {
    let html5QrCode: any;
    if (scanning) {
      (async () => {
        const { Html5Qrcode } = await import('html5-qrcode');
        html5QrCode = new Html5Qrcode('reader');
        const config = { fps: 10, qrbox: 250 };

        html5QrCode
          .start(
            { facingMode: 'environment' },
            config,
            (decodedText: string) => {
              handleBarCodeScanned({ data: decodedText });
              html5QrCode.stop().then(() => {
                html5QrCode.clear();
                setScanning(false);
              });
            },
            (errorMessage: string) => {
              console.warn('Error escaneando:', errorMessage);
            }
          )
          .catch((err: unknown) => {
            console.error('No se pudo iniciar escáner:', err);
          });
      })();

      return () => {
        if (html5QrCode) {
          html5QrCode.stop().catch(() => {});
        }
      };
    }
  }, [scanning]);

  const startScanning = () => setScanning(true);
  const stopScanning = () => setScanning(false);

  const fetchProducts = async () => {
    try {
      const response = await fetch(`http://${ipconfig.url}/productos`);
      if (!response.ok) throw new Error('Error fetching products');
      const data = await response.json();
      setProductos(data);
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error('No se pudieron cargar los productos.');
    }
  };

  const handleBarCodeScanned = async ({ data }: { data: string }) => {
    try {
      const response = await fetch(`http://${ipconfig.url}/codbarra?codigo=${data}`);
      const contentType = response.headers.get('content-type');

      if (!response.ok) {
        toast.success('Código no existe.');
        return;
      } else if (contentType && contentType.includes('application/json')) {
        const result = await response.json();
        if (result) {
          setSelectedProduct({ ...result, quantity: '', precio: '' });
          setQuantity('');
          setPrecio('');
          stopScanning();
        } else {
          toast.success('El código de barras no se encuentra en la base de datos.');
        }
      } else {
        toast.error('La respuesta no es un JSON válido.');
      }
    } catch (error) {
      console.error('Error al buscar el producto:', error);
      toast.error('Hubo un problema al escanear el código.');
    }
  };

  if (!visible) return null;

  return (
    <S.Overlay>
      <S.ModalContent>
        {scanning ? (
          <S.CameraContainer>
            <div style={{ height: 300, width: '100%' }} id="reader" />
            <S.CloseButton onClick={stopScanning}>Cerrar Escáner</S.CloseButton>
          </S.CameraContainer>
        ) : (
          <>
            <S.Title>{isEditMode ? 'Modificar Producto' : 'Selecciona un Producto'}</S.Title>
            <S.Input
              placeholder="Buscar por Descripción"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <S.Row>
              <S.Button style={{ flex: 1 }} onClick={startScanning}>Escanear Código de Barra</S.Button>
              <S.IconButton onClick={fetchProducts}><MdRefresh size={24} color="#fff" /></S.IconButton>
            </S.Row>
            <S.TableContainer>
              {filteredProducts.map((item) => {
                const isSelected = selectedProduct?.codprod === item.codprod;
                return (
                  <S.Row
                    key={item.codprod}
                    className={isSelected ? 'selected' : ''}
                    onClick={() => {
                      setSelectedProduct({ ...item, quantity: '' });
                      setQuantity('');
                      setPrecio('');
                    }}
                  >
                    <S.IdColumn>{item.codprod}</S.IdColumn>
                    <S.DescripcionColumn>{item.producto || 'Descripción no disponible'}</S.DescripcionColumn>
                    <S.PVentaColumn>{item.pventa}</S.PVentaColumn>
                  </S.Row>
                );
              })}
            </S.TableContainer>

            {selectedProduct && (
              <>
                <S.SelectedDescription>Descripción Seleccionada: {selectedProduct.producto || 'No hay descripción disponible'}</S.SelectedDescription>
                <S.SelectedDescription>Precio de Venta: {selectedProduct.pventa || 'No disponible'}</S.SelectedDescription>
              </>
            )}

            <S.Input placeholder="Cantidad" type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
            <S.Input placeholder="Precio" type="number" value={precio} onChange={(e) => setPrecio(e.target.value)} />
            <S.Button
              onClick={() => {
                if (selectedProduct) {
                  handleAddOrModifyProduct({
                    ...selectedProduct,
                    quantity,
                    precio
                  });
                }
              }}
            >
              {isEditMode ? 'Modificar' : 'Agregar'}
            </S.Button>
            <S.Button onClick={onClose}>Cerrar</S.Button>
          </>
        )}
      </S.ModalContent>
    </S.Overlay>
  );
};

export default ProductSelectModal;
