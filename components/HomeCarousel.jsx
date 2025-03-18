"use client"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, } from "@/components/ui/carousel"
import Image from "next/image"
import Autoplay from "embla-carousel-autoplay"

const baseApi = process.env.NEXT_PUBLIC_BASE_API;

const banners = [
    {
        id: 1,
        image: "/banner1.jpg",
        title: "Get Your School Registerd Today!",
        subTitle: "Your Vision, Our Mission",
        
    },
    {
        id: 2,
        image: "/banner2.jpg",
        title: "Best School For Your Child",
        subTitle: "Your Vision, Our Mission",
        
    },
    {
        id: 3,
        image: "/banner3.jpg",
        title: "Find Perfect School For Your Child",
        subTitle: "Your Vision, Our Mission",
        
    },
]



const HomeCarousel = () => {

    

    return (
        <div>
            <Carousel className="w-full" plugins={[Autoplay({ delay: 4000, }),]} >
                <CarouselContent>
                    {banners.map((banner) => (
                        <CarouselItem className=" relative" key={banner.id}>
                            <Image width={1500} height={600} src={`${banner.image}`} alt="banner" className="w-full object-cover ml-0 h-[40vh] md:h-[80vh]" />
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 md:right-0 transform -translate-y-1/3  w-max  space-y-2 md:space-y-4 px-6 md:px-32 xl:px-44">
                                <p className="text-xs md:text-2xl  font-semibold text-white ">{banner.subTitle}</p>
                                <h2 className="text-base md:text-5xl font-[500] md:font-[900] text-[#763f98] leading-normal whitespace-pre-wrap w-max">{banner.title}</h2>
                            
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="absolute top-1/2 left-10 transform -translate-y-1/2" />
                <CarouselNext className="absolute top-1/2 right-10 transform -translate-y-1/2" />
            </Carousel>

        </div>
    )
}

export default HomeCarousel