import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
import { CalendarContext } from "../../contexts/CalendarContexts";
import HeaderDashboard from "../Common/HeaderDashboard";
import { ReactComponent as TimeIcon } from "../../assets/images/time-icon.svg";
import { ReactComponent as ServiceIcon } from "../../assets/images/service.svg";
import { ReactComponent as UserSvg } from "../../assets/images/tag-user.svg";
import { Tag } from "antd";
import TextArea from "../Common/FormComponents/TextArea";

const AppointmentDetails = () => {
	const { currentEventId } = useContext(CalendarContext);
	const [appointment, setAppointment] = useState(null);
	const [client, setClient] = useState(null);
	const [isPaid, setIsPaid] = useState(null);
	const [isLoadingAppointment, setIsLoadingAppointment] = useState(true);
	const [isLoadingClient, setIsLoadingClient] = useState(true);

	useEffect(() => {
		const fetchEventData = async () => {
			if (!currentEventId) return;
			setIsLoadingAppointment(true);
			try {
				const response = await axios.get(`https://api.aqua-book.ru/api/appointments/${currentEventId}`);
				const appointmentData = response.data;
				setAppointment(appointmentData.appointment);
				setIsPaid(appointmentData.appointment.is_paid);
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
				return;
			}
			setIsLoadingClient(true);
			try {
				const response = await axios.get(`https://api.aqua-book.ru/api/clients/${appointment.clients_id}`);
				const clientData = response.data;
				setClient(clientData.client);
			} catch (error) {
				console.error("Ошибка при получении данных клиента:", error);
			} finally {
				setIsLoadingClient(false);
			}
		};

		if (appointment) {
			fetchClientData();
		}
	}, [appointment]);

	useEffect(() => {
		document.title = `AquaBook - Запись #${currentEventId}`;
	}, [currentEventId]);

	if (isLoadingAppointment || isLoadingClient) {
		return <div style={{ color: "#fff" }}>Загрузка...</div>;
	}

	if (!appointment || !client) {
		return <div style={{ color: "#fff" }}>Данные не найдены.</div>;
	}

	const { start, end, servicesEmployees, text, totalCost } = appointment;
	const formattedStart = dayjs(start).format("HH:mm");
	const formattedStartDate = dayjs(start).format("dd, DD MMM YYYY HH:mm");
	const formattedEnd = dayjs(end).format("HH:mm");

	const handlePayment = async () => {
		try {
			const response = await axios.post(`https://api.aqua-book.ru/api/appointments/${currentEventId}/pay`);
			alert(response.data.message);
			setIsPaid(true);
		} catch (error) {
			console.error("Ошибка при оплате:", error);
		}
	};

	const handleCommentChange = (e) => {
		const { value } = e.target;
		setAppointment(prevState => ({
			...prevState,
			text: value
		}));
	};

	return (
		<>
			<div className='ab-page'>
				<HeaderDashboard showBack title={`Запись #${currentEventId}`} containerSmall />
				<div className='ab-page__content'>
					<div className='container-small'>
						<div className='grid grid-cols-1 gap-8 items-start'>
							<div className='ab-card eb-services-island'>
								<h4 className='ab-sub-headline'>Услуги</h4>
								<span className='ab-badge inline-flex items-center ml-2 inline align-baseline'>
									<span className='ab-badge__text px-2' style={{ backgroundColor: `rgba(var(--c-mono-800-rgb), var(--bg-opacity, 1))`, color: `rgba(var(--c-on-mono-800-rgb), var(--text-opacity, 1))` }}>
										{servicesEmployees.length}
									</span>
								</span>
								{servicesEmployees.map(service => (
									<div className='eb-services-island__item'>
										<div className='eb-services-island__service'>
											<div className='flex items-center w-full w-max-full'>
												<div className='eb-island-icon mr-4 flex-shrink-0 rounded-lg' style={{ width: "50px", height: "50px" }}>
													<ServiceIcon className='ab-icon icon sprite-eyw text-mono-600 eb-island-icon__icon ab-icon--size-text' />
												</div>
												<div className='flex-grow pr-4 overflow-hidden'>
													<p>{service.service_name}</p>
													<div className='flex items-center flex-wrap gap-x-4 gap-y-2 text-xs mt-1'>
														<div className='whitespace-no-wrap'>
															{formattedStart} - {formattedEnd}
														</div>
														<div className='opacity-50 whitespace-no-wrap'>
															{service.duration}
														</div>
														<div>
															<div className='eb-user-avatar eb-user-avatar--single-row'>
																<span className='eb-user-avatar__title'>
																	{service.employee_first_name}
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
								))}
							</div>

							<div className='ab-card'>
								<UserSvg className='ab-icon icon sprite-eyw text-mono-600 eb-island-icon__icon ab-icon--size-text' style={{ width: "30px", height: "30px" }} />
								{client.first_name + " " + client.last_name + " " + client.phone}
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
							<div className='eb-booking-complete__card bg-mono-900 eb-booking-complete__card--default' style={{ textAlign: "center", borderRadius: "0.625rem" }}>
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
												<Tag color='orange' className='relative inline-flex items-center leading-5 px-2 rounded-lg'>
													Редактирование записи
												</Tag>
											</div>
										</div>
									</button>
								</span>
							</div>
						</div>
						<div>
							<div className='lg:mb-auto grid grid-cols-1 gap-6 items-start'>
								<TextArea name='comment' prefix='Комментарий' value={text} onChange={handleCommentChange} />
							</div>
						</div>
					</div>
				</div>
				<div className='eb-page-aside__buttons'>
					<div className='ab-model-edit'>
						<div className='ab-model-edit__panel'>
							<div className='ab-modal-buttons ab-modal-buttons--desktop'>
								<button className='ab-button mt-2 w-full ab-button--size-lg ab-button--theme-solid ab-button--color-accent ab-button--with-text ab-button--icon-highlighted ab-animated-icon-parent ab-button--color-accent' onClick={handlePayment}>
									<span className='ab-button__icon-wrapper ab-button__icon-wrapper--left ab-button__icon-wrapper--placeholder'></span>
									<span className='eb-button__text'>
										{isPaid ? "Оплачено" : "Оплата"}
									</span>
									<span className='ab-button__icon-wrapper ab-button__icon-wrapper--left ab-button__icon-wrapper--placeholder'></span>
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default AppointmentDetails;
