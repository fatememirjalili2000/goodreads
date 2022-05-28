import * as React from 'react';
import DefaultUserPic from '../Images/a2.jpg';
import './styles.scss';
import '../fonts/Vazir.ttf';
import { Link } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Container, Row, Col } from 'react-bootstrap';
import '../fonts/Vazir.ttf';
import axios from 'axios';
import ImageUploader from 'react-images-upload';
import 'react-images-uploader/styles.css';
import 'react-images-uploader/font.css';
import Slider from '@material-ui/core/Slider';
import Cropper from 'react-easy-crop';
import './a.css';

const formValid = ({ isError, ...rest }) => {
	let isValid = false;

	Object.values(isError).forEach((val) => {
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

class Edit extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			birthdate: new Date(),

			// birthdate: '2021-12-06',
			isstory: false,
			issocial: false,
			ispsychology: false,
			ishistoric: false,
			isarty: false,

			province: '',
			pictures: [],
			imageSrc: DefaultUserPic,
			crop: { x: 0, y: 0 },
			zoom: 1,
			aspect: 1,

			uploadedFile: null,

			fields: {},
			isError: {
				phone: '',
				firstname: '',
				lastname: '',
				username: {
					u1: '',
					u2: ''
				}
			}
		};

		this.formValChange = this.formValChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.onDrop = this.onDrop.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	//date
	onChangeEvent = (event) => {
		console.log(event.target.value);
		this.setState({ birthdate: event });
	};

	handleChange(e, value) {
		let d = e.target.value;
		console.log('checked =>', d);

		let isChecked = e.target.checked;
		console.log('checked =>', isChecked);
		if (value == 'داستانی') {
			this.setState({
				isstory: isChecked
			});
		}
		if (value == 'اجتماعی') {
			this.setState({
				issocial: isChecked
			});
		}
		if (value == 'روانشناسی') {
			this.setState({
				ispsychology: isChecked
			});
		}
		if (value == 'تاریخی') {
			this.setState({
				ishistoric: isChecked
			});
		}
		if (value == 'هنر') {
			this.setState({
				isarty: isChecked
			});
		}
	}

	//image

	onDrop(pictureFiles, pictureDataURLs) {
		console.log(pictureFiles);
		console.log(pictureDataURLs);
		this.setState({ imageSrc: pictureDataURLs });
		this.setState({
			pictures: this.state.pictures.concat(pictureFiles)
		});
	}

	onCropChange = (crop) => {
		this.setState({ crop });
	};

	onCropComplete = (croppedArea, croppedAreaPixels) => {
		console.log(croppedArea, croppedAreaPixels);
	};

	onZoomChange = (zoom) => {
		this.setState({ zoom });
	};

	//fetch

	fetchUserDetails = () => {
		var config = {
			method: 'get',
			url: 'http://127.0.0.1:8000/api/account/properties/',
			headers: {
				Authorization: 'Token ' + localStorage.getItem('token')
			}
		};

		axios(config)
			.then((response) => {
				console.log(response.data);
				let fields = {};
				let province = '';
				let isstory = false;
				let issocial = false;
				let ispsychology = false;
				let ishistoric = false;
				let isarty = false;
				let birthdate = new Date();

				fields['firstname'] = response.data.firstname.replace(/['"]+/g, '');
				fields['lastname'] = JSON.stringify(response.data.lastname).replace(/['"]+/g, '');
				fields['username'] = JSON.stringify(response.data.username).replace(/['"]+/g, '');
				fields['bio'] = JSON.stringify(response.data.bio).replace(/['"]+/g, '');

				fields['gender'] = JSON.stringify(response.data.gender).replace(/['"]+/g, '');
				fields['phone'] = JSON.stringify(response.data.phone);
				// .replace(/['"]+/g, '');
				console.log('fn', fields['firstname']);
				// console.log(this.state.fields);
				this.setState({ fields: fields });
				//image
				if (response.data.image) {
					fields['profileImage'] = JSON.stringify(response.data.image);
				}
				//province
				if (response.data.province) {
					province = JSON.stringify(response.data.province);
				}
				//favorite
				if (response.data.isstory) {
					isstory = JSON.stringify(response.data.isstory);
				}

				if (response.data.issocial) {
					issocial = JSON.stringify(response.data.issocial);
				}
				if (response.data.ishistoric) {
					ishistoric = JSON.stringify(response.data.ishistoric);
				}
				if (response.data.isarty) {
					isarty = JSON.stringify(response.data.isarty);
				}
				if (response.data.ispsychology) {
					ispsychology = JSON.stringify(response.data.ispsychology);
				}
				//date

				if (response.data.birthdate) {
					birthdate = JSON.stringify(response.data.birthdate);
				}

				this.setState({ birthdate: birthdate });
				this.setState({ fields: fields });
				this.setState({ province: province });
				this.setState({ issocial: issocial });
				this.setState({ isstory: isstory });
				this.setState({ ishistoric: ishistoric });
				this.setState({ ispsychology: ispsychology });
				this.setState({ isarty: isarty });
			})
			.catch(function(error) {
				console.log(error);
			});
	};

	//setState

	onSubmit = (e) => {
		e.preventDefault();

		if (formValid(this.state)) {
			let fields = {};
			let province = '';
			let isstory = false;
			let issocial = false;
			let ispsychology = false;
			let ishistoric = false;
			let isarty = false;
			let birthdate = new Date();

			fields['firstname'] = '';
			fields['lastname'] = '';
			fields['username'] = '';
			fields['bio'] = '';
			fields['phone'] = '';
			fields['gender'] = '';

			fields['profileImage'] = null;
			fields['uploadedFile'] = null;

			province = '';
			this.setState({ birthdate: birthdate });
			this.setState({ fields: fields });
			this.setState({ province: province });
			this.setState({ issocial: issocial });
			this.setState({ isstory: isstory });
			this.setState({ ishistoric: ishistoric });
			this.setState({ ispsychology: ispsychology });
			this.setState({ isarty: isarty });

			alert('Form Edited');
		}
	};

	//post

	UpdateProfileHandler = (e) => {
		e.preventDefault();

		var formData = new FormData();
		formData.append('firstname', this.state.fields['firstname']);
		formData.append('lastname', this.state.fields['lastname']);
		formData.append('username', this.state.fields['username']);
		formData.append('bio', this.state.fields['bio']);
		formData.append('phone', this.state.fields['phone']);
		formData.append('gender', this.state.fields['gender']);

		formData.append('image', this.state.pictures[0]);

		formData.append('birthdate', this.state.birthdate);

		formData.append('province', this.state.province);
		formData.append('isstory', this.state.isstory);
		formData.append('issocial', this.state.issocial);
		formData.append('ispsychology', this.state.ispsychology);
		formData.append('ishistoric', this.state.ishistoric);
		formData.append('isarty', this.state.isarty);

		var config = {
			method: 'put',
			url: 'http://127.0.0.1:8000/api/account/properties/update/',
			headers: {
				Authorization: 'Token ' + localStorage.getItem('token')
			},
			data: formData
		};

		axios(config)
			.then(function(response) {
				this.setState({ profileImage: JSON.stringify(response.data.image) });
			})
			.catch(function(error) {
				console.log(error);
			});
	};

	componentDidMount() {
		this.fetchUserDetails();
	}

	//check error then setState

	formValChange = (e) => {
		let fields = this.state.fields;
		fields[e.target.name] = e.target.value;

		const { name, value } = e.target;
		let isError = { ...this.state.isError };

		switch (name) {
			case 'firstname':
				isError.firstname =
					typeof value !== 'undefined' && !value.match(/^[\sa-zA-Z\u0600-\u06FF,-]*$/)
						? '*لطفا فقط کاراکترهای الفبایی وارد کن.'
						: '';
				break;

			case 'lastname':
				isError.lastname =
					typeof value !== 'undefined' && !value.match(/^[\sa-zA-Z\u0600-\u06FF,-]*$/)
						? '*لطفا فقط کاراکترهای الفبایی وارد کن.'
						: '';
				break;

			case 'username':
				isError.username.u1 =
					typeof value !== 'undefined' && !value.match(/^[a-z A-Z]+[_]*[A-Z a-z]+$/)
						? '*لطفا فقط کاراکترهای مجاز وارد کن.'
						: '';
				isError.username.u2 = value.length < 6 ? '*حداقل ۶ کاراکتر وارد کنید' : '';

				break;

			case 'phone':
				isError.phone =
					(typeof value !== 'undefined' && !value.match(/^\d*$/)) || value.length < 11
						? '*شماره نا معتبر'
						: '';

				break;

			default:
				break;
		}

		this.setState({
			fields,
			isError,
			[name]: value
		});
	};

	//html UI

	render() {
		console.log('gender', this.state.fields['gender']);

		console.log('province', this.state.gender);

		console.log('story', this.state.isstory);
		console.log('social', this.state.issocial);
		console.log('psy', this.state.ispsychology);
		console.log('history', this.state.ishistoric);
		console.log('art', this.state.isarty);

		//image

		const { isError } = this.state;
		var profilePic = null;
		if (this.state.fields['profileImage']) {
			var imagestr = this.state.fields['profileImage'];
			imagestr = imagestr.replace(/['"]+/g, '');
			profilePic = imagestr;
		} else {
			profilePic = DefaultUserPic;
		}
		console.log('fields=>', this.state.fields);
		return (
			<div class="edit">
				<Form onSubmit={this.onSubmit}>
					<Row>
						<Col>
							<div className="img-e" style={{ borderRadius: '50%' }}>
								<Cropper
									style={{ borderRadius: '100px' }}
									name="profileImage"
									image={this.state.imageSrc}
									crop={this.state.crop}
									zoom={this.state.zoom}
									aspect={this.state.aspect}
									onCropChange={this.onCropChange}
									onCropComplete={this.onCropComplete}
									onZoomChange={this.onZoomChange}
								/>
								<div className="controls">
									<Slider
										value={this.state.zoom}
										min={1}
										max={5}
										step={0.1}
										aria-labelledby="Zoom"
										onChange={(e, zoom) => this.onZoomChange(zoom)}
										classes={{ container: 'slider' }}
									/>
								</div>
							</div>
						</Col>
						<Col>
							<ImageUploader
								style={{ width: 50, height: 50, borderRadius: '300px' }}
								withIcon={false}
								// withPreview={true}
								label=""
								buttonText=""
								onChange={this.onDrop}
								className="img-e"
								imgExtension={[ '.jpg', '.gif', '.png', '.gif', '.svg' ]}
								maxFileSize={1048576}
								fileSizeError=" file size is too big"
							/>
						</Col>
						{/* <Col>
						<img src={profilePic} className="img-e" alt="profils pic" />
					</Col> */}
					</Row>
					<br />
					<br />
					<br />
					<br />
					<br />
					{/* <h6 class="labeltexte">عکس پروفایل</h6>
					<Form.Control
						type="file"
						accept="image/png , image/jpg , image/jpeg, image/gif, image/jpeg"
						name="profileImage"
						onChange={this.changeProfileImage}
					/> */}

					<Row>
						<Col>
							<div className="form-group" className="atext">
								<h1 className="atext">نام</h1>
								<input
									style={{ width: 450, height: 52 }}
									type="text"
									size="lg"
									className={
										isError.firstname.length > 0 ? 'is-invalid form-control' : 'form-control'
									}
									name="firstname"
									defaultValue={this.state.fields['firstname']}
									onChange={this.formValChange}
								/>
								{isError.firstname.length > 0 && (
									<span className="invalid-feedback" className="atexter">
										{isError.firstname}
									</span>
								)}
							</div>
						</Col>
						<Col>
							<div className="form-group" className="atext">
								<label className="atext2">جنسیت</label>
								<br />
								<br />
								<Row>
									<Col>
										<label class="radio-inline" className="atextgen">
											<input
												style={{ fontSize: '30' }}
												type="radio"
												name="gender"
												value="Male"
												isChecked={this.state.fields['gender'] === 'Male'}
												checked
											/>{' '}
											مرد
										</label>
									</Col>
									<Col>
										<label class="radio-inline" className="atextgen">
											<input
												type="radio"
												name="gender"
												value="Female"
												isChecked={this.state.fields['gender'] === 'Female'}
											/>{' '}
											زن
										</label>
									</Col>
								</Row>
							</div>
						</Col>
					</Row>
					<Row>
						<Col>
							<div className="form-group" className="atext">
								<h1 className="atext">نام خانوادگی</h1>
								<input
									type="text"
									style={{ width: 450, height: 52 }}
									size="lg"
									className={isError.lastname.length > 0 ? 'is-invalid form-control' : 'form-control'}
									name="lastname"
									defaultValue={this.state.fields['lastname']}
									onChange={this.formValChange}
								/>
								{isError.lastname.length > 0 && (
									<span className="invalid-feedback" className="atexter">
										{isError.lastname}
									</span>
								)}
							</div>
						</Col>
						<Col>
							<Col xs="6">
								<div className="form-group" className="atext">
									<label className="atext2">استان</label>
									<br />

									<select
										class="form-control"
										className="atext"
										style={{ width: 450, height: 52 }}
										defaultValue={this.state.province}
									>
										<option value="1">آذربایجان غربی</option>
										<option value="2">اردبیل</option>
										<option value="3">اصفهان</option>
										<option value="4">البرز</option>
										<option value="5">ایلام</option>
										<option value="6">بوشهر</option>
										<option value="7">تهران</option>
										<option value="8">چهارمحال و بختیاری</option>
										<option value="9">خراسان جنوبی</option>
										<option value="10">خراسان رضوی</option>
										<option value="11">خراسان شمالی</option>
										<option value="12">خوزستان</option>
										<option value="13">زنجان</option>
										<option value="14">سمنان</option>
										<option value="15">سیستان و بلوچستان</option>
										<option value="16">فارس</option>
										<option value="17">قزوین</option>
										<option value="18">قم</option>
										<option value="19">کردستان</option>
										<option value="20">کرمانشاه</option>
										<option value="21">کرمان</option>
										<option value="22">کهکیلویه و بویراحمد</option>
										<option value="23">گلستان</option>
										<option value="24">گیلان</option>
										<option value="25">لرستان</option>
										<option value="26">مازندران</option>
										<option value="27">هرمزگان</option>
										<option value="28">مرکزی</option>
										<option value="29">همدان</option>
										<option value="30">یزد</option>
									</select>
								</div>
							</Col>
						</Col>
					</Row>
					<Row>
						<Col>
							{' '}
							<div className="form-group" className="atext">
								<h1 className="atext">نام کاربری</h1>
								<input
									type="text"
									style={{ width: 450, height: 52 }}
									size="lg"
									className={
										isError.username.u1.length > 0 || isError.username.u2.length > 0 ? (
											'is-invalid form-control'
										) : (
											'form-control'
										)
									}
									name="username"
									defaultValue={this.state.fields['username']}
									onChange={this.formValChange}
								/>
								{isError.username.u1.length > 0 && (
									<span className="invalid-feedback" className="atexter">
										{isError.username.u1}
									</span>
								)}
								{isError.username.u2.length > 0 && (
									<span className="invalid-feedback" className="atexter">
										{isError.username.u2}
									</span>
								)}
							</div>
						</Col>
						<Col>
							<div className="form-group" className="atext">
								<h1 className="atext">تاریخ تولد</h1>
								<input
									type="date"
									style={{ width: 450, height: 52 }}
									size="lg"
									name="birthdate"
									className="form-control"
									defaultValue={this.state.birthdate}
									onChange={this.onChangeEvent}
								/>
							</div>
						</Col>
					</Row>
					<Row>
						<Col>
							<div className="form-group" className="atext">
								<h1 className="atext">درباره</h1>
								<input
									type="text"
									style={{ width: 450, height: 52 }}
									size="lg"
									className="form-control"
									name="bio"
									defaultValue={this.state.fields['bio']}
									onChange={this.formValChange}
								/>
							</div>
						</Col>
						<Col>
							<div className="form-group" className="atext">
								<h1 className="atext">شماره همراه</h1>
								<input
									type="text"
									style={{ width: 450, height: 52 }}
									size="lg"
									className={isError.phone.length > 0 ? 'is-invalid form-control' : 'form-control'}
									name="phone"
									placeholder="0919-999-9999"
									defaultValue={this.state.fields['phone']}
									onChange={this.formValChange}
								/>
								{isError.phone.length > 0 && (
									<span className="invalid-feedback" className="atexter">
										{isError.phone}
									</span>
								)}
							</div>
						</Col>
					</Row>
					<div className="form-group" className="atext2">
						<h1 />
						ژانر مورد علاقه
						<br /> <br />
						<Row>
							<Col>
								<div class="box1" className="checkbox-inline">
									<input
										type="checkbox"
										id="clothing"
										onChange={(e) => this.handleChange(e, 'داستانی')}
									/>
									<label for="clothing" class="check-box" />
									<h4 className="atext" style={{ fontSize: 22 }}>
										داستانی
									</h4>
								</div>
							</Col>{' '}
							<Col>
								<div class="box1" className="checkbox-inline">
									<input
										type="checkbox"
										id="equipment"
										onChange={(e) => this.handleChange(e, 'اجتماعی')}
									/>
									<label for="equipment" class="check-box" />
									<h4 className="atext" style={{ fontSize: 22 }}>
										اجتماعی
									</h4>
								</div>
							</Col>{' '}
							<Col>
								<div class="box1" className="checkbox-inline">
									<input
										type="checkbox"
										id="trips"
										onChange={(e) => this.handleChange(e, 'روانشناسی')}
									/>
									<label for="trips" class="check-box" />
									<h4 className="atext" style={{ fontSize: 22 }}>
										روانشناسی
									</h4>
								</div>
							</Col>{' '}
						</Row>
						<Row>
							<Col>
								<div class="box1" className="checkbox-inline">
									<input
										type="checkbox"
										id="social"
										onChange={(e) => this.handleChange(e, 'تاریخی')}
									/>
									<label for="social" class="check-box" />
									<h4 className="atext" style={{ fontSize: 22 }}>
										تاریخی
									</h4>
								</div>
							</Col>{' '}
							<Col>
								<div className="checkbox-inline">
									<input type="checkbox" id="profile" onChange={(e) => this.handleChange(e, 'هنر')} />
									<label for="profile" class="check-box" />
									<h4 className="atext" style={{ fontSize: 22 }}>
										هنر
									</h4>
								</div>
							</Col>
							<Col>
								<div className="checkbox-inline">
									<input
										type="checkbox"
										id="profile"
										onChange={(e) => this.handleChange(e, 'علمی')}
									/>
									<label for="profile" class="check-box" />
									<h4 className="atext" style={{ fontSize: 22 }}>
										علمی
									</h4>
								</div>
							</Col>
						</Row>
					</div>
					{/* <Row>
						<div className="form-group" className="atext2">
							<h1 />
							ژانر مورد علاقه
							<br /> <br />
							<Row className="atext">
								<Col>
									<label className="atext" className="checkbox-inline">
										<input
											type="checkbox"
											defaultChecked={this.state.isstory}
											onChange={(e) => this.handleChange(e, 'داستانی')}
										/>{' '}
										داستانی{' '}
									</label>
								</Col>
								<Col>
									<label class="checkbox-inline" className="atext">
										<input
											type="checkbox"
											defaultChecked={this.state.issocial}
											onChange={(e) => this.handleChange(e, 'اجتماعی')}
										/>{' '}
										اجتماعی
									</label>
								</Col>
								<Col>
									<label class="checkbox-inline" className="atext">
										<input
											type="checkbox"
											defaultChecked={this.state.ispsychology}
											onChange={(e) => this.handleChange(e, 'روانشناسی')}
										/>{' '}
										روانشناسی
									</label>
								</Col>
							</Row>
							<Row>
								<Col>
									<label class="checkbox-inline" className="atext">
										<input
											type="checkbox"
											defaultChecked={this.state.ishistoric}
											onChange={(e) => this.handleChange(e, 'تاریخی')}
										/>{' '}
										تاریخی{' '}
									</label>
								</Col>
								<Col>
									<label class="checkbox-inline" className="atext">
										<input
											type="checkbox"
											defaultChecked={this.state.isarty}
											onChange={(e) => this.handleChange(e, 'هنر')}
										/>{' '}
										هنر{' '}
									</label>
								</Col>

								<Col>
									<label class="checkbox-inline" className="atext">
										<input
											type="checkbox"
											onChange={(e) => this.handleChange(e, 'فنی و مهندسی')}
										/>{' '}
										فنی و مهندسی{' '}
									</label>
								</Col>
							</Row>
						</div>
					</Row> */}
					<Row>
						<Button variant="primary" size="lg" className="buttone" onClick={this.UpdateProfileHandler}>
							<label className="sabt">ثبت</label>
						</Button>
						<br />
						<br />
						<br />
					</Row>
				</Form>
			</div>
		);
	}
}

export default Edit;
