import dynamic from 'next/dynamic';
import { Loader } from 'lucide-react';


const  LineChart = dynamic(() => import('./lince-chart'), {
    loading: () =>  
    <div className='flex justify-center items-center h-[350px]'>
      <Loader size={50} color='#b1b1b1' />
    </div>,
    ssr: false,
});

export default LineChart;