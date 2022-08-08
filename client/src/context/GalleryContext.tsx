import { createContext, useContext, useMemo } from "react";



interface ContextState {
  name: string,
  type: string,
  url: string,
  duration: number,
}
const GalleryContext = createContext({} as ContextState[]);

export const GalleryContextProvider = ({ children }: any) => {
  const gallery = useMemo(() => {
    return [
      {
        name: "video1",
        type: "mp4",
        url: "https://ak.picdn.net/shutterstock/videos/30471835/preview/stock-footage-the-professional-medical-team-for-health-life-concept-with-logo-little-doctor-boy-girl-in-gown.webm",
        duration: 3000,
      },
      {
        name: "image1",
        type: "img",
        url: "https://i.picsum.photos/id/281/200/200.jpg?hmac=5FvZ-Y5zbbpS3-mJ_mp6-eH61MkwhUJi9qnhscegqkY",
        duration: 5000,
      },
    ];
  }, []);


  const values = gallery;

  return (
    <GalleryContext.Provider value={values}>{children}</GalleryContext.Provider>
  );
};

export const useGallery = () => {
  return useContext(GalleryContext);
};

export default GalleryContext;
