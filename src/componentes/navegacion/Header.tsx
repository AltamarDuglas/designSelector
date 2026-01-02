import { Link } from 'react-router-dom';
import './Header.css';

export default function Header() {
    return (
        <header className="header-navegacion">
            <div className="contenedor-header">
                <Link to="/" className="logo">
                    ✨ Sublimación
                </Link>

                <nav className="nav-principal">
                    <Link to="/" className="nav-link">Inicio</Link>
                    <Link to="/tienda" className="nav-link">Tienda</Link>
                    <Link to="/disenador" className="nav-link">Diseñador</Link>
                </nav>
            </div>
        </header>
    );
}
