import React, {Component} from 'react';
import { Header } from 'semantic-ui-react';
import axios from 'axios';
import SearchResult from "./SearchResult";
import {Card} from "react-bootstrap";

class SearchResults extends Component {
    state= {
        users: []
    };
    componentDidMount() {
        const { query } = this.props.match.params;
        axios.get(`/api/v1/users/search/${query}`)
            .then((res) => {
                this.setState({
                    users: res.data.message
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    render() {
        const { users } = this.state ;
        const showResults = users.length ?  (
            users.map(user => {
                return (
                    <SearchResult result={user} key={user._id} />
                )
            })
        ): (
            <Card className="center">
                Sorry, No search result
            </Card>
        );
        return (
            <div>
                <Header as='h3' dividing>
                    You have {this.state.users.length} search result(s)
                </Header>
                {showResults}
            </div>
        );
    }
}

export default SearchResults;