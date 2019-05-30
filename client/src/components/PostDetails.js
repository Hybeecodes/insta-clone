import React, {Component} from 'react';

class PostDetails extends Component {

    componentDidMount() {
        const { post } = this.props.match.params;
    }

    render() {
        return (
            <div>

            </div>
        );
    }
}

export default PostDetails;