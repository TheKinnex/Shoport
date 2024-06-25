import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import axios from "axios";
import StarRating from "../components/StarRating";
import ReviewsCarousel from "../components/ReviewsCarousel";

const IndividualProduct = () => {
    const [data, setData] = useState(null); // Esto lo utilizaremos para guardar mis productos
    const [mainImage, setMainImage] = useState(); // Esto lo utilizaremos para saber mi imagen principal
    const { assinProduct } = useParams();

    // Obtenemos la api
    useEffect(() => {
        axios.get('https://quixotic-elf-391004-default-rtdb.firebaseio.com/products.json')
            .then(res => {
                // Guardamos los productos en state Data
                const productsList = Object.values(res.data);
                const product = productsList.find(product => product.assin === assinProduct);

                setData(product);

                if (product) {
                    setMainImage(product.product_photo);
                }
            })
            .catch(error => console.error(error));
    }, [assinProduct]);

    const handleMainImage = (photo) => {
        setMainImage(photo);
    };

    const handleFavorites = (assin) => {
        const currentUser = JSON.parse(localStorage.getItem('currentUser')) || [];
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const newUser = JSON.parse(localStorage.getItem('currentUser'));

        if (currentUser.fav.find(product => product === assin)) {
            alert("Ya está en favoritos");
            return;
        }
        newUser.fav.push(assin);

        const updateUsers = users.map(user =>
            user.email === currentUser.email || user.phone === currentUser.phone ? newUser : user
        );

        localStorage.setItem('users', JSON.stringify(updateUsers));
        localStorage.setItem('currentUser', JSON.stringify(newUser));
    };

    const handleCart = (assin) => {
        const currentUser = JSON.parse(localStorage.getItem('currentUser')) || [];
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const newUser = JSON.parse(localStorage.getItem('currentUser'));

        if (currentUser.cart.find(product => product === assin)) {
            alert("Ya está en carrito");
            return;
        }
        newUser.cart.push(assin);

        const updateUsers = users.map(user =>
            user.email === currentUser.email || user.phone === currentUser.phone ? newUser : user
        );

        localStorage.setItem('users', JSON.stringify(updateUsers));
        localStorage.setItem('currentUser', JSON.stringify(newUser));
    };

    return (
        <main className="px-4 md:px-8 font-inter overflow-hidden">
            {
                !data ? (
                    <div>Cargando...</div>
                ) : (
                    <div>
                        <section className="mt-10 md:mt-20">
                            <div className="flex flex-col gap-5">
                                <div className="pt-5">
                                    <p className="text-sm md:text-base">{`Producto > ${data.product_category.name}`}</p>
                                </div>
                                <div className="flex flex-col md:flex-row justify-center gap-8 md:gap-16">
                                    <div className=" hidden md:block">
                                        <StarRating product={true} rating={data.product_star_rating} />
                                    </div>
                                    <div className="w-full md:w-[46.125rem] flex justify-center items-center h-[21.875rem]">
                                        <img className="max-w-full max-h-full object-cover" src={mainImage} alt="" />
                                    </div>
                                    <div className="flex md:flex-col flex-wrap items-center md:items-start">
                                        <div className="w-[4.375rem] h-[4.375rem] flex items-center justify-center overflow-hidden m-1 bg-gray-200 border-gray-200 border-2">
                                            <img style={{ mixBlendMode: "darken" }} className="max-w-full max-h-full object-cover" src={data.product_photo} alt="" onClick={() => handleMainImage(data.product_photo)} />
                                        </div>
                                        {
                                            data.product_photos.map((photo, index) => (
                                                <div key={index} className="w-[4.375rem] h-[4.375rem] flex items-center justify-center overflow-hidden m-1 bg-gray-200 border-gray-200 border">
                                                    <img style={{ mixBlendMode: "darken" }} className="max-w-full max-h-full object-cover" src={photo} alt="" onClick={() => handleMainImage(photo)} />
                                                </div>
                                            ))
                                        }
                                    </div>
                                    <div className=" block md:hidden">
                                        <StarRating  product={false} rating={data.product_star_rating} />
                                    </div>
                                </div>
                                <div className="flex flex-col mt-5">
                                    <div className="flex flex-col md:flex-row justify-between items-center md:items-start">
                                        <h2 className="text-2xl md:text-[2.8125rem] font-bold text-center md:text-left">{data.product_title}</h2>
                                        <p className="text-2xl md:text-[2rem] font-bold mt-2 md:mt-0">{data.product_price}</p>
                                    </div>
                                    <p className="w-full md:w-[43.75rem] mt-2 font-bold text-gray-500">{data.product_description}</p>
                                    <div className="flex flex-col md:flex-row justify-between items-center pt-7 text-lg">
                                        <div className="flex flex-col md:flex-row gap-5 md:gap-20 w-full md:w-auto">
                                            <button onClick={() => handleCart(assinProduct)} className="bg-[#FF7F20] text-white px-3 py-1 font-bold w-full md:w-auto">Añadir Al Carro</button>
                                            <button onClick={() => handleFavorites(assinProduct)} className="bg-[#FF7F20] text-white px-3 py-1 font-bold w-full md:w-auto">Añadir A Favoritos</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                        <section className="mt-[5.25rem] mb-5">
                            <ReviewsCarousel data={data} />
                        </section>
                    </div>
                )
            }
        </main>
    );
};

export default IndividualProduct;