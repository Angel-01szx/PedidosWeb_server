import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { MdCheckCircle, MdEdit, MdDelete, MdInfo } from 'react-icons/md';
import { toast } from 'react-toastify';
import S from './ReportsScreen.styles';
import ipconfig from '../types/ipconfig';
import { Storage } from '../utils/storage';
import DetailsPedidoModal from '../modals/DetailsPedidoModal';
import EditPedidoModal from '../modals/EditPedidoModal';
import CajaModal from '../modals/CajaModal';
import { FaPen, FaInfoCircle, FaTrashAlt } from "react-icons/fa";
import CajeroModal from '../modals/CajeroModal';

interface Reporte {
  fechped: string;
  sedarea: string;
  ordped: number;
  codcli: string;
  total: string;
  acta: string;
}

const getLocalDate = (): string => new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
  .toISOString().split('T')[0];

const ReportsScreen: React.FC = () => {
  // Agrupa varios estados
  const [dates, setDates] = useState({ inicio: getLocalDate(), fin: getLocalDate() });
  const [showDatePicker, setShowDatePicker] = useState<{ inicio: boolean; fin: boolean }>({ inicio: false, fin: false });
  const [reportes, setReportes] = useState<Reporte[]>([]);
  const [personalData, setPersonalData] = useState<{ ptventa: string; nombre: string }[]>([]);
  const [ptventa, setPtventa] = useState('');
  const [pickerValue, setPickerValue] = useState('');
  const [sede, setSede] = useState('');
  const [isCajaAuthorized, setIsCajaAuthorized] = useState(false);
  const [showAdditionalControls, setShowAdditionalControls] = useState(false);

  // Modals y selección
  const [modal, setModal] = useState({
    detalle: false,
    edit: false,
    caja: false,
    cajero: false,
    anul: false,
  });
  const [pedidoAEditar, setPedidoAEditar] = useState<Reporte | null>(null);
  const [pedidoAAnular, setPedidoAAnular] = useState<Reporte | null>(null);
  const [detallePedido, setDetallePedido] = useState<any[]>([]);
  const [datosFila, setDatosFila] = useState<any>(null);
  const [cajeroNombre, setCajeroNombre] = useState<string | null>(null);
  const [detalleProps, setDetalleProps] = useState({ codcli: '', serie: '', fecha: '', ordped: '' });

  useEffect(() => {
    (async () => {
      const [storedSede, storedCodper, nivel] = await Promise.all([
        Storage.getItem('sede'),
        Storage.getItem('codper'),
        Storage.getItem('nivel')
      ]);
      if (storedSede) setSede(storedSede);
      if (storedCodper && ['000024', '000025', '000026'].includes(storedCodper)) setShowAdditionalControls(true);
      setIsCajaAuthorized(nivel !== '2');
      try {
        const res = await fetch(`http://${ipconfig.url}/personal`);
        setPersonalData(await res.json());
      } catch (error) { console.error('Error al obtener personal:', error); }
    })();
  }, []);

  // MODAL: anulación avanzada
  const handleAnul = async () => {
    if (!pedidoAAnular) return;
    const { sedarea, ordped } = pedidoAAnular;
    try {
      const response = await fetch(`http://${ipconfig.url}/anulped`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sedarea, ordped }),
      });
      const data = await response.json();
      if (response.ok) {
        setReportes(rs => rs.map(r =>
          r.ordped === ordped && r.sedarea === sedarea
            ? { ...r, total: "0.00", acta: "ANULADO" }
            : r
        ));
        toast.success('Pedido anulado correctamente');
      } else {
        toast.error(data.error || 'No se pudo anular el pedido');
      }
    } catch {
      toast.error('Error al anular el pedido');
    } finally {
      setModal(m => ({ ...m, anul: false }));
      setPedidoAAnular(null);
    }
  };

  const handleConsulta = async () => {
    if (!ptventa) return toast.info('Selecciona un punto de venta.');
    try {
      const response = await fetch(`http://${ipconfig.url}/reportes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sedarea: `${sede}${ptventa}`,
          fechaInicio: dates.inicio,
          fechaFin: dates.fin,
        }),
      });
      setReportes(await response.json());
      toast.success('Consulta exitosa');
    } catch {
      toast.error('Error en la consulta');
    }
  };

  const handleEstados = async () => {
    if (!pickerValue || !dates.inicio || !dates.fin) return toast.info('Completa los campos requeridos');
    try {
      const response = await fetch(
        `http://${ipconfig.url}/estados?estado=${pickerValue}&fechaInicio=${dates.inicio}&fechaFin=${dates.fin}`
      );
      const data = await response.json();
      setReportes(data.pedidos || []);
      toast.success(`Se encontraron ${data.pedidos.length} pedidos.`);
    } catch {
      toast.error('Error al consultar los estados');
    }
  };

  const handleMostrarModalCaja = (item: Reporte) => {
    if (!isCajaAuthorized) return toast.info('Acceso denegado');
    setDatosFila(item);
    setModal(m => ({ ...m, caja: true }));
  };

  const handleEdit = async (pedido: Reporte) => {
    setPedidoAEditar(pedido);
    const dpedido = `${pedido.fechped.split('-')[0]}${pedido.sedarea}${pedido.ordped}`;
    const res = await fetch(`http://${ipconfig.url}/dreportes?dpedido=${dpedido}`);
    setDetallePedido(await res.json());
    setModal(m => ({ ...m, edit: true }));
  };

  const handleFilaSeleccionada = async (item: Reporte) => {
    setDetalleProps({
      codcli: item.codcli,
      serie: item.sedarea,
      fecha: item.fechped,
      ordped: item.ordped.toString()
    });
    const dpedido = `${dates.inicio.split('-')[0]}${item.sedarea}${item.ordped}`;
    const res = await fetch(`http://${ipconfig.url}/dreportes?dpedido=${dpedido}`);
    setDetallePedido(await res.json());
    setModal(m => ({ ...m, detalle: true }));
  };

  // Calendar/modal helpers
  const handleDateChange = (field: 'inicio' | 'fin', date: Date | null) => {
    if (!date) return;
    setDates(d => ({ ...d, [field]: date.toISOString().split('T')[0] }));
    setShowDatePicker(p => ({ ...p, [field]: false }));
  };

  // Render
  return (
    <S.Container>
      {/* Modal de confirmación de anulación */}
      {modal.anul && (
        <S.ModalOverlay>
          <S.Modal>
            <S.ModalTitle>¿Anular pedido?</S.ModalTitle>
            <S.ModalMessage>
              ¿Seguro que deseas <b>anular</b> el pedido<br />
              <b>Serie:</b> {pedidoAAnular?.sedarea} <br />
              <b>N°:</b> {pedidoAAnular?.ordped} ?
            </S.ModalMessage>
            <S.ModalActions>
              <S.ModalButton color="primary" onClick={handleAnul}>Sí, anular</S.ModalButton>
              <S.ModalButton onClick={() => { setModal(m => ({ ...m, anul: false })); setPedidoAAnular(null); }}>Cancelar</S.ModalButton>
            </S.ModalActions>
          </S.Modal>
        </S.ModalOverlay>
      )}

      <p>Pantalla de Reportes</p>

      <S.Button onClick={() => setShowDatePicker(d => ({ ...d, inicio: true }))}>
        <S.ButtonText>Seleccionar Fecha de Inicio</S.ButtonText>
      </S.Button>
      {showDatePicker.inicio && (
        <S.CalendarModal>
          <S.CalendarBox>
            <S.CustomDatePicker>
              <DatePicker
                selected={new Date(dates.inicio)}
                onChange={d => handleDateChange('inicio', d)}
                inline dateFormat="yyyy-MM-dd"
              />
            </S.CustomDatePicker>
            <S.CloseButton onClick={() => setShowDatePicker(p => ({ ...p, inicio: false }))}>Cerrar</S.CloseButton>
          </S.CalendarBox>
        </S.CalendarModal>
      )}
      <S.Input value={dates.inicio} readOnly />

      <S.Button onClick={() => setShowDatePicker(d => ({ ...d, fin: true }))}>
        <S.ButtonText>Seleccionar Fecha de Fin</S.ButtonText>
      </S.Button>
      {showDatePicker.fin && (
        <S.CalendarModal>
          <S.CalendarBox>
            <S.CustomDatePicker>
              <DatePicker
                selected={new Date(dates.fin)}
                onChange={d => handleDateChange('fin', d)}
                inline dateFormat="yyyy-MM-dd"
              />
            </S.CustomDatePicker>
            <S.CloseButton onClick={() => setShowDatePicker(p => ({ ...p, fin: false }))}>Cerrar</S.CloseButton>
          </S.CalendarBox>
        </S.CalendarModal>
      )}
      <S.Input value={dates.fin} readOnly />

      <S.Picker value={ptventa} onChange={e => setPtventa(e.target.value)}>
        <option value="">Seleccionar Punto de Venta</option>
        {personalData.map((item, i) => (
          <option key={i} value={item.ptventa}>
            {item.ptventa}. {item.nombre}
          </option>
        ))}
      </S.Picker>

      <S.Button onClick={handleConsulta}>
        <S.ButtonText>Consultar Reportes</S.ButtonText>
      </S.Button>

      <S.TableHeader>
        <S.HeaderCell>Estado</S.HeaderCell>
        <S.HeaderCell>Fecha</S.HeaderCell>
        <S.HeaderCell>Serie</S.HeaderCell>
        <S.HeaderCell>Pedido</S.HeaderCell>
        <S.HeaderCell>Cliente</S.HeaderCell>
        <S.HeaderCell>Total</S.HeaderCell>
        <S.HeaderCell>Acciones</S.HeaderCell>
      </S.TableHeader>

      {reportes.map((item, index) => (
        <S.Row key={index} onClick={() => handleFilaSeleccionada(item)} style={{ cursor: 'pointer' }}>
          <div
            onClick={e => {
              e.stopPropagation();
              toast.info(
                item.total === "0.00" ? "Anulado"
                  : item.total === item.acta ? "Confirmado"
                    : "Pendiente"
              );
            }}
          >
            <MdCheckCircle
              size={20}
              color={
                item.total === "0.00" ? "red"
                  : item.total === item.acta ? "green"
                    : "orange"
              }
            />
          </div>
          <S.Cell>{item.fechped}</S.Cell>
          <S.Cell>{item.sedarea}</S.Cell>
          <S.Cell>{item.ordped}</S.Cell>
          <S.Cell>{item.codcli}</S.Cell>
          <S.Cell>{item.total}</S.Cell>
          <S.ButtonsContainer>
            <div onClick={e => { e.stopPropagation(); handleEdit(item); }}>
              <FaPen size={20} color="#2563eb" />
            </div>
            <div onClick={e => { e.stopPropagation(); handleMostrarModalCaja(item); }}>
              <FaInfoCircle size={20} color="#22c55e" />
            </div>
            <div
              onClick={e => {
                e.stopPropagation();
                setPedidoAAnular(item);
                setModal(m => ({ ...m, anul: true }));
              }}
            >
              <FaTrashAlt size={20} color="#e11d48" />
            </div>
          </S.ButtonsContainer>
        </S.Row>
      ))}


      {showAdditionalControls && (
        <S.AdditionalControls>
          <S.AdditionalButton onClick={handleEstados}>Filtrar Pedidos</S.AdditionalButton>
          <S.PickerAdditional value={pickerValue} onChange={e => setPickerValue(e.target.value)}>
            <option value="">Seleccionar un estado</option>
            <option value="CONFIRMADO">CONFIRMADO</option>
            <option value="ANULADO">ANULADO</option>
          </S.PickerAdditional>
        </S.AdditionalControls>
      )}

      <DetailsPedidoModal
        visible={modal.detalle}
        onClose={() => setModal(m => ({ ...m, detalle: false }))}
        detalles={detallePedido}
        cliente={{
          nomcli: detalleProps.codcli, // ← aquí normalmente sería nombre y no el código!
          nruc: ''                     // ← aquí normalmente sería el ruc!
        }}
        fecha={detalleProps.fecha}
        serie={detalleProps.serie}
        pedido={detalleProps.ordped}
      />

      <EditPedidoModal
        visible={modal.edit}
        onClose={() => setModal(m => ({ ...m, edit: false }))}
        pedido={pedidoAEditar}
        detalles={detallePedido}
        onProductSelect={() => { }}
      />

      <CajaModal
        visible={modal.caja}
        onClose={() => setModal(m => ({ ...m, caja: false }))}
        datos={datosFila}
      />

      <CajeroModal
        visible={modal.cajero}
        onClose={() => setModal(m => ({ ...m, cajero: false }))}
        cajeroNombre={cajeroNombre}
      />
    </S.Container>
  );
};

export default ReportsScreen;
