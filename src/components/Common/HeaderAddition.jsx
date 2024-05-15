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
		<page-header-addition
			class={`${className} primary`}
			style={{ zIndex: 100 }}>
			{chipsSection && (
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
			)}
			{titleSection && (
				<section style={{ height: 28 }}>
					<div className='title'>{titleSection}</div>
				</section>
			)}
		</page-header-addition>
	);
};

export default HeaderAddition;
