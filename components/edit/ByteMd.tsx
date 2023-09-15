// import gfm from '@bytemd/plugin-gfm'
import breaks from '@bytemd/plugin-breaks'
import frontmatter from '@bytemd/plugin-frontmatter'
import gemoji from '@bytemd/plugin-gemoji'
import gfm from '@bytemd/plugin-gfm'
import highlight from '@bytemd/plugin-highlight'
import math from '@bytemd/plugin-math'
import mediumZoom from '@bytemd/plugin-medium-zoom'
import mermaid from '@bytemd/plugin-mermaid'
import 'bytemd/dist/index.css'
import 'highlight.js/styles/vs.css'
import 'katex/dist/katex.css'
import { Editor, Viewer } from '@bytemd/react'
import { BytemdPlugin } from 'bytemd';

// function stripPrefixes(obj: Record<string, any>) {
//       return Object.entries(obj).reduce((p, [key, value]) => {
//             p[key.split('/').slice(-1)[0].replace('.json', '')] = value
//             // console.log(p)
//             return p
//       }, {} as Record<string, any>)
// }


let enabled = {
      breaks: false,
      frontmatter: true,
      gemoji: true,
      gfm: true,
      highlight: true,
      math: true,
      'medium-zoom': true,
      mermaid: true,
}
const plugins: BytemdPlugin[] = [
      enabled.breaks && breaks(),
      enabled.frontmatter && frontmatter(),
      enabled.gemoji && gemoji(),
      enabled.gfm && gfm(),
      enabled.highlight && highlight(),
      enabled.math && math(),
      enabled['medium-zoom'] && mediumZoom(),
      enabled.mermaid &&
      mermaid(),
].filter((x) => x) as BytemdPlugin[]

interface PropsModel {
      value: string,
      setValue: Function
}
const ByteMd: React.FC<PropsModel> = ({ value, setValue }) => {
      return (
            <Editor
                  value={value}
                  plugins={plugins}
                  onChange={(v) => {
                        setValue(v)
                  }}
            />
      )
}

export default ByteMd;