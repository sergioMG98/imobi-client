import { useState } from "react";
import "./NewEventModal.css";

function NewEventModal({onSave, onClose, clicked}){
    
   const [title, setTitle] = useState('');
   const [error, setError] = useState(false);


    return (
        <div>
            <div id="newEventModal">
                <h2>Events</h2>

                <div className="allEvents">

                </div>
                <input 
                    className={error ? 'error' : ''}
                    id="eventTitleInput" 
                    placeholder="Event Title" 
                    value={title}
                    onChange={e => setTitle(e.target.value)} 
                />
                <button 
                    onClick={() => {
                        if(title){
                            setError(false);
                            onSave(title)
                        } else {
                            setError(true);
                        }
                    }}
                    id="saveButton">Save</button>

                <button 
                    onClick={onClose}
                    id="cancelButton">Cancel</button>
            </div>

            <div id="modalBackDrop">

            </div>
        </div>
    )
}
export default NewEventModal;