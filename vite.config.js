import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import yaml from '@rollup/plugin-yaml'
import markdown from 'unplugin-vue-markdown/vite'
import { createMarkdownExit } from 'markdown-exit'
import Container from 'markdown-it-container'
import Attrs from 'markdown-it-attrs'

const registerExtensions = (md) => {
    const defaultRender = md.renderer.rules.link_close || ((tokens, idx, options, env, self) => self.renderToken(tokens, idx, options))
    md.renderer.rules.link_close = (tokens, idx, options, env, self) => {
        let index = idx - 1
        while (tokens[index]) {
            if (tokens[index].type !== 'link_open') {
                index--
                continue
            }
            if (!tokens[index].attrs) break
            for (const [name] of tokens[index].attrs) {
                if (name !== 'target') continue
                return ' <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" width="16" height="16"><path d="M6.22 8.72a.75.75 0 0 0 1.06 1.06l5.22-5.22v1.69a.75.75 0 0 0 1.5 0v-3.5a.75.75 0 0 0-.75-.75h-3.5a.75.75 0 0 0 0 1.5h1.69L6.22 8.72Z" /><path d="M3.5 6.75c0-.69.56-1.25 1.25-1.25H7A.75.75 0 0 0 7 4H4.75A2.75 2.75 0 0 0 2 6.75v4.5A2.75 2.75 0 0 0 4.75 14h4.5A2.75 2.75 0 0 0 12 11.25V9a.75.75 0 0 0-1.5 0v2.25c0 .69-.56 1.25-1.25 1.25h-4.5c-.69 0-1.25-.56-1.25-1.25v-4.5Z" /></svg>' + defaultRender(tokens, idx, options, env, self)
            }
            break
        }
        return defaultRender(tokens, idx, options, env, self)
    }
    md.use(Attrs)
    md.use(Container, 'spoiler', {
        validate: (params) => params.trim().match(/^spoiler\s+(.*)$/),
        render: (tokens, idx) => {
            var m = tokens[idx].info.trim().match(/^spoiler\s+(.*)$/)
            if (tokens[idx].nesting === 1) {
                return '<details><summary>' + md.utils.escapeHtml(m[1]) + '</summary>\n'
            } else {
                return '</details>\n'
            }
        }
    })
}

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        markdown({
            markdownSetup: registerExtensions,
            wrapperDiv: false,
        }),
        vue({
            include: [/\.vue$/, /\.md$/],
            features: {
                optionsAPI: false,
            }
        }),
        vueDevTools(),
        yaml({
            transform: (data) => {
                if (!Array.isArray(data)) return
                const md = createMarkdownExit()
                registerExtensions(md)
                data.forEach(step => {
                    if (!Array.isArray(step?.questions)) return
                    step.questions.forEach(q => {
                        if (typeof q?.extraInfo !== 'string') return
                        q.extraInfo = md.render(q.extraInfo)
                    })
                })
                return data
            },
        }),
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        },
    },
})
