import fs from 'fs'
import { faker } from '@faker-js/faker'

export const generateRandomStudents = (count) => {
  const students = []
  const statuses = [
    'All',
    'not_interested',
    'plan_postponed',
    'next_year_intake',
    'documents_to_send',
    'document_received',
    'To_Call',
    'Contacted',
    'High_Budget',
  ]
  const tags = ['NEW', 'SIGNED UP', 'POTENTIAL', 'Not Interested']

  for (let i = 0; i < count; i++) {
    const randomId = i + 1 // Generate a 4-digit unique ID
    const student = {
      _id: randomId,
      name: faker.name.fullName(),
      email: faker.internet.email(),
      address: faker.address.streetAddress(),
      phone: faker.phone.number('###-###-####'),
      city: faker.address.city(),
      preferredCountries: Array.from(
        { length: Math.floor(Math.random() * 3) + 1 },
        () => faker.address.country()
      ),
      academicLevel1: faker.helpers.arrayElement(['High School', 'Diploma']),
      level1Marks: `${Math.floor(Math.random() * 100)}%`,
      level1Year: `${faker.date.past(10).getFullYear()}`,
      academicLevel2: faker.helpers.arrayElement(['Intermediate', 'Diploma']),
      level2Marks: `${Math.floor(Math.random() * 100)}%`,
      level2Year: `${faker.date.past(10).getFullYear()}`,
      bachelorDegree: faker.helpers.arrayElement(['BBA', 'BSCS', 'BA', 'BSc']),
      bachelorCGPA: (Math.random() * 4).toFixed(2),
      bachelorYear: `${faker.date.past(5).getFullYear()}`,
      masterDegree: faker.helpers.arrayElement(['MBA', 'MSCS', 'MA', 'MSc']),
      masterCGPA: (Math.random() * 4).toFixed(2),
      masterYear: `${faker.date.past(3).getFullYear()}`,
      educationLevel: faker.helpers.arrayElement([
        'Undergraduate',
        'Graduate',
        'Postgraduate',
      ]),
      primaryCoursePreference: faker.helpers.arrayElement([
        'Computer Science',
        'Business Administration',
        'Engineering',
        'Arts',
      ]),
      secondaryCoursePreference: faker.helpers.arrayElement([
        'Mathematics',
        'Physics',
        'Management',
        'Psychology',
      ]),
      languageTest: faker.helpers.arrayElement(['IELTS', 'TOEFL', 'PTE']),
      languageTestScore: `${Math.random() * (9.0).toFixed(1)}`,
      budget: `$${Math.floor(Math.random() * 50) + 10}k`,
      visaHistory: faker.helpers.arrayElement([
        'No History',
        'Rejected Once',
        'Approved Previously',
      ]),
      preferredCounselingMode: faker.helpers.arrayElement([
        'Online',
        'In-person',
      ]),
      heardAboutUs: faker.company.catchPhrase(),
      attestedByHEC: faker.datatype.boolean(),
      attestedByForeignOffice: faker.datatype.boolean(),
      studentTag: faker.helpers.arrayElement(tags),
      status: [faker.helpers.arrayElement(statuses)],
      notes: faker.lorem.sentence(),
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
    }

    students.push(student)
  }

  return students
}

const students = generateRandomStudents(150)

// Save to a JSON file
fs.writeFileSync('students.json', JSON.stringify(students, null, 2), 'utf-8')
console.log('50 random student entries saved to students.json!')
