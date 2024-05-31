import React from "react";
import { Link } from "react-router-dom";
import "../../../scss/homepage.scss";

import Dashboard from "../../../assets/images/dashboard.svg";

const Main = () => {
	return (
		<>
			<main className='main'>
				<div className='inverted top-block'>
					<div className='wrapper wrapper--large pt-10 pb-24 md:pt-20 md:pb-32'>
						<div className='flex flex-col items-center text-center'>
							<div className='base-headlines flex flex-col gap-5 items-center text-center top-block__animation-heading'>
								<h1 className='base-headlines__headline h1 text-white md:w-[50rem] md:max-w-full md:mx-auto'>
									Онлайн-запись и CRM для записи клиентов на автомойку
								</h1>
								<p className='base-headlines__description text-gray-300 md:w-[50rem] md:max-w-full md:mx-auto'>
									Откройте для себя веб-приложение для онлайн-записи,
									CRM-инструмент для управления бизнесом.
								</p>
								<div className='flex gap-5 items-center flex-wrap mt-3 w-full sm:w-auto'>
									<Link
										to='/register'
										className='w-full sm:w-auto base-button base-button--primary base-button--lg base-button--bg'>
										<span className='base-button__text base-button__text--center'>
											Начать регистрацию
										</span>
									</Link>
									<Link
										to='/more-detail'
										className='w-full sm:w-auto base-button base-button--outline-primary base-button--lg base-button--bg base-button--outline'>
										<span className='base-button__text base-button__text--center'>
											Подробнее
										</span>
									</Link>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className='calendar-iframe calendar-iframe--black'>
					<div className='wrapper wrapper--small relative'>
						<img
							className='calendar-iframe__iframe bg-white border-black'
							src={Dashboard}
							alt='dashboard'
						/>
					</div>
				</div>
				<section>
					<div className='wrapper'>
						<div className='base-headlines flex flex-col gap-5 items-center text-center'>
							<h2 className='base-headlines__headline h2 md:w-[50rem] md:max-w-full md:mx-auto'></h2>
							<p className='text-gray-600 md:w-[50rem] md-max-w-full md:mx-auto base-headlines__description'></p>
						</div>
					</div>
				</section>
			</main>
		</>
	);
};

export default Main;
