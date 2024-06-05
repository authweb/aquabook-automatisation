import React, { useState } from "react";
import { CaretLeftOutlined } from "@ant-design/icons";
import { MdArrowBackIos } from "react-icons/md";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContexts";
import Button from "./FormComponents/Button";

const HeaderDashboard = ({
	showBack,
	title,
	flex_1,
	titleProfile,
	titleEmployee,
	buttons,
	to,
	containerSmall,
}) => {
	const navigate = useNavigate();
	const { users, setUsers } = useAuth();
	const { employee, setEmployee } = useState(null);
	return (
		<div className='ab-page__heading'>
			<div className='ab-page-headline'>
				<div
					className={
						containerSmall
							? "ab-page-headline__container container-small"
							: "ab-page-headline__container container"
					}>
					{showBack && (
						<div className='ab-page-headline__back-wrapper'>
							<span
								className='ab-button w-10 h-10 ab-page-headline__back ab-button_md color-mono theme-solid'
								onClick={() => navigate(-1)}>
								<span className='ab-button__overlay'></span>
								<span className='ab-button__content ab-button__content_md px-2'>
									<CaretLeftOutlined />
								</span>
							</span>
						</div>
					)}
					{titleProfile && (
						<h1 className='ab-headline ab-page-headline__heading'>
							{users?.first_name} {users?.last_name}
						</h1>
					)}
					{titleEmployee && (
						<h1 className='ab-headline ab-page-headline__heading'>
							{employee?.first_name} {employee?.last_name}
						</h1>
					)}
					{title && (
						<h1 className='ab-headline ab-page-headline__heading'>{title}</h1>
					)}
					<div className='ab-page-headline__buttons'>
						<div className='ab-page-menu-button'>
							<div className='ab-flow ab-page-menu-buttons__expanded-btns'>
								<div className='ab-flow__wrap justify-end'>
									<div className='ab-flow__child'>
										{to && (
											<Link
												to={to}
												className='ab-button ab-button_md color-default theme-ghost'>
												<span className='ab-button__content ab-button__content_md'>
													<span className='ab-button__text'>{buttons}</span>
												</span>
											</Link>
										)}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				{flex_1 && (
					<div className='flex-1'></div>
				)}
				{/* <div className="headerUser__box">
					<MdArrowBackIos
						className="headerUser__box-icon"
						onClick={() => navigate(-1)}
					/>
				</div> */}
			</div>
		</div>
	);
};

export default HeaderDashboard;
