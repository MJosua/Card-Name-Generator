import { Image } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import GenerateQR from "./GenerateQR";
function PreviewBackCard({
    divRefBack,
    formData,
    qrValue,
    divQr

}) {



    return (
        <>

            <div  ref={divRefBack}
                className="border  base-kartunama px-2 py-4 position-relative">
                <div className="container-fluid h-100">
                    <div className="row mb-5 h-100">
                        <div className="col-12 justify-content-center d-flex align-items-end h-100 ">
                            <div className="row d-flex align-items-end py-4">

                                <div className="col-12 mb-1 d-flex justify-content-center "
                                >
                                    <GenerateQR
                                        qrValue={qrValue}
                                        divQr={divQr}
                                    />
                                </div>
                                <div className="col-12 text-subsidiary justify-content-center mb-1 d-flex">
                                    a subsidiary of:
                                </div>
                                <div className="col-12 mb-1 d-flex justify-content-center">
                                    <Image
                                        src="/images/logo-indofood.png"
                                        className="logo-kartunama"
                                        width="170px"
                                    />
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

export default PreviewBackCard
