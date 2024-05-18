import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import classNames from "classnames";
import { CardEdit, Input, HeaderDashboard, Select, Switcher } from "../../";

import axios from "axios";

import { CloseOutlined, CaretDownOutlined } from "@ant-design/icons";
import TextArea from "../../Common/FormComponents/TextArea";

const ServiceAdd = () => {
	const navigate = useNavigate();
	const [isChanged, setIsChanged] = useState(false);

	const [selectedCategoryId, setSelectedCategory] = useState(null);
	const [categories, setCategories] = useState([]);

	const [initialValues, setInitialValues] = useState("");
	const [formState, setFormState] = useState({
		category_id: "",
		name: "",
		description: "",
		price_from: "",
		price_to: "",
		tags: "",
		duration: "",
	});

	const [isBookable, setIsBookable] = useState(true);

	useEffect(() => {
		async function fetchCategories() {
			try {
				const response = await axios.get(
					"https://api.aqua-book.ru/api/service-categories",
				);
				// Проверяем, есть ли нужный массив в полученных данных
				if (response.data && Array.isArray(response.data.servicesCategories)) {
					setCategories(response.data.servicesCategories); // Обновляем состояние categories нужными данными
				} else {
					console.error(
						"Полученные данные не содержат массив категорий: ",
						response.data,
					);
				}
			} catch (error) {
				console.error("Ошибка при получении категорий:", error);
			}
		}

		fetchCategories();
	}, []);

	useEffect(() => {
		// Поиск данных выбранной категории по ID или другому уникальному ключу
		const selectedCategoryData = categories.find(
			category => category.id === selectedCategoryId,
		);

		// Установка выбранной категории в состояние
		setSelectedCategory(selectedCategoryData);
	}, [categories, selectedCategoryId]);

	const handleToggleBookable = checked => {
		setIsBookable(checked);
		setFormState(prevValues => ({
			...prevValues,
			is_bookable: checked, // Обновляем значение в currentValues
		}));
	};

	const handleChange = event => {
		const { name, value } = event.target;
		setFormState(prevValues => ({
			...prevValues,
			[name]: value,
		}));

		// Проверяем, изменилось ли хоть одно поле формы относительно начальных значений
		const formChanged = Object.keys(formState).some(
			key => formState[key] !== initialValues[key],
		);
		setIsChanged(formChanged);
	};

	const handleSubmit = async event => {
		event.preventDefault();

		const serviceData = {
			category_id: formState?.category_id || "",
			name: formState?.name || "",
			description: formState?.description || "",
			price_from: formState?.price_from || "",
			price_to: formState?.price_to || "",
			tags: formState?.tags || "",
			duration: formState?.duration || "",
		};
		console.log(serviceData);
		try {
			// Запрос на добавление новой услуги
			const response = await axios.post(
				"https://api.aqua-book.ru/api/services",
				serviceData,
			);
			navigate(-1);
			console.log("Service added:", response.data);
			// Обработка после успешного добавления (например, очистка формы или редирект)
		} catch (error) {
			console.error("Error adding service:", error);
		}
	};

	const handleCancel = () => {
		navigate(-1);
	};
	return (
		<>
			<HeaderDashboard showBack title='Создать услугу' containerSmall />
			<div className='ab-page__content'>
				<div className='container-small'>
					<div className='eb-model-edit'>
						<div>
							<form
								className='grid grid-cols-1 gap-4 items-start'
								onSubmit={handleSubmit}>
								<CardEdit
									switcher={{
										checked: isBookable,
										onChange: handleToggleBookable,
									}}
									cardEdit>
									<Input
										type='text'
										name='name'
										value={formState.name}
										id='input-35'
										prefix='Название услуги'
										onChange={handleChange}
									/>
									<Select
										options={categories} // Используем массив категорий вместо услуг
										renderOption={category => (
											<>
												<span className='block whitespace-normal ml-3'>
													{category.name}
												</span>
											</>
										)}
										getDisplayValue={category => category.name} // Получаем имя категории для отображения
										filterFunction={(
											category,
											searchTerm, // Функция фильтрации для поиска
										) =>
											category.name
												.toLowerCase()
												.includes(searchTerm.toLowerCase())
										}
										onSelect={category => {
											setSelectedCategory(category); // Устанавливаем выбранную категорию (если нужно сохранить весь объект)
											setFormState(prevState => ({
												...prevState,
												category_id: category.id,
											})); // Обновляем category_id в formState
										}}
										inputTitle='Категория' // Заголовок для поля выбора категории
									/>

									<TextArea
										type='text'
										name='description'
										autoComplete='description'
										value={formState.description}
										id='input-36'
										prefix='Описание услуги'
										onChange={handleChange}
									/>
									<Switcher field_label='Топ услуга' />

									<div className='ab-select'>
										<div className='ab-select__input-wrap'>
											<Input
												type='text'
												placeholder='Администратор'
												createPlaceholder='Создайте новый отдел'
												autoComplete='off'
												id='input-46'
												prefix='Отдел'
												iconGroup
												iconOne={<CloseOutlined />}
												iconTwo={<CaretDownOutlined />}
												onChange={handleChange}
											/>
										</div>
									</div>
								</CardEdit>
								<CardEdit general='Настройки продолжительности' cardForm>
									<Input
										type='duration'
										name='duration'
										autoComplete='duration'
										value={formState.duration}
										id='input-37'
										prefix='Длительность (мин)'
										onChange={handleChange}
									/>
									<Switcher field_label='Пауза после услуги' />
								</CardEdit>
								<CardEdit general='Настройки цены' cardForm>
									<Input
										type='price_from'
										name='price_from'
										autoComplete='price_from'
										value={formState.price_from}
										id='input-37'
										prefix='Базовая цена (руб.)'
										onChange={handleChange}
									/>
								</CardEdit>
								<div
									className={classNames("eb-model-edit__panel", {
										"show-bottom-enter-active show-bottom-enter": isChanged,
										"show-bottom-leave-active show-bottom-leave-to": !isChanged,
									})}
									style={isChanged ? {} : { display: "none" }}>
									<button
										type='button'
										className='ab-button eb-model-edit__button eb-model-edit__button--mobile md:hidden ab-button_md color-default theme-ghost'></button>
									<button
										type='submit'
										className='ab-button eb-model-edit__button ml-2 md:ml-0 ab-button_md color-accent theme-solid'>
										<span className='ab-button__overlay'></span>
										<span className='ab-button__content ab-button__content_md'>
											<span className='ab-button__text'>Сохранить</span>
										</span>
									</button>
									<button
										type='button'
										onClick={handleCancel}
										className='ab-button eb-model-edit__button hidden md:block ml-4 ab-button_md color-default theme-ghost'>
										<span className='ab-button__overlay'></span>
										<span className='ab-button__content ab-button__content_md'>
											<span className='ab-button__text'>Отмена</span>
										</span>
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default ServiceAdd;
