import React, {Component} from 'react';
import { Row, Col} from "react-bootstrap";
import NewPost from "./NewPost";
import Posts from "./Posts";
import Notifications from "./Notifications";
import axios from "axios";

class Home extends Component {
    state = {
        posts: []
    };

    addNewPost = (post) => {
        const { posts } = this.state;
        let newPosts = posts;
        newPosts.push(post);
        console.log('state', this.state);
        this.setState({
            posts: newPosts
        })
    };
    componentDidMount() {
        axios.get('/api/v1/posts')
            .then((res) => {
                this.setState({
                    posts: res.data
                })
            })
            .catch((err) => {
                console.log(err);
            });
    }

    render() {
        return (
            <div>
                <Row>
                    <Col md={8}>
                        <NewPost addPost={this.addNewPost} />
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



export default Home;