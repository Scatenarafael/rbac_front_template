import { useQuery } from "@tanstack/react-query";
import { me } from "./auth.service";


export function useMeQuery() {

    return useQuery({
        queryKey: ['me-query'],
        queryFn: me,
    })
}