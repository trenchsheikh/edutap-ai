import { faker } from '@faker-js/faker';

// Define types locally if not yet in types/index.ts, or verify usage later
export interface Candidate {
  id: string;
  name: string;
  role: string;
  email: string;
  phone: string;
  exp: string;
  salary: string;
  status:
    | 'Pending'
    | 'Answered'
    | 'Voicemail'
    | 'No Answer'
    | 'Scheduled'
    | 'Rejected';
  avatar: string; // url or placeholder
  cvFile?: string;
  matchScore?: number; // 0-100
}

export interface Job {
  id: string;
  title: string;
  school: string;
  department: string;
  location: string;
  type: string;
  status: 'Active' | 'Draft' | 'Closed';
  candidates: string[]; // Array of Candidate IDs
  createdAt: Date;
  description: string;
}

const ROLES = [
  'Mathematics Teacher',
  'Science Teacher',
  'English Teacher',
  'Art Teacher',
  'PE Teacher',
  'Lab Technician',
  'School Counselor',
  'Primary Coordinator',
  'Principal',
  'History Teacher'
];

const STATUSES: Candidate['status'][] = [
  'Pending',
  'Answered',
  'Voicemail',
  'No Answer',
  'Scheduled',
  'Rejected'
];

export const initialCandidates: Candidate[] = Array.from(
  { length: 50 },
  () => ({
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    role: faker.helpers.arrayElement(ROLES),
    email: faker.internet.email(),
    phone: faker.phone.number(),
    exp: `${faker.number.int({ min: 1, max: 20 })} Yrs`,
    salary: `${faker.number.int({ min: 8, max: 25 })},000 QAR`,
    status: faker.helpers.arrayElement(STATUSES),
    avatar: faker.image.avatar(),
    cvFile: 'resume.pdf'
    // matchScore intentionally undefined initially
  })
);

export const initialJobs: Job[] = [
  {
    id: '1',
    title: 'Mathematics Teacher',
    school: 'Doha Modern School',
    department: 'Mathematics',
    location: 'Doha',
    type: 'Full-time',
    status: 'Active',
    candidates: initialCandidates.slice(0, 15).map((c) => c.id),
    createdAt: new Date('2025-12-24'),
    description: `Doha Modern School is seeking a dedicated and experienced Mathematics Teacher to join our dynamic High School team. The successful candidate will be responsible for delivering the British Curriculum to students in Key Stages 3, 4, and 5 (IGCSE and A-Level). We are looking for an educator who is passionate about mathematics and can inspire students of all abilities to achieve their full potential.

Key Responsibilities:
- Plan and deliver engaging mathematics lessons that meet the needs of all learners.
- Monitor and assess student progress, providing regular feedback to students and parents.
- Contribute to the wider school community through extracurricular activities and departmental meetings.
- Align teaching strategies with the Ministry of Education and Higher Education (MOEHE) requirements.

Requirements:
- Bachelor's Degree in Mathematics or related field with PGCE/QTS.
- Minimum 3 years of teaching experience in a British Curriculum school.
- Experience with IGCSE and A-Level preparations.
- Cultural sensitivity and adaptability to working in an international setting in Qatar.`
  },
  {
    id: '2',
    title: 'Science Lab Technician',
    school: 'Al Rayyan Int. School',
    department: 'Science',
    location: 'Al Rayyan',
    type: 'Full-time',
    status: 'Draft',
    candidates: initialCandidates.slice(15, 25).map((c) => c.id),
    createdAt: new Date('2025-12-26'),
    description: `Al Rayyan International School is looking for a meticulous and organized Science Lab Technician. You will play a crucial role in supporting the Science Department by preparing materials and equipment for biology, chemistry, and physics practical lessons. Safety and organization are paramount in this role.

Responsibilities:
- Prepare chemical solutions and equipment for daily practical lessons.
- Maintain an accurate inventory of chemicals and equipment, ordering supplies as necessary.
- Ensure all health and safety regulations are strictly adhered to within the laboratories.
- Assist teachers during practical sessions and manage safe waste disposal.

Qualifications:
- Degree or Diploma in Science or Laboratory Techniques.
- Previous experience in a school laboratory setting is highly desirable.
- Strong organizational skills and attention to detail.
- Knowledge of COSHH and general lab safety procedures.`
  },
  {
    id: '3',
    title: 'Primary Coordinator',
    school: 'Doha Modern School',
    department: 'Primary',
    location: 'Doha',
    type: 'Full-time',
    status: 'Active',
    candidates: initialCandidates.slice(25, 50).map((c) => c.id),
    createdAt: new Date('2025-12-10'),
    description: `We are inviting applications for the position of Primary Coordinator at Doha Modern School. This leadership role involves managing the academic and pastoral welfare of students in the Primary section. The ideal candidate will be an experienced leader capable of driving curriculum development and staff performance.

Role Overview:
- Lead the development and implementation of the Primary curriculum.
- mentor and support teaching staff, conducting observations and appraisals.
- Liaise with parents and the wider community to promote the school's vision.
- Ensure compliance with school policies and local regulatory frameworks.

Requirements:
- Master’s Degree in Education or Leadership preferred.
- Significant teaching and leadership experience in a Primary setting.
- Proven track record of improving teaching and learning standards.
- Excellent communication and interpersonal skills.`
  }
];

// Keep the generator for future use if needed, but the store will use initialCandidates
export const generateCandidates = (count: number = 50) => initialCandidates;
