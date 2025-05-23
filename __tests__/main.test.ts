import { calculateDiffResults, createTempDirs } from '../src/main'
import { expect, jest } from '@jest/globals'
import * as utils from '../src/utils.js'
import * as io from '@actions/io'
import * as gradle from '../src/gradle.js'
import * as diff from '../src/diff.js'
import { TempDirs } from '../src/types'

describe('main.ts', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('createTempDirs', () => {
    const createTempDirectory = jest.spyOn(utils, 'createTempDirectory')
    const mkdirP = jest.spyOn(io, 'mkdirP')

    it('test', async () => {
      const tempDir = '/temp'

      createTempDirectory.mockResolvedValueOnce(tempDir)
      mkdirP.mockResolvedValue()

      const result = await createTempDirs()

      expect(result).toEqual({
        root: '/temp',
        result: '/temp/result'
      })
      expect(mkdirP).toHaveBeenCalledWith('/temp/result')
    })
  })

  describe('calculateDiffResults', () => {
    const mockGenerateDependenciesFiles = jest.spyOn(
      gradle,
      'generateDependenciesFiles'
    )
    const mockCalculateDiffResults = jest.spyOn(diff, 'calculateDiffResults')

    it('test', async () => {
      const tempDirs: TempDirs = {
        root: '/temp',
        result: '/temp/result'
      }

      mockGenerateDependenciesFiles.mockResolvedValue()
      mockCalculateDiffResults.mockResolvedValueOnce([
        {
          project: 'p1',
          configuration: 'c1',
          result: 'r1'
        },
        {
          project: 'p2',
          configuration: 'c1',
          result: 'r2'
        }
      ])
      mockCalculateDiffResults.mockResolvedValueOnce([
        {
          project: 'p1',
          configuration: 'c2',
          result: 'r3'
        }
      ])

      const result = await calculateDiffResults(
        'jarPath',
        ['c1', 'c2'],
        'old',
        'new',
        tempDirs
      )
      expect(result).toEqual([
        {
          project: 'p1',
          configuration: 'c1',
          result: 'r1'
        },
        {
          project: 'p1',
          configuration: 'c2',
          result: 'r3'
        },
        {
          project: 'p2',
          configuration: 'c1',
          result: 'r2'
        }
      ])
    })
  })
})
