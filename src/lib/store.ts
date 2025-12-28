import { create } from 'zustand';
import { Candidate, Job, initialJobs, initialCandidates } from './mock-data';

interface AppState {
  jobs: Job[];
  candidates: Candidate[];
  language: 'en' | 'ar';
  setLanguage: (lang: 'en' | 'ar') => void;
  addJob: (job: Job) => void;
  addCandidate: (candidate: Candidate) => void;
  assignCandidatesToJob: (jobId: string, candidateIds: string[]) => void;
  getJob: (id: string) => Job | undefined;
  scoreCandidates: (jobId: string) => void;
  updateCandidateStatus: (
    candidateIds: string[],
    status: Candidate['status']
  ) => void;
  simulateCall: (jobId: string, candidateId: string) => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  jobs: initialJobs,
  candidates: initialCandidates,
  language: 'en',
  setLanguage: (lang) => set({ language: lang }),
  addJob: (job) => set((state) => ({ jobs: [job, ...state.jobs] })),
  addCandidate: (candidate) =>
    set((state) => ({ candidates: [candidate, ...state.candidates] })),
  assignCandidatesToJob: (jobId, candidateIds) =>
    set((state) => ({
      jobs: state.jobs.map((job) =>
        job.id === jobId
          ? {
              ...job,
              candidates: Array.from(
                new Set([...job.candidates, ...candidateIds])
              )
            }
          : job
      )
    })),
  getJob: (id) => get().jobs.find((j) => j.id === id),
  scoreCandidates: (jobId) =>
    set((state) => {
      // Find the job and its candidates
      const job = state.jobs.find((j) => j.id === jobId);
      if (!job) return state;

      // Update the matchScore for candidates assigned to this job
      const updatedCandidates = state.candidates.map((c) => {
        if (job.candidates.includes(c.id)) {
          let score = 0;
          const jobTitleLower = job.title.toLowerCase();
          const jobDescLower = (job.description || '').toLowerCase();
          const roleLower = c.role.toLowerCase();

          // 1. Role Relevance (High impact)
          // If candidate role is very similar to job title
          if (jobTitleLower === roleLower) {
            score += 40;
          } else if (
            jobTitleLower.includes(roleLower) ||
            roleLower.includes(jobTitleLower)
          ) {
            score += 25;
          }

          // 2. Keyword Matching
          // Check if words from the candidate's role appear in the job description
          const roleWords = roleLower.split(' ').filter((w) => w.length > 3);
          let keywordMatches = 0;
          roleWords.forEach((word) => {
            // Bonus if role word is in job title (again)
            if (jobTitleLower.includes(word)) score += 10;
            // Match in description
            if (jobDescLower.includes(word)) keywordMatches++;
          });
          score += Math.min(keywordMatches * 8, 30); // Cap description matches

          // 3. Experience Impact
          const expYears = parseInt(c.exp) || 0;
          if (expYears >= 3) score += 10; // Basic requirement met
          if (expYears > 7) score += 10; // Seniority bonus

          // 4. "CV Content" Simulation (add small variance for realism)
          // Real CVs have content we don't see in the mock object, so we simulate that variance
          score += Math.floor(Math.random() * 15);

          // Generate Analysis
          const analysis: string[] = [];
          if (jobTitleLower === roleLower) {
            analysis.push('Perfect role title match');
          } else if (
            jobTitleLower.includes(roleLower) ||
            roleLower.includes(jobTitleLower)
          ) {
            analysis.push('Highly relevant professional background');
          }
          if (keywordMatches > 2) {
            analysis.push(
              `Strong keyword alignment with ${keywordMatches} key skills identified`
            );
          }
          if (expYears >= 5) {
            analysis.push(
              `${expYears} years of experience exceeds minimum requirements`
            );
          } else if (expYears > 0) {
            analysis.push(`Meets experience threshold with ${expYears} years`);
          }
          if (score > 85) {
            analysis.push('Excellent overall profile fit for this institution');
          }

          // Clamp score to 0-100
          return {
            ...c,
            matchScore: Math.max(15, Math.min(98, score)),
            matchAnalysis:
              analysis.length > 0
                ? analysis
                : [
                    'Core requirements partially met',
                    'Relevant background for the position'
                  ]
          };
        }
        return c;
      });

      return { candidates: updatedCandidates };
    }),
  updateCandidateStatus: (candidateIds, status) =>
    set((state) => ({
      candidates: state.candidates.map((c) =>
        candidateIds.includes(c.id) ? { ...c, status } : c
      )
    })),
  simulateCall: (jobId, candidateId) => {
    const { candidates, updateCandidateStatus } = get();
    const candidate = candidates.find((c) => c.id === candidateId);
    // Note: getJob is also available if needed
    if (!candidate) return;

    // Start Call
    updateCandidateStatus([candidateId], 'Scheduled');

    // Simulate AI Processing and completion
    setTimeout(() => {
      set((state) => {
        const job = state.jobs.find((j) => j.id === jobId);
        return {
          candidates: state.candidates.map((c) => {
            if (c.id === candidateId) {
              return {
                ...c,
                status: 'Answered',
                callDetails: {
                  transcript: [
                    {
                      speaker: 'AI Agent',
                      text: `Hello, am I speaking with ${c.name}?`
                    },
                    {
                      speaker: 'Candidate',
                      text: 'Yes, this is they. How can I help you?'
                    },
                    {
                      speaker: 'AI Agent',
                      text: `I am calling regarding your application for the ${job?.title || 'position'}. Are you still interested?`
                    },
                    {
                      speaker: 'Candidate',
                      text: 'Absolutely! I am very excited about this opportunity.'
                    },
                    {
                      speaker: 'AI Agent',
                      text: 'Great. Can you tell me more about your recent experience?'
                    },
                    {
                      speaker: 'Candidate',
                      text: `I have been working as a ${c.role} for the past several years, focusing on student engagement and curriculum development.`
                    }
                  ],
                  responses: {
                    'Interest Level': 'Very High',
                    Availability: 'Immediate',
                    'Salary Expectation': c.salary,
                    'Core Competency': 'Curriculum Design'
                  },
                  generatedLeads: [
                    'Highly enthusiastic about the role',
                    'Excellent communication skills identified',
                    'Strong alignment with school values'
                  ]
                }
              };
            }
            return c;
          })
        };
      });
      // Show a toast here would be nice but store shouldn't usually handle UI logic directly
    }, 4000);
  }
}));
