import * as React from 'react';
import './stylesreg.css';
import axios from 'axios';
import { Form } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { BsCheckSquareFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import '../fonts/Vazir.ttf';

const formvalid2 = ({ error, ...rest }) => {
	let isValid = false;

	Object.values(error).forEach((val) => {
		if (val.length > 0) {
			isValid = false;
		} else {
			isValid = true;
		}
	});

	Object.values(rest).forEach((val) => {
		if (val === null) {
			isValid = false;
		} else {
			isValid = true;
		}
	});

	return isValid;
};

class Register2 extends React.Component {
	constructor(props) {
		super(props);
		this.state = {

			emailtxt:'',
			fields: {},
			error: {
				firstname: {
					u1: '',
					u2: ''
				},
				lastname: {
					u1: '',
					u2: ''
				},
				username: {
					u1: '',
					u2: '',
					u3: ''
				},
				email: {
					u1: '',
					u2: ''
				},
				password: {
					p1: '',
					p2: '',
					p3: '',
					p4: '',
					p5: '',
					p6: ''
				},
				password2: {
					p1: '',
					p2: ''
				}
			}
		};

		this.formValChange = this.formValChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	onSubmit(e) {
		e.preventDefault();

		if (formvalid2(this.state)) {
			let fields = {};

			fields['firstname'] = '';
			fields['lastname'] = '';
			fields['username'] = '';
			fields['email'] = '';
			fields['password'] = '';
			fields['password2'] = '';
			this.setState({ fields: fields });
			alert('Form submitted');
		}
	}

	handleSubmit = (e) => {
		e.preventDefault();
		var formData = new FormData();
		formData.append('firstname', this.state.fields['firstname']);
		formData.append('lastname', this.state.fields['lastname']);
		formData.append('username', this.state.fields['username']);
		formData.append('email', this.state.fields['email']);
		formData.append('password', this.state.fields['password']);
		formData.append('password2', this.state.fields['password2']);

		var config = {
			method: 'post',
			url: 'http://localhost:8000/api/account/register/',
			// headers: {
			//   'Authorization': 'Token '+ localStorage.getItem('token'),

			// },
			data: formData
		};

		axios(config)
			.then(function(response) {
				console.log(JSON.stringify(response.data));
				console.log('first_name:' + this.state.fields['firstname']);
				console.log('last_name:' + this.state.fields['lastname']);
				console.log('username:' + this.state.fields['username']);
				console.log('email:' + this.state.fields['email']);
				console.log('password:' + this.state.fields['password']);
				console.log('password2:' + this.state.fields['password2']);
			})
			.catch(function(error) {
				console.log(error);
			});
	};

	formValChange = (e) => {
		let fields = this.state.fields;
		fields[e.target.name] = e.target.value;
		const { name, value } = e.target;
		let error = { ...this.state.error };

		switch (name) {
			case 'firstname':
				error.firstname.u2 =
					typeof value !== 'undefined' && !value.match(/^[\sa-zA-Z\u0600-\u06FF,-]*$/)
						? '*لطفا فقط کاراکترهای الفبایی وارد کن.'
						: '';
				error.firstname.u1 = !value ? '*لطفا نام خودت رو وارد کن.' : '';
				break;

			case 'lastname':
				error.lastname.u2 =
					typeof value !== 'undefined' && !value.match(/^[\sa-zA-Z\u0600-\u06FF,-]*$/)
						? '*لطفا فقط کاراکترهای الفبایی وارد کن.'
						: '';
				error.lastname.u1 = !value ? '*لطفاً نام خانوادگی خودت رو وارد کن.' : '';
				break;

			case 'username':
				error.username.u1 =
					typeof value !== 'undefined' && !value.match(/^[a-z A-Z]+[_]*[A-Z a-z]+$/)
						? '*لطفا فقط کاراکترهای مجاز وارد کن.'
						: '';
				error.username.u2 = value.length < 6 ? '*حداقل ۶ کاراکتر وارد کن.' : '';
				error.username.u3 = !value ? ' *نام کاربری نباید خالی باشه!' : '';
				break;

			case 'email':
				error.email.u2 =
					typeof value !== 'undefined' &&
					!value.match(
						/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
					)
						? '*ایمیل معتبر نیست.'
						: '';
				error.email.u1 = !value ? '*لطفا ایمیلت رو وارد کن.' : '';
				break;

			case 'password':
				error.password.p2 =
					typeof value !== 'undefined' && !value.match(/^.*(?=.*\d).*$/)
						? '*رمز عبور باید شامل حداقل یک عدد باشه.'
						: '';
				error.password.p3 =
					typeof value !== 'undefined' && !value.match(/^.*(?=.*[a-z]).*$/)
						? '*رمز عبور باید شامل حروف [a-z] باشه.'
						: '';
				error.password.p4 =
					typeof value !== 'undefined' && !value.match(/^.*(?=.*[A-Z]).*$/)
						? '*رمز عبور باید شامل حروف [A-Z] باشه.'
						: '';
				error.password.p5 =
					typeof value !== 'undefined' && !value.match(/^.*(?=.*[@#$%&]).*$/)
						? '*رمز عبور  باید شامل حداقل یک کاراکتر خاص [@#$%&] باشه .'
						: '';
				error.password.p6 = value.length < 8 ? '*حداقل ۸ کاراکتر وارد کن.' : '';
				error.password.p1 = !value ? '*لطفا یه رمز عبور انتخاب کن.' : '';
				error.password2.p1 = value !== this.state.fields['password2'] ? '*با رمز عبور تطابق نداره !' : '';

				break;

			case 'password2':
				error.password2.p1 = value !== this.state.fields['password'] ? '*با رمز عبور تطابق نداره !' : '';
				error.password2.p2 = !value ? '*رمز عبور رو تکرار کن.' : '';
				break;
			default:
				break;
		}

		this.setState({
			fields,
			error,
			[name]: value
		});
	};

	render() {
		const { error } = this.state;

		return (
			<div className="sign">
				<br />
				<br />
				<Form onSubmit={this.onSubmit}>
					<BsCheckSquareFill className="icons" color="#28c5cc" />
					<br />
					<h2 className="icontexts">ثبت نام</h2>
					<img
						src="https://s4.uupload.ir/files/man-reading-book-while-walking-city_74855-7608_y9ze.jpg"
						className="imgs"
					/>

					<br />

					<div className="form-group" className="atext2">
						<input
							type="text"
							style={{ height: '47px', fontSize: '15px'}}
							size="lg"
							value={this.state['firstname']}
							className={
								error.firstname.u2.length > 0 || error.firstname.u1.length > 0 ? (
									'is-invalid form-control'
								) : (
									'form-control'
								)
							}
							name="firstname"
							placeholder="*نام"
							onChange={this.formValChange}
						/>
						{error.firstname.u1.length > 0 && (
							<span className="invalid-feedback" className="newnm" >
								{error.firstname.u1}
							</span>
						)}

						{error.firstname.u2.length > 0 && (
							<span className="invalid-feedback" className="newnm" >
								{error.firstname.u2}
							</span>
						)}
					</div>

					<div className="form-group" className="atext2">
						<input
							type="text"
							style={{ height: '47px', fontSize: '15px' }}
							size="lg"
							value={this.state['lastname']}
							className={
								error.lastname.u1.length > 0 || error.lastname.u2.length > 0 ? (
									'is-invalid form-control'
								) : (
									'form-control'
								)
							}
							name="lastname"
							placeholder="*نام خانوادگی "
							onChange={this.formValChange}
						/>
						{error.lastname.u1.length > 0 && (
							<span className="invalid-feedback" className="newnm" >
								{error.lastname.u1}
							</span>
						)}

						{error.lastname.u2.length > 0 && (
							<span className="invalid-feedback" className="newnm" >
								{error.lastname.u2}
							</span>
						)}
					</div>

					<div className="form-group" className="atext2">
						<input
							type="text"
							style={{ height: '47px', fontSize: '15px' }}
							size="lg"
							className={
								error.username.u1.length > 0 ||
								error.username.u2.length > 0 ||
								error.username.u3.length > 0 ? (
									'is-invalid form-control'
								) : (
									'form-control'
								)
							}
							name="username"
							placeholder="*نام کاربری"
							value={this.state['username']}
							onChange={this.formValChange}
						/>
						{error.username.u1.length > 0 && (
							<span className="invalid-feedback" className="newnm" >
								{error.username.u1}
							</span>
						)}
						{error.username.u2.length > 0 && (
							<span className="invalid-feedback" className="newnm" >
								{error.username.u2}
							</span>
						)}

						{error.username.u3.length > 0 && (
							<span className="invalid-feedback" className="newnm">
								{error.username.u3}
							</span>
						)}
					</div>

					<div className="form-group" className="atext2">
						<input
							type="email"
							style={{ height: '47px', fontSize: '15px' }}
							size="lg"
							className={
								error.email.u1.length > 0 || error.email.u2.length > 0 ? (
									'is-invalid form-control'
								) : (
									'form-control'
								)
							}
							name="email"
							placeholder="*ایمیل"
							value={this.state['email']}
							onChange={this.formValChange}
						/>
						{error.email.u1.length > 0 && (
							<span className="invalid-feedback" className="newnm" >
								{error.email.u1}
							</span>
						)}
						{error.email.u2.length > 0 && (
							<span className="invalid-feedback" className="newnm" >
								{error.email.u2}
							</span>
						)}
					</div>

					<div className="form-group" className="atext2">
						<input
							type="password"
							style={{ height: '47px', fontSize: '15px' }}
							size="lg"
							className={
								error.password.p5.length > 0 ||
								error.password.p4.length > 0 ||
								error.password.p1.length > 0 ||
								error.password.p2.length > 0 ||
								error.password.p3.length > 0 ||
								error.password.p6.length > 0 ? (
									'is-invalid form-control'
								) : (
									'form-control'
								)
							}
							name="password"
							placeholder="*رمز عبور"
							value={this.state['password']}
							onChange={this.formValChange}
						/>

						{error.password.p1.length > 0 && (
							<span className="invalid-feedback" className="newnm">
								{error.password.p1}
							</span>
						)}
						{error.password.p2.length > 0 && (
							<span className="invalid-feedback" className="newnm" >
								{error.password.p2}
							</span>
						)}

						{error.password.p4.length > 0 && (
							<span className="invalid-feedback" className="newnm" >
								{error.password.p4}
							</span>
						)}
						{error.password.p3.length > 0 && (
							<span className="invalid-feedback" className="newnm">
								{error.password.p3}
							</span>
						)}
						{error.password.p5.length > 0 && (
							<span className="invalid-feedback" className="newnm" >
								{error.password.p5}
							</span>
						)}
						{error.password.p6.length > 0 && (
							<span className="invalid-feedback" className="newnm" >
								{error.password.p6}
							</span>
						)}
					</div>

					<div className="form-group" className="atext2" >
						<input
							type="password"
							style={{ height: '47px', fontSize: '15px'}}
							size="lg"
							className={
								error.password2.p1.length > 0 || error.password2.p2.length > 0 ? (
									'is-invalid form-control'
								) : (
									'form-control'
								)
							}
							name="password2"
							placeholder="*تکرار رمز عبور"
							value={this.state['password2']}
							onChange={this.formValChange}
						/>
						{error.password2.p1.length > 0 && (
							<span className="invalid-feedback" className="newnm" >
								{error.password2.p1}
							</span>
						)}
						{error.password2.p2.length > 0 && (
							<span className="invalid-feedback" className="newnm" >
								{error.password2.p2}
							</span>
						)}
					</div>

					<Button variant="primary" size="lg" className="buttons" onClick={this.handleSubmit}>
						ثبت نام
					</Button>
					{/* <div>لطفا جهت تایید ایمیل خود ا چک کنید</div> */}

					<br />
					<br />
					<h4 className="linktexts">
						ثبت نام کردی؟{' '}
						<Link style={{ color: '#28c5cc' }} to="/login">
							وارد شو{' '}
						</Link>
					</h4>
					<br />
					<br />
				</Form>
			</div>
		);
	}
}

export default Register2;
