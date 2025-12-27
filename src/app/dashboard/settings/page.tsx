'use client';

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
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

export default function SettingsPage() {
  return (
    <PageContainer>
      <div className='flex max-w-2xl flex-1 flex-col space-y-4'>
        <Heading
          title='Settings'
          description='Manage your organization and platform preferences.'
        />
        <Separator />

        <Card>
          <CardHeader>
            <CardTitle>Organization Details</CardTitle>
            <CardDescription>
              Update your school or organization info.
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div className='space-y-2'>
              <Label>Organization Name</Label>
              <Input defaultValue='Doha Modern School' />
            </div>
            <div className='space-y-2'>
              <Label>Default Language</Label>
              <Select defaultValue='en'>
                <SelectTrigger>
                  <SelectValue placeholder='Select Language' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='en'>English</SelectItem>
                  <SelectItem value='ar'>Arabic (العربية)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className='space-y-2'>
              <Label>Timezone</Label>
              <Select defaultValue='qatar'>
                <SelectTrigger>
                  <SelectValue placeholder='Select Timezone' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='qatar'>
                    Qatar Standard Time (GMT+3)
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Call Preferences</CardTitle>
            <CardDescription>Global settings for AI calls.</CardDescription>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div className='flex items-center justify-between'>
              <div className='space-y-0.5'>
                <Label>Record Calls</Label>
                <div className='text-muted-foreground text-sm'>
                  Automatically record all AI interviews.
                </div>
              </div>
              <Switch defaultChecked />
            </div>
            <div className='flex items-center justify-between'>
              <div className='space-y-0.5'>
                <Label>Allow Voicemail</Label>
                <div className='text-muted-foreground text-sm'>
                  Leave a message if candidate doesn't answer.
                </div>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        <div className='flex justify-end'>
          <Button>Save Changes</Button>
        </div>
      </div>
    </PageContainer>
  );
}
