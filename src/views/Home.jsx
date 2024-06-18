import shoes_home from "../assets/img/shoes_home.png";
import bg_shoesHome from "../assets/img/bg_shoesHome.svg";
import burbuja from '../assets/img/burbuja.png'
import shoes from "../assets/img/shoes.png"
import shorts from "../assets/img/shorts.png";
import shirt from "../assets/img/shirt.png";
import accesories from "../assets/img/accesories.png";



const Home = () => {

    const styles = {
        h1: {
            "color": "black",
            "-webkit-text-fill-color": "white",
            "-webkit-text-stroke": "4px white"
        },
        h2: {
        }
    }

    return (


        <main className=" bg-[#FF6D00] font-inter overflow-y-hidden   ">
            <div className="mt-20">
                <div className="absolute top-0 left-0 right-0 bottom-0 overflow-hidden h-[1633px]  ">
                    <div>
                        <img className=" top-[73px] left-[754.69px] rotate-[33.21deg] absolute w-[608.77px] h-[584.5px] " src={burbuja} alt="" />
                        <img className=" top-[-490px] left-[1125px] rotate-[33.21deg] absolute w-[608.77px] h-[584.5px] " src={burbuja} alt="" />
                        <img className=" top-[-392px] left-[-344px] rotate-[185.21deg] absolute w-[608.77px] h-[584.5px] z-10 " src={burbuja} alt="" />
                        <img className=" w-[608.77px] h-[584.5px] rotate-[33.21deg] absolute top-[736px] left-[-210px] z-10" src={burbuja} alt="" />
                        <img className=" w-[608.77px] h-[584.5px] rotate-[30deg] absolute top-[736px] left-[1080px] z-10" src={burbuja} alt="" />
                        <img className=" w-[608.77px] h-[584.5px] rotate-[33.21deg] absolute top-[1301px] left-[-192px] z-10" src={burbuja} alt="" />
                        <img className=" w-[608.77px] h-[584.5px] rotate-[33.21deg] absolute top-[1324px] left-[706px] z-10" src={burbuja} alt="" />
                        <img className=" w-[608.77px] h-[584.5px] rotate-[463.21deg] absolute top-[1525px] left-[976px] z-30" src={burbuja} alt="" />
                    </div>
                </div>
            </div>
            <section className="flex ">
                <div className=" w-[568px] h-[751px]">
                    <div className=" relative top-[15px] left-[66px] ">
                        <img className="absolute w-[516px] h-[526px] top-[20px]  z-10 " src={shoes_home} alt="" />
                        <img className="absolute w-[563px] " src={bg_shoesHome} alt="" />
                    </div>
                </div>
                <div className="w-[579px] h-[386px]">
                    <div className="relative ">
                        <div className=" absolute top-[46px] left-[168px]">
                            <h1 style={styles.h1} className="text-[96px]  font-bold text-white ">SHOPORT</h1>
                            <h3 className="stroke-text absolute left-[80px] top-[110px] text-[64px]  transform font-extrabold text-transparent ">TE EQUIPA</h3>
                        </div>
                        <div className="absolute top-[266px] left-[284px]">
                            <p className=" text-[22px] text-white w-[471px] leading-[27px]   ">En Shoport, encontrarás todo lo que necesitas para alcanzar tus metas deportivas,
                                sin importar si eres un atleta experimentado o recién estás comenzando.
                                Ofrecemos una amplia selección de ropa, calzado y equipamiento de alta calidad.
                            </p>
                        </div>
                        <div className=" card absolute top-[557px] left-[360px] w-[368.79px] h-[55.28px] bg-[#E98F10] rounded-[130px]">
                            <span className=" absolute left-[26px] top-[5px] text-[32px] font-bold text-white ">Nuestros productos</span>
                        </div>
                    </div>
                </div>
            </section>
            <section className=" px-8 mb-[140px]">
                <h1 style={styles.h1} className="ml-4 text-[75px] extrabold text-white z-20 relative ">CATEGORIAS</h1>
                <div className=" relative z-20">
                    <div className=" flex justify-between">
                        <img className=" w-[285.82px]" src={shoes} alt="" />
                        <img className=" w-[285.82px]" src={shirt} alt="" />
                        <img className=" w-[285.82px]" src={accesories} alt="" />
                        <img className=" w-[285.82px]" src={shorts} alt="" />
                    </div>
                </div>
            </section>
        </main>
    );
}







export default Home;


