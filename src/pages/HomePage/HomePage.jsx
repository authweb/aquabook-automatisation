import React from "react";
import "../../scss/homepage.scss"; // добавляем импорт стилей
import { Header, Main } from "../../components";
import Banner from "../../assets/images/banner.svg";

const HomePage = () => {
	return (
		<>
			<Header />
			<Main />
		</>
	);
};
export default HomePage;
