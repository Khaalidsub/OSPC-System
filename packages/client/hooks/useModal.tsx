import { isBrowser } from "lib/isBrowser"
import usePortal from "react-useportal"

export const useModal = () => {
    const { isOpen, openPortal, togglePortal, closePortal, Portal } = usePortal({
        onOpen({ portal }) {
            portal.current.style.cssText = `
          /* add your css here for the Portal */
          position:absolute;
   
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          z-index: 1000;
        `
        },
        onClose({ portal }) {
            portal.current.style.cssText = `
             z-index: -1;
        `
        },
        bindTo: isBrowser ? document && document.getElementById('modal') : null

    })

    return {
        Modal: Portal,
        openModal: openPortal,
        toggleModal: togglePortal,
        closeModal: closePortal,
        isOpen
    }
}