import { useToast } from "@chakra-ui/react";

export function handleSuccess(toast, value) {
    toast({
        title: `Success.`,
        description: value,
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'bottom-center',
    });
}

export function handleFailure(toast, value) {
    toast({
        title: 'Error.',
        description: value,
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'bottom-center',
    });
}

function Toast() {
    const toast = useToast();

    // You can also define internal functions here if needed

    return null; // Replace with your actual toast component JSX
}

export default Toast;
