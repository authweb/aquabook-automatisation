import React, { useState, useEffect, useCallback } from "react";
import InputMask from "react-input-mask";
import ServiceBasket from "../../Common/FormComponents/ServiceBasket";
import ServiceList from "../../Common/FormComponents/ServiceList";
import HeaderAddition from "../../Common/HeaderAddition";
import { HeaderUser } from "../..";
import HeaderBooking from "../../HomePage/Header/HeaderBooking";
import AppointmentClient from "./AppointmentClient";
import useServiceCalculations from "../../../hooks/useServiceCalculations";
import AppointmentsCheckout from "./AppointmentsCheckout";
import { FormProvider, useForm } from "../../../contexts/FormContext";

const AppointmentFormComponent = () => {
	const { formState, setFormState } = useForm();
	const { totalMinPrice, totalMaxPrice, formatDuration, calculateServices } =
		useServiceCalculations(formState.selectedServices);

	useEffect(() => {
		calculateServices();
	}, [formState.selectedServices, calculateServices]);

	const [step, setStep] = useState(1);
	const [categories, setCategories] = useState([]);
	const [activeCategoryId, setActiveCategoryId] = useState(null);
	const [selectedServices, setSelectedServices] = useState([]);
	const [isScrolling, setIsScrolling] = useState([]);

	useEffect(() => {
		async function fetchData() {
			try {
				const categoriesResponse = await fetch(
					"https://api.aqua-book.ru/api/service-categories",
				);
				const servicesResponse = await fetch(
					"https://api.aqua-book.ru/api/services",
				);
				const categoriesData = await categoriesResponse.json();
				const servicesData = await servicesResponse.json();

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
	}, [setFormState]);

	const handleCategorySelect = useCallback(id => {
		setActiveCategoryId(id);
		setIsScrolling(true);
		const categoryElement = document.getElementById(`category-${id}`);
		if (categoryElement) {
			const offset = 100;
			const elementPosition =
				categoryElement.getBoundingClientRect().top +
				window.scrollY - offset;
			window.scrollTo({ top: elementPosition, behavior: "smooth" });
		} else {
			console.log(`Element with id category-${id} not found`);
		}
		setTimeout(() => setIsScrolling(false), 1000);
	}, []);

	const toggleService = useCallback(service => {
		setSelectedServices(prevServices => {
			const isServiceSelected = prevServices.some(s => s.id === service.id);
			const updatedServices = isServiceSelected
				? prevServices.filter(s => s.id !== service.id)
				: [...prevServices, service];

			setFormState(prevState => ({
				...prevState,
				selectedServices: updatedServices,
			}));

			return updatedServices;
		});
	}, [setFormState]);

	useEffect(() => {
		console.log("Selected services updated:", selectedServices);
	}, [selectedServices]);

	const handleNextStep = (date, time) => {
		const formDataWithServices = {
			...formState,
			selectedServices: formState.selectedServices,
			date: date || formState.date,
			time: time || formState.time,
		};

		setFormState(formDataWithServices);
		console.log("Объединяем данные", formDataWithServices);

		if (step < 4) {
			setStep(step + 1);
		} else {
			console.log("Форма успешно отправлена!");
		}

		console.log("Состояние формы после перехода:", formState);
	};

	const handlePrevStep = () => {
		setStep(step - 1);
	};

	const handleSubmit = e => {
		e.preventDefault();
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
								title='AquaBook'
								description='Краснодарская 40ж'
								to='profile/'
							/>
							<HeaderAddition titleSection="Выбрать услугу" className="title-wrapper" />
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
								totalMinPrice={totalMinPrice}
								totalMaxPrice={totalMaxPrice}
								formatDuration={formatDuration}
							/>
						</page-create-record>
					</>
				);
			case 3:
				return (
					<>
						<div className="page-checkout">
							<HeaderUser
								handlePrevStep={handlePrevStep}
								title='AquaBook'
								description='Краснодарская 40ж'
							/>
							<div>
								<HeaderAddition className="title-wrapper" titleSection="Детали заказа" />
								<AppointmentsCheckout
									selectedServices={formState.selectedServices}
									totalMinPrice={totalMinPrice}
									totalMaxPrice={totalMaxPrice}
									formatDuration={formatDuration} />
							</div>
						</div>
					</>
				);
			case 4:
				return <><div>Step on 4</div></>;
			default:
				return null;
		}
	};

	return <>{renderStep()}</>;
};

const AppointmentForm = () => {
	return (
		<FormProvider>
			<AppointmentFormComponent />
		</FormProvider>
	);
};

export default AppointmentForm;