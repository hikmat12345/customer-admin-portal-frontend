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
        manageId: string,
        clientEmployeeId: string,
        lastName: string,
        jobTitle: string,
        employeeLevel: string,
        costCenter: string,
        vipExecutive: string,
    },
    isLoading?: boolean,
    label?: string
}
