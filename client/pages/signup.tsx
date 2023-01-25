import { Container, Grid, Box, Typography, Stack, Link as MuiLink } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
import { object, string, TypeOf } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import FormInput from "../components/Forminput";
import styled from '@emotion/styled';
import GoogleLogo from "../assets/google.svg";
import GitHubLogo from "../assets/github.svg";
import { useAppDispatch } from '../config/redux/hooks';
import { useRouter } from 'next/router';
import { userSignupAsync } from '../requests/user/userSlice';
import Copyright from '../components/Copyright';
import { LinkItem } from './signin';

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

const signupSchema = object({
    username: string()
        .min(1, "Username is required.")
        .max(30),
    password: string()
        .min(1, "Password is required.")
        .min(8, "Password must be more than 8 characters.")
        .max(32, "Password must be less than 32 characters."),
    password_confirm: string()
        .min(1, "Please confirm your password."),
    name: string()
        .min(1, "Name is required.")
        .max(30),
    email: string()
        .min(1, "Email is required.")
        .max(100),
    location: string()
        .max(30),
}).refine((data) => data.password === data.password_confirm, {
    path: ["password_confirm"],
    message: "Passwords do not match.",
});

type IsSignup = TypeOf<typeof signupSchema>;

export default function Signup() {

    const dispatch = useAppDispatch();
    const router = useRouter();

    const defaultValues: IsSignup = {
        username: "",
        password: "",
        name: "",
        email: "",
        location: "",
        password_confirm: "",
    };

    const methods = useForm<IsSignup>({
        resolver: zodResolver(signupSchema),
        defaultValues,
    });

    const onSubmitHandler: SubmitHandler<IsSignup> = (data: IsSignup) => {
        dispatch(userSignupAsync(data))
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
            <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Grid container justifyContent='center' alignItems='center' sx={{ width: '100%', height: '100%' }}>
                    <Grid item sx={{ maxWidth: '70rem', width: '100%', backgroundColor: '#fff' }}>
                        <Grid container sx={{ boxShadow: { sm: '0 0 5px #ddd' }, py: '6rem', px: '1rem',}}>
                            <FormProvider {...methods}>
                                <Typography variant='h4' component='h1' sx={{ textAlign: 'center', width: '100%', mb: '1.5rem', pb: { sm: '3rem' } }}>Welcome To TOMODDATZZI!</Typography>
                                <Grid item container justifyContent='space-between' rowSpacing={5} sx={{ maxWidth: { sm: '45rem' }, marginInline: 'auto' }}>
                                    <Grid item xs={12} sm={6} sx={{ borderRight: { sm: '1px solid #ddd' } }}>
                                    <Box display='flex' flexDirection='column' component='form' noValidate autoComplete='off' sx={{ paddingRight: { sm: '3rem' } }} onSubmit={methods.handleSubmit(onSubmitHandler)}>
                                        <Typography variant='h6' component='h1' sx={{ textAlign: 'center', mb: '1.5rem' }}>Create new your account</Typography>

                                        <FormInput label='Username' type='text' name='username' focused required/>
                                        <FormInput label='Password' type='password' name='password' required focused/>
                                        <FormInput label='Password Confirm' type='password' name='password_confirm' required focused/>
                                        <FormInput label='Email' type='email' name='email' focused required/>
                                        <FormInput label='Name' type='text'  name='name' required focused/>
                                        <FormInput label='Location' type='location'  name='location' focused/>

                                        <LoadingButton loading={false} type='submit' variant='contained' sx={{ py: '0.8rem', mt: 2, width: '80%', marginInline: 'auto',}}>Sign Up</LoadingButton>
                                    </Box>
                                    </Grid>
                                    <Grid item xs={12} sm={6} sx={{}}>
                                        <Typography variant='h6' component='p' sx={{ paddingLeft: { sm: '3rem' }, mb: '1.5rem', textAlign: 'center',}}>Sign up using another provider:</Typography>
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
                                        <Typography sx={{ fontSize: '0.9rem', mb: '1rem' }}>Already have an account? <LinkItem href="/signin">Login</LinkItem></Typography>
                                    </Stack>
                                </Grid>
                            </FormProvider>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
            <Copyright sx={{ mt: 5 }} />
        </Container>
    );
};