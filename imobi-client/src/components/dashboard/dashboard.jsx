import "./dashboard.css";
import AddProduct from "./addProduct/AddProduct";
import { Link } from "react-router-dom";
function Dashboard(){
    return(
        <div className="dashboard">
            <div className="dashboardNav">
                <div className="logo dashLink">imobi</div>
                
                <div>
                    <Link className="product dashLink" to={'/product'}>product</Link>
                    <Link className="dashLink" to={'/addProduct'}>Add Product</Link>
                    <Link className="agenda dashLink" to={'/calendar'}>agenda</Link>
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