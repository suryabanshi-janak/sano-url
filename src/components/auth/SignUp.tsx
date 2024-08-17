import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

import { Input } from '../ui/input';
import * as Yup from 'yup';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { Button } from '../ui/button';
import useFetch from '@/hooks/useFetch';
import { signUp } from '@/db/auth';
import Error from '../Error';
import { AuthError } from '@supabase/supabase-js';

const Signup = () => {
  const [searchParams] = useSearchParams();
  const longLink = searchParams.get('url');

  const navigate = useNavigate();

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState<{
    name: string;
    email: string;
    password: string;
    profile_pic: null | File;
  }>({
    name: '',
    email: '',
    password: '',
    profile_pic: null,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: files ? files[0] : value,
    }));
  };

  const { loading, error, fn: fnSignup, data } = useFetch(signUp, formData);

  useEffect(() => {
    if (error === null && data) {
      navigate(`/dashboard?${longLink ? `url=${longLink}` : ''}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, loading]);

  const onSignup = async () => {
    setErrors({});
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        email: Yup.string()
          .email('Invalid email')
          .required('Email is required'),
        password: Yup.string()
          .min(6, 'Password must be at least 6 characters')
          .required('Password is required'),
        profile_pic: Yup.mixed().required('Profile picture is required'),
      });

      await schema.validate(formData, { abortEarly: false });
      await fnSignup();
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const newErrors: Record<string, string> = {};

        error?.inner?.forEach((err) => {
          if (err?.path) newErrors[err.path] = err.message;
        });

        setErrors(newErrors);
      }
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Signup</CardTitle>
        <CardDescription>
          Create a new account if you haven&rsquo;t already
        </CardDescription>
        {(error as AuthError) && (
          <Error message={(error as AuthError).message} />
        )}
      </CardHeader>
      <CardContent className='space-y-2'>
        <div className='space-y-1'>
          <Input
            name='name'
            type='text'
            placeholder='Enter Name'
            onChange={handleInputChange}
          />
        </div>
        {errors.name && <Error message={errors.name} />}
        <div className='space-y-1'>
          <Input
            name='email'
            type='email'
            placeholder='Enter Email'
            onChange={handleInputChange}
          />
        </div>
        {errors.email && <Error message={errors.email} />}
        <div className='space-y-1'>
          <Input
            name='password'
            type='password'
            placeholder='Enter Password'
            onChange={handleInputChange}
          />
        </div>
        {errors.password && <Error message={errors.password} />}
        <div className='space-y-1'>
          <input
            name='profile_pic'
            type='file'
            accept='image/*'
            onChange={handleInputChange}
          />
        </div>
        {errors.profile_pic && <Error message={errors.profile_pic} />}
      </CardContent>
      <CardFooter>
        <Button onClick={onSignup} disabled={loading || false}>
          {loading && <Loader2 className='mr-2 size-4' />}
          Create Account
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Signup;
