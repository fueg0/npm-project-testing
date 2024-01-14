import {StudentID, Student, Course, CourseGrade, Transcript} from './Types'

const alvin : Student = {studentID: 37, studentName: "Alvin"}
const bryn : Student = {studentID: 38, studentName: "Bronwyn"}

describe("exercise Types.ts", () => {

    test("extracting a studentID should give the ID", () =>{
        expect(alvin.studentID).toEqual(37)
        expect(bryn.studentID).toEqual(38)
    })

    // this illustrates what Jest shows when a test fails
    test("extracting a studentID should give the name", () => {
        expect(alvin.studentName).toEqual("Alvin")
        // should get a failure report here:
        expect(bryn.studentName).toEqual("Jazzhands")
    })

})
