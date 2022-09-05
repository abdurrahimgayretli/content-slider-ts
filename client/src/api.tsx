import axios from "axios";

export const fetchGallery = async () => {
  const { data } = await axios.get(
    `${process.env.REACT_APP_BASE_ENDPOINT}/gallery`
  );
  return data;
};

export const postGallery = async (input: any) => {
  const { data } = await axios.post(
    `${process.env.REACT_APP_BASE_ENDPOINT}/gallery`,
    input
  );
  return data;
};

export const deleteGallery = async (gallery_id: any) => {
  const { data } = await axios.delete(
    `${process.env.REACT_APP_BASE_ENDPOINT}/gallery/${gallery_id}`
  );

  return data;
};
