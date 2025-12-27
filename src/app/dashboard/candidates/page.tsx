'use client';

import { useState } from 'react';
import PageContainer from '@/components/layout/page-container';
import { FileUploader } from '@/components/file-uploader';
import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card'; // Added Card import
import { IconPhone, IconDownload, IconFileText } from '@tabler/icons-react';
import { useAppStore } from '@/lib/store';

export default function CandidatesPage() {
  const [files, setFiles] = useState<File[]>([]);
  const { candidates, addCandidate } = useAppStore();

  const handleUpload = async (uploadedFiles: File[]) => {
    // Simulate candidate processing
    uploadedFiles.forEach((file) => {
      addCandidate({
        id: Math.random().toString(36).substr(2, 9),
        name: file.name.split('.')[0],
        role: 'Detected from CV',
        email: 'pending@extract.com',
        phone: '-',
        exp: '-',
        salary: '-',
        status: 'Pending',
        avatar: '',
        cvFile: file.name
      });
    });
    setFiles([]); // Clear queue after upload
  };

  return (
    <PageContainer>
      <div className='flex flex-1 flex-col space-y-4'>
        <div className='flex items-start justify-between'>
          <Heading
            title={`Candidates (${candidates.length})`}
            description='Manage candidate profiles and AI screening status.'
          />
        </div>
        <Separator />

        <div className='grid gap-4 md:grid-cols-4'>
          <div className='bg-muted/20 sticky top-4 h-fit rounded-lg border p-4 md:col-span-1'>
            <h3 className='mb-2 font-semibold'>Upload CVs</h3>
            <p className='text-muted-foreground mb-4 text-sm'>
              Upload PDF or DOCX resumes to automatically add candidates.
            </p>
            <FileUploader
              maxFiles={10}
              maxSize={4 * 1024 * 1024}
              value={files}
              onValueChange={setFiles}
              onUpload={handleUpload}
              accept={{
                'application/pdf': [],
                'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
                  []
              }}
            />
          </div>

          <div className='md:col-span-3'>
            <Card>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Candidate Name</TableHead>
                    <TableHead>Target Role</TableHead>
                    <TableHead>Experience</TableHead>
                    <TableHead>Desired Salary</TableHead>
                    <TableHead>Call Outcome</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {candidates.map((c) => (
                    <TableRow key={c.id}>
                      <TableCell className='font-medium'>
                        <div className='flex items-center gap-2'>
                          {c.name}
                          {c.cvFile && (
                            <IconFileText
                              size={14}
                              className='text-muted-foreground'
                            />
                          )}
                        </div>
                      </TableCell>
                      <TableCell>{c.role}</TableCell>
                      <TableCell>{c.exp}</TableCell>
                      <TableCell>{c.salary}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            c.status === 'Answered' || c.status === 'Scheduled'
                              ? 'default'
                              : c.status === 'Pending'
                                ? 'secondary'
                                : 'destructive'
                          }
                        >
                          {c.status}
                        </Badge>
                      </TableCell>
                      <TableCell className='flex gap-2'>
                        <Button size='icon' variant='ghost' title='Download CV'>
                          <IconDownload size={16} />
                        </Button>
                        <Button size='icon' variant='ghost' title='Call Logs'>
                          <IconPhone size={16} />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
