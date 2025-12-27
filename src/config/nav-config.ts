import { NavItem } from '@/types';
import { TranslationKey } from '@/lib/translations';

export const navItems: (NavItem & { title: TranslationKey })[] = [
  {
    title: 'nav.dashboard',
    url: '/dashboard/overview',
    icon: 'dashboard',
    isActive: false,
    shortcut: ['d', 'd'],
    items: []
  },
  {
    title: 'nav.jobs',
    url: '/dashboard/jobs',
    icon: 'jobs',
    isActive: false,
    shortcut: ['j', 'j'],
    items: []
  },
  {
    title: 'nav.candidates',
    url: '/dashboard/candidates',
    icon: 'candidates',
    isActive: false,
    shortcut: ['c', 'c'],
    items: []
  },
  {
    title: 'nav.agents',
    url: '/dashboard/agents',
    icon: 'agents',
    isActive: false,
    shortcut: ['a', 'a'],
    items: []
  },
  {
    title: 'nav.calclogs',
    url: '/dashboard/calls',
    icon: 'calls',
    isActive: false,
    shortcut: ['h', 'h'],
    items: []
  },
  {
    title: 'nav.settings',
    url: '/dashboard/settings',
    icon: 'settings',
    isActive: false,
    shortcut: ['s', 's'],
    items: []
  }
];
