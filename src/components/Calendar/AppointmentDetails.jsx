import React, { useEffect, useState, useContext } from "react";
import axios from "axios";

import dayjs from "dayjs";

import { ReactComponent as TimeIcon } from "../../assets/images/time-icon.svg";
import { Tag } from "antd";
import TextArea from "../Common/FormComponents/TextArea";

import { CalendarContext } from "../../contexts/CalendarContexts";
import HeaderDashboard from "../Common/HeaderDashboard";
import { ReactComponent as ServiceIcon } from "../../assets/images/service.svg";
import { ReactComponent as UserSvg } from "../../assets/images/tag-user.svg";
import CardEdit from "../Common/CardEdit";
import Aside from "../Common/Aside";

const AppointmentDetails = () => {
	const { currentEventId } = useContext(CalendarContext);
	const [appointment, setAppointment] = useState(null);
	const [client, setClient] = useState(null);
	const [isPaid, setIsPaid] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [isLoadingAppointment, setIsLoadingAppointment] = useState(true); // Загрузка данных о встрече
	const [isLoadingClient, setIsLoadingClient] = useState(true); // Загрузка данных о клиенте

	useEffect(() => {
		const fetchEventData = async () => {
			if (!currentEventId) return; // Не выполняем запрос, если нет ID
			setIsLoadingAppointment(true);
			try {
				const response = await axios.get(
					`https://api.aqua-book.ru/api/appointments/${currentEventId}`,
				);
				setAppointment(response.data.appointment);
				setIsPaid(response.data.appointment.is_paid);
			} catch (error) {
				console.error("Ошибка при получении данных события:", error);
			} finally {
				setIsLoadingAppointment(false);
			}
		};

		fetchEventData();
	}, [currentEventId]);

	useEffect(() => {
		const fetchClientData = async () => {
			if (!appointment?.clients_id) {
				setIsLoadingClient(false);
				return; // Не выполняем запрос, если нет ID клиента
			}
			setIsLoadingClient(true);
			try {
				const response = await axios.get(
					`https://api.aqua-book.ru/api/clients/${appointment.clients_id}`,
				);
				setClient(response.data.client);
			} catch (error) {
				console.error("Ошибка при получении данных клиента:", error);
			} finally {
				setIsLoadingClient(false);
			}
		};

		fetchClientData();
	}, [appointment]);

	useEffect(() => {
		document.title = `AquaBook - Запись #${currentEventId}`;
	}, [currentEventId]);

	useEffect(() => {
		if (appointment && appointment.clients_id) {
			const fetchClientData = async () => {
				try {
					const response = await axios.get(
						`https://api.aqua-book.ru/api/clients/${appointment.clients_id}`,
					);
					setClient(response.data.client); // Устанавливаем данные клиента в состояние
				} catch (error) {
					console.error("Ошибка при получении данных клиента:", error);
					// Обработка ошибок
				}
			};

			fetchClientData();
		}
	}, [appointment]);

	if (isLoadingAppointment || isLoadingClient) {
		return <div style={{ color: "#fff" }}>Загрузка...</div>;
	}

	if (!appointment || !client) {
		return <div style={{ color: "#fff" }}>Данные не найдены.</div>;
	}

	const {
		start,
		end,
		selectedServices,
		serviceEmployeeMap,
		text,
		clients_id,
		totalCost,
	} = appointment;

	const formattedStart = dayjs(start).format("HH:mm");
	const formattedStartDate = dayjs(start).format("dd, DD MMM YYYY HH:mm");
	const formattedEnd = dayjs(end).format("HH:mm");

	const handlePayment = async () => {
		try {
			const response = await axios.post(
				`https://api.aqua-book.ru/api/appointments/${currentEventId}/pay`,
			);
			alert(response.data.message);
			setIsPaid(true); // Обновление состояния статуса оплаты
		} catch (error) {
			console.error("Ошибка при оплате:", error);
		}
	};

	return (
		<>
			<div className='ab-page'>
				<HeaderDashboard
					showBack
					title={`Запись #${currentEventId}`}
					containerSmall
				/>
				<div className='ab-page__content'>
					<div className='container-small'>
						<div className='grid grid-cols-1 gap-8 items-start'>
							<div className='ab-card eb-services-island'>
								<h4 className='ab-sub-headline'>Услуги</h4>
								<span className='ab-badge inline-flex items-center ml-2 inline align-baseline'>
									<span
										className='ab-badge__text px-2'
										style={{
											backgroundColor: `rgba(var(--c-mono-800-rgb), var(--bg-opacity, 1))`,
											color: `rgba(var(--c-on-mono-800-rgb), var(--text-opacity, 1))`,
										}}>
										1
									</span>
								</span>
								<div className='eb-services-island__item'>
									<div className='eb-services-island__service'>
										<div className='flex items-center w-full w-max-full'>
											<div
												className='eb-island-icon mr-4 flex-shrink-0 rounded-lg'
												style={{ width: "50px", height: "50px" }}>
												<ServiceIcon className='ab-icon icon sprite-eyw text-mono-600 eb-island-icon__icon ab-icon--size-text' />
											</div>
											<div className='flex-grow pr-4 overflow-hidden'>
												{selectedServices}
												<div className='flex items-center flex-wrap gap-x-4 gap-y-2 text-xs mt-1'>
													<div className='whitespace-no-wrap'>
														{formattedStart} - {formattedEnd}
													</div>
													<div className='opacity-50 whitespace-no-wrap'>
														30 мин.
													</div>
													<div>
														<div className='eb-user-avatar eb-user-avatar--single-row'>
															<span className='eb-user-avatar__title'>
																{serviceEmployeeMap}
															</span>
														</div>
													</div>
												</div>
											</div>
											<div className='flex-shrink-0'>
												<strong className='whitespace-no-wrap'>
													{totalCost} ₽
												</strong>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className='ab-card'>
								<UserSvg
									className='ab-icon icon sprite-eyw text-mono-600 eb-island-icon__icon ab-icon--size-text'
									style={{ width: "30px", height: "30px" }}
								/>
								{client.first_name +
									" " +
									client.last_name +
									" " +
									client.phone}
							</div>
						</div>
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
								<dd>{totalCost} ₽</dd>
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
									<button className='ab-sub-headline'>
										{formattedStartDate}
									</button>
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
								{text}
							</div>
						</div>
					</div>
				</div>
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
									onClick={handlePayment}>
									<span className='eb-button__text'>
										{isPaid ? "Оплачено" : "Оплата"}
									</span>
								</button>
							</div>
						</div>
					</div>
				</div>

				{/* <CalendarNavigator /> */}
			</div>
		</>
	);
};

export default AppointmentDetails;
