import { IProgramDetails } from "../interfaces/program-details.interface";
import { Chair } from "../types/chair.type";
import { Duration } from "../types/duration.type";
import { Head } from "../types/head.type";
import { Institute } from "../types/institute.type";

export class ProgramDetailsModel {
    public readonly id: number;
    public readonly cypher: string;
    public readonly chair: Chair;
    public readonly name: string;
    public readonly institute: Institute;
    public readonly uniId: string;
    public readonly level: string;
    public readonly standard: string;
    public readonly head: Head;
    public readonly startYear: number;
    public readonly duration: Duration;
    public readonly hasForeignContent: string;
    public readonly isBeingAccredited: boolean;
    public readonly accreditationDueDate: string;
    public readonly status: string;

    constructor(programDetails: IProgramDetails) {
        this.id = programDetails.id;
        this.cypher = programDetails.cypher;
        this.chair = programDetails.chair;
        this.name = programDetails.name;
        this.institute = programDetails.institute;
        this.uniId = programDetails.uniId;
        this.level = programDetails.level;
        this.standard = programDetails.standard
        this.head = programDetails.head;
        this.startYear = programDetails.startYear;
        this.duration = programDetails.duration;
        this.hasForeignContent = programDetails.hasForeignContent;
        this.isBeingAccredited = programDetails.isBeingAccredited;
        this.accreditationDueDate = programDetails.accreditationDueDate;
        this.status = programDetails.status;
    }
}
