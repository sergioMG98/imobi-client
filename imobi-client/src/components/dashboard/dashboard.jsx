import "./dashboard.css";

function Dashboard(){
    return(
        <div className="dashboard">
            <div className="dashboardNav">
                <div className="logo dashLink">imobi</div>
                
                <div>
                    <div className="product dashLink">product</div>
                    <div className="postProduct dashLink">post product</div>
                    <div className="agenda dashLink">agenda</div>
                    <div className="contact dashLink">contact</div>  
                </div>

                <div>
                    <div className="logout dashLink">se deconnecter</div>
                    <div className="parametre dashLink">parametre</div>
                </div>

            </div>
        </div>
    )
}
export default Dashboard;