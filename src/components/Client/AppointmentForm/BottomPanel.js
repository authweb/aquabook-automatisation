import React from "react";
import ProfileButton from "../../Common/FormComponents/ProfileButton";

const BottomPanel = ({
    totalMinPrice,
    totalMaxPrice,
    formatDuration,
    selectedDate,
    selectedTime,
    openModal,
    onNextStep,
    closeModal,
}) => {
    return (
        <div className="page-bottom-panel">
            <div className="time-and-price">
                <p className="price">
                    {`${totalMinPrice} ${totalMaxPrice === 0 ? "от" : "-"
                        } ${totalMaxPrice} ₽`}
                </p>
                <p className="time">от {formatDuration()}</p>
            </div>
            {selectedDate && selectedTime && (
                <div className="date" onClick={openModal}>
                    <p className="button-text">
                        {`${selectedDate.toLocaleDateString("ru-RU", {
                            weekday: "long",
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                        })}, ${selectedTime}`}
                    </p>
                </div>
            )}
            <ProfileButton
                title={selectedDate && selectedTime ? "Все верно" : "Выбрать дату и время"}
                locator={selectedDate && selectedTime ? "select_all_right" : "select_date_time_btn"}
                onOpenModal={selectedDate && selectedTime ? null : openModal}
                onNextStep={() => {
                    if (selectedDate && selectedTime) {
                        onNextStep(selectedDate, selectedTime);
                        closeModal({});
                    }
                }}
            />
        </div>
    );
};

export default BottomPanel;
