import { getDetection } from "../Api/getData";
import { useState, useRef } from "react";

export const ContactStart = () => {
    const [img, setImg] = useState('');
    const [detections, setDetections] = useState([]);
    const inputFile = useRef();

    const uploadImg = async (event) => {
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

                        setDetections(prevDetections => [...prevDetections, newDetection]);
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
    };

    return (
        <>
            <div className="container-xxl py-5">
                <div className="container">
                    <div className="text-center mx-auto wow fadeInUp" data-wow-delay="0.1s" style={{ maxWidth: 500 }}>
                        <p className="section-title bg-white text-center text-primary px-3">Detalles de la Aplicación</p>
                        <h1 className="mb-5">Clasificador de Basura</h1>
                    </div>
                    <div className="row g-5 text-center">
                        <div className="col-lg-6 wow fadeInUp mx-auto" data-wow-delay="0.1s">
                            <p className="mb-4"><b>Utiliza nuestro clasificador de basura para identificar el tipo de basura en una imagen y determinar el contenedor adecuado.</b></p>

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
                                {/* TODAVIA FALTAN COSITAS */}
                                <div className="row mt-5">
                                    <h4>Contenedor adecuado:</h4>
                                    <div className="col-4">
                                        <img className="img-fluid" src="img/contenedor-gris.jpg" alt="" />
                                    </div>
                                    <div className="col-4">
                                        <img className="img-fluid" src="img/contenedor-azul.jpg" alt="" />
                                    </div>
                                    <div className="col-4">
                                        <img className="img-fluid" src="img/contenedor-verde.jpg" alt="" />
                                    </div>
                                </div>
                                <div className="col-12">
                                    <button className="btn btn-secondary rounded-pill py-3 px-5" type="button" onClick={clear}>Limpiar</button>
                                </div>
                            </div>
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
                <div className="position-absolute" style={{ color: props.color, left: `${(props.left) * 100}%`, top: `${(props.top) * 100}%`, width: `${(props.width) * 100}%`, height: `${(props.height) * 100}%`, border: props.border }}> <b>{props.nombre}</b></div>
            </div>
        </>
    )
}

export const HeaderContact = () => {
    return (
        <>
            <div className="container-fluid page-header py-5 mb-5 wow fadeIn" data-wow-delay="0.1s">
                <div className="container text-center py-5 m-5">
                    <h1 className="display-5 m-5 animated slideInDown mt-4"></h1>
                </div>
            </div>
        </>
    )
}
