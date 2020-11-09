export function getFileType(filename: string): string {
  let fileExt = filename.slice(filename.length - 3, filename.length)

  if (fileExt === 'png' || fileExt === 'jpg') return 'image'
  if (fileExt === 'mp3') return 'audio'

  return 'file'
}
