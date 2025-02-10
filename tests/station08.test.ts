import { describe, expect, it } from 'vitest'
import { open } from 'node:fs/promises'

describe('Station08', () => {
  it('git-log.txtにログが出力されている', async () => {
    const file = (await open('./git-log.txt')).readLines()
    const iterator = file[Symbol.asyncIterator]()
    const line1 = (await iterator.next()).value

    // BOM除去してからテスト
    const cleanedLine = line1.replace(/^\uFEFF/, '')
    const result = /^commit/.test(cleanedLine)

    expect(result).toBeTruthy()
  })

  it('git-diff.txtに差分が出力されている', async () => {
    const file = (await open('./git-diff.txt')).readLines()
    const iterator = file[Symbol.asyncIterator]()
    const line1 = (await iterator.next()).value

    // こっちもBOM消す
    const cleanedLine = line1.replace(/^\uFEFF/, '')
    const result = /^diff --git/.test(cleanedLine)

    expect(result).toBeTruthy()
  })
})
