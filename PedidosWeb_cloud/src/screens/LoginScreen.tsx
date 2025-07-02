// LoginScreen.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Storage } from '../utils/storage';
import ipconfig from '../types/ipconfig';
import { motion } from 'framer-motion';
import S from './LoginScreen.styles';
import Logo from '../assets/logo.jpg';

type Sede = {
  sede: string;
  descrip: string;
};

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedSede, setSelectedSede] = useState('');
  const [sedes, setSedes] = useState<Sede[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://${ipconfig.url}/sedes`)
      .then(res => res.json())
      .then(data => {
        setSedes(data);
        if (data.length > 0) setSelectedSede(data[0].sede); // Primera sede por defecto
      })
      .catch(() => setErrorMessage('No se pudieron cargar las sedes.'));
  }, []);

  const handleLogin = async () => {
    try {
      const response = await fetch(`http://${ipconfig.url}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok && data.message === 'Autenticación exitosa') {
        if (data.codper && data.ptventa) {
          await Storage.setItem('codper', data.codper);
          await Storage.setItem('ptventa', data.ptventa);
          await Storage.setItem('sede', selectedSede);
          await Storage.setItem('nivel', data.nivel);
          navigate('/menu', { replace: true });
        } else {
          setErrorMessage('Datos de usuario incompletos. Intenta de nuevo.');
        }
      } else {
        setErrorMessage('Credenciales incorrectas. Intenta de nuevo.');
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('Error en la conexión. Intenta más tarde.');
    }
  };

  const handleExitApp = () => {
    if (window.confirm('¿Estás seguro de que deseas salir?')) {
      window.close();
    }
  };

  return (
    <S.Background>
      <S.Container>
        {/* Logo SVG centrado */}
        <S.LogoContainer>
          <svg width="480" height="120" viewBox="0 0 480 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g>
              <rect x="20" y="25" width="70" height="70" rx="16" fill="#21D375" />
              <rect x="38" y="45" width="35" height="8" rx="4" fill="#fff" />
              <rect x="38" y="65" width="50" height="8" rx="4" fill="#fff" />
              <circle cx="50" cy="85" r="6" fill="#fff" />
              <circle cx="72" cy="85" r="6" fill="#fff" />
            </g>
            <text x="110" y="80" font-family="Blinker, Arial, Helvetica, sans-serif" font-size="54" font-weight="bold" letter-spacing="2">
              <tspan fill="#21D375">Pedidos</tspan><tspan fill="#222">Web</tspan>
            </text>
          </svg>

        </S.LogoContainer>

        <S.Title>Iniciar Sesión</S.Title>

        {errorMessage && <S.Error>{errorMessage}</S.Error>}

        <S.PickerContainer>
          <S.Picker value={selectedSede} onChange={e => setSelectedSede(e.target.value)}>
            {sedes.map(({ sede, descrip }) => (
              <option key={sede} value={sede}>
                {sede}. {descrip}
              </option>
            ))}
          </S.Picker>
        </S.PickerContainer>

        <S.Input
          type="text"
          placeholder="Usuario"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <S.Input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <S.Button onClick={handleLogin}>Iniciar Sesión</S.Button>
        <S.ExitButton onClick={handleExitApp}>Salir</S.ExitButton>
      </S.Container>
    </S.Background>
  );

}
