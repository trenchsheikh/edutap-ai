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

export default function DashboardPage() {
  return (
    <PageContainer>
      <div className='flex flex-1 flex-col space-y-4'>
        <div className='flex items-center justify-between space-y-2'>
          <h2 className='text-2xl font-bold tracking-tight'>
            Dashboard Overview
          </h2>
        </div>
        <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>Active Jobs</CardTitle>
              <IconBriefcase className='text-muted-foreground h-4 w-4' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>12</div>
              <p className='text-muted-foreground text-xs'>
                +2 from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                Candidates Uploaded
              </CardTitle>
              <IconUsers className='text-muted-foreground h-4 w-4' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>145</div>
              <p className='text-muted-foreground text-xs'>+18 this week</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                Calls Scheduled
              </CardTitle>
              <IconPhone className='text-muted-foreground h-4 w-4' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>8</div>
              <p className='text-muted-foreground text-xs'>For today</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                Calls Completed
              </CardTitle>
              <IconCheck className='text-muted-foreground h-4 w-4' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>84</div>
              <p className='text-muted-foreground text-xs'>Lifetime</p>
            </CardContent>
          </Card>
        </div>

        <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-7'>
          <Card className='col-span-4'>
            <CardHeader>
              <CardTitle>Recent Jobs</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Job Title</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className='font-medium'>
                      Mathematics Teacher
                    </TableCell>
                    <TableCell>High School</TableCell>
                    <TableCell>
                      <Badge variant='default'>Active</Badge>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className='font-medium'>
                      Science Lab Technician
                    </TableCell>
                    <TableCell>Science</TableCell>
                    <TableCell>
                      <Badge variant='secondary'>Draft</Badge>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className='font-medium'>
                      Primary School Coordinator
                    </TableCell>
                    <TableCell>Primary</TableCell>
                    <TableCell>
                      <Badge variant='default'>Active</Badge>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className='font-medium'>Art Teacher</TableCell>
                    <TableCell>Arts</TableCell>
                    <TableCell>
                      <Badge variant='outline'>Closed</Badge>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          <Card className='col-span-3'>
            <CardHeader>
              <CardTitle>Recent Candidates</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='space-y-8'>
                <div className='flex items-center'>
                  <span className='relative flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-slate-100'>
                    <span className='font-medium'>JD</span>
                  </span>
                  <div className='ml-4 space-y-1'>
                    <p className='text-sm leading-none font-medium'>John Doe</p>
                    <p className='text-muted-foreground text-sm'>
                      Math Teacher
                    </p>
                  </div>
                  <div className='ml-auto font-medium'>+85%</div>
                </div>
                <div className='flex items-center'>
                  <span className='relative flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-slate-100'>
                    <span className='font-medium'>AS</span>
                  </span>
                  <div className='ml-4 space-y-1'>
                    <p className='text-sm leading-none font-medium'>
                      Sarah Ahmed
                    </p>
                    <p className='text-muted-foreground text-sm'>Science Lab</p>
                  </div>
                  <div className='ml-auto font-medium'>+92%</div>
                </div>
                <div className='flex items-center'>
                  <span className='relative flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-slate-100'>
                    <span className='font-medium'>MK</span>
                  </span>
                  <div className='ml-4 space-y-1'>
                    <p className='text-sm leading-none font-medium'>
                      Mohammed Khan
                    </p>
                    <p className='text-muted-foreground text-sm'>Coordinator</p>
                  </div>
                  <div className='ml-auto font-medium'>+78%</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageContainer>
  );
}
