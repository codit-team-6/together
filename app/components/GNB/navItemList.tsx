'use client';

import clsx from 'clsx';
import Link from 'next/link';
import {usePathname} from 'next/navigation';

import {PATH_LIST} from '../../constants/routing';

function NavItemList() {
  const currentPath = usePathname();

  return (
    <ul className="flex grow items-center gap-3 px-3 text-sm font-semibold text-orange-50 tablet:px-5 tablet:text-base">
      {PATH_LIST.map(navItem => (
        <li key={navItem.path}>
          <Link
            href={navItem.path}
            className={clsx({
              'text-gray-900 hover:text-gray-900': currentPath === navItem.path,
              'hover:text-orange-200': currentPath !== navItem.path,
            })}
          >
            {navItem.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default NavItemList;
