import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// The GitHub Pages project site lives under /Teaching-Learning/.
// Override with BASE_PATH=/ (or another value) for other hosts.
const base = process.env.BASE_PATH ?? '/Teaching-Learning/';

export default defineConfig({
  base,
  plugins: [react()],
});
