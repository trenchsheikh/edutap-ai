'use client';

import { use, useState } from 'react';
import { useRouter } from 'next/navigation';
import PageContainer from '@/components/layout/page-container';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import {
  IconArrowLeft,
  IconPhone,
  IconMail,
  IconCalendar,
  IconMessage,
  IconDownload,
  IconUser,
  IconCheck,
  IconX,
  IconFileText,
  IconWand,
  IconMailOpened,
  IconCalendarStats,
  IconAlertCircle,
  IconBrandWhatsapp
} from '@tabler/icons-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useAppStore } from '@/lib/store';
import { translations } from '@/lib/translations';
import { ScrollArea } from '@/components/ui/scroll-area';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

export default function CandidateDetailPage({
  params
}: {
  params: Promise<{ jobId: string; candidateId: string }>;
}) {
  const { jobId, candidateId } = use(params);
  const router = useRouter();
  const { candidates, getJob, language } = useAppStore();
  const candidate = candidates.find((c) => c.id === candidateId);
  const job = getJob(jobId);

  // Multi-modal state
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);
  const [isEmailOpen, setIsEmailOpen] = useState(false);
  const [isWhatsAppOpen, setIsWhatsAppOpen] = useState(false);
  const [isRejectOpen, setIsRejectOpen] = useState(false);

  if (!candidate || !job) {
    return (
      <PageContainer>
        <div className='flex h-[50vh] flex-col items-center justify-center space-y-4'>
          <Heading
            title='Not Found'
            description='Candidate or job not found.'
          />
          <Button onClick={() => router.back()}>Go Back</Button>
        </div>
      </PageContainer>
    );
  }

  const handleAction = (action: string) => {
    toast.success(`Action Successfully Recorded`, {
      description: `${action} for ${candidate.name} has been processed.`
    });
  };

  return (
    <PageContainer>
      <div className='flex flex-1 flex-col space-y-6'>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className='flex items-center gap-4'
        >
          <Button variant='ghost' size='icon' onClick={() => router.back()}>
            <IconArrowLeft className='rtl:rotate-180' size={20} />
          </Button>
          <div className='flex-1'>
            <div className='flex items-center gap-3'>
              <Heading title={candidate.name} description={candidate.role} />
              <Badge
                className='ml-2'
                variant={
                  candidate.status === 'Answered'
                    ? 'default'
                    : candidate.status === 'Scheduled'
                      ? 'outline'
                      : 'secondary'
                }
              >
                {candidate.status}
              </Badge>
            </div>
          </div>
          <div className='flex gap-2'>
            <Button
              variant='outline'
              onClick={() => handleAction('Download CV')}
            >
              <IconDownload className='mr-2' size={18} />
              CV
            </Button>
            <Button
              className='bg-emerald-600 text-white shadow-lg shadow-emerald-500/20 transition-all hover:scale-105 hover:bg-emerald-700'
              onClick={() => setIsScheduleOpen(true)}
            >
              <IconCalendar className='mr-2' size={18} />
              Schedule Interview
            </Button>
          </div>
        </motion.div>

        <Separator />

        <div className='grid grid-cols-1 gap-6 lg:grid-cols-3'>
          {/* Left Column: Candidate Info & Gen Leads */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className='space-y-6 lg:col-span-1'
          >
            <Card className='from-card to-muted/30 overflow-hidden border-none bg-gradient-to-br shadow-md'>
              <CardHeader className='pb-2'>
                <CardTitle className='flex items-center gap-2 text-lg'>
                  <div className='bg-primary/10 text-primary rounded-full p-2'>
                    <IconUser size={20} />
                  </div>
                  Contact Info
                </CardTitle>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div className='flex flex-col'>
                  <span className='text-muted-foreground text-[10px] font-bold tracking-widest uppercase'>
                    Email
                  </span>
                  <span className='text-sm font-semibold'>
                    {candidate.email}
                  </span>
                </div>
                <div className='flex flex-col'>
                  <span className='text-muted-foreground text-[10px] font-bold tracking-widest uppercase'>
                    Phone
                  </span>
                  <span className='text-sm font-semibold'>
                    {candidate.phone}
                  </span>
                </div>
                <div className='flex flex-col'>
                  <span className='text-muted-foreground text-[10px] font-bold tracking-widest uppercase'>
                    Experience
                  </span>
                  <span className='text-sm font-semibold'>{candidate.exp}</span>
                </div>
                <div className='flex flex-col'>
                  <span className='text-muted-foreground text-[10px] font-bold tracking-widest uppercase'>
                    Match Score
                  </span>
                  <Badge
                    className='mt-1 w-fit px-3 py-1 font-bold'
                    variant='secondary'
                  >
                    {candidate.matchScore || 0}% Match
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card className='relative overflow-hidden border-emerald-100 bg-emerald-50/30 shadow-lg shadow-emerald-500/5 dark:border-emerald-900/50 dark:bg-emerald-950/20'>
              <div className='absolute top-0 right-0 scale-150 p-4 opacity-5'>
                <IconWand size={80} className='text-emerald-500' />
              </div>
              <CardHeader className='pb-2'>
                <CardTitle className='flex items-center gap-2 text-lg text-emerald-700 dark:text-emerald-400'>
                  <IconCheck size={20} />
                  AI Generated Leads
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className='space-y-3'>
                  {(
                    candidate.callDetails?.generatedLeads || [
                      'Strong background in British Curriculum',
                      'Local experience in Qatar',
                      'Eager to start immediately',
                      'Highly interested in the institution'
                    ]
                  ).map((lead, i) => (
                    <motion.li
                      key={i}
                      className='flex items-start gap-3 text-sm'
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + i * 0.1 }}
                    >
                      <div className='mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-900/50 dark:text-emerald-400'>
                        <IconCheck size={12} strokeWidth={3} />
                      </div>
                      <span className='leading-tight font-medium'>{lead}</span>
                    </motion.li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <div className='flex flex-col gap-2'>
              <Button
                variant='outline'
                className='hover:bg-primary/5 hover:text-primary justify-start py-6 transition-colors'
                onClick={() => setIsEmailOpen(true)}
              >
                <IconMail className='mr-3' size={20} />
                Send Follow-up Email
              </Button>
              <Button
                variant='outline'
                className='hover:bg-primary/5 hover:text-primary justify-start py-6 transition-colors'
                onClick={() => setIsWhatsAppOpen(true)}
              >
                <IconMessage className='mr-3' size={20} />
                WhatsApp Message
              </Button>
              <Button
                variant='outline'
                className='text-destructive hover:bg-destructive/10 hover:text-destructive border-destructive/20 justify-start py-6 transition-colors'
                onClick={() => setIsRejectOpen(true)}
              >
                <IconX className='mr-3' size={20} />
                Reject Candidate
              </Button>
            </div>
          </motion.div>

          {/* Right Column: Transcript & Question Responses */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className='space-y-6 lg:col-span-2'
          >
            <Card className='flex h-[450px] flex-col overflow-hidden border-none shadow-md'>
              <CardHeader className='bg-muted/30 shrink-0'>
                <CardTitle className='flex items-center gap-2 text-lg'>
                  <IconPhone size={20} className='text-primary' />
                  Call Transcript
                </CardTitle>
                <CardDescription>
                  Full recording transcript of the AI screening call.
                </CardDescription>
              </CardHeader>
              <CardContent className='flex-1 overflow-hidden p-6'>
                <ScrollArea className='h-full pr-4'>
                  <div className='space-y-6'>
                    {(
                      candidate.callDetails?.transcript || [
                        {
                          speaker: 'AI Agent',
                          text:
                            'Hello, am I speaking with ' + candidate.name + '?'
                        },
                        {
                          speaker: 'Candidate',
                          text: 'Yes, this is they. How can I help you?'
                        },
                        {
                          speaker: 'AI Agent',
                          text:
                            'I am calling regarding your application for the ' +
                            job.title +
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
                      ]
                    ).map((msg, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + i * 0.05 }}
                        className={`flex flex-col ${msg.speaker === 'AI Agent' ? 'items-start' : 'items-end'}`}
                      >
                        <span className='text-muted-foreground mb-2 px-1 text-[10px] font-bold tracking-widest uppercase'>
                          {msg.speaker}
                        </span>
                        <div
                          className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm shadow-sm transition-all ${
                            msg.speaker === 'AI Agent'
                              ? 'bg-muted/80 text-foreground rounded-tl-none border'
                              : 'bg-primary text-primary-foreground shadow-primary/20 rounded-tr-none'
                          }`}
                        >
                          {msg.text}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>

            <Card className='overflow-hidden border-none shadow-md'>
              <CardHeader className='bg-muted/30 pb-4'>
                <CardTitle className='flex items-center gap-2 text-lg'>
                  <IconFileText size={20} className='text-primary' />
                  Screening Responses
                </CardTitle>
              </CardHeader>
              <CardContent className='p-6'>
                <div className='grid gap-4 sm:grid-cols-2'>
                  {Object.entries(
                    candidate.callDetails?.responses || {
                      'Interest Level': 'High',
                      'Curriculum Experience': 'British (IGCSE, A-Level)',
                      Availability: 'Immediate',
                      'Salary Expectation': 'Negotiable',
                      'Location Preference': 'Doha Central',
                      'Years in Region': '4 Years'
                    }
                  ).map(([question, answer], i) => (
                    <motion.div
                      key={i}
                      className='group bg-card hover:border-primary/50 rounded-xl border p-4 transition-all hover:shadow-md'
                      whileHover={{ scale: 1.02 }}
                    >
                      <p className='text-muted-foreground group-hover:text-primary mb-1 text-[10px] font-bold tracking-wider uppercase transition-colors'>
                        {question}
                      </p>
                      <p className='text-sm font-bold'>{answer}</p>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* Schedule Interview Dialog */}
      <Dialog open={isScheduleOpen} onOpenChange={setIsScheduleOpen}>
        <DialogContent className='overflow-hidden p-0 sm:max-w-[425px]'>
          <div className='bg-primary text-primary-foreground p-6'>
            <div className='flex items-center gap-3'>
              <IconCalendarStats size={24} />
              <div>
                <h3 className='text-lg font-bold'>Schedule Interview</h3>
                <p className='text-primary-foreground/80 text-xs'>
                  Final round coordination for {candidate.name}
                </p>
              </div>
            </div>
          </div>
          <div className='space-y-4 p-6'>
            <div className='grid gap-4 py-2 text-sm'>
              <div className='space-y-2'>
                <Label>Interview Date</Label>
                <Input
                  type='date'
                  defaultValue={new Date().toISOString().split('T')[0]}
                />
              </div>
              <div className='space-y-2'>
                <Label>Start Time</Label>
                <Input type='time' defaultValue='10:00' />
              </div>
              <div className='space-y-2'>
                <Label>Interviewers</Label>
                <Input placeholder='e.g. Principal, Head of Department' />
              </div>
            </div>
            <DialogFooter className='pt-2'>
              <Button
                variant='outline'
                onClick={() => setIsScheduleOpen(false)}
              >
                Cancel
              </Button>
              <Button
                className='bg-emerald-600 hover:bg-emerald-700'
                onClick={() => {
                  handleAction('Interview Scheduling');
                  setIsScheduleOpen(false);
                }}
              >
                Confirm Schedule
              </Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>

      {/* Email Follow-up Dialog */}
      <Dialog open={isEmailOpen} onOpenChange={setIsEmailOpen}>
        <DialogContent className='overflow-hidden p-0 sm:max-w-[500px]'>
          <div className='bg-muted/50 border-b p-6'>
            <div className='flex items-center gap-3'>
              <IconMailOpened size={24} className='text-primary' />
              <div>
                <h3 className='text-lg font-bold'>Compose Email</h3>
                <p className='text-muted-foreground text-xs'>
                  To: {candidate.email}
                </p>
              </div>
            </div>
          </div>
          <div className='space-y-4 p-6 text-sm'>
            <div className='space-y-2'>
              <Label>Subject</Label>
              <Input
                defaultValue={`Next steps for your application: ${job.title}`}
              />
            </div>
            <div className='space-y-2'>
              <Label>Message Content</Label>
              <Textarea
                className='min-h-[200px]'
                defaultValue={`Dear ${candidate.name},\n\nThank you for participating in our AI screening call. We are pleased to move forward with your application for the ${job.title} position at ${job.school}.\n\nOur team will be in touch shortly to coordinate a time for a formal interview.\n\nBest regards,\nRecruitment Team`}
              />
            </div>
            <DialogFooter>
              <Button variant='outline' onClick={() => setIsEmailOpen(false)}>
                Discard
              </Button>
              <Button
                onClick={() => {
                  handleAction('Email Follow-up');
                  setIsEmailOpen(false);
                }}
              >
                Send Email Now
              </Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>

      {/* WhatsApp Dialog */}
      <Dialog open={isWhatsAppOpen} onOpenChange={setIsWhatsAppOpen}>
        <DialogContent className='overflow-hidden p-0 sm:max-w-[400px]'>
          <div className='bg-[#25D366] p-6 text-white'>
            <div className='flex items-center gap-3'>
              <IconBrandWhatsapp size={24} />
              <div>
                <h3 className='text-lg font-bold'>WhatsApp Message</h3>
                <p className='text-xs text-white/80'>To: {candidate.phone}</p>
              </div>
            </div>
          </div>
          <div className='space-y-4 p-6 text-sm'>
            <div className='space-y-2'>
              <Label>Message Preview</Label>
              <div className='relative rounded-lg bg-[#DCF8C6] p-4 text-slate-800'>
                Hi {candidate.name}, great speaking with you today through our
                AI agent! We'd love to move forward to an interview. 🚀
                <div className='absolute top-2 -left-2 h-0 w-0 border-t-[8px] border-r-[12px] border-b-[8px] border-t-transparent border-r-[#DCF8C6] border-b-transparent' />
              </div>
            </div>
            <DialogFooter>
              <Button
                variant='outline'
                onClick={() => setIsWhatsAppOpen(false)}
              >
                Cancel
              </Button>
              <Button
                className='border-none bg-[#25D366] text-white hover:bg-[#128C7E]'
                onClick={() => {
                  handleAction('WhatsApp Message');
                  setIsWhatsAppOpen(false);
                }}
              >
                Send to Mobile
              </Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>

      {/* Reject Dialog */}
      <Dialog open={isRejectOpen} onOpenChange={setIsRejectOpen}>
        <DialogContent className='sm:max-w-[400px]'>
          <DialogHeader>
            <div className='text-destructive mb-2 flex items-center gap-2'>
              <IconAlertCircle size={24} />
              <DialogTitle>Reject Candidate?</DialogTitle>
            </div>
            <DialogDescription>
              Are you sure you want to reject {candidate.name}? This will move
              them to the rejected pool and stop any active process.
            </DialogDescription>
          </DialogHeader>
          <div className='space-y-4 py-4 text-sm'>
            <div className='flex items-center space-x-2'>
              <input
                type='checkbox'
                id='sendEmail'
                className='rounded border-gray-300'
                defaultChecked
              />
              <Label htmlFor='sendEmail'>
                Send rejection email automatedly
              </Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant='outline' onClick={() => setIsRejectOpen(false)}>
              Keep Candidate
            </Button>
            <Button
              variant='destructive'
              onClick={() => {
                handleAction('Candidate Rejection');
                setIsRejectOpen(false);
              }}
            >
              Confirm Rejection
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </PageContainer>
  );
}
