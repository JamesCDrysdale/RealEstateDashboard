import { useState } from "react";
import { useGetIdentity } from "@pankod/refine-core";
import { FieldValues, useForm } from "@pankod/refine-react-hook-form";
import { useNavigate } from "@pankod/refine-react-router-v6";

import Form from "components/common/Form";


const CreateProperty = () => {
  const navigate = useNavigate();
  const { data: user } = useGetIdentity();
  const [propertyImage, setPropertyImage] = useState({name: '', url: ''});
  const { refineCore: { onFinish, formLoading}, register, handleSubmit } = useForm();

  // Get the image data, read the file and set it to state
  const handleImageChange = (file: File) => {
    const reader = (readFile: File) => new Promise<string>((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.onload = () => resolve(fileReader.result as string);
      fileReader.readAsDataURL(readFile);
    });

    reader(file).then((result: string) => setPropertyImage({ name: file?.name, url: result }));
  };
  
  const onFinishHandler = async (data: FieldValues) => {
    // Validation to ensure user adds a property image
    if(!propertyImage.name) return alert('Please select an image');
    
    // Send data to backend
    await onFinish({ ...data, photo: propertyImage.url, email: user.email })
  };

  return (
    <Form 
      type="Create"
      register={register}
      onFinish={onFinish}
      formLoading={formLoading}
      handleSubmit={handleSubmit}
      handleImageChange={handleImageChange}
      onFinishHandler={onFinishHandler}
      propertyImage={propertyImage}
    />
  )
}

export default CreateProperty;