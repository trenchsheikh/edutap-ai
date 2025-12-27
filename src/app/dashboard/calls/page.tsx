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

export default function CallHistoryPage() {
  return (
    <PageContainer>
      <div className='flex flex-1 flex-col space-y-4'>
        <div className='flex items-start justify-between'>
          <Heading
            title='Call History'
            description='View logs and recordings of AI candidate interviews.'
          />
        </div>
        <Separator />

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Candidate</TableHead>
              <TableHead>Job Role</TableHead>
              <TableHead>Date & Time</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Outcome</TableHead>
              <TableHead>Recording</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className='font-medium'>John Doe</TableCell>
              <TableCell>Math Teacher</TableCell>
              <TableCell>Dec 27, 10:30 AM</TableCell>
              <TableCell>4m 12s</TableCell>
              <TableCell>
                <Badge>Shortlisted</Badge>
              </TableCell>
              <TableCell>
                <Button size='icon' variant='ghost'>
                  <IconPlayerPlay size={16} />
                </Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className='font-medium'>Sarah Ahmed</TableCell>
              <TableCell>Lab Tech</TableCell>
              <TableCell>Dec 26, 02:15 PM</TableCell>
              <TableCell>2m 30s</TableCell>
              <TableCell>
                <Badge variant='outline'>Follow-up</Badge>
              </TableCell>
              <TableCell>
                <Button size='icon' variant='ghost'>
                  <IconPlayerPlay size={16} />
                </Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className='font-medium'>Mohammed Khan</TableCell>
              <TableCell>Coordinator</TableCell>
              <TableCell>Dec 25, 09:00 AM</TableCell>
              <TableCell>0m 45s</TableCell>
              <TableCell>
                <Badge variant='destructive'>Voicemail</Badge>
              </TableCell>
              <TableCell>
                <span className='text-muted-foreground text-xs'>-</span>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </PageContainer>
  );
}
