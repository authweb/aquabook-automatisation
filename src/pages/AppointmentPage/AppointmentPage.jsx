import React from "react";
import "../../scss/form.scss"; // добавляем импорт стилей
import "../../scss/profile.scss";

import { AppointmentForm } from "../../components";

const AppointmentPage = () => {
	return (
		<page-disabled>
			<AppointmentForm />
		</page-disabled>
	);
};

export default AppointmentPage;
