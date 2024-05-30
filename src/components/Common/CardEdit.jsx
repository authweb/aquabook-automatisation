import React, { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContexts";
import { CheckOutlined, CloseOutlined, PlusOutlined } from "@ant-design/icons";
import { ReactComponent as ServiceIcon } from "../../assets/images/service.svg";
import { ReactComponent as UserSvg } from "../../assets/images/tag-user.svg";
import dayjs from "dayjs";
import { Switch } from "antd";
import Aside from "./Aside";
import Select from "./FormComponents/Select";
import TextArea from "./FormComponents/TextArea";
import ServicesItem from "./ServicesItem";

const CardEdit = ({
	general,
	title,
	switcher,
	children,
	cardCalendar,
	cardEdit,
	cardForm,
	cardClient,
	cardInvoice,
	currentValues,
	ButtonName,
	activeButton,
	onClientSelect,
	selectedServices,
	onButtonClick,
}) => {
	const [clients, setClients] = useState([]);

	useEffect(() => {
		const fetchClients = async () => {
			try {
				const response = await fetch("https://api.aqua-book.ru/api/clients");
				const data = await response.json();
				setClients(data.clients);
			} catch (error) {
				console.error("Error fetching clients:", error);
			}
		};

		fetchClients();
	}, []);

	const handleSelectClient = client => {
		onClientSelect(client);
		console.log("Выбран клиент:", client);
	};
	return (
		<>
			{cardCalendar && (
				<div className='ab-card eb-services-island'>
					<h4 className='ab-sub-headline'>{title}</h4>
					{selectedServices.map(selectedServices => (
						<ServicesItem key={selectedServices.id} service={selectedServices} />
					))}
					<button
						onClick={() => onButtonClick("addService")}
						type='button'
						className='ab-button w-full mt-4 eb-button-dashed ab-button_md color-accent theme-outline'>
						<span className='ab-button__overlay'></span>
						<span className='ab-button__content ab-button__content_md'>
							<PlusOutlined style={{ color: "#ff7a00" }} />
							<span className='ab-button__text ml-1'>{ButtonName}</span>
						</span>
					</button>
				</div>
			)}
			{cardClient && (
				<div className='ab-card'>
					<div className='flex mb-4'>
						<h4 className='ab-sub-headline mr-auto'>{title}</h4>
						<button
							onClick={() => onButtonClick("addClient")}
							type='button'
							className='link-uppercase ml-4 link'>
							{ButtonName}
						</button>
					</div>
					<Select
						options={clients}
						renderOption={client => (
							<>
								<span className='block whitespace-normal ml-3'>
									{client.first_name} {client.last_name}
									<span className='block text-xs text-mono-400'>
										{client.phone}
									</span>
								</span>
							</>
						)}
						getDisplayValue={client => client.first_name}
						filterFunction={(client, searchTerm) =>
							client.first_name.toLowerCase().includes(searchTerm.toLowerCase())
						}
						onSelect={handleSelectClient}
						prefixSvg={
							<UserSvg
								className='ab-icon icon sprite-eyw text-mono-600 eb-island-icon__icon ab-icon--size-text'
								style={{ width: "30px", height: "30px" }}
							/>
						}
						inputTitle={onClientSelect ? "Клиент" : "Не выбран (Анонимный)"}
						id='input-56'
					/>
				</div>
			)}
			{cardInvoice && (
				<div className='ab-invoice ab-card'>
					<div className='grid grid-cols-1 gap-4 items-start'>
						<div className='eb-booking-invoice'>
							<h3 className='ab-headline'>Сумма к оплате</h3>
							<dl className='eb-booking-invoice__list'>
								<dt>Итого:</dt>
								<dd>{currentValues} ₽</dd>
							</dl>
						</div>
						<div>
							<div className='lg:mb-auto grid grid-cols-1 gap-6 items-start'>
								<TextArea name='comment' prefix='Комментарий' id='input-55' />
							</div>
						</div>
					</div>
				</div>
			)}
			{cardEdit && (
				<section className='ab-card ab-island'>
					<div role='button' className='ab-island__heading'>
						<div className='ab-island__title-wrap'>
							<h3 className='ab_headline ab-island__title'>{general}</h3>
						</div>
						<div className='ab-island__arrow-wrap'>
							<div className='whitespace-no-wrap leading-none relative inline-block rounded-lg text-xs'>
								{switcher && (
									<Switch
										checkedChildren={<CheckOutlined />}
										unCheckedChildren={<CloseOutlined />}
										checked={switcher.checked ? 1 : 0}
										onChange={switcher.onChange}
									/>
								)}
							</div>
						</div>
					</div>
					<div className='ab-island__content-wrap'>
						<div className='ab-island__content'>
							<div className='grid grid-cols-1 gap-4 items-start'>
								{children}
							</div>
						</div>
					</div>
				</section>
			)}

			{cardForm && (
				<section className='ab-card'>
					<div className='ab-card__header ab-card__header--offset'>
						<h3 className='ab_-sub-headline ab-card__title'>{general}</h3>
					</div>
					{switcher && (
						<div className='ab-island__arrow-wrap'>
							<div className='whitespace-no-wrap leading-none relative inline-block rounded-lg text-xs'>
								<Switch
									checkedChildren={<CheckOutlined />}
									unCheckedChildren={<CloseOutlined />}
									checked={switcher.checked}
									onChange={switcher.onChange}
								/>
							</div>
						</div>
					)}
					<div className='grid grid-cols-1 gap-4 items-start'>{children}</div>
				</section>
			)}
			{activeButton && (
				<Aside
					title={`Добавить ${activeButton === "addService" ? "услугу" : "клиента"
						}`}
					closeAside={() => onButtonClick(activeButton)}
					isAsideOpen={true} // Открываем Aside при активной кнопке
				/>
			)}
		</>
	);
};

export default CardEdit;
