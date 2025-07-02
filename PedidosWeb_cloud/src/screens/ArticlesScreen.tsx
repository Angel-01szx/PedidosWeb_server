import React, { useState, useEffect } from 'react';
import S from './ArticlesScreen.styles';
import ipconfig from '../types/ipconfig';
import { MdRefresh } from 'react-icons/md';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { toast } from 'react-toastify';

interface Product {
  codprod: string;
  producto: string;
  parnumb: string;
}

const ArticlesScreen: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchText, setSearchText] = useState('');
  const [scanning, setScanning] = useState(false);
  const [barcode, setBarcode] = useState('');
  let scannerInstance: Html5QrcodeScanner | null = null;

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (scanning && typeof window !== 'undefined') {
      scannerInstance = new Html5QrcodeScanner(
        'reader',
        { fps: 10, qrbox: { width: 250, height: 250 } },
        false
      );

      scannerInstance.render(
        (decodedText: string) => {
          setBarcode(decodedText);
          setScanning(false);
          scannerInstance?.clear();
        },
        (error: any) => {
          console.warn(`Escaneo fallido: ${error}`);
        }
      );
    }

    return () => {
      scannerInstance?.clear().catch(console.error);
    };
  }, [scanning]);

  const fetchProducts = async () => {
    try {
      const response = await fetch(`http://${ipconfig.url}/detprod`);
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const filteredProducts = products.filter((product) =>
    product.producto?.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleSave = async () => {
    if (selectedProduct && barcode) {
      try {
        const response = await fetch(
          `http://${ipconfig.url}/productos/${selectedProduct.codprod}`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ parnumb: barcode }),
          }
        );

        if (response.ok) {
          toast.success(`Producto actualizado. Código: ${barcode}`, {
            position: 'top-right',
          });
          setBarcode('');
        } else {
          toast.error('No se pudo actualizar el producto.', {
            position: 'top-right',
          });
        }
      } catch (error) {
        console.error('Error al guardar:', error);
        toast.error('Hubo un problema al guardar.', {
          position: 'top-right',
        });
      }
    } else {
      toast.error('Selecciona un producto y escanea un código de barras.', {
        position: 'top-right',
      });
    }
  };

  return (
    <S.Container>
      {scanning ? (
        <>
          <S.ScreenTitle>Escanea el Código de Barras</S.ScreenTitle>
          <S.CameraContainer>
            <div id="reader" style={{ width: '100%', height: 300 }} />
          </S.CameraContainer>
          <S.CloseButton onClick={() => setScanning(false)}>
            <S.ButtonText>Cerrar Escáner</S.ButtonText>
          </S.CloseButton>
        </>
      ) : (
        <>
          <S.ScreenTitle>Selecciona un Producto</S.ScreenTitle>
          <S.Input
            type="text"
            placeholder="Buscar por Descripción"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />

          <S.ButtonRow>
            <S.ButtonScan
              onClick={async () => {
                try {
                  await navigator.mediaDevices.getUserMedia({ video: true });
                  setScanning(true);
                } catch (err) {
                  toast.error(
                    'Permiso de cámara denegado. Activa los permisos en la configuración del navegador.',
                    { position: 'top-center' }
                  );
                }
              }}
            >
              <S.ButtonText>Escanear Código de Barra</S.ButtonText>
            </S.ButtonScan>

            <S.UpdateButton onClick={fetchProducts}>
              <MdRefresh size={24} color="#fff" />
            </S.UpdateButton>
          </S.ButtonRow>

          <S.TableContainer>
            {filteredProducts.map((item) => {
              const isSelected = selectedProduct?.codprod === item.codprod;
              return (
                <S.TableRow
                  key={item.codprod}
                  onClick={() => setSelectedProduct(item)}
                  style={isSelected ? { backgroundColor: 'rgba(128,128,128,0.5)' } : {}}
                >
                  <S.IdColumn>{item.codprod}</S.IdColumn>
                  <S.DescripcionColumn>{item.producto || 'Sin descripción'}</S.DescripcionColumn>
                  <S.CodBarra>{item.parnumb}</S.CodBarra>
                </S.TableRow>
              );
            })}
          </S.TableContainer>

          {selectedProduct && (
            <S.SelectedDescription>
              Descripción Seleccionada: {selectedProduct.producto || 'No hay descripción disponible'}
            </S.SelectedDescription>
          )}

          <S.Input
            type="text"
            placeholder="Código de barras escaneado"
            value={barcode}
            onChange={(e) => setBarcode(e.target.value)}
          />
          <S.ButtonSave onClick={handleSave}>
            <S.ButtonText>Guardar</S.ButtonText>
          </S.ButtonSave>
        </>
      )}
    </S.Container>
  );
};

export default ArticlesScreen;
