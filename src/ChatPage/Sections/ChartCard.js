import React, { Component } from "react";
import moment from 'moment';
import { Comment, Tooltip, Avatar } from 'antd';

class ChartCard extends Component {
  render() {
    // console.log(this.props.images)
    return (
      <div style={{ width: '100%' }}>
        <Comment
          author={this.props.sender.firstname}
          avatar={
            <Avatar
              src={`http://localhost:5000/${this.props.images}`}
            />
          }
          content={
            this.props.message.substring(0, 8) === "uploads/" ?
              // this will be either video or image 

              this.props.message.substring(this.props.message.length - 3, this.props.message.length) === 'mp4' ?
                <video
                  style={{ maxWidth: '200px' }}
                  src={`http://localhost:5000/${this.props.message}`} alt="video"
                  type="video/mp4" controls
                />
                :
                <img
                  style={{ maxWidth: '200px' }}
                  src={`http://localhost:5000/${this.props.message}`}
                  alt="img"
                />
              :
              <p>
                {this.props.message}
              </p>
          }

          datetime={
            <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
              <span>{moment().fromNow()}</span>
            </Tooltip>
          }
        />
      </div>
    )
  }
}

export default ChartCard;