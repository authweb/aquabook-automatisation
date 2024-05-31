import React from "react";
import { CaretLeftOutlined } from "@ant-design/icons";
import { useNavigate, Link } from "react-router-dom";

const HeaderBooking = ({
	showBack,
	title,
	personalAcc,
	handlePrevStep,
	className,
}) => {
	const navigate = useNavigate();
	return (
		<ui-kit-header>
			<div className='top'>
				<div className='box'>
					{handlePrevStep && (
						<div className='leading clickable' onClick={handlePrevStep}>
							<CaretLeftOutlined className='header__icon sized' />
						</div>
					)}
					{showBack && (
						<div className='leading clickable' onClick={() => navigate(-1)}>
							<CaretLeftOutlined className='header__icon sized' />
						</div>
					)}
				</div>
				<div className='box'>
					<div className='title-box'>
						<span className={`window-header ${className}`}>{title}</span>
					</div>
				</div>
				<div className='box'>
					{personalAcc && <div className='trailing'></div>}
				</div>
			</div>
		</ui-kit-header>
	);
};

export default HeaderBooking;
