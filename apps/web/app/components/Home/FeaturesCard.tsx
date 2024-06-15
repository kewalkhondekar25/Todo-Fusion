import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card"
import ColorFeature from "../../../public/colorfeatures.png"
import Image from 'next/image'

const FeaturesCard = () => {

  const string = "colorful";
  const letters = string.split("");
  const colors = ["B183ED", "E07672", "6C9BE5", "F3D365", "F0D063", "D2A572", "E8B57A", "929299"];

  return (
    <section className='flex flex-col justify-center'>
      <div className='flex flex-col mx-3'>
        <div className='text-2xl font-bold  mt-2'>This is a <span className='text-[#A38CF3]'>different</span> approach to todos</div>
        <div className='text-sm font-medium mt-1'>we&apos;ve reimagined todo tracking by making your todos your personal page, sharable with anyone and completetly customizable.</div>
      </div>
      <div>
        <div>
          <Card
            className='bg-[#292929] text-black border-[#525252] mt-3 mx-3'>
            <CardHeader >
              <Image
              src={ColorFeature} height={200} alt='color'/>
            </CardHeader>
            <CardContent className='flex place-items-center font-semibold text-lg'>
              <p className='mr-1 text-white'>Minimal and</p>
                {
                  letters.map((item, i) => {
                    return(
                      <p key={i} style={{display: "flex", color: `#${colors[i]}`}}>{item}</p>
                    )
                  })
                }
            </CardContent>
            <CardFooter className='text-white text-sm font-normal'>
              <p>Toggle between a rainbow and minimal mode in a single click. Actually 2 clicks, but you get the point</p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  )
}

export default FeaturesCard