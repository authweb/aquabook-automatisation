import React, { useEffect, useState } from "react";
import ProfileButton from "../../Common/FormComponents/ProfileButton";
import ServiceItem from "../../Common/ServiceItem";
import useServiceCalculations from "../../../hooks/useServiceCalculations";
import HeaderBooking from "../../HomePage/Header/HeaderBooking";

import "../../../scss/modal.scss";
import DatePicker from "../Calendar/DatePicker";

const AppointmentClient = ({
	styleCss,
	selectedServices,
	onPrevStep,
	onNextStep,
}) => {
	const [showModal, setShowModal] = useState(false);

	const openModal = () => {
		setShowModal(true);
	};

	const closeModal = e => {
		if (e.target === e.currentTarget) {
			setShowModal(false);
		}
		setShowModal(false);
	};

	const modalClasses = showModal ? "dirty showed" : "dirty"; // Добавляем класс showed при showModal === true

	// Используем хук для вычисления результатов на основе выбранных услуг
	const { totalMinPrice, totalMaxPrice, formatDuration, calculateServices } =
		useServiceCalculations(selectedServices);

	// Вызываем функцию calculateServices хука при изменении selectedServices
	useEffect(() => {
		calculateServices();
	}, [selectedServices]);

	// Фильтруем выбранные услуги, чтобы оставить только те, у которых есть максимальная цена или цена "от"
	const servicesWithMaxPrice = selectedServices.filter(
		service =>
			parseFloat(service.price_to) > 0 || parseFloat(service.price_to) === 0,
	);

	return (
		<>
			<div className='create-record-container' style={styleCss}>
				<page-substrate class='substrate'>
					<page-record-card>
						<div className='master-wrapper'></div>
						<page-horizontal-line class='horizontal-line'></page-horizontal-line>
						<div className='services'>
							<page-ordered-services-list class='services-list'>
								{Array.isArray(servicesWithMaxPrice) &&
									servicesWithMaxPrice.map((service, index) => (
										<ServiceItem key={index} selectedServices={service} />
									))}
							</page-ordered-services-list>
						</div>
					</page-record-card>
				</page-substrate>
			</div>
			<page-bottom-panel>
				<div className='time-and-price'>
					{/* Выполняем условие для отображения цены "от" */}
					<p className='price'>{`${totalMinPrice} ${
						totalMaxPrice === 0 ? "от" : "-"
					} ${totalMaxPrice} ₽`}</p>
					<p className='time'>от {formatDuration()}</p>
				</div>
				<ProfileButton
					title='Выбрать дату и время'
					locator='select_date_time_btn'
					onOpenModal={openModal}
				/>
			</page-bottom-panel>
			<page-modal-outlet>
				{showModal && (
					<div
						className={`page-modal ${modalClasses}`}
						style={{ height: "100%" }}>
						<div className='background-modal' onClick={closeModal}></div>
						<div className='modal'>
							<div className='window-header'>
								<div className='swipe-area with-page-header'>
									<div className='swipe-anchor'></div>
								</div>
								<HeaderBooking
									handlePrevStep={closeModal}
									title='Выбрать дату и время'
								/>
							</div>
							<div className='modal-body'>
								<router-outlet></router-outlet>
								<app-select-time>
									<DatePicker />
								</app-select-time>
							</div>
						</div>
					</div>
				)}
			</page-modal-outlet>
		</>
	);
};

export default AppointmentClient;
