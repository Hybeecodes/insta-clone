import React, {Component} from 'react';
import { Card, Feed } from 'semantic-ui-react'

class Notifications extends Component {
    render() {
        return (
            <div>
                <Card>
                    <Card.Content>
                        <Card.Header>Recent Activity</Card.Header>
                    </Card.Content>
                    <Card.Content>
                        <Feed>
                            <Feed.Event>
                                <Feed.Label image='//via.placeholder.com/25x25' />
                                <Feed.Content>
                                    <Feed.Date content='1 day ago' />
                                    <Feed.Summary>
                                        You added <a>Jenny Hess</a> to your <a>coworker</a> group.
                                    </Feed.Summary>
                                </Feed.Content>
                            </Feed.Event>

                            <Feed.Event>
                                <Feed.Label image='//via.placeholder.com/25x25' />
                                <Feed.Content>
                                    <Feed.Date content='3 days ago' />
                                    <Feed.Summary>
                                        You added <a>Molly Malone</a> as a friend.
                                    </Feed.Summary>
                                </Feed.Content>
                            </Feed.Event>

                            <Feed.Event>
                                <Feed.Label image='//via.placeholder.com/25x25' />
                                <Feed.Content>
                                    <Feed.Date content='4 days ago' />
                                    <Feed.Summary>
                                        You added <a>Elliot Baker</a> to your <a>musicians</a> group.
                                    </Feed.Summary>
                                </Feed.Content>
                            </Feed.Event>
                        </Feed>
                    </Card.Content>
                </Card>
                {/*<Card>*/}
                    {/*<Card.Header>*/}
                        {/*<b className="text-center"> Notifications </b>*/}
                        {/*<Card.Subtitle><small>Recent Notifications</small></Card.Subtitle>*/}
                    {/*</Card.Header>*/}
                    {/*<Card.Body>*/}
                        {/*<div className="notification">*/}
                            {/*<Image src="//via.placeholder.com/25x25" roundedCircle /> &nbsp; &nbsp;*/}
                            {/*<small>Hybeecodes started following you</small>*/}
                        {/*</div>*/}
                        {/*<br/>*/}
                        {/*<div className="notification">*/}
                            {/*<Image src="//via.placeholder.com/25x25" roundedCircle /> &nbsp; &nbsp;*/}
                            {/*<small>Hybeecodes started following you</small>*/}
                        {/*</div>*/}
                        {/*<br/>*/}
                        {/*<div className="notification">*/}
                            {/*<Image src="//via.placeholder.com/25x25" roundedCircle /> &nbsp; &nbsp;*/}
                            {/*<small>Hybeecodes started following you</small>*/}
                        {/*</div>*/}
                        {/*<br/>*/}
                        {/*<div className="notification">*/}
                            {/*<Image src="//via.placeholder.com/25x25" roundedCircle /> &nbsp; &nbsp;*/}
                            {/*<small>Hybeecodes started following you</small>*/}
                        {/*</div>*/}
                        {/*<br/>*/}
                        {/*<div className="notification">*/}
                            {/*<Image src="//via.placeholder.com/25x25" roundedCircle /> &nbsp; &nbsp;*/}
                            {/*<small>Hybeecodes liked your post</small>&nbsp; &nbsp;*/}
                            {/*<Image src="//via.placeholder.com/25x25" roundedCircle />*/}
                        {/*</div>*/}
                        {/*<br/>*/}
                        {/*<div className="notification">*/}
                            {/*<Image src="//via.placeholder.com/25x25" roundedCircle /> &nbsp; &nbsp;*/}
                            {/*<small>Hybeecodes liked your post</small>&nbsp; &nbsp;*/}
                            {/*<Image src="//via.placeholder.com/25x25" roundedCircle />*/}
                        {/*</div>*/}
                        {/*<br/>*/}
                        {/*<div className="notification">*/}
                            {/*<Image src="//via.placeholder.com/25x25" roundedCircle /> &nbsp; &nbsp;*/}
                            {/*<small>Hybeecodes liked your post</small>&nbsp; &nbsp;*/}
                            {/*<Image src="//via.placeholder.com/25x25" roundedCircle />*/}
                        {/*</div>*/}
                    {/*</Card.Body>*/}
                {/*</Card>*/}
            </div>
        );
    }
}

export default Notifications;