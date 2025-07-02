import React, { useEffect, useState } from 'react';
import S from './Ubigeo.styles';
import ipconfig from '../types/ipconfig';

interface UbigeoItem {
  ubigeo: string;
  departamento: string;
  provincia: string;
  distrito: string;
}

interface UbigeoModalProps {
  visible: boolean;
  onClose: () => void;
  onSelect: (item: UbigeoItem) => void;
}

const UbigeoModal: React.FC<UbigeoModalProps> = ({ visible, onClose, onSelect }) => {
  const [data, setData] = useState<UbigeoItem[]>([]);
  const [filtered, setFiltered] = useState<UbigeoItem[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (visible) fetchUbigeo();
  }, [visible]);

  const fetchUbigeo = async () => {
    try {
      const res = await fetch(`http://${ipconfig.url}/ubigeo`, {
        headers: {
          Accept: 'application/json',
        },
      });

      if (!res.ok) {
        throw new Error(`Error HTTP: ${res.status}`);
      }

      const json = await res.json();

      if (!Array.isArray(json)) {
        throw new Error('Respuesta inválida del servidor');
      }

      setData(json);
      setFiltered(json);
    } catch (err) {
      console.error('Error al obtener ubigeo:', err);
      setData([]);
      setFiltered([]);
    }
  };

  const handleSearch = (text: string) => {
    setSearch(text);
    const lower = text.toLowerCase();
    const filteredData = data.filter(item =>
      Object.values(item).some(value =>
        value.toLowerCase().includes(lower)
      )
    );
    setFiltered(filteredData);
  };

  if (!visible) return null;

  return (
    <S.ModalOverlay>
      <S.ModalContainer>
        <S.Header>
          <S.Title>Buscar Ubigeo</S.Title>
          <S.CloseButton onClick={onClose}>✕</S.CloseButton>
        </S.Header>

        <S.Input
          type="text"
          placeholder="Buscar por departamento, provincia, distrito..."
          value={search}
          onChange={e => handleSearch(e.target.value)}
        />

        <S.TableWrapper>
          <S.Table>
            <thead>
              <tr>
                <th>Ubigeo</th>
                <th>Departamento</th>
                <th>Provincia</th>
                <th>Distrito</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item, idx) => (
                <tr key={idx} onClick={() => onSelect(item)}>
                  <td>{item.ubigeo}</td>
                  <td>{item.departamento}</td>
                  <td>{item.provincia}</td>
                  <td>{item.distrito}</td>
                </tr>
              ))}
            </tbody>
          </S.Table>
        </S.TableWrapper>
      </S.ModalContainer>
    </S.ModalOverlay>
  );
};

export default UbigeoModal;
