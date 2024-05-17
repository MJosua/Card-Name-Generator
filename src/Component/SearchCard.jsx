import {
    Input,
    InputGroup,
    InputRightAddon,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
    Select,
    useToast
} from "@chakra-ui/react"
import { handleFailure, handleSuccess } from "./Toast";
import { FaSearch } from "react-icons/fa";
import axios from "axios";
import { API_URL } from "../config/config";
import { useEffect, useState } from "react";
function SearchCard({
    setE_data,
    e_id,
    setE_id,
    setE_name,
    e_data,
    e_name,
    setForm_name,
    setForm_phone,
    setForm_mail,
    setForm_extphone,
    setFormData,
    status,
    setStatus,
    setQRValue
}) {

    const { isOpen, onOpen, onClose } = useDisclosure()
    const toast = useToast();
    const [change, setchange] = useState(false)
    const getEmployeeData = (e_id) => {
        axios.get(API_URL + "/employeeData", {
            params: {
                employee_id: e_id // You can include it directly as a query parameter
            }
        }).then((res) => {
            // Assuming res.data contains name, phone, mail, and extphone
            setForm_name(res.data.data[0].name);
            setForm_phone(res.data.data[0].phone);
            setForm_mail(res.data.data[0].mail);
            setForm_extphone(res.data.data[0].ext_phone);
            setE_id(res.data.data[0].id);
            setQRValue(res.data.data[0].id)
            console.log("res.data",res.data.data[0]);

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

            console.log("e_id", e_id);
          

        }).catch((err) => {
            console.log("Error fetching employee data:", err);
        });
    }

    const deleteEmployee = (e_id) => {
        const e_identification = e_id;

        const data = {
            e_identification: e_identification
        };

        axios.post(API_URL + "/deletemployeeData",
            data
        ).then((res) => {
            // Handle the response as needed
            
            sessionStorage.clear()
            setE_id()
            onClose();
            console.log("Employee data deleted successfully:", res.data);
            setStatus(prevStatus => prevStatus === 'active' ? 'inactive' : 'active');
        }).catch((err) => {
            console.log("Error deleting employee data:", err);
            console.log("e_id", e_identification)

        });
    }


    const getEmployeeName = () => {
        axios.get(API_URL + "/listEmployeeNameonly", {

        }).then((res) => {
            setE_data(res.data.data);
            console.log("data Axios getOrderDetail", res.data.data)
        }).catch((err) => {
            console.log("error Axios getOrderDetail", err)
        })
    }






    useEffect(() => {
        getEmployeeName();
    }, [e_id,status])

    return (
        <div className="col-12  px-0 ">
            <div className="container-fluid px-0">
                <div className="row px-0">

                    <div className="col-12 px-0">
                        <InputGroup size='sm'>
                            <Input placeholder='Nama' />
                            <InputRightAddon>
                                <FaSearch />
                            </InputRightAddon>
                        </InputGroup>
                    </div>

                    <div className="col-12 px-0 mt-1">
                        <Select size="sm" placeholder="rank">
                            <option value="2">
                                IT Staff
                            </option>
                        </Select>
                    </div>

                    <div className="col-12 border mt-1 overflow-auto list-card ">

                        {
                            e_data && Array.isArray(e_data) && e_data.map((employee, idx) => (
                                <div className="row w-100 px-0  position-relative d-flex" key={idx} >
                                    <div className=" btn col-10 text-start"
                                        onClick={() => getEmployeeData(employee.id)}
                                    >
                                        {employee.name}
                                    </div>
                                    <div className="d-flex btn col-2  text-danger text-end pointer" onClick={() => {
                                        setE_name(employee.name);
                                        setE_id(employee.id);
                                        onOpen();
                                    }}>
                                        x
                                    </div>
                                </div>
                            ))
                        }

                    </div>
                </div>
            </div>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Delete Warning</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody className="text-center">
                        Are you sure want to delete,
                        <br></br>
                        {e_name}'s Account ?
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='red' mr={3}
                            onClick={() => { deleteEmployee(e_id) }}
                        >
                            DELETE
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

        </div>
    )
}
export default SearchCard