import React, {Component} from 'react';
import {Card, Image} from "react-bootstrap";

class Notifications extends Component {
    render() {
        return (
            <div>
                <Card>
                    <Card.Header>
                        <b className="text-center"> Notifications </b>
                        <Card.Subtitle><small>Recent Notifications</small></Card.Subtitle>
                    </Card.Header>
                    <Card.Body>
                        <div className="notification">
                            <Image src="//via.placeholder.com/25x25" roundedCircle /> &nbsp; &nbsp;
                            <small>Hybeecodes started following you</small>
                        </div>
                        <br/>
                        <div className="notification">
                            <Image src="//via.placeholder.com/25x25" roundedCircle /> &nbsp; &nbsp;
                            <small>Hybeecodes started following you</small>
                        </div>
                        <br/>
                        <div className="notification">
                            <Image src="//via.placeholder.com/25x25" roundedCircle /> &nbsp; &nbsp;
                            <small>Hybeecodes started following you</small>
                        </div>
                        <br/>
                        <div className="notification">
                            <Image src="//via.placeholder.com/25x25" roundedCircle /> &nbsp; &nbsp;
                            <small>Hybeecodes started following you</small>
                        </div>
                        <br/>
                        <div className="notification">
                            <Image src="//via.placeholder.com/25x25" roundedCircle /> &nbsp; &nbsp;
                            <small>Hybeecodes liked your post</small>&nbsp; &nbsp;
                            <Image src="//via.placeholder.com/25x25" roundedCircle />
                        </div>
                        <br/>
                        <div className="notification">
                            <Image src="//via.placeholder.com/25x25" roundedCircle /> &nbsp; &nbsp;
                            <small>Hybeecodes liked your post</small>&nbsp; &nbsp;
                            <Image src="//via.placeholder.com/25x25" roundedCircle />
                        </div>
                        <br/>
                        <div className="notification">
                            <Image src="//via.placeholder.com/25x25" roundedCircle /> &nbsp; &nbsp;
                            <small>Hybeecodes liked your post</small>&nbsp; &nbsp;
                            <Image src="//via.placeholder.com/25x25" roundedCircle />
                        </div>
                    </Card.Body>
                </Card>
            </div>
        );
    }
}

export default Notifications;