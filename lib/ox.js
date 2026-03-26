import { Bytes, Hash } from 'ox'

export function hashTaskContent(value) {
  return Hash.keccak256(Bytes.fromString(value), { as: 'Hex' })
}
