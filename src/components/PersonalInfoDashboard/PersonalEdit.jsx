import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import classNames from "classnames";
import { HeaderDashboard, CardEdit, Input, Radio, NumberInput } from "../";

import axios from "axios";

import { CloseOutlined, CaretDownOutlined } from "@ant-design/icons";
import { useAuth } from "../../contexts/AuthContexts";

const PersonalEdit = () => {
	const navigate = useNavigate();

	const { users, setUsers, updateProfileInfo } = useAuth();

	const [selectedValue, setSelectedValue] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	const [position, setPosition] = useState("");

	const [isChanged, setIsChanged] = useState(false);
	const [isFilled, setIsFilled] = useState(false);

	const [initialValues, setInitialValues] = useState("");
	const [currentValues, setCurrentValues] = useState("");

	const [isBookable, setIsBookable] = useState(true);

	useEffect(() => {
		async function fetchUserData() {
			try {
				if (users?.id) {
					const response = await axios.get(
						`http://localhost:3306/api/profile/${users?.id}`,
					);
					console.log(
						`URL: http://localhost:3306/api/profile/${users?.id}`,
						response.status,
						response.statusText,
					); // Проверьте статус и текст ответа
					if (response.status !== 200) {
						console.error("Server error:", response.statusText);
						return;
					}
					const data = response.data;
					setIsBookable(data.is_bookable === 1);
					setInitialValues({
						firstName: data.first_name,
						lastName: data.last_name,
						selectedValue: data.gender,
						email: data.email,
						phone: data.phone,
						position: data.position,
						is_bookable: data.is_bookable === 1,
					});
				}
			} catch (error) {
				console.error("Error fetching user data:", error);
			}
		}

		fetchUserData();
	}, [users?.id]);

	useEffect(() => {
		setIsBookable(users?.is_bookable === 1);
		setInitialValues({
			firstName: users?.first_name || "",
			lastName: users?.last_name || "",
			selectedValue: users?.gender || "",
			email: users?.email || "",
			phone: users?.phone || "",
			position: users?.position || "",
			is_bookable: users?.is_bookable === 1,
		});
		setCurrentValues({
			firstName: users?.first_name || "",
			lastName: users?.last_name || "",
			selectedValue: users?.gender || "",
			email: users?.email || "",
			phone: users?.phone || "",
			position: users?.position || "",
			is_bookable: users?.is_bookable === 1,
		});
	}, [users]);

	const handleChange = event => {
		const { name, value } = event.target;
		setCurrentValues(prevValues => ({
			...prevValues,
			[name]: value,
		}));
	};

	useEffect(() => {
		console.log("useEffect triggered");
		let changed = false;
		let filled = true;
		for (let key in initialValues) {
			if (initialValues[key] !== currentValues[key]) {
				changed = true;
			}
			if (!currentValues[key]) {
				filled = false;
			}
		}
		setIsChanged(changed);
		setIsFilled(filled);

		console.log("isChanged:", isChanged);
		console.log("isFilled:", isFilled);
	}, [initialValues, currentValues]);

	const handleSubmit = async event => {
		event.preventDefault();

		try {
			// Собираем данные из состояния
			const profileData = {
				gender: currentValues.selectedValue,
				first_name: currentValues.firstName,
				last_name: currentValues.lastName,
				email: currentValues.email,
				phone: currentValues.phone,
				position: currentValues.position,
				is_bookable: currentValues.is_bookable ? 1 : 0,
			};

			// Отправляем данные на сервер
			console.log(profileData);
			const response = await axios.put(
				`http://localhost:3306/api/profile/${users?.id}`,
				profileData,
			);

			// Обновляем информацию профиля пользователя
			updateProfileInfo(profileData);

			console.log("Profile updated successfully:", response.data);
		} catch (error) {
			console.error("Error updating profile:", error);
		}
	};

	const handleToggleBookable = checked => {
		setIsBookable(checked);
		setCurrentValues(prevValues => ({
			...prevValues,
			is_bookable: checked, // Обновляем значение в currentValues
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
						<div>
							<form
								className='grid grid-cols-1 gap-4 items-start'
								onSubmit={handleSubmit}>
								<CardEdit
									general='Общая информация'
									switcher={{
										checked: isBookable,
										onChange: handleToggleBookable,
									}}
									cardEdit>
									<div className='ab-info'>
										<div className='ab-info__label'>
											<span className='ab-description'>Пол</span>
										</div>
										<span className='ab-flow'>
											<span className='ab-flow__wrap'>
												<Radio
													type='radio'
													name='gender'
													id='input-31'
													value={currentValues.selectedValue}
													prefix='Мужской'
													checked={selectedValue === "male"}
													onChange={handleChange}
												/>
												<Radio
													type='radio'
													name='gender'
													id='input-32'
													value={currentValues.selectedValue}
													prefix='Женский'
													checked={selectedValue === "famale"}
													onChange={handleChange}
												/>
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
								<CardEdit />
								<CardEdit />
								<div
									className={classNames("eb-model-edit__panel", {
										"show-bottom-enter-active show-bottom-enter": isChanged,
										"show-bottom-leave-active show-bottom-leave-to": !isChanged,
									})}
									style={isChanged ? {} : { display: "none" }}>
									<button
										type='button'
										className='ab-button eb-model-edit__button eb-model-edit__button--mobile md:hidden ab-button_md color-default theme-ghost'></button>
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
			</div>
		</>
	);
};

export default PersonalEdit;
