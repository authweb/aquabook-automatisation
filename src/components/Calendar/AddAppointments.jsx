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

const AddAppointments = ({
	service,
	setService,
	categories,
	setCategories,
	services,
	setServices,
	onAddAppointment,
}) => {
	const location = useLocation();
	const navigate = useNavigate();
	const queryParams = new URLSearchParams(location.search);
	const endString = queryParams.get("end");
	const [startDate, setStartDate] = useState(
		dayjs(queryParams.get("end"), "YYYY-MM-DDTHH:mm:ss"),
	);
	const endDate = dayjs(endString, "YYYY-MM-DDTHH:mm:ss");
	const [initialStartDate, setInitialStartDate] = useState(
		dayjs(queryParams.get("end"), "YYYY-MM-DDTHH:mm:ss"),
	);
	const formattedStart = initialStartDate.format("dd, DD MMM YYYY HH:mm");
	const [activeButton, setActiveButton] = useState(null);
	const [isAsideOpen, setIsAsideOpen] = useState(false);
	const [selectedServices, setSelectedServices] = useState([]);
	const [serviceEmployeeMap, setServiceEmployeeMap] = useState(new Map());
	const [selectedClient, setSelectedClient] = useState(null);
	const [endAppointmentTime, setEndAppointmentTime] = useState(startDate);
	const [tempIdMap, setTempIdMap] = useState(new Map());
	const [serviceIdCounter, setServiceIdCounter] = useState(0);
	const [currentValues, setCurrentValues] = useState({ cost: 0 });
	const [errors, setErrors] = useState([]);

	useEffect(() => {
		const totalCost = selectedServices.reduce(
			(total, service) => total + Number(service.price_from),
			0,
		);
		setCurrentValues({ cost: totalCost });
	}, [selectedServices]);

	// Функция для добавления услуги
	const addService = (service, tempId) => {
		const newServiceId = serviceIdCounter;
		setServiceIdCounter(prevId => prevId + 1);
		console.log(tempId);
		const serviceEndTime = dayjs(endAppointmentTime).add(
			service.duration,
			"minute",
		);
		const serviceWithTimeAndId = {
			...service,
			id: tempId,
			startTime: startDate.format("HH:mm"),
			endTime: serviceEndTime.format("HH:mm"),
		};

		setTempIdMap(prevMap => {
			const tempIdMap = new Map(prevMap);
			tempIdMap.set(tempId, newServiceId);
			return tempIdMap;
		});
		setSelectedServices(prevServices => [
			...prevServices,
			serviceWithTimeAndId,
		]);
		if (serviceEndTime.isAfter(endAppointmentTime)) {
			setEndAppointmentTime(serviceEndTime);
		}
	};

	const addAppointment = async () => {
		if (!selectedClient || !selectedClient.id || currentValues.cost <= 0) {
			const errorMessages = [];
			if (!selectedClient || !selectedClient.id) {
				errorMessages.push("Необходимо выбрать клиента.");
			}
			if (currentValues.cost <= 0) {
				errorMessages.push("Общая стоимость должна быть больше нуля.");
			}
			setErrors(errorMessages);
			return;
		}

		const clientInfo = `${selectedClient.first_name} ${selectedClient.last_name} ${selectedClient.phone}`;
		const serviceEmployeeMapArr = Array.from(serviceEmployeeMap.entries()).map(
			([service_id, employee]) => ({
				service_id,
				employee_id: employee.id,
			}),
		);

		// Logging data before sending
		console.log("selectedServices:", selectedServices);
		console.log("serviceEmployeeMapArr:", serviceEmployeeMapArr);

		try {
			const selectedServicesString = selectedServices
				.map(service => service.name)
				.join(", ");

			// Преобразуем serviceEmployeeMap в объект перед отправкой на сервер
			const serviceEmployeeMapObj = Object.fromEntries(serviceEmployeeMap);

			const appointmentText = `Выбранные услуги:${selectedServicesString}Клиент: ${clientInfo}
    Сумма: ${currentValues.cost} руб.
`;
			const newEvent = {
				start: startDate.format("YYYY-MM-DD HH:mm:ss"),
				end: endAppointmentTime.format("YYYY-MM-DD HH:mm:ss"),
				selectedServices: selectedServicesString,
				serviceEmployeeMap: serviceEmployeeMapObj,
				text: appointmentText,
				totalCost: currentValues.cost,
				clients_id: selectedClient.id,
			};

			// Logging data before sending
			console.log("Data to be sent:", newEvent);

			const response = await axios.post(
				"https://api.aqua-book.ru/api/appointments",
				newEvent,
			);
			if (response.data.errors) {
				setErrors(response.data.errors);
			} else {
				setSelectedServices([]);
				setServiceEmployeeMap(new Map());
				navigate(-1);
				setErrors([]);
			}
		} catch (error) {
			let errorMessages = [];
			if (error.response) {
				// Server responded with a status other than 2xx
				console.error("Error response:", error.response);
				errorMessages = error.response.data.errors || [
					error.response.data.message,
				];
			} else if (error.request) {
				// Request was made but no response received
				console.error("Error request:", error.request);
				errorMessages = ["No response was received from the server"];
			} else {
				// Something else happened while setting up the request
				console.error("Error setting up request:", error.message);
				errorMessages = ["An error occurred while setting up the request"];
			}
			setErrors(errorMessages);
			console.error("Error during POST request:", error);
		}
	};

	// Функция для выбора сотрудника для услуги
	const handleSelectEmployeeForService = (newServiceId, employee) => {
		setServiceEmployeeMap(prevMap => {
			const updatedMap = new Map(prevMap);
			updatedMap.set(newServiceId, employee);
			return updatedMap;
		});
	};

	useEffect(() => {
		console.log("Обновленный tempIdMap:", tempIdMap);
	}, [tempIdMap]);

	const openAside = (asideName, action) => {
		setActiveButton({ name: asideName, action: action });
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
								ButtonName='Добавить услугу'
								serviceEmployeeMap={serviceEmployeeMap}
								onButtonClick={() =>
									openAside("service", "addService")
								}></CardEdit>
							<CardEdit
								title='Клиент'
								setActiveButton={setActiveButton}
								cardClient
								selectedClient={selectedClient}
								onClientSelect={setSelectedClient}
								ButtonName='Создать нового'
								onButtonClick={() =>
									openAside("client", "createClient")
								}></CardEdit>
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
													<span className='ab-button__text'>
														Создать запись
													</span>
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
								isAsideOpen={isAsideOpen}
								action={activeButton.action}
								onAddService={addService} // Передаем функцию addService в Aside
								onSelectEmployeeForService={handleSelectEmployeeForService} // Передаем функцию handleSelectEmployeeForService в Aside
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
