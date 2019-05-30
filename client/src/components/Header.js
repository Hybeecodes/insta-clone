import React, {Component} from 'react';
import { Navbar, Nav, Form, FormControl } from 'react-bootstrap';
import { Button, Icon, Input } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';

class Header extends Component {
    state = {
          query: ''
    };
    handleInputChange = (e) => {
        const { value, name } = e.target;
        this.setState({
            [name]: value
        });
    };

    handleSearch = (event) => {
        event.preventDefault();
        const { query } = this.state;
        this.props.history.push(`/search/${query}`);
    };
    render(props) {
        // console.log(this.props);
        return (
            <div className="header">
                <Navbar bg="light" expand="lg">
                    <Navbar.Brand href="/">{this.props.APP_NAME}</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            {/*<Nav.Link href="#home">Home</Nav.Link>*/}
                            {/*<Nav.Link href="#link">Link</Nav.Link>*/}
                        </Nav>
                        <Form inline>
                            <Input icon='user' name='query' onChange={this.handleInputChange} iconPosition='left' placeholder='Search user...' />

                            <Button  color='blue' onClick={this.handleSearch} animated>
                                <Button.Content visible>Search</Button.Content>
                                <Button.Content hidden>
                                    <Icon name='arrow right' />
                                </Button.Content>
                            </Button>
                        </Form>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        );
    }
}

export default withRouter(Header);