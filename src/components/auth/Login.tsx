import { useState } from 'react';
import * as Yup from 'yup';

import { Button } from '../ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { Input } from '../ui/input';
import Error from '../Error';

const schema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

export default function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onLogin = async () => {
    setErrors({});
    try {
      await schema.validate(formData, { abortEarly: true });
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
        <CardTitle>Login</CardTitle>
        <CardDescription>
          to your account if you already have one
        </CardDescription>
      </CardHeader>
      <CardContent className='space-y-2'>
        <div className='space-y-1'>
          <Input
            name='email'
            type='email'
            placeholder='Enter Email'
            onChange={onInputChange}
          />
          {errors?.email && <Error message={errors.email} />}
        </div>

        <div className='space-y-1'>
          <Input
            name='password'
            type='password'
            placeholder='Enter Password'
            onChange={onInputChange}
          />
          {errors?.password && <Error message={errors.password} />}
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={onLogin}>Login</Button>
      </CardFooter>
    </Card>
  );
}
