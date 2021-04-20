import React, { useCallback, useState } from 'react'
import PropTypes from "prop-types";
import { PlusOutlined } from '@ant-design/icons';
import ImagesZoom from './imageZoom';


function PostImages({ images }) {
    const [showImagesZoom, setShowImagesZoom] = useState(false);

    const onZoom = useCallback(() => {
        setShowImagesZoom(true);
    }, []);

    const onClose = useCallback(() => {
        setShowImagesZoom(false);
    }, []);

    //  이미지가 1장일때는 
    if (images.length === 1) {
        return (
            <>
                <img src={`http://localhost:3065/${images[0].src}`} alt={images[0].src} onClick={onZoom} />
                {
                    showImagesZoom && <ImagesZoom image={images} onClose={onClose} />
                }
            </>
        )
    }

    //  이미지가 2장일때는 
    if (images.length === 2) {
        return (
            <>
                <div>
                    <img src={`http://localhost:3065/${images[0].src}`} alt={images[0].src} onClick={onZoom} style={{ width: "50%", display: "inline-block" }} />
                    <img src={`http://localhost:3065/${images[1].src}`} alt={images[1].src} onClick={onZoom} style={{ width: "50%", display: "inline-block" }} />
                </div>
            </>
        )
    }

    //이미지가 3장이상일때는 더보기 버튼 생성
    return (
        <>
            <div>
                <img rol="presentation" src={`http://localhost:3065/${images[0].src}`} alt={`http://localhost:3065/${images[0].src}`} onClick={onZoom}
                    style={{ width: "50%" }}
                />
                <div
                    role="presentation"
                    style={{
                        display: "inline-block", width: "50%",
                        textAlign: "center", verticalAlign: "middle"
                    }}
                >
                    <PlusOutlined />
                    <br />
                    {images.length - 1} 개의 사진 더보기
                </div>
            </div>
            {
                showImagesZoom && <ImagesZoom image={images} images={images} onClose={onClose} />
            }
        </>
    )



}

PostImages.propTypes = {
    images: PropTypes.arrayOf(PropTypes.object),
}

export default PostImages
