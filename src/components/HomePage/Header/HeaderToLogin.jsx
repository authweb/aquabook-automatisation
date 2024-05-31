import React from "react";
import { CaretLeftOutlined } from "@ant-design/icons";
import { MdArrowBackIos } from "react-icons/md";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContexts";

const HeaderToLogin = ({
	showBack,
	title,
	description,
	titleProfile,
	buttons,
	to,
	containerSmall,
}) => {
	const navigate = useNavigate();
	const { users, setUsers } = useAuth();
	return (
		<page-header class='small' style={{ zIndex: 100 }}>
			<page-header-small>
				<header id='page-header' className='page-header page-header--primary'>
					<div className='page-header-main'>
						<div
							className='page-header-main-background'
							style={{ opacity: 1 }}></div>
						{showBack && (
							<div className='page-header-button' onClick={() => navigate(-1)}>
								<page-header-button class='back-button'>
									<CaretLeftOutlined />
								</page-header-button>
							</div>
						)}

						<div className='page-header-logo'></div>
						{title && (
							<div className='page-header-middle'>
								<page-header-title>
									<div className='page-header-title'>
										<span className='page-header-title-content-wrapper'>
											<span className='page-header-title-content'>
												<span className='page-header-title-content-part1'>
													{title}
												</span>
											</span>
										</span>
									</div>
								</page-header-title>
								{description && (
									<div className='page-header-description'>{description}</div>
								)}
							</div>
						)}
						{to && (
							<Link to={to} className='page-header-button'>
								<page-header-button>
									<ui-kit-svg-icon class='sized'>
										<svg
											xmlns='http://www.w3.org/2000/svg'
											width='24'
											height='24'
											viewBox='0 0 24 24'
											fill='currentColor'>
											<path
												fillRule='evenodd'
												clipRule='evenodd'
												d='M13.6423 5.30508C12.7353 4.36695 11.2647 4.36695 10.3577 5.30508C9.45066 6.24321 9.45066 7.7642 10.3577 8.70233C11.2647 9.64046 12.7353 9.64046 13.6423 8.70233C14.5493 7.7642 14.5493 6.24321 13.6423 5.30508ZM9.26281 4.17266C10.7745 2.60911 13.2255 2.60911 14.7372 4.17266C16.2489 5.73621 16.2489 8.27121 14.7372 9.83475C13.2255 11.3983 10.7745 11.3983 9.26281 9.83475C7.7511 8.27121 7.7511 5.73621 9.26281 4.17266ZM6.58681 13.5142C8.07984 12.4857 10.0402 11.9249 12 11.9249C13.9598 11.9249 15.9202 12.4857 17.4132 13.5142C18.9115 14.5464 20 16.103 20 18.0615V19.1304C20 20.0579 19.3434 21 18.3226 21H5.67742C4.65662 21 4 20.0579 4 19.1304V18.0615C4 16.103 5.08855 14.5464 6.58681 13.5142ZM7.44519 14.8471C6.24462 15.6742 5.54839 16.7856 5.54839 18.0615V19.1304C5.54839 19.2372 5.5851 19.3157 5.62177 19.3591C5.63962 19.3803 5.65491 19.3903 5.66335 19.3945C5.67075 19.3982 5.67457 19.3985 5.67742 19.3985H18.3226C18.3254 19.3985 18.3293 19.3982 18.3366 19.3945C18.3451 19.3903 18.3604 19.3803 18.3782 19.3591C18.4149 19.3157 18.4516 19.2372 18.4516 19.1304V18.0615C18.4516 16.7856 17.7554 15.6742 16.5548 14.8471C15.349 14.0164 13.6965 13.5264 12 13.5264C10.3035 13.5264 8.651 14.0164 7.44519 14.8471Z'
												fill='currentColor'></path>
										</svg>
									</ui-kit-svg-icon>
								</page-header-button>
							</Link>
						)}
					</div>
				</header>
			</page-header-small>
		</page-header>
	);
};

export default HeaderToLogin;
