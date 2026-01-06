import "./gallery.css";
import "../DashboardComponents.css";
import { useState } from "react";

export const GalleryForm = () => {
    let [galleryImgs, setGalleryImgs] = useState([
        "https://images.pexels.com/photos/18272659/pexels-photo-18272659.jpeg"
    ]);

    const handleImgUpload = (e, index) => {
        const file = e.target.files[0];
        if (file) {
            let updatedArr = [...galleryImgs];
            updatedArr[index] = URL.createObjectURL(file);
            setGalleryImgs(updatedArr);
        }
    };

    const IncreaseTheImg = () => {

    }

    return (
        <section className="form-area">
            <h2>Gallery</h2>

            <div className="dshbrdGalryImgsheadCont">
                {galleryImgs.map((v, i) => {
                    const inputId = `hiddenFileField-${i}`;

                    return (
                        <div className="dshbrdGalryImgCont" key={i}>
                            <img src={v} className="dshbrdGalryImg" />

                            <div className="dshbordGalryImgGlassLyr">
                                <label
                                    htmlFor={inputId}
                                    className="dshbordGalryImgAdder"
                                >
                                    +
                                </label>

                                <input
                                    type="file"
                                    id={inputId}
                                    hidden
                                    onChange={(e) => handleImgUpload(e, i)}
                                />
                            </div>
                        </div>
                    );
                })}
                <div className="GalryCrdIncreaserCrd">
                    <span className="dshbordGalryImgAdder" onClick={() => IncreaseTheImg}>
                        +
                    </span>
                </div>
            </div>

            <div className="form-actions">
                <button className="save-btn">Save</button>
            </div>
        </section>
    );
};


































































// import "./gallery.css";
// import "../DashboardComponents.css";
// import { useState } from "react";

// export const GalleryForm = () => {
//     let [crdsNum, setCrdsNum] = useState(6)
//     let galleryImgs = {
//         1: "https://images.pexels.com/photos/18272659/pexels-photo-18272659.jpeg",
//         2: "https://images.pexels.com/photos/18272659/pexels-photo-18272659.jpeg",
//         3: "https://images.pexels.com/photos/18272659/pexels-photo-18272659.jpeg",
//         4: "https://images.pexels.com/photos/18272659/pexels-photo-18272659.jpeg",
//         5: "https://images.pexels.com/photos/18272659/pexels-photo-18272659.jpeg",
//         6: "https://images.pexels.com/photos/18272659/pexels-photo-18272659.jpeg"
//     };
//     let images = [];
//     for (const key in galleryImgs) {
//         images.push(
//             <div className="dshbrdGalryImgCont">
//                 <img src={galleryImgs[key]} className="dshbrdGalryImg" />
//                 <div className="dshbordGalryImgGlassLyr">
//                     <label htmlFor="hiddenFileField" className="dshbordGalryImgAdder">
//                         +
//                     </label>
//                     <input
//                         type="file"
//                         id="hiddenFileField"
//                         onChange={(e) => { handleImgUpload(e.target.files[0], key) }}
//                     />
//                 </div>
//             </div>
//         )
//     }

//     const handleImgUpload = (file, indx) => {
//         console.log(indx);
//     }

//     return (
//         <section className="form-area">
//             <h2>Gallery</h2>
//             <p className="addressingPara galleryAdrsPara">It's recommended to add atleast 06 images to your survice gallery.</p>
//             <div className="dshbrdGalryImgsheadCont">
//                 {images}
//                 <div className="GalryCrdIncreaserCrd">
//                     <span className="dshbordGalryImgAdder" onClick={() => setCrdsNum(crdsNum + 1)}>
//                         +
//                     </span>
//                 </div>
//             </div>
//             <div className="form-actions">
//                 <button className="save-btn" >Save</button>
//             </div>
//         </section>
//     )
// }