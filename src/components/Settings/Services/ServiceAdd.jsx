import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import classNames from "classnames";
import { CardEdit, Input, HeaderDashboard, Select, Switcher } from "../../";


import axios from "axios";
import { CloseOutlined, CaretDownOutlined } from "@ant-design/icons";
import TextArea from "../../Common/FormComponents/TextArea";
import CheckBox from "../../Common/FormComponents/Checkbox";

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
		tags: true,
		duration: "",
		is_top: false,
	});

	const [isRangePrice, setIsRangePrice] = useState(false);

	useEffect(() => {
		async function fetchCategories() {
			try {
				const response = await axios.get(
					"https://api.aqua-book.ru/api/service-categories",
				);
				if (response.data && Array.isArray(response.data.servicesCategories)) {
					setCategories(response.data.servicesCategories);
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
		const selectedCategoryData = categories.find(
			category => category.id === selectedCategoryId,
		);
		setSelectedCategory(selectedCategoryData);
	}, [categories, selectedCategoryId]);

	const handleToggleBookable = checked => {
		setFormState(prevValues => ({
			...prevValues,
			tags: checked,
		}));
	};

	const handleToggleTopService = checked => {
		setFormState(prevValues => ({
			...prevValues,
			is_top: checked,
		}));
	};

	const handleChange = event => {
		const { name, value } = event.target;
		setFormState(prevValues => ({
			...prevValues,
			[name]: value,
		}));

		const formChanged = Object.keys(formState).some(
			key => formState[key] !== initialValues[key],
		);
		setIsChanged(formChanged);
	};

	const handleRangePriceChange = checked => {
		setIsRangePrice(checked);
		if (!checked) {
			setFormState(prevValues => ({
				...prevValues,
				price_to: "", // Clear price_to if range price is disabled
			}));
		}
	};

	const handleSelectChange = (category) => {
		setSelectedCategory(category);
		setFormState(prevState => ({
			...prevState,
			category_id: category.id,
		}));
	};

	const handleSubmit = async event => {
		event.preventDefault();

		const serviceData = {
			category_id: formState.category_id,
			name: formState.name,
			description: formState.description,
			price_from: formState.price_from,
			price_to: isRangePrice ? formState.price_to : formState.price_from, // Use price_from if range price is not enabled
			tags: formState.tags ? 1 : 0,
			duration: formState.duration,
			is_top: formState.is_top ? 1 : 0,
		};

		console.log("Отправка данных:", serviceData);

		try {
			await axios.post(
				"https://api.aqua-book.ru/api/services",
				serviceData,
			);

			if (formState.is_top) {
				const popularCategory = categories.find(category => category.name === "Популярные услуги");
				if (popularCategory) {
					await axios.post(
						"https://api.aqua-book.ru/api/services",
						{ ...serviceData, category_id: popularCategory.id },
					);
				}
			}

			navigate(-1);
		} catch (error) {
			console.error("Error adding service:", error.response ? error.response.data : error.message);
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
										checked: formState.tags,
										onChange: handleToggleBookable,
									}}
									cardEdit>
									<Input
										type='text'
										name='name'
										value={formState.name}
										id='35'
										prefix='Название услуги'
										onChange={handleChange}
									/>
									<div onClick={e => e.stopPropagation()}>
										<Select
											id="88"
											options={categories}
											renderOption={category => (
												<>
													<span className='block whitespace-normal ml-3'>
														{category.name}
													</span>
												</>
											)}

											getDisplayValue={category => category.name}
											filterFunction={(category, searchTerm) =>
												category.name.toLowerCase().includes(searchTerm.toLowerCase())
											}
											onSelect={handleSelectChange}
											inputTitle='Категория'
										/>
									</div>
									<TextArea
										type='text'
										name='description'
										autoComplete='description'
										value={formState.description}
										id='36'
										prefix='Описание услуги'
										onChange={handleChange}
									/>
									<Switcher
										field_label='Топ услуга'
										checked={formState.is_top}
										onChange={handleToggleTopService}
									/>
									<div className='ab-select'>
										<div className='ab-select__input-wrap'>
											<Input
												type='text'
												placeholder='Администратор'
												createPlaceholder='Создайте новый отдел'
												autoComplete='off'
												id='46'
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
										type='number'
										name='duration'
										autoComplete='duration'
										value={formState.duration}
										id='37'
										prefix='Длительность (мин)'
										onChange={handleChange}
									/>
									<Switcher field_label='Пауза после услуги' />
								</CardEdit>
								<CardEdit general='Настройки цены' cardForm>

									<CheckBox
										isChecked={isRangePrice}
										onChange={e => handleRangePriceChange(e.target.checked)}
										field_label="Указать диапазон цены"
									>
									</CheckBox>
									{isRangePrice ? (
										<>
											<Input
												type='number'
												name='price_from'
												autoComplete='price_from'
												value={formState.price_from}
												id='38'
												prefix='Цена от (руб.)'
												onChange={handleChange}
											/>
											<Input
												type='number'
												name='price_to'
												autoComplete='price_to'
												value={formState.price_to}
												id='39'
												prefix='Цена до (руб.)'
												onChange={handleChange}
											/>
										</>
									) : (
										<Input
											type='number'
											name='price_from'
											autoComplete='price_from'
											value={formState.price_from}
											id='40'
											prefix='Базовая цена (руб.)'
											onChange={handleChange}
										/>
									)}
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
