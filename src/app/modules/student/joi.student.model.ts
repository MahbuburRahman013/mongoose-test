import { z } from 'zod'

const studentNameSchema = z.object({
  firstName: z
    .string()
    .min(1, 'First name is required')
    .refine((value) => /^[A-Za-z]+$/.test(value), {
      message: 'First name must contain only letters',
    }),
  middleName: z.string().optional(),
  lastName: z.string().min(1, 'Last name is required'),
})

const studentGuardianSchema = z.object({
  fatherName: z.string().min(1, 'Father name is required'),
  fatherOccupation: z.string().min(1, 'Father occupation is required'),
  fatherContactNo: z.string().min(1, 'Father contact number is required'),
  motherName: z.string().min(1, 'Mother name is required'),
  motherOccupation: z.string().min(1, 'Mother occupation is required'),
  motherContactNo: z.string().min(1, 'Mother contact number is required'),
})

const studentLocalGuardianSchema = z.object({
  name: z.string().min(1, 'Local guardian name is required'),
  occupation: z.string().min(1, 'Local guardian occupation is required'),
  contactNo: z.string().min(1, 'Local guardian contact number is required'),
  address: z.string().min(1, 'Local guardian address is required'),
})

const studentSchemaZod = z.object({
  id: z.string().min(1, 'ID is required'),
  password: z.string().min(6, 'Password will be minimum 6 chart'),
  name: studentNameSchema,
  gender: z.enum(['male', 'female'], {
    errorMap: () => ({ message: 'Gender is not correct' }),
  }),
  dateOfBirth: z.string().optional(),
  email: z.string().min(1, 'Email is required').email('Email is not valid'),
  contactNo: z.string().min(1, 'Contact number is required'),
  emergencyContactNo: z.string().min(1, 'Emergency contact number is required'),
  BloodGroup: z
    .enum(['A+', 'A-', 'AB+', 'AB-', 'B+', 'B-', 'O+', 'O-'])
    .optional(),
  presentAddress: z.string().min(1, 'Present address is required'),
  permanentAddress: z.string().min(1, 'Permanent address is required'),
  guardian: studentGuardianSchema,
  localGuardian: studentLocalGuardianSchema,
  profileImg: z.string().optional(),
  isActive: z.enum(['active', 'blocked']).default('active'),
  isDeleted: z.boolean().optional(),
})

export default studentSchemaZod
