import React from 'react'
import { MAX_SIZE, ACCEPTED_TYPES } from "../../src/conf/imageProcessingConf.js"
import { ImageValidator } from "../../src/validators/imageValidator.js"
import {MockFile} from '../factories/mockFile.js'

describe("Testing Image Validator Component", () => {

  it("should display an error if the file is too large", async () => {
    const mockLargeFile = new MockFile("test.jpg", MAX_SIZE + 6, ACCEPTED_TYPES[0])
    const largeFile = mockLargeFile.getMockFile()

    const resultValidations = ImageValidator(largeFile)
    expect(resultValidations).toBe("The file is too large")
  })

  it("should display an error if the file type is unsupported", () => {
    const unsupportedMockFile = new MockFile("test.txt", MAX_SIZE - 23, "text/plain")
    const unsupportedFile = unsupportedMockFile.getMockFile()

    const resultValidations = ImageValidator(unsupportedFile)
    expect(resultValidations).toBe("Unsupported file type")
  })

  it("should return null if it ok", async () => {
    const validMockFile =  new MockFile("test.jpg", MAX_SIZE - 3, ACCEPTED_TYPES[0])
    const validFile = validMockFile.getMockFile()

    const resultValidations = ImageValidator(validFile)
    expect(resultValidations).toBe(null)
  })
})