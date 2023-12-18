import { Chair } from '../types/chair.type';
import { Duration } from '../types/duration.type';
import { Head } from '../types/head.type';
import { Institute } from '../types/institute.type';

export interface IProgramDetails {
  id: number,
  uniId: string,
  status: string,
  name: string,
  cypher: string,
  level: string,
  startYear: number,
  standard: string,
  institute: Institute,
  chair: Chair,
  head: Head,
  duration: Duration,
  hasForeignContent: string,
  isBeingAccredited: boolean,
  accreditationDueDate: string
}

