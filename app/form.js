import React from 'react'

const Form  = (props) => {
		const style = {
			input: {
				width: "40vw",
				height: "6vh",
				borderRadius: "4em",
				textAlign: "center",
				outline: "none",
				fontSize: "2em",
				letterSpacing: "1px"
			},
			form: {
				textAlign: "center"
			}
		}

		return (
				<form style={style.form} autoComplete="off">
					<input style={style.input} type="text" placeholder="Enter the username" onChange={props.handleChange} />
				</form>
			)
}

export default Form
