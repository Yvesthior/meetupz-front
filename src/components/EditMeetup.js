import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

class EditMeetup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      name: "",
      city: "",
      address: ""
    };
  }
  UNSAFE_componentWillMount() {
    this.getMeetupDetails();
  }

  getMeetupDetails() {
    let meetupId = this.props.match.params.id;
    axios
      .get(`http://localhost:3000/api/meetups/${meetupId}`)
      .then(response => {
        this.setState(
          {
            id: response.data.id,
            name: response.data.name,
            city: response.data.city,
            address: response.data.address
          },
          () => console.log(this.state)
        );
      })
      .catch(err => console.log(err));
  }
  editMeetup = newMeetup => {
    axios
      .request({
        method: "put",
        url: `http://localhost:3000/api/meetups/${this.state.id}`,
        data: newMeetup
      })
      .then(response => {
        this.props.history.push("/");
      })
      .catch(err => console.log(err));
  };

  onSubmit = e => {
    const newMeetup = {
      name: this.refs.name.value,
      city: this.refs.city.value,
      address: this.refs.address.value
    };
    this.editMeetup(newMeetup);
    e.preventDefault();
  };

  render() {
    return (
      <div>
        <br />
        <Link to="/" className="btn grey">
          Back
        </Link>
        <h1>Edit Meetup</h1>
        <form onSubmit={this.onSubmit}>
          <div className="input-field">
            <input
              type="text"
              name="name"
              ref="name"
              defaultValue={this.state.name}
            />
            <label htmlFor="name">Name</label>
          </div>
          <div className="input-field">
            <input
              type="text"
              name="city"
              ref="city"
              defaultValue={this.state.city}
            />
            <label htmlFor="name">City</label>
          </div>
          <div className="input-field">
            <input
              type="text"
              name="address"
              ref="address"
              defaultValue={this.state.address}
            />
            <label htmlFor="name">Address</label>
          </div>
          <input type="submit" value="Save" className="btn" />
        </form>
      </div>
    );
  }
}

export default EditMeetup;
