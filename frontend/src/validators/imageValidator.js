import { MAX_SIZE, ACCEPTED_TYPES } from "../conf/imageProcessingConf"

export function ImageValidator(file) {
  if (!file) {
    return "File is required"
  }

  if (file.size > MAX_SIZE) {
    return "The file is too large"
  }

  if (!ACCEPTED_TYPES.includes(file.type)) {
    return "Unsupported file type"
  }

  return null
}
