import fullStar from '../assets/img/full-star.png'
import halfStar from '../assets/img/half-star.png'

const StarRating = ({ rating , product }) => {


    const fullStars = Math.floor(rating);
    const halfStars = rating % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStars;

    const styles = {
        container: 'w-[80px] flex flex-col flex-wrap py-2',
        stars_size: 'w-[35px] h-[35px]'
    }

    if (product === false) {
        styles.container = 'w-[80px] flex '
        styles.stars_size = 'w-[20px] h-[20px]'
    }


    return (
        <div className={styles.container}>
            {
                [...Array(fullStars)].map((_, index) => (
                    <img key={`full-${index}`} src={fullStar} alt="Full Star" className={styles.stars_size} />
                ))
            }
            {
                [...Array(halfStars)].map((_, index) => (
                    <img key={`half-${index}`} src={halfStar} alt="Half Star" className={styles.stars_size} />
                ))
            }
            {
                [...Array(emptyStars)].map((_, index) => (
                    <img key={`empty-${index}`} src={fullStar} alt="Empty Star" className={`${styles.stars_size} opacity-[0.3] ` }/>
                ))
            }
        </div>
    );
}

export default StarRating;