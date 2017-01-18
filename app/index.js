import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import DisplayGithubProfile from './display'
import Form from './form'
// import emojify from 'emojify.js'
import PRIVATE from './private'

class GithubProfileViewer extends Component {
	constructor() {
		super()
		this.state = {
			username: '',
			loading: false,
			error: false,
			user: {}
		}
		this.handleChange = this.handleChange.bind(this)
		this.getGithubProfileInfo = this.getGithubProfileInfo.bind(this)
	}

	componentDidMount() {
		// emojify.run();
	}

	getGithubProfileInfo(username) {
		return fetch(`https://api.github.com/users/${username}?client_id=${PRIVATE.CLIENT_ID}&client_secret=${PRIVATE.CLIENT_SECRET}`)
	}

	handleChange(e) {
		const username = e.target.value.trim()
		console.log(username)
		this.setState({ username,loading: true })
		this.getGithubProfileInfo(username)
			.then(res => res.json())
			.then(data => {
				const {
					avatar_url,
					bio,
					public_repos,
					public_gists,
					followers,
					following,
					blog,
					location
				} = data
				this.setState({
					loading: false,
					user: {
						avatar_url,
						bio,
						public_repos,
						public_gists,
						followers,
						following,
						blog,
						location
					}
				})
			})
	}

	render() {
		return (
				<div>
					<h1>Github Profile Viewer React</h1>
					<Form  handleChange={this.handleChange}/>
					<DisplayGithubProfile {...this.state} />
				</div>
			)
	}
}

ReactDOM.render(<GithubProfileViewer />, document.getElementById('app'));

/*
user: {
				avatar_url,
				bio,
				public_repos,
				public_gists,
				followers,
				following,
				blog,
				location
			}

 */
