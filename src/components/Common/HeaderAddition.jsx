import React from "react";
import ButtonChips from "./ButtonChips";

const HeaderAddition = ({
	categories,
	activeCategoryId,
	handleCategorySelect,
	chipsSection,
	titleSection,
	className,
}) => {
	return (
		<>
			{titleSection && (
				<div
					class={`page-header-addition ${className} primary`}
					style={{ zIndex: 99 }}>

					<section style={{ height: 28 }}>
						<div className='title'>{titleSection}</div>
					</section>
				</div>
			)}
			{chipsSection && (
				<div
					class={`${className} primary`}
					style={{ zIndex: 100 }}>

					<section>
						<div className='chips-scrollable-container'>
							<app-scrollable-category-chips
								data-locator='service_category_chips'
								class='app-scrollable-category-chips'>
								<div className='chips-container'>
									<ui-kit-horizontal-scrollable class='ui-kit-horizontal-scrollable'>
										<div className='flex-container'>
											{categories.map(category => (
												<ButtonChips
													key={category.id}
													aria-label={`Выбрать категорию ${category.name}`}
													className={
														activeCategoryId === category.id ? "active" : ""
													}
													onClick={() => handleCategorySelect(category.id)}>
													{category.name}
												</ButtonChips>
											))}
										</div>
									</ui-kit-horizontal-scrollable>
								</div>
							</app-scrollable-category-chips>
						</div>
					</section>
				</div>)}
		</>

	);
};

export default HeaderAddition;
