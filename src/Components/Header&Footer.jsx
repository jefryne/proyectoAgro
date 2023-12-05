import { useRef } from 'react';
import { Link } from 'react-router-dom';

const link = [
    {
        name: "Inicio",
        href: "/",
    },
    {
        name: "Contacto",
        href: "/contact",
    },
    {
        name: "Integrantes",
        href: "/team",
    },
    {
        name: "clasificacion",
        href: "/classification",
    },
    {
        name: "Technology",
        href: "/technology",
    },
];
export function Nav() {
    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-white navbar-light sticky-top px-4 px-lg-5">
                <Link to="/" className="navbar-brand d-flex align-items-center">
                    <h1 className="m-0">Lechero</h1>
                </Link>
                <button className="navbar-toggler me-0" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbarCollapse">
                    <div className="navbar-nav ms-auto p-4 p-lg-0">
                        {link.map((link, index) => (
                            <Link key={index} className='nav-item nav-link' to={link.href}>{link.name}</Link>
                        ))}
                    </div>
                    <div className="border-start ps-4 d-none d-lg-block">
                        <button className="btn btn-sm p-0"><i className="fa fa-search" /></button>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export function Footer() {
    const refInfo = useRef();
    const pressed = (e) => {
        refInfo.current.textContent = e.target.value;
    }
    return (
        <>
            <div id="s_pie" className="container-fluid bg-dark footer mt-5 py-5 wow fadeIn" data-wow-delay="0.1s">
                <div className="container py-5">
                    <div className="row g-5">
                        <div className="col-lg-3 col-md-6">
                            <h5 className="text-white mb-4">Nuestra Oficina</h5>
                            <p className="mb-2"><i className="fa fa-map-marker-alt me-3" />123 Calle, Nueva York, USA</p>
                            <p className="mb-2"><i className="fa fa-phone-alt me-3" />+012 345 67890</p>
                            <p className="mb-2"><i className="fa fa-envelope me-3" />info@example.com</p>
                            <div className="d-flex pt-3">
                                <button className="btn btn-square btn-secondary rounded-circle me-2"><i className="fab fa-twitter" /></button>
                                <button className="btn btn-square btn-secondary rounded-circle me-2"><i className="fab fa-facebook-f" /></button>
                                <button className="btn btn-square btn-secondary rounded-circle me-2"><i className="fab fa-youtube" /></button>
                                <button className="btn btn-square btn-secondary rounded-circle me-2"><i className="fab fa-linkedin-in" /></button>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <h5 className="text-white mb-4">Enlaces Rápidos</h5>
                            <button className="btn btn-link">Acerca de Nosotros</button>
                            <button className="btn btn-link">Contáctanos</button>
                            <button className="btn btn-link">Nuestros Servicios</button>
                            <button className="btn btn-link">Términos y Condiciones</button>
                            <button className="btn btn-link">Soporte</button>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <h5 className="text-white mb-4">Horario de Atención</h5>
                            <p className="mb-1">Lunes - Viernes</p>
                            <h6 className="text-light">09:00 am - 07:00 pm</h6>
                            <p className="mb-1">Sábado</p>
                            <h6 className="text-light">09:00 am - 12:00 pm</h6>
                            <p className="mb-1">Domingo</p>
                            <h6 className="text-light">Cerrado</h6>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <h5 className="text-white mb-4">Boletín Informativo</h5>
                            <p ref={refInfo}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                            <div className="position-relative w-100">
                                <input className="form-control bg-transparent w-100 py-3 ps-4 pe-5" onChange={pressed} type="text" placeholder="Tu email" />
                                <button type="button" className="btn btn-secondary py-2 position-absolute top-0 end-0 mt-2 me-2">Suscribirse</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
