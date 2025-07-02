import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  base: '/app/PedidoWeb/',

  plugins: [react()],

  resolve: {
    alias: {
      'xxx': 'xxx-web', // Asegúrate de tener la carpeta o librería adecuada para este alias
      '@': path.resolve(__dirname, 'src'),
    },
  },

  build: {
    outDir: 'dist',
    sourcemap: false,
  },

  define: {
    'process.env': {}, // Para evitar errores de librerías que esperan variables de entorno Node
  },

  server: {
    host: true, // Esto permite que la app se abra desde otra PC o celular de la red local
    port: 5173, // Cambia si ya usas este puerto
  },
});
