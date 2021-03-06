import handleSetState from "./stateManagement";
import { MainService } from "../src/services/frontend/MainService";

export default async function handleClick (refs, setShowLoader, setState) {
    const name = refs.name?.current.value,
          file = refs.file?.current.files[0],
          position = refs.position?.current.value;

    if ( !(name && file && position) ) {
        handleSetState("Please enter all data.", setState);
    } else {
        setShowLoader(true);
        
        const formData = new FormData();
        formData.append('file', file);
        formData.append('name', name);
        formData.append('position', position);

        const googleDriveService = MainService.getInstance().getDrive();
        const uploadFileResponse = await googleDriveService.uploadFile(formData);
        setShowLoader(false);

        if (uploadFileResponse.ok) {
            Object.values(refs).map((val => {
                val.current.value = '';
            }));

            handleSetState('Done.', setState);
        } else {
            handleSetState('Something went wrong.', setState);
        }
    }
};