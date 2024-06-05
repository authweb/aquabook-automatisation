import React, { useRef, useEffect, useState, useContext } from "react";
import { ReactComponent as Close } from "../../assets/images/close.svg";
import Select from "./FormComponents/Select";
import { Link } from "react-router-dom";
import Input from "./FormComponents/Input";
import { ReactComponent as ServiceSvg } from "../../assets/images/service.svg";
import { ReactComponent as EmployeeSvg } from "../../assets/images/employee.svg";
import { CalendarContext } from "../../contexts/CalendarContexts";
import { NumberInput } from "..";

const Aside = ({
	title,
	closeAside,
	isAsideOpen,
	action,
	done,
	onAddService,
	onSelectEmployeeForService,
}) => {
	const asideRef = useRef();
	const { selectedEmployeeId } = useContext(CalendarContext);
	const [services, setServices] = useState([]);
	const [employees, setEmployees] = useState([]);
	const [clients, setClients] = useState([]);
	const [selectedService, setSelectedService] = useState(null);
	const [selectedEmployee, setSelectedEmployee] = useState(null);
	const [formValues, setFormValues] = useState({
		name: '',
		priceFrom: '',
		priceTo: '',
		duration: '',
		firstName: '',
		lastName: '',
		phone: '',
		email: '',
	});

	const fetchData = async (url, setState) => {
		try {
			const response = await fetch(url);
			if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
			const data = await response.json();
			setState(data);
		} catch (error) {
			console.error(`Error fetching data from ${url}:`, error);
		}
	};

	useEffect(() => {
		fetchData('https://api.aqua-book.ru/api/services', (data) => {
			const servicesArray = Object.values(data.services).flat();
			const filteredServices = servicesArray.filter(service => service.tags === 1);
			setServices(filteredServices);
		});
		fetchData('https://api.aqua-book.ru/api/employees', (data) => setEmployees(data.employees));
		fetchData('https://api.aqua-book.ru/api/clients', (data) => setClients(data.clients));
	}, []);

	useEffect(() => {
		if (selectedEmployeeId && selectedService) {
			const employeeData = employees.find((employee) => employee.id === selectedEmployeeId);
			setSelectedEmployee(employeeData ? { [selectedService.id]: employeeData } : {});
		}
	}, [employees, selectedEmployeeId, selectedService]);

	useEffect(() => {
		setFormValues((prevValues) => ({
			...prevValues,
			name: services[0]?.name || '',
			priceFrom: services[0]?.price_from || '',
			priceTo: services[0]?.price_to || '',
			duration: services[0]?.duration || '',
			firstName: clients[0]?.first_name || '',
			lastName: clients[0]?.last_name || '',
			phone: clients[0]?.phone || '',
			email: clients[0]?.email || '',
		}));
	}, [services, clients]);


	useEffect(() => {
		const handleClickOutside = (event) => {
			if (asideRef.current && !asideRef.current.contains(event.target)) {
				closeAside();
			}
		};
		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, [closeAside]);

	const handleServiceSelect = (service) => {
		setSelectedService(service);
		setFormValues({
			...formValues,
			name: service.name,
			priceFrom: service.price_from,
			priceTo: service.price_to,
			duration: service.duration,
		});
	};

	const handleSelectEmployee = (employee) => {
		console.log('Выбранный сотрудник:', employee);
		setSelectedEmployee(employee);
		if (selectedService) {
			console.log('Передача данных в onSelectEmployeeForService:', selectedService.id, employee);
			onSelectEmployeeForService(selectedService.id, employee);
		}
	};

	const handleCreateClient = async () => {
		const newClient = {
			first_name: formValues.firstName,
			last_name: formValues.lastName,
			phone: formValues.phone,
			email: formValues.email,
		};

		try {
			const response = await fetch('https://api.aqua-book.ru/api/clients', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(newClient),
			});

			if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

			const result = await response.json();
			setClients((prevClients) => [...prevClients, result.newClient]);
			resetFormValues();
			closeAside();
		} catch (error) {
			console.error('Error adding client:', error);
		}
	};

	const resetFormValues = () => {
		setFormValues({
			name: '',
			priceFrom: '',
			priceTo: '',
			duration: '',
			firstName: '',
			lastName: '',
			phone: '',
			email: '',
		});
	};

	const validateFormValues = () => {
		const { firstName, lastName, phone, email } = formValues;
		return firstName && lastName && phone && email;
	};

	// Use effect to watch for state updates
	useEffect(() => {
		if (selectedEmployee && selectedService) {
			console.log('State updated with selected employee and service:', selectedService, selectedEmployee);
		}
	}, [selectedEmployee, selectedService]);

	const handleSubmit = () => {
		if (action === "addService") {
			handleAddService();
		} else if (action === "createClient") {
			if (!validateFormValues()) {
				console.error("Заполните все поля");
				return;
			}
			handleCreateClient();
		}
	};

	const handleAddService = () => {
		if (selectedService) {
			const serviceWithEmployee = selectedEmployee ? { ...selectedService, employee: selectedEmployee, employeeName: selectedEmployee.first_name } : { ...selectedService, employee: null, employeeName: "Не выбран" };
			console.log('Service to be added:', serviceWithEmployee);
			onAddService(serviceWithEmployee);
			closeAside();
		} else {
			console.error("No service selected.");
		}
	};

	return (
		<aside
			ref={asideRef}
			role='dialog'
			aria-hidden={!isAsideOpen}
			aria-label='Добавить услугу'
			className={`ab-modal is-overlay-aside ${isAsideOpen
				? "modal-transition-overlay-aside-enter-active modal-transition-overlay-aside-enter-to"
				: "modal-transition-overlay-aside-leave-active modal-transition-overlay-aside-leave-to"
				}`}
		>
			<div className='ab-modal__container'>
				<div role='document' className='ab-modal__dialog'>
					<div className='ab-modal__header flex justify-space'>
						<div className='ab-modal__title '>{title}</div>
						<button
							type='button'
							title='Закрыть'
							aria-label='Закрыть'
							tabIndex='0'
							className='ab-button ab-button_md color-default theme-ghost ab-modal__close'
							onClick={closeAside}
						>
							<span className='ab-button__overlay'></span>
							<span
								tabIndex='-1'
								className='ab-button__content ab-button__content_md p-2'
							>
								<Close className='ab-icon ab-icon--size-text' />
							</span>
						</button>
					</div>
					<div className='ab-modal__body'>
						<div className='ab-modal__content ab-modal__content--buttons'>
							{action === "addService" && (
								<div className='grid grid-cols-1 gap-6 items-start'>
									<Select
										id="66"
										options={services}
										renderOption={(service) => (
											<>
												<span className='block whitespace-normal ml-3'>
													{service.name}
													<span className='block text-xs text-mono-400'>
														{service.duration} мин. • {service.price_from} ₽
													</span>
												</span>
											</>
										)}
										getDisplayValue={(service) => service.name}
										filterFunction={(service, searchTerm) =>
											service.name.toLowerCase().includes(searchTerm.toLowerCase())
										}
										prefixSvg={
											<ServiceSvg
												className='ab-icon icon sprite-eyw text-mono-600 eb-island-icon__icon ab-icon--size-text'
												style={{ width: "30px", height: "30px" }}
											/>
										}
										onSelect={handleServiceSelect}
										inputTitle='Услуга'
										description={
											<>
												Для создания и редактирования услуг перейдите в раздел
												«<Link to='settings/services'>Услуги</Link>».
											</>
										}
									/>
									{selectedService && (
										<>
											<Input
												type='tel'
												name='priceFrom'
												autoComplete='priceFrom'
												value={formValues.priceFrom}
												onChange={(e) =>
													setFormValues({
														...formValues,
														priceFrom: e.target.value,
													})
												}
												prefix='Цена'
												id='45'
											/>
											<Input
												type='text'
												name='duration'
												autoComplete='duration'
												value={formValues.duration}
												onChange={(e) =>
													setFormValues({
														...formValues,
														duration: e.target.value,
													})
												}
												prefix='Длительность'
												id='46'
											/>
											<Select
												id="67"
												options={employees}
												renderOption={(employee) => (
													<>
														<span className="block whitespace-normal ml-3">
															{employee.first_name}
															<span className="block text-xs text-mono-400">
																{employee.position}
															</span>
														</span>
													</>
												)}
												prefixSvg={
													<EmployeeSvg
														className="ab-icon icon sprite-eyw text-mono-600 eb-island-icon__icon ab-icon--size-text"
														style={{ width: "30px", height: "30px" }}
													/>
												}
												getDisplayValue={(employee) => employee.first_name}
												filterFunction={(employee, searchTerm) =>
													employee.first_name.toLowerCase().includes(searchTerm.toLowerCase())
												}
												selectedValue={selectedEmployee?.[selectedService?.id] || null}
												onSelect={handleSelectEmployee}
												inputTitle="Сотрудник"
											/>
										</>
									)}
								</div>
							)}
							{action === "createClient" && (
								<div className='grid grid-cols-1 gap-4 items-start'>
									<Input
										type='text'
										name='firstName'
										autoComplete='firstName'
										prefix='Имя'
										id="48"
										value={formValues.firstName}
										onChange={(e) =>
											setFormValues({
												...formValues,
												firstName: e.target.value,
											})
										}
									/>
									<Input
										type='text'
										name='lastName'
										autoComplete='lastName'
										prefix='Фамилия'
										id="49"
										value={formValues.lastName}
										onChange={(e) =>
											setFormValues({
												...formValues,
												lastName: e.target.value,
											})
										}
									/>
									<NumberInput
										name='phone'
										autoComplete='phone'
										prefix='Телефон'
										id='55'
										value={formValues.phone}
										onChange={(e) =>
											setFormValues({
												...formValues,
												phone: e.target.value,
											})
										}
									/>
									<Input
										type='email'
										name='email'
										autoComplete='email'
										prefix='Email'
										value={formValues.email}
										onChange={(e) =>
											setFormValues({
												...formValues,
												email: e.target.value,
											})
										}
									/>
								</div>
							)}
						</div>
					</div>
					<div className='ab-modal__buttons ab-button-group'>
						<div className='ab-modal-buttons ab-modal-buttons--desktop'>
							<button
								type='button'
								onClick={handleSubmit}
								className='ab-button mt-2 w-full ab-button--size-lg ab-button--theme-solid ab-button--color-accent ab-button--with-text ab-button--icon-highlighted ab-animated-icon-parent ab-button--color-accent'
							>
								<span className='ab-button__icon-wrapper ab-button__icon-wrapper--left ab-button__icon-wrapper--placeholder'></span>
								<span className='ab-button__text'>{done}</span>
								<span className='ab-button__icon-wrapper ab-button__icon-wrapper--left ab-button__icon-wrapper--placeholder'></span>
							</button>
						</div>
					</div>
				</div>
			</div>
		</aside>
	);
};

export default Aside;