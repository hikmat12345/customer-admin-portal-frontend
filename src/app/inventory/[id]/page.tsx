import InventoryDetailPage from "@/views/inventory-detail";
import { Suspense } from "react";

export default function Page({ params }: { params: { id: string } }) {
    return ( 
        <Suspense>
             <InventoryDetailPage serviceId={parseInt(params.id)} />
        </Suspense>
    )
}
