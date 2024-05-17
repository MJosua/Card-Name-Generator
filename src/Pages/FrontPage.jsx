import Preview from "../Component/Preview"
import FormInput from "../Component/Form"
import html2canvas from 'html2canvas';
import { useRef, useState } from "react";
import SearchCard from "../Component/SearchCard";
import { API_URL } from "../config/config";
import axios from "axios";
import { useEffect } from "react";
import PreviewBackCard from "../Component/PreviewBackCard";
function FrontPage() {





    const [qrValue, setQRValue] = useState('');
    const [status, setStatus] = useState('inactive');
    const divRef = useRef(null);
    const divRefBack = useRef(null);
    const divQr = useRef(null);

    const handleExportClick = () => {
        html2canvas(divRef.current, { scale: 1 }).then(canvas => {
            const imgData = canvas.toDataURL('image/png');
            const link = document.createElement('a');
            link.download = 'exported-Card.png';
            link.href = imgData;
            link.click();
        });
    };

    const handleExportBackClick = () => {
        html2canvas(divRefBack.current, { scale: 1 }).then(canvas => {
            const imgData = canvas.toDataURL('image/png');
            const link = document.createElement('a');
            link.download = 'exported-Card.png';
            link.href = imgData;
            link.click();
        });
    };

    const handleExportQrClick = () => {

        html2canvas(divQr.current).then(canvas => {
            const imgData = canvas.toDataURL('image/png');
            const link = document.createElement('a');
            link.download = 'exported-QR.png';
            link.href = imgData;
            link.click();
        });
    };


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




    return (
        <div className="vw-100 vh-100 px-4 py-4">
            <div className=" h-100 w-100 shadow-inset border-radius-10px py-4 px-md-2 px-1">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12 w-100 border-bottom border-warning mb-3">
                            <div className="row">
                                <div className="col-md-2 col-5 px-0">
                                    <div className="file-select cbp active">
                                        Indofood <span style={{ color: "darkred" }}>&nbsp;CBP</span>
                                    </div>
                                </div>

                                <div className="col-md-2 col-7 px-0">
                                    <div className="file-select makmur">
                                        Indofood Sukses Makmur
                                    </div>
                                </div>
                                <div className="col-9">

                                </div>
                            </div>
                        </div>

                        <div className="col-md-2 col-12 mb-4">
                            <SearchCard
                                setE_data={setE_data}
                                status={status}
                                setStatus={setStatus}
                                e_id={e_id}
                                setE_id={setE_id}
                                setE_name={setE_name}
                                e_data={e_data}
                                e_name={e_name}
                                setForm_extphone={setForm_extphone}
                                setForm_mail={setForm_mail}
                                setForm_name={setForm_name}
                                setForm_phone={setForm_phone}
                                formData={formData}
                                setFormData={setFormData}
                                setQRValue={setQRValue}
                            />
                        </div>
                        <div className="col-md-4 col-12">
                            <FormInput
                                status={status}
                                setStatus={setStatus}
                                qrValue={qrValue}
                                setQrValue={setQRValue}
                                setE_data={setE_data}
                                e_data={e_data}
                                e_id={e_id}
                                setE_id={setE_id}
                                setE_name={setE_name}
                                divQr={divQr}
                                handleExportQrClick={handleExportQrClick}
                                form_name={form_name}
                                form_phone={form_phone}
                                form_mail={form_mail}
                                form_extphone={form_extphone}
                                setForm_extphone={setForm_extphone}
                                setForm_mail={setForm_mail}
                                setForm_name={setForm_name}
                                setForm_phone={setForm_phone}
                                formData={formData}
                                setFormData={setFormData}
                                initialOrders={initialOrders}
                            />
                        </div>

                        <div className="col-md-6 col-12 d-none d-md-block">
                            <Preview
                                divRef={divRef}
                                formData={formData}
                            />
                            <div className="col-9 py-2 pe-5 d-flex justify-content-between">
                                <button className="btn btn-warning " onClick={handleExportClick}>Export Front Card as Image</button>
                                <button className="btn btn-warning " onClick={handleExportBackClick}>Export Back Card as Image</button>
                            </div>
                            <PreviewBackCard
                                formData={formData}
                                divRefBack={divRefBack}
                                qrValue={qrValue}
                                divQr={divQr}
                            />
                        </div>



                    </div>
                </div>
            </div>
        </div>
    )
}
export default FrontPage