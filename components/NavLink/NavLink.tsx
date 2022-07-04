import NextLink from 'next/link';

import { Link } from '@chakra-ui/react';

type NavLinkProps = {
  color?: string;
  title: string;
  url: string;
  onClick?: () => void;
};

export const NavLink = ({ title, url, onClick, color = 'inherit' }: NavLinkProps) => (
  <NextLink passHref href={url}>
    <Link color={color} onClick={onClick}>
      {title}
    </Link>
  </NextLink>
);
