import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/ifal/',
  title: "Neo Chatbots",
  description: "Neo Chatbots",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Preço', link: '/preco' }
    ],
  }
})
