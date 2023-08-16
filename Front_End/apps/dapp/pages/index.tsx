import * as React from 'react';
import Router from 'next/router';
import { ChangeEvent, useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { NextPageWithLayout } from './_app';
import { Form } from 'antd';
import { EyeFilled, EyeInvisibleFilled } from '@ant-design/icons';
import { Center, Card, Image, CardBody, Container } from "@chakra-ui/react";

interface ILogin {
  username: string;
  password: string;
}
interface IUser {
  email: string;
  username: string;
  password: string;
}

const Page: NextPageWithLayout = () => {
  const [user, setUser] = useState<ILogin | undefined>(undefined);
  const [userErr, setUserErr] = useState('');
  const [passwordErr, setpasswordErr] = useState('');
  const [user_actErr, setUser_acountErr] = useState('');
  const [atLogin, setAtLogin] = useState(true);
  const [passwordType, setPasswordType] = useState('password');

  useEffect(() => {
  }, []);

  const [userDetailSignUp, setuserDetailSignUp] = useState<IUser | undefined>(
    undefined
  );

  const handleChangeSignUp = (name: keyof IUser, value: IUser[keyof IUser]) => {
    setuserDetailSignUp({ ...userDetailSignUp, [name]: value, email: 't' });
  };

  const handleSubmitSignUp = async () => {
    event.preventDefault();
    const response = await fetch('/api/createUser').then((response) =>
      response.json()
    );

  };

  const handleChange = (name: keyof ILogin, value: ILogin[keyof ILogin]) => {
    setUser({ ...user, [name]: value });
  };

  const togglePassword = () => {
    if (passwordType === 'password') {
      setPasswordType('text');
      return;
    }
    setPasswordType('password');
  };

  const authentication = () => {
    event.preventDefault();
    console.log(user);
    let error = false;
    setUser_acountErr('');
    setpasswordErr('');
    setUserErr('');
    if (!user?.password || user?.password == '') {
      setpasswordErr('Please enter password');
      error = true;
    } else {
      setpasswordErr('');
    }
    if (!user?.username || user?.username == '') {
      setUserErr('Please enter username');
      error = true;
    } else {
      setUserErr('');
    }
    if (!error) {

      Router.push('/token');
    } else {

      console.error('Invalid login details');
      // setUser_acountErr('Invalid Login Detail');
      //}
    }
  };

  return (
    <>
      <div className="bg-info">
        <div className="row">
          {}

          <div className="col-md-6">
            <div className="right-wrap">
              {atLogin ? (
                <div className="right-box">
                  <div className="logo">
                    <img src="/SettleMint_log-bk.png" alt="preview" />
                  </div>

                  <h2 className="header-text">
                    DID Demo
                  </h2>
                  <Center className="vc-check-page">
                    <Container></Container>
                  </Center>
                </div>
              ) : (
                <div className="right-box">
                  <div className="logo">
                    <img src="/SettleMint_log-bk.png" alt="preview" />
                  </div>
                  <h1>Register</h1>

                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// Page.getLayout = function getLayout(page: ReactElement) {
//   return <AppLayout>{page}</AppLayout>;
// };
export default Page;
