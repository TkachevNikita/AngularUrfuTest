import { Direction } from '../types/direction.type';

export interface IProgram {
    id: number,
    direction: Direction
    cypher: string,
    name: string
}
