import { getConfig } from "./config"

export type Files = {
    logs: {
        current_page: number,
        data: Array<{
            id: number,
            user_id: number,
            process_name: string,
            process_no: number,
            created_at: string,
            updated_at: string,
            parent_folder: string,
            collab_user_ids: number,
            completed_at: string,
            has_exe_log: number,
            exec_res: string,
            job_number: string,
            status: number,
            client_id: number,
            files: Array<{
                path: string,
                size: number,
            }>,
        }>,
        first_page_url: string,
        from: number,
        last_page: number,
        last_page_url: string,
        links: Array<{
            url: string,
            label: string,
            active: boolean,
        }>,
        next_page_url: string,
        path: string,
        per_page: number,
        prev_page_url: string,
        to: number,
        total: number,
    }
}

export const getFiles = async () => {
    const axiosInstance = getConfig();
    if (axiosInstance === undefined) {
        return undefined;
    }
    return axiosInstance.get<Files>("testing?page=10")
        .then(res => res.data)
}

