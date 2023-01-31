import { Container, Grid, Box, Typography, Stack, Link as MuiLink, FormControlLabel, Checkbox } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
import { literal, object, string, TypeOf } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import FormInput from "../components/Forminput";
import styled from '@emotion/styled';
import GoogleLogo from "../assets/google.svg";
import GitHubLogo from "../assets/github.svg";
import { useAppDispatch } from '../config/redux/hooks';
import { useRouter } from 'next/router';
import { userSigninAsync } from '../requests/user/userSlice';
import Copyright from '../components/Copyright';
import Link from 'next/link';

export const OauthMuiLink = styled(MuiLink)`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f5f6f7;
    border-radius: 1;
    padding: 0.6rem 0;
    column-gap: 1rem;
    text-decoration: none;
    color: #393e45;
    font-weight: 500;
    cursor: pointer;
    &:hover {
        background-color: #fff;
        box-shadow: 0 1px 13px 0 rgb(0 0 0 / 15%);
    }
`;

export const LinkItem = styled(Link)`
  text-decoration: none;
  color: #3683dc;
  &:hover {
    text-decoration: underline;
    color: #5ea1b6;
  }
`;

const resetPasswordSchema = object({
    email: string()
        .min(1, "Email is required.")
        .max(100),
});

type IsResetPassword = TypeOf<typeof resetPasswordSchema>;

export default function ResetPasswrod() {

    const dispatch = useAppDispatch();
    const router = useRouter();

    const defaultValues: IsResetPassword = {
        email: "",
    };

    const methods = useForm<IsResetPassword>({
        resolver: zodResolver(resetPasswordSchema),
        defaultValues,
    });

    const onSubmitHandler: SubmitHandler<IsResetPassword> = (data: IsResetPassword) => {
    };

    return (
        <Container maxWidth={false} sx={{ height: '100vh', backgroundColor: { xs: '#fff', md: '#f4f4f4' } }}>
            <Grid container justifyContent='center' alignItems='center' sx={{ width: '100%', height: '100%' }}>
                <Grid item sx={{ maxWidth: '50rem', width: '100%', backgroundColor: '#fff' }}>
                    <FormProvider {...methods}>
                        <Grid container sx={{ boxShadow: { sm: '0 0 5px #ddd' }, py: '6rem', px: '1rem', }}>
                            <Grid item container justifyContent='space-between' rowSpacing={5} sx={{ maxWidth: { sm: '45rem' }, marginInline: 'auto', }}>
                                <Grid item xs={12}>
                                    <Box display='flex' flexDirection='column' component='form' noValidate autoComplete='off' sx={{ paddingRight: { sm: '3rem' } }} onSubmit={methods.handleSubmit(onSubmitHandler)}>
                                        <Typography variant='h6' component='h1' sx={{ textAlign: 'center', mb: '1.5rem' }}>Reset your password</Typography>
                                        <Typography component='h1' sx={{ textAlign: 'left', mb: '1.5rem' }}>To reset your password, enter your email below and submit. An email will be sent to you with instructions about how to complete the process.</Typography>
                                        <FormInput label='Email' type='text' name='email' focused required/>

                                        <LoadingButton loading={false} type='submit' variant='contained' sx={{ py: '0.8rem', mt: 2, width: '80%', marginInline: 'auto', }}>Reset Password</LoadingButton>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Grid>
                    </FormProvider>
                </Grid>
            </Grid>
            <Copyright sx={{ mt: 5 }} />
        </Container>
    );
};