import { Box, Grid, IconButton, Paper, Typography } from '@mui/material'
import React, { FC } from 'react'
import ErrorIcon from '@mui/icons-material/Error';

type ErrorResponse = {
    error?:{
        code: number
        message: string
    }
}

const defaultError={
    code: 400,
    message: 'Something went wrong'
}

const Error: FC<ErrorResponse> = ({ error=defaultError }) => {
  return (
  <>
    <Box height='30px' width='100%' sx={{backgroundColor: "primary.main"}}></Box>
    <Grid container 
        display='flex'
        // direction='column'  
        height='100vh' 
        alignItems='start' 
        justifyContent='center'
        sx={{backgroundColor: '#e5e5e5'}} 
    >
        <Paper 
            elevation={2}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                background: '#ffcdd2',//#ffcdd2
                textAlign: 'center',
                color: 'error.main',
                px:{xs: 8, md: 18},
                py: 8,
                my:10,
                mx: 4,
                border: '2px solid #CC2727',
                borderRadius: '15px',
            }}
        >
            <Box>
                <IconButton>
                    <ErrorIcon  sx={{color:"error.main", fontSize: {xs: '40px', md:'80px'}}}/>
                </IconButton>
            </Box>
            <Typography variant="h4" component='h4' sx={{mt:0}}> An error has occured  </Typography>
            <Typography variant="h5" component='h4' sx={{pb: 2}}> {error?.message}  </Typography>
        </Paper>
       
     </Grid>
  </>)
}

export default Error