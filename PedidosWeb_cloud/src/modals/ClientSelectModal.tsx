import React, { useEffect, useState } from 'react';
import S from './ClientSelectModal.styles';
import ipconfig from '../types/ipconfig';

interface Client {
  id: string;
  razon: string;
  codigo: string;
}

interface ClientSelectModalProps {
  visible: boolean;
  onSelectClient: (client: Client) => void;
  onClose: () => void;
}

export default function ClientSelectModal({
  visible,
  onSelectClient,
  onClose,
}: ClientSelectModalProps) {
  const [clients, setClients] = useState<Client[]>([]);
  const [filter, setFilter] = useState('');
  const [selectedClientId, setSelectedClientId] = useState<string | null>(null);

  useEffect(() => {
    if (visible) {
      fetchClients();
    }
  }, [visible]);

  const fetchClients = async () => {
    try {
      const response = await fetch(`http://${ipconfig.url}/clientes`);
      if (!response.ok) {
        throw new Error('Error en la respuesta del servidor');
      }
      const data = await response.json();
      const formattedClients = data.map((client: any) => ({
        id: client.nruc,
        razon: client.nomcli,
        codigo: client.codcli,
      }));
      setClients(formattedClients);
    } catch (error) {
      console.error('Error al obtener clientes:', error);
    }
  };

  const filteredClients = clients.filter(client =>
    client.id.includes(filter) || client.razon.toLowerCase().includes(filter.toLowerCase())
  );

  const handleSelectClient = (client: Client) => {
    setSelectedClientId(client.id);
    onSelectClient(client);
  };

  if (!visible) return null;

  return (
    <S.Overlay>
      <S.ModalContent>
        <S.Title>Selecciona un Cliente</S.Title>

        <S.Input
          type="text"
          placeholder="Filtrar por ID o Razón"
          value={filter}
          onChange={e => setFilter(e.target.value)}
        />

        <S.TableContainer>
          <S.TableHeader>
            <S.HeaderID>ID</S.HeaderID>
            <S.HeaderRazon>Razón</S.HeaderRazon>
            <S.HeaderCodigo>Código</S.HeaderCodigo>
          </S.TableHeader>

          <S.TableBody>
            {filteredClients.map((item, index) => (
              <S.TableRow
                key={`${item.id}-${index}`}
                className={selectedClientId === item.id ? 'selected' : ''}
                onClick={() => handleSelectClient(item)}
              >
                <S.CellID>{item.id}</S.CellID>
                <S.CellRazon>{item.razon}</S.CellRazon>
                <S.CellCodigo>{item.codigo}</S.CellCodigo>
              </S.TableRow>
            ))}
          </S.TableBody>
        </S.TableContainer>

        <S.Button onClick={onClose}>Cerrar</S.Button>
      </S.ModalContent>
    </S.Overlay>
  );
}
