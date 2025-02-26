import { Controller, useForm } from 'react-hook-form';
import { Label } from "../../component/Label"
import { Input } from "../../component/Input"
import { Button } from "../../component/Button"
import { MinusCircledIcon, PlusCircledIcon } from '@radix-ui/react-icons'
import { useState } from 'react';
import { FormDataController } from '@/utils/FormDataController';
import { useParams } from 'react-router-dom';
import { useImageUpload } from './useImageUpload';

interface TourImagesUploadProps {
    imagesArr?: (File | string)[];
    onClose?: () => void
}

const TourImagesUpload: React.FC<TourImagesUploadProps> = ({ imagesArr, onClose }) => {
    const [images, setImages] = useState<(string | File)[] | undefined>(imagesArr);
    const { id } = useParams()
    const { imageUpload, isPending } = useImageUpload()
    const { handleSubmit, reset, control } = useForm()

    const handleImageChange = (index: number, file: File | string) => {
        const updatedImages = [...images || []];
        updatedImages[index] = file;
        setImages(updatedImages);
    };

    const handleDeleteImage = (index: number) => {
        const updatedImages = images?.filter((_, i) => i !== index);
        setImages(updatedImages);
    };

    const handleAddImage = () => {
        setImages([...images || [], new File([], '')]);
    };

    const submitHandler = () => {
        const data = { images }
        const formData = FormDataController(data)
        imageUpload({ formData, id }, {
            onSettled: () => reset(),
            onSuccess: () => onClose?.()
        })

    }

    return (
        <form className="space-y-4" onSubmit={handleSubmit(submitHandler)}>
            <Label>Tour Images</Label>
            {images?.map((image, index) => (
                <div key={index} className="flex items-center space-x-4">
                    <Controller
                        name={`images.${index}`}
                        control={control}
                        render={() => (
                            <>
                                <div className="flex items-center space-x-2">
                                    <Input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => {
                                            if (e.target.files) {
                                                const file = e.target.files[0];
                                                handleImageChange(index, file);
                                            }
                                        }}
                                        className="border rounded-md p-2"
                                    />

                                    {image && typeof image === 'string' && image.length > 0 && (
                                        <img
                                            src={`${image}`}
                                            alt={`Image ${index + 1}`}
                                            className="h-10 w-10 object-cover rounded-md border border-gray-300"
                                        />
                                    )}
                                </div>
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="icon"
                                    onClick={() => handleDeleteImage(index)}
                                >
                                    <MinusCircledIcon className="h-4 w-4" />
                                </Button>
                            </>
                        )}
                    />
                </div>
            ))}
            <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleAddImage}
                className="flex items-center space-x-2"
            >
                <PlusCircledIcon className="h-4 w-4" />
                <span>Add Image</span>
            </Button>
            <Button type="submit" className="bg-green-500 hover:bg-green-600" disabled={isPending}>{isPending ? 'Uploading Images...' : 'Upload Images'}</Button>
        </form>
    );
};

export default TourImagesUpload;
