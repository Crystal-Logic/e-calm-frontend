import NextLink from 'next/link';

import { Link } from '@chakra-ui/react';

export const NavLink = ({ title, url, onClick }: { title: string; url: string; onClick?: () => void }) => (
  <NextLink passHref href={url}>
    <Link onClick={onClick}>{title}</Link>
  </NextLink>
);
