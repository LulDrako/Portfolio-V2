import {createNavigation} from 'next-intl/navigation';
import {routing} from './routing';

export const {Link, useRouter, usePathname, getPathname, redirect} = createNavigation(routing);
