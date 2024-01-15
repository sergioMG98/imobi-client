import "./day.css";

function Day({day, onClick, clicked}){

    const className = `day ${day.value === 'padding' ? 'padding' : 'calendarDay'} ${day.isCurrentDay ? 'currentDay' : ''}`;
    /* console.log("day", day); */
    return (
        <div onClick={onClick} className={className}>
            {day.value === 'padding' ? '' : day.value}

            {day.event && 
                <div className="event">evenement</div> }
        </div>
    )
}
export default Day;