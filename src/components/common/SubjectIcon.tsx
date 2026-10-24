import React from 'react';
import {
  BookOpen,
  ChartColumn,
  Briefcase,
  Cpu,
  FlaskConical,
  GitBranch,
  Globe,
  Heart,
  Presentation,
  Users,
} from 'lucide-react';

const ICONS: Record<string, React.ComponentType<{ size?: number | string; strokeWidth?: number }>> = {
  CNC: Globe,
  OS: Cpu,
  TOC: GitBranch,
  'Data Science': ChartColumn,
  UHV: Heart,
  ESD: Briefcase,
  SCR: Users,
  PPTs: Presentation,
  'Lab Manuals': FlaskConical,
};

interface SubjectIconProps {
  name: string;
  size?: number;
}

export const SubjectIcon: React.FC<SubjectIconProps> = ({ name, size = 18 }) => {
  const Icon = ICONS[name] ?? BookOpen;
  return <Icon size={size} strokeWidth={1.9} />;
};
