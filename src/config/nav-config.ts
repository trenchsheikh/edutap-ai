import { NavItem } from '@/types';

export const navItems: NavItem[] = [
  {
    title: 'Dashboard',
    url: '/dashboard/overview',
    icon: 'dashboard',
    isActive: false,
    shortcut: ['d', 'd'],
    items: []
  },
  {
    title: 'Jobs',
    url: '/dashboard/jobs',
    icon: 'jobs',
    isActive: false,
    shortcut: ['j', 'j'],
    items: []
  },
  {
    title: 'Candidates',
    url: '/dashboard/candidates',
    icon: 'candidates',
    isActive: false,
    shortcut: ['c', 'c'],
    items: []
  },
  {
    title: 'AI Agents',
    url: '/dashboard/agents',
    icon: 'agents',
    isActive: false,
    shortcut: ['a', 'a'],
    items: []
  },
  {
    title: 'Call History',
    url: '/dashboard/calls',
    icon: 'calls',
    isActive: false,
    shortcut: ['h', 'h'],
    items: []
  },
  {
    title: 'Settings',
    url: '/dashboard/settings',
    icon: 'settings',
    isActive: false,
    shortcut: ['s', 's'],
    items: []
  }
];
