import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


const Api = () => {

    
    const [data, setData] = useState([]); //Esto lo utilizaremos para guardar mis productos
    const [categories, setCategories] = useState([]); //Esto para guardar las categorias
    const [selectedCategory, setSelectedCategory] = useState(''); //Para controlar el cambio de categoria
    const [currentPage, setCurrentPage] = useState(1); //Para controlar la paginación
    const [itemsPerPage] = useState(2); //Limitando los productos por pagina
    const navigate = useNavigate();

    //Obtenemos la api
    useEffect(() => {
        axios.get('https://quixotic-elf-391004-default-rtdb.firebaseio.com/products.json')
            .then(res => {
                
                // Guardamos los productos en state Data
                const productsList = Object.values(res.data);
                setData(productsList);

                

                // Obtener categorías de los productos y las iteramos de manera que no se repitan
                const uniqueCategories = Array.from(new Set(productsList.map(product => product.product_category.name)));
                setCategories(uniqueCategories); //Guardamos en mi state categories
            })
            .catch(error => console.error(error));
    }, []);


    
    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
        setCurrentPage(1); // Resetear a la primera página cuando cambia la categoría
    };


    const handlePageChange = (direction) => {
        let newPage = currentPage;
        if (direction === 'next') {
            newPage = Math.min(currentPage + 1, Math.ceil(filteredData.length / itemsPerPage));
        } else if (direction === 'prev') {
            newPage = Math.max(currentPage - 1, 1);
        }
        setCurrentPage(newPage);
    };

    
    // Filtrar productos por categoría seleccionada
    const filteredData = 
    //Verificamos si tiene algun valor
    selectedCategory ? 
    //Filtramos los productos por aquellos que tengan el mismo valor de categoria
    data.filter(product => product.product_category.name === selectedCategory) 
    //Si no mostramos todos los datos
    : data;



    /*Sacamos el indice inicial de la siguiente manera

    pagina = 1
    - 1 (este valor es para poder obtener el indice 0)
    * los items maximos por pagina 

    (1 - 1) * 2 = 0 || Este seria de donde empezaria el slice

    */
    const startIndex = (currentPage - 1) * itemsPerPage;


    /*
    Sacamos el indice final de la siguiente manera

    inidice inicial en este caso 0 + 2 que son los items maximos
    es decir que el indice final sera 2, pero solo se mostraran
    los objetos (0 y 1)

    */
    const endIndex = startIndex + itemsPerPage;

    /*
    Hacemos el slice (donde comienza, hasta donde termina) para que nos devuelva
    una nueva array
     */
    const paginatedData = filteredData.slice(startIndex, endIndex);

    return (
        <div>
            {/* Controles para seleccionar categoría */}
            <div>
                <p>Seleccionar Categoría:</p>
                <select value={selectedCategory} onChange={(e) => handleCategoryChange(e.target.value)}>
                    <option value="">Todas</option>
                    {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                    ))}
                </select>
            </div>

            {/* Renderizar productos filtrados y paginados */}
            {paginatedData.map((product, index) => (
                <div key={index}>
                    <h2>{product.product_title}</h2>
                    <img src={product.product_photo} alt={product.product_title} />
                    <p>{product.product_description}</p>
                    <p>{product.product_price}</p>
                    <p>Rating: {product.product_star_rating}</p>
                    {
                        product.reviews.map((r, index) => (

                            <div key={index}>
                                <p>{r.user_name}</p>
                                <p>{r.review_description}</p>
                                <p>{r.review_star_rating}</p>
                                <img className=" w-36" src={product.product_photo} alt="" />
                                
                            </div>
                        ))}
                    <button onClick={() => { navigate(`/Product/${product.assin}`)}}> Ver Más </button>
                </div>
            ))}
            {/* Controles de paginación */}
            <div>
                <button onClick={() => handlePageChange('prev')} disabled={currentPage === 1}>Anterior</button>
                <button onClick={() => handlePageChange('next')} disabled={currentPage === Math.ceil(filteredData.length / itemsPerPage)}>Siguiente</button>
                <p>Página {currentPage} de {Math.ceil(filteredData.length / itemsPerPage)}</p>
            </div>
        </div>
    );
}

export default Api;