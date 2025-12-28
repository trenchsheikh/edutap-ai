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
  callDetails?: {
    transcript: { speaker: string; text: string }[];
    responses: Record<string, string>;
    generatedLeads: string[];
  };
  matchAnalysis?: string[]; // Why they got this score
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

export interface Agent {
  id: string;
  name: string;
  type: 'Screening' | 'Scheduling' | 'Support';
  language: 'English' | 'Arabic' | 'Bilingual';
  voiceId: string;
  status: 'Active' | 'Idle';
  lastActive: string;
  personality: string;
  instructions: string;
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

export const initialCandidates: Candidate[] = Array.from({ length: 50 }, () => {
  const status = faker.helpers.arrayElement(STATUSES);
  const hasCallDetails = status === 'Answered';

  return {
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    role: faker.helpers.arrayElement(ROLES),
    email: faker.internet.email(),
    phone: faker.phone.number(),
    exp: `${faker.number.int({ min: 1, max: 20 })} Yrs`,
    salary: `${faker.number.int({ min: 8, max: 25 })},000 QAR`,
    status: status,
    avatar: faker.image.avatar(),
    cvFile: 'resume.pdf',
    callDetails: hasCallDetails
      ? {
          transcript: [
            {
              speaker: 'AI Agent',
              text:
                'Hello, am I speaking with ' + faker.person.firstName() + '?'
            },
            {
              speaker: 'Candidate',
              text: 'Yes, this is they. How can I help you?'
            },
            {
              speaker: 'AI Agent',
              text:
                'I am calling regarding your application for the ' +
                faker.helpers.arrayElement(ROLES) +
                ' position. Are you still interested?'
            },
            {
              speaker: 'Candidate',
              text: 'Absolutely! I have been following your school for a while.'
            },
            {
              speaker: 'AI Agent',
              text: 'Great. Can you tell me about your experience with the British Curriculum?'
            },
            {
              speaker: 'Candidate',
              text: 'I have over 5 years of experience teaching IGCSE and A-Levels in Doha.'
            }
          ],
          responses: {
            'Interest Level': 'High',
            'Curriculum Experience': 'British (IGCSE, A-Level)',
            Availability: 'Immediate',
            'Salary Expectation': 'Negotiable'
          },
          generatedLeads: [
            'Strong background in British Curriculum',
            'Local experience in Qatar',
            'Eager to start immediately'
          ]
        }
      : undefined
    // matchScore intentionally undefined initially
  };
});

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

export const initialAgents: Agent[] = [
  {
    id: '1',
    name: 'Sarah (Screening)',
    type: 'Screening',
    language: 'English',
    voiceId: 'en-US-Neural2-F',
    status: 'Active',
    lastActive: '2 mins ago',
    personality: 'Professional, warm, and efficient.',
    instructions:
      'You are a school recruiter screening candidates for teaching positions. Be polite and ask about their curriculum experience and availability.'
  },
  {
    id: '2',
    name: 'Omar (Bilingual)',
    type: 'Screening',
    language: 'Bilingual',
    voiceId: 'ar-XA-Wavenet-B',
    status: 'Active',
    lastActive: 'Now',
    personality: 'Formal, respectful, and clear.',
    instructions:
      'You are a recruitment assistant for a school in Qatar. You speak both English and Arabic fluently. Screen candidates for their cultural fit and language proficiency.'
  },
  {
    id: '3',
    name: 'Nora (Scheduling)',
    type: 'Scheduling',
    language: 'English',
    voiceId: 'en-GB-Wavenet-A',
    status: 'Idle',
    lastActive: '5 hours ago',
    personality: 'Friendly, organized, and helpful.',
    instructions:
      'You help candidates schedule their first-round interviews. Be helpful in finding a time that works for both the school and the candidate.'
  }
];

// Keep the generator for future use if needed, but the store will use initialCandidates
export const generateCandidates = (count: number = 50) => initialCandidates;
