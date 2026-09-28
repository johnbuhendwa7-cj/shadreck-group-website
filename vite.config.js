import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
export default defineConfig({base:'./', plugins:[react()], build:{rollupOptions:{input:['index.html','services.html','work-equipment.html','about-contact.html'],output:{entryFileNames:'assets/[name].js',chunkFileNames:'assets/[name].js',assetFileNames:'assets/[name][extname]'}}}});
