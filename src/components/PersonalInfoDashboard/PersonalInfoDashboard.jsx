import React from "react";
import { useAuth } from "../../contexts/AuthContexts";
import { HeaderDashboard, CardAb } from "../../components";

import imageUser from "../../assets/images/soon.png";

import { Tag } from "antd";

const PersonalInfoDashboard = () => {
	const { users, setUsers } = useAuth();

	return (
		<>
			<HeaderDashboard
				showBack
				title='Профиль'
				buttons='Редактировать'
				to='edit'
			/>
			<div className='ab-page__content'>
				<div className='container ab-page__grid'>
					<div>
						<div className='grid grid-cols-1 gap-4 items-start'>
							<section className='ab-card ab-island'>
								<div role='button' className='ab-island__heading'>
									<div className='ab-island__icon-wrap'>
										<div className='ab-island-avatar__icon'>
											<span className='ab-avatar ab-island-avatar__icon-userpic'>
												<img src={imageUser} alt='image user' />
											</span>
										</div>
									</div>
									<div className='ab-island__title-wrap'>
										<h3 className='ab_headline ab-island__title'>
											{users?.first_name} {users?.last_name}
										</h3>
									</div>
									<div className='ab-island__description'>
										<div className='ab-description'>{users?.position}</div>
									</div>
									<div className='ab-island__arrow-wrap'>
										<div className='whitespace-no-wrap leading-none relative inline-block rounded-lg text-xs'>
											{users?.is_bookable === 1 ? (
												<Tag color='success'>Активен</Tag>
											) : (
												<Tag color='error'>Не активен</Tag>
											)}
										</div>
									</div>
								</div>
								<div className='ab-island__content-wrap'>
									<hr className='ab-island-avatar__separator' />
									<div className='ab-island__content'>
										<div className='grid grid-cols-1 gap-4 items-start'>
											<div className='ab-info'>
												<div className='ab-info__label'>
													<span className='ab-description'>Пол</span>
												</div>
												<div>
													{users?.gender === "male" ? "Мужской" : "Женский"}
												</div>
											</div>
											<div className='ab-info'>
												<div className='ab-info__label'>
													<span className='ab-description'>Телефон</span>
												</div>
												<div>
													<span className='descinfo'>
														<a
															target='_blank'
															rel='noreferrer'
															href={`tel:${users?.phone}`}
															className='link'>
															{users?.phone}
														</a>
													</span>
												</div>
											</div>
											<div className='ab-info'>
												<div className='ab-info__label'>
													<span className='ab-description'>Email</span>
												</div>
												<div>{users?.email}</div>
											</div>
											<div className='ab-info'>
												<div className='ab-info__label'>
													<span className='ab-description'>Роль</span>
												</div>
												<div>{users?.position}</div>
											</div>
											<div className='ab-info'>
												<div className='ab-info__label'>
													<span className='ab-description'>Описание</span>
												</div>
												<div>{users?.description}</div>
											</div>
										</div>
									</div>
								</div>
							</section>
							<section className='ab-card ab-island'>
								<div className='ab-island__heading'>
									<div className='ab-island__title-wrap ab-island__title-wrap--middle'>
										<h2 className='ab-sub-headline ab-island__title'>
											Онлайн-запись
										</h2>
									</div>
									<div className='ab-island__arrow-wrap'>
										<div className='whitespace-no-wrap leading-none relative inline-block rounded-lg text-xs'>
											{users?.is_bookable === 1 ? (
												<Tag color='success'>Включена</Tag>
											) : (
												<Tag color='error'>Не включена</Tag>
											)}
										</div>
									</div>
								</div>
							</section>
						</div>
					</div>
					<div>
						<div className='grid grid-cols-1 gap-4 items-start'>
							<CardAb arrow title='Изменить пароль' to='password' />
							<CardAb arrow title='Удалить аккаунт' to='delete' danger />
							{/* <ChangePassword />
            <ChangePhoneNumber />
            <ChangeEmail /> */}
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default PersonalInfoDashboard;
