export type Guardian = {
  fatherName: string
  fatherOccupation: string
  fatherContactNo: string
  motherName: string
  motherOccupation: string
  motherContactNo: string
}

export type UserName = {
  firstName: string
  middleName?: string
  lastName: string
}

export type LocalGuardian = {
  name: string
  occupation: string
  contactNo: string
  address: string
}

export type Student = {
  id: string
  password: string
  name: UserName
  gender: 'male' | 'female'
  dateOfBirth?: string
  contactNo: string
  email: string
  emergencyContactNo: string
  BloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-'
  presentAddress: string
  permanentAddress: string
  guardian: Guardian
  localGuardian: LocalGuardian
  profileImg?: string
  isActive: 'active' | 'blocked'
  isDeleted?: boolean
}
