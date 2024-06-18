import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import axios from "axios";
import StarRating from "../components/StarRating";
import ReviewsCarousel from "../components/ReviewsCarousel";

const individualProduct = () => {

    const [data, setData] = useState([]); //Esto lo utilizaremos para guardar mis productos
    const [mainImage, setMainImage] = useState(); //Esto lo utilizaremos para saber mi imagen principal
    const { assinProduct } = useParams();

    //Obtenemos la api
    useEffect(() => {
        axios.get('https://quixotic-elf-391004-default-rtdb.firebaseio.com/products.json')
            .then(res => {

                // Guardamos los productos en state Data
                const productsList = Object.values(res.data);
                const product = productsList.find(product => product.assin === assinProduct);

                setData(product);

                if (product) {
                    setMainImage(product.product_photo)
                }
            })
            .catch(error => console.error(error));
    }, [assinProduct]);

    const handleMainImage = (photo) => {
        setMainImage(photo)
    }

    const handleFavorites = (assin) => {
        const currentUser = JSON.parse(localStorage.getItem('currentUser')) || [];
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const newUser = JSON.parse(localStorage.getItem('currentUser'))

        if (currentUser.fav.find(product => product === assin)) {
            alert("Ya esta en favoritos")
            return;
        }
        newUser.fav.push(assin);

        const updateUsers = users.map(user =>
            user.email === currentUser.email || user.phone === currentUser.phone ? newUser : user
        )

        localStorage.setItem('users', JSON.stringify(updateUsers));
        localStorage.setItem('currentUser', JSON.stringify(newUser));


    }


    return (
        <main className=" px-5  font-inter overflow-y-hidden overflow-x-hidden">
            {
                data.length === 0 ? console.log("cargando") :
                    <div>
                        <section className=" mt-20" >
                            <div className=" flex flex-col gap-5">
                                <div className=" pt-5">
                                    <p>Categoria - <span>{data.product_category.name}</span></p>
                                </div>
                                <div className=" flex justify-center gap-16">
                                    <StarRating product={true} rating={data.product_star_rating} />
                                    <div className="w-[738px] flex justify-center items-center h-[350px]">
                                        <img className=" max-w-full max-h-full object-cover " src={mainImage} alt="" />
                                    </div>
                                    <div className="  flex flex-col flex-wrap">
                                        <div className=" w-[70px] h-[70px] flex items-center justify-center overflow-hidden m-[5px] bg-gray-200 border-gray-200 border-2" >
                                            <img className=" max-w-full max-h-full object-cover" src={data.product_photo} alt="" onClick={() => handleMainImage(data.product_photo)} />
                                        </div>
                                        {
                                            data.product_photos.map((photo, index) => (
                                                <div className=" w-[70px] h-[70px] flex items-center justify-center overflow-hidden m-[5px] bg-gray-200 border-gray-200 border" >
                                                    <img className=" max-w-full max-h-full object-cover"
                                                        key={index}
                                                        src={photo}
                                                        alt=""
                                                        onClick={() => handleMainImage(photo)}
                                                    />
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                                <div>
                                    <div className=" flex items-center justify-between ">
                                        <h2 className=" text-[45px] font-bold">{data.product_title}</h2>
                                        <p className=" text-4xl font-bold">{data.product_price}</p>
                                    </div>
                                    <p className=" w-[700px] mt-2 font-bold text-gray-500">{data.product_description}</p>
                                    <div className=" flex justify-between items-center pt-7 text-lg">
                                        <div className=" flex gap-20 ">
                                            <button className=" bg-[#FF7F20] text-white px-3 py-1 font-bold">Añadir Al Carro</button>
                                            <button onClick={() => handleFavorites(assinProduct)} className=" bg-[#FF7F20] text-white px-3 py-1 font-bold">Añadir A Favoritos</button>
                                        </div>
                                        <div>
                                            <button className=" bg-[#FF7F20] text-white px-3 py-1 font-bold">Ver Reseñas</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                        <section className=" mt-[84px] mb-[100px]">
                            <ReviewsCarousel data={data} />
                        </section>
                    </div>
            }
        </main>

    );
}

export default individualProduct;