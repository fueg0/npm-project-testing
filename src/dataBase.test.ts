import { StudentID, Student, Course, CourseGrade, Transcript } from './Types'
import DataBase from './dataBase';

let db: DataBase;

// start each test with a fresh empty database.
beforeEach(() => {
  db = new DataBase
});

// this may look undefined in TSC until you do an npm install
// and possibly restart VSC.
describe('tests for addStudent', () => {

  test('addStudent should add a student to the database', () => {
    // const db = new DataBase ()
    expect(db.nameToIDs('blair')).toEqual([])
    const id1 = db.addStudent('blair');
    expect(db.nameToIDs('blair')).toEqual([id1])
  });

  test('addStudent should return an unique ID for the new student',
    () => {
      // we'll just add 3 students and check to see that their IDs
      // are all different.
      const id1 = db.addStudent('blair');
      const id2 = db.addStudent('corey');
      const id3 = db.addStudent('delta');
      expect(id1).not.toEqual(id2)
      expect(id1).not.toEqual(id3)
      expect(id2).not.toEqual(id3)
    });

  test('the db can have more than one student with the same name',
    () => {
      const id1 = db.addStudent('blair');
      const id2 = db.addStudent('blair');
      expect(id1).not.toEqual(id2)
    })

  test('A newly-added student should have an empty transcript',
    () => {
      const id1 = db.addStudent('blair');
      const retrievedTranscript = db.getTranscript(id1)
      expect(retrievedTranscript.grades).toEqual([])
      expect(retrievedTranscript.student)
        .toEqual({
          studentID: id1, studentName: "blair"
        })
    });

  test('getTranscript should return the right transcript',
    () => {
      // add a student, getting an ID
      // add some grades for that student
      // retrieve the transcript for that ID
      // check to see that the retrieved grades are 
      // exactly the ones you added.    
    });

  test('getTranscript should throw an error when given a bad ID',
    () => {
      // in an empty database, all IDs are bad :)
      // Note: the expression you expect to throw must be wrapped in a (() => ...)
      expect(() => db.getTranscript(1)).toThrowError()
    });

    // test('getTranscript should throw an error when given a bad ID (bogus version)',
    // () => {
    //   // in an empty database, all IDs are bad :)
    //   // Note: the expression you expect to throw must be wrapped in a (() => ...)
    //   expect(db.getTranscript(1)).toThrowError()
    // });

})


describe('tests for addGrades', () => {

  test('addGrades should add a grade to the database', () => {
    // const db = new DataBase ()
    const course_name : Course = 'CS4530'
    const course_grade : CourseGrade = {course: course_name, grade: 93}
    const student_name = "Alvin"
    const student_id = db.addStudent(student_name)
    const student : Student = {studentID: student_id, studentName: student_name }
    db.addGrade(student, course_name, course_grade)

    const student_transcript : Transcript = db.getTranscript(student_id)
      .filter(t => t.student.studentName === student_name)
      .map(t.grades => t.student.studentID)


    expect().toEqual([id1])
  });

  test('addStudent should return an unique ID for the new student',
    () => {
      // we'll just add 3 students and check to see that their IDs
      // are all different.
      const id1 = db.addStudent('blair');
      const id2 = db.addStudent('corey');
      const id3 = db.addStudent('delta');
      expect(id1).not.toEqual(id2)
      expect(id1).not.toEqual(id3)
      expect(id2).not.toEqual(id3)
    });

  test('the db can have more than one student with the same name',
    () => {
      const id1 = db.addStudent('blair');
      const id2 = db.addStudent('blair');
      expect(id1).not.toEqual(id2)
    })

  test('A newly-added student should have an empty transcript',
    () => {
      const id1 = db.addStudent('blair');
      const retrievedTranscript = db.getTranscript(id1)
      expect(retrievedTranscript.grades).toEqual([])
      expect(retrievedTranscript.student)
        .toEqual({
          studentID: id1, studentName: "blair"
        })
    });

  test('getTranscript should return the right transcript',
    () => {
      // add a student, getting an ID
      // add some grades for that student
      // retrieve the transcript for that ID
      // check to see that the retrieved grades are 
      // exactly the ones you added.    
    });

  test('getTranscript should throw an error when given a bad ID',
    () => {
      // in an empty database, all IDs are bad :)
      // Note: the expression you expect to throw must be wrapped in a (() => ...)
      expect(() => db.getTranscript(1)).toThrowError()
    });

    // test('getTranscript should throw an error when given a bad ID (bogus version)',
    // () => {
    //   // in an empty database, all IDs are bad :)
    //   // Note: the expression you expect to throw must be wrapped in a (() => ...)
    //   expect(db.getTranscript(1)).toThrowError()
    // });

})
