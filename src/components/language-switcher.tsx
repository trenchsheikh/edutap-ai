'use client';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { IconWorld } from '@tabler/icons-react';
import { useAppStore } from '@/lib/store';

export function LanguageSwitcher() {
  const { language, setLanguage } = useAppStore();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='ghost'
          size='icon'
          className='h-9 w-9 rounded-full border'
        >
          <IconWorld className='h-[1.2rem] w-[1.2rem]' />
          <span className='sr-only'>Toggle language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align={language === 'ar' ? 'start' : 'end'}>
        <DropdownMenuItem onClick={() => setLanguage('en')}>
          English
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage('ar')}>
          Arabic (العربية)
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
