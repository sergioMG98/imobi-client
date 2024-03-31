import "./calendarHeader.css";

function CalendarHeader({onNext, onBack, dateDisplay}){
    return(

        <div id="header">
            <div id="monthDisplay" className="calendarHeaderContent">{dateDisplay}</div>
            <div className="calendarHeaderContent calendarHeader_BTN">
                <button onClick={onBack} id="backButton">Back</button>
                <button onClick={onNext} id="nextButton">Next</button>
            </div>
        </div>

    )
}
export default CalendarHeader;