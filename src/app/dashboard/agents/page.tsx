'use client';

import PageContainer from '@/components/layout/page-container';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { IconSettings, IconRobot, IconPlus } from '@tabler/icons-react';

export default function AgentsPage() {
  const agents = [
    {
      name: 'Math Dept Recruiter',
      personality: 'Professional',
      lang: 'English',
      jobs: 3,
      status: 'Active'
    },
    {
      name: 'Admin Screener',
      personality: 'Friendly',
      lang: 'Bilingual',
      jobs: 1,
      status: 'Idle'
    },
    {
      name: 'Science Specialist',
      personality: 'Technical',
      lang: 'English',
      jobs: 0,
      status: 'Draft'
    }
  ];

  return (
    <PageContainer>
      <div className='flex flex-1 flex-col space-y-4'>
        <div className='flex items-start justify-between'>
          <Heading
            title='AI Agents'
            description='Configure your AI recruiters and their personalities.'
          />
          <Button>
            <IconPlus className='mr-2 h-4 w-4' /> Create Agent
          </Button>
        </div>
        <Separator />

        <div className='grid gap-4 md:grid-cols-3'>
          {agents.map((agent, i) => (
            <Card key={i}>
              <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                <CardTitle className='text-lg font-medium'>
                  {agent.name}
                </CardTitle>
                <IconRobot className='text-muted-foreground h-4 w-4' />
              </CardHeader>
              <CardContent className='pt-4'>
                <div className='mb-4 flex gap-2'>
                  <Badge variant='outline'>{agent.personality}</Badge>
                  <Badge variant='secondary'>{agent.lang}</Badge>
                </div>
                <div className='text-muted-foreground text-sm'>
                  Assigned to{' '}
                  <span className='text-foreground font-medium'>
                    {agent.jobs} Jobs
                  </span>
                </div>
              </CardContent>
              <CardFooter className='justify-between'>
                <Badge
                  variant={agent.status === 'Active' ? 'default' : 'secondary'}
                >
                  {agent.status}
                </Badge>
                <Button variant='ghost' size='sm'>
                  <IconSettings className='mr-2 h-4 w-4' /> Configure
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </PageContainer>
  );
}
