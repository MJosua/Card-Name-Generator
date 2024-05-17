import React, { useState } from "react";
import axios from "axios";
import NODEJS_URL from "../db/db";
import {
    Input,
    useToast,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,


} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../store/userSlice";
import { useSelector } from "react-redux";
import { API_URL } from "../config"

function Login() {
    const toast = useToast();
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [susu, setSusu] = useState('');

    const dispatch = useDispatch();


    const handleSusuchange = (event) => {
        setSusu(event.target.value);
    };

    const handleuserchange = (event) => {
        setUsername(event.target.value);
    };

    function handleLoginSuccess(type_id) {
        toast({
            title: `Login ${type_id}.`,
            description: "Login Success.",
            status: 'success',
            duration: 9000,
            isClosable: true,
            position: 'bottom-left',
        });
    }

    function handleLoginFailure(errorMessage) {
        toast({
            title: 'Error.',
            description: errorMessage,
            status: 'error',
            duration: 9000,
            isClosable: true,
            position: 'bottom-left',
        });
    }
    const { role } = useSelector((state) => state.user);

    const handlelogin = async (event) => {

        event.preventDefault();
        try {
            const response = await
                axios.post(NODEJS_URL + '/auth_tm/login', {
                    username,
                    susu
                });

            const { data } = response;

            if (data.success) {
                // if (data.siapa.type_id === 2 || data.siapa.type_id === 3) {

                sessionStorage.setItem('Tokek', response.data.tokek);
                dispatch(setUser({ username, role: data.siapa.type_id }));
                handleLoginSuccess(data.type_id === 2 ? 'Sales' : 'Admin');
                (data.siapa.type_id === 2
                    ?
                    navigate("/")
                    :
                    navigate("/")
                )
                // } else {
                // }
            } else {
                handleLoginFailure(data.message);
            }

        }
        catch (error) {
            handleLoginFailure("Terjadi kesalahan, tapi bukan salah kamu :( Coba tanya yosgul");
        }
    }

    const {
        isOpen: isOpenModalForgot,
        onOpen: onOpenModalForgot,
        onClose: onCloseModalForgot,
    } = useDisclosure();

    const {
        isOpen: isOpenModalLogin,
        onOpen: onOpenModalLogin,
        onClose: onCloseModalLogin,
    } = useDisclosure();

    const [userID, setUserID] = React.useState('');
    const [pswd, setpswd] = React.useState('');
    const [uid, setUid] = React.useState('');

    const onForgotPassword = () => {
        // if (email == '' || !email.includes('@') || !email.includes('.')) {
        //     toast({
        //         title: "Oopsie!",
        //         description: `please check your email form! `,
        //         status: "warning",
        //         duration: 6000, //in second
        //         isClosable: true
        //     })
        // } else {
        axios.post(
            API_URL + "/auth_tm/forgot/", { uid }
        )
            .then((res) => {
                if (!res.data.success) {

                    toast({
                        title: "Oopsiee!",
                        description: res.data.message,
                        status: "error",
                        duration: 6000,
                        isClosable: true,
                    });
                } else {
                    toast({
                        title: "Check your email!",
                        description: res.data.message,
                        status: "success",
                        duration: 6000,
                        isClosable: true,
                    });
                    // navigate('/e-order/help/')

                    onCloseModalForgot();
                }

            })
            .catch((err) => {
                toast({
                    title: "Oopsiee!",
                    description: 'Something bad just happend! Please try again!',
                    status: "error",
                    duration: 6000,
                    isClosable: true,
                });
            });
        // }


    }

    return (
        <div className="body vh-100  px-3 py-2 bg-light text-dark">
            <Header onOpenModalLogin={onOpenModalLogin} />
            <div className="row pt-5 mt-5 h-100 py-0 my-0 px-0 d-flex justify-content-center">
                <div className="col-12 col-md-5 ">
                    <div className="card py-2 border_radius_10px">
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Brand Name</th>
                                    <th scope="col">Country</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope="row">1</th>
                                    <td>Indomie</td>
                                    <td>Indonesia</td>
                                </tr>
                                <tr>
                                    <th scope="row">2</th>
                                    <td>Indomie</td>
                                    <td>Vietnam</td>
                                </tr>
                                <tr>
                                    <th scope="row">3</th>
                                    <td>Indomie</td>
                                    <td>Kamboja</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <Modal

                isOpen={isOpenModalForgot}
                onClose={onCloseModalForgot}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader display="flex" justifyContent="center" className="text-muted">
                        Reset Password Form
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <div className="row">
                            <div className="col-12 d-flex justify-content-center text-start px-3 text-muted fs-5 pb-2">
                                Hi! Please insert User ID that you use for login.
                                We will send you an email with a link to reset your password.
                            </div>
                            <div className="col-12 ">
                                <form>
                                    <div className="name_text py-2 ps-1">
                                        <Input
                                            placeholder="Input Your User ID Here"
                                            style={{ fontStyle: "italic" }}
                                            onChange={(e) => { setUid(e.target.value) }}
                                        />
                                    </div>
                                    {/* <div className="pt-2  d-flex justify-content-center"> */}

                                    {/* </div> */}
                                </form>

                            </div>
                        </div>

                    </ModalBody>
                    <ModalFooter>
                        <button className="btn fw-bold btn-danger border_radius_10px px-5  "
                            onClick={onForgotPassword}
                        >
                            SEND
                        </button>
                    </ModalFooter>

                </ModalContent>
            </Modal>

            <Modal

                isOpen={isOpenModalLogin}
                onClose={onCloseModalLogin}
            >
                <ModalOverlay />
                <ModalContent>

                    <ModalCloseButton />
                    <ModalBody padding={0}>
                        <div className="container-fluid px-0">
                            <div className="row h-100 py-0 my-0 px-0">
                                <div className="col-12 h-100 d-flex align-items-center justify-content-center">
                                    <div className="card col-12 shadow-lg">
                                        <div className="">
                                            <div className="card-header bg-danger pb-0">
                                                <p className="fw-bold fs-4 text-light ps-3">
                                                    Login
                                                </p>
                                            </div>
                                            <div className="card-body">
                                                <div class="row">
                                                    <form onSubmit={handlelogin}>
                                                        <div className="col-12 px-4 pt-3 fw-bold">
                                                            Username:
                                                        </div>

                                                        <div className="col-12  px-4">
                                                            <Input
                                                                onChange={handleuserchange}
                                                                value={username}
                                                                className="mt-2" />
                                                        </div>
                                                        <div className="col-12 px-4 fw-bold">
                                                            Password:
                                                        </div>
                                                        <div className="col-12 px-4">
                                                            <Input
                                                                onChange={handleSusuchange}
                                                                value={susu}
                                                                className="mt-2" type="password" />
                                                        </div>
                                                        <div className="col-12 d-flex justify-content-end px-4 py-2" >
                                                            <div clasName="row">
                                                                <div className="col-6  mx-0 px-0 my-0 py-0">


                                                                    <div className="col-12  mx-0 px-0 my-0 py-0">

                                                                        <button type="submit" className="btn btn-outline-danger fw-bold mt-3 px-5">
                                                                            Login
                                                                        </button>
                                                                    </div>
                                                                    <div className="col-12 pointer mx-0 px-0 my-0 py-0 text-primary"
                                                                        style={{ fontSize: "9px", textDecoration: "underline" }}
                                                                        onClick={() => {
                                                                            // navigate('/e-order/forgot-password');
                                                                            onOpenModalForgot();
                                                                        }}
                                                                    >
                                                                        Forgot Password
                                                                    </div>

                                                                </div>
                                                            </div>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ModalBody>


                </ModalContent>
            </Modal>F

        </div>
    )
}

export default Login