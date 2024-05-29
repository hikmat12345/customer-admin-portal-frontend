export type EmployeeGeneralInfoProps = {
    data: {
        veroxosId: string,
        firstName: string,
        email: string,
        status: string | number,
        site: {
            streetLine1: string
            name?: string
            address?: string
        }
        manage_id: string,
        client_employee_id: string,
        last_name: string,
        job_title: string,
        employee_level: string,
        cost_center: string,
        vip_executive: string,
    },
    isLoading?: boolean,
    label?: string
 
} 