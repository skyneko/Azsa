import { ILogType } from '../@types'

import color from './console-color'

export default function log (type: ILogType, ...text: any) {
  if (text.length === 0) {
    console.log(type)

    return
  }

  let isError = false

  let textColor = color.Fg.white
  let backgroundColor = ''

  let temp = type.split('-')
  
  if (temp.length === 2) {
    //@ts-ignore
    textColor = (color.Fg[temp[0]]) ? color.Fg[temp[0]] : '' 
    //@ts-ignore
    backgroundColor = (color.Bg[temp[1]]) ? color.Bg[temp[1]] : ''

  } else {
    if (type === 'info') textColor = color.Fg.green
    if (type === 'warn') textColor = color.Fg.yellow
    if (type === 'error') {
      textColor = color.Fg.red
      isError = true
    }
  }

  if (isError) {
    console.error(color.Bg.red, color.Fg.white, '[ ERROR ]', color.Reset, Error(text))
  } else {
    console.log(textColor, backgroundColor, text.join(''))
  }
}
