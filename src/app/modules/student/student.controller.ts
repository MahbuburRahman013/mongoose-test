import { Request, Response } from 'express'
import { StudentServices } from './student.service'
import studentSchemaZod from './joi.student.model'

const createStudent = async (req: Request, res: Response) => {
  try {
    const { student: studentData } = req.body

    const zodData = studentSchemaZod.parse(studentData)
    const result = await StudentServices.createStudentIntoDB(zodData)

    res.status(200).send({
      success: true,
      message: 'Student is created successfully',
      data: result,
    })
  } catch (error) {
    res.status(404).send({
      success: false,
      message: `Student isn't created successfully`,
      data: error,
    })
  }
}

const getStudent = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getStudentFromDB()

    res.status(200).send({
      success: true,
      message: 'Students all data get successfully',
      data: result,
    })
  } catch (error) {
    res.status(404).send({
      success: false,
      message: `Students all data not get successfully`,
      data: error,
    })
  }
}

const getStudentById = async (req: Request, res: Response) => {
  try {
    const id: string = req.params.id

    const result = await StudentServices.getStudentByIdFromDB(id)

    res.status(200).send({
      success: true,
      message: 'Students data get by id successfully',
      data: result,
    })
  } catch (error) {
    res.status(404).send({
      success: false,
      message: `Students data not get by id successfully`,
      data: error,
    })
  }
}

const deleteStudentById = async (req: Request, res: Response) => {
  try {
    const id: string = req.params.id

    const result = await StudentServices.deleteStudentByIdFromDB(id)

    res.status(200).send({
      success: true,
      message: 'Students data delete by id successfully',
      data: result,
    })
  } catch (error) {
    res.status(404).send({
      success: false,
      message: `Students data not delete by id successfully`,
      data: error,
    })
  }
}

export const studentControllers = {
  createStudent,
  getStudent,
  getStudentById,
  deleteStudentById,
}
