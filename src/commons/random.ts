import { func } from "joi"

export function getGUID() {
  let sectionLength = Date.now()
  let id = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    let r = Math.floor((sectionLength + Math.random() * 16) % 16)
    sectionLength = Math.floor(sectionLength / 16)
    // eslint-disable-next-line no-bitwise
    let guid = (c === 'x' ? r : (r & 7) | 8).toString(16)
    return guid
  })
  return id
}

export function getRandomInt(min: number, max: number) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}
