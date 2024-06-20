import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";


const Catalogue = () => {

    const [data, setData] = useState([]); //Esto lo utilizaremos para guardar mis productos
    const [currentPage, setCurrentPage] = useState(1); //Para controlar la paginación
    const [itemsPerPage] = useState(16); //Limitando los productos por pagina
    const navigate = useNavigate();

    let { category } = useParams();

    useEffect(() => {
        axios.get('https://quixotic-elf-391004-default-rtdb.firebaseio.com/products.json')
            .then(res => {

                // Guardamos los productos en state Data
                const productsList = Object.values(res.data);
                setData(productsList);

            })
            .catch(error => console.error(error));
    }, []);

    const filteredData = category ? data.filter(product => product.product_category.name === category) : data;

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedData = filteredData.slice(startIndex, endIndex);

    const handlePageChange = (direction) => {
        let newPage = currentPage;
        if (direction === 'next') {
            newPage = Math.min(currentPage + 1, Math.ceil(filteredData.length / itemsPerPage));
        } else if (direction === 'prev') {
            newPage = Math.max(currentPage - 1, 1);
        }
        setCurrentPage(newPage);
    };

    if (!category) {
        category = 'Productos';
    }
    const random = Math.floor(Math.random() * 2)

    return (
        <section className="mt-20 ">

            <div className=" bg-[#DF7D34] my-6">
                <ol className="px-5 flex w-full justify-between text-3xl text-white font-medium py-5">
                    <li className={ category === 'Zapatos' && 'text-black'} onClick={() => { navigate(`/Catalogo/Zapatos`); setCurrentPage(1)  }} style={{ cursor: "pointer" }}>ZAPATOS</li>
                    <li className={ category === 'Camisas' && 'text-black'} onClick={() => { navigate(`/Catalogo/Camisas`); setCurrentPage(1) }} style={{ cursor: "pointer" }}>CAMISAS</li>
                    <li className={ category === 'Accesorios' && 'text-black'} onClick={() => { navigate(`/Catalogo/Accesorios`); setCurrentPage(1) }} style={{ cursor: "pointer" }}>ACCESORIOS</li>
                    <li className={ category === 'Shorts' && 'text-black'} onClick={() => { navigate(`/Catalogo/Shorts`); setCurrentPage(1) }} style={{ cursor: "pointer" }}>SHORTS</li>
                </ol>
            </div>
            <div className=" px-5">
                <h2 className=" text-xl mb-4">{` ${category} > Pagina ${currentPage}`}</h2>
                <div className=" grid grid-cols-4 gap-y-8">


                    {/* Renderizar productos filtrados y paginados */}
                    {paginatedData.map((product, index) => (
                        <div className=" px-[50px]" key={index}>
                            <div onClick={() => { navigate(`/Producto/${product.assin}`) }} style={{ cursor: "pointer" }} className="w-[262px] flex justify-center items-center h-[220px] bg-[#D9D9D9] pt-5 pb-2 px-3">
                                <img className="max-w-full max-h-full object-cover" style={{ mixBlendMode: "darken" }} src={product.product_photo} alt={product.product_title} />
                            </div>
                            {random === 1 && <p className=" text-[#FF6D00]">Más popular</p>}
                            <h2 className=" font-medium">{product.product_title}</h2>
                            <p className=" font-medium">{product.product_price}</p>
                        </div>
                    ))}
                </div>
                <div>
                    {/* Controles de paginación */}
                    <div>
                        <button onClick={() => handlePageChange('prev')} disabled={currentPage === 1}>Anterior</button>
                        <button onClick={() => handlePageChange('next')} disabled={currentPage === Math.ceil(filteredData.length / itemsPerPage)}>Siguiente</button>
                        <p>Página {currentPage} de {Math.ceil(filteredData.length / itemsPerPage)}</p>
                    </div>
                </div>
            </div>

        </section>
    );
}

export default Catalogue;