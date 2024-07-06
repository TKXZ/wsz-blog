import { ROOT, V_DOCS } from '../../constants/path'
import fs from 'node:fs'
import path from 'node:path'

// 是否是文件
function isFile(path: string): boolean {
  return fs.statSync(path).isFile()
}

export function generateSideBar() {
  const data: any = {}
  const DOC_ROOT = path.join(ROOT, V_DOCS)
  /**
   *
   * @param pPath 父目录绝对路径
   * @param v_pPath 父目录Vite路径(以项目为根路径)
   */
  function recursive(pPath = DOC_ROOT, v_pPath = V_DOCS) {
    const catalogs = fs.readdirSync(pPath)
    catalogs.forEach((c) => {
      const newViteParentPath = path.join(v_pPath, c)
      const newParentPath = path.resolve(pPath, c)
      // 是文件夹
      if (!isFile(newParentPath)) {
        const catalogKey = newViteParentPath.replace(/\\/g, '/') + '/'
        data[catalogKey] ?? (data[catalogKey] = [])
        data[catalogKey].push({
          text: c,
          items: [],
        })
        recursive(newParentPath, newViteParentPath)
      }
      // 是文件
      else {
        const dirname = path.dirname(newViteParentPath.replace(/\\/g, '/')) + '/'
        data[dirname][0].items.push({
          text: c.replace(path.extname(c), ''),
          link: newViteParentPath.replace(/\\/g, '/'),
        })
      }
    })
  }
  recursive()
  return data
}
