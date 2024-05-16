import React, { useState, useEffect, useCallback } from "react";
import InputMask from "react-input-mask";
import ServiceBasket from "../../Common/FormComponents/ServiceBasket";
import ServiceList from "../../Common/FormComponents/ServiceList";
import HeaderAddition from "../../Common/HeaderAddition";
import { HeaderUser } from "../..";
import HeaderBooking from "../../HomePage/Header/HeaderBooking";
import AppointmentClient from "./AppointmentClient";

const AppointmentForm = ({}) => {
	// Здесь будем хранить состояние формы
	const [formState, setFormState] = useState({
		name: "",
		phone: "",
		email: "",
		employee: "",
		car: "",
		date: "",
		time: "",
		selectedServices: [],
		message: "",
		carNumber: "",
	});

	// Здесь будем хранить текущий шаг формы
	const [step, setStep] = useState(1);
	const [categories, setCategories] = useState([]);
	const [activeCategoryId, setActiveCategoryId] = useState(null);
	// const [checkedState, setCheckedState] = useState({});
	const [selectedServices, setSelectedServices] = useState([]);
	const [isScrolling, setIsScrolling] = useState([]);

	useEffect(() => {
		// Функция для загрузки данных
		async function fetchData() {
			try {
				const categoriesResponse = await fetch(
					"http://aqua-book:3306/api/service-categories",
				);
				const servicesResponse = await fetch(
					"http://aqua-book:3306/api/services",
				);
				const categoriesData = await categoriesResponse.json();
				const servicesData = await servicesResponse.json();

				// Проверка, что ответ сервера содержит данные услуг в ожидаемом формате
				if (
					servicesData.services &&
					typeof servicesData.services === "object"
				) {
					const servicesArray = Object.keys(servicesData.services).reduce(
						(acc, key) => {
							const servicesByCategory = servicesData.services[key].map(
								service => ({
									...service,
									category_id: Number(key),
								}),
							);
							return acc.concat(servicesByCategory);
						},
						[],
					);

					// Добавление услуг в соответствующие категории
					const enrichedCategories = categoriesData.servicesCategories.map(
						category => ({
							...category,
							services: servicesArray.filter(
								service => service.category_id === category.id,
							),
						}),
					);

					setCategories(enrichedCategories);
				} else {
					console.error(
						"Unexpected response structure from services API:",
						servicesData,
					);
				}
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		}
		fetchData();
	}, []);

	const handleInputChange = useCallback(({ target: { name, value } }) => {
		setFormState(prevState => ({ ...prevState, [name]: value }));
	}, []);

	// Функция для обработки выбора категории услуг
	const handleCategorySelect = useCallback(id => {
		setActiveCategoryId(id);
		setIsScrolling(true);
		const categoryElement = document.getElementById(`category-${id}`);
		if (categoryElement) {
			const offset = 100;
			const elementPosition =
				categoryElement.getBoundingClientRect().top +
				window.pageYOffset -
				offset;
			window.scrollTo({ top: elementPosition, behavior: "smooth" });
		} else {
			console.log(`Element with id category-${id} not found`);
		}
		setTimeout(() => setIsScrolling(false), 1000);
	}, []);

	// Функция для выбора или отмены выбора услуги
	const toggleService = useCallback(service => {
		setSelectedServices(prevServices => {
			const isServiceSelected = prevServices.some(s => s.id === service.id);
			const updatedServices = isServiceSelected
				? prevServices.filter(s => s.id !== service.id)
				: [...prevServices, service];

			// Обновляем состояние formState, чтобы отразить выбранные услуги
			setFormState(prevState => ({
				...prevState,
				selectedServices: updatedServices,
			}));

			return updatedServices;
		});
	}, []);

	useEffect(() => {
		console.log("Selected services updated:", selectedServices);
	}, [selectedServices]);

	// Обработчик перехода на следующий шаг
	const handleNextStep = () => {
		// Передаем в selectedServices из formState
		const formDataWithServices = {
			...formState,
			selectedServices: formState.selectedServices,
		};
		console.log("Объединяем данные", formDataWithServices);

		if (step < 4) {
			setStep(step + 1);
		} else {
			console.log("Форма успешно отправлена!");
		}

		console.log("Состояние формы после перехода:", formState);
	};

	// Обработчик перехода на предыдущий шаг
	const handlePrevStep = () => {
		setStep(step - 1);
	};

	// Обработчик отправки формы
	const handleSubmit = e => {
		e.preventDefault();
		// Объединяем данные формы с выбранными услугами
		const formDataWithServices = { ...formState, selectedServices };
		console.log("Отправка формы", formDataWithServices);
	};

	const renderStep = () => {
		switch (step) {
			case 1:
				return (
					<>
						<page-services-page>
							<HeaderUser
								showBack
								title='AquaBook'
								description='Краснодарская 40ж'
								to='profile/'
							/>
							<HeaderAddition
								categories={categories}
								activeCategoryId={activeCategoryId}
								handleCategorySelect={handleCategorySelect}
								chipsSection
								className='chips-wrapper sticky'
							/>
							<div className='content with-horizontal-tags'>
								<ServiceList
									categories={categories}
									selectedServices={selectedServices}
									toggleService={toggleService}
								/>

								{selectedServices.length > 0 && (
									<ServiceBasket
										selectedServices={selectedServices}
										onNextStep={handleNextStep}
									/>
								)}
							</div>
						</page-services-page>
					</>
				);
			case 2:
				return (
					<>
						<page-create-record>
							<page-header-wrapper>
								<HeaderBooking
									title='Ваш заказ'
									handlePrevStep={handlePrevStep}
									className='line-clamp'
								/>
							</page-header-wrapper>
							<AppointmentClient
								styleCss={{ paddingTop: 68 }}
								selectedServices={formState.selectedServices}
								onPrevStep={handlePrevStep}
								onNextStep={handleNextStep}
							/>
						</page-create-record>
					</>
				);
			case 3:
				return <></>;
			case 4:
				return <></>;
			default:
				return null;
		}
	};

	return <>{renderStep()}</>;
};

export default AppointmentForm;
