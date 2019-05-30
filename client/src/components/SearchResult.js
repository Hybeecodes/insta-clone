import React, {Component} from 'react';
import {Button, Image, Item} from "semantic-ui-react";
const paragraph = <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />;

class SearchResult extends Component {
    state = {
        following: false
    };
    componentDidMount() {
        console.log(this.props);
    }

    render() {
        const { result } = this.props;
        const link = `/users/${result.username}`;
        return (
            <div>
                <Item.Group relaxed>
                    <Item>
                        <Item.Image size='small' src='https://react.semantic-ui.com/images/wireframe/image.png' />
                        <Item.Content verticalAlign='middle'>
                            <Item.Header>
                                <a href={link} className="author" >
                                    {result.username}
                                </a>
                            </Item.Header>
                            <Item.Description>{paragraph}</Item.Description>
                            <Item.Extra>
                                <Button color='blue' floated='right'>Following</Button>
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                </Item.Group>
            </div>
        );
    }
}

export default SearchResult;