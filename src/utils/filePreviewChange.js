export const FilePreviewChange = (e, state) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        state(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
