import { useRef, useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import Preview from "../Component/Preview";
import html2canvas from "html2canvas";
import { Spinner, Image, Button } from "@chakra-ui/react";

import axios from "axios";
import { API_URL } from "../config/config";
import { IoMdDownload } from "react-icons/io";
import { useParams } from 'react-router-dom';

function Card() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const category = queryParams.get('category');
    const code = queryParams.get('code');
    const divRef = useRef(null);
    const [loading, setLoading] = useState(true)


    const initialOrders = [{
        id: "",
        name: "",
        position: "",
        phone: "",
        mail: "",
        ext_phone: "",
        company: null,
        link: ""
    }];

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

    const [formData, setFormData] = useState(() => {
        const storedOrders = sessionStorage.getItem('CardDetail');
        return storedOrders ? JSON.parse(storedOrders) : initialOrders;
    });

    useEffect(() => {
        sessionStorage.setItem('CardDetail', JSON.stringify(formData));
    }, [formData]);

    const [e_data, setE_data] = useState([]);
    const [e_id, setE_id] = useState();
    const [e_name, setE_name] = useState();

    const [form_name, setForm_name] = useState();
    const [form_position, setForm_position] = useState();
    const [form_phone, setForm_phone] = useState();
    const [form_mail, setForm_mail] = useState();
    const [form_extphone, setForm_extphone] = useState();


    const getEmployeeData = () => {
        const searchParams = new URLSearchParams(window.location.search);
        const employeeId = searchParams.get('employee_id');

        axios.get(API_URL + `/employeeData`, {
            params: {
                employee_id: employeeId
            }
        }).then((res) => {
            // Assuming res.data contains name, phone, mail, and extphone
            setForm_name(res.data.data[0].name);
            setForm_phone(res.data.data[0].phone);
            setForm_mail(res.data.data[0].mail);
            setForm_extphone(res.data.data[0].ext_phone);
            setE_id(res.data.data[0].id);
            console.log("res.data", res.data.data[0]);

            setFormData((prevFormData) => ({
                ...prevFormData,
                id: res.data.data[0].id,
                name: res.data.data[0].name,
                position: res.data.data[0].position,
                phone: res.data.data[0].phone,
                mail: res.data.data[0].mail,
                ext_phone: res.data.data[0].ext_phone,
                company: res.data.data[0].company,
                link: res.data.data[0].link
            }));
            setLoading(false)
            console.log("e_id", e_id);
        }).catch((err) => {
            console.log("Error fetching employee data:", err);
        });
    }

    useEffect(() => {
        getEmployeeData();
    }, [])

    const handleExportClick = () => {
        html2canvas(divRef.current).then(canvas => {
            const imgData = canvas.toDataURL('image/png');
            const link = document.createElement('a');
            link.download = 'exported-Card.png';
            link.href = imgData;
            link.click();
        });
    };
    return (
        <div className="vw-100 vh-100 px-4 py-4" >
            <div className=" h-100 w-100 shadow-inset border-radius-10px py-4 px-md-2 px-1 ">
                <div className="container-fluid h-100 w-100 ">

                    {loading ? (
                        <div className="row h-100 w-100 ">
                            <div className=" pt-5 pb-5 m-5 p-5 d-flex  justify-content-center align-items-center row pt-5">
                                <Spinner
                                    className="d-flex justify-content-center "
                                    thickness="10px"
                                    speed="0.65s"
                                    emptyColor="gray.200"
                                    color="blue.500"
                                    size="xl"
                                    spacing={4}
                                />

                            </div>
                        </div>
                    ) : (
                        <div className="row  px-0 ">

                            <div className="col-lg-6 col-12 pe-0" >
                                <div className=" container d-block d-md-none position-absolute " style={{ margin: "-500px" }}  >
                                    <Preview
                                        divRef={divRef}
                                        formData={formData}

                                    />
                                </div>

                                <div className=" container d-none d-md-block  "  >
                                    <Preview
                                        formData={formData}

                                    />
                                </div>



                                <div className="d-block d-md-none container">
                                    <div className="row">
                                        <div className="col-12 no-gap  py-0 px-0 pb-3">
                                            <Image
                                                src="/images/logo-indofoodcbp-cbp.png"
                                                className="logo-kartunama"
                                            />
                                        </div>
                                        <div className="col-12 no-gap  fw-bold nama-kartunama px-1 mt-1"
                                        >
                                            {formData.name}
                                        </div>

                                        <div className="col-12 no-gap up-gap fs-18px px-1">
                                            {formData.position}
                                        </div>

                                        <div className="col-12 mb-3 fs-20px px-1">
                                            International Operation Division
                                        </div>

                                        <div className="col-12 no-gap fs-18px px-1">
                                            {formatPhoneNumber(formData.phone)}
                                        </div>
                                        <div className="col-12 no-gap fs-20px px-1">
                                            {formData.mail}
                                        </div>


                                        <div className="row px-0 mt-2">
                                            <div className="col-12  perusahaan-kartunama">
                                                <Image
                                                    src="/images/PT-Indofood-cbp-Sukses-Makmur.png"
                                                    className="logo-kartunama"
                                                    width="100%"
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
                                                    www.indofoodcbp.com
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                <div className="col-12 d-none d-md-block col-md-8 d-flex mt-4 mt-md-2 justify-content-center justify-content-md-start ps-md-3 ps-0">
                                    <button className="btn btn-warning  py-0" onClick={handleExportClick}>Download Card</button>
                                </div>
                            </div>

                            <div className="col-lg-6 col-12 mt-5 mt-md-0  " >
                                <div className="container mt-3 mt-md-0">
                                    <div className="row d-flex justify-content-center h-100 align-items-end">

                                        <div class="col-6 mb-1 px-1">
                                            <Button
                                                onClick={handleExportClick}
                                                leftIcon={
                                                    <IoMdDownload />
                                                }
                                                colorScheme='purple'
                                                variant='solid'
                                                size="xs"
                                                className="w-100"
                                            >
                                                Download Card
                                            </Button>
                                        </div>
                                        <div class="col-6 mb-1 px-1">
                                            <a href={`https://wa.me/${formData.phone}`} target="_blank" rel="noopener noreferrer">
                                                <Button
                                                    leftIcon={

                                                        <svg stroke="currentColor"
                                                            fill="currentColor"
                                                            stroke-width="0" viewBox="0 0 16 16" height="1em" width="1em"
                                                            xmlns="http://www.w3.org/2000/svg">
                                                            <path
                                                                d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z">
                                                            </path>
                                                        </svg>
                                                    }
                                                    colorScheme='teal'
                                                    variant='solid'
                                                    size="xs"
                                                    className="w-100"
                                                >
                                                    WhatsApp
                                                </Button>
                                            </a>
                                        </div>


                                        <div class="col-6 mb-1 px-1">
                                            <a href={`tel:${formData.phone}`} target="_blank" rel="noopener noreferrer">
                                                <Button
                                                    leftIcon={
                                                        <svg stroke="currentColor"
                                                            className="text-white"
                                                            fill="currentColor"
                                                            stroke-width="0" viewBox="0 0 16 16" height="1em" width="1em"
                                                            xmlns="http://www.w3.org/2000/svg">
                                                            <path fill-rule="evenodd"
                                                                d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511zM12.5 1a.5.5 0 0 1 .5.5V3h1.5a.5.5 0 0 1 0 1H13v1.5a.5.5 0 0 1-1 0V4h-1.5a.5.5 0 0 1 0-1H12V1.5a.5.5 0 0 1 .5-.5z">
                                                            </path>
                                                        </svg>
                                                    }
                                                    colorScheme='blue'
                                                    variant='solid'
                                                    size="xs"
                                                    className="w-100"
                                                >
                                                    Add Contact
                                                </Button>
                                            </a>
                                        </div>

                                        <div class="col-6 mb-1 px-1">
                                            <a href={`mailto:${formData.mail}`} target="_blank" rel="noopener noreferrer">
                                                <Button
                                                    leftIcon={
                                                        <svg fill="white" xmlns="http://www.w3.org/2000/svg" height="1em"
                                                            viewBox="0 0 512 512">
                                                            <path
                                                                d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z" />
                                                        </svg>
                                                    }
                                                    colorScheme='red'
                                                    variant='solid'
                                                    size="xs"
                                                    className="w-100"
                                                >
                                                    Mail
                                                </Button>
                                            </a>
                                        </div>

                                        <div class="col-6 mb-1 px-1">
                                            <a href="https://www.indofoodcbp.com/" target="_blank" rel="noopener noreferrer">
                                                <Button
                                                    leftIcon={
                                                        <svg stroke="currentColor" fill="currentColor" stroke-width="0"
                                                            viewBox="0 0 16 16" height="1em" width="1em"
                                                            xmlns="http://www.w3.org/2000/svg">
                                                            <path fill-rule="evenodd"
                                                                d="M16 8a8.001 8.001 0 0 1-7.022 7.94l1.902-7.098a2.995 2.995 0 0 0 .05-1.492A2.977 2.977 0 0 0 10.237 6h5.511A8 8 0 0 1 16 8ZM0 8a8 8 0 0 0 7.927 8l1.426-5.321a2.978 2.978 0 0 1-.723.255 2.979 2.979 0 0 1-1.743-.147 2.986 2.986 0 0 1-1.043-.7L.633 4.876A7.975 7.975 0 0 0 0 8Zm5.004-.167L1.108 3.936A8.003 8.003 0 0 1 15.418 5H8.066a2.979 2.979 0 0 0-1.252.243 2.987 2.987 0 0 0-1.81 2.59ZM8 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z">
                                                            </path>
                                                        </svg>
                                                    }
                                                    colorScheme='yellow'
                                                    variant='solid'
                                                    size="xs"
                                                    className="w-100"
                                                >
                                                    Company Website
                                                </Button>
                                            </a>
                                        </div>

                                        <div class="col-6 px-1  mb-1">
                                            <a href="https://goo.gl/maps/j64kvzor3FvWAwZC9" target="_blank"
                                                rel="noopener noreferrer">
                                                <Button
                                                    leftIcon={
                                                        <svg
                                                            stroke="red" fill="red"
                                                            xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512"><path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z" /></svg>
                                                    }
                                                    colorScheme='orange'
                                                    variant='solid'
                                                    size="xs"
                                                    className="w-100"

                                                >
                                                    Company Location
                                                </Button>
                                            </a>
                                        </div>



                                    </div>
                                </div>


                            </div>

                        </div>
                    )
                    }




                </div>
            </div>
        </div >
    )
}
export default Card