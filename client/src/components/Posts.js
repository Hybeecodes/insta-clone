import React, {Component} from 'react';
import { Card, Image, Row, Col} from "react-bootstrap";

class Posts extends Component {


    renderPosts () {
        const isEmpty = this.props.posts.length > 0;
        switch (isEmpty) {
            case true:
                this.props.posts.map((post) => {
                    console.log(post);
                    return(
                        <Card>
                            <Card.Header>
                                <Image src="//via.placeholder.com/25x25" roundedCircle /> author_name
                            </Card.Header>
                            <Card.Body>
                                <Image src="https://mdbootstrap.com/img/Photos/Others/images/43.jpg" rounded fluid />
                            </Card.Body>
                            <Card.Footer>
                                <Row>
                                    <Col>
                                        <small>Liked by 30 people</small>
                                    </Col>
                                    <Col md={4}>
                                        <Row>
                                            <Col>
                                                <i className="far fa-heart"> Like</i>
                                            </Col>
                                            <Col>
                                                <i className="far fa-bookmark"> Save</i>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </Card.Footer>
                        </Card>
                    );
                });
                break;
            case false:
                return (
                    <Card>
                        No Post Yet
                    </Card>
                );
            default:
                return;
        }
    }
    render() {
        // console.log(this.props);
        const {posts} = this.props;
        const postList = posts.length ?  (
            posts.map(post => {
                return (
                    <Card key={post._id}>
                        <Card.Header>
                            <Image src="//via.placeholder.com/25x25" roundedCircle /> {post.author.username}
                        </Card.Header>
                        <Card.Body>
                            <Image src={post.media} rounded fluid />
                            <Card.Text />
                        </Card.Body>
                        <Card.Footer>
                            <Row>
                                <Col>
                                    <small>Liked by 30 people</small>
                                </Col>
                                <Col md={4}>
                                    <Row>
                                        <Col>
                                            <i className="far fa-heart"> Like</i>
                                        </Col>
                                        <Col>
                                            <i className="far fa-bookmark"> Save</i>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Card.Footer>
                    </Card>
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