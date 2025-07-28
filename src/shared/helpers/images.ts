export const createHandleChange = (
  event: React.ChangeEvent<HTMLInputElement>,
  setPreviewImage: (value: React.SetStateAction<string | null>) => void,
  file: React.RefObject<File | null>
) => {
  if (event.target.files) {
    console.log(event.target.files);
    const arrFiles = Array.from(event.target.files);
    // eslint-disable-next-line prefer-destructuring, no-param-reassign
    file.current = arrFiles[0];

    const urlImg = URL.createObjectURL(arrFiles[0]);
    setPreviewImage(urlImg);
  }
};
