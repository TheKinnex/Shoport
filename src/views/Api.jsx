import axios from "axios";
import { useState, useEffect } from "react";

const Api = () => {
    const [data, setData] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(2);

    useEffect(() => {
        axios.get('https://quixotic-elf-391004-default-rtdb.firebaseio.com/products.json')
            .then(res => {
                // Transformar los datos de objeto a lista de objetos
                const productsArray = Object.values(res.data);
                setData(productsArray);

                // Obtener categorías únicas
                const uniqueCategories = Array.from(new Set(productsArray.map(product => product.product_category[0].name)));
                setCategories(uniqueCategories);
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
    const filteredData = selectedCategory ? data.filter(product => product.product_category[0].name === selectedCategory) : data;

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
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