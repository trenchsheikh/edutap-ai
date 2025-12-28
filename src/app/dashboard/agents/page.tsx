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
  IconClock,
  IconTrash,
  IconEdit,
  IconLanguage,
  IconMicrophone,
  IconInfoCircle,
  IconMessageChatbot,
  IconCheck
} from '@tabler/icons-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { toast } from 'sonner';
import { Agent } from '@/lib/mock-data';
import { motion, AnimatePresence } from 'framer-motion';

import { translations } from '@/lib/translations';
import { useAppStore } from '@/lib/store';
import { useState } from 'react';

const MotionTableRow = motion(TableRow);

const initialNewAgent: Partial<Agent> = {
  name: '',
  type: 'Screening',
  language: 'English',
  voiceId: 'en-US-Neural2-F',
  personality: '',
  instructions: ''
};

export default function AgentsPage() {
  const { language, agents, addAgent, updateAgent, deleteAgent } =
    useAppStore();
  const t = translations[language];

  const [open, setOpen] = useState(false);
  const [editingAgent, setEditingAgent] = useState<Agent | null>(null);
  const [formData, setFormData] = useState<Partial<Agent>>(initialNewAgent);

  const handleOpenCreate = () => {
    setEditingAgent(null);
    setFormData(initialNewAgent);
    setOpen(true);
  };

  const handleOpenEdit = (agent: Agent) => {
    setEditingAgent(agent);
    setFormData(agent);
    setOpen(true);
  };

  const handleSave = () => {
    if (!formData.name) {
      toast.error('Agent name is required');
      return;
    }

    if (editingAgent) {
      updateAgent(editingAgent.id, formData);
      toast.success('Agent updated successfully');
    } else {
      const newAgent: Agent = {
        ...(formData as Agent),
        id: Math.random().toString(36).substr(2, 9),
        status: 'Idle',
        lastActive: 'Just now'
      };
      addAgent(newAgent);
      toast.success('New agent created successfully');
    }
    setOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this agent?')) {
      deleteAgent(id);
      toast.success('Agent removed');
    }
  };

  const handleTestCall = (agentName: string) => {
    toast.promise(new Promise((resolve) => setTimeout(resolve, 2000)), {
      loading: `Initiating test call with ${agentName}...`,
      success: `Test call completed successfully`,
      error: 'Call failed'
    });
  };

  return (
    <PageContainer>
      <div className='flex flex-1 flex-col space-y-4'>
        <div className='flex items-start justify-between'>
          <Heading
            title={`${t['agents.title']} (${agents.length})`}
            description={t['agents.desc']}
          />
          <Button onClick={handleOpenCreate}>
            <IconPlus className='mr-2 h-4 w-4' /> {t['agents.create']}
          </Button>
        </div>
        <Separator />

        <div className='grid gap-4 md:grid-cols-3'>
          <Card className='border-primary/20 bg-primary/5'>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                {t['agents.active']}
              </CardTitle>
              <IconRobot className='text-primary h-4 w-4' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>
                {agents.filter((a) => a.status === 'Active').length}
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
                <TableHead className='text-right'>
                  {t['common.actions'] || 'Actions'}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <AnimatePresence mode='popLayout'>
                {agents.map((agent) => (
                  <MotionTableRow
                    key={agent.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    layout
                  >
                    <TableCell className='font-medium'>{agent.name}</TableCell>
                    <TableCell>
                      <Badge variant='outline'>{agent.type}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className='flex items-center gap-1.5'>
                        <IconLanguage className='text-muted-foreground h-3.5 w-3.5' />
                        {agent.language}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className='flex items-center gap-1.5'>
                        <IconMicrophone className='text-muted-foreground h-3.5 w-3.5' />
                        {agent.voiceId}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          agent.status === 'Active' ? 'default' : 'secondary'
                        }
                        className={
                          agent.status === 'Active'
                            ? 'bg-green-500 hover:bg-green-600'
                            : ''
                        }
                      >
                        {t[`status.${agent.status}` as keyof typeof t] ||
                          agent.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{agent.lastActive}</TableCell>
                    <TableCell className='text-right'>
                      <div className='flex justify-end gap-1'>
                        <Button
                          variant='ghost'
                          size='icon'
                          onClick={() => handleTestCall(agent.name)}
                          title='Test Call'
                        >
                          <IconPhone className='h-4 w-4' />
                        </Button>
                        <Button
                          variant='ghost'
                          size='icon'
                          onClick={() => handleOpenEdit(agent)}
                        >
                          <IconEdit className='h-4 w-4' />
                        </Button>
                        <Button
                          variant='ghost'
                          size='icon'
                          className='text-destructive hover:bg-destructive/10 hover:text-destructive'
                          onClick={() => handleDelete(agent.id)}
                        >
                          <IconTrash className='h-4 w-4' />
                        </Button>
                      </div>
                    </TableCell>
                  </MotionTableRow>
                ))}
              </AnimatePresence>
            </TableBody>
          </Table>
        </Card>

        {/* Create/Edit Agent Modal */}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className='max-w-2xl'>
            <DialogHeader>
              <DialogTitle>
                {editingAgent ? t['agents.modal.title'] : t['agents.create']}
              </DialogTitle>
              <DialogDescription>{t['agents.modal.desc']}</DialogDescription>
            </DialogHeader>

            <div className='grid gap-6 py-4'>
              <div className='grid grid-cols-2 gap-4'>
                <div className='space-y-2'>
                  <Label htmlFor='name'>{t['agents.form.name']}</Label>
                  <Input
                    id='name'
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder='e.g., Sarah (Screening)'
                  />
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='type'>{t['agents.form.type']}</Label>
                  <Select
                    value={formData.type}
                    onValueChange={(val) =>
                      setFormData({ ...formData, type: val as any })
                    }
                  >
                    <SelectTrigger id='type'>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='Screening'>Screening</SelectItem>
                      <SelectItem value='Scheduling'>Scheduling</SelectItem>
                      <SelectItem value='Support'>Support</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className='grid grid-cols-2 gap-4'>
                <div className='space-y-2'>
                  <Label htmlFor='language'>{t['agents.form.language']}</Label>
                  <Select
                    value={formData.language}
                    onValueChange={(val) =>
                      setFormData({ ...formData, language: val as any })
                    }
                  >
                    <SelectTrigger id='language'>
                      <div className='flex items-center gap-2'>
                        <IconLanguage className='h-4 w-4' />
                        <SelectValue />
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='English'>English</SelectItem>
                      <SelectItem value='Arabic'>Arabic</SelectItem>
                      <SelectItem value='Bilingual'>Bilingual</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='voice'>{t['agents.form.voice']}</Label>
                  <Select
                    value={formData.voiceId}
                    onValueChange={(val) =>
                      setFormData({ ...formData, voiceId: val })
                    }
                  >
                    <SelectTrigger id='voice'>
                      <div className='flex items-center gap-2'>
                        <IconMicrophone className='h-4 w-4' />
                        <SelectValue />
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='en-US-Neural2-F'>
                        Neural Female (US)
                      </SelectItem>
                      <SelectItem value='en-GB-Wavenet-A'>
                        Wavenet Male (UK)
                      </SelectItem>
                      <SelectItem value='ar-XA-Wavenet-B'>
                        Wavenet Male (Arabic)
                      </SelectItem>
                      <SelectItem value='ar-XA-Wavenet-A'>
                        Wavenet Female (Arabic)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className='space-y-2'>
                <Label
                  htmlFor='personality'
                  className='flex items-center gap-2'
                >
                  <IconMessageChatbot className='text-primary h-4 w-4' />
                  {t['agents.form.personality']}
                </Label>
                <Input
                  id='personality'
                  value={formData.personality}
                  onChange={(e) =>
                    setFormData({ ...formData, personality: e.target.value })
                  }
                  placeholder={t['agents.form.personalityPlaceholder']}
                />
              </div>

              <div className='space-y-2'>
                <Label
                  htmlFor='instructions'
                  className='flex items-center gap-2'
                >
                  <IconInfoCircle className='text-primary h-4 w-4' />
                  {t['agents.form.instructions']}
                </Label>
                <Textarea
                  id='instructions'
                  className='min-h-[120px] resize-none'
                  value={formData.instructions}
                  onChange={(e) =>
                    setFormData({ ...formData, instructions: e.target.value })
                  }
                  placeholder={t['agents.form.instructionsPlaceholder']}
                />
              </div>
            </div>

            <DialogFooter>
              <Button variant='outline' onClick={() => setOpen(false)}>
                {t['common.cancel']}
              </Button>
              <Button onClick={handleSave}>
                {editingAgent ? t['common.save'] : t['common.create']}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </PageContainer>
  );
}
