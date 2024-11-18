export class MockFile {
  constructor (name = "mock.txt", size = 1024, mimeType = "plain/txt") {
    this.name = name
    this.size = size
    this.mimeType = mimeType
  }

  getContent = (count) => {
    let output = ""
    for (let i = 0; i < count; i++) {
      output += "a"
    }
    return output
  }

  getMockFile() {
    const blob = new Blob([this.getContent(this.size)], { type: this.mimeType })
    blob.lastModifiedDate = new Date()
    blob.name = this.name
    return new File([blob], this.name, { type: this.mimeType, lastModified: Date.now() })
  }
}