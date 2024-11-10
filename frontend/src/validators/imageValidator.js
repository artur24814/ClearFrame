export function ImageValidator(file) {
  const MAX_SIZE = 5 * 1024 * 1024
  const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/jpg", "image/webp"]
  
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
