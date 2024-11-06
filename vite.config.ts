import { defineConfig, PluginOption } from 'vite'
import deno from "@deno/vite-plugin";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  return {
    plugins: [deno(), react()] as PluginOption[],
    resolve: {
      alias: {
        '@/': '/src/'
      },
    },
    build: {
      sourcemap: true,
    }
  }
})
