import axios from 'axios';
import { useCallback, useState } from 'react';
import { signIn } from 'next-auth/react';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook } from 'react-icons/fa';
import { TbBrandWechat } from 'react-icons/tb';

import Input from '@/components/Input';
import Link from 'next/link';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const [variant, setVariant] = useState('login');

  const toggleVariant = useCallback(() => {
    setVariant((currentVariant) => currentVariant === 'login' ? 'register' : 'login');
  }, []);

  const login = useCallback(async () => {
    try {
      await signIn('credentials', {
        email,
        password,
        callbackUrl: '/profiles'
      });

    } catch (error) {
      console.log(error);
    }
  }, [email, password ]);

  const register = useCallback(async () => {
    try {
      await axios.post('/api/register', {
        email,
        name,
        password
      });

      login();
    } catch (error) {
        console.log(error);
    }
  }, [email, name, password, login]);


  return (
    <div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
      <div className="bg-black w-full h-full lg:bg-opacity-30 flex flex-col min-h-screen">
        <nav className="px-12 py-5 flex justify-center">
          <img src="/images/logo.png" className="h-16 py-0" alt="Logo" />
        </nav>
        <div className="flex justify-center pb-2">
          <div className="bg-slate-300 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
            <h2 className="text-black text-4xl mb-8 font-semibold">
              {variant === 'login' ? 'Sign in' : 'Register'}
            </h2>
            <div className="flex flex-col gap-4">
              {variant === 'register' && (
                <Input
                  id="name"
                  type="text"
                  label="Username"
                  value={name}
                  onChange={(ev: any) => setName(ev.target.value)} 
                />
              )}
              <Input
                id="email"
                type="email"
                label="Email address or phone number"
                value={email}
                onChange={(ev: any) => setEmail(ev.target.value)} 
              />
              <Input
                type="password" 
                id="password" 
                label="Password" 
                value={password}
                onChange={(ev: any) => setPassword(ev.target.value)} 
              />
            </div>
            <button onClick={variant === 'login' ? login : register} className="bg-pink-600 py-3 text-white font-bold rounded-full w-full mt-10 hover:bg-pink-500 transition">
              {variant === 'login' ? 'Login' : 'Sign up'}
            </button>
            <div className="flex flex-row items-center gap-4 mt-8 justify-center">
              <div onClick={() => signIn('google', { callbackUrl: '/profiles'})} 
              className="
                w-10  
                h-10 
                bg-slate-400 
                rounded-full 
                flex 
                items-center 
                justify-center 
                cursor-pointer 
                hover:opacity-80 
                transition
                "
                >
                <FcGoogle size={32} />
              </div>
              <div onClick={() => signIn('facebook', { callbackUrl: '/profiles'})}
               className="
                w-10 
                h-10 
                bg-slate-400 
                rounded-full 
                flex 
                items-center 
                justify-center 
                cursor-pointer 
                hover:opacity-80 
                transition
                "
                >
                <FaFacebook className='text-blue-800' size={32} />
              </div>
            </div>
            <p className="text-neutral-950 text-center justify-center mt-4">
              {variant === 'login' ? 'First time using Showmax?' : 'Already have an account?'}
              <span onClick={toggleVariant} className="text-neutral-800 ml-1 hover:underline cursor-pointer">
                {variant === 'login' ? 'Create an account' : 'Login'}
              </span>
              .
            </p>
            <div className="text-neutral-700 flex flex-row gap-2 mt-4 text-center justify-center">
               <p>We removed facebook login. Having a problem loggin in?</p>
            </div>
            <div className="flex flex-row items-center gap-1 mt-1 justify-center cursor-pointer">
             <TbBrandWechat size={28}/>
               <span className='text-neutral-800 hover:underline'>Chat to us</span>
            </div>
          </div>
          <div className="text-gray-300 flex-row self-center fixed bottom-0 left-0 z-20 w-full p-4 bg-none md:flex md:items-center md:justify-between md:p-6 dark:bg-gray-800 dark:border-gray-600 flex flex-wrap md:flex-wrap md:fixed md:mt-4">
             <span className="text-sm text-gray-300 sm:text-center dark:text-gray-400 hover:text-pink-500 cursor-pointer"><Link target="_blank" href="https://faq.showmax.com/eng/legal/ke/service-terms-ke">
              Terms & Conditions</Link>
             </span>
             <p className="dark:text-gray-400">
              © Showmax. All rights reserved.  
            </p>                          
              <span className="block text-gray-300 hover:text-pink-600 cursor-pointer">
                Cookies
              </span>
          </div>          
        </div>
      </div>
    </div>
  );
}

export default Auth;