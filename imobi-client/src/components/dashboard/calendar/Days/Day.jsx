import "./day.css";

function Day({day, onClick}){

    const className = `day ${day.value === 'padding' ? 'padding' : 'calendarDay'} ${day.isCurrentDay ? 'currentDay' : ''}`;
    
    return (
        <div onClick={onClick} className={className}>
            {day.value === 'padding' ? '' : day.value}
            
            {console.log("day", day)}

            {day.event && 
                
                <div className="event">evenement</div> }
        </div>
    )
}
export default Day;