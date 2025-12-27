'use client';

import PageContainer from '@/components/layout/page-container';
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
import { Button } from '@/components/ui/button';
import { IconPlayerPlay } from '@tabler/icons-react';
import { Card } from '@/components/ui/card';

import { translations } from '@/lib/translations';
import { useAppStore } from '@/lib/store';
import { ar, enUS } from 'date-fns/locale';
import { format } from 'date-fns';

// Mock Data for Calls
const calls = [
  {
    id: '1',
    candidate: 'John Doe',
    job: 'Head of English',
    duration: '12m 30s',
    status: 'Completed',
    date: '2024-04-20T09:30:00',
    recording: 'rec_123.mp3'
  },
  {
    id: '2',
    candidate: 'Sarah Smith',
    job: 'Math Teacher',
    duration: '08m 15s',
    status: 'Completed',
    date: '2024-04-20T10:15:00',
    recording: 'rec_124.mp3'
  },
  {
    id: '3',
    candidate: 'Michael Brown',
    job: 'Science Teacher',
    duration: '00m 00s',
    status: 'Missed',
    date: '2024-04-20T11:00:00',
    recording: null
  },
  {
    id: '4',
    candidate: 'Emily Davis',
    job: 'Nurse',
    duration: '01m 45s',
    status: 'Voicemail',
    date: '2024-04-19T14:20:00',
    recording: 'rec_125.mp3'
  },
  {
    id: '5',
    candidate: 'David Wilson',
    job: 'Principal',
    duration: 'Pending',
    status: 'Failed',
    date: '2024-04-19T15:00:00',
    recording: null
  }
];

export default function CallHistoryPage() {
  const { language } = useAppStore();
  const t = translations[language];
  const dateLocale = language === 'ar' ? ar : enUS;

  return (
    <PageContainer>
      <div className='flex flex-1 flex-col space-y-4'>
        <div className='flex items-start justify-between'>
          <Heading
            title={`${t['calls.title']} (${new Intl.NumberFormat(language === 'ar' ? 'ar-EG' : 'en-US').format(calls.length)})`}
            description={t['calls.desc']}
          />
        </div>
        <Separator />

        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t['calls.table.candidate']}</TableHead>
                <TableHead>{t['calls.table.job']}</TableHead>
                <TableHead>{t['calls.table.duration']}</TableHead>
                <TableHead>{t['calls.table.status']}</TableHead>
                <TableHead>{t['calls.table.date']}</TableHead>
                <TableHead>{t['calls.table.recording']}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {calls.map((call) => (
                <TableRow key={call.id}>
                  <TableCell className='font-medium'>
                    {call.candidate}
                  </TableCell>
                  <TableCell>
                    {t[`role.${call.job}` as keyof typeof t] || call.job}
                  </TableCell>
                  <TableCell>{call.duration}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        call.status === 'Completed'
                          ? 'default'
                          : call.status === 'Missed' || call.status === 'Failed'
                            ? 'destructive'
                            : 'secondary'
                      }
                    >
                      {t[`status.${call.status}` as keyof typeof t] ||
                        call.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {format(new Date(call.date), 'PPpp', {
                      locale: dateLocale
                    })}
                  </TableCell>
                  <TableCell>
                    {call.recording && (
                      <Button variant='outline' size='sm'>
                        <IconPlayerPlay className='mr-2 h-3 w-3' /> Play
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>
    </PageContainer>
  );
}
