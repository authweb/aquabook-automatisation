import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
	const { id } = useParams();
	const navigate = useNavigate();
	const { employees, error } = useEmployeeData();

	const [isChanged, setIsChanged] = useState(false);
	const [isFilled, setIsFilled] = useState(false);
	const [initialValues, setInitialValues] = useState({});
	const [currentValues, setCurrentValues] = useState({});
	const [isBookable, setIsBookable] = useState(false);

	const fetchEmployeeData = async (employeeId) => {
		try {
			const response = await axios.get(`https://api.aqua-book.ru/api/employees/${employeeId}`);
			if (response.status !== 200) {
				console.error("Server error:", response.statusText);
				return;
			}
			const employee = response.data.employee;
			setIsBookable(employee.is_bookable === 1);
			setInitialValues({
				firstName: employee.first_name || "",
				lastName: employee.last_name || "",
				selectedValue: employee.gender || "",
				email: employee.email || "",
				access: employee.access || "",
				phone: employee.phone || "",
				position: employee.position || "",
				description: employee.description || "",
				is_bookable: employee.is_bookable,
			});
			setCurrentValues({
				firstName: employee.first_name || "",
				lastName: employee.last_name || "",
				selectedValue: employee.gender || "",
				email: employee.email || "",
				access: employee.access || "",
				phone: employee.phone || "",
				position: employee.position || "",
				description: employee.description || "",
				is_bookable: employee.is_bookable,
			});
		} catch (error) {
			console.error("Error fetching employee data:", error);
		}
	};

	useEffect(() => {
		if (id) {
			fetchEmployeeData(id);
		}
	}, [id]);

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

			if (!id) {
				console.error("Employee ID is undefined");
				return;
			}

			const response = await axios.put(
				`https://api.aqua-book.ru/api/employees/${id}`,
				employeeData,
			);
			console.log("Employee updated successfully:", response.data);
			navigate(`/dashboard/employees/${id}`);
		} catch (error) {
			console.error("Error updating employee:", error);
		}
	};

	const handleToggleBookable = checked => {
		setIsBookable(checked ? 1 : 0);
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
