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
  import Checkbox from '@mui/material/Checkbox';
  
  const signupSchema = object({
    firstName: string()
      .min(8, 'First Name is required and must be at least 8 characters long')
      .max(32, 'First Name must be less than 100 characters'),
    middleName: string()
    .min(8, 'Middle Name is required and must be at least 8 characters long')
    .max(32, 'Middle Name must be less than 100 characters'),
    lastName: string()
    .min(8, 'Last Name is required and must be at least 8 characters long')
    .max(32, 'Last Name must be less than 100 characters'),
    email: string().nonempty('Email is required').email('Email is invalid'),
    phoneNumber: string()
    .min(10, 'Phone Number is required and must be at least 10 characters long')
    .max(13, 'Phone Number must be less than 100 characters'),
    password: string()
      .min(8, 'Password is required and must be at least 8 characters long')
      .min(8, 'Password must be more than 8 characters')
      .max(32, 'Password must be less than 32 characters'),
    passwordConfirm: string().nonempty('Please confirm your password'),
    terms: literal(true, {
      invalid_type_error: 'Accept Terms is required',
    }),
  }).refine((data) => data.password === data.passwordConfirm, {
    path: ['passwordConfirm'],
    message: 'Passwords do not match',
  });
  
  type signupInput = TypeOf<typeof signupSchema>;
  
  const Signup: FC = () => {
    const [loading, setLoading] = useState(false);
  
    
    const {
      register,
      formState: { errors, isSubmitSuccessful },
      reset,
      handleSubmit,
    } = useForm<signupInput>({
      resolver: zodResolver(signupSchema),
    });

    useEffect(() => {
      if (isSubmitSuccessful) {
        reset();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSubmitSuccessful]);
  
   
    const onSubmitHandler: SubmitHandler<signupInput> = (values) => {
      console.log(values);
    };
    
    console.log(errors);
  
    return (
      <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Box sx={{ maxWidth: '30rem'}}>
          <Typography variant='h4' component='h1' sx={{ mb: '2rem' }}>
            Signup
          </Typography>
          <Box
            component='form'
            noValidate
            autoComplete='off'
            onSubmit={handleSubmit(onSubmitHandler)}
          >
            <TextField
              sx={{ mb: 2 }}
              label='firstName'
              id='firstName'
              fullWidth
              required
              error={!!errors['firstName']}
              helperText={errors['firstName'] ? errors['firstName'].message : ''}
              {...register('firstName')}
            />
            <TextField
              sx={{ mb: 2 }}
              label='middleName'
              id="middleName"
              fullWidth
              required
              error={!!errors['middleName']}
              helperText={errors['middleName'] ? errors['middleName'].message : ''}
              {...register('middleName')}
            />
            <TextField
              sx={{ mb: 2 }}
              label='lastName'
              id='lastName'
              fullWidth
              required
              error={!!errors['lastName']}
              helperText={errors['lastName'] ? errors['lastName'].message : ''}
              {...register('lastName')}
            />
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
              label='PhoneNumber'
              id='phoneNumber'
              fullWidth
              required
              type='phoneNumber'  
              error={!!errors['phoneNumber']}
              helperText={errors['phoneNumber'] ? errors['phoneNumber'].message : ''}
              {...register('phoneNumber')}
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
            <TextField
              sx={{ mb: 2 }}
              label='Confirm Password'
              id='passwordConfirm'
              fullWidth
              required
              type='password'
              error={!!errors['passwordConfirm']}
              helperText={
                errors['passwordConfirm'] ? errors['passwordConfirm'].message : ''
              }
              {...register('passwordConfirm')}
            />
    
            <FormGroup>
              <FormControlLabel
                control={<Checkbox required />}
                {...register('terms')}
                label={
                  <Typography color={errors['terms'] ? 'error' : 'inherit'}>
                    Accept Terms and Conditions
                  </Typography>
                }
              />
              <FormHelperText error={!!errors['terms']}>
                {errors['terms'] ? errors['terms'].message : ''}
              </FormHelperText>
            </FormGroup>
    
            <LoadingButton
              variant='contained'
              disabled={Object.values(errors).some(value => (value !== undefined))}
              fullWidth
              type='submit'
              loading={loading}
              sx={{ py: '0.8rem', mt: '1rem' }}
            >
              Signup
            </LoadingButton>
          </Box>
        </Box>
      </Box>
    );
  };
  
  export default Signup
  
  