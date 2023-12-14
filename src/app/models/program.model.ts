import { IProgram } from "../interfaces/program.interface";
import { Direction } from "../types/direction.type";

export class ProgramModel {
    public readonly id: number;
    public readonly direction: Direction
    public readonly cypher: string;
    public readonly name: string;

    constructor(program: IProgram) {
        this.id = program.id;
        this.direction = program.direction;
        this.cypher = program.cypher;
        this.name = program.name;
    }
}
