import React from 'react';
import { Product } from '@stripe/firestore-stripe-payments';
import { CheckIcon } from '@heroicons/react/outline';


interface Props {
  products: Product[]
  selectedPlan: Product | null
}

const Table = ({ products, selectedPlan }: Props) => {
  return (
    <table>
      <tbody  className='divide-y divide-[gray]'>
        <tr className='table-row'>
          <td className='table-title'>Monthly price</td>
          { products.map((product) => (
            <td
              className={`table-data ${selectedPlan?.id === product.id ? 'text-[#E50914]' : 'text-[gray]'}`}
              key={product.id}
            >
              {product.prices[0].unit_amount! / 1000},000 <span className='underline'>đ</span>
            </td>
          ))}
        </tr>
        <tr className='table-row'>
          <td className='table-title'>Video quality</td>
          { products.map((product) => (
            <td
              className={`table-data ${selectedPlan?.id === product.id ? 'text-[#E50914]' : 'text-[gray]'}`}
              key={product.id}
            >
              {product.metadata.videoQuality}
            </td>
          ))}
        </tr>
        <tr className='table-row'>
          <td className='table-title'>Resolution</td>
          { products.map((product) => (
            <td
              className={`table-data ${selectedPlan?.id === product.id ? 'text-[#E50914]' : 'text-[gray]'}`}
              key={product.id}
            >
              {product.metadata.resolution}
            </td>
          ))}
        </tr>
        <tr className='table-row'>
          <td className='table-title'>Watch on your TV, computer, mobile phone and tablet</td>
          { products.map((product) => (
            <td
              className={`table-data ${selectedPlan?.id === product.id ? 'text-[#E50914]' : 'text-[gray]'}`}
              key={product.id}
            >
              {product.metadata.portability === 'true' && (
                <CheckIcon className="inline-block h-8 w-8" />
              )}
            </td>
          ))}
        </tr>
      </tbody>
    </table>
  )
};

export default Table;