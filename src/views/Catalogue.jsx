import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const Catalogue = () => {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(16);
    const [hoveredProduct, setHoveredProduct] = useState(null);
    const [currentImage, setCurrentImage] = useState({});
    const [showPreviews, setShowPreviews] = useState(false);

    const navigate = useNavigate();
    let { category } = useParams();

    useEffect(() => {
        axios
            .get("https://quixotic-elf-391004-default-rtdb.firebaseio.com/products.json")
            .then((res) => {
                const productsList = Object.values(res.data);
                setData(productsList);
            })
            .catch((error) => console.error(error));
    }, []);

    const filteredData = category
        ? data.filter((product) => product.product_category.name === category)
        : data;

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedData = filteredData.slice(startIndex, endIndex);

    const handlePageChange = (direction) => {
        let newPage = currentPage;
        if (direction === "next") {
            newPage = Math.min(currentPage + 1, Math.ceil(filteredData.length / itemsPerPage));
        } else if (direction === "prev") {
            newPage = Math.max(currentPage - 1, 1);
        }
        setCurrentPage(newPage);
    };

    const handleMouseEnter = (product, image) => {
        setCurrentImage((prevState) => ({ ...prevState, [product.assin]: image }));
    };

    const handleMouseLeave = (product) => {
        setCurrentImage((prevState) => ({ ...prevState, [product.assin]: null }));
    };

    if (!category) {
        category = "Productos";
    }

    return (
        <section className="mt-20">
            <div className="bg-[#DF7D34] my-6">
                <ol className="px-5 flex w-full justify-between text-lg md:text-3xl text-white font-medium py-5">
                    <li
                        className={`${category === "Zapatos" ? "text-black" : ""} cursor-pointer`}
                        onClick={() => {
                            navigate(`/Products/Zapatos`);
                            setCurrentPage(1);
                        }}
                    >
                        ZAPATOS
                    </li>
                    <li
                        className={`${category === "Camisas" ? "text-black" : ""} cursor-pointer`}
                        onClick={() => {
                            navigate(`/Products/Camisas`);
                            setCurrentPage(1);
                        }}
                    >
                        CAMISAS
                    </li>
                    <li
                        className={`${category === "Accesorios" ? "text-black" : ""} cursor-pointer`}
                        onClick={() => {
                            navigate(`/Products/Accesorios`);
                            setCurrentPage(1);
                        }}
                    >
                        ACCESORIOS
                    </li>
                    <li
                        className={`${category === "Shorts" ? "text-black" : ""} cursor-pointer`}
                        onClick={() => {
                            navigate(`/Products/Shorts`);
                            setCurrentPage(1);
                        }}
                    >
                        SHORTS
                    </li>
                </ol>
            </div>
            <div className="px-5">
                <h2 className="text-lg md:text-xl mb-4">{`${category} > Pagina ${currentPage}`}</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-4 md:gap-x-8">
                    {paginatedData.map((product, index) => (
                        <div
                            key={index}
                            className="cursor-pointer mx-auto"
                            onClick={() => {
                                navigate(`/Product/${product.assin}`);
                            }}
                            onMouseEnter={() => {
                                setHoveredProduct(product.assin);
                                setShowPreviews(false);
                                setTimeout(() => {
                                    setShowPreviews(true);
                                }, 200);
                            }}
                            onMouseLeave={() => {
                                setHoveredProduct(null);
                                setShowPreviews(false);
                            }}
                        >
                            <div className="w-[164px] md:w-[262px] flex justify-center items-center h-[180px] md:h-[220px] bg-[#D9D9D9] pt-5 pb-2 px-3">
                                <img
                                    className="max-w-full max-h-full object-cover"
                                    style={{ mixBlendMode: "darken" }}
                                    src={currentImage[product.assin] || product.product_photo}
                                    alt={product.product_title}
                                />
                            </div>
                            {hoveredProduct === product.assin ? (
                                <div>
                                    <div
                                        className={`flex justify-center gap-2 md:gap-5 ${showPreviews
                                            ? "opacity-100 translate-x-4"
                                            : "opacity-0 -translate-x-4"
                                            } transition-all duration-500 ease-in-out`}
                                    >
                                        {product.product_photos.map((photo, photoIndex) => (
                                            <div
                                                key={photoIndex}
                                                className="flex justify-center w-[40px] md:w-[50px] h-[40px] md:h-[50px] mt-4 bg-gray-200 border-gray-200 border"
                                            >
                                                <img
                                                    style={{ mixBlendMode: "darken" }}
                                                    src={photo}
                                                    alt={`Preview ${photoIndex + 1}`}
                                                    className="max-w-full max-h-full object-cover"
                                                    onMouseEnter={() => handleMouseEnter(product, photo)}
                                                    onMouseLeave={() => handleMouseLeave(product)}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                    <p className="font-medium">{product.product_price}</p>
                                </div>
                            ) : (
                                <>
                                    <h2 className="font-medium">{product.product_title}</h2>
                                    <p className="font-medium">{product.product_price}</p>
                                </>
                            )}
                        </div>
                    ))}
                </div>
                <div className="flex justify-between mt-8 mb-5">
                    <button
                        className="bg-gray-300 px-4 py-2 rounded-md"
                        onClick={() => handlePageChange("prev")}
                        disabled={currentPage === 1}
                    >
                        Anterior
                    </button>
                    <button
                        className="bg-gray-300 px-4 py-2 rounded-md"
                        onClick={() => handlePageChange("next")}
                        disabled={currentPage === Math.ceil(filteredData.length / itemsPerPage)}
                    >
                        Siguiente
                    </button>
                    <p className="mt-2">
                        Página {currentPage} de {Math.ceil(filteredData.length / itemsPerPage)}
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Catalogue;