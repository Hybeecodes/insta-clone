import React, {Component} from 'react';
import {Card, Form, Button, Alert} from "react-bootstrap";
import axios from 'axios';

class Login extends Component {
    state = {
        email: '',
        password: '',
        loginBtnText: 'Sign In',
        showAlert: false,
        alertMsg:''
    };
    handleInputChange = (e) => {
        const { value, name } = e.target;
        this.setState({
            [name]: value
        });
    };

    onSubmit = (event) => {
        event.preventDefault();
        this.setState({loginBtnText: 'Please wait ...'});
        axios.post('/api/v1/auth/authenticate', {email: this.state.email, password: this.state.password})
        .then(res => {
            console.log(res.data);
            if (res.status === 200) {
                this.setState({showAlert: true, alertMsg: 'Login Successful'});
                setTimeout(() => {
                    this.props.history.push('/');
                }, 2000);
            } else {
                const error = new Error(res.error);
                throw error;
            }
        })
        .catch(err => {
            console.log(err);
            // this.setState({showAlert: true, alertMsg: err});
        });
    };
    render() {
        const { showAlert, alertMsg } = this.state;
        let renderAlert = '';
        if(showAlert){
<<<<<<< HEAD
            renderAlert = <Alert variant="success" > {alertMsg} </Alert>
=======
            renderAlert = <Alert variant="success"> {alertMsg} </Alert>
>>>>>>> bba50c4ff789cf3a5ead4a20a255b663347d22f6
        }
        return (
                <Card className="login">
                    <Card.Header>
                        <h2 className="text-center">Login</h2>
                    </Card.Header>
                    <Card.Body>
                        <Form onSubmit={this.onSubmit} >
                            {renderAlert}
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" name="email" onChange={this.handleInputChange} placeholder="Enter email" />
                                <Form.Text className="text-muted">
                                    We'll never share your email with anyone else.
                                </Form.Text>
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" name="password" onChange={this.handleInputChange} placeholder="Password" />
                            </Form.Group>
                            <Button variant="primary" type="submit" block>
                                Sign In
                            </Button>
                        </Form>
                        <p className="text-center">OR</p>
                        <Button href="/api/auth/google" className="btn btn-light" variant="light" type="submit" block>
                            Sign In With Google
                        </Button>
                    </Card.Body>
                </Card>
        );
    }
}

export default Login;