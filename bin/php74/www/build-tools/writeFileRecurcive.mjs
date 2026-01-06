import { writeFile, mkdir } from 'fs/promises'
import path from 'path'
import exists from 'fs.promises.exists'

export async function writeFileRecursive (filename, content, charset = 'UTF-8') {
  const filePathParts = filename.split(path.sep)

  if (filePathParts.length > 1) {
    let folderPath = filePathParts.slice(0, filePathParts.length - 1)
    folderPath = folderPath.join(path.sep)
    const folderExists = await exists(folderPath)

    if (!folderExists) {
      await mkdir(folderPath, { recursive: true })
    }
  }

  return writeFile(filename, content, charset)
}
