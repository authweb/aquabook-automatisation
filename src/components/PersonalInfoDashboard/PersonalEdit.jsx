import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import classNames from "classnames";
import {
	HeaderDashboard,
	CardEdit,
	Input,
	Radio,
	NumberInput,
	TextArea,
} from "../";
import axios from "axios";
import { CloseOutlined, CaretDownOutlined } from "@ant-design/icons";
import { useAuth } from "../../contexts/AuthContexts";

const PersonalEdit = () => {
	const navigate = useNavigate();
	const { users, updateProfileInfo } = useAuth();

	const [isChanged, setIsChanged] = useState(false);
	const [initialValues, setInitialValues] = useState({
		firstName: "",
		lastName: "",
		selectedValue: "",
		email: "",
		phone: "",
		position: "",
		description: "",
		is_bookable: false,
	});
	const [currentValues, setCurrentValues] = useState({
		firstName: "",
		lastName: "",
		selectedValue: "",
		email: "",
		phone: "",
		position: "",
		description: "",
		is_bookable: false,
	});
	const [isBookable, setIsBookable] = useState(false);

	const fetchUserData = async (userId) => {
		try {
			const response = await axios.get(`https://api.aqua-book.ru/api/profile/${userId}`);
			if (response.status === 200) {
				const data = response.data.users;
				setIsBookable(data.is_bookable === 1);
				setInitialValues({
					firstName: data.first_name || "",
					lastName: data.last_name || "",
					selectedValue: data.gender || "",
					email: data.email || "",
					phone: data.phone || "",
					position: data.position || "",
					description: data.description || "",
					is_bookable: data.is_bookable,
				});
				setCurrentValues({
					firstName: data.first_name || "",
					lastName: data.last_name || "",
					selectedValue: data.gender || "",
					email: data.email || "",
					phone: data.phone || "",
					position: data.position || "",
					description: data.description || "",
					is_bookable: data.is_bookable,
				});
			} else {
				console.error("Server error:", response.statusText);
			}
		} catch (error) {
			console.error("Error fetching user data:", error);
		}
	};

	useEffect(() => {
		if (users?.id) {
			fetchUserData(users.id);
		}
	}, [users?.id]);

	useEffect(() => {
		if (initialValues && currentValues) {
			let changed = false;

			for (let key in initialValues) {
				if (initialValues[key] !== currentValues[key]) {
					changed = true;
				}
			}

			setIsChanged(changed);
		}
	}, [initialValues, currentValues]);

	const handleChange = event => {
		const { name, value } = event.target;
		setCurrentValues(prevValues => ({
			...prevValues,
			[name]: value,
		}));
	};

	const handleSubmit = async event => {
		event.preventDefault();

		const profileData = {
			first_name: currentValues.firstName,
			last_name: currentValues.lastName,
			email: currentValues.email,
			phone: currentValues.phone,
			position: currentValues.position,
			description: currentValues.description,
			gender: currentValues.selectedValue,
			is_bookable: isBookable ? 1 : 0,
		};

		console.log("Submitting profile data:", profileData); // Отладочный вывод данных перед отправкой

		try {
			const response = await axios.put(`https://api.aqua-book.ru/api/profile/${users?.id}`, profileData);
			if (response.status === 200) {
				updateProfileInfo(profileData);
				console.log("Profile updated successfully:", response.data);
			} else {
				console.error("Error updating profile:", response.statusText);
			}
		} catch (error) {
			console.error("Error updating profile:", error);
		}
	};

	const handleToggleBookable = checked => {
		setIsBookable(checked);
		setCurrentValues(prevValues => ({
			...prevValues,
			is_bookable: checked ? 1 : 0,
		}));
	};

	const handleCancel = () => {
		navigate(-1);
	};

	return (
		<>
			<HeaderDashboard showBack titleProfile containerSmall />
			<div className='ab-page__content'>
				<div className='container-small'>
					<div className='eb-model-edit'>
						<form
							className='grid grid-cols-1 gap-4 items-start'
							onSubmit={handleSubmit}>
							<CardEdit
								cardEdit
								general='Общая информация'
								switcher={{
									checked: isBookable,
									onChange: handleToggleBookable,
								}}>
								<div className='ab-info'>
									<div className='ab-info__label'>
										<span className='ab-description'>Пол</span>
									</div>
									<span className='ab-flow'>
										<span className='ab-flow__wrap'>
											<Radio
												type='radio'
												name='selectedValue'
												value='male'
												checked={currentValues.selectedValue === "male"}
												onChange={handleChange}
												prefix="Мужской"
											>
											</Radio>
											<Radio
												type='radio'
												name='selectedValue'
												value='female'
												checked={currentValues.selectedValue === "female"}
												onChange={handleChange}
												prefix="Женский"
											>
											</Radio>
										</span>
									</span>
								</div>
								<Input
									type='text'
									name='firstName'
									autoComplete='firstName'
									value={currentValues.firstName}
									required='required'
									id='input-35'
									prefix='Имя'
									onChange={handleChange}
								/>
								<Input
									type='text'
									name='lastName'
									autoComplete='lastName'
									value={currentValues.lastName}
									id='input-36'
									prefix='Фамилия'
									onChange={handleChange}
								/>
								<Input
									type='email'
									name='email'
									autoComplete='email'
									value={currentValues.email}
									id='input-37'
									prefix='Email'
									onChange={handleChange}
								/>
								<NumberInput
									type='tel'
									name='phone'
									autoComplete='tel'
									value={currentValues.phone}
									required='required'
									id='input-38'
									prefix='Телефон'
									onChange={handleChange}
								/>
								<Input
									type='text'
									name='position'
									autoComplete='position'
									value={currentValues.position}
									id='input-39'
									prefix='Должность'
									onChange={handleChange}
								/>
								<TextArea
									type='text'
									name='description'
									autoComplete='description'
									value={currentValues.description}
									id='textarea-40'
									prefix='Описание'
									onChange={handleChange}
								/>
								<div className='ab-select'>
									<div className='ab-select__input-wrap'>
										<Input
											type='text'
											placeholder='Администратор'
											createPlaceholder='Создайте новый отдел'
											autoComplete='off'
											id='input-46'
											prefix='Отдел'
											iconGroup
											iconOne={<CloseOutlined />}
											iconTwo={<CaretDownOutlined />}
											onChange={handleChange}
										/>
									</div>
								</div>
							</CardEdit>
							<div
								className={classNames("eb-model-edit__panel", {
									"show-bottom-enter-active show-bottom-enter": isChanged,
									"show-bottom-leave-active show-bottom-leave-to": !isChanged,
								})}
								style={isChanged ? {} : { display: "none" }}>
								<button
									type='submit'
									className='ab-button eb-model-edit__button ml-2 md:ml-0 ab-button_md color-accent theme-solid'>
									<span className='ab-button__overlay'></span>
									<span className='ab-button__content ab-button__content_md'>
										<span className='ab-button__text'>Сохранить</span>
									</span>
								</button>
								<button
									type='button'
									onClick={handleCancel}
									className='ab-button eb-model-edit__button hidden md:block ml-4 ab-button_md color-default theme-ghost'>
									<span className='ab-button__overlay'></span>
									<span className='ab-button__content ab-button__content_md'>
										<span className='ab-button__text'>Отмена</span>
									</span>
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</>
	);
};

export default PersonalEdit;
