import React, {Component} from 'react';
import { connect } from "react-redux";
import { Button, Navbar, Nav, Form, FormControl } from 'react-bootstrap';

class Header extends Component {
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
                            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                            <Button variant="outline-success">Search</Button>
                        </Form>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        );
    }
}

function mapStateToProps({ auth }) {
    return { auth };
}
export default connect(mapStateToProps)(Header);