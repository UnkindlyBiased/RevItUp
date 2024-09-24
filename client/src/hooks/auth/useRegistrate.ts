import { useMutation } from "@tanstack/react-query";

import AuthService from "../../services/AuthService";

export const useRegistrate = () => useMutation({
    mutationKey: ['registrate'],
    mutationFn: AuthService.registrate
})