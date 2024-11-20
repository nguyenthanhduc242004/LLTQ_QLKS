import { useState, forwardRef } from 'react';
import styles from './Image.module.scss';
import classNames from 'classnames/bind';
import images from '../../assets/imgs';

const cx = classNames.bind(styles);

const Image = forwardRef(({ src, classNames, fallback: customFallback = images.noImage, alt, ...props }, ref) => {
    const [fallback, setFallback] = useState('');

    const handleError = () => {
        setFallback(customFallback);
    };

    // Mặc định component Image vẫn sẽ có thuộc tính CSS của wrapper (của file 'Image.module.scss'), còn classNames là để trong tương lai muốn custom riêng
    return (
        <img
            className={cx(styles.wrapper, classNames)}
            alt={alt}
            ref={ref}
            src={fallback || src}
            {...props}
            onError={handleError}
        />
    );
});

// export default forwardRef(Image);
export default Image;
