import { getRandomInt } from '../../../commons/random'

export function getMessageID() {
  return getRandomInt(450869015250, 990869015250).toString()
}

