import StarRating from "./StarRating";
import { useRef, useEffect } from "react";

const ReviewsCarousel = ({ data }) => {

    const carouselRef = useRef(null);
    const intervalRef = useRef(null);

    useEffect(() => {
        const startCarousel = () => {
            intervalRef.current = setInterval(() => {
                if (carouselRef.current) {
                    const firstChild = carouselRef.current.firstElementChild;
                    carouselRef.current.style.transition = 'transform 1s ease-in-out';
                    carouselRef.current.style.transform = `translateX(-${firstChild.offsetWidth + 24}px)`;

                    const transitionEnd = () => {
                        carouselRef.current.style.transition = 'none';
                        carouselRef.current.style.transform = 'translateX(0)';
                        carouselRef.current.appendChild(firstChild);
                        carouselRef.current.removeEventListener('transitionend', transitionEnd);
                    };

                    carouselRef.current.addEventListener('transitionend', transitionEnd);
                }
            }, 2500);
        };

        startCarousel();

        return () => clearInterval(intervalRef.current);
    }, []);



    return (
        <section className="mt-[84px]">
            <h3 className="text-[#FF7F20] text-[45px] font-bold">Reseñas</h3>
            <div className="flex gap-6 overflow-hidden w-screen">
                <div ref={carouselRef} className="flex w-max">
                    {data.reviews.map((review, index) => (
                        <div key={index} className="flex bg-[#EDD8C7] p-5 min-w-[300px] mr-6">
                            <div>
                                <h4 className="text-2xl font-semibold">{review.user_name}</h4>
                                <p className="w-[270px] text-lg text-[#FF7F20]">{review.review_description}</p>
                            </div>
                            <div>
                                <div>
                                    <StarRating product={false} rating={review.review_star_rating} />
                                </div>
                                <div className="w-[100px] h-[100px] flex items-center justify-center overflow-hidden m-[5px]">
                                    <img className='max-w-full max-h-full object-cover' src={data.product_photo} alt="" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};



export default ReviewsCarousel;