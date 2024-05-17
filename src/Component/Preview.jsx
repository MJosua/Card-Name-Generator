import { Image } from "@chakra-ui/react";
import { useEffect, useState } from "react";

function Preview({ divRef, formData }) {






    const formatPhoneNumber = (phoneNumber) => {
        // Check if phoneNumber exists and is not empty
        if (!phoneNumber || phoneNumber.trim() === "") {
            return ""; // Return empty string if phoneNumber is not set or empty
        }

        // Remove all non-digit characters from the phone number
        const cleanedPhoneNumber = phoneNumber.replace(/\D/g, '');

        // Check if the cleaned phone number has a length of 10, 11, or 13 digits
        if (cleanedPhoneNumber.length <= 13) {
            // If the phone number has 13 digits, remove the leading zero
            let formattedNumber = cleanedPhoneNumber;
            if (cleanedPhoneNumber.length <= 13 && cleanedPhoneNumber.startsWith('0')) {
                formattedNumber = cleanedPhoneNumber.substring(1);
            }

            // Format the phone number into the desired format
            if (formattedNumber.length <= 13) {
                // If it's a local Indonesian phone number (without country code)
                return `+62 ${formattedNumber.slice(0, 3)} ${formattedNumber.slice(3, 7)} ${formattedNumber.slice(7, 10)} ${formattedNumber.slice(10)}`;
            } else {
                // If it includes the country code already, just format it
                return `${formattedNumber.slice(0, 2)} ${formattedNumber.slice(2, 5)} ${formattedNumber.slice(5, 8)} ${formattedNumber.slice(8)}`;
            }
        } else {
            // Return the original phone number if it doesn't have 10, 11, or 13 digits
            return phoneNumber;
        }
    };

    return (
        <>
            <div
                ref={divRef}
                className="border position-absolute base-kartunama px-2 py-4 " style={{ top: "-500px" }}>
                <div className="container-fluid py-0">
                    <div className="col-12 mt-4 py-0">
                        <div className="col-12  py-0 pb-3">
                            <Image
                                src="/images/logo-indofoodcbp-cbp.png"
                                className="logo-kartunama"
                            />
                        </div>
                        <div className="container-fluid ps-2 py-2">
                            <div className="row px-0 py-2">
                                <div className="col-6  col-md-6 px-0 py-0">
                                    <div className="container-fluid py-0">
                                        <div className="row py-0"
                                            style={{ marginTop: "-10px" }}
                                        >


                                            <div className="col-12 no-gap  fw-bold nama-kartunama mt-1"
                                            >
                                                {formData.name}
                                            </div>

                                            <div className="col-12 no-gap up-gap fs-18px">
                                                {formData.position}
                                            </div>

                                            <div className="col-12 mb-3 fs-20px">
                                                International Operation Division
                                            </div>

                                            <div className="col-12 no-gap fs-18px">
                                                {formatPhoneNumber(formData.phone)}
                                            </div>
                                            <div className="col-12 no-gap fs-20px">
                                                {formData.mail}
                                            </div>

                                        </div>
                                    </div>
                                </div>
                                <div className="col  px-0 py-0">
                                    <div className="container-fluid py-0  px-0">
                                        <div className="row ">
                                            <div className="col-12 no-gap-print perusahaan-kartunama">
                                                <Image
                                                    src="/images/PT-Indofood-cbp-Sukses-Makmur.png"
                                                    className="logo-kartunama"
                                                    width="93%"
                                                    style={{ marginTop: "10px" }}
                                                />
                                            </div>
                                            <div
                                            >
                                                <div className="col-12 no-gap fs-22px mt-2" >
                                                    Sudirman Plaza
                                                </div>

                                                <div className="col-12 no-gap fs-22px">
                                                    Indofood Tower, 23rd Floor
                                                </div>

                                                <div className="col-12 no-gap fs-22px">
                                                    Jl. Jend. Sudirman Kav. 76 - 78
                                                </div>

                                                <div className="col-12 no-gap fs-22px">
                                                    Jakarta 12910, Indonesia
                                                </div>

                                                <div className="col-12 no-gap fs-22px">
                                                    T.  +6221 5795 8822  {(formData.ext_phone < 1000) ? "" :
                                                        "ext." + formData.ext_phone
                                                    }
                                                </div>

                                                <div className="col-12 no-gap fs-22px">
                                                    F.  +6221 5793 7422
                                                </div>

                                                <div className="col-12 no-gap fs-22px">
                                                    www.indofood.co.id
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>

                </div>
                <div className="col-12  w-100 position-absolute bottom-0 start-0 footer-kartunama">

                </div>

            </div>


            <div
                className="border  base-kartunama px-2 py-0  position-relative">
                <div className="container-fluid py-0">
                    <div className="col-12 mt-4 py-0">
                        <div className="col-12  py-0 pb-3">
                            <Image
                                src="/images/logo-indofoodcbp-cbp.png"
                                className="logo-kartunama"
                            />
                        </div>
                        <div className="container-fluid ps-2 py-2">
                            <div className="row px-0 py-4">
                                <div className="col-6  col-md-6 px-0 py-0">
                                    <div className="container-fluid py-0">
                                        <div className="row py-0"
                                            style={{ marginTop: "-10px" }}
                                        >


                                            <div className="col-12 no-gap  fw-bold nama-kartunama mt-1"
                                            >
                                                {formData.name}
                                            </div>

                                            <div className="col-12 no-gap up-gap fs-18px">
                                                {formData.position}
                                            </div>

                                            <div className="col-12 mb-3 fs-20px">
                                                International Operation Division
                                            </div>

                                            <div className="col-12 no-gap fs-18px">
                                                {formatPhoneNumber(formData.phone)}
                                            </div>
                                            <div className="col-12 no-gap fs-20px">
                                                {formData.mail}
                                            </div>

                                        </div>
                                    </div>
                                </div>
                                <div className="col  px-0 py-0">
                                    <div className="container-fluid py-0  px-0">
                                        <div className="row ">
                                            <div className="col-12  perusahaan-kartunama pe-0">
                                                <Image
                                                    src="/images/PT-Indofood-cbp-Sukses-Makmur.png"
                                                    className="logo-kartunama"
                                                    width="93%"

                                                />
                                            </div>
                                            <div
                                            >
                                                <div className="col-12 no-gap fs-22px " >
                                                    Sudirman Plaza
                                                </div>

                                                <div className="col-12 no-gap fs-22px">
                                                    Indofood Tower, 23rd Floor
                                                </div>

                                                <div className="col-12 no-gap fs-22px">
                                                    Jl. Jend. Sudirman Kav. 76 - 78
                                                </div>

                                                <div className="col-12 no-gap fs-22px">
                                                    Jakarta 12910, Indonesia
                                                </div>

                                                <div className="col-12 no-gap fs-22px">
                                                    T.  +6221 5795 8822  {(formData.ext_phone < 1000) ? "" :
                                                        "ext." + formData.ext_phone
                                                    }
                                                </div>

                                                <div className="col-12 no-gap fs-22px">
                                                    F.  +6221 5793 7422
                                                </div>

                                                <div className="col-12 no-gap fs-22px">
                                                www.indofoodcbp.com
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>

                </div>
                <div className="col-12  w-100 position-absolute bottom-0 start-0 footer-kartunama">

                </div>

            </div>

        </>
    );
}

export default Preview;
