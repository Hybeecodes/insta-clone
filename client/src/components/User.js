import React, {Component} from 'react';
import { Divider, Image, Grid, Button, Label, Icon } from 'semantic-ui-react';
import axios from 'axios';
import {Card} from "react-bootstrap";
const src = 'https://react.semantic-ui.com/images/wireframe/image.png';

class User extends Component {
    style = {
        padding: 60
    };
    state = {
        user: {}
    };
    componentDidMount() {
        const { username } = this.props.match.params;
        axios.get(`/api/v1/users/${username}`)
            .then((res) => {
                console.log(res);
                this.setState({
                    user: res.data.message[0]
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }
    render() {
        console.log(this.state.user);
        const posts = this.state.user.posts ? this.state.user.posts : [];
        const followings = this.state.user.followings ? this.state.user.followings.length : 0;
        const followers = this.state.user.followers ? this.state.user.followers.length : 0;
        console.log('following', followers);
        const postList = posts.length > 0 ?  (
            posts.map(post => {
                const link = `/posts/${post._id}`;
                return (
                    <a href={link} key={post._id} className="ui medium image">
                        <Image src={post.media} alt={post._id} size='medium' rounded />
                    </a>
                )
            })
        ): (
            <Card className="center">
                No Posts yet
            </Card>
        );
        return (
            <div>
                <div className="head">
                    <Grid>
                        <Grid.Column width={4}>
                            <Image src='https://react.semantic-ui.com/images/wireframe/square-image.png' size='medium' circular />
                        </Grid.Column>
                        <Grid.Column width={12} className="userDetails" style={this.style}>
                            <Button as='div' labelPosition='right'>
                                <Button>
                                    posts
                                </Button>
                                <Label as='a' basic pointing='left'>
                                    {posts.length}
                                </Label>
                            </Button>
                            <Button as='div' labelPosition='left'>
                                <Label as='a' basic pointing='right'>
                                    {followers}
                                </Label>
                                <Button >
                                    followers
                                </Button>
                            </Button>
                            <Button as='div' labelPosition='left'>
                                <Label as='a' basic>
                                    {followings}
                                </Label>
                                <Button>
                                    following
                                </Button>
                            </Button>
                        </Grid.Column>
                    </Grid>
                </div>
                <Divider/>
                <Image.Group size='small'>
                    { postList }
                </Image.Group>
            </div>
        );
    }
}

export default User;