import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { HeaderDashboard, CardAb } from "../../";

import imageUser from "../../../assets/images/soon.png";

import { Tag } from "antd";

const ServicePage = () => {
	let { id } = useParams();
	const [service, setService] = useState(null);

	useEffect(() => {
		if (id) {
			fetch(`http://localhost:3306/api/services/${id}`)
				.then(response => response.json())
				.then(data => {
					setService(data.service);
				});
		}
	}, [id]);

	if (!service) {
		return <div>Loading...</div>;
	}

	return (
		<>
			<HeaderDashboard showBack buttons='Редактировать' to='edit' />
			<div className='ab-page__content'>
				<div className='container ab-page__grid'>
					<div>
						<div className='grid grid-cols-1 gap-4 items-start'>
							<section className='ab-card ab-island'>
								<div role='button' className='ab-island__heading'>
									<div className='ab-island__icon-wrap'>
										<div
											className='aw-island-icon rounded-lg'
											style={{ width: "60px", height: "60px" }}>
											<img
												src={imageUser}
												alt='image user'
												className='rounded-lg'
											/>
										</div>
									</div>
									<div className='ab-island__title-wrap'>
										<h3 className='ab_headline ab-island__title'>
											{service.name}
										</h3>
									</div>
									<div className='ab-island__description'>
										<div className='ab-description'>Основные услуги</div>
									</div>
									<div className='ab-island__arrow-wrap'>
										<div className='whitespace-no-wrap leading-none relative inline-block rounded-lg text-xs'>
											<Tag color='success'>Активен</Tag>
										</div>
									</div>
								</div>
								<div className='ab-island__content-wrap'>
									<hr className='ab-island-avatar__separator' />
									<div className='ab-island__content'>
										<div className='grid grid-cols-1 gap-4 items-start'>
											<div className='ab-info'>
												<div className='ab-info__label'>
													<span className='ab-description'>Описание</span>
												</div>
												<div>{service.description}</div>
											</div>
											<div className='ab-info'>
												<div className='ab-info__label'>
													<span className='ab-description'>
														Длительность (мин)
													</span>
												</div>
												<div>От {service.price_from} ₽</div>
											</div>
											<div className='ab-info'>
												<div className='ab-info__label'>
													<span className='ab-description'>
														Расходные материалы
													</span>
												</div>
												<div>—</div>
											</div>
										</div>
									</div>
								</div>
							</section>
						</div>
					</div>
					<div>
						<div className='grid grid-cols-1 gap-4 items-start'>
							<CardAb
								arrow
								title='Сопутствующие услуги'
								options='0'
								to='services'
							/>
							<CardAb arrow title='Ресурсы' options='0' to='resources' />
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default ServicePage;
