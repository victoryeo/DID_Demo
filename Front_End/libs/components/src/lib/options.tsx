import Link from 'next/link';
import router from 'next/router';
import { useState, useEffect } from 'react';

export const Options = () => {
  const [isLogin, setLogin] = useState<boolean>(false);
  useEffect(() => {
    if (localStorage.getItem('user')) {
      setLogin(true);
    }
  });

  const admin = localStorage.getItem('user') === 'admin' ? true : false;
  const options = [
    {
      label: 'My Tokens',
      href: '/token',
      hide: admin,
    },
    {
      label: 'Fund Manager',
      href: '/listAsset',
      hide: !admin,
    },
    // {
    //   label: 'Tokenize',
    //   href: '/createToken',
    //   hide: !admin
    // },
    // {
    //   label: 'Global Treasury',
    //   href: '/mint',
    //   hide: !admin
    // },
    {
      label: 'Tokenized Funds',
      href: '/totalAsset',
      hide: !admin,
    },
    {
      label: 'Request Management',
      href: '/transfers',
      hide: !admin,
    },
    {
      label: 'Tokenized Funds',
      href: '/totalAsset',
      hide: admin,
    },
    {
      label: 'Secondary Marketplace',
      href: '/secondaryMarket',
    },

    {
      label: 'User Management',
      href: '/users',
      hide: !admin,
    },
    {
      label: 'Transaction Log',
      href: '/transactions',
      hide: !admin,
    },
    {
      label: 'Burn Tokens',
      href: '/burnToken',
      hide: !admin,
    },

    {
      label: 'User Profile',
      href: '/profile',
    },
    {
      label: 'Settings',
      href: '/settings',
      hide: !admin,
    },
  ];

  return (
    <div>
      {isLogin && (
        <ul className="list_type">
          {options.map(({ href, label, hide }) => {
            if (!hide) {
              return (
                <li style={{ margin: 4 }} key={label}>
                  <Link href={href} className="list_font">
                    <span
                      className={
                        router.pathname === href
                          ? 'active_sidebar_list'
                          : 'sidebar_list'
                      }
                    >
                      {label}
                    </span>
                  </Link>
                </li>
              );
            }
          })}
        </ul>
      )}
    </div>
  );
};
