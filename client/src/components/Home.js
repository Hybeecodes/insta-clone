import React, {Component} from 'react';
import { Row, Col} from "react-bootstrap";
import { connect } from "react-redux";
import NewPost from "./NewPost";
import Posts from "./Posts";
import Notifications from "./Notifications";
import axios from 'axios';

class Home extends Component {
    state = {
        posts: []
    };
    componentDidMount() {
        axios.get('/api/v1/posts')
            .then((res) => {
                this.setState({
                    posts: res.data
                })
            })
            .catch((err) => {

            });
    }

    render() {
        console.log(this.props);
        return (
            <div>
                <Row>
                    <Col md={8}>
                        <NewPost/>
                        <br/>
                        <Posts posts={this.state.posts} />
                    </Col>
                    <Col md={4}>
                        <Notifications/>
                    </Col>
                </Row>
            </div>
        );
    }
}
export default connect(null)(Home);