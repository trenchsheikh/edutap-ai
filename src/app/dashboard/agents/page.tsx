'use client';

import PageContainer from '@/components/layout/page-container';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import {
  IconSettings,
  IconRobot,
  IconPlus,
  IconPhone,
  IconClock
} from '@tabler/icons-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';

import { translations } from '@/lib/translations';
import { useAppStore } from '@/lib/store';
import { useState } from 'react';

// Mock Data for Agents
const agents = [
  {
    id: '1',
    name: 'Recruiter Sarah',
    type: 'Screening',
    language: 'English (US)',
    voiceId: 'Sarah-Neo',
    status: 'Active',
    lastActive: '2 min ago'
  },
  {
    id: '2',
    name: 'Coordinator Mike',
    type: 'Scheduling',
    language: 'English (UK)',
    voiceId: 'Mike-Standard',
    status: 'Idle',
    lastActive: '1 hr ago'
  },
  {
    id: '3',
    name: 'Arabic Screener Ahmed',
    type: 'Screening',
    language: 'Arabic (Qatar)',
    voiceId: 'Ahmed-Neural',
    status: 'Active',
    lastActive: 'Active now'
  }
];

export default function AgentsPage() {
  const [open, setOpen] = useState(false);
  const { language } = useAppStore();
  const t = translations[language];

  return (
    <PageContainer>
      <div className='flex flex-1 flex-col space-y-4'>
        <div className='flex items-start justify-between'>
          <Heading
            title={`${t['agents.title']} (${agents.length})`}
            description={t['agents.desc']}
          />
          <Button onClick={() => setOpen(true)}>
            <IconPlus className='mr-2 h-4 w-4' /> {t['agents.create']}
          </Button>
        </div>
        <Separator />

        <div className='grid gap-4 md:grid-cols-3'>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                {t['agents.active']}
              </CardTitle>
              <IconRobot className='text-muted-foreground h-4 w-4' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>
                {new Intl.NumberFormat(
                  language === 'ar' ? 'ar-EG' : 'en-US'
                ).format(2)}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                {t['agents.total']}
              </CardTitle>
              <IconPhone className='text-muted-foreground h-4 w-4' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>
                {new Intl.NumberFormat(
                  language === 'ar' ? 'ar-EG' : 'en-US'
                ).format(1240)}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                {t['agents.avgDuration']}
              </CardTitle>
              <IconClock className='text-muted-foreground h-4 w-4' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>
                {new Intl.NumberFormat(
                  language === 'ar' ? 'ar-EG' : 'en-US'
                ).format(4.2)}
                m
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t['agents.table.name']}</TableHead>
                <TableHead>{t['agents.table.type']}</TableHead>
                <TableHead>{t['agents.table.language']}</TableHead>
                <TableHead>{t['agents.table.voice']}</TableHead>
                <TableHead>{t['agents.table.status']}</TableHead>
                <TableHead>{t['agents.table.lastActive']}</TableHead>
                <TableHead>{t['common.view']}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {agents.map((agent) => (
                <TableRow key={agent.id}>
                  <TableCell className='font-medium'>{agent.name}</TableCell>
                  <TableCell>{agent.type}</TableCell>
                  <TableCell>{agent.language}</TableCell>
                  <TableCell>{agent.voiceId}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        agent.status === 'Active' ? 'default' : 'secondary'
                      }
                    >
                      {t[`status.${agent.status}` as keyof typeof t] ||
                        agent.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{agent.lastActive}</TableCell>
                  <TableCell>
                    <Button variant='ghost' size='icon'>
                      <IconSettings className='h-4 w-4' />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>

        {/* Create Agent Modal Placeholder */}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{t['agents.modal.title']}</DialogTitle>
              <DialogDescription>{t['agents.modal.desc']}</DialogDescription>
            </DialogHeader>
            <div className='py-4'>
              {/* Form would go here */}
              <p className='text-muted-foreground text-sm'>
                Form placeholders...
              </p>
            </div>
            <div className='flex justify-end gap-2'>
              <Button variant='outline' onClick={() => setOpen(false)}>
                {t['common.cancel']}
              </Button>
              <Button onClick={() => setOpen(false)}>{t['common.view']}</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </PageContainer>
  );
}
