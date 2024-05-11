import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import google from "../media/google.svg";
import { login, registration , googleAuthHandle } from '../store/index.ts';
import auth from "../media/auth.svg";

const SignUpPopUp = () => {

  const dispatch = useDispatch();
  const { register, handleSubmit, formState: { errors, isValid } } = useForm({
    mode: "onChange",
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const [loginError, setLoginError] = useState('');

  const onSubmit = (data : {email : string , password : string}) => {
    dispatch(registration({ email: data.email, password: data.password }) as any);
  };

  const handleLogin = (data : {email : string , password : string}) => {
    dispatch(login({ email: data.email, password: data.password }) as any)
      .then((response : any) => {
        setLoginError('');
        if(response?.error){
            setLoginError('Login failed. Please check your credentials.')
        }
      })
      .catch(() => {
        setLoginError('Login failed. Please check your credentials.');
      });
  };

  const loginGoogle = useGoogleLogin({
    onSuccess: (user) => {
      axios
        .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
          headers: {
            Authorization: `Bearer ${user.access_token}`,
            Accept: 'application/json',
          },
        })
        .then((res) => {
          const data = {
            email: res.data.email,
            password: res.data.id,
          };
          dispatch(googleAuthHandle(data) as any);
        })
        .catch((err) => console.log(err));
    },
    onError: (error) => console.log('Login Failed:', error),
  });

  return (
    <div className='h-[100vh] w-[100vw] flex justify-center mt-28'>
        <img src={auth} className="w-[600px] h-[600px] mr-40" alt="auth" />
      <div className='p-[4px] rounded-[12px] mt-10 lg:w-[361px]' onClick={(e) => e.stopPropagation()}>
        <div className="lg:w-full bg-secondary rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
          <div className='flex justify-between'>
            <h2 className="text-black text-lg font-medium title-font mb-5">Sign Up</h2>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="relative mb-4">
              <label htmlFor="email" className="leading-7 text-sm text-black">
                Email
              </label>
              {errors.email && <div className="text-sm text-red-500">{errors.email.message}</div>}
              <input
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: 'Invalid email format',
                  },
                })}
                type="text"
                id="email"
                className="w-full bg-gray-600 bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-primary-dark rounded border border-gray-600 focus:border-primary text-base outline-none text-black py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <div className="relative mb-4">
              <label htmlFor="password" className="leading-7 text-sm text-black">
                Password
              </label>
              {errors.password && <div className="text-sm text-red-500">{errors.password.message}</div>}
              <input
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 8,
                    message: 'Password must be at least 8 characters',
                  },
                })}
                type="password"
                id="password"
                className="w-full bg-gray-600 bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-primary-dark rounded border border-gray-600 focus:border-primary text-base outline-none text-black py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <button
              disabled={!isValid}
              type="submit"
              className={`text-black w-full border-0 py-2 px-8 focus:outline-none rounded text-lg mb-4 ${
                !isValid ? 'bg-gray-400 hover:bg-gray-600' : 'bg-primary hover:bg-primary-dark'
              }`}
            >
              Create account
            </button>
          </form>
          <button
            disabled={!isValid}
            onClick={handleSubmit(handleLogin)}
            className={`text-black  border-0 py-2 px-8 focus:outline-none rounded text-lg mb-4 ${
              !isValid ? 'bg-gray-400 hover:bg-gray-600' : 'bg-primary hover:primary-dark'
            }`}
          >
            Login
          </button>
          <button
            onClick={() => loginGoogle()}
            className={`text-black border-0 bg-primary py-2 px-8 focus:outline-none hover:bg-primary-dark rounded text-lg flex justify-center`}
          >
            <img src={google} className="mr-3" alt="Google" />
            Continue with Google
          </button>
          {loginError && <p className="text-sm text-red-500 mt-3">{loginError}</p>}
          <p className="text-xs mt-3">We will send an activation letter to the email you provide</p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPopUp;
