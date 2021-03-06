import React, { useContext, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { onChangeObject } from 'utils';
import StoreContext from 'contexts/StoreContext';
import { useHistory } from 'react-router-dom';
import { loginGoogle, sigIn } from 'api/user.api';
import firebase from 'utils/firebase'

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="#">
                Finance-Bank
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
        backgroundColor: theme.palette.primary.main,
    },
    image: {
        //backgroundImage: 'url(https://source.unsplash.com/random)',
        //backgroundRepeat: 'no-repeat',
        backgroundColor: theme.palette.primary.main,
        //    theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.primary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function SignIn() {
    const classes = useStyles()
    const history = useHistory()
    const [dados, setDados] = useState({})
    const { token, setToken, setUser, setMessage } = useContext(StoreContext)
    const onChange = (e) => onChangeObject(e, setDados, dados)

    const handleLogin = async (e) => {
        e.preventDefault()
        await sigIn({ email: dados.email, password: dados.password })
            .then(c => {
                setToken(c.data.token)
                //setUser(c.data.user)
                setUser(c.data.user)
                history.push('/home')
            })
            .catch(e => {
                setMessage({ visible: true, text: e.toString(), type: 'error' })
            })
    }
    const handlerUser = async (user) => {
        const body = {
            uid: user.uid,
            email: user.email,
            name: user.displayName,
            token: user.za,
            provider: user.providerData[0].providerId,
            photo: user.photoURL,
        }
        await loginGoogle(body)
            .then(c => {
                setToken(c.data.token)
                setUser(c.data.user)
                history.push('/home')
            })
            .catch(e => {
                setMessage({ visible: true, text: e.toString(), type: 'error' })
            })
    }
    const signinGoogle = async (e) => {
        e.preventDefault()
        await firebase
            .auth()
            .signInWithPopup(new firebase.auth.GoogleAuthProvider())
            .then(c => handlerUser(c.user))
            .catch(err => {
                setMessage({ visible: true, type: 'error', text: "Erro durante o login" })
            })
    }

    return (
        <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Grid item xs={false} sm={4} md={7} className={classes.image} >
                <img src="/logo_size_invert.jpg" />
            </Grid>
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar} >
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5" color="textSecondary">
                        Sign in
                    </Typography>
                    <form className={classes.form} noValidate>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            onChange={onChange}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onChange={onChange}
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={handleLogin}
                        >
                            Sign In
                        </Button>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="#1a73e8"
                            className={classes.submit}
                            onClick={signinGoogle}
                            style={{
                                backgroundColor: "#1a73e8",
                            }}
                        >
                            <Grid style={{
                                display: 'flex',
                                justifyContent: 'space-around',
                                flexDirection: "row",
                                color: '#ffffff',
                            }}>
                                <img src="https://img.icons8.com/fluent/24/fa314a/google-logo.png" />
                                <div>{" Entrar com Google"}</div>
                            </Grid>
                        </Button>
                        {/*<Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="#" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>*/}
                        <Box mt={5}>
                            <Copyright />
                        </Box>
                    </form>
                </div>
            </Grid>
        </Grid>
    );
}