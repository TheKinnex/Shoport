import shoes_home from "../assets/img/shoes_home.png";
import bg_shoesHome from "../assets/img/bg_shoesHome.svg";
import burbuja from '../assets/img/burbuja.png';
import shoes from "../assets/img/shoes.png";
import shorts from "../assets/img/shorts.png";
import shirt from "../assets/img/shirt.png";
import accesories from "../assets/img/accesories.png";
import { useNavigate } from "react-router-dom";


const Home = () => {

    const navigate = useNavigate();

    const styles = {
        h1: {
            "color": "black",
            "-webkit-text-fill-color": "white",
            "-webkit-text-stroke": "2px white"
        },
    }

    return (
        <main className="bg-[#FF6D00] font-inter overflow-hidden relative">
            <div className="mt-20">
                <div className="absolute top-0 left-0 right-0 bottom-0 overflow-hidden">
                    <div className=" hidden md:block">
                        <img className="w-32 md:w-[38.04rem] rotate-[33.21deg] top-[4.56rem] left-[12rem] md:top-[1.56rem] md:left-[43.16rem] absolute" src={burbuja} alt="" />
                        <img className="w-32 md:w-[38.04rem] rotate-[33.21deg] top-[-19rem] left-[20rem] md:top-[-30.62rem] md:left-[70.31rem] absolute" src={burbuja} alt="" />
                        <img className="w-32 md:w-[38.04rem] rotate-[185.21deg] top-[-15rem] left-[-5rem] md:top-[-24.5rem] md:left-[-21.5rem] absolute z-10" src={burbuja} alt="" />
                        <img className="w-32 md:w-[38.04rem] rotate-[33.21deg] top-[25rem] left-[0rem] md:top-[46rem] md:left-[-13.12rem] absolute z-10" src={burbuja} alt="" />
                        <img className="w-32 md:w-[38.04rem] rotate-[30deg] top-[25rem] left-[20rem] md:top-[46rem] md:left-[67.5rem] absolute z-10" src={burbuja} alt="" />
                        <img className="w-32 md:w-[38.04rem] rotate-[33.21deg] top-[45rem] left-[0rem] md:top-[81.31rem] md:left-[-12rem] absolute z-10" src={burbuja} alt="" />
                        <img className="w-32 md:w-[38.04rem] rotate-[33.21deg] top-[45rem] left-[15rem] md:top-[82.75rem] md:left-[44.12rem] absolute z-10" src={burbuja} alt="" />
                    </div>
                </div>
            </div>
            <section className="flex flex-col md:flex-row items-center md:items-start px-4 md:px-16">
                <div className="w-full md:w-1/2 flex justify-center md:justify-start">
                    <div className="relative top-[2rem] md:top-[0.93rem] md:left-[4.12rem]">
                        <img className="w-[16.87rem] h-auto md:w-[32.25rem] md:h-[32.87rem] relative z-10" src={shoes_home} alt="" />
                        <img className="w-[22.36rem] md:w-[35.18rem] absolute top-0" src={bg_shoesHome} alt="" />
                    </div>
                </div>
                <div className="w-full md:w-1/2 mt-8 md:mt-0 flex flex-col items-center md:items-start">
                    <div className="relative text-center md:text-left">
                        <h1 style={styles.h1} className="text-[3rem] md:text-[6rem] font-bold text-white z-20">SHOPORT</h1>
                        <h3 className="w-[15.1rem] md:w-[25rem] text-[2.5rem] md:text-[4rem] text-white font-bold transform md:font-extrabold z-20 mt-4 md:mt-0">TE EQUIPA</h3>
                    </div>
                    <div className="mt-8 md:mt-[1rem] text-center md:text-left">
                        <p className="text-[1rem] w-full md:w-[29.43rem] md:text-[1.37rem] text-white md:leading-[1.68rem]">
                            <span className=" relative z-20">En Shoport, encontrarás todo lo que necesitas para alcanzar tus metas deportivas, sin importar si eres un atleta experimentado o recién estás comenzando. Ofrecemos una amplia selección de ropa, calzado y equipamiento de alta calidad.</span>
                        </p>
                    </div>
                    <div className="card mt-8 md:mt-[3rem] w-[15rem] h-[2.5rem] md:w-[22rem] md:h-[3rem] bg-[#E98F10] rounded-[8rem] flex items-center justify-center relative z-20">
                        <button
                        onClick={() => navigate(`/Products`)}
                        >
                            <span className="text-[1.25rem] md:text-[2rem] font-bold text-white">Nuestros productos</span>
                        </button>
                    </div>
                </div>
            </section>
            <section className="px-4 md:px-16 mb-[8.75rem] mt-16 md:mt-32">
                <h1 style={styles.h1} className="text-[2.7rem] md:text-[4.7rem] font-extrabold text-white z-20 relative text-center md:text-left">CATEGORIAS</h1>
                <div className="relative z-20 mt-8 md:mt-16">
                    <div className="flex flex-wrap md:flex-nowrap justify-center md:justify-between gap-8">
                        <button 
                        onClick={() => navigate(`/Products/Zapatos`)}
                        >
                            <img className="w-[10rem] md:w-[17.86rem]" src={shoes} alt="Zapatos" />
                        </button>
                        <button 
                        onClick={() => navigate(`/Products/Camisas`)}>
                            <img className="w-[10rem] md:w-[17.86rem]" src={shirt} alt="Camisas" />
                        </button>
                        <button
                        onClick={() => navigate(`/Products/Accesorios`)}>
                            <img className="w-[10rem] md:w-[17.86rem]" src={accesories} alt="Accesorios" />
                        </button>
                        <button
                        onClick={() => navigate(`/Products/Shorts`)}>
                            <img className="w-[10rem] md:w-[17.86rem]" src={shorts} alt="Shorts" />
                        </button>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default Home;