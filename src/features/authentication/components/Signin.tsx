import {
    Box,
    FormControlLabel,
    FormGroup,
    FormHelperText,
    TextField,
    Typography,
  } from '@mui/material';
  import { useForm, SubmitHandler } from 'react-hook-form';
  import { literal, object, string, TypeOf } from 'zod';
  import { zodResolver } from '@hookform/resolvers/zod';
  import { FC, useEffect, useState } from 'react';
  import { LoadingButton } from '@mui/lab';
import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'src/lib/axios';
import { AuthType, useAuth } from 'src/context/authContext';
import { signin } from '../services/auth';

const signinSchema = object({
  email: string().min(1,'Email is required').email('Email is invalid'),
  password: string()
    .min(8, 'Password is required and must be at least 8 characters long')
    .min(8, 'Password must be more than 8 characters')
    .max(32, 'Password must be less than 32 characters')
})

type signinInput = TypeOf<typeof signinSchema>;

const Signin: FC = () => {
  const [loading, setLoading] = useState(false);
  const authProvider = useAuth()
  const {
    register,
    formState: { errors, isSubmitSuccessful },
    reset,
    handleSubmit,
  } = useForm<signinInput>({
    resolver: zodResolver(signinSchema),
  });

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful]);

  const mutation = useMutation({
    mutationFn: signin,
    onError: () => console.log('error'),
    onSuccess: (data) => {
      console.log('success')
      authProvider?.setAuth((prev: AuthType)=>{
        return {...prev, ...data}
      }
      )
    },
  })
  
  const onSubmitHandler: SubmitHandler<signinInput> = (values) => {
    console.log(values);
    //To-be removed, used for mocking purpose only
    const mockData = {
      "access_token": "eyJhbGciOiJQUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ0ZXN0Iiwic3ViIjoiOWM4ZWIxMzQtM2I4OS00MzIzLTllNDUtOTliMDljNzg3M2M1IiwiZXhwIjoxNjcwNTkyMzkxLCJuYmYiOjE2NzA1OTE3OTF9.DxbowauLZuz__ZfQL8eCSxRkGYMiC14Zj4_lzCSBYB8xD18qJ1TiiraXbRNFyfHRqK9bvFfDEXqt4hPfxjUtbBfb1pcHSjKjOFW4M4Yl3RLqrgJ202VpMHrw6M-C_9TsbapDdUDbuC8i8KooMVN3cy6Tf9pV3wsMuScuWql4XQ05eUjwFyMPOjbXXRxwL3d-ug9JRsxGzT6IWIba4zHTa0-OZDvA8teXlQXl5abGvshJVntRwaJpPOTlTjPcWOGs98A4-iKhF6ZUN7YY5LoGp44IWLr7eAGRd_3gWuIJNiJvP9yMeIcVsDOt3UmIr_HqX61zj6ttd2jsTTiig-vHUQ",
      "expires_in": "600s",
      "id_token": "eyJhbGciOiJQUzUxMiIsInR5cCI6IkpXVCJ9.eyJmaXJzdF9uYW1lIjoiWm9saW5hIiwibWlkZGxlX25hbWUiOiJBYmVyYSIsImxhc3RfbmFtZSI6IlJlZ2Fzc2EiLCJwaWN0dXJlIjoiIiwiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJwaG9uZSI6IjI1MTkyODAyMzM4NiIsImF6cCI6IiIsInN1YiI6IjljOGViMTM0LTNiODktNDMyMy05ZTQ1LTk5YjA5Yzc4NzNjNSIsImF1ZCI6WyJzc28iXSwiZXhwIjoxNjcwNjc4MTkxLCJpYXQiOjE2NzA1OTE3OTF9.GiiB908NI0pPd1OmF0Aj6TNQ4-vMkIs-YQ3XKcQN9r1R6SXjVatgHewBecwREJPjgNrq4O1PRqqkvR0wGpoR5BvvrVLzQbb3fBW_2oGka-c27jNvIolM1vEHo0XHgiq_Jc-We3Q-DD3ewsZGFF2-lt6i1I53oDK4pFijWYZ-eDMau9IXHNBu11h8aWK0fL7jX6AKEoyVriHBIe8WelN_CVwyIUm3v-qNun0WZ_pqorJGLgIxOFjGQ312c65XPFRj0TJQhUxQaizBDRCm9zD7CuR5XCUR1S5c7GdzOxKA82taJfH69NeaMqz1jP9JJBl24JNdxtijNuolmZNKthfHDA",
      "refresh_token": "JjQyjJDuJysxD0WtjrmZG5LU5",
      "token_type": "Bearer"
    }
    mutation.mutate({...values, ...mockData})
  };
  
  console.log(errors);

  return (
    <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Box sx={{ maxWidth: '30rem'}}>
        <Typography variant='h4' component='h1' sx={{ mb: '2rem' }}>
          Signin
        </Typography>
        <Box
          component='form'
          noValidate
          autoComplete='off'
          onSubmit={handleSubmit(onSubmitHandler)}
        >
          <TextField
            sx={{ mb: 2 }}
            label='Email'
            id='email'
            fullWidth
            required
            type='email'
            error={!!errors['email']}
            helperText={errors['email'] ? errors['email'].message : ''}
            {...register('email')}
          />
          <TextField
            sx={{ mb: 2 }}
            label='Password'
            id='password'
            fullWidth
            required
            type='password'
            error={!!errors['password']}
            helperText={errors['password'] ? errors['password'].message : ''}
            {...register('password')}
          />
          <LoadingButton
            variant='contained'
            disabled={Object.values(errors).some(value => (value !== undefined))}
            fullWidth
            type='submit'
            loading={loading}
            sx={{ py: '0.8rem', mt: '1rem' }}
          >
            Signin
          </LoadingButton>
        </Box>
      </Box>
    </Box>
  );
};

export default Signin

