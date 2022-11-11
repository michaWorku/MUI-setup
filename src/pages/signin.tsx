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
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSubmitSuccessful]);
  
   
    const onSubmitHandler: SubmitHandler<signinInput> = (values) => {
      console.log(values);
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
  
  