import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useEmployeeData from "../../hooks/useEmployeeData";
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

const EmployeesEdit = () => {
	const navigate = useNavigate();
	const { employees, error } = useEmployeeData();

	const [isChanged, setIsChanged] = useState(false);
	const [isFilled, setIsFilled] = useState(false);
	const [initialValues, setInitialValues] = useState({});
	const [currentValues, setCurrentValues] = useState({});
	const [isBookable, setIsBookable] = useState(true);

	useEffect(() => {
		async function fetchEmployeeData() {
			try {
				if (employees?.id) {
					// Добавляем проверку наличия employee и его id
					const response = await axios.get(
						`https://api.aqua-book.ru/api/employees/${employees.id}`,
					);
					if (response.status !== 200) {
						console.error("Server error:", response.statusText);
						return;
					}
					const employees = response.employees;
					setIsBookable(employees.is_bookable);
					setInitialValues({
						firstName: employees.first_name,
						lastName: employees.last_name,
						selectedValue: employees.gender,
						email: employees.email,
						access: employees.access,
						phone: employees.phone,
						position: employees.position,
						description: employees.description,
						is_bookable: employees.is_bookable,
					});
					setCurrentValues({
						firstName: employees.first_name,
						lastName: employees.last_name,
						selectedValue: employees.gender,
						email: employees.email,
						access: employees.access,
						phone: employees.phone,
						position: employees.position,
						description: employees.description,
						is_bookable: employees.is_bookable,
					});
				} else {
					console.error("Employee ID is undefined or employee is not defined");
				}
			} catch (error) {
				console.error("Error fetching employee data:", error);
			}
		}

		fetchEmployeeData();
	}, []);

	// Handle changes in form fields
	const handleChange = event => {
		const { name, value } = event.target;
		if (name === "gender") {
			setCurrentValues(prevValues => ({
				...prevValues,
				selectedValue: value,
			}));
		} else {
			setCurrentValues(prevValues => ({
				...prevValues,
				[name]: value,
			}));
		}
	};

	// Monitor changes in form values
	useEffect(() => {
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
	}, [initialValues, currentValues]);

	// Handle form submission
	const handleSubmit = async event => {
		event.preventDefault();
		try {
			const employeeData = {
				gender: currentValues.selectedValue,
				first_name: currentValues.firstName,
				last_name: currentValues.lastName,
				email: currentValues.email,
				phone: currentValues.phone,
				access: currentValues.access,
				position: currentValues.position,
				description: currentValues.description,
				is_bookable: currentValues.is_bookable,
			};

			if (!employees?.id) {
				console.error("Employee ID is undefined");
				return;
			}

			const response = await axios.put(
				`https://api.aqua-book.ru/api/employees/${employees.id}`,
				employeeData,
			);
			console.log("Employee updated successfully:", response.data);
		} catch (error) {
			console.error("Error updating employee:", error);
		}
	};

	// Handle bookable toggle
	const handleToggleBookable = checked => {
		setIsBookable(checked ? 1 : 0);
		setCurrentValues(prevValues => ({
			...prevValues,
			is_bookable: checked ? 1 : 0,
		}));
	};

	// Handle cancel action
	const handleCancel = () => {
		navigate(-1);
	};

	return (
		<>
			<HeaderDashboard showBack titleEmployee />
			<div className='ab-page__content'>
				<div className='container-small'>
					<div className='eb-model-edit'>
						<div>
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
													name='gender'
													value='male'
													checked={currentValues.selectedValue === "male"}
													onChange={handleChange}
												/>
												<Radio
													type='radio'
													name='gender'
													value='female'
													checked={currentValues.selectedValue === "female"}
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
										required
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
										required
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
								<CardEdit />
								<CardEdit />
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
			</div>
		</>
	);
};

export default EmployeesEdit;
