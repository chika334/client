import React, { Component } from 'react'
import io from "socket.io-client";
import { connect } from "react-redux";
import moment from "moment";
import { getChats, afterPostMessage } from "../actions/chatAction"
import ChatCard from "./Sections/ChatCard"
import Dropzone from 'react-dropzone';
import Axios from 'axios';
import PublishIcon from '@material-ui/icons/Publish';
import Paper from '@material-ui/core/Paper';
import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import '../css/chat.css';
import { loadProfilePics } from '../actions/imageAction';

export class ChatPage extends Component {
	state = {
		chatMessage: "",
	}

	componentDidMount() {
		let server = 'http://localhost:5000';

		this.props.dispatch(getChats());
		this.props.dispatch(loadProfilePics());

		this.socket = io(server);

		this.socket.on("Output Chat Message", messageFromBackEnd => {
			this.props.dispatch(afterPostMessage(messageFromBackEnd));
		})
	}

	componentDidUpdate() {
		this.messagesEnd.scrollIntoView({ behavior: 'smooth' });
	}

	hanleSearchChange = (e) => {
		this.setState({
			chatMessage: e.target.value
		})
	}

	renderCards = () =>
		this.props.chats.chats
		&& this.props.chats.chats.map((chat) => (
			<ChatCard key={chat._id}  {...chat} />
		));

	onDrop = (files) => {
		console.log(files)

		let formData = new FormData;

		const config = {
			header: { 'content-type': 'multipart/form-data' }
		}

		formData.append("file", files[0])

		Axios.post('http://localhost:5000/api/chat/uploadfiles', formData, config)
			.then(response => {
				if (response.data.success) {
					let chatMessage = response.data.url;
					let userId = this.props.auth.user._id
					let firstname = this.props.auth.user.firstname;
					let userImage = this.props.image.image.path
					let nowTime = moment();
					let type = "VideoOrImage"

					this.socket.emit("Input Chat Message", {
						chatMessage,
						userId,
						firstname,
						userImage,
						nowTime,
						type
					});
				}
			})
	}

	submitChatMessage = (e) => {
		e.preventDefault();

		let chatMessage = this.state.chatMessage
		let userId = this.props.auth.user._id
		let firstname = this.props.auth.user.firstname;
		let userImage = this.props.image.image.path;
		let nowTime = moment();
		let type = "Text"

		this.socket.emit("Input Chat Message", {
			chatMessage,
			userId,
			firstname,
			userImage,
			nowTime,
			type
		});
		this.setState({ chatMessage: "" })
	}

	render() {
		const { auth } = this.props;
		// console.log(this.props.image.image.path);
		return (
			<React.Fragment>
				<Paper elevation={3} className="root">

					<Typography className="chatApp" variant="h4" component="h4">
						{
							auth.user.department
						}
					</Typography>
					{/* <div style={{ maxWidth: '800px', margin: '0 auto' }}> */}
					<div className="infinite-container chatWindow" style={{ height: '350px', width: '100%', overflowY: 'scroll' }}>
						{this.props.chats && (
							this.renderCards()
						)}
						<div
							ref={el => {
								this.messagesEnd = el;
							}}
							style={{ float: "left", clear: "both" }}
						/>
					</div>

					<div className="flex">
						<TextField
							label="Send a Chat"
							className="chatBox"
							value={this.state.chatMessage}
							onChange={this.hanleSearchChange}
						/>
						<span className="dropdown">
							<Dropzone onDrop={this.onDrop}>
								{({ getRootProps, getInputProps }) => (
									<section>
										<div {...getRootProps()}>
											<input {...getInputProps()} />
											<Button className="dropIcon">
												<PublishIcon />
											</Button>
										</div>
									</section>
								)}
							</Dropzone>
						</span>
						<Button
							variant="contained"
							color="primary"
							className="button"
							onClick={this.submitChatMessage}
						>
							SEND
						</Button>
						{/* </div> */}
					</div>
				</Paper>
			</React.Fragment>
		)
	}
}

const mapStateToProps = state => ({
	auth: state.auth,
	chats: state.chat,
	image: state.image
})


export default connect(mapStateToProps, null)(ChatPage);
