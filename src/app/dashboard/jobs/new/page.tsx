'use client';

import { useState, useMemo } from 'react';
import PageContainer from '@/components/layout/page-container';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import {
  IconArrowRight,
  IconArrowLeft,
  IconCheck,
  IconRobot,
  IconBriefcase,
  IconFileDescription,
  IconUsers,
  IconSearch,
  IconUpload,
  IconMicrophone,
  IconLanguage,
  IconFileTypePdf,
  IconWand
} from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/lib/store';
import { FileUploader } from '@/components/file-uploader';

export default function CreateJobPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const { candidates, addJob, addCandidate, assignCandidatesToJob } =
    useAppStore();

  // Job Form State
  const [jobData, setJobData] = useState({
    title: '',
    department: '',
    school: 'Doha Modern School',
    location: '',
    status: 'Active',
    description: '',
    type: 'Full-time',
    agentId: '',
    jdFile: null as File | null
  });

  const availableAgents = [
    {
      id: 'ag-1',
      name: 'Sarah (Primary Recruiter)',
      language: 'English',
      voice: 'Warm/Professional'
    },
    {
      id: 'ag-2',
      name: 'Omar (Bilingual Assistant)',
      language: 'Arabic/English',
      voice: 'Friendly/Direct'
    },
    {
      id: 'ag-3',
      name: 'Nora (Senior Consultant)',
      language: 'English',
      voice: 'Authoritative'
    }
  ];

  // Candidate Selection State
  const [selectedCandidateIds, setSelectedCandidateIds] = useState<string[]>(
    []
  );
  const [filterQuery, setFilterQuery] = useState('');
  const [uploadQueue, setUploadQueue] = useState<File[]>([]);

  const filteredCandidates = useMemo(() => {
    if (!filterQuery) return candidates;
    return candidates.filter(
      (c) =>
        c.name.toLowerCase().includes(filterQuery.toLowerCase()) ||
        c.role.toLowerCase().includes(filterQuery.toLowerCase())
    );
  }, [candidates, filterQuery]);

  const handleUpload = async (uploadedFiles: File[]) => {
    const newIds: string[] = [];
    uploadedFiles.forEach((file) => {
      const id = Math.random().toString(36).substr(2, 9);
      newIds.push(id);
      addCandidate({
        id,
        name: file.name.split('.')[0],
        role: 'Detected from CV',
        email: 'pending@extract.com',
        phone: '-',
        exp: '-',
        salary: '-',
        status: 'Pending',
        avatar: '',
        cvFile: file.name
      });
    });
    setSelectedCandidateIds((prev) => [...prev, ...newIds]);
    setUploadQueue([]);
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleCreateJob = () => {
    const newJobId = Math.random().toString(36).substr(2, 9);
    addJob({
      id: newJobId,
      ...jobData,
      candidates: selectedCandidateIds,
      createdAt: new Date(),
      status: 'Active' as any
    });
    router.push('/dashboard/jobs');
  };

  return (
    <PageContainer>
      <div className='mx-auto flex w-full max-w-4xl flex-1 flex-col space-y-4'>
        <div className='flex items-center justify-between'>
          <Heading
            title='Create New Job'
            description='Follow the steps to publish a new job opening.'
          />
        </div>
        <Separator />

        {/* Steps Indicator */}
        <div className='mb-8 grid grid-cols-4 gap-4'>
          <div
            className={`border-b-2 p-2 text-center ${step >= 1 ? 'border-primary text-primary' : 'border-muted text-muted-foreground'}`}
          >
            <span className='flex items-center justify-center gap-2 font-medium'>
              <IconBriefcase size={16} /> Details
            </span>
          </div>
          <div
            className={`border-b-2 p-2 text-center ${step >= 2 ? 'border-primary text-primary' : 'border-muted text-muted-foreground'}`}
          >
            <span className='flex items-center justify-center gap-2 font-medium'>
              <IconFileDescription size={16} /> Description
            </span>
          </div>
          <div
            className={`border-b-2 p-2 text-center ${step >= 3 ? 'border-primary text-primary' : 'border-muted text-muted-foreground'}`}
          >
            <span className='flex items-center justify-center gap-2 font-medium'>
              <IconRobot size={16} /> AI Agent
            </span>
          </div>
          <div
            className={`border-b-2 p-2 text-center ${step >= 4 ? 'border-primary text-primary' : 'border-muted text-muted-foreground'}`}
          >
            <span className='flex items-center justify-center gap-2 font-medium'>
              <IconUsers size={16} /> Candidates
            </span>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>
              {step === 1 && 'Step 1: Job Details'}
              {step === 2 && 'Step 2: Job Description'}
              {step === 3 && 'Step 3: AI Call Agent Setup'}
              {step === 4 && 'Step 4: Select Candidates'}
            </CardTitle>
            <CardDescription>
              {step === 1 && 'Basic information about the role.'}
              {step === 2 && 'Detailed requirements and responsibilities.'}
              {step === 3 && 'Configure the AI agent for candidate screening.'}
              {step === 4 &&
                'Mass upload CVs or select from existing database.'}
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-4'>
            {step === 1 && (
              <div className='grid gap-4'>
                <div className='grid grid-cols-2 gap-4'>
                  <div className='space-y-2'>
                    <Label>Job Title</Label>
                    <Input
                      placeholder='e.g. Mathematics Teacher'
                      value={jobData.title}
                      onChange={(e) =>
                        setJobData({ ...jobData, title: e.target.value })
                      }
                    />
                  </div>
                  <div className='space-y-2'>
                    <Label>Department</Label>
                    <Select
                      onValueChange={(v) =>
                        setJobData({ ...jobData, department: v })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder='Select Department' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='math'>Mathematics</SelectItem>
                        <SelectItem value='science'>Science</SelectItem>
                        <SelectItem value='arts'>Arts & Humanities</SelectItem>
                        <SelectItem value='primary'>Primary School</SelectItem>
                        <SelectItem value='admin'>Administration</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                {/* ... (Other fields similar structure, maintaining mock inputs for brevity but would connect to state in real app) ... */}
                <div className='grid grid-cols-2 gap-4'>
                  <div className='space-y-2'>
                    <Label>School Name</Label>
                    <Input defaultValue='Doha Modern School' disabled />
                  </div>
                  <div className='space-y-2'>
                    <Label>Location</Label>
                    <Input
                      placeholder='e.g. Doha'
                      value={jobData.location}
                      onChange={(e) =>
                        setJobData({ ...jobData, location: e.target.value })
                      }
                    />
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className='grid gap-6'>
                <div className='space-y-4'>
                  <Label className='text-base font-bold'>
                    Option 1: Upload Job Description
                  </Label>
                  <p className='text-muted-foreground text-xs'>
                    Upload a PDF or Word document of the job description for the
                    AI to analyze.
                  </p>
                  <div className='bg-muted/10 hover:border-primary/50 rounded-xl border-2 border-dashed p-6 transition-colors'>
                    <FileUploader
                      maxFiles={1}
                      value={jobData.jdFile ? [jobData.jdFile] : []}
                      onValueChange={(val) => {
                        const files =
                          typeof val === 'function'
                            ? val(jobData.jdFile ? [jobData.jdFile] : [])
                            : val;
                        setJobData({ ...jobData, jdFile: files[0] || null });
                      }}
                      accept={{
                        'application/pdf': ['.pdf'],
                        'application/msword': ['.doc'],
                        'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
                          ['.docx']
                      }}
                    />
                  </div>
                </div>

                <div className='relative py-4'>
                  <div className='absolute inset-0 flex items-center'>
                    <Separator />
                  </div>
                  <div className='relative flex justify-center text-xs uppercase'>
                    <span className='bg-background text-muted-foreground px-2 font-bold'>
                      Or Provide Manually
                    </span>
                  </div>
                </div>

                <div className='space-y-4'>
                  <div className='space-y-2'>
                    <Label>Role Overview</Label>
                    <Textarea
                      placeholder='Brief summary of the role...'
                      rows={3}
                      value={jobData.description}
                      onChange={(e) =>
                        setJobData({ ...jobData, description: e.target.value })
                      }
                    />
                  </div>
                  <div className='space-y-2'>
                    <Label>Responsibilities & Requirements</Label>
                    <Textarea
                      placeholder='List key responsibilities, qualifications, and experience required...'
                      rows={6}
                    />
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className='grid gap-8'>
                <div className='space-y-4'>
                  <Label className='flex items-center gap-2 text-base font-bold'>
                    <IconRobot className='text-primary' size={20} />
                    Assign an AI Agent to this call
                  </Label>
                  <p className='text-muted-foreground text-xs'>
                    Select the voice personality that will represent your school
                    during the screening.
                  </p>

                  <Select
                    onValueChange={(v) =>
                      setJobData({ ...jobData, agentId: v })
                    }
                    defaultValue={jobData.agentId}
                  >
                    <SelectTrigger className='hover:border-primary/50 h-16 rounded-xl border-2 transition-all'>
                      <SelectValue placeholder='Click to select an agent...' />
                    </SelectTrigger>
                    <SelectContent>
                      {availableAgents.map((agent) => (
                        <SelectItem
                          key={agent.id}
                          value={agent.id}
                          className='py-3'
                        >
                          <div className='flex flex-col gap-0.5'>
                            <span className='text-sm font-bold'>
                              {agent.name}
                            </span>
                            <div className='text-muted-foreground flex items-center gap-3 text-[10px] tracking-widest uppercase'>
                              <span className='flex items-center gap-1'>
                                <IconLanguage size={12} /> {agent.language}
                              </span>
                              <span className='flex items-center gap-1'>
                                <IconMicrophone size={12} /> {agent.voice}
                              </span>
                            </div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className='space-y-4'>
                  <Label className='flex items-center gap-2 text-base font-bold'>
                    <IconWand className='text-primary' size={20} />
                    Additional AI Training Context
                  </Label>
                  <p className='text-muted-foreground text-xs italic'>
                    Extra tips for the agent about the school culture or
                    specific project nuances.
                  </p>
                  <Textarea
                    placeholder='e.g. Mention that we provide premium on-site housing for international staff...'
                    rows={4}
                    className='rounded-xl'
                  />
                </div>
              </div>
            )}

            {step === 4 && (
              <div className='space-y-6'>
                <div className='bg-muted/20 rounded-md border p-4'>
                  <h4 className='mb-2 font-semibold'>Mass Upload Candidates</h4>
                  <FileUploader
                    maxFiles={10}
                    value={uploadQueue}
                    onValueChange={setUploadQueue}
                    onUpload={handleUpload}
                    accept={{ 'application/pdf': [] }}
                  />
                </div>

                <div className='space-y-2'>
                  <div className='flex items-center justify-between'>
                    <h4 className='font-semibold'>Select from Database</h4>
                    <div className='relative w-64'>
                      <IconSearch className='text-muted-foreground absolute top-2.5 left-2 h-4 w-4' />
                      <Input
                        placeholder='Filter by name or role...'
                        className='pl-8'
                        value={filterQuery}
                        onChange={(e) => setFilterQuery(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className='h-64 overflow-auto rounded-md border'>
                    <Table>
                      <TableHeader className='bg-background sticky top-0 z-10'>
                        <TableRow>
                          <TableHead className='w-[50px]'>Select</TableHead>
                          <TableHead>Candidate</TableHead>
                          <TableHead>Role</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredCandidates.map((c) => (
                          <TableRow key={c.id}>
                            <TableCell>
                              <Checkbox
                                checked={selectedCandidateIds.includes(c.id)}
                                onCheckedChange={(checked) => {
                                  if (checked)
                                    setSelectedCandidateIds([
                                      ...selectedCandidateIds,
                                      c.id
                                    ]);
                                  else
                                    setSelectedCandidateIds(
                                      selectedCandidateIds.filter(
                                        (id) => id !== c.id
                                      )
                                    );
                                }}
                              />
                            </TableCell>
                            <TableCell className='font-medium'>
                              {c.name}
                            </TableCell>
                            <TableCell>{c.role}</TableCell>
                            <TableCell>
                              <Badge variant='outline'>{c.status}</Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                  <p className='text-muted-foreground w-full text-right text-sm'>
                    {selectedCandidateIds.length} candidates selected
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Navigation Buttons */}
        <div className='flex justify-between'>
          <Button variant='outline' onClick={prevStep} disabled={step === 1}>
            <IconArrowLeft className='mr-2 h-4 w-4' /> Back
          </Button>
          {step < 4 ? (
            <Button onClick={nextStep}>
              Next <IconArrowRight className='ml-2 h-4 w-4' />
            </Button>
          ) : (
            <Button onClick={handleCreateJob}>
              Create Job <IconCheck className='ml-2 h-4 w-4' />
            </Button>
          )}
        </div>
      </div>
    </PageContainer>
  );
}
