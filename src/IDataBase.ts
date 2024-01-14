// IDataBase.ts
// defines the interface for our database

import {StudentID, Student, Course, CourseGrade, Transcript} from './Types'

export interface IDataBase {
    addStudent (studentName: string): StudentID
    getTranscript (id: StudentID): Transcript
    deleteStudent (id: StudentID): void     // hmm, what to do about errors??
    addGrade (id: Student, course: Course, courseGrade: CourseGrade) : void
    getGrade (id: Student, course: Course) : CourseGrade
    nameToIDs (studentName: string) : StudentID[]
}