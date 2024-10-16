import { Student } from './student.interface'
import { StudentModel } from './student.model'

const createStudentIntoDB = async (student: Student) => {
  const result = await StudentModel.create(student)
  return result
}

const getStudentFromDB = async () => {
  const result = await StudentModel.find()
  return result
}

const getStudentByIdFromDB = async (id: string) => {
  const query = { id: id }
  const result = await StudentModel.aggregate([{ $match: { id: id } }])
  return result
}

const deleteStudentByIdFromDB = async (id: string) => {
  const query = { id: id }
  const result = await StudentModel.updateOne(query, { isDeleted: true })
  return result
}

export const StudentServices = {
  createStudentIntoDB,
  getStudentFromDB,
  getStudentByIdFromDB,
  deleteStudentByIdFromDB,
}
