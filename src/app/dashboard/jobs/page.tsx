'use client';

import PageContainer from '@/components/layout/page-container';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { IconPlus } from '@tabler/icons-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/lib/store';
import { format } from 'date-fns';

import { translations } from '@/lib/translations';

export default function JobsPage() {
  const router = useRouter();
  const { jobs, language } = useAppStore();
  const t = translations[language];

  return (
    <PageContainer>
      <div className='flex flex-1 flex-col space-y-4'>
        <div className='flex items-start justify-between'>
          <Heading
            title={`${t['jobs.title']} (${jobs.length})`}
            description={t['jobs.description']}
          />
          <Link href='/dashboard/jobs/new'>
            <Button>
              <IconPlus className='mr-2 h-4 w-4' /> {t['jobs.createNew']}
            </Button>
          </Link>
        </div>
        <Separator />

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t['jobs.table.title']}</TableHead>
              <TableHead>{t['jobs.table.dept']}</TableHead>
              <TableHead>{t['jobs.table.school']}</TableHead>
              <TableHead>{t['jobs.table.candidates']}</TableHead>
              <TableHead>{t['jobs.table.status']}</TableHead>
              <TableHead>{t['jobs.table.created']}</TableHead>
              <TableHead>{t['jobs.table.actions']}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {jobs.map((job) => (
              <TableRow key={job.id}>
                <TableCell className='font-medium'>{job.title}</TableCell>
                <TableCell>{job.department}</TableCell>
                <TableCell>{job.school}</TableCell>
                <TableCell>{job.candidates.length}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      job.status === 'Active'
                        ? 'default'
                        : job.status === 'Draft'
                          ? 'secondary'
                          : 'outline'
                    }
                  >
                    {job.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  {format(new Date(job.createdAt), 'MMM dd, yyyy')}
                </TableCell>
                <TableCell>
                  <Button
                    variant='ghost'
                    size='sm'
                    onClick={() => router.push(`/dashboard/jobs/${job.id}`)}
                  >
                    {t['common.view']}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </PageContainer>
  );
}
