import React, {Component} from 'react';
import { Card, Image, Row, Col} from "react-bootstrap";
import Post from "./Post";

class Posts extends Component {
    render() {
        console.log('props ',this.props);
        const {posts} = this.props;
        const postList = posts.length ?  (
            posts.map(post => {
                return (
                    <Post post={post} key={post._id} />
                )
            })
        ): (
            <Card className="center">
                No Posts yet
            </Card>
        );
        return (
            <div className="posts">
                {postList}
            </div>
        );
    }
}

export default Posts;