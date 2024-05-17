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
		// Проверяем, что все необходимые данные выбраны и корректны
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
		// Формирование текста для поля text
		const clientInfo = `${selectedClient.first_name} ${selectedClient.last_name} ${selectedClient.phone}`;
		const servicesInfo = selectedServices
			.map(service => service.name)
			.join(", ");
		const serviceEmployeeMapStr = Array.from(serviceEmployeeMap.entries())
			.map(([, employee]) => `${employee.first_name}`)
			.join(", ");

		const appointmentText = `${clientInfo}, ${servicesInfo}`;

		try {
			const newEvent = {
				start: startDate.format("YYYY-MM-DD HH:mm:ss"),
				end: endAppointmentTime.format("YYYY-MM-DD HH:mm:ss"),
				selectedServices: servicesInfo,
				serviceEmployeeMap: serviceEmployeeMapStr,
				text: appointmentText, // Здесь используется сформированный текст
				totalCost: currentValues.cost,
				clients_id: selectedClient.id,
			};

			console.log(
				"Отправляемое время начала:",
				startDate.format("YYYY-MM-DD HH:mm:ss"),
			);
			console.log(
				"Отправляемое время окончания:",
				endAppointmentTime.format("YYYY-MM-DD HH:mm:ss"),
			);

			const response = await axios.post(
				"http://aqua-book.ru:4000/api/appointments",
				newEvent,
			);

			// Проверка на наличие ошибок в ответе сервера
			if (response.data.errors) {
				setErrors(response.data.errors);
			} else {
				console.log("Server response", response.data);
				navigate(-1);
				setErrors([]); // Очистка ошибок после успешного запроса
				// Дополнительные действия после успешного создания записи
			}
		} catch (error) {
			// Обработка ошибок запроса
			if (error.response) {
				// Ошибка ответа сервера
				setErrors(error.response.data.errors || [error.response.data.message]);
			} else if (error.request) {
				// Запрос был отправлен, но не было ответа
				setErrors(["No response was received"]);
			} else {
				// Ошибка при настройке запроса
				setErrors(["Error setting up request"]);
			}
			console.error("Error", error.message);
		}
	};

	// Функция для выбора сотрудника для услуги
	const handleSelectEmployeeForService = (newServiceId, employee) => {
		setServiceEmployeeMap(prev => {
			const updatedMap = new Map(prev);
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
										className='eb-button ab-modal-buttons__button eb-button--color-accent w-full'
										style={{
											"--btn-bg": "var(--success-color)",
											"--btn-fg": "var(--white-color)",
											"--btn-size": "3.5rem",
											"--btn-radius": "0.625rem",
											"--btn-icon-bg": "0.15",
										}}
										onClick={addAppointment}>
										<span className='eb-button__text'>Создать запись</span>
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
