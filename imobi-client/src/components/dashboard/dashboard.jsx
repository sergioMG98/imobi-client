import "./dashboard.css";
import AddProduct from "./addProduct/AddProduct";
import { Link } from "react-router-dom";
function Dashboard(){
    return(
        <div className="dashboard">
            <div className="dashboardNav">
                <div className="logo dashLink">imobi</div>
                <div className="profil">
                    <Link className="dashLink profil" to={`${import.meta.env.VITE_API_URL30}`}>profil</Link>
                </div>
                
                <div>
                    <Link className="product dashLink" to={`${import.meta.env.VITE_API_URL22}`}>product</Link>
                    <Link className="dashLink" to={`${import.meta.env.VITE_API_URL23}`}>Add Product</Link>
                    <Link className="agenda dashLink" to={`${import.meta.env.VITE_API_URL28}`}>agenda</Link>
                    <Link className="contact dashLink" to={`${import.meta.env.VITE_API_URL29}`}>contact</Link>
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