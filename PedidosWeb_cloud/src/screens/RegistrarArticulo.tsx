import React, { useState, useEffect } from 'react';
import ipconfig from '../types/ipconfig';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import S from './RegistrarArticulo.styles';
import { FaBarcode, FaSave } from 'react-icons/fa';

const unidades = ['UND', 'CJA', 'KG', 'PQT', 'GL'];

export default function RegistrarArticulo() {
  const [scanning, setScanning] = useState(false);
  const [barcode, setBarcode] = useState('');
  const [description, setDescription] = useState('');
  const [customCode, setCustomCode] = useState('');
  const [linea, setLinea] = useState('');
  const [sublinea, setSublinea] = useState('');
  const [unidad, setUnidad] = useState('');
  const [lineas, setLineas] = useState<{ codlin: string; linea: string }[]>([]);
  const [sublineas, setSublineas] = useState<{ sublin: string; grupo: string }[]>([]);

  useEffect(() => {
    fetchLineas();
  }, []);

  const startScanning = () => setScanning(true);
  const stopScanning = () => setScanning(false);

  const fetchNextCodProdByPrefix = async (prefix: string) => {
    try {
      const response = await fetch(`http://${ipconfig.url}/codprod/${prefix}`);
      if (!response.ok) throw new Error('Error al obtener el código');
      const data = await response.json();
      setCustomCode(data.nextCodProd.toString());
    } catch (error: any) {
      console.error(error);
      toast.error('No se pudo obtener el próximo código personalizado.');
    }
  };

  const fetchLineas = async () => {
    try {
      const res = await fetch(`http://${ipconfig.url}/lineas`);
      const data = await res.json();
      setLineas(data);
    } catch (err) {
      console.error('Error al obtener líneas:', err);
      toast.error('No se pudieron cargar las líneas.');
    }
  };

  const fetchSublineas = async (lineaCod: string) => {
    const firstDigit = lineaCod.replace(/\D/g, '').charAt(0);
    if (!firstDigit) return;

    try {
      const res = await fetch(`http://${ipconfig.url}/sublineas?linea=${firstDigit}`);
      const data = await res.json();
      setSublineas(data);
    } catch (err) {
      console.error('Error al obtener sublíneas:', err);
      toast.error('No se pudieron cargar las sublíneas.');
    }
  };

  useEffect(() => {
    if (scanning) {
      const scanner = new Html5QrcodeScanner('reader', {
        fps: 10,
        qrbox: 250,
      }, false);

      scanner.render(
        (decodedText) => {
          scanner.clear();
          setBarcode(decodedText.toUpperCase());
          stopScanning();
        },
        () => {}
      );

      return () => {
        scanner.clear().catch(() => {});
      };
    }
  }, [scanning]);

  const handleLineaChange = (value: string) => {
    setLinea(value);
    setSublinea('');
    fetchSublineas(value);
  };

  const handleSublineaChange = (value: string) => {
    setSublinea(value);
    const numericPrefix = value.replace(/\D/g, '').substring(0, 3);
    if (numericPrefix) {
      fetchNextCodProdByPrefix(numericPrefix);
    }
  };

  const handleSave = async () => {
    if (!description || !customCode || !linea || !sublinea || !unidad) {
      toast.error('Completa todos los campos antes de guardar.');
      return;
    }

    try {
      const response = await fetch(`http://${ipconfig.url}/add-product`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          codprod: customCode,
          producto: description,
          parnumb: barcode || null,
          linea,
          sublinea,
          unidad,
        }),
      });

      if (!response.ok) throw new Error('Error al guardar el producto.');

      const data = await response.json();
      toast.success(data.message || 'Producto guardado exitosamente.');

      setCustomCode('');
      setBarcode('');
      setDescription('');
      setLinea('');
      setSublinea('');
      setUnidad('');
    } catch (error: any) {
      console.error(error);
      toast.error('No se pudo guardar el producto.');
    }
  };

  return (
    <S.Container>
      <S.Inner>
        {scanning ? (
          <S.CameraContainer>
            <div id="reader" style={{ width: '100%' }} />
            <S.CloseButton onClick={stopScanning}>Cerrar Escáner</S.CloseButton>
          </S.CameraContainer>
        ) : (
          <>
            <S.Header>
              <S.Title>Registro de Artículo</S.Title>
              <S.DescriptionText>Escanea y completa la información del nuevo producto</S.DescriptionText>
            </S.Header>

            <S.ButtonRow>
              <S.ButtonScan onClick={startScanning}><FaBarcode /> Escanear Código</S.ButtonScan>
            </S.ButtonRow>

            <S.Row>
              <S.InputCustomCode
                value={customCode}
                placeholder="Código Personalizado"
                onChange={(e) => setCustomCode(e.target.value.toUpperCase())}
                disabled
              />
              <S.InputBarcode
                value={barcode}
                placeholder="Código de Barras Escaneado"
                onChange={(e) => setBarcode(e.target.value.toUpperCase())}
              />
            </S.Row>

            <S.Input
              value={description}
              placeholder="Descripción del Artículo"
              onChange={(e) => setDescription(e.target.value.toUpperCase())}
            />

            <S.PickerRow>
              <S.Select value={linea} onChange={(e) => handleLineaChange(e.target.value)}>
                <option value="">Seleccionar Línea</option>
                {lineas.map((l, i) => (
                  <option key={i} value={l.codlin}>
                    {l.codlin} | {l.linea}
                  </option>
                ))}
              </S.Select>

              <S.Select value={sublinea} onChange={(e) => handleSublineaChange(e.target.value)}>
                <option value="">Seleccionar Sublínea</option>
                {sublineas.map((s, i) => (
                  <option key={i} value={s.sublin}>{s.sublin} | {s.grupo}</option>
                ))}
              </S.Select>

              <S.Select value={unidad} onChange={(e) => setUnidad(e.target.value)}>
                <option value="">Unidad de Medida</option>
                {unidades.map((u, i) => (
                  <option key={i} value={u}>{u}</option>
                ))}
              </S.Select>
            </S.PickerRow>

            <S.ButtonSave onClick={handleSave}><FaSave /> Guardar</S.ButtonSave>
          </>
        )}
      </S.Inner>
    </S.Container>
  );
}
