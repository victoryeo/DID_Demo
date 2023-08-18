import { Router, useRouter } from 'next/router';
import AppBar from '@mui/material/AppBar';
//import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
//import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';
import { AppModal } from './modal';
import { Link } from '@mui/material';
import { createPublicClient, http, Client, PublicClient } from "viem";
import { polygonMumbai } from "viem/chains";
import {
  getAccount,
  readContract,
  writeContract,
  waitForTransaction,
} from "@wagmi/core";
import {
  Box,
  Container,
  Flex,
  Heading,
  Button,
  Spinner,
  Card,
  Center,
  VStack,
} from "@chakra-ui/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Options, User } from '@da-tokenization/components';

type AppLayoutProps = {
  children?: React.ReactNode;
};

const ipfsPrefix = 'https://ipfs-90d4.gke-europe.settlemint.com/gateway/ipfs';

export const AppLayout = ({ children }: AppLayoutProps) => {
  const router = useRouter();
  const [isLogin, setLogin] = useState<boolean>(false);
  const [ipfsCid, setIpfsCid] = useState<string>('');
  const [ipfsPath, setIpfsPath] = useState<string>('');
  const [publicClient, setPublicClient] = useState<PublicClient>();
  const [connectedAddress, setConnectedAddress] = useState<string>();
  const [addressIsConnected, setAddressIsConnected] = useState(false);
  const [showConnectionInfo, setShowConnectionInfo] = useState(false);
  const [currentBlockNumber, setCurrentBlockNumber] = useState<bigint>();

  const admin = localStorage.getItem('user') == 'admin' ? true : false;
  const user =
    localStorage.getItem('user') != `${localStorage.getItem('user')}`
      ? true
      : false;


  useEffect(() => {
    // A Public Client is an interface to "public" JSON-RPC API methods
    // for sending transactions, reading from smart contracts
    const newPublicClient: PublicClient = createPublicClient({
      chain: polygonMumbai,
      transport: http(),
    });
    setPublicClient(newPublicClient);

    // interval check whether user has connected or disconnected wallet
    const interval = setInterval(() => {
      const { address, isConnected } = getAccount();
      setConnectedAddress(address);
      setAddressIsConnected(isConnected);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (publicClient) {
      const checkCurrentBlockNumber = async () => {
        const blockNumber = await publicClient.getBlockNumber();
        setCurrentBlockNumber(blockNumber);
      };

      //checkCurrentBlockNumber();
    }
  }, [publicClient]);

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
                <Box>
                <Container maxW={"80%"} py={4}>
                  <Button onClick={() => setShowConnectionInfo(!showConnectionInfo)}>
                    {showConnectionInfo ? "Hide" : "Show"} connection information
                  </Button>
                </Container>
                  {showConnectionInfo && (
                  <Box>
                    {addressIsConnected ? (
                      <p>Address {connectedAddress} is connected</p>
                    ) : (
                      <p>
                        No account connected. Connect wallet to interact with dapp
                      </p>
                    )}
                    {publicClient ? (
                      <ul>
                        <li>
                          Currently using: {publicClient?.chain?.name} with Chain ID:{" "}
                          {publicClient?.chain?.id}
                        </li>
                      </ul>
                    ) : (
                      <>
                        Please install{" "}
                        <a href="https://metamask.io/" target="_blank">
                          Metamask
                        </a>
                      </>
                    )}
                  </Box>
                  )}
                </Box>
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
                  <Options />
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
