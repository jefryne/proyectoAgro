import { useState } from "react";

export function About() {
    return (
        <>
            <div id="s_experiencia" className="container-xxl py-5">
                <div className="container">
                    <div className="row g-5 align-items-end">
                        <div className="col-lg-6">
                            <div className="row g-2">
                                <div className="col-6 position-relative wow fadeIn" data-wow-delay="0.7s">
                                    <div className="about-experience bg-secondary rounded">
                                        <h1 className="display-1 mb-0">25</h1>
                                        <small className="fs-5 fw-bold">Años de experiencia</small>
                                    </div>
                                </div>
                                <div className="col-6 wow fadeIn" data-wow-delay="0.1s">
                                    <img className="img-fluid rounded" src="img/service-1.jpg" />
                                </div>
                                <div className="col-6 wow fadeIn" data-wow-delay="0.3s">
                                    <img className="img-fluid rounded" src="img/service-2.jpg" />
                                </div>
                                <div className="col-6 wow fadeIn" data-wow-delay="0.5s">
                                    <img className="img-fluid rounded" src="img/service-3.jpg" />
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 wow fadeIn" data-wow-delay="0.5s">
                            <p className="section-title bg-white text-start text-primary pe-3">Quiénes somos?</p>
                            <h1 className="mb-4">Conozca nuestra granja lechera y Nuestra historia.</h1>
                            <p className="mb-4">El tiempo era selecto, una cosa extraordinaria y famosa. El dolor era diamante, simplemente dolor en sí mismo. Algunas veces, el dolor era tanto para ellos como para otros. Era famoso, tanto en la mente como en el asiento, pero permanecía sentado, el par de fama justo, grande y dolorosamente magnífico.</p>
                            <div className="row g-5 pt-2 mb-5">
                                <div className="col-sm-6">
                                    <img className="img-fluid mb-4" src="img/service.png"  />
                                    <h5 className="mb-3">Servicios dedicados</h5>
                                    <span>Con cosechas de calidad y cuidado animal, creamos la base de una producción sostenible para un futuro mejor.</span>
                                </div>
                                <div className="col-sm-6">
                                    <img className="img-fluid mb-4" src="img/product.png"  />
                                    <h5 className="mb-3">Organic Products</h5>
                                    <span>Con dedicación y pasión por la tierra, cultivamos el futuro que alimenta al mundo.</span>
                                </div>
                            </div>
                            <button className="btn btn-secondary rounded-pill py-3 px-5">Explorar más</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export function Carousel() {
    return (
        <>
            <div id="s_reciclaje" className="container-fluid px-0 mb-5">
                <div id="header-carousel" className="carousel slide" data-bs-ride="carousel">
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img className="w-100" src="img/carousel-1.jpg" alt="Image" />
                            <div className="carousel-caption">
                                <div className="container">
                                    <div className="row justify-content-start">
                                        <div className="col-lg-8 text-start">
                                            <p className="fs-4 text-white">Bienvenido a nuestra granja lechera</p>
                                            <h1 className="display-1 text-white mb-5 animated slideInRight">La Granja de Productos Lácteos</h1>
                                            <button  className="btn btn-secondary rounded-pill py-3 px-5 animated slideInRight">Explorar Más</button>


                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="carousel-item">
                            <img className="w-100" src="img/carousel-2.jpg" alt="Image" />
                            <div className="carousel-caption">
                                <div className="container">
                                    <div className="row justify-content-end">
                                        <div className="col-lg-8 text-end">
                                            <p className="fs-4 text-white">Bienvenido a nuestra granja lechera</p>
                                            <h1 className="display-1 text-white mb-5 animated slideInRight">Mejores Productos Lácteos Orgánicos</h1>
                                            <button  className="btn btn-secondary rounded-pill py-3 px-5 animated slideInLeft">Explorar más</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#header-carousel" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true" />
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#header-carousel" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true" />
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </div>
        </>
    )
}

export function Features() {
    const [clicked,setClicked] = useState(0);
    const click = () => {
        setClicked(clicked +1);
    }
    return (
        <>
            <div id="s_estadisticas" className="container-xxl py-5">
                <div className="container">
                    <div className="row g-5 align-items-center">
                        <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.1s">
                        <p className="section-title bg-white text-start text-primary pe-3">¡Por qué elegirnos!</p>
                        <h1 className="mb-4">Algunas Razones Por las Que la Gente nos Elige</h1>
                        <p className="mb-4">Con dedicación y calidad, creamos una experiencia única. Ofrecemos productos de primera calidad y servicio excepcional para satisfacer tus necesidades.</p>
                        <p><i className="fa fa-check text-primary me-3" />Calidad excepcional</p>
                        <p><i className="fa fa-check text-primary me-3" />Productos de alta calidad</p>
                        <p><i className="fa fa-check text-primary me-3" />Experiencia única y dedicada</p>
                        <p><i className="fa fa-check text-primary me-3" />{clicked}</p>
                        <button className="btn btn-secondary rounded-pill py-3 px-5 mt-3" onClick={click}>Explorar más</button>

                        </div>
                        <div className="col-lg-6">
                            <div className="rounded overflow-hidden">
                                <div className="row g-0">
                                    <div className="col-sm-6 wow fadeIn" data-wow-delay="0.1s">
                                        <div className="text-center bg-primary py-5 px-4">
                                            <img className="img-fluid mb-4" src="img/experience.png" />
                                            <h1 className="display-6 text-white" data-toggle="counter-up">25</h1>
                                            <span className="fs-5 fw-semi-bold text-secondary">Años de Experiencia</span>
                                        </div>
                                    </div> 
                                    <div className="col-sm-6 wow fadeIn" data-wow-delay="0.3s">
                                        <div className="text-center bg-secondary py-5 px-4">
                                            <img className="img-fluid mb-4" src="img/award.png" />
                                            <h1 className="display-6" data-toggle="counter-up">183</h1>
                                            <span className="fs-5 fw-semi-bold text-primary">Premiado</span>
                                        </div>
                                    </div>
                                    <div className="col-sm-6 wow fadeIn" data-wow-delay="0.5s">
                                        <div className="text-center bg-secondary py-5 px-4">
                                            <img className="img-fluid mb-4" src="img/animal.png" />
                                            <h1 className="display-6" data-toggle="counter-up">2619</h1>
                                            <span className="fs-5 fw-semi-bold text-primary">Total de animales</span>
                                        </div>
                                    </div>
                                    <div className="col-sm-6 wow fadeIn" data-wow-delay="0.7s">
                                        <div className="text-center bg-primary py-5 px-4">
                                            <img className="img-fluid mb-4" src="img/client.png" />
                                            <h1 className="display-6 text-white" data-toggle="counter-up">51940</h1>
                                            <span className="fs-5 fw-semi-bold text-secondary">Clientes felices</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export function Service() {
    return (
        <div id="s_analisis" className="container-xxl py-5">
            <div className="container">
                <div className="text-center mx-auto pb-4 wow fadeInUp" data-wow-delay="0.1s" style={{ maxWidth: 500 }}>
                <p className="section-title bg-white text-center text-primary px-3">Nuestros Servicios</p>
                <h1 className="mb-5">Servicios Que Ofrecemos Para Emprendedores</h1>
                </div>
                <div className="row gy-5 gx-4">
                    <div className="col-lg-4 col-md-6 pt-5 wow fadeInUp" data-wow-delay="0.1s">
                        <div className="service-item d-flex h-100">
                            <div className="service-img">
                                <img className="img-fluid" src="img/service-1.jpg" />
                            </div>
                            <div className="service-text p-5 pt-0">
                                <div className="service-icon">
                                    <img className="img-fluid rounded-circle" src="img/service-1.jpg"  />
                                </div>
                                <h5 className="mb-3">Mejor Selección de Animales</h5>
                                <p className="mb-4">Ofrecemos una selección cuidada de animales, con estándares de calidad elevados y compromiso con su bienestar.</p>

                                <a className="btn btn-square rounded-circle" ><i className="bi bi-chevron-double-right" /></a>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6 pt-5 wow fadeInUp" data-wow-delay="0.3s">
                        <div className="service-item d-flex h-100">
                            <div className="service-img">
                                <img className="img-fluid" src="img/service-2.jpg"  />
                            </div>
                            <div className="service-text p-5 pt-0">
                                <div className="service-icon">
                                    <img className="img-fluid rounded-circle" src="img/service-2.jpg"  />
                                </div>
                                <h5 className="mb-3">Reproducción y Veterinaria</h5>
                                <p className="mb-4">Nos especializamos en servicios de reproducción y cuidado veterinario, brindando atención integral a los animales.</p>

                                <a className="btn btn-square rounded-circle" ><i className="bi bi-chevron-double-right" /></a>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6 pt-5 wow fadeInUp" data-wow-delay="0.5s">
                        <div className="service-item d-flex h-100">
                            <div className="service-img">
                                <img className="img-fluid" src="img/service-3.jpg"  />
                            </div>
                            <div className="service-text p-5 pt-0">
                                <div className="service-icon">
                                    <img className="img-fluid rounded-circle" src="img/service-3.jpg"  />
                                </div>
                                <h5 className="mb-3">Cuidado y Ordeño</h5>
                                <p className="mb-4">Nos preocupamos por el bienestar de los animales y llevamos a cabo procesos de ordeño con estándares de calidad superiores.</p>

                                <a className="btn btn-square rounded-circle" ><i className="bi bi-chevron-double-right" /></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}