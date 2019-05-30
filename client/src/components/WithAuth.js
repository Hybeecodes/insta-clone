import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';

export default function WithAuth(ComponentToProtect) {
    return class extends Component {
        state = {
            loading: true,
            redirect: false,
        };
        componentDidMount() {
            fetch('/api/v1/auth/checkToken')
                .then(res => {
                    if (res.status === 200) {
                        this.setState({ loading: false });
                    } else {
                        throw new Error(res.error);
                    }
                })
                .catch(err => {
                    console.error(err);
                    this.setState({ loading: false, redirect: true });
                });
        }
        render() {
            const { loading, redirect } = this.state;
            if (loading) {
                return null;
            }
            if (redirect) {
                return <Redirect to="/login" />;
            }
            return (
                <React.Fragment>
                    <ComponentToProtect {...this.props} />
                </React.Fragment>
            );
        }
    }

}