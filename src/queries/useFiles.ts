import { getFiles } from "@/api/files";
import { useQuery } from "react-query";

export function useFiles() {
    return useQuery({
        queryKey: ["files"],
        queryFn: () => getFiles(),
    })
}

