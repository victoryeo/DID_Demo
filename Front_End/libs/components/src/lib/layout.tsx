import { Router, useRouter } from 'next/router';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';
import { AppModal } from './modal';
import { Link } from '@mui/material';

type AppLayoutProps = {
  children?: React.ReactNode;
};

const ipfsPrefix = 'https://ipfs-90d4.gke-europe.settlemint.com/gateway/ipfs';

export const AppLayout = ({ children }: AppLayoutProps) => {
  const router = useRouter();
  const [isLogin, setLogin] = useState<boolean>(false);
  const [ipfsCid, setIpfsCid] = useState<string>('');
  const [ipfsPath, setIpfsPath] = useState<string>('');

  const admin = localStorage.getItem('user') == 'admin' ? true : false;
  const user =
    localStorage.getItem('user') != `${localStorage.getItem('user')}`
      ? true
      : false;

  useEffect(() => {
    if (localStorage.getItem('user')) {
      setLogin(true);
    }
    {
      setIpfsPath('/preview.png');
    }
    console.log(ipfsPath);
  }, [admin, user]);

  const handleLogin = async () => {
    if (!isLogin) {
      router.push('/');
    } else {
      setLogin(false);
      localStorage.clear();
      router.push('/');
    }
  };

  return (
    <div>
      {!router.asPath.endsWith('/') && !router.asPath.endsWith('/signup') ? (
        <div className="sideba_content">
          <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
              <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                  <Link href="/listAsset">
                    <div className="logo-wrap">
                      <div className="logo-img">
                        
                      </div>
                    </div>
                  </Link>
                  <span className="textmiddle">
                    DID Demo
                  </span>
                </Typography>
                <div className="user-name">
                  Logged in as: <span>{localStorage.getItem('user')}</span>
                </div>
                {isLogin ? (
                  <Button onClick={() => handleLogin()} color="inherit">
                    Logout
                  </Button>
                ) : (
                  ''
                )}
              </Toolbar>
            </AppBar>
            <Link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css"></Link>
            <div className="outer-wrap">
              <div className="row">
                <div className="col-md-2">
                  
                </div>
                <div className="col-md-10">
                  {children}
                  <div className="footer">
                    Copyright ©️2023 SettleMint. All Rights Reserved.
                  </div>
                </div>
              </div>
            </div>
          </Box>
          <AppModal />
        </div>
      ) : (
        <div>{children}</div>
      )}
    </div>
  );
};
