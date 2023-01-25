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

const signinSchema = object({
    username: string()
        .min(1, "Username is required.")
        .max(30),
    password: string()
        .min(1, "Password is required.")
        .min(8, "Password must be more than 8 characters.")
        .max(32, "Password must be less than 32 characters."),
    persistUser: literal(true)
        .optional(),
});

type IsSignin = TypeOf<typeof signinSchema>;

export default function Signin() {

    const dispatch = useAppDispatch();
    const router = useRouter();

    const defaultValues: IsSignin = {
        username: "",
        password: "",
    };

    const methods = useForm<IsSignin>({
        resolver: zodResolver(signinSchema),
        defaultValues,
    });

    const onSubmitHandler: SubmitHandler<IsSignin> = (data: IsSignin) => {
        dispatch(userSigninAsync(data))
        .then(() => {
            router.push("/")
        })
        .catch((reason) => {
            alert("오류발생!!!");
            console.log(reason);
        })
    };

    return (
        <Container maxWidth={false} sx={{ height: '100vh', backgroundColor: { xs: '#fff', md: '#f4f4f4' } }}>
            <Grid container justifyContent='center' alignItems='center' sx={{ width: '100%', height: '100%' }}>
                <Grid item sx={{ maxWidth: '70rem', width: '100%', backgroundColor: '#fff' }}>
                    <FormProvider {...methods}>
                        <Grid container sx={{ boxShadow: { sm: '0 0 5px #ddd' }, py: '6rem', px: '1rem', }}>
                            <Grid item container justifyContent='space-between' rowSpacing={5} sx={{ maxWidth: { sm: '45rem' }, marginInline: 'auto', }}>
                                <Grid item xs={12} sm={6} sx={{ borderRight: { sm: '1px solid #ddd' } }}>
                                    <Box display='flex' flexDirection='column' component='form' noValidate autoComplete='off' sx={{ paddingRight: { sm: '3rem' } }} onSubmit={methods.handleSubmit(onSubmitHandler)}>
                                        <Typography variant='h6' component='h1' sx={{ textAlign: 'center', mb: '1.5rem' }}>Log into your account</Typography>

                                        <FormInput label='Username' type='text' name='username' focused required/>
                                        <FormInput label='Password' type='password' name='password' focused required/>

                                        <FormControlLabel control={ <Checkbox size='small' aria-label='trust this device checkbox' required {...methods.register('persistUser')}/>} label={ <Typography variant='body2' sx={{ fontSize: '0.8rem', fontWeight: 400, color: '#5e5b5d', }}> Trust this device </Typography>}/>

                                        <LoadingButton loading={false} type='submit' variant='contained' sx={{ py: '0.8rem', mt: 2, width: '80%', marginInline: 'auto', }}>Login</LoadingButton>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Typography variant='h6' component='p' sx={{ paddingLeft: { sm: '3rem' }, mb: '1.5rem', textAlign: 'center', }}>Log in with another provider:</Typography>
                                    <Box display='flex' flexDirection='column' sx={{ paddingLeft: { sm: '3rem' }, rowGap: '1rem' }}>
                                        <OauthMuiLink href=''>
                                            <GoogleLogo style={{ height: '2rem' }} />
                                            Google
                                        </OauthMuiLink>
                                        <OauthMuiLink href=''>
                                            <GitHubLogo style={{ height: '2rem' }} />
                                            GitHub
                                        </OauthMuiLink>
                                    </Box>
                                </Grid>
                            </Grid>
                            <Grid container justifyContent='center'>
                                <Stack sx={{ mt: '3rem', textAlign: 'center' }}>
                                    <Typography sx={{ fontSize: '0.9rem', mb: '1rem' }}>Need an account?{' '}
                                        <LinkItem href="/signup">Sign up here</LinkItem>
                                    </Typography>
                                    <Typography sx={{ fontSize: '0.9rem' }}>
                                        Forgot your{' '}
                                        <LinkItem href="forgotPassword">password?</LinkItem>
                                    </Typography>
                                </Stack>
                            </Grid>
                        </Grid>
                    </FormProvider>
                </Grid>
            </Grid>
            <Copyright sx={{ mt: 5 }} />
        </Container>
    );
};