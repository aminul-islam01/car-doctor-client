import { useEffect } from "react";

const useTitle = title => {
    useEffect(() => {
        document.title = `${title} - card-doctor`;
    }, [title])
};

export default useTitle;