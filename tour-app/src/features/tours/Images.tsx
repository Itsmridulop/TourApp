import Modal from "@/component/Modal";
import React, { ReactNode } from "react";

import { FaEdit } from "react-icons/fa";
import { useUser } from "../users/useUser";

interface ImageGalleryProps {
    images: string[];
    renderImage: (image: string, index: number) => React.ReactNode;
    children: ReactNode
}

const Images: React.FC<ImageGalleryProps> = ({ images, renderImage, children }) => {
    const {user} = useUser()

    return (
        <div className="mt-6">
            <div className="flex items-center justify-between">

                <h2 className="text-xl font-semibold">Tour Images</h2>
                {(user?.data.role === 'admin' || user?.data.role === 'lead-guide') &&<Modal>
                    <Modal.Open opens="uploadImage">

                        <FaEdit className="text-gray-500 h-5 w-5 cursor-pointer" />
                    </Modal.Open>
                    <Modal.Window name="uploadImage">
                        {children}
                    </Modal.Window>
                </Modal>}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                {images.map((image, index) => (
                    <div key={index} className="relative h-48 rounded-lg overflow-hidden">
                        {renderImage(image, index)}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Images;
