import { useState, useRef } from "react";
import { getClassification } from "../Api/getData";

export function BreedCow() {
    return (
        <>
            <div className="container-fluid banner my-5 py-5" data-parallax="scroll" data-image-src="img/banner.jpg">
                <div className="container py-5">
                    <div className="row g-5">
                        <div className="col-lg-4 wow fadeIn" data-wow-delay="0.3s">
                            <div className="row g-4 align-items-center">
                                <div className="col-sm-4">
                                    <img className="img-fluid rounded" src="img/angus.jpg" />
                                </div>
                                <div className="col-sm-8">
                                    <h2 className="text-white mb-3">Angus</h2>
                                    <a className="btn btn-secondary rounded-pill py-2 px-4" href="https://es.wikipedia.org/wiki/Aberdeen_angus">Mas info</a>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 wow fadeIn" data-wow-delay="0.5s">
                            <div className="row g-4 align-items-center">
                                <div className="col-sm-4">
                                    <img className="img-fluid rounded" src="img/holstein.jpg" />
                                </div>
                                <div className="col-sm-8">
                                    <h2 className="text-white mb-3">Holstein</h2>
                                    <a className="btn btn-secondary rounded-pill py-2 px-4" href="https://es.wikipedia.org/wiki/Holstein_(raza_bovina)">Mas info</a>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 wow fadeIn" data-wow-delay="0.5s">
                            <div className="row g-4 align-items-center">
                                <div className="col-sm-4">
                                    <img className="img-fluid rounded" src="img/Simmental.jpg" />
                                </div>
                                <div className="col-sm-8">
                                    <h2 className="text-white mb-3">Simmental</h2>
                                    <a className="btn btn-secondary rounded-pill py-2 px-4" href="https://es.wikipedia.org/wiki/Simmental_(raza_bovina)">Mas info</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}


export function ClassificationStart() {
    const [img, setImg] = useState('');
    const inputFile = useRef();
    const [resultName, setResultName] = useState('');
    const [resultAccuracy, setResultAccuracy] = useState('');
    const uploadImg = async (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = async (e) => {
                setImg(e.target.result);
                const response = await getClassification(file);
                console.log(response);
                const arrayClasify = response.predictions;
                for (const element of arrayClasify) {
                    if (element.probability >= 0.95) {
                        const roundedProbability = (element.probability * 100).toFixed(2);
                        setResultName(element.tagName);
                        setResultAccuracy(roundedProbability);
                    }
                }
            };
            reader.readAsDataURL(file);
        }
    }

    const clear = () => {
        setImg('');
        inputFile.current.value = "";
    }

    return (
        <>
            <div className="container-xxl py-5">
                <div className="container">
                    <div className="text-center mx-auto wow fadeInUp" data-wow-delay="0.1s" style={{ maxWidth: 500 }}>
                        <p className="section-title bg-white text-center text-primary px-3">Bienvenido al Identificador de Razas de Vaca</p>
                        <h1 className="mb-5">Identificación de Razas</h1>
                    </div>
                    <div id="s_formulario" className="row g-5 text-center">
                        <div className="col-lg-6 wow fadeInUp mx-auto" data-wow-delay="0.1s">
                            <p className="mb-4"><b>Cargue una imagen de una vaca para identificar su raza.</b></p>

                            <div className="row g-3">
                                <div className="col-md-12">
                                    <div className="form-floating">
                                        <input type="file" ref={inputFile} className="form-control" accept="image/*" onChange={uploadImg} />
                                        <label htmlFor="">Cargue la imagen de la vaca a identificar</label>
                                    </div>
                                </div>

                                <div className="col-12">
                                    <div className="position-relative mt-5">
                                        <div id="image-container" className="form-floating">
                                            {img && <img className="img-fluid" src={img} alt="" />}
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="text-center mx-auto wow fadeInUp" data-wow-delay="0.1s" style={{ maxWidth: 500 }}>
                                        {resultName && <h2 className="section-title bg-white text-center text-primary px-3">Raza identificada: <b>{resultName}</b></h2>} 
                                        {resultAccuracy && <span className="section-title bg-white text-center text-primary px-3">Presición: <b>{resultAccuracy}</b>%</span>} 
                                    </div>
                                </div>
                                <div className="col-12">
                                    <button className="btn btn-secondary rounded-pill py-3 px-5" type="button" onClick={clear}>Limpiar Datos</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}




