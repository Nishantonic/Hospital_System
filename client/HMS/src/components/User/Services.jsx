import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Home from "../Home";

const Services = () => {
  const [service, setService] = useState();

  return (
    <>
      {/* Main Content */}
      <div className="p-8 flex-1 bg-gray-100">
        {/* About Services Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Our Services</h2>
          <p className="text-gray-700">
            We offer a wide range of healthcare services tailored to your needs,
            including online consultations with experienced doctors, easy access
            to your medical reports, and the ability to purchase medicines
            online. Our goal is to make healthcare accessible and convenient for
            you.
          </p>
        </div>

        {/* Main Content */}
        <div className="p-8 flex-1 bg-gray-100">
          {/* About Services Section */}
          <div className="mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Service 1: Online Doctor Consultation */}
              <div className="p-6 bg-white shadow-md rounded-lg flex">
                <img
                  src="https://img.freepik.com/premium-vector/online-doctor-consultation-via-smartphone-concept-medical-application-websites_531064-8939.jpg"
                  alt="Online Doctor Consultation"
                  className="w-24 h-24 mr-4"
                />
                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    Doctor Consultation
                  </h3>
                  <p className="text-gray-700">
                    Consult with qualified doctors from the comfort of your
                    home. Schedule video consultations at your convenience, get
                    medical advice, and have your prescriptions sent directly to
                    your email.
                  </p>
                </div>
              </div>

              {/* Service 2: Pharmacy Delivery */}
              <div className="p-6 bg-white shadow-md rounded-lg flex">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTIwIqi6P3FfsZherDTxwVGTX9xpMyzAr1GQ&s"
                  alt="Pharmacy Delivery"
                  className="w-24 h-24 mr-4"
                />
                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    Pharmacy & Medicine Delivery
                  </h3>
                  <p className="text-gray-700">
                    Purchase medicines online and have them delivered right to
                    your doorstep. Our pharmacy ensures you get the right
                    medications prescribed by your doctor with timely delivery.
                  </p>
                </div>
              </div>

              {/* Service 3: Book Appointments */}
              <div className="p-6 bg-white shadow-md rounded-lg flex">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjs4pKiNh_VkJqAYHHJItB6-QHYoaJPi0k7w&s"
                  alt="Book Appointments"
                  className="w-24 h-24 mr-4"
                />
                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    Book Appointments
                  </h3>
                  <p className="text-gray-700">
                    Easily book appointments with specialists or general
                    practitioners. Choose the time that works best for you, and
                    avoid long waiting times by scheduling in advance.
                  </p>
                </div>
              </div>

              {/* Service 4: View Medical Reports */}
              <div className="p-6 bg-white shadow-md rounded-lg flex">
                <img
                  src="https://img.freepik.com/premium-vector/health-check-report-icon-cartoon-illustration_430232-123.jpg"
                  alt="View Medical Reports"
                  className="w-24 h-24 mr-4"
                />
                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    View Medical Reports
                  </h3>
                  <p className="text-gray-700">
                    Access all your medical reports online, anytime, from
                    anywhere. Download and share reports securely with your
                    doctors or for your own records.
                  </p>
                </div>
              </div>

              {/* Service 5: Health Packages */}
              <div className="p-6 bg-white shadow-md rounded-lg flex">
                <img
                  src="https://www.likhithadiagnostic.com/wp-content/uploads/elementor/thumbs/Vaccine-development-bro-pn7juacz7ro546uzo3l3zwqpvy0j966ikzqeqiaapk.png"
                  alt="Health Packages"
                  className="w-24 h-24 mr-4"
                />
                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    Health Checkup Packages
                  </h3>
                  <p className="text-gray-700">
                    Choose from a variety of health checkup packages designed to
                    monitor your overall health. These include blood tests,
                    scans, and general health assessments to keep you informed.
                  </p>
                </div>
              </div>

              {/* Service 6: Emergency Services */}
              <div className="p-6 bg-white shadow-md rounded-lg flex">
                <img
                  src="https://t3.ftcdn.net/jpg/05/68/54/86/360_F_568548627_MprERye97CNuywUTNSW9ZCET4M5bSyXe.jpg"
                  alt="Emergency Services"
                  className="w-24 h-24 mr-4"
                />
                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    24/7 Emergency Services
                  </h3>
                  <p className="text-gray-700">
                    Our hospital provides 24/7 emergency services. Get immediate
                    medical assistance for critical health conditions by
                    contacting our emergency department.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Footer Section */}
        <footer className="w-full bg-blue-600 p- text-white">
          <div className="text-center">
            <p className="mb-2">
              © 2024 Healthcare Solutions. All rights reserved.
            </p>
            <p>
              <Link to="/privacy-policy" className="hover:text-gray-300">
                Privacy Policy
              </Link>{" "}
              |{" "}
              <Link to="/terms-of-service" className="hover:text-gray-300">
                Terms of Service
              </Link>
            </p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Services;
