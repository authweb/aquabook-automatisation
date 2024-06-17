import React, { useState } from "react";
import HeaderBooking from "../../HomePage/Header/HeaderBooking";
import "../../../scss/modal.scss";
import DatePicker from "../Calendar/DatePicker";
import ServiceDetails from "./ServiceDetails";
import BottomPanel from "./BottomPanel";

const AppointmentClient = ({
	styleCss,
	selectedServices,
	onPrevStep,
	onNextStep,
	totalMinPrice,
	totalMaxPrice,
	formatDuration,
}) => {
	const [showModal, setShowModal] = useState(false);
	const [selectedDate, setSelectedDate] = useState(new Date());
	const [selectedTime, setSelectedTime] = useState(null);

	const openModal = () => {
		setShowModal(true);
	};

	const closeModal = (e) => {
		if (!e || e.target === e.currentTarget) {
			setShowModal(false);
		}
	};

	const modalClasses = showModal ? "showed" : ""; // Добавляем класс showed при showModal === true

	// Фильтруем выбранные услуги, чтобы оставить только те, у которых есть максимальная цена или цена "от"
	const servicesWithMaxPrice = selectedServices.filter(
		service =>
			parseFloat(service.price_to) > 0 || parseFloat(service.price_to) === 0,
	);

	return (
		<>
			<div className='create-record-container' style={styleCss}>
				<ServiceDetails
					servicesWithMaxPrice={servicesWithMaxPrice}
					selectedServices={selectedServices}
				/>
			</div>
			<BottomPanel
				totalMinPrice={totalMinPrice}
				totalMaxPrice={totalMaxPrice}
				formatDuration={formatDuration}
				selectedDate={selectedDate}
				selectedTime={selectedTime}
				openModal={openModal}
				onNextStep={onNextStep}
				closeModal={closeModal}
			/>
			<page-modal-outlet>
				{showModal && (
					<page-modal class={`dirty ${modalClasses}`} style={{ height: "100%" }}>
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
								<page-select-time>
									<DatePicker
										selectedDate={selectedDate}
										setSelectedDate={setSelectedDate}
										selectedTime={selectedTime}
										setSelectedTime={setSelectedTime}
										onCloseModal={closeModal}
									/>
								</page-select-time>
							</div>
						</div>
					</page-modal>
				)}
			</page-modal-outlet>
		</>
	);
};

export default AppointmentClient;
