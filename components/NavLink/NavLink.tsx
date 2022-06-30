import NextLink from 'next/link';

import { Link } from '@chakra-ui/react';

export const NavLink = ({ title, url, onClick }: { title: string; url: string; onClick?: () => void }) => (
  <Link as="span" onClick={onClick}>
    <NextLink passHref href={url}>
      {title}
    </NextLink>
  </Link>
);
