import React, {Component} from 'react';
import {Card, Col, Image, Row, Button, InputGroup, FormControl } from "react-bootstrap";
import axios from 'axios';

class Post extends Component {
    state= {
        like: false,
        save: false,
        likeIcon: 'far fa-heart like',
        saveIcon: 'far fa-bookmark save',
        showComment: false,
        comment:'',
        commentsNumber:0,
        likesNumber:0
    };

    componentDidMount() {
        this.setState({
            commentsNumber:this.props.post.comments.length,
            likesNumber:this.props.post.likes.length
        })
    }

    toggleLike = () =>{
        const url = this.state.like? `/api/v1/posts/${this.props.post._id}/unlike`:`/api/v1/posts/${this.props.post._id}/like`;
        axios.post(url)
            .then((res) => {
                console.log(res);
                if(this.state.like){
                    this.setState({
                        like: !this.state.like,
                        likesNumber: this.state.likesNumber - 1
                    });
                }else{
                    this.setState({
                        like: !this.state.like,
                        likesNumber: this.state.likesNumber + 1
                    });
                }
                console.log(this.state)
            })
            .catch((error) => {
                console.log(error);
            });
    };
    handleInputChange = (e) => {
        const { value, name } = e.target;
        this.setState({
            [name]: value
        });
    };
    toggleSave = () => {
        this.setState({
            save: !this.state.save,
            saveIcon: 'fas fa-bookmark save'
        });
    };

    toggleComment = () => {
        this.setState({
            showComment: !this.state.showComment
        })
    };
    sendComment = () => {
        axios.post(`/api/v1/posts/${this.props.post._id}/comment`,{comment: this.state.comment})
            .then((res) => {
                console.log(res);
                this.setState({
                    commentsNumber: this.state.commentsNumber+1,
                    comment: ''
                });
            })
            .catch((error) => {
                console.log(error);
            });
    };
    render() {
        const { post } = this.props;
        const showCommentBox = this.state.showComment? (
            <InputGroup className="mb-3">
                <FormControl
                    placeholder="Enter your comment here..."
                    aria-label="comment"
                    aria-describedby="basic-addon2"
                    name="comment"
                    onChange={this.handleInputChange}
                />
                <InputGroup.Append>
                    <Button variant="primary" onClick={this.sendComment}>Comment</Button>
                </InputGroup.Append>
            </InputGroup>
        ) : '';
        const showLike = this.state.like? <i className='fas fa-heart fa-2x like red' onClick={this.toggleLike}> </i> : <i className='far fa-heart fa-2x like' onClick={this.toggleLike}></i>;
        const showSave = this.state.save? <i className='fas fa-bookmark fa-2x save' onClick={this.toggleSave}></i> : <i className='far fa-bookmark fa-2x save' onClick={this.toggleSave}></i>;
        const userPosts = `/users/${post.author.username}`;
        return (
            <Card className="post">
                <Card.Header>
                    <a href={userPosts} className="username">
                        <Image src="//via.placeholder.com/25x25" roundedCircle /> {post.author.username}
                    </a>
                </Card.Header>
                <Card.Body>
                    <Image src={post.media} rounded fluid /> <br/> <br/>
                    <Card.Text>
                        {post.caption}
                    </Card.Text>
                </Card.Body>
                <Card.Footer>
                    {showCommentBox}
                    <Row>
                        <Col>
                            <small>Liked by {this.state.likesNumber} people</small>
                        </Col>
                        <Col>
                            <small>{this.state.commentsNumber} comment(s)</small>
                        </Col>
                        <Col md={4}>
                            <Row>
                                <Col>
                                    <i className='far fa-comment fa-2x like' onClick={this.toggleComment}> </i>
                                </Col>
                                <Col>
                                    {showLike}
                                </Col>
                                <Col>
                                    {showSave}
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Card.Footer>
            </Card>
        );
    }
}

export default Post;