import React, { Component } from "react";
import axios from "axios";
import MeetupItem from "./MeetupItem";

class Meetups extends Component {
  constructor() {
    super();
    this.state = {
      meetups: []
    };
  }

  UNSAFE_componentWillMount() {
    this.getMeetups();
  }

  getMeetups() {
    axios
      .get("http://localhost:3000/api/meetups")
      .then(response => {
        this.setState({
          meetups: response.data
        });
      })
      .catch(err => console.log(err));
  }

  render() {
    const meetupItems = this.state.meetups.map((meetup, i) => {
      return <MeetupItem item={meetup} key={meetup.id} />;
    });
    return (
      <div>
        <h1>Meetups</h1>
        <ul className="collection">{meetupItems}</ul>
      </div>
    );
  }
}

export default Meetups;
