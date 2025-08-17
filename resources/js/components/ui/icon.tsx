import { cn } from '@/lib/utils';
import {
  ArrowRight,
  BarChart3,
  Check,
  CheckCircle,
  ChevronDown,
  Edit,
  Eye,
  Home,
  Key,
  LogIn,
  Menu,
  PieChart,
  Plus,
  Rocket,
  Settings,
  Shield,
  ShieldCheck,
  Tag,
  Trash,
  TrendingUp,
  User,
  UserPlus,
  Users,
} from 'lucide-react';

const icons = {
  'arrow-right': ArrowRight,
  'chart-bar': BarChart3,
  'chart-line': TrendingUp,
  'chart-pie': PieChart,
  'check-circle': CheckCircle,
  'chevron-down': ChevronDown,
  'dashboard': Home,
  'edit': Edit,
  'eye': Eye,
  'key': Key,
  'log-in': LogIn,
  'menu': Menu,
  'plus': Plus,
  'rocket': Rocket,
  'settings': Settings,
  'shield': Shield,
  'shield-check': ShieldCheck,
  'tag': Tag,
  'trash': Trash,
  'user': User,
  'user-plus': UserPlus,
  'users': Users,
  'check': Check,
};

interface IconProps extends React.HTMLAttributes<SVGElement> {
  name: keyof typeof icons;
  size?: number;
}

export function Icon({ name, size = 16, className, ...props }: IconProps) {
  const IconComponent = icons[name];
  
  if (!IconComponent) {
    return null;
  }

  return (
    <IconComponent
      size={size}
      className={cn('inline-block', className)}
      {...props}
    />
  );
}