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
                                        <small className="fs-5 fw-bold">Years Experience</small>
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
                            <p className="section-title bg-white text-start text-primary pe-3">About Us</p>
                            <h1 className="mb-4">Know About Our Dairy Farm &amp; Our History</h1>
                            <p className="mb-4">Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit. Aliqu diam amet diam et eos. Clita erat ipsum et lorem et sit, sed stet lorem sit clita duo justo magna dolore erat amet</p>
                            <div className="row g-5 pt-2 mb-5">
                                <div className="col-sm-6">
                                    <img className="img-fluid mb-4" src="img/service.png"  />
                                    <h5 className="mb-3">Dedicated Services</h5>
                                    <span>Clita erat ipsum et lorem et sit, sed stet lorem sit clita</span>
                                </div>
                                <div className="col-sm-6">
                                    <img className="img-fluid mb-4" src="img/product.png"  />
                                    <h5 className="mb-3">Organic Products</h5>
                                    <span>Clita erat ipsum et lorem et sit, sed stet lorem sit clita</span>
                                </div>
                            </div>
                            <button className="btn btn-secondary rounded-pill py-3 px-5">Explore More</button>
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
                                            <p className="fs-4 text-white">Welcome to our dairy farm</p>
                                            <h1 className="display-1 text-white mb-5 animated slideInRight">The Farm of Dairy products</h1>
                                            <button  className="btn btn-secondary rounded-pill py-3 px-5 animated slideInRight">Explore More</button>
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
                                            <p className="fs-4 text-white">Welcome to our dairy farm</p>
                                            <h1 className="display-1 text-white mb-5 animated slideInRight">Best Organic Dairy Products</h1>
                                            <button  className="btn btn-secondary rounded-pill py-3 px-5 animated slideInLeft">Explore More</button>
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
                            <p className="section-title bg-white text-start text-primary pe-3">Why Us!</p>
                            <h1 className="mb-4">Few Reasons Why People Choosing Us!</h1>
                            <p className="mb-4">Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit. Aliqu diam amet diam et eos. Clita erat ipsum et lorem et sit, sed stet lorem sit clita duo justo magna dolore erat amet</p>
                            <p><i className="fa fa-check text-primary me-3" />Justo magna erat amet</p>
                            <p><i className="fa fa-check text-primary me-3" />Aliqu diam amet diam et eos</p>
                            <p><i className="fa fa-check text-primary me-3" />Clita erat ipsum et lorem et sit</p>
                            <p><i className="fa fa-check text-primary me-3" />{clicked}</p>
                            <button className="btn btn-secondary rounded-pill py-3 px-5 mt-3" onClick={click}>Explore More</button>
                        </div>
                        <div className="col-lg-6">
                            <div className="rounded overflow-hidden">
                                <div className="row g-0">
                                    <div className="col-sm-6 wow fadeIn" data-wow-delay="0.1s">
                                        <div className="text-center bg-primary py-5 px-4">
                                            <img className="img-fluid mb-4" src="img/experience.png" />
                                            <h1 className="display-6 text-white" data-toggle="counter-up">25</h1>
                                            <span className="fs-5 fw-semi-bold text-secondary">Years Experience</span>
                                        </div>
                                    </div> 
                                    <div className="col-sm-6 wow fadeIn" data-wow-delay="0.3s">
                                        <div className="text-center bg-secondary py-5 px-4">
                                            <img className="img-fluid mb-4" src="img/award.png" />
                                            <h1 className="display-6" data-toggle="counter-up">183</h1>
                                            <span className="fs-5 fw-semi-bold text-primary">Award Winning</span>
                                        </div>
                                    </div>
                                    <div className="col-sm-6 wow fadeIn" data-wow-delay="0.5s">
                                        <div className="text-center bg-secondary py-5 px-4">
                                            <img className="img-fluid mb-4" src="img/animal.png" />
                                            <h1 className="display-6" data-toggle="counter-up">2619</h1>
                                            <span className="fs-5 fw-semi-bold text-primary">Total Animals</span>
                                        </div>
                                    </div>
                                    <div className="col-sm-6 wow fadeIn" data-wow-delay="0.7s">
                                        <div className="text-center bg-primary py-5 px-4">
                                            <img className="img-fluid mb-4" src="img/client.png" />
                                            <h1 className="display-6 text-white" data-toggle="counter-up">51940</h1>
                                            <span className="fs-5 fw-semi-bold text-secondary">Happy Clients</span>
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
                    <p className="section-title bg-white text-center text-primary px-3">Our Services</p>
                    <h1 className="mb-5">Services That We Offer For Entrepreneurs</h1>
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
                                <h5 className="mb-3">Best Animal Selection</h5>
                                <p className="mb-4">Erat ipsum justo amet duo et elitr dolor, est duo duo eos lorem sed diam stet diam sed stet.</p>
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
                                <h5 className="mb-3">Breeding &amp; Veterinary</h5>
                                <p className="mb-4">Erat ipsum justo amet duo et elitr dolor, est duo duo eos lorem sed diam stet diam sed stet.</p>
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
                                <h5 className="mb-3">Care &amp; Milking</h5>
                                <p className="mb-4">Erat ipsum justo amet duo et elitr dolor, est duo duo eos lorem sed diam stet diam sed stet.</p>
                                <a className="btn btn-square rounded-circle" ><i className="bi bi-chevron-double-right" /></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}