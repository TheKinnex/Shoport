import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: './', // Cambia esto según el nombre de tu repositorio.
  plugins: [react()],
});

