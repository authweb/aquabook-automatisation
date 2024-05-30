import React, { useState, useEffect } from "react";
import HeaderDashboard from "../Common/HeaderDashboard";
import CardEdit from "../Common/CardEdit";
import { useLocation, useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import axios from "axios";
import { Layout, Tag } from "antd";
import Aside from "../Common/Aside";
import { ReactComponent as TimeIcon } from "../../assets/images/time-icon.svg";
import TextArea from "../Common/FormComponents/TextArea";

const AddAppointments = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const queryParams = new URLSearchParams(location.search);
	const endString = queryParams.get("end");
	const [startDate, setStartDate] = useState(dayjs(endString, "YYYY-MM-DDTHH:mm:ss"));
	const endDate = dayjs(endString, "YYYY-MM-DDTHH:mm:ss");
	const [initialStartDate, setInitialStartDate] = useState(startDate);
	const formattedStart = initialStartDate.format("dd, DD MMM YYYY HH:mm");
	const [activeButton, setActiveButton] = useState(null);
	const [isAsideOpen, setIsAsideOpen] = useState(false);
	const [selectedServices, setSelectedServices] = useState([]);
	const [selectedClient, setSelectedClient] = useState(null);
	const [endAppointmentTime, setEndAppointmentTime] = useState(startDate);
	const [currentValues, setCurrentValues] = useState({ cost: 0 });
	const [errors, setErrors] = useState([]);

	useEffect(() => {
		const totalCost = selectedServices.reduce((total, service) => total + Number(service.price_from), 0);
		setCurrentValues({ cost: totalCost });
	}, [selectedServices]);

	const addService = (service) => {
		const serviceEndTime = dayjs(endAppointmentTime).add(service.duration, "minute");
		const serviceWithTimeAndId = {
			...service,
			startTime: startDate.format("HH:mm"),
			endTime: serviceEndTime.format("HH:mm"),
			employee: service.employee ? service.employee.id : "Не выбран" // Здесь мы добавляем проверку и значение по умолчанию
		};

		setSelectedServices(prevServices => {
			const updatedServices = [...prevServices, serviceWithTimeAndId];
			console.log('Updated services after adding:', updatedServices);
			return updatedServices;
		});

		if (serviceEndTime.isAfter(endAppointmentTime)) {
			setEndAppointmentTime(serviceEndTime);
		}
	};


	const handleSelectEmployeeForService = (serviceId, employee) => {
		console.log(`Выбор сотрудника для услуги с ID: ${serviceId}`);
		console.log('Выбранный сотрудник:', employee.id);

		setSelectedServices(prevServices => {
			const updatedServices = prevServices.map(service => {
				if (service.id === serviceId) {
					const updatedService = { ...service, employee: employee || { first_name: "Не выбран" } };
					console.log('Обновленная услуга:', updatedService);
					return updatedService;
				}
				return service;
			});

			console.log('Обновленный список услуг:', updatedServices);
			return updatedServices;
		});
	};

	const validateAppointment = () => {
		const errorMessages = [];
		if (!selectedClient || !selectedClient.id) errorMessages.push("Необходимо выбрать клиента.");
		if (selectedServices.length === 0) errorMessages.push("Необходимо добавить хотя бы одну услугу.");
		if (currentValues.cost <= 0) errorMessages.push("Общая стоимость должна быть больше нуля.");
		setErrors(errorMessages);
		return errorMessages.length === 0;
	};

	const addAppointment = async () => {
		if (!validateAppointment()) return;

		const clientInfo = `${selectedClient.first_name} ${selectedClient.last_name} ${selectedClient.phone}`;
		const servicesInfo = selectedServices.map(service => service.name).join(", ");
		const appointmentText = `Выбранные услуги: ${servicesInfo} Клиент: ${clientInfo} Сумма: ${currentValues.cost} руб.`;

		const newEvent = {
			start: startDate.format("YYYY-MM-DD HH:mm:ss"),
			end: endAppointmentTime.format("YYYY-MM-DD HH:mm:ss"),
			selectedServices: selectedServices.map(service => ({
				id: service.service, // Здесь используйте поле service, а не id
				name: service.name,
				employee: service.employee ? service.employee : null,
			})),
			text: appointmentText,
			totalCost: currentValues.cost,
			clients_id: selectedClient.id,
		};

		try {
			const response = await axios.post("https://api.aqua-book.ru/api/appointments", newEvent);

			if (response.data.errors) {
				setErrors(response.data.errors);
			} else {
				setSelectedServices([]);
				navigate(-1);
				setErrors([]);
			}
		} catch (error) {
			const errorMessages = [];
			if (error.response) {
				errorMessages.push(...(error.response.data.errors || [error.response.data.message]));
			} else if (error.request) {
				errorMessages.push("Ответа от сервера получено не было");
			} else {
				errorMessages.push("При настройке запроса произошла ошибка");
			}
			setErrors(errorMessages);
		}
	};

	const openAside = (asideName, action) => {
		setActiveButton({ name: asideName, action });
		setIsAsideOpen(true);
	};

	const closeAside = () => {
		setActiveButton(null);
		setIsAsideOpen(false);
	};

	return (
		<>
			<div className='ab-page'>
				<HeaderDashboard showBack title='Новая запись' containerSmall />
				<div className='ab-page__content'>
					<div className='container-small'>
						<div className='grid grid-cols-1 gap-8 items-start'>
							<CardEdit
								title='Услуга'
								setActiveButton={setActiveButton}
								cardCalendar
								setSelectedServices={setSelectedServices}
								selectedServices={selectedServices}
								onSelectEmployeeForService={handleSelectEmployeeForService}
								ButtonName='Добавить услугу'
								onButtonClick={() => openAside("service", "addService")}
							/>
							<CardEdit
								title='Клиент'
								setActiveButton={setActiveButton}
								cardClient
								selectedClient={selectedClient}
								onClientSelect={setSelectedClient}
								ButtonName='Создать нового'
								onButtonClick={() =>
									openAside("client", "createClient")
								} />
							<CardEdit cardInvoice currentValues={currentValues.cost} />
							{selectedServices.length > 0 && (
								<div className='ab-invoice eb-page-aside__buttons'>
									<div className='ab-model-edit'>
										<div className='ab-model-edit__panel'>
											<div className='ab-modal-buttons ab-modal-buttons--desktop'>
												<button
													className='ab-button mt-2 w-full ab-button--size-lg ab-button--theme-solid ab-button--color-accent ab-button--with-text ab-button--icon-highlighted ab-animated-icon-parent ab-button--color-accent'
													onClick={addAppointment}>
													<span className='ab-button__icon-wrapper ab-button__icon-wrapper--left ab-button__icon-wrapper--placeholder'></span>
													<span className='ab-button__text'>Создать запись</span>
													<span className='ab-button__icon-wrapper ab-button__icon-wrapper--left ab-button__icon-wrapper--placeholder'></span>
												</button>
											</div>
										</div>
									</div>
								</div>
							)}
						</div>
						{activeButton && activeButton.name === "service" && (
							<Aside
								title='Добавить услугу'
								closeAside={closeAside}
								onSelectEmployeeForService={handleSelectEmployeeForService}
								isAsideOpen={isAsideOpen}
								action={activeButton.action}
								onAddService={addService}
								done='Добавить'
							/>
						)}
						{activeButton && activeButton.name === "client" && (
							<Aside
								title='Добавить клиента'
								action={activeButton.action}
								closeAside={closeAside}
								isAsideOpen={isAsideOpen}
								done='Создать клиента'
							/>
						)}
					</div>
				</div>
			</div>
			<div className='eb-page-aside__aside'>
				<div className='eb-page-aside__content'>
					<div className='grid grid-cols-1 gap-4 items-start'>
						<div className='eb-booking-invoice'>
							<h3 className='ab-headline'>Итого</h3>
							<dl className='eb-booking-invoice__list'>
								<dt>Сумма к оплате</dt>
								<dd>{currentValues.cost} ₽</dd>
							</dl>
						</div>
						<div className='eb-booking-comlete mb-6'>
							<div
								className='eb-booking-complete__card bg-mono-900 eb-booking-complete__card--default'
								style={{ textAlign: "center", borderRadius: "0.625rem" }}>
								<span className='eb-booking-complete__icon eb-booking-complete__icon--default'>
									<TimeIcon />
								</span>
								<div className='-mt-2'>
									<button className='ab-sub-headline'>{formattedStart}</button>
								</div>
								<span className='ab-chip-select inline-flex text-left'>
									<button className='focus-outline'>
										<div className='pl-1 py-1'>
											<div className='whitespace-no-wrap leading-none relative inline-block rounded-lg bg-surface text-xs'>
												<Tag
													color='cyan'
													className='relative inline-flex items-center leading-5 px-2 rounded-lg'>
													Новая запись
												</Tag>
											</div>
										</div>
									</button>
								</span>
							</div>
						</div>
						<div>
							<div className='lg:mb-auto grid grid-cols-1 gap-6 items-start'>
								<TextArea name='comment' prefix='Комментарий' id='input-55' />
							</div>
						</div>
					</div>
				</div>
				{selectedServices.length > 0 && (
					<div className='eb-page-aside__buttons'>
						<div className='ab-model-edit'>
							<div className='ab-model-edit__panel'>
								<div className='ab-modal-buttons ab-modal-buttons--desktop'>
									<button
										className='ab-button mt-2 w-full ab-button--size-lg ab-button--theme-solid ab-button--color-accent ab-button--with-text ab-button--icon-highlighted ab-animated-icon-parent ab-button--color-accent'
										onClick={addAppointment}>
										<span className='ab-button__icon-wrapper ab-button__icon-wrapper--left ab-button__icon-wrapper--placeholder'></span>
										<span className='ab-button__text'>Создать запись</span>
										<span className='ab-button__icon-wrapper ab-button__icon-wrapper--left ab-button__icon-wrapper--placeholder'></span>
									</button>
								</div>
							</div>
						</div>
					</div>
				)}
				{/* <CalendarNavigator /> */}
			</div>
		</>
	);
};

export default AddAppointments;
