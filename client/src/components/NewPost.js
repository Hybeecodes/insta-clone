import React, {Component} from 'react';
import {Button, Card, Form} from "react-bootstrap";
import axios from 'axios';

class NewPost extends Component {
    state = {
        selectedFile: null,
        caption:''
    };
    fileSelectedHandler = e => {
        this.setState({
            selectedFile: e.target.files[0]
        });
    };
    addNewPost = (post) => {
        this.props.addPost(post);
        // console.log(this.props);
    };

    handleInputChange = (e) => {
        const { value, name } = e.target;
        // console.log(value);
        this.setState({
            [name]: value
        });
    };
    newPostHandler = () => {
        const fd = new FormData();
        fd.append('media', this.state.selectedFile);
        fd.append('caption',this.state.caption);
        axios.post('/api/v1/posts/new', fd).then((res) => {
            this.addNewPost(res.data.message);
            this.setState({
                selectedFile: null,
                caption:''
            });
            console.log(res);
        }).catch((err) => {
            console.log(err);
        });
    };
    render() {
        return (
            <Card>
                <Card.Header>
                    <h2 className="text-center">New Post</h2>
                </Card.Header>
                <Card.Body>
                    <Form>
                        <Form.Group controlId="formBasicFile">
                            <Form.Label>Choose File</Form.Label>
                            <Form.Control type="file" placeholder="Password" onChange={this.fileSelectedHandler} />
                        </Form.Group>

                        <Form.Group controlId="formBasicCaption">
                            <Form.Label>Caption</Form.Label>
                            <Form.Control as="textarea" name="caption" onChange={this.handleInputChange} placeholder="Enter Caption..." />
                        </Form.Group>
                        <Button variant="primary" onClick={this.newPostHandler} block>
                            New Post
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        );
    }
}

export default NewPost;