import { getDetection } from "../Api/getData"
import {  useState,useRef } from "react"

export const ContactStart = () => {
    const [img,setImg] = useState('');
    const [detections, setDetections] = useState([]);
    const inputFile = useRef();

    const uploadImg = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = async (e) => {
                setImg(e.target.result);
                const response = await getDetection(file);
                console.log(response);
                const arrayPrediction = response.predictions;
                arrayPrediction.forEach(element => {
                    if (element.probability > 0.90) {
                        const newDetection = {
                            color: "red",
                            left: element.boundingBox.left,
                            top: element.boundingBox.top,
                            width: element.boundingBox.width,
                            height: element.boundingBox.height,
                            border: "2px solid red",
                            nombre: element.tagName,
                        };
                
                        // Usamos el segundo argumento de setDetections para obtener el valor actualizado
                        setDetections(prevDetections => [...prevDetections, newDetection]);
                
                        // Imprime el arreglo de detecciones actualizado en la consola
                        //console.log("Detecciones:", [...detections, newDetection]);
                    }
                });
                
            };
            reader.readAsDataURL(file);
        }
    }

    const clear = () => {
        setImg('');
        inputFile.current.value = "";
        setDetections([]);
    }
    return (
        <>
            <div className="container-xxl py-5">
                <div className="container">
                    <div className="text-center mx-auto wow fadeInUp" data-wow-delay="0.1s" style={{ maxWidth: 500 }}>
                        <p className="section-title bg-white text-center text-primary px-3">Contact Us</p>
                        <h1 className="mb-5">If You Have Any Query, Please Contact Us</h1>
                    </div>
                    <div className="row g-5">
                        <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.1s">
                            <h3 className="mb-4">Need a functional contact form?</h3>
                            <p className="mb-4">The contact form is currently inactive. Get a functional and working contact form with Ajax &amp; PHP in a few minutes. Just copy and paste the files, add a little code and you're done. <a href="https://htmlcodex.com/contact-form">Download Now</a>.</p>
                            <form>
                                <div className="row g-3">
                                    <div className="col-md-12">
                                        <div className="form-floating">
                                            <input type="file" ref={inputFile} className="form-control" accept="image/*" onChange={uploadImg} />
                                            <label htmlFor="">IMAGEN A DETECTAR</label>
                                        </div>
                                    </div>
                                    
                                    <div className="col-12">

                                        <div className="position-relative mt-5">
                                            <div id="image-container" className="form-floating">
                                                {img && <img className="img-fluid" src={img} alt="" />}
                                                 {detections.map((item, index) => (
                                                    <ObjectDetec
                                                    key={index}
                                                    color={item.color}
                                                    left={item.left}
                                                    top={item.top}
                                                    width={item.width}
                                                    height={item.height}
                                                    border={item.border}
                                                    nombre={item.nombre}
                                                    />
                                                ))}
                                                    
                                            </div>
                                        </div>
                                        
                                    </div>
                                    <div className="col-12">
                                        <button className="btn btn-secondary rounded-pill py-3 px-5" type="button" onClick={clear}>Limpiar</button>
                                    </div>
                                    
                                </div>
                            </form>
                        </div>
                        <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.5s">
                            <h3 className="mb-4">Contact Details</h3>
                            <div className="d-flex border-bottom pb-3 mb-3">
                                <div className="flex-shrink-0 btn-square bg-secondary rounded-circle">
                                    <i className="fa fa-map-marker-alt text-body" />
                                </div>
                                <div className="d-flex border-bottom pb-3 mb-3">
                                    <div className="flex-shrink-0 btn-square bg-secondary rounded-circle">
                                        <i className="fa fa-map-marker-alt text-body" />
                                    </div>
                                </div>
                                <div className="ms-3">
                                    <h6>Our Office</h6>
                                    <span>123 Street, New York, USA</span>
                                </div>
                            </div>
                            <div className="d-flex border-bottom pb-3 mb-3">
                                <div className="flex-shrink-0 btn-square bg-secondary rounded-circle">
                                    <i className="fa fa-phone-alt text-body" />
                                </div>
                                <div className="ms-3">
                                    <h6>Call Us</h6>
                                    <span>+012 345 67890</span>
                                </div>
                            </div>
                            <div className="d-flex border-bottom-0 pb-3 mb-3">
                                <div className="flex-shrink-0 btn-square bg-secondary rounded-circle">
                                    <i className="fa fa-envelope text-body" />
                                </div>
                                <div className="ms-3">
                                    <h6>Mail Us</h6>
                                    <span>info@example.com</span>
                                </div>
                            </div>
                            <iframe className="w-100 rounded" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3001156.4288297426!2d-78.01371936852176!3d42.72876761954724!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4ccc4bf0f123a5a9%3A0xddcfc6c1de189567!2sNew%20York%2C%20USA!5e0!3m2!1sen!2sbd!4v1603794290143!5m2!1sen!2sbd" frameBorder={0} style={{ minHeight: 300, border: 0 }} allowFullScreen aria-hidden="false" tabIndex={0} />
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export function ObjectDetec(props) {
  return (
    <>
        <div>
            <div className="position-absolute" style={{color:props.color, left:`${(props.left) * 100}%`, top:`${(props.top) * 100}%`, width:`${(props.width) * 100}%`, height:`${(props.height) * 100}%`, border:props.border}}> <b>{props.nombre}</b></div>
        </div>
    </>
  )
}


export const HeaderContact = () => {
    return (
        <>
            <div className="container-fluid page-header py-5 mb-5 wow fadeIn" data-wow-delay="0.1s">
                <div className="container text-center py-5">
                    <h1 className="display-3 text-white mb-4 animated slideInDown">Contact</h1>
                </div>
            </div>
        </>
    )
}

