'use client';

import { use, useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import PageContainer from '@/components/layout/page-container';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import {
  IconArrowLeft,
  IconBriefcase,
  IconMapPin,
  IconCalendar,
  IconUsers,
  IconPhone,
  IconFileText,
  IconWand,
  IconPhoneCalling,
  IconCalendarEvent,
  IconX,
  IconPlus,
  IconSearch
} from '@tabler/icons-react';
import { useAppStore } from '@/lib/store';
import { format } from 'date-fns';
import { toast } from 'sonner';
import { FileUploader } from '@/components/file-uploader';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';

export default function JobDetailPage({
  params
}: {
  params: Promise<{ jobId: string }>;
}) {
  const { jobId } = use(params);
  const router = useRouter();
  const {
    getJob,
    candidates,
    scoreCandidates,
    updateCandidateStatus,
    addCandidate,
    assignCandidatesToJob
  } = useAppStore();

  const job = getJob(jobId);

  const [isScoring, setIsScoring] = useState(false);
  const [isCalling, setIsCalling] = useState(false);
  const [scheduleOpen, setScheduleOpen] = useState(false);
  const [cancelOpen, setCancelOpen] = useState(false);

  // Add Candidate State
  const [uploadQueue, setUploadQueue] = useState<File[]>([]);
  const [filterQuery, setFilterQuery] = useState('');
  const [selectedUnassignedIds, setSelectedUnassignedIds] = useState<string[]>(
    []
  );

  // Sorting State
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: 'asc' | 'desc';
  }>({ key: 'matchScore', direction: 'desc' });

  // Unassigned filter
  const unassignedCandidates = useMemo(() => {
    if (!job) return [];
    return candidates
      .filter((c) => !job.candidates.includes(c.id))
      .filter(
        (c) =>
          !filterQuery ||
          c.name.toLowerCase().includes(filterQuery.toLowerCase()) ||
          c.role.toLowerCase().includes(filterQuery.toLowerCase())
      );
  }, [candidates, job, filterQuery]);

  const handleUpload = async (uploadedFiles: File[]) => {
    const newIds: string[] = [];
    uploadedFiles.forEach((file) => {
      const id = Math.random().toString(36).substr(2, 9);
      newIds.push(id);
      addCandidate({
        id,
        name: file.name.split('.')[0],
        role: 'Detected from CV', // In real app would be parsed
        email: 'pending@extract.com',
        phone: '-',
        exp: '-',
        salary: '-',
        status: 'Pending',
        avatar: '',
        cvFile: file.name,
        matchScore: undefined
      });
    });

    assignCandidatesToJob(jobId, newIds);
    setUploadQueue([]);
    toast.success('Candidates Added', {
      description: `${newIds.length} new candidates added from CVs.`
    });
  };

  const handleAddExisting = () => {
    assignCandidatesToJob(jobId, selectedUnassignedIds);
    setSelectedUnassignedIds([]);
    toast.success('Candidates Assigned', {
      description: `${selectedUnassignedIds.length} candidates added to pipeline.`
    });
  };

  const jobCandidates = useMemo(() => {
    if (!job) return [];
    let filtered = candidates.filter((c) => job.candidates.includes(c.id));

    // Apply Sorting
    return filtered.sort((a, b) => {
      const aValue = a[sortConfig.key as keyof typeof a] || '';
      const bValue = b[sortConfig.key as keyof typeof b] || '';

      if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [job, candidates, sortConfig]);

  const handleSort = (key: string) => {
    setSortConfig((current) => ({
      key,
      direction:
        current.key === key && current.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  if (!job) {
    return (
      <PageContainer>
        <div className='flex h-[50vh] flex-col items-center justify-center space-y-4'>
          <Heading
            title='Job Not Found'
            description='The requested job posting could not be found.'
          />
          <Button onClick={() => router.push('/dashboard/jobs')}>
            Back to Jobs
          </Button>
        </div>
      </PageContainer>
    );
  }

  const handleScoreCVs = () => {
    setIsScoring(true);
    // Simulate processing time
    setTimeout(() => {
      scoreCandidates(jobId);
      setIsScoring(false);
      toast.success('CV Scoring Complete', {
        description: `${jobCandidates.length} candidates have been analyzed.`
      });
    }, 1500);
  };

  const handleCallAll = () => {
    setIsCalling(true);
    setTimeout(() => {
      updateCandidateStatus(job.candidates, 'Scheduled');
      setIsCalling(false);
      toast.success('Calls Initiated', {
        description: 'AI Agent is becoming active for all candidates.'
      });
    }, 1000);
  };

  // ... (Dialog Handlers for Schedule/Cancel kept same as before in logic placeholder)
  const handleScheduleCalls = (e: React.FormEvent) => {
    e.preventDefault();
    setScheduleOpen(false);
    toast.success('Campaign Scheduled', {});
  };
  const handleCancelCalls = (e: React.FormEvent) => {
    e.preventDefault();
    updateCandidateStatus(job.candidates, 'Pending');
    setCancelOpen(false);
    toast.warning('Campaign Cancelled', {});
  };

  return (
    <PageContainer>
      <div className='flex flex-1 flex-col space-y-6'>
        {/* Header */}
        <div className='flex items-center gap-4'>
          <Button variant='ghost' size='icon' onClick={() => router.back()}>
            <IconArrowLeft size={20} />
          </Button>
          <div className='flex-1'>
            <Heading
              title={job.title}
              description={`${job.school} • ${job.department}`}
            />
          </div>
          <div className='flex gap-2'>
            <Badge
              variant={job.status === 'Active' ? 'default' : 'secondary'}
              className='h-fit px-4 py-1 text-lg'
            >
              {job.status}
            </Badge>
          </div>
        </div>
        <Separator />

        {/* Job Details Summary (Full Width now) */}
        <Card>
          <CardHeader>
            <CardTitle>Job Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='mb-6 grid grid-cols-2 gap-4 md:grid-cols-4'>
              <div className='bg-muted/20 flex items-center gap-2 rounded-md p-3 text-sm'>
                <IconBriefcase className='text-muted-foreground' size={20} />
                <div>
                  <p className='text-muted-foreground text-xs'>Type</p>
                  <span className='font-medium'>{job.type}</span>
                </div>
              </div>
              <div className='bg-muted/20 flex items-center gap-2 rounded-md p-3 text-sm'>
                <IconMapPin className='text-muted-foreground' size={20} />
                <div>
                  <p className='text-muted-foreground text-xs'>Location</p>
                  <span className='font-medium'>{job.location}</span>
                </div>
              </div>
              <div className='bg-muted/20 flex items-center gap-2 rounded-md p-3 text-sm'>
                <IconCalendar className='text-muted-foreground' size={20} />
                <div>
                  <p className='text-muted-foreground text-xs'>Posted</p>
                  <span className='font-medium'>
                    {format(new Date(job.createdAt), 'MMM dd, yyyy')}
                  </span>
                </div>
              </div>
              <div className='bg-muted/20 flex items-center gap-2 rounded-md p-3 text-sm'>
                <IconUsers className='text-muted-foreground' size={20} />
                <div>
                  <p className='text-muted-foreground text-xs'>Candidates</p>
                  <span className='font-medium'>
                    {jobCandidates.length} Assigned
                  </span>
                </div>
              </div>
            </div>
            <div>
              <h4 className='mb-2 font-semibold'>Description</h4>
              <p className='text-muted-foreground text-sm leading-relaxed whitespace-pre-wrap'>
                {job.description || 'No description provided.'}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Candidates Table (Full Width) */}
        <Card className='w-full'>
          <CardHeader>
            <div className='flex flex-col justify-between gap-4 md:flex-row md:items-center'>
              <div>
                <CardTitle>Candidates Pipeline</CardTitle>
                <CardDescription>
                  Manage and screen candidates for this position.
                </CardDescription>
              </div>
              <div className='flex flex-wrap gap-2'>
                {/* Score CVs Button */}
                <Button
                  size='sm'
                  onClick={handleScoreCVs}
                  disabled={isScoring || jobCandidates.length === 0}
                >
                  <IconWand
                    className={`mr-2 h-4 w-4 ${isScoring ? 'animate-spin' : ''}`}
                  />
                  {isScoring ? 'Analyzing...' : 'Score CVs'}
                </Button>

                {/* Call All Dialog */}
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      size='sm'
                      className='bg-emerald-600 text-white hover:bg-emerald-700'
                      disabled={jobCandidates.length === 0}
                    >
                      <IconPhoneCalling className='mr-2 h-4 w-4' /> Call All
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Start AI Call Campaign</DialogTitle>
                      <DialogDescription>
                        Configure the call campaign for {jobCandidates.length}{' '}
                        candidates.
                      </DialogDescription>
                    </DialogHeader>
                    <div className='grid gap-4 py-4'>
                      <div className='grid grid-cols-2 gap-4'>
                        <div className='space-y-2'>
                          <Label>Date</Label>
                          <Input
                            type='date'
                            defaultValue={
                              new Date().toISOString().split('T')[0]
                            }
                          />
                        </div>
                        <div className='space-y-2'>
                          <Label>Time</Label>
                          <Input type='time' defaultValue='09:00' />
                        </div>
                      </div>
                      <div className='space-y-2'>
                        <Label>AI Agent Context</Label>
                        <Textarea placeholder='Additional instructions for the AI agent (optional)...' />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant='outline'>Cancel</Button>
                      <Button
                        onClick={handleCallAll}
                        disabled={isCalling}
                        className='bg-emerald-600 hover:bg-emerald-700'
                      >
                        {isCalling ? 'Queueing...' : 'Confirm & Start'}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                {/* Schedule Calls Dialog */}
                <Dialog open={scheduleOpen} onOpenChange={setScheduleOpen}>
                  <DialogTrigger asChild>
                    <Button
                      size='sm'
                      variant='outline'
                      disabled={jobCandidates.length === 0}
                    >
                      <IconCalendarEvent className='mr-2 h-4 w-4' /> Schedule
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <form onSubmit={handleScheduleCalls}>
                      <DialogHeader>
                        <DialogTitle>Schedule Call Campaign</DialogTitle>
                        <DialogDescription>
                          Select a date and time to start the campaign.
                        </DialogDescription>
                      </DialogHeader>
                      <div className='grid gap-4 py-4'>
                        <div className='grid grid-cols-2 gap-4'>
                          <div className='space-y-2'>
                            <Label>Date</Label>
                            <Input type='date' required />
                          </div>
                          <div className='space-y-2'>
                            <Label>Time</Label>
                            <Input type='time' required />
                          </div>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button
                          type='button'
                          variant='outline'
                          onClick={() => setScheduleOpen(false)}
                        >
                          Cancel
                        </Button>
                        <Button type='submit'>Schedule</Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>

                {/* Cancel All Dialog */}
                <Dialog open={cancelOpen} onOpenChange={setCancelOpen}>
                  <DialogTrigger asChild>
                    <Button
                      size='sm'
                      variant='destructive'
                      disabled={jobCandidates.length === 0}
                    >
                      <IconX className='mr-2 h-4 w-4' /> Cancel All
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <form onSubmit={handleCancelCalls}>
                      <DialogHeader>
                        <DialogTitle>Cancel Active Campaign?</DialogTitle>
                        <DialogDescription>
                          Stop all pending and scheduled calls for this job.
                        </DialogDescription>
                      </DialogHeader>
                      <div className='space-y-2 py-4'>
                        <Label>Reason for cancellation (Optional)</Label>
                        <Textarea placeholder='e.g. Position filled...' />
                      </div>
                      <DialogFooter>
                        <Button
                          type='button'
                          variant='outline'
                          onClick={() => setCancelOpen(false)}
                        >
                          Back
                        </Button>
                        <Button type='submit' variant='destructive'>
                          Stop Campaign
                        </Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>

                {/* Add Candidates Dialog */}
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size='sm'>
                      <IconPlus className='mr-2 h-4 w-4' /> Add Candidates
                    </Button>
                  </DialogTrigger>
                  <DialogContent className='max-w-3xl'>
                    <DialogHeader>
                      <DialogTitle>Add Candidates to Pipeline</DialogTitle>
                      <DialogDescription>
                        Upload new CVs or select existing candidates from the
                        database.
                      </DialogDescription>
                    </DialogHeader>
                    <Tabs defaultValue='upload' className='w-full'>
                      <TabsList className='grid w-full grid-cols-2'>
                        <TabsTrigger value='upload'>
                          Mass Upload CVs
                        </TabsTrigger>
                        <TabsTrigger value='existing'>
                          Select Existing
                        </TabsTrigger>
                      </TabsList>
                      <TabsContent value='upload' className='space-y-4 py-4'>
                        <div className='bg-muted/20 rounded-md border p-4'>
                          <FileUploader
                            maxFiles={20}
                            value={uploadQueue}
                            onValueChange={setUploadQueue}
                            onUpload={handleUpload}
                            accept={{ 'application/pdf': [] }}
                          />
                        </div>
                        <p className='text-muted-foreground text-sm'>
                          Uploaded files will be automatically parsed and added
                          as new candidates to this job.
                        </p>
                      </TabsContent>
                      <TabsContent value='existing' className='space-y-4 py-4'>
                        <div className='mb-4 flex items-center gap-2'>
                          <div className='relative flex-1'>
                            <IconSearch className='text-muted-foreground absolute top-2.5 left-2 h-4 w-4' />
                            <Input
                              placeholder='Search unassigned candidates...'
                              className='pl-8'
                              value={filterQuery}
                              onChange={(e) => setFilterQuery(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className='h-[400px] overflow-auto rounded-md border'>
                          <Table>
                            <TableHeader className='bg-background sticky top-0 z-10'>
                              <TableRow>
                                <TableHead className='w-[50px]'>
                                  Select
                                </TableHead>
                                <TableHead>Candidate</TableHead>
                                <TableHead>Role</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {unassignedCandidates.length === 0 ? (
                                <TableRow>
                                  <TableCell
                                    colSpan={3}
                                    className='text-muted-foreground py-8 text-center'
                                  >
                                    No matching candidates found.
                                  </TableCell>
                                </TableRow>
                              ) : (
                                unassignedCandidates.map((c) => (
                                  <TableRow key={c.id}>
                                    <TableCell>
                                      <Checkbox
                                        checked={selectedUnassignedIds.includes(
                                          c.id
                                        )}
                                        onCheckedChange={(checked) => {
                                          if (checked)
                                            setSelectedUnassignedIds([
                                              ...selectedUnassignedIds,
                                              c.id
                                            ]);
                                          else
                                            setSelectedUnassignedIds(
                                              selectedUnassignedIds.filter(
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
                                  </TableRow>
                                ))
                              )}
                            </TableBody>
                          </Table>
                        </div>
                        <div className='flex items-center justify-between'>
                          <p className='text-muted-foreground text-sm'>
                            {selectedUnassignedIds.length} candidates selected
                          </p>
                          <Button
                            onClick={handleAddExisting}
                            disabled={selectedUnassignedIds.length === 0}
                          >
                            Add Selected
                          </Button>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className='rounded-md border'>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead
                      className='hover:bg-muted/50 cursor-pointer'
                      onClick={() => handleSort('name')}
                    >
                      Candidate Name{' '}
                      {sortConfig.key === 'name' &&
                        (sortConfig.direction === 'asc' ? '↑' : '↓')}
                    </TableHead>
                    <TableHead
                      className='hover:bg-muted/50 cursor-pointer'
                      onClick={() => handleSort('role')}
                    >
                      Role{' '}
                      {sortConfig.key === 'role' &&
                        (sortConfig.direction === 'asc' ? '↑' : '↓')}
                    </TableHead>
                    <TableHead
                      className='hover:bg-muted/50 cursor-pointer'
                      onClick={() => handleSort('matchScore')}
                    >
                      Match Score{' '}
                      {sortConfig.key === 'matchScore' &&
                        (sortConfig.direction === 'asc' ? '↑' : '↓')}
                    </TableHead>
                    <TableHead
                      className='hover:bg-muted/50 cursor-pointer'
                      onClick={() => handleSort('status')}
                    >
                      Status{' '}
                      {sortConfig.key === 'status' &&
                        (sortConfig.direction === 'asc' ? '↑' : '↓')}
                    </TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {jobCandidates.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={5}
                        className='text-muted-foreground py-8 text-center'
                      >
                        No candidates assigned to this job yet.
                      </TableCell>
                    </TableRow>
                  ) : (
                    jobCandidates.map((c) => (
                      <TableRow key={c.id}>
                        <TableCell className='font-medium'>{c.name}</TableCell>
                        <TableCell>{c.role}</TableCell>
                        <TableCell>
                          {c.matchScore ? (
                            <Badge
                              className={
                                c.matchScore >= 85
                                  ? 'bg-green-500 hover:bg-green-600'
                                  : c.matchScore >= 70
                                    ? 'bg-lime-500 hover:bg-lime-600'
                                    : c.matchScore >= 50
                                      ? 'bg-orange-500 hover:bg-orange-600'
                                      : 'bg-red-500 hover:bg-red-600'
                              }
                            >
                              {c.matchScore}% Match
                            </Badge>
                          ) : (
                            <span className='text-muted-foreground text-sm'>
                              -
                            </span>
                          )}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              c.status === 'Answered'
                                ? 'default'
                                : c.status === 'Pending'
                                  ? 'secondary'
                                  : c.status === 'Scheduled'
                                    ? 'outline'
                                    : 'destructive'
                            }
                          >
                            {c.status}
                          </Badge>
                        </TableCell>
                        <TableCell className='flex gap-2'>
                          <Button
                            size='icon'
                            variant='ghost'
                            title='View Profile'
                          >
                            <IconFileText size={16} />
                          </Button>
                          <Button size='icon' variant='ghost' title='Call Logs'>
                            <IconPhone size={16} />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
}
