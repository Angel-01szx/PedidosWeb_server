import React, { useState, useEffect } from 'react';
import S from './ProductModifModal.styles';
import ipconfig from '../types/ipconfig';

interface ProductModifModalProps {
  visible: boolean;
  onProductSelect: (product: any, quantity: number, price: number) => void;
  onClose: () => void;
}

const ProductModifModal: React.FC<ProductModifModalProps> = ({
  visible,
  onProductSelect,
  onClose,
}) => {
  const [products, setProducts] = useState<any[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    if (visible) {
      fetchProducts();
    }
  }, [visible]);

  useEffect(() => {
    filterProducts();
  }, [searchText, products]);

  const fetchProducts = async () => {
    try {
      const response = await fetch(`http://${ipconfig.url}/productos`);
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const filterProducts = () => {
    const filtered = products.filter(
      (product) =>
        product.codprod.toString().includes(searchText) ||
        product.producto.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  const handleSelectProduct = (product: any) => {
    setSelectedProduct(product);
  };

  const handleAddProduct = () => {
    if (!quantity || isNaN(Number(quantity)) || Number(quantity) <= 0) {
      alert('Por favor, ingrese una cantidad válida.');
      return;
    }

    if (!price || isNaN(Number(price)) || Number(price) <= 0) {
      alert('Por favor, ingrese un precio válido.');
      return;
    }

    if (selectedProduct) {
      const productWithDetails = {
        ...selectedProduct,
        quantity: parseInt(quantity),
        price: parseFloat(price),
      };
      onProductSelect(productWithDetails, productWithDetails.quantity, productWithDetails.price);
      setQuantity('');
      setPrice('');
      setSelectedProduct(null);
    }
  };

  if (!visible) return null;

  return (
    <S.ModalContainer>
      <S.ModalContent>
        <S.Title>Seleccionar Producto</S.Title>

        <S.FiltroField
          placeholder="Filtrar por código o descripción"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />

        <S.InputContainer>
          <S.InputField
            placeholder="Cantidad"
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
          <S.InputField
            placeholder="Precio"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </S.InputContainer>

        <S.ListContainer>
          <S.ListContent>
            {filteredProducts.map((item) => (
              <S.TableRow key={item.codprod} onClick={() => handleSelectProduct(item)}>
                <S.CodeCell>{item.codprod}</S.CodeCell>
                <S.DescriptionCell>{item.producto}</S.DescriptionCell>
              </S.TableRow>
            ))}
          </S.ListContent>
        </S.ListContainer>

        {selectedProduct && (
          <S.SelectedProductContainer>
            <S.SelectedProductText>
              <S.Bold>Código:</S.Bold> {selectedProduct.codprod}
            </S.SelectedProductText>
            <S.SelectedProductText>
              <S.Bold>Descripción:</S.Bold> {selectedProduct.producto}
            </S.SelectedProductText>
          </S.SelectedProductContainer>
        )}

        <S.ButtonContainer>
          <S.Button typeColor="add" onClick={handleAddProduct}>Agregar</S.Button>
          <S.Button typeColor="cancel" onClick={onClose}>Cancelar</S.Button>
        </S.ButtonContainer>
      </S.ModalContent>
    </S.ModalContainer>
  );
};

export default ProductModifModal;
