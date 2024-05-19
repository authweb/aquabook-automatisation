import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContexts";
import { Link, useNavigate } from "react-router-dom";

import "../../scss/profile.scss";

const CarInfoForm = () => {
	const navigate = useNavigate();
	const { clients, updateCarInfo } = useAuth();
	const [carNumber, setCarNumber] = useState("");
	const [carMake, setCarMake] = useState("");
	const [carModel, setCarModel] = useState("");
	const [carType, setCarType] = useState("");

	const handleSubmit = async e => {
		e.preventDefault();

		try {
			// Отправляем данные на сервер
			const response = await axios.post(
				"http://api.aqua-book.ru/api/updatecarinfo",
				{
					clients_id: clients.id,
					car_number: carNumber,
					car_make: carMake,
					car_model: carModel,
					car_type: carType,
				},
			);

			// Обновляем информацию о машине клиента
			updateCarInfo({
				clients_id: clients.id,
				car_number: carNumber,
				car_make: carMake,
				car_model: carModel,
				car_type: carType,
			});

			// Очищаем поля формы
			setCarNumber("");
			setCarMake("");
			setCarModel("");
			setCarType("");

			console.log("Car info updated:", response.data.carInfo);
		} catch (error) {
			console.error("Error updating car info:", error);
		}
	};

	return (
		<form className='carInfo' onSubmit={handleSubmit}>
			<div className='carInfo__flex'>
				<label className='carInfo__flex__inputcol'>
					Номер машины:
					<input
						className='carInfo__flex__inputcol-input'
						type='text'
						id='car_number'
						name='car_number'
						value={carNumber}
						onChange={e => setCarNumber(e.target.value)}
					/>
				</label>
				<label className='carInfo__flex__inputcol'>
					Марка машины:
					<input
						className='carInfo__flex__inputcol-input'
						type='text'
						id='car_make'
						name='car_make'
						value={carMake}
						onChange={e => setCarMake(e.target.value)}
					/>
				</label>
				<label className='carInfo__flex__inputcol'>
					Модель машины:
					<input
						className='carInfo__flex__inputcol-input'
						type='text'
						id='car_model'
						name='car_model'
						value={carModel}
						onChange={e => setCarModel(e.target.value)}
					/>
				</label>
				<label className='carInfo__flex__inputcol'>
					Тип машины:
					<input
						className='carInfo__flex__inputcol-input'
						type='text'
						id='car_type'
						name='car_type'
						value={carType}
						onChange={e => setCarType(e.target.value)}
					/>
				</label>
				<button
					className='carInfo__flex__inputcol updateCarInfo'
					type='submit'
					onClick={() => navigate(-1)}>
					Сохранить
				</button>
				<Link
					className='carInfo__flex__inputcol cancelCarInfo'
					onClick={() => navigate(-1)}>
					Отменить
				</Link>
			</div>
		</form>
	);
};

export default CarInfoForm;
