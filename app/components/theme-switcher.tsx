import { Computer, Moon, Sun } from 'lucide-react';
import { href, useFetcher } from 'react-router';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '~/components/ui/dropdown-menu';
import { useRootData } from '~/hooks/use-route-data-hook';
import { cn } from '~/utils';

const icons = {
  light: <Sun className="h-5 w-5" />,
  dark: <Moon className="h-5 w-5" />,
  system: <Computer className="h-5 w-5" />
} as const;

const themes = Object.keys(icons) as Array<keyof typeof icons>;
type Theme = (typeof themes)[number];

export function ThemeToggle({ className }: { className?: string }) {
  const data = useRootData();
  const theme = data?.colorScheme as Theme;

  const fetcher = useFetcher();
  const optimisticTheme = fetcher.state !== 'idle' ? (fetcher.formData?.get('theme') as Theme) : theme;

  const updateTheme = (newTheme: Theme) => {
    const element = document.documentElement;
    element.setAttribute('data-theme', newTheme);
    element.style.colorScheme = newTheme;

    void fetcher.submit({ theme: newTheme }, { method: 'POST', action: href('/api/theme') });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={cn(
            'outline-none border-none bg-transparent w-full h-full flex items-center justify-center',
            className
          )}
        >
          <div className="w-5 h-5 flex items-center justify-center">{icons[optimisticTheme]}</div>
          <span className="sr-only">Toggle theme</span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="mt-2">
        {themes.map((key) => (
          <DropdownMenuItem
            key={key}
            className="space-x-2"
            onClick={() => updateTheme(key)}
            disabled={key === optimisticTheme}
          >
            {icons[key]}
            <span className="capitalize">{key}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
