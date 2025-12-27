'use client';
import PageContainer from '@/components/layout/page-container';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import {
  IconBriefcase,
  IconUsers,
  IconPhone,
  IconCheck
} from '@tabler/icons-react';
import { Badge } from '@/components/ui/badge';
import { useAppStore } from '@/lib/store';
import { useRouter } from 'next/navigation';
import { useMemo } from 'react';

import { translations } from '@/lib/translations';

export default function DashboardPage() {
  const { jobs, candidates, language } = useAppStore();
  const router = useRouter();
  const t = translations[language];

  // Compute Stats
  const activeJobs = jobs.filter((j) => j.status === 'Active').length;
  const totalCandidates = candidates.length;

  // Mock logic for "Calls Scheduled" (Status = Scheduled) and "Completed" (Status = Answered/Rejected)
  const callsScheduled = candidates.filter(
    (c) => c.status === 'Scheduled'
  ).length;
  const callsCompleted = candidates.filter((c) =>
    ['Answered', 'Rejected'].includes(c.status)
  ).length;

  // Recent Jobs (Sort by date desc, take 5)
  const recentJobs = useMemo(() => {
    return [...jobs]
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
      .slice(0, 5);
  }, [jobs]);

  // Top Candidates (Sort by Match Score desc, take 5 - excluding those without scores)
  const topCandidates = useMemo(() => {
    return [...candidates]
      .filter((c) => c.matchScore !== undefined)
      .sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0))
      .slice(0, 5);
  }, [candidates]);

  return (
    <PageContainer>
      <div className='flex flex-1 flex-col space-y-4'>
        <div className='flex items-center justify-between space-y-2'>
          <h2 className='text-2xl font-bold tracking-tight'>
            {t['dash.title']}
          </h2>
        </div>
        <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
          <Card
            className='hover:bg-muted/50 cursor-pointer transition-colors'
            onClick={() => router.push('/dashboard/jobs')}
          >
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                {t['dash.activeJobs']}
              </CardTitle>
              <IconBriefcase className='text-muted-foreground h-4 w-4' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>{activeJobs}</div>
              <p className='text-muted-foreground text-xs'>
                {jobs.length - activeJobs} {t['dash.draftsClosed']}
              </p>
            </CardContent>
          </Card>
          <Card
            className='hover:bg-muted/50 cursor-pointer transition-colors'
            onClick={() => router.push('/dashboard/candidates')}
          >
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                {t['dash.candidatesUploaded']}
              </CardTitle>
              <IconUsers className='text-muted-foreground h-4 w-4' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>{totalCandidates}</div>
              <p className='text-muted-foreground text-xs'>
                {t['dash.acrossJobs']}
              </p>
            </CardContent>
          </Card>
          <Card
            className='hover:bg-muted/50 cursor-pointer transition-colors'
            onClick={() => router.push('/dashboard/calls')}
          >
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                {t['dash.callsScheduled']}
              </CardTitle>
              <IconPhone className='text-muted-foreground h-4 w-4' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>{callsScheduled}</div>
              <p className='text-muted-foreground text-xs'>
                {t['dash.pendingExecution']}
              </p>
            </CardContent>
          </Card>
          <Card
            className='hover:bg-muted/50 cursor-pointer transition-colors'
            onClick={() => router.push('/dashboard/calls')}
          >
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                {t['dash.callsCompleted']}
              </CardTitle>
              <IconCheck className='text-muted-foreground h-4 w-4' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>{callsCompleted}</div>
              <p className='text-muted-foreground text-xs'>
                {t['dash.lifetimeTotal']}
              </p>
            </CardContent>
          </Card>
        </div>

        <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-7'>
          <Card className='col-span-4'>
            <CardHeader>
              <CardTitle>{t['dash.recentJobs']}</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t['dash.jobTitle']}</TableHead>
                    <TableHead>{t['dash.department']}</TableHead>
                    <TableHead>{t['dash.status']}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentJobs.map((job) => (
                    <TableRow
                      key={job.id}
                      className='hover:bg-muted/50 cursor-pointer'
                      onClick={() => router.push(`/dashboard/jobs/${job.id}`)}
                    >
                      <TableCell className='font-medium'>{job.title}</TableCell>
                      <TableCell>{job.department}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            job.status === 'Active' ? 'default' : 'secondary'
                          }
                        >
                          {job.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          <Card className='col-span-3'>
            <CardHeader>
              <CardTitle>{t['dash.topCandidates']}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='space-y-8'>
                {topCandidates.length === 0 ? (
                  <p className='text-muted-foreground py-4 text-center text-sm'>
                    {t['dash.noScored']}
                  </p>
                ) : (
                  topCandidates.map((c) => (
                    <div key={c.id} className='flex items-center'>
                      <span className='relative flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-slate-100'>
                        <span className='font-medium'>
                          {c.name.substring(0, 2).toUpperCase()}
                        </span>
                      </span>
                      <div className='ml-4 space-y-1'>
                        <p className='text-sm leading-none font-medium'>
                          {c.name}
                        </p>
                        <p className='text-muted-foreground text-sm'>
                          {c.role}
                        </p>
                      </div>
                      <div
                        className={`ml-auto font-medium ${
                          (c.matchScore || 0) >= 85
                            ? 'text-green-600'
                            : (c.matchScore || 0) >= 70
                              ? 'text-lime-600'
                              : 'text-orange-600'
                        }`}
                      >
                        {c.matchScore}%
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageContainer>
  );
}
