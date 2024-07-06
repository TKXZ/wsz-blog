import { defineConfig } from 'vitepress'
import { generateSideBar } from '../src/utils/generate'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'WSZ的CS小窝',
  description: '收集各种计算机知识',
  outDir: 'dist',
  base: '/wsz-blog/',
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      {
        text: '前端阶梯',
        items: [
          {
            text: 'JavaScript',
            link: '/src/docs/learn/FrontEnd/JavaScript',
          },
        ],
      },
      {
        text: '前端',
        items: [
          {
            text: 'JavaScript',
            link: '/src/docs/FrontEnd/JavaScript',
          },
        ],
      },
    ],

    sidebar: generateSideBar(),
  },
})
