import React, { useState, useEffect } from 'react';
import S from './ClientRegister.styles';
import ipconfig from '../types/ipconfig';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UbigeoModal from './Ubigeo';
import ClientSelectModal from './ClientSelectModal';

interface Client {
  ruc: string;
  razonSocial: string;
  direccion: string;
  telefono: string;
  email: string;
  ubigeo?: string;
  distrito?: string;
}

interface ClientRegisterProps {
  visible: boolean;
  onClose: () => void;
  onSave: (client: Client) => void;
  onDelete: (ruc: string) => void;
  initialData?: Client | null;
}

const ClientRegister: React.FC<ClientRegisterProps> = ({
  visible,
  onClose,
  onSave,
  onDelete,
  initialData = null,
}) => {
  const [client, setClient] = useState<Client>({
    ruc: '',
    razonSocial: '',
    direccion: '',
    telefono: '',
    email: '',
    ubigeo: '',
    distrito: '',
  });

  const [isUbigeoModalVisible, setUbigeoModalVisible] = useState(false);
  const [isClientSearchModalVisible, setClientSearchModalVisible] = useState(false);

  useEffect(() => {
    if (initialData) {
      setClient(prev => ({ ...prev, ...initialData }));
    } else {
      setClient({
        ruc: '',
        razonSocial: '',
        direccion: '',
        telefono: '',
        email: '',
        ubigeo: '',
        distrito: '',
      });
    }
  }, [initialData, visible]);

  const handleInputChange = (field: keyof Client, value: string) => {
    setClient(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveClient = async () => {
    const { ruc, razonSocial, direccion, telefono, email, distrito, ubigeo } = client;

    if (!/^\d+$/.test(client.ruc)) {
      toast.warn('El RUC o DNI debe contener solo números', { position: 'top-right' });
      return;
    }

    try {
      const response = await fetch(`http://${ipconfig.url}/clientes/guardar/${client.ruc}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nomcli: razonSocial,
          direcc: direccion,
          telefono,
          email,
          distrito,
          ubigeo,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success(result.message || 'Cliente guardado correctamente', {
          position: 'top-right',
        });
        onSave(client); // Puedes usar esto para cerrar el modal o refrescar la lista
      } else {
        toast.error(result.error || 'Error al guardar cliente', { position: 'top-right' });
      }
    } catch (error) {
      toast.error('Error en la solicitud al servidor', { position: 'top-right' });
    }
  };

  const handleUbigeoSelect = (item: { ubigeo: string; distrito: string }) => {
    setClient(prev => ({
      ...prev,
      ubigeo: item.ubigeo,
      distrito: item.distrito,
    }));
    setUbigeoModalVisible(false);
  };

  const fetchSunatData = async () => {
    if (client.ruc.length !== 11 && client.ruc.length !== 8) {
      toast.warn('RUC o DNI inválido', { position: 'top-right' });
      return;
    }

    try {
      const response = await fetch(`http://${ipconfig.url}/api/sunat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ruc: client.ruc }),
      });

      const data = await response.json();

      if (data.success) {
        const razon = client.ruc.length === 11 ? data.nombre_o_razon_social : data.nombre_completo;
        const direccion = client.ruc.length === 11 ? data.direccion_completa : '';
        const ubigeo = data.ubigeo || '';
        setClient(prev => ({
          ...prev,
          razonSocial: razon,
          direccion: direccion,
          ubigeo: ubigeo,
        }));
        toast.success('Datos cargados desde SUNAT correctamente.', { position: 'top-right' });
      } else {
        toast.info('No se encontró el RUC o DNI', { position: 'top-right' });
      }
    } catch (error) {
      toast.error('Error al consultar el backend', { position: 'top-right' });
    }
  };

  if (!visible) return null;

  return (
    <S.ModalOverlay>
      <S.ModalContainer>
        <S.HeaderRow>
          <S.Title>{initialData ? 'Editar Cliente' : 'Módulo Clientes'}</S.Title>
          <S.Button type="button" onClick={() => setClientSearchModalVisible(true)}>
            Búsqueda de Clientes
          </S.Button>
        </S.HeaderRow>

        <S.Field>
          <S.Label>RUC / DNI</S.Label>
          <S.Row>
            <S.Input
              type="text"
              value={client.ruc}
              onChange={e => handleInputChange('ruc', e.target.value)}
              maxLength={11}
            />
            <S.Button onClick={fetchSunatData}>Buscar SUNAT</S.Button>
          </S.Row>
        </S.Field>

        <S.Field>
          <S.Label>Razón Social</S.Label>
          <S.Input
            type="text"
            value={client.razonSocial}
            onChange={e => handleInputChange('razonSocial', e.target.value)}
          />
        </S.Field>

        <S.Field>
          <S.Label>Dirección</S.Label>
          <S.Input
            type="text"
            value={client.direccion}
            onChange={e => handleInputChange('direccion', e.target.value)}
          />
        </S.Field>

        <S.Field>
          <S.Label>Teléfono</S.Label>
          <S.Input
            type="text"
            value={client.telefono}
            onChange={e => handleInputChange('telefono', e.target.value)}
          />
        </S.Field>

        <S.Field>
          <S.Label>Email</S.Label>
          <S.Input
            type="email"
            value={client.email}
            onChange={e => handleInputChange('email', e.target.value)}
          />
        </S.Field>

        <S.Field>
          <S.Row style={{ alignItems: 'center', justifyContent: 'space-between' }}>
            <S.Button type="button" onClick={() => setUbigeoModalVisible(true)}>
              Código Ubigeo
            </S.Button>
            <S.InfoText>Campo obligatorio para guías electrónicas</S.InfoText>
          </S.Row>
          <S.Input
            type="text"
            value={client.ubigeo || ''}
            onChange={e => handleInputChange('ubigeo', e.target.value)}
            maxLength={6}
          />
          {client.distrito && (
            <S.DistritoLabel>Distrito seleccionado: {client.distrito}</S.DistritoLabel>
          )}
        </S.Field>

        <S.Actions>
          {initialData && (
            <S.DeleteButton onClick={() => onDelete(client.ruc)}>Eliminar</S.DeleteButton>
          )}
          <S.Button onClick={handleSaveClient}>
            {initialData ? 'Guardar Cambios' : 'Guardar Cliente'}
          </S.Button>
          <S.CancelButton onClick={onClose}>Cancelar</S.CancelButton>
        </S.Actions>

        <UbigeoModal
          visible={isUbigeoModalVisible}
          onClose={() => setUbigeoModalVisible(false)}
          onSelect={handleUbigeoSelect}
        />

        {isClientSearchModalVisible && (
          <ClientSelectModal
            visible={isClientSearchModalVisible}
            onClose={() => setClientSearchModalVisible(false)}
            onSelectClient={async (selectedClient) => {
              try {
                const response = await fetch(`http://${ipconfig.url}/dcliente/${selectedClient.codigo}`);
                if (!response.ok) {
                  throw new Error('Error al obtener detalles del cliente');
                }
                const data = await response.json();
                setClient({
                  ruc: selectedClient.id,
                  razonSocial: selectedClient.razon,
                  direccion: data.direcc || '',
                  telefono: data.telefono || '',
                  email: data.email || '',
                  ubigeo: data.ubigeo || '',
                  distrito: data.distrito || '',
                });
                toast.success('Datos del cliente cargados correctamente.', { position: 'top-right' });
              } catch (err) {
                toast.error('Error al obtener detalles del cliente', { position: 'top-right' });
              }
              setClientSearchModalVisible(false);
            }}
          />
        )}
      </S.ModalContainer>
    </S.ModalOverlay>
  );
};

export default ClientRegister;
