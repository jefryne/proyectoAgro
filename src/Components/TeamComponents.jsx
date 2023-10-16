export function TeamStart() {
    return(
        <>
            <div className="container-xxl py-5">
                <div className="container">
                    <div className="text-center mx-auto wow fadeInUp" data-wow-delay="0.1s" style={{ maxWidth: 500 }}>
                        <p className="section-title bg-white text-center text-primary px-3">Our Team</p>
                        <h1 className="mb-5">Experienced Team Members</h1>
                    </div>
                    <div className="row g-4">
                        <CardTeam name="Jeffry" img="img/team-1.jpg" skill="Full Stack" delay="0.1s"/>
                        <CardTeam name="Julian" img="img/team-2.jpg" skill="Full Stack" delay="0.3s"/>
                        <CardTeam name="Winder" img="img/team-3.jpg" skill="Full Stack" delay="0.5s"/>
                    </div>
                </div>
            </div>
        </>
    )
}

export function CardTeam(props) {
    return (
        <>
            <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay={props.delay}>
                <div className="team-item rounded p-4">
                    <img className="img-fluid rounded mb-4" src={props.img}  />
                    <h5>{props.name}</h5>
                    <p className="text-primary">{props.skill}</p>
                    <div className="d-flex justify-content-center">
                        <a className="btn btn-square btn-outline-secondary rounded-circle mx-1" href><i className="fab fa-facebook-f" /></a>
                        <a className="btn btn-square btn-outline-secondary rounded-circle mx-1" href><i className="fab fa-twitter" /></a>
                        <a className="btn btn-square btn-outline-secondary rounded-circle mx-1" href><i className="fab fa-instagram" /></a>
                    </div>
                </div>
            </div>  
        </>
    )
}
