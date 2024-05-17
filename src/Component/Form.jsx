import { Input } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useToast } from "@chakra-ui/react";
import QRCode from 'qrcode.react';
import GenerateQR from "./GenerateQR";
import axios from "axios";
import { API_URL } from "../config/config";
import Preview from "../Component/Preview"
import { handleFailure, handleSuccess } from "./Toast";
function FormInput({
    qrValue,
    setQrValue,
    divQr,
    handleExportQrClick,
    form_name,
    form_phone,
    form_mail,
    form_extphone,
    setE_data,
    setE_id,
    setE_name,
    setForm_name,
    setForm_phone,
    setForm_mail,
    setForm_extphone,
    e_id,
    formData,
    setFormData,
    status,
    setStatus,
    handleExportClick,
    divRef,
    initialOrders,

}) {
    // State to store input values

    const toast = useToast();
    // Function to handle input changes
    const handleChange = (id, value) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            [id]: value
        }));
        // Update sessionStorage
        sessionStorage.setItem('CardDetail', id, value);
    };

    // Load formData from session storage on component mount



    const resetbutton = () => {
        setE_id();
        setE_name();
        setForm_name();
        setForm_phone();
        setForm_mail();
        setForm_extphone();
        // Clear sessionStorage for all keys related to form data
        setStatus(prevStatus => prevStatus === 'active' ? 'inactive' : 'active');

        setFormData(initialOrders);
    };

    const setEmployeeData = () => {
        // Retrieve form data from sessionStorage
        const e_name = formData.name;
        const e_link = e_name.trim().replace(/\s/g, '');
        const e_position = formData.position;
        const e_phone = formData.phone;
        const e_mail = formData.mail;
        const e_extphone = formData.ext_phone;
        const e_company = 1
        // Create a data object with the retrieved form data
        const data = {
            e_name: e_name,
            e_position: e_position,
            e_phone: e_phone,
            e_mail: e_mail,
            e_extphone: e_extphone,
            e_company: e_company,
            e_link: e_link
        };

        // Make a GET request to the API endpoint with the form data as parameters
        axios.post(API_URL + "/setemployeeData",
            data
        ).then((res) => {
            // Handle the response as needed
            console.log("Employee data fetched successfully:", res.data);
            setQrValue(res.data.qr)
            setE_id(res.data.qr)
            handleSuccess(toast, res.data.message)

            setStatus(prevStatus => prevStatus === 'active' ? 'inactive' : 'active');

        }).catch((err) => {
            console.log("Error fetching employee data:", err);
            console.log("e_name", e_name)
            console.log("e_position", e_position)
            console.log("e_phone", e_phone)
            console.log("e_mail", e_mail)
            console.log("e_extphone", e_extphone)
            handleFailure(toast, err.data.message)
        });
    };

    const updateEmployeeData = () => {
        const e_name = formData.name;
        const e_link = e_name.trim().replace(/\s/g, '');
        const e_position = formData.position;
        const e_phone = formData.phone;
        const e_mail = formData.mail;
        const e_extphone = formData.ext_phone;
        const e_company = 1
        const e_identification = e_id;
        // Create a data object with the retrieved form data
        const data = {
            e_name: e_name,
            e_position: e_position,
            e_phone: e_phone,
            e_mail: e_mail,
            e_extphone: e_extphone,
            e_company: e_company,
            e_link: e_link,
            e_identification: e_identification
        };

        // Make a GET request to the API endpoint with the form data as parameters
        axios.post(API_URL + "/editemployeeData",
            data

        ).then((res) => {
            // Handle the response as needed

            console.log("Employee data fetched successfully:", res.data);
            handleSuccess(toast, res.data.message)
            setStatus(prevStatus => prevStatus === 'active' ? 'inactive' : 'active');
        }).catch((err) => {
            console.log("Error fetching employee data:", err);
            console.log("e_name", e_name)
            console.log("e_position", e_position)
            console.log("e_phone", e_phone)
            console.log("e_mail", e_mail)
            console.log("e_extphone", e_extphone)
            handleFailure(toast, err.data.message)

        });
    }

    return (
        <div className="container ">
            <div className="card shadow-sm px-3 py-2">
                <div className="row mb-3">
                    <div className="col-6 d-flex align-items-center fw-bold">
                        User Info
                    </div>
                    <div className=
                        {

                            !e_id
                                ?
                                "d-none"
                                :
                                "col-6 d-flex justify-content-end"

                        }
                    >
                        <div className="btn btn-danger"
                            onClick={resetbutton}
                        >
                            Reset Info
                        </div>
                    </div>
                </div>
                <div className="row mb-2">
                    <div className="col-3">Name</div>
                    <div className="col-9">
                        <Input
                            id="name"
                            size="xs"
                            onChange={(e) => handleChange(e.target.id, e.target.value)}
                            value={formData.name || ""}
                            placeholder="INPUT NAME"
                            className="border-radius-10px"
                        />
                    </div>
                </div>
                <div className="row mb-2">
                    <div className="col-3">Title</div>
                    <div className="col-9">
                        <Input
                            id="position"
                            size="xs"
                            onChange={(e) => handleChange(e.target.id, e.target.value)}
                            value={formData.position || ""}
                            placeholder="INPUT POSITION"
                            className="border-radius-10px"
                        />
                    </div>
                </div>
                <div className="row mb-2">
                    <div className="col-3">Phone</div>
                    <div className="col-9">
                        <Input
                            id="phone"
                            size="xs"
                            onChange={(e) => handleChange(e.target.id, e.target.value)}
                            value={formData.phone === null || !formData.phone ? "" : formData.phone}
                            className="border-radius-10px"
                            placeholder="INPUT PHONE"
                        />
                    </div>
                </div>
                <div className="row mb-2">
                    <div className="col-3">Mail</div>
                    <div className="col-9">
                        <Input
                            id="mail"
                            size="xs"
                            onChange={(e) => handleChange(e.target.id, e.target.value)}
                            value={formData.mail || ""}
                            className="border-radius-10px"
                            placeholder="INPUT MAIL"
                        />
                    </div>
                </div>
                <div className="row mb-2">
                    <div className="col-3">Office Phone</div>
                    <div className="col-9">
                        <Input
                            id="ext_phone"
                            type="number"
                            size="xs"
                            onChange={(e) => handleChange(e.target.id, e.target.value)}
                            value={formData.ext_phone || ""}
                            className="border-radius-10px"
                            placeholder="INPUT OFFICE PHONE"
                        />
                    </div>
                </div>

                {(formData.name || formData.name === "") && (formData.position || formData.position === "") && !e_id ?
                    <div className="col-6 my-3">
                        <div className="fw-bold btn btn-sm w-100 btn-warning"
                            onClick={() => setEmployeeData()}
                            disabled={(!formData.name || formData.name === "") && (formData.position || formData.position === "")}
                        >
                            Publish
                        </div>
                    </div>

                    :
                    ""
                }
            </div>
            <div className={!e_id ? " d-none " : "card mt-4"}>
                <div className="row px-5 py-3">


                    {!e_id ?
                        (
                            ""

                        ) :
                        (
                            <div className="col-6 my-3">
                                <button className="fw-bold btn btn-sm w-100 btn-warning"
                                    onClick={() => updateEmployeeData()}
                                >
                                    Update
                                </button>
                            </div>
                        )
                    }

                    <div className={!e_id ? " d-none " : "col-6 my-3"}>
                        <button className="fw-bold btn btn-sm w-100 btn-primary"
                            onClick={handleExportQrClick}
                        >
                            Download
                        </button>
                    </div>

                    <div className="col-12 d-flex justify-content-center my-4">
                        <a href={"http://localhost:3001/card?employee_id=" + qrValue} target="_none">
                            <GenerateQR
                                qrValue={qrValue}
                                divQr={divQr}
                                handleExportQrClick={handleExportQrClick}

                            />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FormInput;
