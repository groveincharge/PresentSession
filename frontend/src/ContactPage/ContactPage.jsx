import React, {Component} from 'react';
import './../_components/css/Contact.css';
import { connect } from 'react-redux';
import { commentActions } from '../_actions';


  class ContactPage extends Component {
    constructor(props) {
      super(props);
      this.state = {
                   user: {
                     refId: " ",
                    comment: " "
                  },
                  submitted: false
                }
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleChange(event) {
      const { name, value } = event.target;
      const { user } = this.state;
      this.setState({
          user: {
              ...user,
              [name]: value,
          }
      });
  }

    handleSubmit(event) {
      event.preventDefault();

      this.setState({ submitted: true });
      const { user } = this.state;
      const { refId, comment} = user;
      refId = this.props.refId;
      if (refId && comment) {
          this.props.addComment(user);
      }
  }
  
    render() {
      return (
             <div className="ContactForm">
                 <div className="ContactIntro">
                 <h1>Contact Us</h1>
                 <p>Contact us about any issues that
                     concerns you. We are dedicated to
                     providing a quality service to our
                     customers. The infomation that you
                     provide is kept confidential and shared
                     with no other party. The information is
                     used for personal transactions and customers
                     identification only. We are an Auto Detail company.
                     So feel free to contact us about your
                     auto detailing issues. NAD will respond to all
                     issues in a timely manner. Customers using the
                     affliliate link should register with NAD. This
                     will help us with identification on resolving
                     any issues that might pop up later. We can resolve 
                     problems in a more efficient manner with proper
                     documentation.
                 </p>
             </div>
               <div className="FormId">
               <h1>Contact Form</h1><br/>
               <p>Customer Comments</p><br/>
        <form onSubmit={this.handleSubmit}>
          <>
            comments:
          <textarea type="text" name="info" value={this.state.user.comment} 
          onChange={this.handleChange} required/>
          </><br/><br/>

          <input type="submit" value="Submit" />
        </form>
        </div>
        </div>
      );
    }
  }

  function mapState(state) {
    const { contact } = state;
    const { refId, comment } = contact;
    return { refId, comment };
}

const actionCreators = {
  addComment: commentActions.addComment
};
const connectedContactPage = connect(mapState, actionCreators)(ContactPage);
export { connectedContactPage as ContactPage };