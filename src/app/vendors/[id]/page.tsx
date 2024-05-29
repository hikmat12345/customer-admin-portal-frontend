import VendorDetailPage from "@/views/account-detail";
import { Suspense } from "react";


export default function Detail({ params }: { params: { id: string } }) {
    return (
        <Suspense>
            <VendorDetailPage vendorId={parseInt(params.id)} />
        </Suspense>
    )
}
