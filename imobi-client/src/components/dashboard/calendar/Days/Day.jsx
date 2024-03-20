import "./day.css";

function Day({day, onClick}){

    const className = `day ${day.value === 'padding' ? 'padding' : 'calendarDay'} ${day.isCurrentDay ? 'currentDay' : ''}`;
    
    return (
        <div onClick={onClick} className={className}>
            {day.value === 'padding' ? '' : day.value}

            {day.event && 
                
                <div className="event">
                    {
                        screen.width >= 575 ? "evenement" : "event"
                    }
                </div> }
        </div>
    )
}
export default Day;