import React, { useContext, useEffect } from "react";
import { DayPilot, DayPilotNavigator } from "daypilot-pro-react";
import { CalendarContext } from "../../contexts/CalendarContexts";
import { useNavigate, useSearchParams } from "react-router-dom";
import dayjs from "dayjs";
import "../../scss/CalendarStyles.scss";

const russianLocale = {
  dayNames: [
    "Воскресенье",
    "Понедельник",
    "Вторник",
    "Среда",
    "Четверг",
    "Пятница",
    "Суббота",
  ],
  dayNamesShort: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
  monthNames: [
    "Январь",
    "Февраль",
    "Март",
    "Апрель",
    "Май",
    "Июнь",
    "Июль",
    "Август",
    "Сентябрь",
    "Октябрь",
    "Ноябрь",
    "Декабрь",
  ],
  monthNamesShort: [
    "Янв",
    "Фев",
    "Мар",
    "Апр",
    "Май",
    "Июн",
    "Июл",
    "Авг",
    "Сен",
    "Окт",
    "Ноя",
    "Дек",
  ],
  timePattern: "H:mm",
  datePattern: "dd.MM.yyyy",
  dateTimePattern: "dd.MM.yyyy H:mm",
  weekStarts: 1, // Начало недели с понедельника
};

DayPilot.Locale.register(new DayPilot.Locale("ru-ru", russianLocale));

const CalendarNavigator = () => {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const { selectedDate, setSelectedDate, setRangeStart } =
    useContext(CalendarContext);

  // useEffect(() => {
  //   // Найти элементы, которые нужно обернуть
  //   const titleLeft = document.querySelector(".eb-calendar__titleleft");
  //   const title = document.querySelector(".eb-calendar__title");
  //   const titleRight = document.querySelector(".eb-calendar__titleright");

  //   // Создать новый div элемент, который будет служить контейнером
  //   const headerContainer = document.createElement("div");
  //   headerContainer.classList.add("header-container");

  //   // Применить стили flexbox к контейнеру
  //   headerContainer.style.display = "flex";
  //   headerContainer.style.justifyContent = "space-between";
  //   headerContainer.style.alignItems = "center";
  //   headerContainer.style.width = "100%"; // Установите ширину на 100%, если вы хотите растянуть его на всю ширину родителя

  //   // Переместить существующие элементы внутрь нового контейнера
  //   if (titleLeft && title && titleRight) {
  //     headerContainer.appendChild(titleLeft.cloneNode(true));
  //     headerContainer.appendChild(title.cloneNode(true));
  //     headerContainer.appendChild(titleRight.cloneNode(true));
  //   }

  //   // Найти родительский элемент существующих элементов
  //   const calendarMonth = document.querySelector(".eb-calendar__month");

  //   // Удалить старые элементы из их первоначального положения
  //   if (titleLeft) titleLeft.remove();
  //   if (title) title.remove();
  //   if (titleRight) titleRight.remove();

  //   // Вставить новый контейнер в начало .eb-calendar__month
  //   if (calendarMonth) {
  //     calendarMonth.insertBefore(headerContainer, calendarMonth.firstChild);
  //   }
  // }, []);

  // useEffect(() => {
  //   // Найти все элементы dayheader
  //   const dayHeaders = document.querySelectorAll(".eb-calendar__dayheader");

  //   // Создать контейнер для dayheaders
  //   const dayHeaderContainer = document.createElement("div");
  //   dayHeaderContainer.classList.add("day-header-container");

  //   // Применить стили к контейнеру
  //   dayHeaderContainer.style.display = "flex";
  //   dayHeaderContainer.style.justifyContent = "space-between";
  //   dayHeaderContainer.style.width = "100%";

  //   // Обернуть dayheaders в контейнер
  //   dayHeaders.forEach((header) => {
  //     dayHeaderContainer.appendChild(header.cloneNode(true));
  //     header.remove(); // Удалить оригинальный элемент из DOM
  //   });

  //   // Найти родительский элемент, куда будет добавлен контейнер
  //   const headerContainer = document.querySelector(".header-container");
  //   if (headerContainer) {
  //     // Вставить dayHeaderContainer после headerContainer
  //     headerContainer.parentNode.insertBefore(
  //       dayHeaderContainer,
  //       headerContainer.nextSibling
  //     );
  //   }
  // }, []);

  // useEffect(() => {
  //   // Создать новый контейнер для ячеек календаря
  //   const cellsContainer = document.createElement("div");
  //   cellsContainer.classList.add("cells-container");

  //   // Применить стили к новому контейнеру
  //   cellsContainer.style.display = "flex";
  //   cellsContainer.style.flexDirection = "column";
  //   cellsContainer.style.flexWrap = "wrap";
  //   cellsContainer.style.justifyContent = "space-between";
  //   cellsContainer.style.width = "100%";

  //   // Найти все ячейки календаря
  //   const cells = document.querySelectorAll(".eb-calendar__cell");

  //   // Переместить каждую ячейку в новый контейнер
  //   cells.forEach((cell) => {
  //     cellsContainer.appendChild(cell.cloneNode(true)); // Клонировать и добавить в контейнер
  //     cell.remove(); // Удалить оригинальный элемент из DOM
  //   });

  //   // Найти контейнер для заголовков дней недели
  //   const dayHeaderContainer = document.querySelector(".day-header-container");

  //   // Вставить контейнер с ячейками непосредственно после контейнера с заголовками дней недели
  //   if (dayHeaderContainer) {
  //     dayHeaderContainer.parentNode.insertBefore(
  //       cellsContainer,
  //       dayHeaderContainer.nextSibling
  //     );
  //   }
  // }, []); // Зависимости useEffect пусты, так что код выполнится один раз после первого рендера компонента

  // useEffect(() => {
  //   // Применяем стили к основному контейнеру календаря
  //   const calendarMain = document.querySelector(".eb-calendar__main");
  //   if (calendarMain) {
  //     calendarMain.style.position = "";
  //     calendarMain.style.width = "300px";
  //     calendarMain.style.height = "300px";
  //     calendarMain.style.fontSize = "12px";
  //     calendarMain.style.textAlign = "center";
  //   }

  //   // Установка стилей для ячеек месяца, чтобы они растягивались и включали отступы
  //   const monthCells = document.querySelector(".eb-calendar__month");
  //   if (monthCells) {
  //     monthCells.style.display = "flex";
  //     monthCells.style.justifyContent = "space-between";
  //     monthCells.style.flexDirection = "column";
  //     monthCells.style.flexWrap = "wrap";
  //     monthCells.style.position = "";
  //     monthCells.style.width = "300px";
  //     monthCells.style.height = "300px";
  //     monthCells.style.fontSize = "12px";
  //   }

  //   const elementsToRemoveAbsolute = document.querySelectorAll(
  //     ".eb-calendar__title, .eb-calendar__titleleft, .eb-calendar__titleright, .eb-calendar__dayheader"
  //   );

  //   elementsToRemoveAbsolute.forEach((elem) => {
  //     elem.style.position = "";
  //     elem.style.top = "";
  //     elem.style.left = "";
  //     elem.style.right = "";
  //   });

  //   // Заголовки дней недели
  //   const dayHeaders = document.querySelectorAll(".eb-calendar__dayheader");
  //   dayHeaders.forEach((header) => {
  //     header.style.color = "#ffffff";
  //     header.style.backgroundColor = "#001529";
  //     header.style.fontSize = "14px";
  //     header.style.padding = "5px 0";
  //   });

  //   dayHeaders.forEach((header) => {
  //     header.style.color = "#ffffff";
  //     header.style.backgroundColor = "#001529";
  //     header.style.fontSize = "14px";
  //     header.style.padding = "5px 0";
  //   });

  //   const cells = document.querySelectorAll(".eb-calendar__cell");
  //   cells.forEach((cell) => {
  //     cell.style.width = "calc(100% / 7)"; // 7 ячеек на всю ширину
  //     cell.style.height = "calc(100% / 7)"; // Для квадратных ячеек
  //     cell.style.margin = "2px";
  //     cell.style.boxSizing = "border-box"; // Включаем padding и border в размер ячейки
  //   });

  //   // Найти родительский элемент, который будет контейнером с position: relative;
  //   const calendarCells = document.querySelectorAll(
  //     ".eb-calendar__month .eb-calendar__cell"
  //   );

  //   calendarCells.forEach((cell) => {
  //     // Установить position: relative; для родительских элементов ячеек
  //     cell.style.position = "";
  //     cell.style.top = "";
  //     cell.style.left = "";
  //     cell.style.right = "";
  //     cell.style.width = "40px"; // Пример расчета ширины ячеек
  //     cell.style.height = "40px"; // Пример расчета высоты ячеек
  //   });

  //   // Установка стилей для внутренних абсолютно позиционированных элементов
  //   const absoluteElements = document.querySelectorAll(
  //     '.eb-calendar__cell [style*="position: absolute;"]'
  //   );
  //   absoluteElements.forEach((element) => {
  //     // Удаляем абсолютное позиционирование
  //     element.style.position = "";
  //     element.style.top = "";
  //     element.style.left = "";
  //     element.style.width = "";
  //     element.style.height = "";
  //   });

  //   // Стили для номеров недели
  //   const weekNumbers = document.querySelectorAll(".eb-calendar__weeknumber");
  //   weekNumbers.forEach((weekNumber) => {
  //     weekNumber.style.color = "#ffffff";
  //     weekNumber.style.backgroundColor = "#001529";
  //     weekNumber.style.padding = "4px";
  //     weekNumber.style.width = "40px"; // Установите желаемую ширину
  //     weekNumber.style.height = "40px"; // Установите желаемую высоту
  //   });

  //   // Стили для выделения текущего дня
  //   const todayBoxes = document.querySelectorAll(".eb-calendar__todaybox");
  //   todayBoxes.forEach((todayBox) => {
  //     todayBox.style.border = "1px solid red";
  //   });

  //   // Стили для индикаторов занятости
  //   const busyIndicators = document.querySelectorAll(".eb-calendar__busy");
  //   busyIndicators.forEach((busyIndicator) => {
  //     busyIndicator.style.fontWeight = "bold";
  //   });

  //   // Стили для выбранных ячеек
  //   const selectedCells = document.querySelectorAll(
  //     ".eb-calendar__select .eb-calendar__cell_box"
  //   );
  //   selectedCells.forEach((selectedCell) => {
  //     selectedCell.style.backgroundColor = "#001529";
  //   });
  // });

  const handleDateSelection = (date) => {
    const formattedDate = dayjs(date).format("YYYY-MM-DD");
    const rangeStart = dayjs(date).add(1, "day").format("YYYY-MM-DD");
    navigate(
      `/dashboard/calendar?today=${formattedDate}&range_start=${rangeStart}`
    );
  };

  return (
    <DayPilotNavigator
      theme={"eb-calendar_"}
      locale={"ru-ru"}
      selectMode={"day"}
      showMonths={1}
      selectionDay={selectedDate}
      autoFocusOnClick={true}
      onTimeRangeSelect={(args) => {
        const formattedDate = dayjs(args.day.value).format("YYYY-MM-DD");
        console.log("Выбранная дата:", formattedDate);
        setSelectedDate(args.day);
        console.log("Updated selectedDate:", selectedDate);
        const today = searchParams.get("today");
        setRangeStart(formattedDate);
        navigate(
          `/dashboard/calendar?today=${today}&range_start=${formattedDate}`
        );
      }}
    />
  );
};

export default CalendarNavigator;
