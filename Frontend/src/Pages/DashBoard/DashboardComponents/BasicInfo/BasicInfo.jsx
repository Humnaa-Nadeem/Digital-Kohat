import { useState } from "react";
import "./BasicInfo.css";
import "../DashboardComponents.css";
export const BasicInfoForm = () => {
    let [formData, setFormData] = useState({
        banner: "https://images.pexels.com/photos/18272659/pexels-photo-18272659.jpeg",
        tagline: "",
        about: "",
        aboutImg: "https://images.pexels.com/photos/18272659/pexels-photo-18272659.jpeg"
    });

    const handleBannerUpload = (file, place) => {
        if (file) {
            let NewImg = URL.createObjectURL(file);
            setFormData({ ...formData, [place]: NewImg });
        }
    };

    const handleInputChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setFormData(({ ...formData, [name]: value }));
    }

    return (
        <section className="form-area">
            <h2>Basic Info</h2>
            <div className="form-group">
                <label htmlFor="hiddenFileField" className="placeholder imageCont">
                    <input
                        type="file"
                        id="hiddenFileField"
                        onChange={(e) => { handleBannerUpload(e.target.files[0], "banner") }}
                    />
                    <img
                        src={formData.banner}
                        alt="School Banner"
                        className="bannerImage"
                    />
                    <span className="pluseAndChangeText">
                        <p className="pluseIcn">+</p>
                        <i className="changeText">Change Banner</i>
                    </span>
                </label>
            </div>
            <div className="form-group">
                <label>About School</label>
                <div className="aboutTextareaAndImg">
                    <textarea
                        value={formData.about}
                        name="about"
                        onChange={e => handleInputChange(e)}
                        rows={12}
                        className="input-full"
                    />
                    <label className="AboutImgAndUpload">
                        <input
                            type="file"
                            id="hiddenFileField"
                            onChange={(e) => { handleBannerUpload(e.target.files[0], "aboutImg") }}
                        />
                        <img src={formData.aboutImg} alt="Insert Image" className="aboutusImg" />

                        <div className="glassLayer">
                            <span className="pluseCont">+</span>
                            <span className="AddAboutImgTxt">Upload About Us Image</span>
                        </div>
                    </label>
                </div>
            </div>
            <div className="form-group">
                <div className="form-group">
                    <label>Tagline</label>
                    <input
                        type="text"
                        value={formData.tagline}
                        name="tagline"
                        onChange={e => handleInputChange(e)}
                        className="input-md"
                    />
                </div>
            </div>

            <div className="form-actions">
                <button className="cancel-btn">Cancel</button>
                <button className="save-btn">Save</button>
            </div>
        </section>
    )
}