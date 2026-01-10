
import React, { useState } from 'react';
import { REGISTRATION_STEPS } from '../../../utils/BusinessData';
import Step1Account from './Steps/Step1Account';
import Step2Basic from './Steps/Step2Basic';
import Step3Location from './Steps/Step3Location';
import Step4Timings from './Steps/Step4Timings';
import Step5Services from './Steps/Step5Services';
import Step6Media from './Steps/Step6Media';
import Step7Documents from './Steps/Step7Documents';
import Step8Policies from './Steps/Step8Policies';
import Step9Subscription from './Steps/Step9Subscription';
import Step10Review from './Steps/Step10Review';
import Navbar from '../../../components/navbar/Navbar';
import Footer from '../../../components/footer/Footer';
import './BusinessRegistration.css';

export const BusinessRegistration = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        // Step 1
        fullName: '',
        mobileNumber: '',
        email: '',
        password: '',
        city: 'Kohat',
        cnic: '',
        // Step 2
        businessName: '',
        businessType: '',
        category: '',
        subCategory: '',
        description: '',
        establishmentYear: '',
        staffCount: '',
        operatingArea: '',
        // Step 3
        address: '',
        area: '',
        googleMapPin: '',
        businessPhone: '',
        whatsapp: '',
        website: '',
        socialLinks: {},
        // Step 4
        workingDays: [],
        openingTime: '',
        closingTime: '',
        emergencyAvailability: false,
        appointmentRequired: false,
        // Step 5 (Varies)
        services: [],
        products: [],
        priceRange: '',
        homeDelivery: false,
        // Step 6
        logo: null,
        coverImage: null,
        gallery: [],
        awards: [],
        // Step 7
        ownerCnic: null,
        businessRegDoc: null,
        license: null,
        utilityBill: null,
        professionalCert: null,
        // Step 8
        refundPolicy: '',
        warranty: '',
        termsAccepted: false,
        // Step 9
        subscriptionPlan: 'free',
    });

    const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, 10));
    const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

    const handleDataChange = (stepData) => {
        setFormData((prev) => ({ ...prev, ...stepData }));
    };

    const renderStep = () => {
        switch (currentStep) {
            case 1: return <Step1Account data={formData} updateData={handleDataChange} next={nextStep} />;
            case 2: return <Step2Basic data={formData} updateData={handleDataChange} next={nextStep} back={prevStep} />;
            case 3: return <Step3Location data={formData} updateData={handleDataChange} next={nextStep} back={prevStep} />;
            case 4: return <Step4Timings data={formData} updateData={handleDataChange} next={nextStep} back={prevStep} />;
            case 5: return <Step5Services data={formData} updateData={handleDataChange} next={nextStep} back={prevStep} />;
            case 6: return <Step6Media data={formData} updateData={handleDataChange} next={nextStep} back={prevStep} />;
            case 7: return <Step7Documents data={formData} updateData={handleDataChange} next={nextStep} back={prevStep} />;
            case 8: return <Step8Policies data={formData} updateData={handleDataChange} next={nextStep} back={prevStep} />;
            case 9: return <Step9Subscription data={formData} updateData={handleDataChange} next={nextStep} back={prevStep} />;
            case 10: return <Step10Review data={formData} submit={() => alert('Submitted!')} back={prevStep} />;
            default: return null;
        }
    };

    return (
        <div className="registration-page">
            <Navbar />
            <div className="registration-container">
                <div className="registration-sidebar">
                    <h3>One-Time Registration</h3>
                    <ul>
                        {REGISTRATION_STEPS.map((step) => (
                            <li key={step.id} className={currentStep === step.id ? 'active' : currentStep > step.id ? 'completed' : ''}>
                                <span className="step-number">{step.id}</span>
                                <span className="step-label">{step.label}</span>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="registration-content">
                    {renderStep()}
                </div>
            </div>
            <Footer />
        </div>
    );
};
