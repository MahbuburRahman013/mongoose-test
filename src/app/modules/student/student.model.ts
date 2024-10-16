import { Schema, model, connect } from 'mongoose'
import { Guardian, LocalGuardian, Student, UserName } from './student.interface'
import bcrypt from 'bcrypt'
import config from '../../config'

// Name schema
const studentNameSchema = new Schema<UserName>({
  firstName: String,
  middleName: String,
  lastName: { type: String, required: true },
})

// Guardian schema
const studentGuardianSchema = new Schema<Guardian>({
  fatherName: { type: String, required: true },
  fatherOccupation: { type: String, required: true },
  fatherContactNo: { type: String, required: true },
  motherName: { type: String, required: true },
  motherOccupation: { type: String, required: true },
  motherContactNo: { type: String, required: true },
})

// Local Guardian schema
const studentLocalGuardianSchema = new Schema<LocalGuardian>({
  name: { type: String, required: true },
  occupation: { type: String, required: true },
  contactNo: { type: String, required: true },
  address: { type: String, required: true },
})

// Main Student schema
const studentSchema = new Schema<Student>({
  id: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  name: { type: studentNameSchema, required: true },
  gender: { type: String, enum: ['male', 'female'], required: true },
  dateOfBirth: String,
  email: { type: String, unique: true, required: true },
  contactNo: { type: String, required: true },
  emergencyContactNo: { type: String, required: true },
  BloodGroup: {
    type: String,
    enum: ['A+', 'A-', 'AB+', 'AB-', 'B+', 'B-', 'O+', 'O-'],
  },
  presentAddress: { type: String, required: true },
  permanentAddress: { type: String, required: true },
  guardian: { type: studentGuardianSchema, required: true },
  localGuardian: { type: studentLocalGuardianSchema, required: true },
  profileImg: String,
  isActive: {
    type: String,
    enum: ['active', 'blocked'],
    default: 'active',
    required: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
})

studentSchema.pre('save', async function (next) {
  const student = this
  student.password = await bcrypt.hash(
    student.password,
    Number(config.bcrypt_salt_rounds),
  )
  next()
})

studentSchema.post('save', function (doc, next) {
  doc.password = ''
  next()
})

studentSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } })
  next()
})

studentSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } })
  next()
})

studentSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } })
  next()
})

export const StudentModel = model<Student>('Student', studentSchema)
