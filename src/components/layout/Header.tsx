import { Link, useNavigate } from 'react-router-dom';
import { LinkIcon, LogOut } from 'lucide-react';

import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

export default function Header() {
  const navigate = useNavigate();

  const user = true;

  return (
    <nav className='flex items-center justify-between py-4'>
      <Link to='/'>
        <img src='/logo.png' alt='logo' className='h-16' />
      </Link>

      <div>
        {!user ? (
          <Button onClick={() => navigate('/auth')}>Login</Button>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger className='w-10 rounded-full overflow-hidden'>
              <Avatar>
                <AvatarImage src='https://github.com/shadcn.png' />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Zanak</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to='/dashboard' className='flex'>
                  <LinkIcon className='mr-2 size-3' />
                  My Links
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className='text-red-400'>
                <LogOut className='mr-2 size-3' />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </nav>
  );
}
